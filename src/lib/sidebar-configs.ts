import { ServerSidebarConfig } from "@/types/sidebar-config";

interface SidebarRoute {
  href: string;
  iconName: string;
  label: string;
}

interface CreateSidebarConfigOptions {
  title: string;
  routes: SidebarRoute[];
  defaultCollapsed?: boolean;
  showToggle?: boolean;
}

export function createSidebarConfig({
  title,
  routes,
  defaultCollapsed = false,
  showToggle = true,
}: CreateSidebarConfigOptions): ServerSidebarConfig {
  return {
    sections: [
      {
        title,
        routes,
      },
    ],
    defaultCollapsed,
    showToggle,
  };
}

// Configurații predefinite
export const dashboardSidebarConfig = createSidebarConfig({
  title: "Management",
  routes: [
    {
      href: "/dashboard/users",
      iconName: "Users",
      label: "Utilizatori",
    },
    {
      href: "/dashboard/codes",
      iconName: "Code",
      label: "Coduri",
    },
    {
      href: "/dashboard/categories",
      iconName: "FolderOpen",
      label: "Categorii",
    },
    {
      href: "/dashboard/subscriptions",
      iconName: "CreditCard",
      label: "Abonamente",
    },
    {
      href: "/dashboard/orders",
      iconName: "ShoppingCart",
      label: "Comenzi",
    },
    {
      href: "/dashboard/houses",
      iconName: "House",
      label: "Case din joc",
    },
  ],
});

export const profileSidebarConfig = createSidebarConfig({
  title: "Profil",
  routes: [
    {
      href: "/profile",
      iconName: "User",
      label: "Informații personale",
    },
    {
      href: "/profile/history",
      iconName: "History",
      label: "Istoric achiziții",
    },
  ],
});
