"use client";

import { FC, useTransition } from "react";

import { toast } from "sonner";

import { getErrorMessage } from "@/components/custom/error";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  action: () => Promise<any> | void;
  onSuccess?: () => void;
  successMessage?: string;
  errorMessage?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  action,
  onSuccess,
  successMessage = "Acțiunea a fost finalizată cu succes.",
  errorMessage = "A apărut o eroare.",
  confirmLabel = "Da, confirm",
  cancelLabel = "Anulează",
}) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(() => {
      const result = action();

      if (result && typeof result.then === "function") {
        (async () => {
          const response = await result;
          if (response.error) {
            toast.error(
              errorMessage
                ? errorMessage
                : getErrorMessage(response.error, errorMessage),
            );
          } else {
            toast.success(successMessage);
            onSuccess?.();
          }
        })();
      } else {
        // Synchronous action
        toast.success(successMessage);
        onSuccess?.();
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isPending}>
              {cancelLabel}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleConfirm} disabled={isPending}>
              {isPending ? "Se procesează..." : confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
