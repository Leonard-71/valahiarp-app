"use client";

import { ReactNode } from "react";

import {
  PopoverContent,
  PopoverTrigger,
  Popover as UiPopover,
} from "@/components/ui/popover";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Popover({
  trigger,
  children,
  open,
  onOpenChange,
  className,
}: PopoverProps) {
  return (
    <UiPopover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={className}>{children}</PopoverContent>
    </UiPopover>
  );
}
