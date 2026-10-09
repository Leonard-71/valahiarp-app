"use client";

import { FC } from "react";

import { toast } from "sonner";

import { getErrorMessage } from "@/components/custom/error";
import { FormBuilder } from "@/components/custom/form-builder";
import { Button } from "@/components/ui/button";
import { createCategory, updateCategory } from "@/controller/admin";
import { SingleCategoryResponseDto } from "@/types";

import {
  createCategoryFormConfig,
  createCategoryFormSchema,
} from "../_utils/create-category-form.config";
import { transformCreateCategoryData } from "../_utils/transform-category-data";

interface CategoriesFormProps {
  category: SingleCategoryResponseDto | null;
  onSuccess: () => void;
}

export const CategoriesForm: FC<CategoriesFormProps> = ({
  category,
  onSuccess,
}) => {
  const handleFormSubmit = async (data: any) => {
    const transformedData = transformCreateCategoryData(data);
    const response = category
      ? await updateCategory(category.id, transformedData)
      : await createCategory(transformedData);

    if (response.error) {
      toast.error(
        getErrorMessage(
          response.error,
          category
            ? "Categoria nu a putut fi actualizată."
            : "Categoria nu a putut fi creată.",
        ),
      );
      return;
    }

    toast.success(
      category
        ? "Categoria a fost actualizată cu succes."
        : "Categoria a fost creată cu succes.",
    );
    onSuccess();
  };

  const configWithDefaults = category
    ? createCategoryFormConfig.map((field) => {
        const categoryKey = field.name as keyof SingleCategoryResponseDto;
        let defaultValue: any = category[categoryKey];

        if (field.name === "color" && category.configuration) {
          defaultValue = category.configuration.color;
        }
        if (field.name === "icon" && category.configuration) {
          defaultValue = category.configuration.icon;
        }

        return { ...field, defaultValue };
      })
    : createCategoryFormConfig;

  return (
    <FormBuilder
      className="p-0 shadow-none"
      config={configWithDefaults}
      schema={createCategoryFormSchema}
      onSubmit={handleFormSubmit}
      submitButton={({ isSubmitting }) => (
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Se procesează..."
            : category
              ? "Actualizează"
              : "Creează categorie"}
        </Button>
      )}
    />
  );
};
