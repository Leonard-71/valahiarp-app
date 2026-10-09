"use client";

import { SidebarWrapperWithIcons } from "@/components/custom/sidebar";
import { ServerSidebarConfig } from "@/types/sidebar-config";

interface DashboardSidebarClientProps {
  children: React.ReactNode;
  config: ServerSidebarConfig;
}

export function DashboardSidebarClient({
  children,
  config,
}: DashboardSidebarClientProps) {
  return (
    <SidebarWrapperWithIcons
      config={config}
      onCollapseChange={(collapsed) => {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "dashboardSidebarCollapsed",
            collapsed.toString(),
          );
        }
      }}
    >
      {children}
    </SidebarWrapperWithIcons>
  );
}
