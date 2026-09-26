"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { property } from "@/lib/property";
import { basePath, localePath, type Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionaries/en";
import { EVENTS } from "@/lib/analytics";
import { Icon } from "./Icon";
import { LanguageToggle } from "./LanguageToggle";

// Header matching the Neo TopAppBar. On the homepage it starts transparent over
// the hero and turns solid on scroll (`overlay`); elsewhere it is solid from the
// top. Wordmark is typographic (the badge logo says "SOUTH", which conflicts
// with the required public name — see docs/OWNER-CONFIRMATION.md).
// Kept in the footer, left out of the header menu to keep it short.
const HIDDEN_IN_HEADER = ["/pine-knob", "/things-to-do", "/contact"];

export function Header({
  lang,
  nav,
  bookNow,
  callNumber,
  toggle,
}: {
  lang: Lang;
  nav: Dict["nav"];
  bookNow: string;
  callNumber: string;
  toggle: Dict["toggle"];
}) {
  const overlay = basePath(usePathname()) === "/";
  const links = nav.main.filter((l) => !HIDDEN_IN_HEADER.includes(l.href));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const light = overlay && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-20 transition-colors duration-300 ${
        menuOpen
          ? "bg-background shadow-sm" // no backdrop-filter while open, else the fixed menu gets clamped to the header
          : light
            ? "bg-transparent"
            : "bg-background/95 backdrop-blur shadow-sm"
      }`}
    >
      <div className="h-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        <Link href={localePath(lang, "/")} className="flex items-center gap-3" aria-label={nav.homeAria}>
          <Image
            src="/images/logo.png"
            alt=""
            width={292}
            height={350}
            priority
            className="h-14 w-auto drop-shadow-sm"
          />
          <span className="flex flex-col items-center leading-none">
            <span
              className={`font-script text-[26px] sm:text-[32px] leading-[1.1] whitespace-nowrap ${
                light ? "text-surface-white" : "text-primary"
              }`}
            >
              <span className="align-super text-[0.3em] font-label-lg not-italic uppercase tracking-[0.15em] mr-0.5">
                The
              </span>
              Olde Mill Inn
            </span>
            <span
              className={`font-label-lg text-[10px] sm:text-[11px] uppercase tracking-[0.18em] mt-1 whitespace-nowrap ${
                light ? "text-surface-white/85" : "text-on-surface-variant"
              }`}
            >
              of Clarkston South
            </span>
          </span>
        </Link>

        <nav aria-label={nav.primaryAria} className="hidden xl:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={localePath(lang, link.href)}
              className={`font-label-lg text-label-lg transition-colors hover:text-sunset-accent ${
                light ? "text-surface-white" : "text-on-surface"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle
            toggle={toggle}
            className={`font-label-lg text-label-lg hover:text-sunset-accent ${light ? "text-surface-white" : "text-on-surface"}`}
          />
          <a
            href={property.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event={EVENTS.bookingClick}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-colors active:scale-95"
          >
            {bookNow}
          </a>
        </nav>

        <div className="xl:hidden flex items-center gap-1">
          <LanguageToggle
            toggle={toggle}
            compact
            className={`font-label-lg text-label-lg min-h-11 px-2 rounded-lg ${light ? "text-surface-white" : "text-on-surface"}`}
          />
          <button
            type="button"
            className={`inline-flex items-center justify-center w-11 h-11 rounded-lg ${
              light ? "text-surface-white" : "text-on-surface"
            }`}
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-3xl" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="xl:hidden fixed inset-0 top-20 bg-background overflow-y-auto"
      >
        <nav aria-label={nav.mobileAria} className="flex flex-col px-margin-mobile py-6 gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={localePath(lang, link.href)}
              onClick={() => setMenuOpen(false)}
              className="font-headline-md text-headline-md text-on-surface py-4 border-b border-outline-variant/30"
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle
            toggle={toggle}
            className="font-headline-md text-headline-md text-on-surface py-4 border-b border-outline-variant/30"
          />
          <a
            href={property.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event={EVENTS.bookingClick}
            className="mt-6 text-center bg-primary text-on-primary px-6 py-4 rounded-full font-label-lg text-label-lg"
          >
            {bookNow}
          </a>
          <a
            href={property.phone.href}
            data-analytics-event={EVENTS.phoneClick}
            className="mt-3 text-center border border-primary text-primary px-6 py-4 rounded-full font-label-lg text-label-lg"
          >
            {callNumber}
          </a>
        </nav>
      </div>
    </header>
  );
}
