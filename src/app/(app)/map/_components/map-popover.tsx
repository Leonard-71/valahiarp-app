"use client";

import type {
  SingleCategoryResponseDto,
  SingleSubscriptionResponseDto,
} from "@/types";

import Link from "next/link";
import { FC } from "react";
import { Popup } from "react-leaflet";

import { Button } from "@/components/ui/button";

interface MapPopoverProps {
  subscription: SingleSubscriptionResponseDto;
  category: SingleCategoryResponseDto;
}

export const MapPopover: FC<MapPopoverProps> = ({ subscription, category }) => {
  const detailsHref = `/subscriptions/${category.id}/${subscription.id}`;
  const categoryColor = category.configuration?.color || "var(--ember)";

  return (
    <Popup closeButton closeOnClick maxWidth={176} minWidth={168}>
      <article className="map-pin-card flex flex-col">
        <div className="flex h-7 items-center pr-6">
          <span
            className="inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase"
            style={{ borderColor: categoryColor, color: categoryColor }}
          >
            {category.name}
          </span>
        </div>

        <h3 className="text-foreground mt-3 mb-3 px-2 text-center text-[20px] leading-none font-semibold">
          {subscription.name}
        </h3>

        <div className="border-border flex items-center justify-between gap-2 border-t pt-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-[9px] leading-none tracking-[0.18em] uppercase">
              Preț
            </span>
            <span className="text-foreground text-lg leading-none font-semibold tabular-nums">
              {subscription.price} EUR
            </span>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-ember text-ember hover:border-ember hover:bg-ember/10 hover:text-ember h-8 shrink-0 rounded-full px-3 text-[10px] tracking-[0.14em] uppercase"
          >
            <Link href={detailsHref}>Cumpără</Link>
          </Button>
        </div>
      </article>
    </Popup>
  );
};
