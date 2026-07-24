import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { property } from "@/lib/property";
import { featured } from "@/lib/gallery";
import { EVENTS } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Lakefront Stay in Clarkston, MI",
  description:
    "Relax beside Van Norman Lake with a covered waterfront patio, outdoor areas, complimentary kayaks and pedal boats for registered guests.",
  alternates: { canonical: "/lakefront-experience" },
};

const highlights = [
  { icon: "water", title: "Lakefront setting", text: `Rooms and outdoor spaces set right along ${property.lake}.` },
  { icon: "deck", title: "Covered patio", text: "A shaded waterfront patio for morning coffee or an evening by the water." },
  { icon: "beach_access", title: "Beach & shoreline", text: "A sandy lake-access area to enjoy the shoreline." },
  { icon: "kayaking", title: "Kayaks", text: "Complimentary for registered guests." },
  { icon: "directions_boat", title: "Pedal boats", text: "Complimentary for registered guests." },
  { icon: "photo_camera", title: "Seasonal scenery", text: "Open water in summer and quiet, scenic views through the seasons." },
];

export default function LakefrontExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Waterfront Living"
        title="Relax Beside Van Norman Lake"
        image={featured.beachBoats}
        imageAlt="Sandy beach with a pedal boat and kayaks at the water's edge at Olde Mill Inn of Clarkston"
      />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-12">
          The lakefront setting is what makes Olde Mill Inn different. Guests can enjoy outdoor spaces
          beside {property.lake}, relax near the covered patio, and use complimentary kayaks and pedal
          boats during suitable seasonal conditions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {highlights.map((h) => (
            <div key={h.title} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
                <Icon name={h.icon} />
              </div>
              <h2 className="font-headline-md text-lg text-on-surface mb-2">{h.title}</h2>
              <p className="text-on-surface-variant text-sm">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo band */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
            <Image src={featured.lakefrontDeck} alt="Covered lakeside deck with log chairs at Olde Mill Inn of Clarkston" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
            <Image src={featured.waterfrontBuilding} alt="Lakefront room building over the water at Olde Mill Inn of Clarkston" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Qualifier + CTA */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-surface-container-low rounded-2xl p-8 md:p-10">
          <p className="text-on-surface-variant flex items-start gap-3">
            <Icon name="info" className="text-primary mt-0.5" />
            <span>
              Outdoor amenities and water activities are subject to season, weather, safety
              conditions and availability. There is no lifeguard on duty and swimming is not
              supervised.
            </span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <CTA href={property.bookingUrl} external size="lg" analyticsEvent={EVENTS.bookingClick}>
            Check Availability
          </CTA>
          <CTA href="/rooms" variant="outline" size="lg">
            View Rooms
          </CTA>
        </div>
      </section>
    </>
  );
}
