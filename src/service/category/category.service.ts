import { Session } from "next-auth";

import { Prisma } from "@/generated/prisma";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import { categoryFilterSpec } from "@/lib/filters/specs/category-filter-spec";
import prisma from "@/lib/prisma";
import { revalidateCategoryPaths } from "@/lib/revalidate";
import { searchBuilder } from "@/lib/search-builder";
import {
  CreateCategoryInput,
  SingleCategoryResponseDto,
  UpdateCategoryInput,
} from "@/types";
import {
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types/utils";
import { validateFiltersDetailed } from "@/validation";

const create = async (
  session: Session,
  data: CreateCategoryInput,
): Promise<ResponseDto<SingleCategoryResponseDto>> => {
  try {
    const { configuration, ...fields } = data;
    const category = await prisma.category.create({
      data: {
        ...fields,
        createdById: session.user.id,
        configuration: {
          create: configuration,
        },
      },
      include: {
        configuration: true,
        createdBy: true,
      },
    });
    revalidateCategoryPaths();

    return {
      data: category,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const findById = async (
  id: number,
): Promise<ResponseDto<SingleCategoryResponseDto>> => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        configuration: true,
        createdBy: true,
      },
    });

    if (!category) {
      return {
        data: null,
        error: {
          message: "Category not found",
          reason: Reason.NOT_FOUND_ERROR,
        },
      };
    }

    return {
      data: category,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const findAll = async (
  input: RequestInput,
): Promise<ResponseDto<PaginatedResponseDto<SingleCategoryResponseDto>>> => {
  try {
    const { pagination, search, filters } = input;

    const orderBy: Prisma.CategoryOrderByWithRelationInput = {
      createdAt: "desc",
    };

    let where: Prisma.CategoryWhereInput = {};

    if (search) {
      where = searchBuilder<SingleCategoryResponseDto>(search, ["name"]);
    }

    if (filters) {
      const { isValid, errors } = validateFiltersDetailed(
        filters,
        categoryFilterSpec,
      );

      if (!isValid) {
        return {
          data: null,
          error: {
            message: `Invalid filters: ${errors.map((e) => `${e.field}: ${e.reason}`).join("; ")}`,
            reason: Reason.VALIDATION_ERROR,
          },
        };
      }

      const prismaFilters = applyGenericFilters(categoryFilterSpec, filters);
      Object.assign(where, prismaFilters);
    }

    const { pageIndex, pageSize } = pagination;

    const [categories, totalCount] = await prisma.$transaction([
      prisma.category.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
        orderBy,
        include: {
          configuration: true,
          createdBy: true,
        },
      }),
      prisma.category.count({ where }),
    ]);

    const hasMore = (pageIndex + 1) * pageSize < totalCount;

    return {
      data: {
        content: categories,
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        hasMore,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const update = async (
  id: number,
  data: UpdateCategoryInput,
): Promise<ResponseDto<SingleCategoryResponseDto>> => {
  try {
    const { configuration, ...fields } = data;

    const configurationAction: Prisma.CategoryUpdateInput["configuration"] =
      configuration
        ? {
            upsert: {
              create: configuration,
              update: configuration,
            },
          }
        : undefined;

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...fields,
        configuration: configurationAction,
      },
      include: {
        configuration: true,
        createdBy: true,
      },
    });
    revalidateCategoryPaths();

    return {
      data: category,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const archive = async (
  session: Session,
  id: number,
): Promise<ResponseDto<void>> => {
  try {
    await prisma.category.update({
      where: { id },
      data: {
        isArchived: true,
        archivedAt: new Date(),
        archivedById: session.user.id!,
      },
    });
    revalidateCategoryPaths();
    return { data: undefined, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const recover = async (
  id: number,
): Promise<ResponseDto<SingleCategoryResponseDto>> => {
  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        isArchived: false,
        archivedAt: null,
      },
      include: {
        configuration: true,
        createdBy: true,
      },
    });
    revalidateCategoryPaths();
    return { data: category, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

export { create, findById, findAll, update, archive, recover };
