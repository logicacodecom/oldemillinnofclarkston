"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionaries/en";
import { CTA } from "./CTA";

export function NotFoundBody({ en, es }: { en: Dict["notFound"]; es: Dict["notFound"] }) {
  const lang = /^\/es(\/|$)/.test(usePathname()) ? "es" : "en";
  const t = lang === "es" ? es : en;
  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
      <h1 className="font-display-lg text-[36px] md:text-[44px] text-primary mb-4">{t.title}</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">{t.text}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <CTA href={localePath(lang, "/")}>{t.home}</CTA>
        <CTA href={localePath(lang, "/rooms")} variant="outline">
          {t.rooms}
        </CTA>
        <Link href={localePath(lang, "/contact")} className="text-primary underline underline-offset-2">
          {t.contact}
        </Link>
      </div>
    </div>
  );
}
