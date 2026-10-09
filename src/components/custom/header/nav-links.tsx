import Link from "next/link";
import { FC } from "react";

import { UserRole } from "@/generated/prisma/client";
import { RESET_LANDING_STORE_EVENT, SCROLL_LANDING_MAP_EVENT, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const isLinkActive = (linkHref: string, currentPathname: string): boolean => {
  if (currentPathname === linkHref) {
    return true;
  }

  if (
    linkHref.startsWith("/dashboard/") &&
    currentPathname.startsWith("/dashboard/")
  ) {
    return true;
  }

  if (linkHref !== "/" && currentPathname.startsWith(linkHref + "/")) {
    return true;
  }

  return false;
};

export type NavLinkInfo = {
  href: string;
  label: string;
  roles?: UserRole[];
  hidden?: boolean;
};

export const NavLinks: FC<{
  links: NavLinkInfo[];
  pathname: string;
  isMobile?: boolean;
  onLinkClick: () => void;
}> = ({ links, pathname, isMobile = false, onLinkClick }) =>
  links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => {
        if (link.href === SITE.storeHref) {
          window.dispatchEvent(new Event(RESET_LANDING_STORE_EVENT));
        }
        if (link.href === SITE.mapHref) {
          window.dispatchEvent(new Event(SCROLL_LANDING_MAP_EVENT));
        }
        onLinkClick();
      }}
      className={cn(
        "hover:text-ember relative transition-colors duration-300",
        {
          "text-ember after:bg-bronze after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full":
            isLinkActive(link.href, pathname) && !isMobile,
          "text-ember font-semibold": isLinkActive(link.href, pathname),
        },
        isMobile
          ? "font-display text-2xl tracking-[0.16em] uppercase"
          : "text-sm font-medium tracking-[0.14em] uppercase",
      )}
    >
      {link.label}
    </Link>
  ));
