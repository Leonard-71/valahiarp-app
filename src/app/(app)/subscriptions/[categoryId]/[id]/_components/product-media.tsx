"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";

import { cn } from "@/lib/utils";

interface ProductMediaProps {
  images: { url: string; key: string; name?: string | null }[];
  name: string;
}

export function ProductMedia({ images, name }: ProductMediaProps) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = images[active] ?? images[0];

  if (!current) {
    return (
      <div className="relative aspect-[4/5] w-full bg-[#120e0c]">
        <Image
          src="/valahiarp-logo.png"
          alt={name}
          fill
          className="object-contain p-10"
          priority
        />
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="relative aspect-[4/5] w-full cursor-zoom-in bg-[#120e0c]"
        aria-label={`Vezi ${name}`}
      >
        <Image
          src={current.url}
          alt={current.name ?? name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-8 md:p-12"
          priority
        />
      </button>

      {images.length > 1 ? (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.key}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative h-16 w-16 shrink-0 bg-[#120e0c] transition-opacity",
                active === index ? "opacity-100" : "opacity-40 hover:opacity-80",
              )}
              aria-label={`Imagine ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.name ?? `${name} ${index + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      ) : null}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((image) => ({ src: image.url }))}
        index={active}
      />
    </div>
  );
}
