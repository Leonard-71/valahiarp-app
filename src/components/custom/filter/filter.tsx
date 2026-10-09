import type {
  FilterableField,
  FilterCondition,
  FilterOperator,
} from "@/lib/filters/filter-types";

import { createRef, RefObject, useMemo, useRef, useState } from "react";
import { Filter as FilterIcon, PlusCircle, RotateCw } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { operatorsByFilterType } from "@/lib/filters/filter-operators-map";
import { FilterType } from "@/lib/filters/filter-types";
import { cn } from "@/lib/utils";

import { generateFilterFormConfig } from "./filter-form.config";
import { FilterRow, FilterRowRef } from "./filter-row";

interface FilterProps {
  spec: FilterableField[];
  value: FilterCondition[];
  onChange: (filters: FilterCondition[]) => void;
  onClose: () => void;
}

function Filter({ spec, value, onChange, onClose }: FilterProps) {
  const [internalFilters, setInternalFilters] = useState<FilterCondition[]>(
    () => {
      const validSpecFields = new Set(spec.map((s) => s.field));
      return value.filter((condition) => validSpecFields.has(condition.field));
    },
  );
  const filterRowRefs = useRef<RefObject<FilterRowRef>[]>([]);

  if (filterRowRefs.current.length !== internalFilters.length) {
    filterRowRefs.current = Array(internalFilters.length)
      .fill(null)
      .map((_, i) => filterRowRefs.current[i] || createRef<FilterRowRef>());
  }

  const usedFields = useMemo(
    () => new Set(internalFilters.map((f) => f.field)),
    [internalFilters],
  );

  const availableFields = useMemo(
    () => spec.filter((s) => !usedFields.has(s.field)),
    [spec, usedFields],
  );

  const getDefaultValueForFieldType = (fieldSpec: FilterableField) => {
    if (fieldSpec.type === FilterType.BOOLEAN) {
      return false;
    }
    return null;
  };

  const handleAddFilter = () => {
    if (availableFields.length === 0) return;
    const newFieldSpec = availableFields[0];
    const newOperator = operatorsByFilterType[newFieldSpec.type][0];
    const newFilter: FilterCondition = {
      field: newFieldSpec.field,
      operator: newOperator,
      value: getDefaultValueForFieldType(newFieldSpec),
    } as FilterCondition;
    setInternalFilters((prev) => [...prev, newFilter]);
  };

  const handleRemoveFilter = (index: number) => {
    setInternalFilters((prev) => {
      const newFilters = [...prev];
      newFilters.splice(index, 1);
      return newFilters;
    });
  };

  const handleFilterChange = (
    index: number,
    updatedFilter: FilterCondition,
  ) => {
    setInternalFilters((prev) => {
      const newFilters = [...prev];
      newFilters[index] = updatedFilter;
      return newFilters;
    });
  };

  const handleApplyFilters = async () => {
    try {
      const promises = filterRowRefs.current
        .filter((ref) => ref.current)
        .map((ref) => ref.current!.validate());
      const results = await Promise.all(promises);

      if (results.some((res) => res === null)) {
        toast.error("Unul sau mai multe filtre sunt invalide.");
        return;
      }
      onChange(results as FilterCondition[]);
      onClose();
    } catch (e) {
      toast.error("A apărut o eroare la validarea filtrelor.");
      console.error("An error occurred during filter validation", e);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        {internalFilters.map((filter, index) => {
          const fieldSpec = spec.find((s) => s.field === filter.field);
          const formConfig = generateFilterFormConfig(
            fieldSpec,
            filter.operator as FilterOperator,
            "value" in filter ? filter.value : null,
            filter.meta,
          );

          return (
            <FilterRow
              key={filter.field}
              ref={filterRowRefs.current[index]}
              spec={spec}
              filter={filter}
              config={formConfig}
              availableFields={availableFields}
              onChange={(updatedFilter) =>
                handleFilterChange(index, updatedFilter)
              }
              onRemove={() => handleRemoveFilter(index)}
            />
          );
        })}
      </div>
      <Button
        className={cn(internalFilters.length > 0 && "mt-4")}
        variant="ghost"
        onClick={handleAddFilter}
        disabled={availableFields.length === 0}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adaugă filtru
      </Button>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={() => setInternalFilters([])}>
          <RotateCw className="mr-2 h-4 w-4" />
          Resetează
        </Button>
        <Button onClick={handleApplyFilters}>
          <FilterIcon className="mr-2 h-4 w-4" />
          Filtrează
        </Button>
      </div>
    </div>
  );
}

export { Filter };
