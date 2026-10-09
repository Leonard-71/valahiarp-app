"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type MultiSelectOption = {
  value: string | number;
  label: string;
};

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: (string | number)[] | null | undefined;
  onChange: (value: (string | number)[]) => void;
  placeholder?: string;
  className?: string;
  startIcon?: ReactNode;
  isInvalid?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Selectează...",
  className,
  startIcon,
  isInvalid,
  ...props
}: MultiSelectProps & ComponentPropsWithoutRef<"button">) {
  const currentValue = value || [];

  const handleSelectChange = (optionValue: string | number) => {
    if (currentValue.map(String).includes(String(optionValue))) {
      onChange(currentValue.filter((v) => String(v) !== String(optionValue)));
    } else {
      onChange([...currentValue, optionValue]);
    }
  };

  const isOptionSelected = (optionValue: string | number): boolean => {
    return currentValue.map(String).includes(String(optionValue));
  };

  const selectedLabels = options
    .filter((option) => isOptionSelected(option.value))
    .map((option) => option.label);

  const displayText =
    selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          {...props}
          className={cn(
            "focus-visible:ring-ring/50 focus-visible:border-ring flex w-full items-center rounded-md border bg-transparent px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2",
            "border-input",
            isInvalid && "border-destructive",
            className,
          )}
        >
          {startIcon && (
            <span className="text-muted-foreground mr-2 flex items-center">
              {startIcon}
            </span>
          )}
          <span className="flex-1 truncate text-left">{displayText}</span>
          <ChevronDownIcon className="size-4 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="start"
      >
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={isOptionSelected(option.value)}
            onCheckedChange={() => handleSelectChange(option.value)}
            onSelect={(e) => e.preventDefault()}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
