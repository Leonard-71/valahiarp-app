"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import {
  SidebarContent,
  SidebarItem,
  SidebarSection as SidebarSectionComponent,
  SidebarToggle,
} from "./_components";
import { SidebarConfig } from "./_utils";

interface SidebarProps {
  config: SidebarConfig;
  className?: string;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function Sidebar({ config, className, onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(
    config.defaultCollapsed ?? false,
  );
  const pathname = usePathname();

  // Calculate the most specific active route using the same logic as mobile-categories-bar
  const activeRoute = useMemo(() => {
    const routes = config.sections.flatMap((s) => s.routes);
    let best: string | undefined;

    for (const r of routes) {
      if (pathname === r.href) return r.href;
      if (pathname.startsWith(`${r.href}/`)) {
        if (!best || r.href.length > best.length) best = r.href;
      }
    }
    return best ?? routes[0]?.href ?? "";
  }, [pathname, config.sections]);

  const handleToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground border-sidebar-border relative hidden h-full w-full flex-col border-r transition-all duration-300 md:flex",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <SidebarContent isCollapsed={isCollapsed}>
        <div className="space-y-6">
          {config.sections.map((section, sectionIndex) => (
            <SidebarSectionComponent
              key={sectionIndex}
              title={section.title}
              isCollapsed={isCollapsed}
            >
              {section.routes.map((route, routeIndex) => (
                <SidebarItem
                  key={routeIndex}
                  href={route.href}
                  icon={route.icon}
                  label={route.label}
                  isActive={route.isActive || route.href === activeRoute}
                  isCollapsed={isCollapsed}
                  onClick={route.onClick}
                />
              ))}
            </SidebarSectionComponent>
          ))}
        </div>
      </SidebarContent>

      {config.showToggle && (
        <div className="absolute top-4 -right-5">
          <SidebarToggle
            isCollapsed={isCollapsed}
            onToggle={handleToggle}
            className="border-sidebar-border bg-sidebar hover:bg-sidebar-accent rounded-full border shadow-sm"
          />
        </div>
      )}
    </aside>
  );
}
