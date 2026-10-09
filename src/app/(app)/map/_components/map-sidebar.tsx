"use client";

import type { SingleCategoryResponseDto } from "@/types";

import { FC } from "react";
import { icons } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconComponent } from "@/lib/icon-utils";

interface MapSidebarProps {
  categories: SingleCategoryResponseDto[];
  selectedCategories: number[];
  onCategoryToggle: (categoryId: number) => void;
}

export const MapSidebar: FC<MapSidebarProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle,
}) => {
  return (
    <div className="bg-sidebar text-sidebar-foreground border-sidebar-border flex h-full flex-col border-r">
      <div className="border-sidebar-border border-b p-6">
        {/* Placeholder pentru buton - va fi poziționat deasupra cu z-index mai mare */}
        <div className="h-7"></div>
      </div>

      <div className="flex flex-1 flex-col">
        <ScrollArea className="flex-1">
          <div className="space-y-0.5 p-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              // Get icon component with proper transformation and fallback
              const IconComponent = getIconComponent(
                category.configuration?.icon,
                icons.MapPin,
              );

              return (
                <div
                  key={category.id}
                  className={`group flex cursor-pointer items-center rounded-md px-3 py-2 transition-all duration-150 ${
                    isSelected
                      ? "bg-sidebar-accent/80 text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/40"
                  }`}
                  onClick={() => onCategoryToggle(category.id)}
                >
                  <div className="relative mr-3 shrink-0">
                    <svg
                      viewBox="0 0 32 42"
                      className="h-5 w-4 drop-shadow-sm"
                      fill={
                        category.configuration?.color || "hsl(var(--primary))"
                      }
                    >
                      <path d="M16 0C7.163 0 0 7.163 0 16c0 9.882 16 26 16 26s16-16.118 16-26C32 7.163 24.837 0 16 0z" />
                    </svg>
                    <IconComponent
                      className="absolute top-[8px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-sm"
                      size={10}
                      strokeWidth={2.5}
                    />
                  </div>

                  <span className="flex-1 truncate font-medium">
                    {category.name}
                  </span>

                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => {
                      // Prevent event propagation to avoid double toggle
                      onCategoryToggle(category.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="ml-2 shrink-0"
                  />
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="mt-auto border-t p-4">
          <div className="text-muted-foreground text-center text-xs">
            {selectedCategories.length} din {categories.length} categorii
            selectate
          </div>
        </div>
      </div>
    </div>
  );
};
