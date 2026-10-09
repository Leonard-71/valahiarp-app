import React from "react";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

interface WarningProps {
  message: string;
  className?: string;
}

export const Warning = ({ message, className }: WarningProps) => {
  return (
    <span className={cn("block", className)}>
      <AlertTriangle className="float-left mr-2 mt-0.5 size-4 text-amber-500" />
      <span>
        <strong>ATENȚIE:</strong> {message}
      </span>
    </span>
  );
};
