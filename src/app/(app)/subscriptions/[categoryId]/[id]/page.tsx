import Link from "next/link";

import { ErrorComponent } from "@/components/custom/error/error";
import { HoverPopover } from "@/components/custom/hover-popover";
import { getSubscriptionDisabledReason } from "@/constants/subscription/disabled-reasons";
import { findSingleSubscriptionOnCategory } from "@/controller/subscription";

import { BuyButtonWrapper } from "./_components/buy-button-wrapper";
import { ProductMedia } from "./_components/product-media";

interface SubscriptionDetailsPageProps {
  params: Promise<{ categoryId: string; id: string }>;
}

export default async function SubscriptionDetailsPage({
  params,
}: SubscriptionDetailsPageProps) {
  const { categoryId: categoryIdParam, id: idParam } = await params;
  const id = Number(idParam);
  const categoryId = Number(categoryIdParam);
  const { data, error } = await findSingleSubscriptionOnCategory(id);

  if (!data) {
    return <ErrorComponent error={error} className="m-6" />;
  }

  const galleryItems = data.documents
    .filter((document) => document.url)
    .map((document) => ({
      url: document.url!,
      key: String(document.id),
      name: document.name ?? null,
    }));

  const isDisabled = data.meta.isDisabled;
  const categoryName = data.category?.name ?? "Magazin";
  const backHref = `/subscriptions/${data.category?.id ?? categoryId}`;
  const buyButton = (
    <BuyButtonWrapper
      subscriptionId={id}
      disabled={isDisabled}
      className="w-full text-xs tracking-[0.2em] uppercase"
      size="lg"
    />
  );

  return (
    <section className="bg-background">
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-2 lg:items-start">
        <div className="px-5 pt-8 md:px-8 lg:sticky lg:top-24 lg:px-8 lg:pt-10 lg:pb-20">
          <Link
            href={backHref}
            className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors"
          >
            {categoryName}
          </Link>
          <h1 className="font-display mt-6 text-4xl md:text-6xl">{data.name}</h1>
          {data.servicePackage ? (
            <p className="text-muted-foreground mt-4 text-base">
              {data.servicePackage}
            </p>
          ) : null}
          <div className="mt-8">
            <ProductMedia images={galleryItems} name={data.name} />
          </div>
        </div>

        <div className="flex flex-col px-5 py-10 md:px-8 lg:px-12 lg:py-16">
          {data.description ? (
            <div
              className="rich-text-content text-muted-foreground max-w-md text-sm leading-relaxed [&_a]:text-foreground [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-normal [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-normal [&_h3]:text-base [&_h3]:font-medium"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          ) : null}

          <div className="mt-10 max-w-xs border-t border-[rgba(242,233,225,0.08)] pt-10">
            <p className="text-muted-foreground text-lg tabular-nums">
              {data.price} EUR
            </p>
            <div className="mt-6">
              {isDisabled ? (
                <HoverPopover
                  className="block w-full"
                  content={
                    <p className="max-w-[220px] text-sm">
                      {getSubscriptionDisabledReason(data.meta.reason)}
                    </p>
                  }
                >
                  {buyButton}
                </HoverPopover>
              ) : (
                buyButton
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
