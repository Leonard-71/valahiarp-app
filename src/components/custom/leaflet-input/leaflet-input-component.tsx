"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";
import { MapContainer, Marker } from "react-leaflet";

import {
  LEAFLET_BOUNDS,
  LEAFLET_DEFAULT_CENTER,
} from "@/constants/subscription/leaflet";

import "leaflet/dist/leaflet.css";

import { icons } from "lucide-react";

import { getLeaflet } from "@/lib/leaflet";
import { cn } from "@/lib/utils";

import { createCustomIcon } from "./custom-icon";
import { CustomTileLayer } from "./custom-tile-layer";
import { MapController } from "./map-controller";
import { ZoomControl } from "./zoom-control";

export interface LeafletInputProps {
  className?: string;
  value?: { xCoordinate: number; yCoordinate: number };
  onChange?: (position: { xCoordinate: number; yCoordinate: number }) => void;
  icon?: keyof typeof icons;
  color?: string;
}

export const LeafletInput = forwardRef<HTMLDivElement, LeafletInputProps>(
  ({ className, value, onChange, icon, color }, ref) => {
    const bounds = useMemo(() => {
      const L = getLeaflet();
      return new L.LatLngBounds(LEAFLET_BOUNDS);
    }, []);

    const [position, setPosition] = useState<{
      xCoordinate: number;
      yCoordinate: number;
    }>(value || LEAFLET_DEFAULT_CENTER);

    useEffect(() => {
      if (value) {
        setPosition(value);
      }
    }, [value]);

    const customIcon = useMemo(
      () => createCustomIcon(icon, color),
      [icon, color],
    );

    const eventHandlers = useMemo(
      () => ({
        dragend(e: any) {
          const marker = e.target;
          const newPosition = marker.getLatLng();
          const newCoords = {
            yCoordinate: newPosition.lat,
            xCoordinate: newPosition.lng,
          };
          setPosition(newCoords);
          onChange?.(newCoords);
        },
      }),
      [onChange],
    );

    return (
      <div ref={ref} className={cn("h-96 w-full", className)}>
        <MapContainer
          center={[
            LEAFLET_DEFAULT_CENTER.yCoordinate,
            LEAFLET_DEFAULT_CENTER.xCoordinate,
          ]}
          minZoom={2}
          maxZoom={6}
          bounds={bounds}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          crs={getLeaflet().CRS.Simple}
          style={{ height: "100%", width: "100%", backgroundColor: "#DFC29B" }}
          zoomControl={false}
          scrollWheelZoom={true}
          doubleClickZoom={false}
          dragging={true}
          wheelPxPerZoomLevel={120}
          zoomSnap={1}
          zoomDelta={1}
        >
          <CustomTileLayer bounds={bounds} />
          <Marker
            position={[position.yCoordinate, position.xCoordinate]}
            draggable={true}
            eventHandlers={eventHandlers}
            icon={customIcon}
          />
          <MapController bounds={bounds} />
          <ZoomControl />
        </MapContainer>
      </div>
    );
  },
);

LeafletInput.displayName = "LeafletInput";
