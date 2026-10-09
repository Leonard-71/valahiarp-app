"use client";

import { useEffect, useState } from "react";

import { Loader } from "@/components/custom/loader/loader";
import { findAllSubscriptionsOnCategory } from "@/controller/subscription";
import { SingleSubscriptionOnCategoryResponseDto } from "@/types";

import { SubscriptionCard } from "./subscription-card";

type BuyActionFn = (subscriptionId: number) => Promise<void>;

interface SubscriptionsInfiniteListProps {
  categoryId: number;
  onBuy: BuyActionFn;
}

export function SubscriptionsInfiniteList({
  categoryId,
  onBuy,
}: SubscriptionsInfiniteListProps) {
  const [items, setItems] = useState<SingleSubscriptionOnCategoryResponseDto[]>(
    [],
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load next page function
  const loadNextPage = async () => {
    if (!hasMore) return;

    // Allow first load even if loading is true
    if (loading && items.length > 0) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await findAllSubscriptionsOnCategory({
        pagination: { pageIndex, pageSize: 10 },
        categoryId,
      });

      if (error) {
        setError(error.message || "Eroare la încărcarea subscripțiilor");
        setHasMore(false);
        return;
      }

      if (data) {
        setItems((prev) => {
          const existing = new Set(prev.map((i) => i.id));
          const newItems = data.content.filter((i) => !existing.has(i.id));
          return [...prev, ...newItems];
        });
        setHasMore(data.hasMore);
        setPageIndex((p) => p + 1);
      }
    } catch {
      setError("Eroare la încărcarea subscripțiilor");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Reset when category changes
  useEffect(() => {
    setItems([]);
    setPageIndex(0);
    setHasMore(true);
    setError(null);
    setLoading(true);
  }, [categoryId]);

  // Load first page
  useEffect(() => {
    if (pageIndex === 0 && items.length === 0 && hasMore) {
      loadNextPage();
    }
  }, [categoryId]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadNextPage();
        }
      },
      { rootMargin: "100px" },
    );

    const sentinel = document.querySelector("[data-sentinel]");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, categoryId]);

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  if (loading && items.length === 0) {
    return <Loader className="h-96" />;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((sub) => (
          <SubscriptionCard
            key={sub.id}
            subscription={sub}
            categoryId={categoryId}
            onBuy={onBuy}
          />
        ))}
      </div>

      <div data-sentinel className="mt-6 flex items-center justify-center">
        {loading && items.length > 0 && (
          <Loader className="h-12 bg-transparent" />
        )}
        {!loading && items.length === 0 && !hasMore && (
          <div className="text-muted-foreground">
            Nu există subscripții în această categorie.
          </div>
        )}
      </div>
    </div>
  );
}
