import { Prisma } from "@/generated/prisma";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import { categoryFilterSpec } from "@/lib/filters/specs/category-filter-spec";
import prisma from "@/lib/prisma";
import {
  GenericSelectDataDto,
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types/utils";
import { validateFiltersDetailed } from "@/validation";

export const selectCategories = async (
  input: RequestInput,
): Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>> => {
  try {
    const { pagination, search, filters } = input;
    const { pageIndex, pageSize } = pagination;

    const offset = pageIndex * pageSize;

    const orderBy: Prisma.CategoryOrderByWithRelationInput = {
      createdAt: "desc",
    };

    const where: Prisma.CategoryWhereInput = search
      ? { name: { contains: search, mode: "insensitive" }, isArchived: false }
      : { isArchived: false };

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

    const [categories, count] = await prisma.$transaction([
      prisma.category.findMany({
        where,
        skip: offset,
        take: pageSize,
        orderBy,
        include: {
          configuration: true,
        },
      }),
      prisma.category.count({ where }),
    ]);

    const hasMore = (pageIndex + 1) * pageSize < count;

    return {
      data: {
        content: categories.map((category) => ({
          label: category.name,
          value: category.id,
          meta: category,
        })),
        totalCount: count,
        pageCount: Math.ceil(count / pageSize),
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
