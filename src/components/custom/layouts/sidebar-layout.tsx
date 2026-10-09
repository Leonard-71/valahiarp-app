"use client";

import { ReactNode } from "react";

import { MobileCategoriesBar } from "@/components/custom/sidebar/mobile-categories-bar";
import { SidebarWrapperWithIcons } from "@/components/custom/sidebar/sidebar-wrapper-with-icons";
import { ServerSidebarConfig } from "@/types/sidebar-config";

interface SidebarLayoutProps {
  children: ReactNode;
  config: ServerSidebarConfig;
  className?: string;
  localStorageKey?: string;
}

export function SidebarLayout({
  children,
  config,
  className = "h-[calc(100vh-204px)] md:h-[calc(100vh-164px)]",
  localStorageKey,
}: SidebarLayoutProps) {
  return (
    <div className={className}>
      <div className="md:hidden">
        <MobileCategoriesBar config={config} />
      </div>

      <SidebarWrapperWithIcons
        config={config}
        localStorageKey={localStorageKey}
      >
        <div className="h-full flex-1 overflow-y-auto p-6">{children}</div>
      </SidebarWrapperWithIcons>
    </div>
  );
}
