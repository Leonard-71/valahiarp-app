import { forwardRef, ReactNode } from "react";

import {
  Input as UiInput,
  InputProps as UiInputProps,
} from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputProps extends UiInputProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", className)}>
        {startIcon && (
          <div className="text-muted-foreground pointer-events-none absolute left-3 z-10">
            {startIcon}
          </div>
        )}
        <UiInput
          className={cn(startIcon ? "pl-9" : "pl-3", endIcon ? "pr-9" : "pr-3")}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className="text-muted-foreground pointer-events-none absolute right-3 z-10">
            {endIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
