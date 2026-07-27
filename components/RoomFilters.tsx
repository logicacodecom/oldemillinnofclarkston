"use client";

import { useState } from "react";
import type { Room } from "@/lib/rooms";
import { RoomCard } from "./RoomCard";

// Filters based only on verified data (§18): category + bed configuration.
const filters: { id: string; label: string; match: (r: Room) => boolean }[] = [
  { id: "all", label: "All Rooms", match: () => true },
  { id: "off-water", label: "Off-Water", match: (r) => r.category === "off-water" },
  { id: "lakefront", label: "Lakefront", match: (r) => r.category === "lakefront" },
  { id: "full", label: "Full Bed", match: (r) => r.bedConfiguration === "Full bed" },
  { id: "queen", label: "Queen Bed", match: (r) => r.bedConfiguration === "Queen bed" },
  { id: "two-full", label: "Two Full Beds", match: (r) => r.bedConfiguration === "Two full beds" },
];

export function RoomFilters({ rooms }: { rooms: Room[] }) {
  const [active, setActive] = useState("all");
  const predicate = filters.find((f) => f.id === active)!.match;
  const visible = rooms.filter(predicate);

  return (
    <div>
      <div role="group" aria-label="Filter rooms" className="flex flex-wrap gap-3 mb-10">
        {filters.map((f) => {
          const isActive = f.id === active;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(f.id)}
              className={`px-5 py-2.5 rounded-full font-label-lg text-label-lg border transition-colors ${
                isActive
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-white text-on-surface border-outline-variant/50 hover:border-primary"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {visible.map((room) => (
          <RoomCard key={room.slug} room={room} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="text-on-surface-variant">No rooms match that filter.</p>
      )}
    </div>
  );
}
