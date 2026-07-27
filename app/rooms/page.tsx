import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RoomFilters } from "@/components/RoomFilters";
import { AvailabilityWidget } from "@/components/AvailabilityWidget";
import { rooms } from "@/lib/rooms";
import { featured } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Rooms — Lakefront and Off-Water",
  description:
    "Explore lakefront and off-water rooms at Olde Mill Inn of Clarkston and check current availability through secure direct booking.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Accommodations"
        title="Find Your Room"
        subtitle="Choose from practical off-water rooms and distinctive lakefront accommodations. Room features vary, so review the details and check current availability through the secure booking system."
        image={featured.waterfrontBuilding}
        imageAlt="The lakefront room building at Olde Mill Inn of Clarkston seen from the water"
      />
      <section className="pt-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Check availability &amp; rates</h2>
        <AvailabilityWidget />
      </section>
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <RoomFilters rooms={rooms} />
        <p className="mt-10 text-sm text-on-surface-variant">
          Room features and availability are confirmed at the time of booking.
        </p>
      </section>
    </>
  );
}
