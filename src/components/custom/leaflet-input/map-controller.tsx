"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import L from "leaflet";

export const MapController = ({ bounds }: { bounds: L.LatLngBounds }) => {
  const map = useMap();
  const lastScrollTime = useRef(0);

  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds);
      map.setMaxBounds(bounds);
    }
  }, [map, bounds]);

  const handleWheel = useCallback((e: WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 100) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    lastScrollTime.current = now;
  }, []);

  useEffect(() => {
    const container = map.getContainer();
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [map, handleWheel]);

  return null;
};
