"use client";

import type {
  FilterableField,
  FilterCondition,
  FilterOperator,
} from "@/lib/filters/filter-types";

import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { XIcon } from "lucide-react";

import {
  createZodSchema,
  FieldType,
  FormBuilder,
  FormFieldConfig,
} from "@/components/custom/form-builder";
import { Select } from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import { operatorsByFilterType } from "@/lib/filters/filter-operators-map";
import { BetweenOperators, FilterType } from "@/lib/filters/filter-types";
import { cn } from "@/lib/utils";

import { filterOperatorLabels } from "./filter-operator.labels";

export interface FilterRowRef {
  validate: () => Promise<FilterCondition | null>;
}

interface FilterRowProps {
  spec: FilterableField[];
  filter: FilterCondition;
  config: FormFieldConfig[];
  availableFields: FilterableField[];
  onRemove: () => void;
  onChange: (filter: FilterCondition) => void;
}

export const FilterRow = forwardRef<FilterRowRef, FilterRowProps>(
  (
    { spec, filter, config: formConfig, availableFields, onRemove, onChange },
    ref,
  ) => {
    const [field, setField] = useState(filter.field);
    const [operator, setOperator] = useState(filter.operator);

    const selectedFieldSpec = useMemo(
      () => spec.find((s) => s.field === field)!,
      [spec, field],
    );

    const availableOperators = useMemo(
      () => operatorsByFilterType[selectedFieldSpec.type],
      [selectedFieldSpec],
    );

    const schema = useMemo(() => createZodSchema(formConfig), [formConfig]);

    const selectableFields = useMemo(() => {
      const currentFieldSpec = spec.find((s) => s.field === filter.field);
      return currentFieldSpec
        ? [currentFieldSpec, ...availableFields]
        : availableFields;
    }, [spec, filter.field, availableFields]);

    const getDefaultValueForFieldType = (fieldSpec: FilterableField) => {
      if (fieldSpec.type === FilterType.BOOLEAN) {
        return false;
      }
      return null;
    };

    const handleFieldChange = (newField: string | number) => {
      const newFieldSpec = spec.find((s) => s.field === newField)!;
      const newOperator = operatorsByFilterType[newFieldSpec.type][0];
      setField(newField as string);
      setOperator(newOperator);
      onChange({
        field: newField as string,
        operator: newOperator,
        value: getDefaultValueForFieldType(newFieldSpec),
      } as FilterCondition);
    };

    const handleOperatorChange = (newOperator: string | number) => {
      setOperator(newOperator as FilterOperator);
      onChange({
        field,
        operator: newOperator as FilterOperator,
        value: getDefaultValueForFieldType(selectedFieldSpec),
      } as FilterCondition);
    };

    const formBuilderRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      validate: async (): Promise<FilterCondition | null> => {
        if (formConfig.length === 0) {
          return {
            field,
            operator: operator,
          } as FilterCondition;
        }

        try {
          const data = await formBuilderRef.current?.submit();

          if (!data) return null;

          let transformedValue: any = data.value;

          const isBetween =
            operator.includes(BetweenOperators.BETWEEN) ||
            operator.includes(BetweenOperators.NOT_BETWEEN);

          if (isBetween) {
            transformedValue = {
              min: data.min,
              max: data.max,
            };
          } else if (
            Array.isArray(data.value) &&
            "getData" in selectedFieldSpec &&
            selectedFieldSpec.getData
          ) {
            // For ASYNC multiselect, FormBuilder returns array of { value, label }
            // Extract IDs for backend but keep full objects in meta for repopulation
            const fullObjects = data.value.filter(
              (item: any): item is { value: string | number; label: string } =>
                typeof item === "object" && item !== null && "value" in item,
            );

            transformedValue = fullObjects.map((item: { value: string | number; label: string }) => item.value);

            // Store full objects with labels in meta for repopulation
            return {
              field,
              operator,
              value: transformedValue,
              meta: { frontendValue: fullObjects },
            } as FilterCondition;
          } else if (
            data.value !== null &&
            typeof data.value === "object" &&
            "value" in data.value &&
            !(data.value instanceof Date)
          ) {
            // For simple ASYNC select
            transformedValue = (
              data.value as { value: string | number; label: string }
            ).value;
          }

          return {
            field,
            operator,
            value: transformedValue,
          } as FilterCondition;
        } catch {
          // Validation error is caught here
          return null; // Indicates validation failure
        }
      },
    }));

    return (
      <div className="flex flex-col items-start gap-2 md:flex-row">
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Select
            options={selectableFields.map((s) => ({
              value: s.field,
              label: s.label,
            }))}
            value={field}
            onChange={handleFieldChange}
          />
          <Select
            options={availableOperators.map((op) => ({
              value: op,
              label: filterOperatorLabels[op] || op,
            }))}
            value={operator}
            onChange={handleOperatorChange}
          />
        </div>

        <div
          className={cn(
            "w-full flex-1",
            formConfig[0].type === FieldType.Checkbox && "my-auto h-full",
          )}
        >
          {formConfig.length > 0 && (
            <FormBuilder
              key={`${field}-${operator}`}
              ref={formBuilderRef}
              config={formConfig}
              schema={schema}
              className={
                "flex flex-col items-start gap-2 space-y-0 p-0 shadow-none md:flex-row"
              }
              showLabels={false}
              showErrorMessages={true}
            />
          )}
        </div>

        <Button variant="ghost" onClick={onRemove} className="w-full md:hidden">
          <XIcon className="mr-2 h-4 w-4" />
          Șterge filtru
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="hidden md:inline-flex"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  },
);

FilterRow.displayName = "FilterRow";
