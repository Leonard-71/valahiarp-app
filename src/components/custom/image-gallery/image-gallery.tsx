"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function hashStringToHue(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

export interface ImageItem {
  url: string | null;
  key: string;
  name?: string | null;
}

interface ImageGalleryProps {
  images: ImageItem[];
  onDelete?: (key: string) => void;
  isDeleting?: string | null;
  className?: string;
}

export const ImageGallery = ({
  images,
  onDelete,
  isDeleting,
  className,
}: ImageGalleryProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const validImages = useMemo(
    () =>
      images.filter((image) => image.url !== null) as (ImageItem & {
        url: string;
      })[],
    [images],
  );

  useEffect(() => {
    if (selectedIndex >= validImages.length) {
      setSelectedIndex(Math.max(0, validImages.length - 1));
    }
  }, [validImages.length, selectedIndex]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (selectedIndex >= validImages.length) {
      setSelectedIndex(Math.max(0, validImages.length - 1));
    }
  }, [validImages.length, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const onThumbClick = (index: number) => {
    setSelectedIndex(index);
  };

  if (!validImages || validImages.length === 0) {
    return null;
  }

  const selectedImage = validImages[selectedIndex];

  const hue = selectedImage
    ? hashStringToHue(selectedImage.name ?? selectedImage.key)
    : 0;
  const imageBgStyle = {
    backgroundImage: `linear-gradient(135deg, hsla(${hue}, 80%, 50%, 0.14) 0%, transparent 60%)`,
  } as const;

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div
        className="group bg-card relative aspect-video w-full cursor-pointer overflow-hidden rounded-md"
        style={imageBgStyle}
      >
        {selectedImage && (
          <>
            <Image
              src={selectedImage.url}
              alt={selectedImage.name ?? "Selected image"}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              onClick={() => openLightbox(selectedIndex)}
            />
            {onDelete && (
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete(selectedImage.key)}
                  isLoading={isDeleting === selectedImage.key}
                  aria-label="Delete image"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-sidebar-accent relative w-full rounded-md p-1">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {validImages.map((image, index) => (
              <div
                key={image.key}
                className={cn(
                  "relative ml-2 flex-shrink-0 flex-grow-0 basis-1/4 cursor-pointer md:basis-1/5 lg:basis-1/6",
                  index === 0 && "ml-0",
                  "p-1",
                )}
                onClick={() => onThumbClick(index)}
              >
                <div
                  className={cn(
                    "p-1",
                    selectedIndex === index &&
                      "ring-primary ring-offset-background rounded-md ring-2 ring-offset-2",
                  )}
                >
                  <div className="aspect-square overflow-hidden rounded-md">
                    <Image
                      src={image.url}
                      alt={image.name ?? "Gallery thumbnail"}
                      fill
                      className={cn(
                        "object-cover transition-opacity",
                        selectedIndex !== index &&
                          "opacity-60 hover:opacity-100",
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="bg-background/50 absolute top-1/2 left-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-sm"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/50 absolute top-1/2 right-0 z-10 translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-sm"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={validImages.map((img) => ({ src: img.url ?? null }))}
        index={selectedIndex}
      />
    </div>
  );
};
