"use client";

import dynamic from "next/dynamic";

import { Loader } from "@/components/custom/loader/loader";

// Export MapLayer with SSR disabled because react-leaflet components cause SSR issues
export const MapLayer = dynamic(
  async () => {
    const mod = await import("./map-layer-component");
    return { default: mod.MapLayer };
  },
  {
    ssr: false,
    loading: () => <Loader className="m-6 h-96" />,
  },
);
