"use client";

import { useEffect, useState } from "react";

import { SubscriptionCard } from "@/app/(app)/subscriptions/_components/subscription-card";
import { Loader } from "@/components/custom/loader/loader";
import { findAllSubscriptionsOnCategory } from "@/controller/subscription";
import { RESET_LANDING_STORE_EVENT } from "@/lib/site";
import { cn } from "@/lib/utils";
import type {
  SingleCategoryResponseDto,
  SingleSubscriptionOnCategoryResponseDto,
} from "@/types";

type BuyActionFn = (subscriptionId: number) => Promise<void>;

export function LandingStore({
  categories,
  initialCategoryId,
  initialSubscriptions,
  onBuy,
}: {
  categories: SingleCategoryResponseDto[];
  initialCategoryId?: number;
  initialSubscriptions: SingleSubscriptionOnCategoryResponseDto[];
  onBuy: BuyActionFn;
}) {
  const firstCategoryId = initialCategoryId ?? categories[0]?.id;
  const [categoryId, setCategoryId] = useState(firstCategoryId);
  const [items, setItems] = useState(initialSubscriptions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scrollToStore = () => {
      document.getElementById("abonamente")?.scrollIntoView({
        behavior: "smooth",
      });
    };

    const resetToFirstCategory = () => {
      if (firstCategoryId) {
        setCategoryId(firstCategoryId);
      }
      scrollToStore();
    };

    if (window.location.hash === "#abonamente") {
      scrollToStore();
    }

    window.addEventListener(RESET_LANDING_STORE_EVENT, resetToFirstCategory);
    return () => {
      window.removeEventListener(
        RESET_LANDING_STORE_EVENT,
        resetToFirstCategory,
      );
    };
  }, [firstCategoryId]);

  useEffect(() => {
    if (!categoryId || categoryId === initialCategoryId) {
      setItems(initialSubscriptions);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    findAllSubscriptionsOnCategory({
      pagination: { pageIndex: 0, pageSize: 10000 },
      categoryId,
    })
      .then(({ data }) => {
        if (!cancelled) {
          setItems(data?.content ?? []);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [categoryId, initialCategoryId, initialSubscriptions]);

  return (
    <section
      id="abonamente"
      className="bg-background relative flex min-h-dvh scroll-mt-24 flex-col px-5 py-16 md:px-0 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col md:w-[80%] md:max-w-none">
        <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-4">
          <div>
            <p className="text-ember mb-2 text-xs tracking-[0.32em] uppercase">
              Magazin
            </p>
            <h2 className="font-display text-[1.75rem] leading-tight md:text-5xl">
              Abonamente
            </h2>
          </div> 
        </div>

        {categories.length > 0 ? (
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                className={cn(
                  "glass-panel shrink-0 rounded-full px-4 py-2 text-xs tracking-[0.16em] uppercase transition-colors",
                  categoryId === category.id
                    ? "border-ember/70 bg-[rgba(140,28,28,0.45)] text-[#f2e9e1]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        ) : null}

        {loading ? (
          <Loader className="h-64" />
        ) : items.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center text-sm">
            Nu există abonamente în această categorie.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                categoryId={categoryId ?? subscription.category.id}
                onBuy={onBuy}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
