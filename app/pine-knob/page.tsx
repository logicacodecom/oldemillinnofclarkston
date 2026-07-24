import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { RoomCard } from "@/components/RoomCard";
import { property, directionsUrl } from "@/lib/property";
import { lakefrontRooms } from "@/lib/rooms";
import { attractionsByCategory } from "@/lib/attractions";
import { featured } from "@/lib/gallery";
import { EVENTS } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Hotel Near Pine Knob Music Theatre",
  description:
    "Stay approximately five miles from Pine Knob Music Theatre at an independent lakefront inn in Clarkston, Michigan.",
  alternates: { canonical: "/pine-knob" },
};

const pineKnobFaqs = [
  {
    q: "How far is the inn from Pine Knob?",
    a: "The inn is approximately five miles from Pine Knob Music Theatre and Pine Knob Ski and Snowboard Resort.",
  },
  {
    q: "Can I arrive after a concert?",
    a: "Guests planning a late arrival should contact the inn directly for instructions.",
  },
];

export default function PineKnobPage() {
  return (
    <>
      <PageHero
        eyebrow="Concerts, skiing & seasonal events"
        title="A Lakefront Stay Near Pine Knob"
        image={featured.heroAerial}
        imageAlt="Aerial view of Olde Mill Inn of Clarkston on Van Norman Lake"
      />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
              Attending a concert or planning a ski day at Pine Knob? Olde Mill Inn of Clarkston
              offers a convenient place to stay approximately five miles away. Return afterward to a
              relaxed lakefront setting with practical room amenities and nearby dining.
            </p>
            <p className="text-sm text-on-surface-variant">
              Pine Knob Music Theatre is located at 33 Bob Seger Drive, Clarkston, MI 48348.
              Distances are approximate.
            </p>
          </div>
          <div className="bg-primary text-on-primary rounded-2xl p-8 text-center">
            <p className="font-display-lg text-[56px] leading-none mb-2">≈5</p>
            <p className="text-sm uppercase tracking-wider opacity-80">miles to Pine Knob</p>
          </div>
        </div>
      </section>

      {/* Pine Knob venues */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Pine Knob &amp; nearby slopes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {[...attractionsByCategory.concerts, ...attractionsByCategory.skiing].map((a) => (
            <div key={a.name} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline-md text-lg text-on-surface">{a.name}</h3>
                {a.approxMiles ? (
                  <span className="text-sm text-on-surface-variant whitespace-nowrap">≈{a.approxMiles} mi</span>
                ) : null}
              </div>
              <p className="text-on-surface-variant text-sm">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Room previews */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Lakefront rooms for your stay</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {lakefrontRooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </section>

      {/* Nearby dining */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Nearby dining</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {attractionsByCategory.dining.map((d) => (
            <li key={d.name} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10">
              <h3 className="font-headline-md text-lg text-on-surface mb-1">{d.name}</h3>
              <p className="text-on-surface-variant text-sm">{d.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Good to know</h2>
        <div className="space-y-3">
          {pineKnobFaqs.map((f) => (
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
            Check Availability
          </CTA>
          <CTA href={property.phone.href} variant="outline" size="lg" icon="call" analyticsEvent={EVENTS.phoneClick}>
            Call the Inn
          </CTA>
          <CTA href={directionsUrl} external variant="outline" size="lg" icon="explore" analyticsEvent={EVENTS.directionsClick}>
            Get Directions
          </CTA>
        </div>
      </section>
    </>
  );
}
