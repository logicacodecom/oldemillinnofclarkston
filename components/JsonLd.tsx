import { property, siteUrl, addressLine } from "@/lib/property";

// Accurate JSON-LD (§29). Only verified data — no aggregateRating, reviews,
// review count, star rating, prices or unsupported accessibility attributes.
export function lodgingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    url: siteUrl,
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
