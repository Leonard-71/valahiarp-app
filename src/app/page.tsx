import { redirect } from "next/navigation";

import { LandingPage } from "@/components/custom/landing/landing-page";
import { findAllLeafletCategories, findAllStoreCategories } from "@/controller/category";
import { checkoutOrder } from "@/controller/order";
import {
  findAllLeafletSubscriptions,
  findAllSubscriptionsOnCategory,
} from "@/controller/subscription";
import { Reason } from "@/types";

export default async function Home() {
  const [storeCategoriesResponse, leafletCategoriesResponse, leafletSubscriptionsResponse] =
    await Promise.all([
      findAllStoreCategories(),
      findAllLeafletCategories(),
      findAllLeafletSubscriptions(),
    ]);

  const categories = storeCategoriesResponse.data?.content ?? [];
  const initialCategoryId = categories[0]?.id;

  const initialSubscriptions = initialCategoryId
    ? ((
        await findAllSubscriptionsOnCategory({
          pagination: { pageIndex: 0, pageSize: 10000 },
          categoryId: initialCategoryId,
        })
      ).data?.content ?? [])
    : [];

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
    <LandingPage
      categories={categories}
      initialCategoryId={initialCategoryId}
      initialSubscriptions={initialSubscriptions}
      mapCategories={leafletCategoriesResponse.data?.content ?? []}
      mapSubscriptions={leafletSubscriptionsResponse.data?.content ?? []}
      onBuy={buySubscription}
    />
  );
}
