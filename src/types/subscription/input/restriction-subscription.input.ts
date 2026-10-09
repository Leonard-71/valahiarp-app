import { SingleCodeResponseDto, SingleOrderResponseDto } from "@/types";

type RestrictionInput = {
  isMonthly: boolean;
  isExclusiveToOwner: boolean;
  limitOnePerCategory: boolean;
  requiresCode: boolean;
};

type RestrictionMaps = {
  codesMap: Map<number, SingleCodeResponseDto>;
  dependentOnParentOrdersMap: Map<number, SingleOrderResponseDto>;
  ordersMap: Map<number, SingleOrderResponseDto>;
  userOrdersMap: Map<number, SingleOrderResponseDto>;
};

export type { RestrictionInput, RestrictionMaps };
