import Image from "next/image";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { RoomCard } from "@/components/RoomCard";
import { AvailabilityWidget } from "@/components/AvailabilityWidget";
import { property, directionsUrl } from "@/lib/property";
import { offWaterRooms, lakefrontRooms } from "@/lib/rooms";
import { attractions } from "@/lib/attractions";
import { featured } from "@/lib/gallery";
import { EVENTS } from "@/lib/analytics";

const trustItems = [
  { icon: "water", label: "Lakefront Setting" },
  { icon: "music_note", label: "≈5 Miles from Pine Knob" },
  { icon: "kayaking", label: "Complimentary Kayaks" },
  { icon: "directions_boat", label: "Complimentary Pedal Boats" },
  { icon: "local_parking", label: "Parking Available" },
  { icon: "kitchen", label: "Selected Kitchenettes" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <Image
          src={featured.heroAerial}
          alt="Aerial view of Olde Mill Inn of Clarkston along the shoreline of Van Norman Lake"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="relative z-10 text-center max-w-4xl px-margin-mobile text-surface-white pt-20">
          <p className="font-label-lg text-label-lg uppercase tracking-[0.2em] text-primary-fixed mb-4">
            {property.eyebrow}
          </p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 drop-shadow-lg">
            Stay on the Lake. Minutes from Pine Knob.
          </h1>
          <p className="font-body-lg text-body-lg mb-10 max-w-2xl mx-auto opacity-95 leading-relaxed">
            Enjoy a relaxed Clarkston stay with comfortable rooms, complimentary kayaks and pedal
            boats, waterfront spaces, and convenient access to concerts, skiing, dining and local
            attractions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTA href="#availability" size="lg">
              Check Availability
            </CTA>
            <CTA href="/rooms" variant="glass" size="lg">
              View Rooms
            </CTA>
          </div>
          <p className="mt-6">
            <a
              href={property.phone.href}
              data-analytics-event={EVENTS.phoneClick}
              className="inline-flex items-center gap-2 text-surface-white/90 hover:text-surface-white font-label-lg"
            >
              <Icon name="call" /> Call {property.phone.display}
            </a>
          </p>
        </div>
      </section>

      {/* Live availability & rates */}
      <section
        id="availability"
        className="relative z-20 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop -mt-16 md:-mt-24 scroll-mt-24"
      >
        <div className="text-center mb-5">
          <h2 className="sr-only">Check availability and rates</h2>
        </div>
        <AvailabilityWidget />
      </section>

      {/* Trust strip */}
      <section aria-label="At a glance" className="bg-surface-white py-12 border-b border-outline-variant/20 mt-section-gap">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-12 h-12 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Icon name={item.icon} />
              </div>
              <span className="font-label-lg text-on-surface">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          A Different Kind of Clarkston Stay
        </h2>
        <div className="h-1 w-20 bg-sunset-accent mx-auto rounded-full mb-8" />
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Olde Mill Inn of Clarkston combines the character and value of an independent inn with a
          setting nearby chain hotels cannot offer. Stay beside {property.lake}, relax near the
          covered waterfront patio, and enjoy convenient access to Pine Knob, nearby ski areas, local
          dining and shopping.
        </p>
      </section>

      {/* Featured rooms */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <h2 className="font-headline-lg text-headline-lg text-primary">Lakefront Rooms</h2>
          <CTA href="/rooms" variant="ghost">
            View all rooms
          </CTA>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
          {lakefrontRooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Off-Water Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {offWaterRooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </section>

      {/* Lakefront experience editorial */}
      <section className="py-section-gap bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={featured.lakefrontDeck}
                alt="Covered lakeside deck with log chairs overlooking the water at Olde Mill Inn of Clarkston"
                width={2048}
                height={1363}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-8 -right-8 w-56 h-56 bg-sunset-accent rounded-2xl -z-0 opacity-20" />
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-sunset-accent font-label-lg uppercase tracking-[0.2em] mb-4 block">
              Waterfront Living
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6 leading-tight">
              More Than a Room
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Step outside and enjoy the lakefront setting that makes Olde Mill Inn distinctive.
              Registered guests can relax beside the water, use complimentary kayaks and pedal boats,
              or spend time near the covered lakefront patio and outdoor areas.
            </p>
            <ul className="space-y-5 mb-8">
              <li className="flex gap-4">
                <Icon name="deck" className="text-primary" />
                <div>
                  <h3 className="font-bold text-on-surface">Covered lakefront patio</h3>
                  <p className="text-on-surface-variant text-sm">
                    A shaded space to enjoy morning coffee or an evening by the water.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Icon name="kayaking" className="text-primary" />
                <div>
                  <h3 className="font-bold text-on-surface">Kayaks &amp; pedal boats</h3>
                  <p className="text-on-surface-variant text-sm">
                    Complimentary for registered guests, subject to season, weather, safety
                    conditions and availability.
                  </p>
                </div>
              </li>
            </ul>
            <CTA href="/lakefront-experience" variant="outline">
              Explore the lakefront
            </CTA>
          </div>
        </div>
      </section>

      {/* Pine Knob */}
      <section className="py-section-gap">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-primary rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between text-on-primary gap-10">
            <div className="lg:w-3/5">
              <h2 className="font-headline-lg text-[32px] md:text-[40px] leading-tight mb-6">
                Going to Pine Knob? Stay Approximately Five Miles Away.
              </h2>
              <p className="text-on-primary-container text-body-lg mb-8 max-w-lg leading-relaxed">
                Make Olde Mill Inn your Clarkston home base for concerts, skiing and seasonal events.
                Return after your outing to a quieter lakefront setting instead of a conventional
                highway hotel.
              </p>
              <CTA
                href="/pine-knob"
                className="bg-sunset-accent text-primary hover:bg-surface-white border-0"
                analyticsEvent={EVENTS.pineKnobCtaClick}
              >
                Plan Your Pine Knob Stay
              </CTA>
            </div>
            <div className="lg:w-2/5 flex justify-center">
              <div className="bg-surface-white/10 backdrop-blur-md p-8 rounded-2xl border border-on-primary/20 w-full text-center">
                <p className="font-display-lg text-[56px] leading-none mb-2">≈5</p>
                <p className="text-sm uppercase tracking-wider opacity-80 mb-6">miles to Pine Knob</p>
                <p className="text-sm opacity-80">
                  Pine Knob Music Theatre &amp; Pine Knob Ski and Snowboard Resort are both about five
                  miles away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby attractions */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-10">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Explore the Area</h2>
          <div className="h-1 w-20 bg-sunset-accent mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {attractions.slice(0, 6).map((a) => (
            <div key={a.name} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline-md text-lg text-on-surface">{a.name}</h3>
                {a.approxMiles ? (
                  <span className="text-sm text-on-surface-variant whitespace-nowrap">
                    ≈{a.approxMiles} mi
                  </span>
                ) : null}
              </div>
              <p className="text-on-surface-variant text-sm">{a.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <CTA href="/things-to-do" variant="outline">
            See things to do
          </CTA>
        </div>
      </section>

      {/* Independent property */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center max-w-3xl">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
            Independent, Local and Welcoming
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Olde Mill Inn is a family-operated property offering a relaxed stay for overnight visits,
            weekend getaways and longer stays. The rooms combine warm rustic details with practical
            amenities for a comfortable visit.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
          Your Clarkston Lakefront Stay Starts Here
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
