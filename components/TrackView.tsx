"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Fires a one-time analytics event on mount (e.g. room_view).
export function TrackView({ event, params }: { event: string; params?: Record<string, unknown> }) {
  useEffect(() => {
    track(event, params ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
