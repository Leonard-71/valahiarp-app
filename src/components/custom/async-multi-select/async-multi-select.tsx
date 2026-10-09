"use client";

import { ReactNode, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { components } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

import { cn } from "@/lib/utils";

import { CustomClearIcon } from "../async-select/_components/custom-clear-icon";
import {
  AsyncMultiSelectOption,
  AsyncMultiSelectProps,
  InteriorDataType,
} from "./model";

export function AsyncMultiSelect<T extends AsyncMultiSelectOption>({
  className,
  remove: _remove = true,
  getData,
  debounceTimeout = 500,
  onValueChange,
  value,
  minQueryLength,
  isDisabled = false,
  formatLabel,
  placeholder,
  isClearable,
  isLoading,
  instanceId,
  startIcon,
  endIcon,
  isInvalid,
}: AsyncMultiSelectProps<T> & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isInvalid?: boolean;
}) {
  const [cacheUniq, setCacheUniq] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Introduceți text pentru a căuta",
  );

  // Use useRef to persist the interiorData across renders
  const interiorDataRef = useRef<InteriorDataType>({
    lastSearch: "",
    page: 0,
  });

  const loadOptions = async (
    search: string,
    interiorData: InteriorDataType,
  ) => {
    if (minQueryLength && search.trim().length < minQueryLength) {
      setFeedbackMessage(
        `Introduceți cel puțin ${minQueryLength} caractere pentru a căuta.`,
      );
      return {
        options: [],
        hasMore: false,
      };
    }

    // If search changed, reset pagination
    if (interiorData.lastSearch !== search) {
      interiorData.lastSearch = search;
      interiorData.page = 1;
    } else {
      // Only increment page if search is the same (pagination)
      interiorData.page++;
    }

    const input = {
      pagination: { pageIndex: interiorData.page - 1, pageSize: 10 },
      search: search || undefined,
    };

    try {
      const response = await getData(input);

      if (!response || response.error) {
        setFeedbackMessage(response?.error?.message || "A apărut o eroare.");
        return { options: [], hasMore: false };
      }

      let options: T[] = [];
      let hasMore = false;
      if (response.data) {
        options = (response.data.content || []) as T[];
        hasMore = response.data.hasMore;
      }

      return {
        options,
        hasMore,
      };
    } catch (error) {
      console.error("Error loading options:", error);
      setFeedbackMessage("Eroare la încărcarea datelor.");
      return { options: [], hasMore: false };
    }
  };

  return (
    <div className="relative flex w-full items-center">
      {startIcon && (
        <div className="text-muted-foreground pointer-events-none absolute left-3 z-10">
          {startIcon}
        </div>
      )}
      <AsyncPaginate
        isMulti
        instanceId={instanceId}
        unstyled
        isClearable={isClearable}
        isLoading={isLoading}
        isDisabled={isDisabled}
        debounceTimeout={debounceTimeout}
        loadOptions={(search) => loadOptions(search, interiorDataRef.current)}
        value={value}
        onChange={(val) => onValueChange(val as T[])}
        cacheUniqs={[cacheUniq]}
        onMenuOpen={() => {
          setCacheUniq((prevState) => !prevState);
          // Reset pagination when menu opens
          interiorDataRef.current.page = 0;
          interiorDataRef.current.lastSearch = "";
        }}
        maxMenuHeight={240}
        styles={{
          menu: (base) => ({ ...base, zIndex: 9999 }),
        }}
        noOptionsMessage={() => <span>{feedbackMessage}</span>}
        loadingMessage={() => <span>Se încarcă...</span>}
        placeholder={placeholder ? `${placeholder}` : "Selectează..."}
        formatOptionLabel={(option: T) =>
          formatLabel ? formatLabel(option) : option.label
        }
        classNames={{
          control: (state) =>
            cn(
              "h-9 rounded-md border border-input bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full",
              startIcon ? "pl-9" : "pl-3",
              endIcon ? "pr-9" : "pr-3",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",

              state.isFocused &&
                "ring-2 ring-ring ring-offset-2 ring-offset-transparent border-primary",
              state.menuIsOpen &&
                "border-accent hover:border-accent ring-0 ring-offset-0",
              state.isDisabled && "bg-muted cursor-not-allowed",
              isInvalid && "border-destructive",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
              className,
            ),
          placeholder: () => "text-muted-foreground font-medium",
          container: () => "w-full",
          menu: () =>
            "overflow-auto -mt-[1px] rounded-lg border border-accent bg-card p-1",
          menuList: () => "flex flex-col gap-y-0.5",
          option: (state) =>
            cn(
              "flex h-8 py-1 px-2 w-full items-center justify-center rounded-md !text-sm font-medium text-card-foreground border border-transparent hover:bg-muted",
              {
                "bg-muted": state.isFocused,
                "border-primary bg-muted": state.isSelected,
              },
            ),
        }}
        components={{
          DropdownIndicator: () => (
            <ChevronDown className="size-4 opacity-50" />
          ),
          ClearIndicator: (props) => (
            <components.ClearIndicator {...props}>
              <CustomClearIcon />
            </components.ClearIndicator>
          ),
        }}
      />
      {endIcon && (
        <div className="text-muted-foreground pointer-events-none absolute right-3 z-10">
          {endIcon}
        </div>
      )}
    </div>
  );
}
