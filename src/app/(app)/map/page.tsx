import { Metadata } from "next";

import { ErrorComponent } from "@/components/custom/error/error";
import { findAllLeafletCategories } from "@/controller/category/category.controller";
import { findAllLeafletSubscriptions } from "@/controller/subscription/subscription.controller";

import { MapLayer } from "./_components/map-layer";

export const metadata: Metadata = {
  title: "Hartă Subscripții",
  description: "Vizualizează toate subscripțiile pe hartă",
};

export default async function MapPage() {
  const [categoriesResponse, subscriptionsResponse] = await Promise.all([
    findAllLeafletCategories(),
    findAllLeafletSubscriptions(),
  ]);

  if (categoriesResponse.error) {
    return <ErrorComponent error={categoriesResponse.error} className="m-6" />;
  }

  if (subscriptionsResponse.error) {
    return (
      <ErrorComponent error={subscriptionsResponse.error} className="m-6" />
    );
  }

  const categories = categoriesResponse.data.content;
  const subscriptions = subscriptionsResponse.data.content;

  return <MapLayer categories={categories} subscriptions={subscriptions} />;
}
