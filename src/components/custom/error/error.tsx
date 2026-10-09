import { FC } from "react";
import { AlertTriangle } from "lucide-react";

import { ERROR_MESSAGES, ERROR_TITLES } from "@/constants/utils/error-messages";
import { cn } from "@/lib/utils";
import { ErrorResponseDto, Reason } from "@/types";

const isErrorResponseDto = (
  error: unknown,
): error is ErrorResponseDto["error"] => {
  return (
    typeof error === "object" &&
    error !== null &&
    "reason" in error &&
    "message" in error
  );
};

export const getErrorMessage = (
  error: unknown,
  fallback = "A apărut o eroare neașteptată.",
): string => {
  if (isErrorResponseDto(error)) {
    const reason = error.reason as Reason;
    return ERROR_MESSAGES[reason] || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return fallback;
};

const getErrorTitle = (error: unknown): string => {
  if (isErrorResponseDto(error)) {
    const reason = error.reason as Reason;
    return ERROR_TITLES[reason] || "Eroare";
  }

  return "Eroare";
};

interface ErrorComponentProps {
  error: unknown;
  className?: string;
}

export const ErrorComponent: FC<ErrorComponentProps> = ({
  error,
  className,
}) => {
  const message = getErrorMessage(error);
  const title = getErrorTitle(error);

  return (
    <div
      role="alert"
      className={cn(
        "border-destructive text-destructive flex items-center gap-3 rounded-lg border p-4",
        className,
      )}
    >
      <AlertTriangle className="h-6 w-6 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
