"use client";

import { ElementType, FC } from "react";
import { icons } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

import { getIconKey } from "@/lib/icon-utils";
import { getLeaflet } from "@/lib/leaflet";

// Map Pin Container - internal component for custom icon
const MapPinContainer: FC<{
  icon: ElementType;
  color: string;
}> = ({ icon: Icon, color }) => {
  return (
    <div className="relative h-[32px] w-[24px]">
      <svg
        viewBox="0 0 32 42"
        fill={color}
        className="absolute inset-0 h-full w-full drop-shadow-sm"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 9.882 16 26 16 26s16-16.118 16-26C32 7.163 24.837 0 16 0z" />
      </svg>
      <div className="absolute top-[12px] left-1/2 z-[200] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Icon
          className="text-white drop-shadow-sm"
          size={12}
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
};

// Create custom icon function - shared between input and display
export const createCustomIcon = (icon?: string | null, color?: string) => {
  const L = getLeaflet();

  const iconKey = getIconKey(icon) || "MapPin";
  const IconComponent = icons[iconKey as keyof typeof icons] || icons.MapPin;
  const iconColor = color || "hsl(var(--primary))";

  return new L.DivIcon({
    className: "custom-div-icon bg-transparent border-none",
    html: renderToStaticMarkup(
      <MapPinContainer icon={IconComponent} color={iconColor} />,
    ),
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -32],
  });
};
