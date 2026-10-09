import { Session } from "next-auth";

import { DAY_IN_MS } from "@/constants";
import { findCodePresenceOnSubscription } from "@/service/code";
import {
  findOrderPresenceOnCategory,
  findOrderPresenceOnSubscription,
  findUserOrderPresenceOnSubscription,
} from "@/service/order";
import {
  Reason,
  RestrictionDto,
  SingleCodeResponseDto,
  SingleOrderResponseDto,
  SingleSubscriptionResponseDto,
} from "@/types";

const handleSubscriptionAvailability = async (
  session: Session,
  subscription: SingleSubscriptionResponseDto,
): Promise<RestrictionDto> => {
  const { limitOnePerCategory, requiresCode, isExclusiveToOwner, isMonthly } =
    subscription.category;

  const result: RestrictionDto = {
    meta: {},
  };

  const [
    { error: categoryOrderError, data: categoryOrder },
    { error: codeError, data: code },
    { error: dependsOnParentError, data: dependsOnParent },
    { error: orderError, data: order },
    { error: userOrderError, data: userOrder },
  ] = await Promise.all([
    limitOnePerCategory
      ? findOrderPresenceOnCategory(session, subscription.category.id)
      : { error: null, data: null },
    requiresCode
      ? findCodePresenceOnSubscription(session, subscription.id)
      : { error: null, data: null },
    subscription.dependsOnParentId !== null
      ? findUserOrderPresenceOnSubscription(
          session,
          subscription.dependsOnParentId,
        )
      : { error: null, data: null },
    isExclusiveToOwner
      ? findOrderPresenceOnSubscription(subscription.id)
      : { error: null, data: null },
    isMonthly
      ? findUserOrderPresenceOnSubscription(session, subscription.id)
      : { error: null, data: null },
  ]);

  const errors = [
    categoryOrderError,
    codeError,
    dependsOnParentError,
    orderError,
    userOrderError,
  ].filter((error) => error !== null);

  if (errors.length) {
    result.error = errors[0];
    return result;
  }

  if (subscription.dependsOnParentId !== null) {
    const { error, meta } =
      handleDependentSubscriptionAvailability(dependsOnParent);

    if (error) {
      result.error = error;
      return result;
    }

    result.meta = { ...result.meta, ...meta };
  }

  if (requiresCode) {
    const { error, meta } = handleRequiredCodeSubscriptionAvailability(code);

    if (error) {
      result.error = error;
      return result;
    }

    result.meta = { ...result.meta, ...meta };
  }

  if (isExclusiveToOwner) {
    const { error, meta } = handleOrderAvailability(
      session.user.id!,
      subscription.id,
      order,
      undefined,
      Reason.EXCLUSIVE_TO_OWNER,
    );

    if (error) {
      result.error = error;
      return result;
    }

    result.meta = { ...result.meta, ...meta };
  }

  if (limitOnePerCategory) {
    const { error, meta } = handleOrderAvailability(
      session.user.id!,
      subscription.id,
      categoryOrder,
      undefined,
      Reason.ONE_PER_CATEGORY,
    );

    if (error) {
      result.error = error;
      return result;
    }

    result.meta = { ...result.meta, ...meta };
  }

  if (isMonthly) {
    const { error, meta } = handleOrderAvailability(
      session.user.id!,
      subscription.id,
      userOrder,
      new Date(),
      Reason.ONE_PER_MONTH,
    );

    if (error) {
      result.error = error;
      return result;
    }

    result.meta = { ...result.meta, ...meta };
  }

  return result;
};

const handleDependentSubscriptionAvailability = (
  order: SingleOrderResponseDto | null,
): RestrictionDto => {
  if (!order) {
    return {
      meta: {},
      error: {
        message:
          "User tried to purchase a subscription that is not available to him",
        reason: Reason.DEPENDS_ON_PARENT,
      },
    };
  }

  return {
    meta: {},
  };
};

const handleRequiredCodeSubscriptionAvailability = (
  code: SingleCodeResponseDto | null,
): RestrictionDto => {
  if (!code || code.expiresAt < new Date()) {
    return {
      meta: {},
      error: {
        message:
          "User tried to purchase a subscription that is not available to him",
        reason: Reason.REQUIRES_CODE,
      },
    };
  }

  return {
    meta: {
      codeId: code.id,
    },
  };
};

const handleOrderAvailability = (
  userId: string,
  subscriptionId: number,
  order: SingleOrderResponseDto | null,
  defaultStartsAt: Date | undefined,
  reason: Reason,
): RestrictionDto => {
  if (!order) {
    return {
      meta: {
        startsAt: defaultStartsAt,
      },
    };
  }

  const canPreOrder =
    order.userId === userId && order.subscriptionId === subscriptionId;

  const now = new Date();
  const dateToCheck = canPreOrder
    ? new Date(now.getTime() + 4 * DAY_IN_MS)
    : now;

  const condition =
    order.expiresAt === null ||
    order.expiresAt.getTime() > dateToCheck.getTime();

  if (condition) {
    return {
      meta: {},
      error: {
        message:
          "User tried to purchase a subscription that is not available to him",
        reason,
      },
    };
  }

  const startsAt =
    order.expiresAt !== null && canPreOrder ? order.expiresAt : defaultStartsAt;

  return {
    meta: {
      startsAt,
    },
  };
};

export { handleSubscriptionAvailability };
