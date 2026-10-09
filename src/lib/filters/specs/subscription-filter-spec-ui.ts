import {
  asyncSelectCategories,
  asyncSelectSubscriptions,
} from "@/controller/select";
import { SingleSubscriptionResponseDto } from "@/types";

import { generateFilterSpec } from "../filter-spec-generator";
import { FilterType } from "../filter-types";
import { subscriptionFilterFields } from "./subscription-filter-spec";

// UI filter spec with getData functions - augments the base spec
const subscriptionFilterSpecUi =
  generateFilterSpec<SingleSubscriptionResponseDto>([
    ...subscriptionFilterFields,
    {
      field: "category.id",
      type: FilterType.MULTISELECT_NUMBER,
      label: "Categorie",
      getData: asyncSelectCategories,
    },
    {
      field: "dependsOnParent.id",
      type: FilterType.MULTISELECT_NUMBER,
      label: "Dependent de",
      getData: asyncSelectSubscriptions,
    },
  ]);

export { subscriptionFilterSpecUi };
