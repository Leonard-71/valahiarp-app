import { Prisma } from "@/generated/prisma";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import { userFilterSpec } from "@/lib/filters/specs/user-filter-spec";
import prisma from "@/lib/prisma";
import {
  GenericSelectDataDto,
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types/utils";
import { validateFiltersDetailed } from "@/validation";

export const selectUsers = async (
  input: RequestInput,
): Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>> => {
  try {
    const { pagination, search, filters } = input;
    const { pageIndex, pageSize } = pagination;

    const offset = pageIndex * pageSize;

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      createdAt: "desc",
    };

    const where: Prisma.UserWhereInput = search
      ? {
          name: { contains: search, mode: "insensitive" },
          isArchived: false,
        }
      : { isArchived: false };

    if (filters) {
      const { isValid, errors } = validateFiltersDetailed(
        filters,
        userFilterSpec,
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

      const prismaFilters = applyGenericFilters(userFilterSpec, filters);
      Object.assign(where, prismaFilters);
    }

    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: offset,
        take: pageSize,
        orderBy,
      }),
      prisma.user.count({ where }),
    ]);

    const hasMore = (pageIndex + 1) * pageSize < count;

    return {
      data: {
        content: users.map((user) => ({
          label: user.name || user.email,
          value: user.id,
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
