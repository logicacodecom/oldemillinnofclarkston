import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/property";
import { rooms } from "@/lib/rooms";
import { langs, localePath, type Lang } from "@/lib/i18n";

// Last real content update per route (keep in sync when a page's content changes).
const lastModified: Record<string, string> = {
  "/": "2026-09-25",
  "/rooms": "2026-09-25",
  "/lakefront-experience": "2026-09-25",
  "/pine-knob": "2026-09-25",
  "/things-to-do": "2026-09-25",
  "/gallery": "2026-09-25",
  "/plan-your-stay": "2026-09-25",
  "/contact": "2026-09-25",
  "/privacy": "2026-09-25",
  "/accessibility": "2026-09-25",
};

// Every page in both languages, each listing its hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.keys(lastModified), ...rooms.map((r) => `/rooms/${r.slug}`)];
  const url = (lang: Lang, path: string) => {
    const p = localePath(lang, path);
    return `${siteUrl}${p === "/" ? "" : p}`;
  };
  return paths.flatMap((path) =>
    langs.map((lang) => ({
      url: url(lang, path),
      lastModified: lastModified[path] ?? "2026-09-25",
      alternates: { languages: { en: url("en", path), es: url("es", path) } },
    }))
  );
}
