"use server";

import { auth } from "@/auth";
import { EqualityOperators, ListOperators } from "@/lib/filters/filter-types";
import { handleSubscriptionsAvailability } from "@/lib/get-subscriptions-logic";
import {
  findAll,
  findById as findSubscriptionByIdService,
} from "@/service/subscription";
import {
  PaginatedResponseDto,
  Reason,
  ResponseDto,
  SingleSubscriptionOnCategoryResponseDto,
  SingleSubscriptionResponseDto,
  SubscriptionOnCategoryInput,
} from "@/types";
import { idValidator, subscriptionOnCategoryValidator } from "@/validation";

const findAllLeafletSubscriptions = async (): Promise<
  ResponseDto<PaginatedResponseDto<SingleSubscriptionResponseDto>>
> => {
  return await findAll({
    pagination: { pageIndex: 0, pageSize: 10000 },
    filters: [
      {
        field: "category.hasLeaflet",
        operator: EqualityOperators.EQUALS,
        value: true,
      },
      {
        field: "isArchived",
        operator: EqualityOperators.EQUALS,
        value: false,
      },
      {
        field: "category.isArchived",
        operator: EqualityOperators.EQUALS,
        value: false,
      },
    ],
  });
};

const findAllSubscriptionsOnCategory = async (
  input: SubscriptionOnCategoryInput,
): Promise<
  ResponseDto<PaginatedResponseDto<SingleSubscriptionOnCategoryResponseDto>>
> => {
  const validatedQuery = subscriptionOnCategoryValidator.safeParse(input);

  if (!validatedQuery.success) {
    return {
      data: null,
      error: {
        message: validatedQuery.error.message,
        reason: Reason.VALIDATION_ERROR,
      },
    };
  }

  const [results, session] = await Promise.all([
    findAll({
      pagination: validatedQuery.data.pagination,
      filters: [
        {
          field: "category.id",
          operator: ListOperators.IN_LIST,
          value: [validatedQuery.data.categoryId],
        },
        {
          field: "isArchived",
          operator: EqualityOperators.EQUALS,
          value: false,
        },
      ],
    }),
    auth(),
  ]);

  if (results.error || results.data.content.length === 0) {
    return results as ResponseDto<
      PaginatedResponseDto<SingleSubscriptionOnCategoryResponseDto>
    >;
  }

  if (!session?.user) {
    return {
      ...results,
      data: {
        ...results.data,
        content: results.data.content.map((subscription) => ({
          ...subscription,
          meta: {
            isDisabled: true,
            reason: Reason.NOT_AUTHENTICATED,
          },
        })),
      },
    };
  }

  const { isMonthly, isExclusiveToOwner, limitOnePerCategory, requiresCode } =
    results.data.content[0].category;

  try {
    return {
      ...results,
      data: {
        ...results.data,
        content: await handleSubscriptionsAvailability(
          session,
          {
            isMonthly,
            isExclusiveToOwner,
            limitOnePerCategory,
            requiresCode,
          },
          results.data.content,
        ),
      },
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

const findSingleSubscriptionOnCategory = async (
  id: number,
): Promise<ResponseDto<SingleSubscriptionOnCategoryResponseDto>> => {
  const validatedId = idValidator.safeParse(id);

  if (!validatedId.success) {
    return {
      data: null,
      error: {
        message: validatedId.error.message,
        reason: Reason.VALIDATION_ERROR,
      },
    };
  }

  const [results, session] = await Promise.all([
    findSubscriptionByIdService(validatedId.data),
    auth(),
  ]);

  if (results.error) {
    return results;
  }

  const subscription = results.data;

  if (!session?.user) {
    return {
      data: {
        ...subscription,
        meta: {
          isDisabled: true,
          reason: Reason.NOT_AUTHENTICATED,
        },
      },
      error: null,
    };
  }

  const { isMonthly, isExclusiveToOwner, limitOnePerCategory, requiresCode } =
    subscription.category;

  try {
    const processedSubscriptions = await handleSubscriptionsAvailability(
      session,
      {
        isMonthly,
        isExclusiveToOwner,
        limitOnePerCategory,
        requiresCode,
      },
      [subscription],
    );

    return {
      data: processedSubscriptions[0],
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

export {
  findAllLeafletSubscriptions,
  findAllSubscriptionsOnCategory,
  findSingleSubscriptionOnCategory,
};
