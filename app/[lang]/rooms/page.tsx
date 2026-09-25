import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RoomFilters } from "@/components/RoomFilters";
import { RoomCard } from "@/components/RoomCard";
import { AvailabilityWidget } from "@/components/AvailabilityWidget";
import { rooms } from "@/lib/rooms";
import { featured } from "@/lib/gallery";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/rooms", getDict(params.lang).meta.rooms);
}

export default function RoomsPage({ params }: Props) {
  const { lang } = params;
  const t = getDict(lang);
  const p = t.roomsPage;
  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        subtitle={p.subtitle}
        image={featured.waterfrontBuilding}
        imageAlt={p.heroAlt}
      />
      <section className="pt-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{p.availabilityTitle}</h2>
        <AvailabilityWidget lang={lang} t={t.availability} />
      </section>
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <RoomFilters
          items={rooms.map((room) => ({ room, card: <RoomCard room={room} lang={lang} /> }))}
          t={t.filters}
        />
        <p className="mt-10 text-sm text-on-surface-variant">{p.note}</p>
      </section>
    </>
  );
}
