"use client";

import type { LatLngBounds, Map as LeafletMap, TileLayer } from "leaflet";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { LEAFLET_TILE_SIZE } from "@/constants/subscription/leaflet";
import { getLeaflet } from "@/lib/leaflet";

interface CustomTileLayerProps {
  bounds: LatLngBounds;
}

interface TileCoords {
  x: number;
  y: number;
  z: number;
}

interface ExtendedTileLayer extends TileLayer {
  getTileUrl: (coords: TileCoords) => string;
}

export const CustomTileLayer: React.FC<CustomTileLayerProps> = ({ bounds }) => {
  const map: LeafletMap = useMap();

  useEffect(() => {
    const L = getLeaflet();

    const tileLayer = L.tileLayer("", {
      minZoom: 0,
      maxZoom: 7,
      tileSize: LEAFLET_TILE_SIZE,
      noWrap: true,
      bounds,
      keepBuffer: 2,
      errorTileUrl: "/map-tiles/blank.png",
    }) as ExtendedTileLayer;

    tileLayer.getTileUrl = function (coords: TileCoords): string {
      if (coords.z < 0 || coords.z > 7) {
        return "/map-tiles/blank.png";
      }

      const maxTileIndex = Math.pow(2, coords.z) - 1;
      const tileY = coords.y < 0 ? Math.abs(coords.y) - 1 : coords.y;

      if (
        coords.x < 0 ||
        coords.x > maxTileIndex ||
        tileY < 0 ||
        tileY > maxTileIndex
      ) {
        return "/map-tiles/blank.png";
      }

      return `/map-tiles/${coords.z}/${coords.x}/${tileY}.png`;
    };

    tileLayer.addTo(map);

    return (): void => {
      map.removeLayer(tileLayer);
    };
  }, [map, bounds]);

  return null;
};
