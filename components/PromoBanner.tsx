"use client";

import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionaries/en";
import { EVENTS } from "@/lib/analytics";
import { PROMO_STORAGE_KEY, PROMO_VERSION } from "@/lib/promo";
import { Icon } from "./Icon";

// Slim events banner at the top of the header. Hidden by CSS once dismissed
// (see lib/promo.ts), so it never flashes back in on the next page load.
export function PromoBanner({ lang, t }: { lang: Lang; t: Dict["promo"] }) {
  const dismiss = () => {
    document.documentElement.setAttribute("data-promo-off", "");
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, PROMO_VERSION);
    } catch {
      // Storage blocked: the banner still closes for this page view.
    }
  };

  return (
    <div className="promo-bar h-[var(--promo-h)] overflow-hidden bg-sunset-accent text-primary">
      <div className="h-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-center gap-2 relative">
        <Link
          href={localePath(lang, "/celebrate")}
          data-analytics-event={EVENTS.promoBannerClick}
          className="flex items-center gap-2 min-w-0 font-label-lg text-sm hover:underline underline-offset-2 pr-8"
        >
          <Icon name="celebration" className="text-lg shrink-0" />
          <span className="truncate">
            <span className="hidden md:inline">{t.text}</span>
            <span className="md:hidden">{t.short}</span>
            <span aria-hidden="true"> · </span>
            <span className="font-bold">{t.cta} →</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.dismiss}
          className="absolute right-2 md:right-4 inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-primary/10"
        >
          <Icon name="close" className="text-lg" />
        </button>
      </div>
    </div>
  );
}
