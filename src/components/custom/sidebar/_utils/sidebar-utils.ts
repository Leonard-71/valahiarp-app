import { LucideIcon } from "lucide-react";

export interface SidebarRoute {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface SidebarSection {
  title?: string;
  routes: SidebarRoute[];
}

export interface SidebarConfig {
  sections: SidebarSection[];
  defaultCollapsed?: boolean;
  showToggle?: boolean;
}

export const createSidebarConfig = (
  sections: SidebarSection[],
  options: Partial<Omit<SidebarConfig, "sections">> = {},
): SidebarConfig => {
  return {
    sections,
    defaultCollapsed: false,
    showToggle: true,
    ...options,
  };
};
