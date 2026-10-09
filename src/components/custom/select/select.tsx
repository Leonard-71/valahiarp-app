"use client";

import { ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string | number;
  label: string;
  icon?: ReactNode;
};

interface SelectProps {
  options: SelectOption[];
  value: string | number | null | undefined;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  startIcon?: ReactNode;
  isInvalid?: boolean;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Selectează...",
  className,
  startIcon,
  isInvalid,
}: SelectProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      {startIcon && (
        <div className="text-muted-foreground pointer-events-none absolute left-3 z-10">
          {startIcon}
        </div>
      )}
      <SelectPrimitive.Root
        value={value === undefined || value === null ? "" : String(value)}
        onValueChange={(val) => onChange(val)}
      >
        <SelectTrigger
          className={cn(startIcon && "pl-9")}
          isInvalid={isInvalid}
        >
          <SelectValue placeholder={placeholder}>
            {(() => {
              const selectedOption = options.find(
                (opt) => String(opt.value) === String(value),
              );
              if (selectedOption?.icon) {
                return (
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0">{selectedOption.icon}</span>
                    <span>{selectedOption.label}</span>
                  </div>
                );
              }
              return selectedOption?.label;
            })()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              <div className="flex items-center gap-2">
                {option.icon && (
                  <span className="flex-shrink-0">{option.icon}</span>
                )}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive.Root>
    </div>
  );
}
