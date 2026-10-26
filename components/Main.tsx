"use client";

import { usePathname } from "next/navigation";
import { basePath } from "@/lib/i18n";
import { promoShownOn } from "@/lib/promo";

// Homepage hero sits under the transparent fixed header (no offset). Every other
// route gets a top offset equal to the header height, plus bottom room for the
// mobile action bar so nothing is hidden beneath fixed controls (§26). The offset
// includes the events banner where it shows (lib/promo.ts).
export function Main({ children }: { children: React.ReactNode }) {
  const path = basePath(usePathname());
  const offset = path === "/" ? "" : promoShownOn(path) ? "pt-[calc(5rem+var(--promo-h))]" : "pt-20";
  return (
    <main id="main" className={`min-h-screen pb-24 md:pb-0 ${offset}`}>
      {children}
    </main>
  );
}
