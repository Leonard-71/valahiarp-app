/**
 * Tipuri pentru configurația sidebar-ului care poate fi transmisă de la server la client
 */

export interface ServerSidebarRoute {
  href: string;
  iconName: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface ServerSidebarSection {
  title?: string;
  routes: ServerSidebarRoute[];
}

export interface ServerSidebarConfig {
  sections: ServerSidebarSection[];
  defaultCollapsed?: boolean;
  showToggle?: boolean;
}
