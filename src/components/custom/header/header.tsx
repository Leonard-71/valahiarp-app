"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { UserRole } from "@/generated/prisma/client";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

import { AuthActionButton } from "./auth-action-button";
import { NavLinkInfo, NavLinks } from "./nav-links";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const allNavLinks: NavLinkInfo[] = [
    {
      href: "/dashboard/users",
      label: "Dashboard",
      roles: [UserRole.ADMIN],
    },
    { href: SITE.storeHref, label: "Magazin" },
    { href: SITE.mapHref, label: "Hartă" },
    { href: "/rules", label: "Regulament", hidden: true },
    { href: "/contact", label: "Contact", hidden: true },
  ];

  const isHome = pathname === "/";
  const isHeroHidden = isHome && !isScrolled;

  useEffect(() => {
    if (isHeroHidden) {
      setIsMenuOpen(false);
    }
  }, [isHeroHidden]);

  const filteredNavLinks = allNavLinks.filter((link) => {
    if (link.hidden) {
      return false;
    }

    if (link.roles && link.roles.length > 0) {
      return (
        status === "authenticated" &&
        !!session?.user?.role &&
        link.roles.includes(session.user.role)
      );
    }
    return true;
  });

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "z-40 transition-[transform,opacity,background,backdrop-filter,border-color,box-shadow] duration-300",
          isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
          isHeroHidden
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100",
          isScrolled || !isHome
            ? "border-b border-[rgba(201,67,43,0.35)] bg-[rgba(8,6,6,0.72)] shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-8">
          <Link
            href="/"
            className="font-display title-burnt text-foreground hover:text-ember min-w-0 truncate text-base tracking-[0.12em] uppercase transition-colors sm:text-2xl sm:tracking-[0.18em] md:text-3xl"
            onClick={handleLinkClick}
          >
            {SITE.name}
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            <NavLinks
              links={filteredNavLinks}
              pathname={pathname}
              onLinkClick={handleLinkClick}
            />
          </div>

          <div className="hidden lg:block">
            <AuthActionButton status={status} onLinkClick={handleLinkClick} />
          </div>

          <div className="flex items-center justify-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-foreground hover:text-ember cursor-pointer transition"
              aria-label="Deschide meniul"
            >
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-[#0d0a08]/88 backdrop-blur-xl transition-opacity duration-300 lg:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="font-display title-burnt truncate text-base tracking-[0.12em] uppercase sm:text-2xl sm:tracking-[0.18em]"
            onClick={() => setIsMenuOpen(false)}
          >
            {SITE.name}
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-foreground hover:text-ember cursor-pointer transition"
            aria-label="Închide meniul"
          >
            <X size={28} />
          </button>
        </div>
        <div className="text-foreground -mt-16 flex h-full flex-col items-center justify-center space-y-8 text-center">
          <NavLinks
            links={filteredNavLinks}
            pathname={pathname}
            isMobile
            onLinkClick={handleLinkClick}
          />
          <div className="w-full max-w-xs pt-8">
            <AuthActionButton
              status={status}
              isMobile
              onLinkClick={handleLinkClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};
