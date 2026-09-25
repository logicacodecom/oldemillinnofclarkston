import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/property";
import { rooms } from "@/lib/rooms";

// Last real content update per route (keep in sync when a page's content changes).
const lastModified: Record<string, string> = {
  "": "2026-08-21",
  "/rooms": "2026-08-21",
  "/lakefront-experience": "2026-08-21",
  "/pine-knob": "2026-08-21",
  "/things-to-do": "2026-08-21",
  "/gallery": "2026-08-21",
  "/plan-your-stay": "2026-08-21",
  "/contact": "2026-08-21",
  "/privacy": "2026-08-21",
  "/accessibility": "2026-08-21",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...Object.keys(lastModified),
    ...rooms.map((r) => `/rooms/${r.slug}`),
  ];
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: lastModified[path] ?? "2026-08-21",
  }));
}
