import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
  isCollapsed?: boolean;
  className?: string;
}

export function SidebarSection({
  title,
  children,
  isCollapsed = false,
  className,
}: SidebarSectionProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {title && !isCollapsed && (
        <h3 className="text-sidebar-foreground/60 px-3 text-sm font-semibold tracking-wider uppercase">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}
