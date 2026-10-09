import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SidebarContentProps {
  children: ReactNode;
  className?: string;
  isCollapsed?: boolean;
}

export function SidebarContent({
  children,
  className,
  isCollapsed,
}: SidebarContentProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto transition-all duration-300",
        isCollapsed ? "p-2" : "p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
