import Link from "next/link";
import Image from "next/image";
import type { Room } from "@/lib/rooms";
import { roomImage } from "@/lib/rooms";
import { getDict, localePath, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";
import { Icon } from "./Icon";

// Neo room card: white surface, 16px radius, ambient shadow, image on top.
// No fictional price or occupancy is shown (§17) — the CTA is "Check Availability".
export function RoomCard({ room, lang }: { room: Room; lang: Lang }) {
  const t = getDict(lang);
  const isLakefront = room.category === "lakefront";
  const categoryLabel = isLakefront ? t.common.lakefront : t.common.offWater;
  return (
    <article className="bg-surface-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-outline-variant/10 flex flex-col">
      <div className="relative h-64">
        <Image
          src={roomImage(room)}
          alt={t.roomFacts.photoAlt(room.name)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <span
          className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
            isLakefront ? "bg-primary text-on-primary" : "bg-surface-white/90 text-primary"
          }`}
        >
          {categoryLabel}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{room.name}</h3>
        <p className="text-on-surface-variant font-body-md mb-6 flex-1">{t.rooms[room.slug].shortDescription}</p>
        <div className="flex flex-wrap items-center gap-4 mb-6 border-t border-b border-outline-variant/30 py-3 text-on-surface-variant text-sm">
          {room.bedConfiguration && (
            <span className="inline-flex items-center gap-1">
              <Icon name="king_bed" className="text-base" /> {t.beds[room.bedConfiguration]}
            </span>
          )}
          {room.maxGuests && (
            <span className="inline-flex items-center gap-1">
              <Icon name="group" className="text-base" /> {t.roomFacts.sleeps(room.maxGuests)}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Icon name={isLakefront ? "water" : "cottage"} className="text-base" /> {categoryLabel}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href={localePath(lang, `/rooms/${room.slug}`)}
            className="w-full text-center border border-primary text-primary py-3 rounded-lg font-label-lg text-label-lg hover:bg-primary hover:text-on-primary transition-colors"
          >
            {t.common.viewDetails}
          </Link>
          <a
            href={room.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event={EVENTS.bookingClick}
            className="w-full text-center bg-primary text-on-primary py-3 rounded-lg font-label-lg text-label-lg hover:bg-primary-container transition-colors"
          >
            {t.common.checkAvailability}
          </a>
        </div>
      </div>
    </article>
  );
}
