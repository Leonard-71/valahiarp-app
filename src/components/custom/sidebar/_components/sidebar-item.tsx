import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  href,
  icon: Icon,
  label,
  isActive = false,
  isCollapsed = false,
  onClick,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
          : "text-sidebar-foreground",
        isCollapsed && "justify-center px-2",
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-colors",
          isActive
            ? "text-sidebar-primary-foreground"
            : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground",
        )}
      />
      {!isCollapsed && (
        <span className="truncate transition-opacity">{label}</span>
      )}
    </Link>
  );
}
