"use client";

import type {
  SingleCategoryResponseDto,
  SingleSubscriptionResponseDto,
} from "@/types";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { MapComponent } from "./map-component";
import { MapSidebar } from "./map-sidebar";

interface MapLayerProps {
  categories: SingleCategoryResponseDto[];
  subscriptions: SingleSubscriptionResponseDto[];
}

export function MapLayer({ categories, subscriptions }: MapLayerProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    categories.map((cat) => cat.id),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredSubscriptions = subscriptions.filter((sub) =>
    selectedCategories.includes(sub.categoryId),
  );

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative flex h-full flex-1">
      <div className="flex-1">
        <MapComponent
          categories={categories}
          subscriptions={filteredSubscriptions}
        />
      </div>

      <Button
        variant={sidebarOpen ? "default" : "secondary"}
        className={`absolute top-5 left-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
          sidebarOpen ? "flex-row-reverse" : ""
        }`}
        onClick={toggleSidebar}
      >
        <motion.div
          layout
          animate={{ rotate: sidebarOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="h-4 w-4 shrink-0" />
        </motion.div>
        <motion.div layout transition={{ duration: 0.3 }}>
          <h2 className="text-lg font-semibold">Legenda</h2>
        </motion.div>
      </Button>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-40 bg-black/50"
            onClick={toggleSidebar}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <MapSidebar
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryToggle={toggleCategory}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
