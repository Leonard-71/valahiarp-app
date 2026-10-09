"use client";

import { ReactNode } from "react";

import { getIconComponent } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";
import { ServerSidebarConfig } from "@/types/sidebar-config";

import { createSidebarConfig } from "./_utils";
import { Sidebar } from "./sidebar";

interface SidebarWrapperWithIconsProps {
  config: ServerSidebarConfig;
  children: ReactNode;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  onCollapseChange?: (collapsed: boolean) => void;
  localStorageKey?: string;
}

export function SidebarWrapperWithIcons({
  config,
  children,
  className,
  sidebarClassName,
  contentClassName,
  onCollapseChange,
  localStorageKey,
}: SidebarWrapperWithIconsProps) {
  const sidebarConfig = createSidebarConfig(
    config.sections.map((section) => ({
      ...section,
      routes: section.routes.map((route) => ({
        ...route,
        icon: getIconComponent(route.iconName),
      })),
    })),
    {
      defaultCollapsed: config.defaultCollapsed,
      showToggle: config.showToggle,
    },
  );

  return (
    <div className={cn("relative z-10 flex h-full w-full", className)}>
      <Sidebar
        config={sidebarConfig}
        className={sidebarClassName}
        onCollapseChange={(collapsed) => {
          if (localStorageKey && typeof window !== "undefined") {
            localStorage.setItem(localStorageKey, collapsed.toString());
          }
          onCollapseChange?.(collapsed);
        }}
      />

      <section className={cn("flex-1 overflow-x-hidden", contentClassName)}>
        {children}
      </section>
    </div>
  );
}
