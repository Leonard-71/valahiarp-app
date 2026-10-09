"use client";

import { FC, useMemo } from "react";
import { icons } from "lucide-react";
import { MapContainer, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import type {
  SingleCategoryResponseDto,
  SingleSubscriptionResponseDto,
} from "@/types";

import {
  createCustomIcon,
  CustomTileLayer,
  MapController,
  ZoomControl,
} from "@/components/custom/leaflet-input";
import {
  LEAFLET_BOUNDS,
  LEAFLET_DEFAULT_CENTER,
} from "@/constants/subscription/leaflet";
import { getLeaflet } from "@/lib/leaflet";

import { MapPopover } from "./map-popover";

interface MapComponentProps {
  subscriptions: SingleSubscriptionResponseDto[];
  categories: SingleCategoryResponseDto[];
}

export const MapComponent: FC<MapComponentProps> = ({
  subscriptions,
  categories,
}) => {
  const bounds = useMemo(() => {
    const L = getLeaflet();
    return new L.LatLngBounds(LEAFLET_BOUNDS);
  }, []);

  const categoryMap = useMemo(() => {
    const map = new Map<number, SingleCategoryResponseDto>();
    categories.forEach((category) => {
      map.set(category.id, category);
    });
    return map;
  }, [categories]);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[
          LEAFLET_DEFAULT_CENTER.yCoordinate,
          LEAFLET_DEFAULT_CENTER.xCoordinate,
        ]}
        style={{ height: "100%", width: "100%", backgroundColor: "#DFC29B" }}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        crs={getLeaflet().CRS.Simple}
        minZoom={3}
        maxZoom={6}
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        wheelPxPerZoomLevel={120}
        zoomSnap={1}
        zoomDelta={1}
      >
        <CustomTileLayer bounds={bounds} />
        <MapController bounds={bounds} />

        {subscriptions.map((subscription) => {
          const category = categoryMap.get(subscription.categoryId);
          if (!category || !subscription.location) return null;

          const position = [
            subscription.location.yCoordinate,
            subscription.location.xCoordinate,
          ] as [number, number];

          const customIcon = createCustomIcon(
            category.configuration?.icon as keyof typeof icons,
            category.configuration?.color,
          );

          return (
            <Marker key={subscription.id} position={position} icon={customIcon}>
              <MapPopover subscription={subscription} category={category} />
            </Marker>
          );
        })}

        <ZoomControl />
      </MapContainer>
    </div>
  );
};
