import {
  Heart,
  Home,
  icons,
  LucideIcon,
  Settings,
  ShoppingCart,
  Star,
  Tag,
  User,
} from "lucide-react";

import { IconTag } from "@/generated/prisma";

// Map IconTag enum values to actual Lucide icon components
const ICON_MAPPING: Record<string, LucideIcon> = {
  HOME: Home,
  USER: User,
  SETTINGS: Settings,
  STAR: Star,
  SHOPPING_CART: ShoppingCart,
  HEART: Heart,
  TAG: Tag,
};

export function transformIconName(iconTag: IconTag | string): string {
  if (!iconTag) return "";

  return iconTag
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join("");
}

export function getIconComponent(
  iconTag?: IconTag | string | null,
  fallbackIcon: LucideIcon = Tag,
): LucideIcon {
  if (!iconTag) {
    return fallbackIcon;
  }

  // First try direct mapping
  const mappedIcon = ICON_MAPPING[iconTag as string];
  if (mappedIcon) {
    return mappedIcon;
  }

  // Try with the icon tag as-is
  let IconComponent = icons[iconTag as keyof typeof icons];

  if (!IconComponent) {
    // Try with transformed name
    const transformedName = transformIconName(iconTag);
    IconComponent = icons[transformedName as keyof typeof icons];
  }

  if (!IconComponent) {
    console.warn(`Icon ${iconTag} not found, using fallback`);
    return fallbackIcon;
  }

  return IconComponent;
}

export function iconExists(iconTag?: IconTag | string | null): boolean {
  if (!iconTag) return false;

  // Check direct mapping first
  if (ICON_MAPPING[iconTag as string]) return true;

  if (icons[iconTag as keyof typeof icons]) return true;

  const transformedName = transformIconName(iconTag);
  return icons[transformedName as keyof typeof icons] !== undefined;
}

export function getIconKey(
  iconTag?: IconTag | string | null,
): keyof typeof icons | null {
  if (!iconTag) return null;

  // Check direct mapping first
  if (ICON_MAPPING[iconTag as string]) {
    // Return the key name for the mapped icon
    const iconName = Object.entries(icons).find(
      ([, component]) => component === ICON_MAPPING[iconTag as string],
    )?.[0];
    return (iconName as keyof typeof icons) || null;
  }

  if (icons[iconTag as keyof typeof icons]) {
    return iconTag as keyof typeof icons;
  }

  const transformedName = transformIconName(iconTag);
  if (icons[transformedName as keyof typeof icons]) {
    return transformedName as keyof typeof icons;
  }

  return null;
}
