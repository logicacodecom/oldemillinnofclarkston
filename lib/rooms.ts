import { property } from "./property";

// Only verified/currently-published values are modeled here. Unknown values
// (occupancy, square footage, price, kitchenette-per-room, fireplace, etc.)
// are intentionally omitted rather than invented (§10, §11). See
// docs/OWNER-CONFIRMATION.md for the outstanding items.

export type Room = {
  slug: string;
  name: string;
  category: "off-water" | "lakefront";
  shortDescription: string;
  bedConfiguration?: string;
  maxGuests?: number;
  kitchenette?: boolean;
  fireplace?: boolean;
  view?: string;
  amenities: string[];
  images: string[]; // gallery numbers (see /public/images/gallery). Representative.
  bookingUrl?: string;
  rateFrom?: number; // never rendered publicly unless a verified live rate exists
};

const SHARED_ROOM_AMENITIES = [
  "Rustic log-style furnishings",
  "Stand-up shower",
  "Microwave",
  "Small refrigerator",
  "Cable television",
];

export const rooms: Room[] = [
  {
    slug: "standard-full",
    name: "Standard Full",
    category: "off-water",
    bedConfiguration: "Full bed",
    shortDescription:
      "A recently renovated off-water room with a full-size bed and warm rustic log furnishings — a comfortable, practical base for your Clarkston stay.",
    amenities: ["Recently renovated", ...SHARED_ROOM_AMENITIES, "Access to shared property amenities"],
    images: ["16", "19"],
  },
  {
    slug: "deluxe-queen",
    name: "Deluxe Queen",
    category: "off-water",
    bedConfiguration: "Queen bed",
    shortDescription:
      "A recently renovated off-water room with a queen bed and rustic log details, a short walk from the lakefront and shared outdoor spaces.",
    amenities: ["Recently renovated", ...SHARED_ROOM_AMENITIES],
    images: ["32", "34"],
  },
  {
    slug: "premium-queen",
    name: "Premium Queen",
    category: "lakefront",
    bedConfiguration: "Queen bed",
    view: "Lakefront",
    shortDescription:
      "A recently renovated lakefront room with a queen bed and rustic log furnishings, set near the water and the covered patio.",
    amenities: ["Recently renovated", ...SHARED_ROOM_AMENITIES],
    images: ["36", "38"],
  },
  {
    slug: "premium-two-full",
    name: "Premium Lakefront Room with Two Full Beds",
    category: "lakefront",
    bedConfiguration: "Two full beds",
    view: "Lakefront",
    shortDescription:
      "A lakefront room with two full beds and rustic log furnishings — room to spread out, steps from the water.",
    amenities: [...SHARED_ROOM_AMENITIES],
    images: ["42", "44"],
  },
  {
    slug: "presidential-honeymoon-suite",
    name: "Presidential / Honeymoon Suite",
    category: "lakefront",
    view: "Lakefront",
    shortDescription:
      "Our lakefront suite — the most spacious way to stay beside Van Norman Lake. Contact the inn for current details.",
    amenities: ["Lakefront suite"],
    images: ["28", "30", "46"],
  },
];

// Give every room a default booking action (clean Cloudbeds URL) unless a
// verified room-specific link is added later.
for (const room of rooms) {
  room.bookingUrl ??= property.bookingUrl;
}

export const roomsBySlug = new Map(rooms.map((r) => [r.slug, r]));
export const offWaterRooms = rooms.filter((r) => r.category === "off-water");
export const lakefrontRooms = rooms.filter((r) => r.category === "lakefront");

export function roomImage(room: Room, index = 0): string {
  return `/images/gallery/${room.images[index] ?? room.images[0]}.jpg`;
}
