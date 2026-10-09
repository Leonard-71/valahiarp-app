"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIconComponent } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";
import { ServerSidebarConfig } from "@/types/sidebar-config";

interface MobileCategoriesBarProps {
  config: ServerSidebarConfig;
}

export function MobileCategoriesBar({ config }: MobileCategoriesBarProps) {
  const pathname = usePathname();

  const routes = useMemo(
    () => config.sections.flatMap((s) => s.routes),
    [config.sections],
  );

  const activeValue = useMemo(() => {
    let best: string | undefined;
    for (const r of routes) {
      if (pathname === r.href) return r.href;
      if (pathname.startsWith(`${r.href}/`)) {
        if (!best || r.href.length > best.length) best = r.href;
      }
    }
    return best ?? routes[0]?.href ?? "";
  }, [pathname, routes]);

  return (
    <div className="bg-border border-background h-10 overflow-hidden border-b">
      <ScrollArea className="h-10 w-full">
        <div className="flex h-10 items-center px-2">
          <Tabs value={activeValue} className="w-full">
            <TabsList className="h-10 gap-2 bg-transparent p-0">
              {routes.map((route) => {
                const IconComponent = getIconComponent(route.iconName);
                const isActive = route.href === activeValue;
                return (
                  <TabsTrigger
                    key={route.href}
                    value={route.href}
                    autoFocus={isActive}
                    asChild
                    className={cn(
                      "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground h-8 px-3",
                      "rounded-md border border-transparent",
                    )}
                  >
                    <Link href={route.href} prefetch>
                      {IconComponent && (
                        <IconComponent className="mr-1 h-4 w-4" />
                      )}
                      {route.label}
                    </Link>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
        <ScrollBar orientation="horizontal" className="h-1" />
      </ScrollArea>
    </div>
  );
}
