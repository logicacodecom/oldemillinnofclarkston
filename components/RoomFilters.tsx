"use client";

import { Fragment, useState } from "react";
import type { Room } from "@/lib/rooms";
import type { Dict } from "@/lib/dictionaries/en";

// Filters based only on verified data (§18): category + bed configuration.
// Cards are rendered on the server and passed in, so this stays translation-free.
const filters: { id: keyof Dict["filters"]; match: (r: Room) => boolean }[] = [
  { id: "all", match: () => true },
  { id: "offWater", match: (r) => r.category === "off-water" },
  { id: "lakefront", match: (r) => r.category === "lakefront" },
  { id: "full", match: (r) => r.bedConfiguration === "Full bed" },
  { id: "queen", match: (r) => r.bedConfiguration === "Queen bed" },
  { id: "twoFull", match: (r) => r.bedConfiguration === "Two full beds" },
];

export function RoomFilters({
  items,
  t,
}: {
  items: { room: Room; card: React.ReactNode }[];
  t: Dict["filters"];
}) {
  const [active, setActive] = useState<keyof Dict["filters"]>("all");
  const predicate = filters.find((f) => f.id === active)!.match;
  const visible = items.filter((i) => predicate(i.room));

  return (
    <div>
      <div role="group" aria-label={t.aria} className="flex flex-wrap gap-3 mb-10">
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
              {t[f.id]}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {visible.map((i) => (
          <Fragment key={i.room.slug}>{i.card}</Fragment>
        ))}
      </div>
      {visible.length === 0 && <p className="text-on-surface-variant">{t.noMatch}</p>}
    </div>
  );
}
