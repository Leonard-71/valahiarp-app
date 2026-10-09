"use client";

import { FC } from "react";

import { toast } from "sonner";

import { getErrorMessage } from "@/components/custom/error";
import { FormBuilder } from "@/components/custom/form-builder";
import { Button } from "@/components/ui/button";
import { createCode } from "@/controller/admin";

import {
  createCodeFormConfig,
  createCodeFormSchema,
} from "../_utils/create-code-form.config";
import { transformCreateCodeData } from "../_utils/transform-code-data";

interface CodesFormProps {
  onSuccess: () => void;
}

export const CodesForm: FC<CodesFormProps> = ({ onSuccess }) => {
  const handleFormSubmit = async (data: any) => {
    const transformedData = transformCreateCodeData(data);
    const response = await createCode(transformedData);

    if (response.error) {
      toast.error(
        getErrorMessage(
          response.error,
          "A apărut o eroare la crearea codului.",
        ),
      );
      return;
    }

    toast.success("Codul a fost creat cu succes.");
    onSuccess();
  };

  return (
    <FormBuilder
      className="p-0 shadow-none"
      config={createCodeFormConfig}
      schema={createCodeFormSchema}
      onSubmit={handleFormSubmit}
      submitButton={({ isSubmitting }) => (
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Se creează..." : "Creează cod"}
        </Button>
      )}
    />
  );
};
