import { Metadata } from "next";

import { SidebarLayout } from "@/components/custom/layouts";
import { dashboardSidebarConfig } from "@/lib/sidebar-configs";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | Valahia RP",
    default: "Valahia RP",
  },
  description: "Valahia RP",
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarLayout
      config={dashboardSidebarConfig}
      localStorageKey="dashboardSidebarCollapsed"
    >
      {children}
    </SidebarLayout>
  );
}
