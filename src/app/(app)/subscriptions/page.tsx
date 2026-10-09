"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Loader } from "@/components/custom/loader";
import { findAllStoreCategories } from "@/controller/category";

export default function SubscriptionsPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectToFirstCategory = async () => {
      try {
        const { data: categories } = await findAllStoreCategories();
        const firstCategory = categories?.content?.[0];

        if (firstCategory) {
          router.replace(`/subscriptions/${firstCategory.id}`);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    redirectToFirstCategory();
  }, [router]);

  return <Loader className="h-96" />;
}
