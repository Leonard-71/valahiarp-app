import { revalidatePath } from "next/cache";

export const revalidateUserPaths = () => {
  revalidatePath("/profile");
  revalidatePath("/profile/history");
  revalidatePath("/dashboard/users");
};

export const revalidateCategoryPaths = () => {
  revalidatePath("/subscriptions");
  revalidatePath("/subscriptions", "layout");
  revalidatePath("/subscriptions/[categoryId]");
  revalidatePath("/subscriptions/[categoryId]", "layout");
  revalidatePath("/dashboard/categories");
  revalidatePath("/map");
};

export const revalidateSubscriptionPaths = () => {
  revalidatePath("/subscriptions/[categoryId]");
  revalidatePath("/subscriptions/[categoryId]/[id]");
  revalidatePath("/dashboard/subscriptions");
  revalidatePath("/map");
};

export const revalidateDocumentPaths = () => {
  revalidateSubscriptionPaths();
};

export const revalidateOrderPaths = () => {
  revalidatePath("/dashboard/orders");
  revalidatePath("/profile/history");
  revalidatePath("/subscriptions/[categoryId]/[id]");
};

export const revalidateCodePaths = () => {
  revalidatePath("/dashboard/codes");
};

export const revalidateHousePaths = () => {
  revalidatePath("/dashboard/houses");
};
