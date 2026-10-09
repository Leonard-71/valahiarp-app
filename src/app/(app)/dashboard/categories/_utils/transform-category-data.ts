import { z } from "zod";

import { IconTag } from "@/generated/prisma";
import { CreateCategoryInput } from "@/types/category/input/create-category.input";

import { createCategoryFormSchema } from "./create-category-form.config";

type CreateCategoryFormData = z.infer<typeof createCategoryFormSchema>;

export function transformCreateCategoryData(
  data: CreateCategoryFormData,
): CreateCategoryInput {
  const {
    name,
    isMonthly,
    isExclusiveToOwner,
    limitOnePerCategory,
    requiresCode,
    hasLeaflet,
    color,
    icon,
  } = data;

  return {
    name,
    isMonthly,
    isExclusiveToOwner,
    limitOnePerCategory,
    requiresCode,
    hasLeaflet,
    ...(color && icon
      ? {
          configuration: {
            color: color,
            icon: icon as IconTag,
          },
        }
      : {}),
  };
}
