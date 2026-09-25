import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { RoomCard } from "@/components/RoomCard";
import { TrackView } from "@/components/TrackView";
import { JsonLd, hotelRoomJsonLd } from "@/components/JsonLd";
import { rooms, roomsBySlug, amenityIcon } from "@/lib/rooms";
import { property } from "@/lib/property";
import { getDict, localePath, pageMetadata, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";

type Props = { params: { lang: Lang; slug: string } };

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const room = roomsBySlug.get(params.slug);
  if (!room) return {};
  return pageMetadata(params.lang, `/rooms/${room.slug}`, {
    title: room.name,
    description: getDict(params.lang).rooms[room.slug].metaDescription,
  });
}

export default function RoomDetailPage({ params }: Props) {
  const room = roomsBySlug.get(params.slug);
  if (!room) notFound();
  const { lang } = params;
  const t = getDict(lang);
  const rp = t.roomPage;

  const isLakefront = room.category === "lakefront";
  const related = rooms.filter((r) => r.slug !== room.slug && r.category === room.category).slice(0, 3);
  const relatedFallback = related.length
    ? related
    : rooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <article className="pb-section-gap">
      <JsonLd data={hotelRoomJsonLd(room)} />
      <TrackView event={EVENTS.roomView} params={{ room: room.slug }} />

      {/* Image gallery */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {room.images.map((n, i) => (
            <div
              key={n}
              className={`relative rounded-2xl overflow-hidden ${
                i === 0 ? "md:col-span-2 h-72 md:h-[28rem]" : "h-56 md:h-64"
              }`}
            >
              <Image
                src={`/images/gallery/${n}.jpg`}
                alt={t.roomFacts.photoAlt(room.name)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <span
            className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 ${
              isLakefront ? "bg-primary text-on-primary" : "bg-secondary-container text-on-secondary-container"
            }`}
          >
            {isLakefront ? t.common.lakefront : t.common.offWater}
          </span>
          <h1 className="font-display-lg text-[36px] md:text-[44px] text-primary mb-4">{room.name}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            {t.rooms[room.slug].shortDescription}
          </p>

          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">{rp.featuresTitle}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {room.bedConfiguration ? (
              <li className="flex items-center gap-2 text-on-surface-variant">
                <Icon name="king_bed" className="text-primary" /> {t.beds[room.bedConfiguration]}
              </li>
            ) : null}
            {room.maxGuests ? (
              <li className="flex items-center gap-2 text-on-surface-variant">
                <Icon name="group" className="text-primary" /> {t.roomFacts.sleepsUpTo(room.maxGuests)}
              </li>
            ) : null}
            {room.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-on-surface-variant">
                <Icon name={amenityIcon(a)} className="text-primary text-base" /> {t.amenities[a]}
              </li>
            ))}
          </ul>

          <p className="text-sm text-on-surface-variant border-t border-outline-variant/30 pt-4">
            {rp.policiesPrefix}{" "}
            <Link href={localePath(lang, "/plan-your-stay")} className="text-primary underline underline-offset-2">
              {rp.policiesLink}
            </Link>{" "}
            {rp.policiesSuffix}
          </p>
        </div>

        {/* Booking rail */}
        <aside className="lg:col-span-1">
          <div className="bg-surface-white rounded-2xl border border-outline-variant/20 shadow-sm p-6 lg:sticky lg:top-24">
            <p className="font-headline-md text-headline-md text-on-surface mb-2">{rp.readyTitle}</p>
            <p className="text-on-surface-variant text-sm mb-6">{rp.readyText}</p>
            <div className="flex flex-col gap-3">
              <CTA
                href={room.bookingUrl ?? property.bookingUrl}
                external
                size="block"
                analyticsEvent={EVENTS.bookingClick}
              >
                {t.common.checkAvailability}
              </CTA>
              <CTA
                href={property.phone.href}
                variant="outline"
                size="block"
                icon="call"
                analyticsEvent={EVENTS.phoneClick}
              >
                {t.common.callNumber}
              </CTA>
            </div>
          </div>
        </aside>
      </section>

      {/* Related rooms */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-section-gap">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">{rp.relatedTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {relatedFallback.map((r) => (
            <RoomCard key={r.slug} room={r} lang={lang} />
          ))}
        </div>
      </section>
    </article>
  );
}
