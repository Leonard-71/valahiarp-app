import type {
  FilterableField,
  FilterOperator,
} from "@/lib/filters/filter-types";

import { array, coerce, date, object, string } from "zod";

import { FieldType, FormFieldConfig } from "@/components/custom/form-builder";
import {
  BetweenOperators,
  FilterType,
  NullaryOperators,
} from "@/lib/filters/filter-types";

export const generateFilterFormConfig = (
  fieldSpec?: FilterableField,
  operator?: FilterOperator,
  initialValue?: any,
  meta?: any,
): FormFieldConfig[] => {
  if (!fieldSpec || !operator) {
    return [];
  }

  const isBetween =
    operator.includes(BetweenOperators.BETWEEN) ||
    operator.includes(BetweenOperators.NOT_BETWEEN);

  const isNullary = [
    NullaryOperators.IS_EMPTY,
    NullaryOperators.IS_NOT_EMPTY,
  ].includes(operator as NullaryOperators);

  if (isNullary) {
    return [];
  }

  if (isBetween) {
    const betweenValue = initialValue as { min: unknown; max: unknown } | null;
    if (fieldSpec.type === FilterType.NUMBER) {
      return [
        {
          name: "min",
          placeholder: "Minim",
          type: FieldType.Number,
          validation: coerce.number({
            required_error: "Valoarea minimă este obligatorie.",
          }),
          defaultValue: betweenValue?.min as any,
        },
        {
          name: "max",
          placeholder: "Maxim",
          type: FieldType.Number,
          validation: coerce.number({
            required_error: "Valoarea maximă este obligatorie.",
          }),
          defaultValue: betweenValue?.max as any,
        },
      ];
    }
    if (fieldSpec.type === FilterType.DATE) {
      return [
        {
          name: "min",
          placeholder: "Minim",
          type: FieldType.DatePicker,
          validation: date({ required_error: "Data minimă este obligatorie." }),
          defaultValue: betweenValue?.min as any,
        },
        {
          name: "max",
          placeholder: "Maxim",
          type: FieldType.DatePicker,
          validation: date({ required_error: "Data maximă este obligatorie." }),
          defaultValue: betweenValue?.max as any,
        },
      ];
    }
  }

  const baseConfig = {
    name: "value",
    placeholder: "Valoare",
    defaultValue: initialValue as any,
  };

  switch (fieldSpec.type) {
    case FilterType.TEXT:
      return [
        {
          ...baseConfig,
          type: FieldType.Text,
          validation: string({
            required_error: "Valoarea este obligatorie.",
          }).min(1, "Valoarea este obligatorie."),
        },
      ];
    case FilterType.NUMBER:
      return [
        {
          ...baseConfig,
          type: FieldType.Number,
          validation: coerce.number({
            required_error: "Valoarea este obligatorie.",
            invalid_type_error: "Valoarea trebuie să fie numerică.",
          }),
        },
      ];
    case FilterType.DATE:
      return [
        {
          ...baseConfig,
          type: FieldType.DatePicker,
          validation: date({ required_error: "Data este obligatorie." }),
        },
      ];
    case FilterType.BOOLEAN:
      return [
        {
          ...baseConfig,
          type: FieldType.Checkbox,
          label: "Activat",
          placeholder: "",
        },
      ];
    case FilterType.MULTISELECT_STRING:
    case FilterType.MULTISELECT_NUMBER: {
      const isAsync = "getData" in fieldSpec && fieldSpec.getData;
      let transformedValue = initialValue;

      if (isAsync && Array.isArray(initialValue)) {
        // Use labels from meta if available, otherwise fallback to String(v)
        if (meta?.frontendValue && Array.isArray(meta.frontendValue)) {
          transformedValue = meta.frontendValue;
        } else {
          transformedValue = initialValue.map((v: string | number) => ({
            value: v,
            label: String(v),
          }));
        }
      }

      const config = {
        ...baseConfig,
        defaultValue: transformedValue as any,
      };

      if (fieldSpec.type === FilterType.MULTISELECT_STRING) {
        if (isAsync) {
          return [
            {
              ...config,
              type: FieldType.AsyncMultiSelect,
              getData: fieldSpec.getData,
              validation: array(
                object({
                  value: string(),
                  label: string(),
                }),
              ).min(1, "Selectați cel puțin o opțiune."),
            },
          ];
        }
        return [
          {
            ...config,
            type: FieldType.MultiSelect,
            options: fieldSpec.options || [],
            validation: array(string()).min(
              1,
              "Selectați cel puțin o opțiune.",
            ),
          },
        ];
      } else {
        // MULTISELECT_NUMBER
        if (isAsync) {
          return [
            {
              ...config,
              type: FieldType.AsyncMultiSelect,
              getData: fieldSpec.getData,
              validation: array(
                object({
                  value: coerce.number({ invalid_type_error: "Selectați cel puțin o opțiune" }),
                  label: string(),
                }),
              ).min(1, "Selectați cel puțin o opțiune."),
            },
          ];
        }
        return [
          {
            ...config,
            type: FieldType.MultiSelect,
            options: fieldSpec.options || [],
            validation: array(coerce.number({ invalid_type_error: "Selectați cel puțin o opțiune" })).min(
              1,
              "Selectați cel puțin o opțiune.",
            ),
          },
        ];
      }
    }
    default:
      return [];
  }
};
