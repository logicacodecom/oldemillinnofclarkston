import type { Metadata } from "next";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";

// English lives at the root (/room), Spanish under /es (/es/room).
// middleware.ts rewrites unprefixed URLs to the internal /en segment.
export const langs = ["en", "es"] as const;
export type Lang = (typeof langs)[number];

export function isLang(value: string): value is Lang {
  return (langs as readonly string[]).includes(value);
}

export function getDict(lang: Lang) {
  return lang === "es" ? es : en;
}

// "/room" → "/room" (en) or "/es/room" (es). "/" → "/" or "/es".
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/es" : `/es${path}`;
}

// Language-neutral path. Strips /es, and also /en, because during prerender
// usePathname() sees the internal rewritten /en path rather than the public URL.
export function basePath(pathname: string): string {
  return pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
}

// Same page in the other language.
export function switchPath(pathname: string, to: Lang): string {
  return localePath(to, basePath(pathname));
}

// Per-page metadata with canonical + hreflang alternates for both languages.
export function pageMetadata(
  lang: Lang,
  path: string,
  meta: { title?: string; description?: string }
): Metadata {
  return {
    ...(meta.title ? { title: meta.title } : {}),
    ...(meta.description ? { description: meta.description } : {}),
    alternates: {
      canonical: localePath(lang, path),
      languages: { en: path, es: localePath("es", path), "x-default": path },
    },
  };
}
