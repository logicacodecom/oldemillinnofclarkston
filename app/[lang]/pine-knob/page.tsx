import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { RoomCard } from "@/components/RoomCard";
import { property, directionsUrl } from "@/lib/property";
import { lakefrontRooms } from "@/lib/rooms";
import { featured } from "@/lib/gallery";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/pine-knob", getDict(params.lang).meta.pineKnob);
}

export default function PineKnobPage({ params }: Props) {
  const { lang } = params;
  const t = getDict(lang);
  const pk = t.pineKnob;
  const venues = t.attractions.filter((a) => a.category === "concerts" || a.category === "skiing");
  const dining = t.attractions.filter((a) => a.category === "dining");

  return (
    <>
      <PageHero eyebrow={pk.eyebrow} title={pk.title} image={featured.heroAerial} imageAlt={pk.heroAlt} />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">{pk.intro}</p>
            <p className="text-sm text-on-surface-variant">{pk.address}</p>
          </div>
          <div className="bg-primary text-on-primary rounded-2xl p-8 text-center">
            <p className="font-display-lg text-[56px] leading-none mb-2">≈5</p>
            <p className="text-sm uppercase tracking-wider opacity-80">{pk.milesToPineKnob}</p>
          </div>
        </div>
      </section>

      {/* Pine Knob venues */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">{pk.venuesTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {venues.map((a) => (
            <div key={a.name} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline-md text-lg text-on-surface">{a.name}</h3>
                {a.approxMiles ? (
                  <span className="text-sm text-on-surface-variant whitespace-nowrap">{t.common.miles(a.approxMiles)}</span>
                ) : null}
              </div>
              <p className="text-on-surface-variant text-sm">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Room previews */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">{pk.roomsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {lakefrontRooms.map((room) => (
            <RoomCard key={room.slug} room={room} lang={lang} />
          ))}
        </div>
      </section>

      {/* Nearby dining */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{pk.diningTitle}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dining.map((d) => (
            <li key={d.name} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10">
              <h3 className="font-headline-md text-lg text-on-surface mb-1">{d.name}</h3>
              <p className="text-on-surface-variant text-sm">{d.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{pk.faqTitle}</h2>
        <div className="space-y-3">
          {pk.faqs.map((f) => (
            <details key={f.q} className="bg-surface-white rounded-xl border border-outline-variant/20 p-5">
              <summary className="font-headline-md text-lg text-on-surface cursor-pointer">{f.q}</summary>
              <p className="text-on-surface-variant mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col sm:flex-row gap-4">
          <CTA href={property.bookingUrl} external size="lg" analyticsEvent={EVENTS.bookingClick}>
            {t.common.checkAvailability}
          </CTA>
          <CTA href={property.phone.href} variant="outline" size="lg" icon="call" analyticsEvent={EVENTS.phoneClick}>
            {t.common.callInn}
          </CTA>
          <CTA href={directionsUrl} external variant="outline" size="lg" icon="explore" analyticsEvent={EVENTS.directionsClick}>
            {t.common.getDirections}
          </CTA>
        </div>
      </section>
    </>
  );
}
