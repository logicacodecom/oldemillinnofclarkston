"use client";

import { usePathname } from "next/navigation";
import { switchPath, type Lang } from "@/lib/i18n";
import { Icon } from "./Icon";

// Links to the same page in the other language. A plain <a> (full load) so
// <html lang> and all server-rendered copy switch together.
export function LanguageToggle({
  toggle,
  compact = false,
  className = "",
}: {
  toggle: { label: string; aria: string; hrefLang: string };
  compact?: boolean; // "ES"/"EN" instead of the full language name
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <a
      href={switchPath(pathname, toggle.hrefLang as Lang)}
      hrefLang={toggle.hrefLang}
      lang={toggle.hrefLang}
      aria-label={toggle.aria}
      data-analytics-event="language_switch"
      data-analytics-to={toggle.hrefLang}
      className={`inline-flex items-center gap-1.5 transition-colors ${className}`}
    >
      <Icon name="translate" className="text-lg" />
      {compact ? toggle.hrefLang.toUpperCase() : toggle.label}
    </a>
  );
}
