"use client";

import Link from "next/link";

import { RESET_LANDING_STORE_EVENT, SCROLL_LANDING_MAP_EVENT, SITE } from "@/lib/site";

export const Footer = () => {
  return (
    <footer className="relative z-10 mt-auto border-t border-[rgba(200,90,60,0.22)] bg-[rgba(13,10,8,0.88)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* <p className="font-display text-bronze mb-6 text-center text-sm tracking-[0.22em] uppercase">
          „{SITE.tagline}”
        </p> */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-display tracking-[0.16em] uppercase">
              &copy; {new Date().getFullYear()} {SITE.name}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              {SITE.name} este un proiect independent de roleplay, fara legatura oficiala cu Rockstar Games sau Take-Two Interactive.
            </p>
          </div>
          <nav className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm tracking-[0.12em] uppercase">
            <Link
              href={SITE.storeHref}
              className="hover:text-ember transition-colors"
              onClick={() => {
                window.dispatchEvent(new Event(RESET_LANDING_STORE_EVENT));
              }}
            >
              Magazin
            </Link>
            <Link
              href={SITE.mapHref}
              className="hover:text-ember transition-colors"
              onClick={() => {
                window.dispatchEvent(new Event(SCROLL_LANDING_MAP_EVENT));
              }}
            >
              Hartă
            </Link>
            <a
              href={SITE.discordInvite}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ember transition-colors"
            >
              Discord
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
