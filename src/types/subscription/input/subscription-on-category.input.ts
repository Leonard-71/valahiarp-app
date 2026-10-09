import { RequestInput } from "@/types/utils";

type SubscriptionOnCategoryInput = Omit<RequestInput, "search" | "filters"> & {
  categoryId: number;
};

export type { SubscriptionOnCategoryInput };
