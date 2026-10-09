import { redirect } from "next/navigation";

import { checkoutOrder } from "@/controller/order";
import { Reason } from "@/types";

import { SubscriptionsInfiniteList } from "../_components/subscriptions-infinite-list";

interface CategorySubscriptionsPageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function CategorySubscriptionsPage({
  params,
}: CategorySubscriptionsPageProps) {
  const { categoryId } = await params;
  const effectiveCategoryId = Number(categoryId);

  async function buySubscription(subscriptionId: number) {
    "use server";
    const { error } = await checkoutOrder(subscriptionId);
    if (error) {
      if (error.reason === Reason.UNAUTHORIZED_ERROR) {
        redirect("/login");
      }
      if (error.reason === Reason.NO_USER_DETAILS) {
        redirect("/profile");
      }
      throw new Error(error.message);
    }
  }

  return (
    <SubscriptionsInfiniteList
      categoryId={effectiveCategoryId}
      onBuy={buySubscription}
    />
  );
}
