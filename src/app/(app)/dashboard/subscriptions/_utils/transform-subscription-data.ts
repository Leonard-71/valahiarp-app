import { infer as _infer } from "zod";

import { CreateSubscriptionInput, UpdateSubscriptionInput } from "@/types";
import { selectedCategoryValidator } from "@/validation/category/category.validator";

type SelectedCategory = _infer<typeof selectedCategoryValidator>;

type RawFormData = Omit<
  CreateSubscriptionInput | UpdateSubscriptionInput,
  "categoryId" | "dependsOnParentId" | "location"
> & {
  categoryId: { value: number; label: string; meta: SelectedCategory };
  dependsOnParentId: { value: number; label: string } | null;
  location?: { xCoordinate: number; yCoordinate: number };
};

export const transformSubscriptionData = (
  data: RawFormData,
): CreateSubscriptionInput => {
  const { categoryId, location, ...rest } = data;

  const shouldIncludeLocation = categoryId.meta.hasLeaflet && location;

  return {
    ...rest,
    categoryId: categoryId.value,
    dependsOnParentId: data.dependsOnParentId
      ? data.dependsOnParentId.value
      : undefined,
    location: shouldIncludeLocation ? location : undefined,
  };
};
