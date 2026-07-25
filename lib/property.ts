// Single source of truth for all repeated business data (§33).
// Do not duplicate phone/address/booking URL/email in components — import from here.

export type Review = {
  quote: string;
  author: string;
  context?: string;
};

export const property = {
  name: "Olde Mill Inn of Clarkston",
  eyebrow: "Lakefront lodging in Clarkston, Michigan",
  website: "https://www.oldemillinnofclarkston.com/",
  address: {
    street: "5835 Dixie Hwy",
    city: "Clarkston",
    state: "MI",
    postalCode: "48346",
    country: "US",
  },
  phone: {
    display: "(248) 623-0300",
    href: "tel:+12486230300",
  },
  // Described publicly as a text line. No guaranteed/24h response is promised (§4).
  text: {
    display: "(248) 778-5068",
    href: "sms:+12487785068",
  },
  // Source of truth: the email on the property's own Cloudbeds booking system.
  email: process.env.NEXT_PUBLIC_PROPERTY_EMAIL ?? "oldmillinnofclarkston@gmail.com",
  // Clean Cloudbeds URL — no historical dates or campaign params (§5).
  bookingUrl: "https://hotels.cloudbeds.com/en/reservation/fuj1oa?currency=usd",
  geo: {
    latitude: 42.70349503,
    longitude: -83.40392303,
  },
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
  petsAllowed: false,
  lake: "Van Norman Lake",
  pineKnobMiles: 5,
  // No verified guest reviews yet — the reviews section stays hidden until real,
  // owner-approved reviews are supplied (§17). Never fabricate reviews.
  reviews: [] as Review[],
} as const;

export const addressLine = `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.postalCode}`;

// Canonical site origin (no trailing slash) for metadata/canonical/sitemap.
export const siteUrl = "https://www.oldemillinnofclarkston.com";

// Opens Google Maps driving directions to the property.
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${property.geo.latitude},${property.geo.longitude}`;
