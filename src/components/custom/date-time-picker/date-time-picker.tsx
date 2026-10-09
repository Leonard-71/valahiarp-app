"use client";

import { ReactNode, useState } from "react";
// Generic date-time picker for use in forms
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DateTimePicker({
  value,
  onChange,
  startIcon,
  endIcon,
  isInvalid,
  placeholder,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isInvalid?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const timeValue = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(
        value.getMinutes(),
      ).padStart(2, "0")}`
    : "";

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setOpen(false);
    if (!selectedDate) {
      onChange(null);
      return;
    }
    const newDate = new Date(selectedDate);
    if (value) {
      newDate.setHours(
        value.getHours(),
        value.getMinutes(),
        value.getSeconds(),
      );
    }
    onChange(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (!value) {
      const newDate = new Date();
      const [hours, minutes] = time.split(":").map(Number);
      newDate.setHours(hours, minutes);
      onChange(newDate);
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(value);
    newDate.setHours(hours, minutes);
    onChange(newDate);
  };

  return (
    <div className="flex gap-1">
      <div className="flex w-full flex-col gap-3">
        <div className="relative flex w-full items-center">
          {startIcon && (
            <div className="text-muted-foreground pointer-events-none absolute left-3 z-10">
              {startIcon}
            </div>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                role="button"
                aria-expanded={open}
                id="date-picker"
                className={cn(
                  "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base font-normal shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
                  {
                    "text-muted-foreground": !value,
                  },
                  isInvalid && "border-destructive",
                  startIcon ? "pl-9" : "pl-3",
                  endIcon ? "pr-9" : "pr-3",
                )}
              >
                <span>
                  {value
                    ? value.toLocaleDateString()
                    : placeholder || "Selectează o dată"}
                </span>
                <ChevronDownIcon className="ml-auto h-4 w-4" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={value ?? undefined}
                captionLayout="dropdown"
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>
          {endIcon && (
            <div className="text-muted-foreground pointer-events-none absolute right-3 z-10">
              {endIcon}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id="time-picker"
          value={timeValue}
          onChange={handleTimeChange}
          className={cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 appearance-none rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
            isInvalid && "border-destructive",
          )}
        />
      </div>
    </div>
  );
}
