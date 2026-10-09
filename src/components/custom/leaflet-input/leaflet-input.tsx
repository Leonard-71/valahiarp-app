"use client";

import dynamic from "next/dynamic";

import { Loader } from "@/components/custom/loader/loader";

// Export LeafletInput with SSR disabled because react-leaflet components cause SSR issues
export const LeafletInput = dynamic(
  async () => {
    const mod = await import("./leaflet-input-component");
    return { default: mod.LeafletInput };
  },
  {
    ssr: false,
    loading: () => <Loader className="m-6 h-96" />,
  },
);
