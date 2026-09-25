import { property, siteUrl, addressLine, bookingUrl } from "@/lib/property";
import { rooms, type Room } from "@/lib/rooms";

const hotelId = `${siteUrl}/#hotel`;

// Accurate JSON-LD (§29). Only verified data — no aggregateRating, reviews,
// review count, star rating, prices or unsupported accessibility attributes.
export function lodgingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": hotelId,
    name: property.name,
    url: siteUrl,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${property.geo.latitude},${property.geo.longitude}`,
    image: [
      `${siteUrl}/images/gallery/50.jpg`,
      `${siteUrl}/images/gallery/64.jpg`,
      `${siteUrl}/images/gallery/04.jpg`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address.street,
      addressLocality: property.address.city,
      addressRegion: property.address.state,
      postalCode: property.address.postalCode,
      addressCountry: property.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.geo.latitude,
      longitude: property.geo.longitude,
    },
    telephone: property.phone.href.replace("tel:", ""),
    email: property.email,
    checkinTime: "15:00",
    checkoutTime: "11:00",
    petsAllowed: property.petsAllowed,
    description: `Independent, family-operated lakefront lodging on ${property.lake} in Clarkston, Michigan, approximately five miles from Pine Knob.`,
    potentialAction: {
      "@type": "ReserveAction",
      target: property.bookingUrl,
    },
    amenityFeature: [
      "Lakefront location",
      "Complimentary kayaks",
      "Complimentary pedal boats",
      "Covered lakefront patio",
      "Free parking",
      "Wi-Fi",
      "Microwave",
      "Refrigerator",
      "Cable television",
      "Air conditioning",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    containsPlace: rooms.map(hotelRoomJsonLd),
  };
}

// One HotelRoom node per room type, linked to the Hotel via containsPlace above.
// Reused standalone on room detail pages for stronger room-level rich results.
export function hotelRoomJsonLd(room: Room) {
  return {
    "@type": "HotelRoom",
    name: room.name,
    url: `${siteUrl}/rooms/${room.slug}`,
    description: room.metaDescription,
    image: room.images.map((n) => `${siteUrl}/images/gallery/${n}.jpg`),
    occupancy: room.maxGuests
      ? { "@type": "QuantitativeValue", maxValue: room.maxGuests }
      : undefined,
    bed: room.bedConfiguration
      ? { "@type": "BedDetails", typeOfBed: room.bedConfiguration }
      : undefined,
    amenityFeature: room.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: room.bookingUrl ?? bookingUrl({ roomTypeID: room.cloudbedsRoomTypeID }),
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
