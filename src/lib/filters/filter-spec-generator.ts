import { operatorsByFilterType } from "@/lib/filters/filter-operators-map";
import {
  BooleanFilterableField,
  DateFilterableField,
  FilterableField,
  FilterType,
  MultiselectNumberFilterableField,
  MultiselectStringFilterableField,
  NumberFilterableField,
  SimpleField,
  TextFilterableField,
} from "@/lib/filters/filter-types";
import { LeafPaths } from "@/types/utils/leaf-paths";

function generateFilterSpec<T extends object>(
  fields: SimpleField<LeafPaths<T>>[],
): FilterableField[] {
  return fields.map((fieldData) => {
    switch (fieldData.type) {
      case FilterType.TEXT:
        return {
          field: fieldData.field,
          type: fieldData.type,
          allowedOperators:
            operatorsByFilterType.TEXT as TextFilterableField["allowedOperators"],
          label: fieldData.label,
        };
      case FilterType.NUMBER:
        return {
          field: fieldData.field,
          type: fieldData.type,
          allowedOperators:
            operatorsByFilterType.NUMBER as NumberFilterableField["allowedOperators"],
          label: fieldData.label,
        };
      case FilterType.BOOLEAN:
        return {
          field: fieldData.field,
          type: fieldData.type,
          allowedOperators:
            operatorsByFilterType.BOOLEAN as BooleanFilterableField["allowedOperators"],
          label: fieldData.label,
        };
      case FilterType.MULTISELECT_STRING:
        if (fieldData.getData) {
          return {
            field: fieldData.field,
            type: fieldData.type,
            allowedOperators:
              operatorsByFilterType.MULTISELECT_STRING as MultiselectStringFilterableField["allowedOperators"],
            label: fieldData.label,
            getData: fieldData.getData,
          };
        }
        return {
          field: fieldData.field,
          type: fieldData.type,
          allowedOperators:
            operatorsByFilterType.MULTISELECT_STRING as MultiselectStringFilterableField["allowedOperators"],
          label: fieldData.label,
          options: fieldData.options,
        };
      case FilterType.MULTISELECT_NUMBER:
        if (fieldData.getData) {
          return {
            field: fieldData.field,
            type: fieldData.type,
            allowedOperators:
              operatorsByFilterType.MULTISELECT_NUMBER as MultiselectNumberFilterableField["allowedOperators"],
            label: fieldData.label,
            getData: fieldData.getData,
          };
        }
        return {
          field: fieldData.field,
          type: fieldData.type,
          allowedOperators:
            operatorsByFilterType.MULTISELECT_NUMBER as MultiselectNumberFilterableField["allowedOperators"],
          label: fieldData.label,
          options: fieldData.options,
        };
      case FilterType.DATE:
        return {
          field: fieldData.field,
          type: fieldData.type,
          allowedOperators:
            operatorsByFilterType.DATE as DateFilterableField["allowedOperators"],
          label: fieldData.label,
        };
    }
  });
}

export { generateFilterSpec };
