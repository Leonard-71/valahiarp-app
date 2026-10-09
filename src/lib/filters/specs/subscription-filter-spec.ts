import { SingleSubscriptionResponseDto } from "@/types";

import { generateFilterSpec } from "../filter-spec-generator";
import { FilterType } from "../filter-types";

// Common field definitions shared between base and UI versions
export const subscriptionFilterFields = [
  { field: "name", type: FilterType.TEXT, label: "Nume" },
  { field: "price", type: FilterType.NUMBER, label: "Pret" },
  { field: "isRecommended", type: FilterType.BOOLEAN, label: "Recomandat" },
  { field: "isArchived", type: FilterType.BOOLEAN, label: "Arhivat" },
  {
    field: "category.isArchived",
    type: FilterType.BOOLEAN,
    label: "Categorie arhivată",
  },
  {
    field: "category.isMonthly",
    type: FilterType.BOOLEAN,
    label: "Este lunar",
  },
  {
    field: "category.isExclusiveToOwner",
    type: FilterType.BOOLEAN,
    label: "Este exclusiv proprietarului",
  },
  {
    field: "category.limitOnePerCategory",
    type: FilterType.BOOLEAN,
    label: "Este limitat la unul pe categorie",
  },
  {
    field: "category.requiresCode",
    type: FilterType.BOOLEAN,
    label: "Necesită cod",
  },
  {
    field: "category.hasLeaflet",
    type: FilterType.BOOLEAN,
    label: "Are locatie pe harta",
  },
] as const;

// Placeholder function to avoid circular dependency in base spec
const placeholderGetData = async () => ({
  data: {
    content: [],
    totalCount: 0,
    pageCount: 0,
    hasMore: false,
  },
  error: null,
});

// Fields that need getData functions in UI version
export const categoryIdFieldBase = {
  field: "category.id",
  type: FilterType.MULTISELECT_NUMBER,
  label: "Categorie ID",
  getData: placeholderGetData,
} as const;

export const dependsOnParentIdFieldBase = {
  field: "dependsOnParent.id",
  type: FilterType.MULTISELECT_NUMBER,
  label: "Dependent de ID",
  getData: placeholderGetData,
} as const;

// Base filter spec without getData functions - used in service layer to avoid circular dependency
const subscriptionFilterSpec =
  generateFilterSpec<SingleSubscriptionResponseDto>([
    ...subscriptionFilterFields,
    categoryIdFieldBase,
    dependsOnParentIdFieldBase,
  ]);

export { subscriptionFilterSpec };
