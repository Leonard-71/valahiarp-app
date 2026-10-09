import {
  FilterableField,
  FilterCondition,
  FilterOperator,
  FilterValidationError,
} from "@/lib/filters/filter-types";

function validateFiltersDetailed(
  filters: FilterCondition[],
  spec: FilterableField[],
): { isValid: boolean; errors: FilterValidationError[] } {
  const errors: FilterValidationError[] = [];

  for (const filter of filters) {
    const fieldSpec = spec.find((s) => s.field === filter.field);
    if (!fieldSpec) {
      errors.push({
        field: filter.field,
        operator: filter.operator,
        reason: "Field is not filterable",
      });
      continue;
    }

    if (!(fieldSpec.allowedOperators as FilterOperator[]).includes(filter.operator)) {
      errors.push({
        field: filter.field,
        operator: filter.operator,
        reason: "Operator not allowed for this field type",
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export { validateFiltersDetailed };
