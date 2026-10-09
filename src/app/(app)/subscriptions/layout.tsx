import { ReactNode } from "react";

import { StoreLayoutShell } from "./_components/store-layout-shell";
import { buildStoreSidebarConfig } from "./_utils/sidebar";

interface SubscriptionsLayoutProps {
  children: ReactNode;
}

export default async function SubscriptionsLayout({
  children,
}: SubscriptionsLayoutProps) {
  const config = await buildStoreSidebarConfig();

  return <StoreLayoutShell config={config}>{children}</StoreLayoutShell>;
}
