"use client";

import { useCallback, useRef } from "react";
import { icons } from "lucide-react";
import { useMap } from "react-leaflet";

import { Button } from "@/components/ui/button";

// Zoom Control Component - shared between input and display
export const ZoomControl = () => {
  const map = useMap();
  const lastZoomTime = useRef(0);
  const ZOOM_DEBOUNCE_DELAY = 150;

  const debouncedZoomIn = useCallback(() => {
    const now = Date.now();
    if (now - lastZoomTime.current >= ZOOM_DEBOUNCE_DELAY) {
      lastZoomTime.current = now;
      map.zoomIn();
    }
  }, [map]);

  const debouncedZoomOut = useCallback(() => {
    const now = Date.now();
    if (now - lastZoomTime.current >= ZOOM_DEBOUNCE_DELAY) {
      lastZoomTime.current = now;
      map.zoomOut();
    }
  }, [map]);

  const handleZoomIn = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      debouncedZoomIn();
    },
    [debouncedZoomIn],
  );

  const handleZoomOut = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      debouncedZoomOut();
    },
    [debouncedZoomOut],
  );

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar flex flex-col space-y-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
        >
          <icons.Plus className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
        >
          <icons.Minus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
