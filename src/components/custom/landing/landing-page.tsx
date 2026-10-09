"use client";

import { useEffect } from "react";

import { MapLayer } from "@/app/(app)/map/_components/map-layer";
import { SCROLL_LANDING_MAP_EVENT, SITE } from "@/lib/site";
import type {
  SingleCategoryResponseDto,
  SingleSubscriptionOnCategoryResponseDto,
  SingleSubscriptionResponseDto,
} from "@/types";

import { LandingStore } from "./landing-store";

const HERO_IMAGE = "/hero.jpg";

type BuyActionFn = (subscriptionId: number) => Promise<void>;

export function LandingPage({
  categories,
  initialCategoryId,
  initialSubscriptions,
  mapCategories,
  mapSubscriptions,
  onBuy,
}: {
  categories: SingleCategoryResponseDto[];
  initialCategoryId?: number;
  initialSubscriptions: SingleSubscriptionOnCategoryResponseDto[];
  mapCategories: SingleCategoryResponseDto[];
  mapSubscriptions: SingleSubscriptionResponseDto[];
  onBuy: BuyActionFn;
}) {
  useEffect(() => {
    const scrollToMap = () => {
      document.getElementById("harta")?.scrollIntoView({
        behavior: "smooth",
      });
    };

    if (window.location.hash === "#harta") {
      scrollToMap();
    }

    window.addEventListener(SCROLL_LANDING_MAP_EVENT, scrollToMap);
    return () => {
      window.removeEventListener(SCROLL_LANDING_MAP_EVENT, scrollToMap);
    };
  }, []);

  return (
    <div className="relative">
      <section className="relative isolate flex min-h-dvh overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-black/35"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(140,28,28,0.18)_0%,transparent_55%,rgba(0,0,0,0.55)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-dvh w-full flex-col items-center px-6 pt-28 text-center md:pt-32">
          <h1 className="font-display title-burnt text-6xl text-[#f2e9e1] sm:text-7xl md:text-9xl">
            {SITE.name}
          </h1>
          <p className="mt-auto mb-24 max-w-xl text-sm tracking-[0.28em] text-[#e8c8a0] uppercase md:mb-23 md:text-base">
            {SITE.tagline}
          </p>
        </div>

        <a
          href="#abonamente"
          className="absolute bottom-8 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-3 text-[#f2e9e1] transition-opacity hover:opacity-80"
          aria-label="Scroll"
        >
          <span
            className="relative h-8 w-[22px] rounded-full border-[1.5px] border-current"
            aria-hidden
          >
            <span className="absolute top-1.5 left-1/2 h-1.5 w-[3px] -translate-x-1/2 rounded-full bg-current animate-mouse-wheel" />
          </span>
          
        </a>
      </section>

      <LandingStore
        categories={categories}
        initialCategoryId={initialCategoryId}
        initialSubscriptions={initialSubscriptions}
        onBuy={onBuy}
      />

      <section
        id="harta"
        className="bg-background relative flex min-h-dvh scroll-mt-24 flex-col px-5 py-16 md:px-0 md:pt-20 md:pb-10"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:w-[80%] md:max-w-none">
          <div className="mb-8">
            <h2 className="font-display text-[1.75rem] leading-tight md:text-6xl">
              Hartă
            </h2>
          </div>
          <div className="glass-panel flex h-[70dvh] w-full overflow-hidden rounded-2xl">
            <MapLayer
              categories={mapCategories}
              subscriptions={mapSubscriptions}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
