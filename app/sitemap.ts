import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/property";
import { rooms } from "@/lib/rooms";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/rooms",
    "/lakefront-experience",
    "/pine-knob",
    "/things-to-do",
    "/gallery",
    "/plan-your-stay",
    "/contact",
    "/privacy",
    "/accessibility",
    ...rooms.map((r) => `/rooms/${r.slug}`),
  ];
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
