import { ChangeEvent, forwardRef, ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isInvalid?: boolean;
  placeholder?: string;
  className?: string;
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      value = "#000000",
      onChange,
      name,
      disabled,
      startIcon,
      endIcon,
      isInvalid,
      placeholder = "Selectează o culoare",
      className,
    },
    ref,
  ) => {
    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const colorValue = inputValue.startsWith("#")
        ? inputValue
        : `#${inputValue}`;

      if (/^#[0-9A-Fa-f]{0,6}$/.test(colorValue) && onChange) {
        onChange(colorValue);
      }
    };

    return (
      <div className={cn("flex items-center gap-2", className)}>
        {/* Color picker input with consistent styling */}
        <div className="relative flex items-center">
          <input
            type="color"
            id={name ? `${name}-color` : undefined}
            name={name ? `${name}-color` : undefined}
            value={value}
            onChange={handleColorChange}
            disabled={disabled}
            className={cn(
              "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 w-12 cursor-pointer rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              isInvalid && "border-destructive",
            )}
            aria-label="Selectează culoarea"
          />
        </div>

        {/* Text input for hex value */}
        <div className="relative flex flex-1 items-center">
          {startIcon && (
            <div className="text-muted-foreground pointer-events-none absolute left-3 z-10">
              {startIcon}
            </div>
          )}
          <Input
            ref={ref}
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={handleTextChange}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              "font-mono text-sm",
              startIcon ? "pl-9" : "pl-3",
              endIcon ? "pr-9" : "pr-3",
              isInvalid && "border-destructive",
            )}
            pattern="#?[0-9A-Fa-f]{6}"
            maxLength={7}
            aria-label="Cod culoare hex"
          />
          {endIcon && (
            <div className="text-muted-foreground pointer-events-none absolute right-3 z-10">
              {endIcon}
            </div>
          )}
        </div>
      </div>
    );
  },
);

ColorPicker.displayName = "ColorPicker";
