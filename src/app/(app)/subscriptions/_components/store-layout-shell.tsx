"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { SidebarLayout } from "@/components/custom/layouts";
import { ServerSidebarConfig } from "@/types/sidebar-config";

export function StoreLayoutShell({
  children,
  config,
}: {
  children: ReactNode;
  config: ServerSidebarConfig;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isProductPage = segments[0] === "subscriptions" && segments.length >= 3;

  if (isProductPage) {
    return children;
  }

  return (
    <SidebarLayout config={config} localStorageKey="storeSidebarCollapsed">
      {children}
    </SidebarLayout>
  );
}
