"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Delegated click tracking for any element carrying data-analytics-event.
// Extra data-analytics-* attributes are forwarded as event params.
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-analytics-event]");
      const event = el?.getAttribute("data-analytics-event");
      if (!event) return;
      const params: Record<string, string> = {};
      for (const attr of Array.from(el!.attributes)) {
        if (attr.name.startsWith("data-analytics-") && attr.name !== "data-analytics-event") {
          params[attr.name.slice("data-analytics-".length)] = attr.value;
        }
      }
      track(event, params);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
