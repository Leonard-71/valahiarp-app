"use client";

import Image from "next/image";
import Link from "next/link";

import { BuyButton } from "@/components/custom/buy-button";
import { HoverPopover } from "@/components/custom/hover-popover";
import { getSubscriptionDisabledReason } from "@/constants/subscription/disabled-reasons";
import { SingleSubscriptionOnCategoryResponseDto } from "@/types";

interface SubscriptionCardProps {
  subscription: SingleSubscriptionOnCategoryResponseDto;
  categoryId: number;
  onBuy: (subscriptionId: number) => Promise<void>;
}

export function SubscriptionCard({
  subscription,
  categoryId,
  onBuy,
}: SubscriptionCardProps) {
  const coverUrl =
    subscription.documents.find((d) => d.url)?.url ??
    "/valahiarp-logo.png";
  const isDisabled = subscription.meta.isDisabled;
  const detailsHref = `/subscriptions/${categoryId}/${subscription.id}`;
  const disabledReason = getSubscriptionDisabledReason(
    subscription.meta.reason,
  );

  const handleBuy = async () => {
    await onBuy(subscription.id);
  };

  const buyButton = (
    <BuyButton
      onBuy={handleBuy}
      disabled={isDisabled}
      size="sm"
      className="w-full text-xs tracking-[0.16em] uppercase"
    >
      Cumpără
    </BuyButton>
  );

  return (
    <article className="group">
      <Link href={detailsHref} className="block">
        <div className="relative aspect-[5/3] overflow-hidden bg-[#120e0c]">
          <Image
            src={coverUrl}
            alt={subscription.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            priority={false}
          />
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <Link href={detailsHref} className="min-w-0">
          <h3 className="font-display text-foreground group-hover:text-ember truncate text-lg tracking-wide transition-colors">
            {subscription.name}
          </h3>
        </Link>
        <p className="text-muted-foreground shrink-0 pt-1 text-sm tabular-nums">
          {subscription.price} EUR
        </p>
      </div>

      <div className="mt-4">
        {isDisabled ? (
          <HoverPopover
            className="block w-full"
            content={<p className="max-w-[220px] text-sm">{disabledReason}</p>}
          >
            {buyButton}
          </HoverPopover>
        ) : (
          buyButton
        )}
      </div>
    </article>
  );
}
