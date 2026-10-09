"use server";

import { findAllStoreCategories } from "@/controller/category";
import { ServerSidebarConfig } from "@/types/sidebar-config";

export async function buildStoreSidebarConfig(
  selectedCategoryId?: string | number,
): Promise<ServerSidebarConfig> {
  const { data } = await findAllStoreCategories();
  const categories = data?.content ?? [];

  return {
    sections: [
      {
        title: "Categorii",
        routes: categories.map((category) => ({
          href: `/subscriptions/${category.id}`,
          iconName: "TAG",
          label: category.name,
          isActive:
            selectedCategoryId != null &&
            String(category.id) === String(selectedCategoryId),
        })),
      },
    ],
    defaultCollapsed: false,
    showToggle: true,
  };
}
