import { Session } from "next-auth";

import { DAY_IN_MS } from "@/constants";
import { findCodePresenceOnSubscriptions } from "@/service/code";
import {
  findOrderPresenceOnCategory,
  findOrderPresenceOnSubscriptions,
  findUserOrderPresenceOnSubscriptions,
} from "@/service/order";
import {
  Reason,
  RestrictionInput,
  RestrictionMaps,
  SingleCodeResponseDto,
  SingleSubscriptionOnCategoryResponseDto,
  SingleSubscriptionResponseDto,
} from "@/types";
import { SingleOrderResponseDto } from "@/types/order";

const handleSubscriptionsAvailability = async (
  session: Session,
  input: RestrictionInput,
  subscriptions: SingleSubscriptionResponseDto[],
): Promise<SingleSubscriptionOnCategoryResponseDto[]> => {
  const { limitOnePerCategory, requiresCode, isExclusiveToOwner, isMonthly } =
    input;

  if (limitOnePerCategory) {
    const result = await handleLimitOnePerCategorySubscriptionsAvailability(
      session,
      subscriptions,
    );

    if (result) {
      return result;
    }
  }

  const subscriptionIds = subscriptions.map((s) => s.id);
  const dependsOnParentIds = subscriptions
    .map((s) => s.dependsOnParentId)
    .filter((id) => id !== null);

  const codesMap = new Map<number, SingleCodeResponseDto>();
  const dependentOnParentOrdersMap = new Map<number, SingleOrderResponseDto>();
  const ordersMap = new Map<number, SingleOrderResponseDto>();
  const userOrdersMap = new Map<number, SingleOrderResponseDto>();

  const [
    { error: codeError, data: codes },
    { error: dependsOnParentError, data: dependsOnParentsOrders },
    { error: orderError, data: orders },
    { error: userOrderError, data: userOrders },
  ] = await Promise.all([
    requiresCode
      ? findCodePresenceOnSubscriptions(session, subscriptionIds)
      : { error: null, data: [] },
    dependsOnParentIds.length > 0
      ? findUserOrderPresenceOnSubscriptions(session, dependsOnParentIds)
      : { error: null, data: [] },
    isExclusiveToOwner
      ? findOrderPresenceOnSubscriptions(subscriptionIds)
      : { error: null, data: [] },
    isMonthly
      ? findUserOrderPresenceOnSubscriptions(session, subscriptionIds)
      : { error: null, data: [] },
  ]);

  if (codeError || dependsOnParentError || orderError || userOrderError) {
    throw new Error(
      codeError?.message ||
        dependsOnParentError?.message ||
        orderError?.message ||
        userOrderError?.message,
    );
  }

  codes.forEach((code) => {
    codesMap.set(code.subscriptionId, code);
  });

  dependsOnParentsOrders.forEach((order) => {
    dependentOnParentOrdersMap.set(order.subscriptionId, order);
  });

  orders.forEach((order) => {
    ordersMap.set(order.subscriptionId, order);
  });

  userOrders.forEach((order) => {
    userOrdersMap.set(order.subscriptionId, order);
  });

  const maps = {
    codesMap,
    dependentOnParentOrdersMap,
    ordersMap,
    userOrdersMap,
  };

  return subscriptions.map((subscription) =>
    handleSubscriptionAvailability(session, input, subscription, maps),
  );
};

const handleLimitOnePerCategorySubscriptionsAvailability = async (
  session: Session,
  subscriptions: SingleSubscriptionResponseDto[],
): Promise<SingleSubscriptionOnCategoryResponseDto[] | null> => {
  const { error, data } = await findOrderPresenceOnCategory(
    session,
    subscriptions[0].category.id,
  );

  if (error) {
    throw new Error(error.message);
  }

  const condition =
    data && (data.expiresAt === null || data.expiresAt > new Date());

  if (condition) {
    return subscriptions.map((subscription) => {
      if (subscription.id === data.subscriptionId && data.expiresAt !== null) {
        const canPreOrder =
          data.expiresAt.getTime() < new Date().getTime() + 4 * DAY_IN_MS;

        if (canPreOrder) {
          return {
            ...subscription,
            meta: {
              isDisabled: false,
              reason: null,
            },
          };
        }
      }

      return {
        ...subscription,
        meta: {
          isDisabled: true,
          reason: Reason.ONE_PER_CATEGORY,
          expiresAt: data.expiresAt,
        },
      };
    });
  }

  return null;
};

const handleSubscriptionAvailability = (
  session: Session,
  input: RestrictionInput,
  subscription: SingleSubscriptionResponseDto,
  maps: RestrictionMaps,
): SingleSubscriptionOnCategoryResponseDto => {
  const { isMonthly, isExclusiveToOwner, requiresCode } = input;

  if (isMonthly) {
    const result = handleMonthlySubscriptionAvailability(subscription, maps);

    if (result) {
      return result;
    }
  }

  if (isExclusiveToOwner) {
    const result = handleExclusiveToOwnerSubscriptionAvailability(
      session,
      subscription,
      maps,
    );

    if (result) {
      return result;
    }
  }

  if (requiresCode) {
    const result = handleRequiredCodeSubscriptionAvailability(
      subscription,
      maps,
    );

    if (result) {
      return result;
    }
  }

  if (subscription.dependsOnParentId) {
    const result = handleDependentSubscriptionAvailability(subscription, maps);

    if (result) {
      return result;
    }
  }

  return {
    ...subscription,
    meta: {
      isDisabled: false,
      reason: null,
    },
  };
};

const handleMonthlySubscriptionAvailability = (
  subscription: SingleSubscriptionResponseDto,
  maps: RestrictionMaps,
): SingleSubscriptionOnCategoryResponseDto | null => {
  const data = maps.userOrdersMap.get(subscription.id);

  if (data) {
    const canPreOrder = data.subscriptionId === subscription.id;

    const now = new Date();
    const dateToCheck = canPreOrder
      ? new Date(now.getTime() + 4 * DAY_IN_MS)
      : now;

    const condition =
      data.expiresAt === null ||
      data.expiresAt.getTime() > dateToCheck.getTime();

    if (condition) {
      return {
        ...subscription,
        meta: {
          isDisabled: true,
          reason: Reason.ONE_PER_MONTH,
          expiresAt: data.expiresAt,
        },
      };
    }
  }

  return null;
};

const handleExclusiveToOwnerSubscriptionAvailability = (
  session: Session,
  subscription: SingleSubscriptionResponseDto,
  maps: RestrictionMaps,
): SingleSubscriptionOnCategoryResponseDto | null => {
  const data = maps.ordersMap.get(subscription.id);

  if (data) {
    const canPreOrder =
      data.userId === session.user.id &&
      data.subscriptionId === subscription.id;

    const now = new Date();
    const dateToCheck = canPreOrder
      ? new Date(now.getTime() + 4 * DAY_IN_MS)
      : now;

    const condition =
      data.expiresAt === null ||
      data.expiresAt.getTime() > dateToCheck.getTime();

    if (condition) {
      return {
        ...subscription,
        meta: {
          isDisabled: true,
          reason: Reason.EXCLUSIVE_TO_OWNER,
          expiresAt: data.expiresAt,
        },
      };
    }
  }

  return null;
};

const handleRequiredCodeSubscriptionAvailability = (
  subscription: SingleSubscriptionResponseDto,
  maps: RestrictionMaps,
): SingleSubscriptionOnCategoryResponseDto | null => {
  const data = maps.codesMap.get(subscription.id);

  if (!data || data.expiresAt < new Date()) {
    return {
      ...subscription,
      meta: {
        isDisabled: true,
        reason: Reason.REQUIRES_CODE,
      },
    };
  }

  return null;
};

const handleDependentSubscriptionAvailability = (
  subscription: SingleSubscriptionResponseDto,
  maps: RestrictionMaps,
): SingleSubscriptionOnCategoryResponseDto | null => {
  if (!subscription.dependsOnParentId) {
    return null;
  }

  const data = maps.dependentOnParentOrdersMap.get(
    subscription.dependsOnParentId,
  );

  if (!data) {
    return {
      ...subscription,
      meta: {
        isDisabled: true,
        reason: Reason.DEPENDS_ON_PARENT,
      },
    };
  }

  return null;
};

export { handleSubscriptionsAvailability };
