import { Prisma } from "@/generated/prisma";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import { subscriptionFilterSpec } from "@/lib/filters/specs/subscription-filter-spec";
import prisma from "@/lib/prisma";
import {
  GenericSelectDataDto,
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types/utils";
import { validateFiltersDetailed } from "@/validation";

export const selectSubscriptions = async (
  input: RequestInput,
): Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>> => {
  try {
    const { pagination, search, filters } = input;
    const { pageIndex, pageSize } = pagination;

    const offset = pageIndex * pageSize;

    const orderBy: Prisma.SubscriptionOrderByWithRelationInput = {
      createdAt: "desc",
    };

    const where: Prisma.SubscriptionWhereInput = search
      ? {
          name: { contains: search, mode: "insensitive" },
          isArchived: false,
        }
      : { isArchived: false };

    if (filters) {
      const { isValid, errors } = validateFiltersDetailed(
        filters,
        subscriptionFilterSpec,
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

      const prismaFilters = applyGenericFilters(
        subscriptionFilterSpec,
        filters,
      );
      Object.assign(where, prismaFilters);
    }

    const [subscriptions, count] = await prisma.$transaction([
      prisma.subscription.findMany({
        where,
        skip: offset,
        take: pageSize,
        orderBy,
      }),
      prisma.subscription.count({ where }),
    ]);

    const hasMore = (pageIndex + 1) * pageSize < count;

    return {
      data: {
        content: subscriptions.map((subscription) => ({
          label: subscription.name,
          value: subscription.id,
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
