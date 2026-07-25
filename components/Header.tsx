"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/nav";
import { property } from "@/lib/property";
import { EVENTS } from "@/lib/analytics";
import { Icon } from "./Icon";

// Header matching the Neo TopAppBar. On the homepage it starts transparent over
// the hero and turns solid on scroll (`overlay`); elsewhere it is solid from the
// top. Wordmark is typographic (the badge logo says "SOUTH", which conflicts
// with the required public name — see docs/OWNER-CONFIRMATION.md).
export function Header() {
  const overlay = usePathname() === "/";
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
        light ? "bg-transparent" : "bg-background/95 backdrop-blur shadow-sm"
      }`}
    >
      <div className="h-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${property.name} — home`}>
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
              The Olde Mill Inn
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

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-label-lg text-label-lg transition-colors hover:text-sunset-accent ${
                light ? "text-surface-white" : "text-on-surface"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={property.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event={EVENTS.bookingClick}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-colors active:scale-95"
          >
            Book Now
          </a>
        </nav>

        <button
          type="button"
          className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg ${
            light ? "text-surface-white" : "text-on-surface"
          }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon name={menuOpen ? "close" : "menu"} className="text-3xl" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="lg:hidden fixed inset-0 top-20 bg-background overflow-y-auto"
      >
        <nav aria-label="Mobile" className="flex flex-col px-margin-mobile py-6 gap-1">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-headline-md text-headline-md text-on-surface py-4 border-b border-outline-variant/30"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={property.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event={EVENTS.bookingClick}
            className="mt-6 text-center bg-primary text-on-primary px-6 py-4 rounded-full font-label-lg text-label-lg"
          >
            Book Now
          </a>
          <a
            href={property.phone.href}
            data-analytics-event={EVENTS.phoneClick}
            className="mt-3 text-center border border-primary text-primary px-6 py-4 rounded-full font-label-lg text-label-lg"
          >
            Call {property.phone.display}
          </a>
        </nav>
      </div>
    </header>
  );
}
