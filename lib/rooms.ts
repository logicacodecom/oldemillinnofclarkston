import { property } from "./property";

// Synced to the property's own booking system (Cloudbeds) as the source of
// truth: room names, categories, occupancy, per-room amenities, descriptions,
// and photo assignments. Photos are OUR local shoot, mapped to each room using
// the exact image assignments Cloudbeds uses.

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
  images: string[]; // our gallery numbers (see /public/images/gallery)
  bookingUrl?: string;
  rateFrom?: number; // never rendered publicly unless a verified live rate exists
  cloudbedsRoomTypeID?: string; // joins live availability (getAvailableRoomTypes)
};

// Every room shares these (per the property description + Cloudbeds).
const BASE = [
  "Recently renovated",
  "Rustic log furniture",
  "Serta Perfect Sleeper mattress",
  "Stand-up shower",
  "Microwave",
  "Small refrigerator",
  "Cable TV",
  "Free Wi-Fi",
  "Air conditioning",
  "Coffee maker",
  "Hairdryer",
];

export const rooms: Room[] = [
  {
    slug: "standard-full",
    name: "Standard Full",
    cloudbedsRoomTypeID: "395680",
    category: "off-water",
    bedConfiguration: "Full bed",
    maxGuests: 2,
    kitchenette: false,
    fireplace: false,
    shortDescription:
      "An off-water room with a full-size bed and warm rustic log furniture — a comfortable, practical base for your Clarkston stay, with access to the lake and kayaks.",
    amenities: [...BASE],
    images: ["09", "10", "11", "12", "13", "14"],
  },
  {
    slug: "deluxe-queen",
    name: "Deluxe Queen",
    cloudbedsRoomTypeID: "395679",
    category: "off-water",
    bedConfiguration: "Queen bed",
    maxGuests: 2,
    kitchenette: true,
    fireplace: true,
    shortDescription:
      "An off-water room with a queen bed and rustic log furniture, featuring a wall-mounted electric fireplace and a kitchenette. Includes lake access and kayaks.",
    amenities: [...BASE, "Kitchenette", "Wall-mounted electric fireplace", "Smart TV with Roku"],
    images: ["16", "17", "18", "19", "21"],
  },
  {
    slug: "premium-queen",
    name: "Premium Queen",
    cloudbedsRoomTypeID: "395678",
    category: "lakefront",
    bedConfiguration: "Queen bed",
    maxGuests: 2,
    view: "Lakefront",
    kitchenette: true,
    fireplace: true,
    shortDescription:
      "A lakefront room with a queen bed and rustic log furniture, set right by the water. Includes a kitchenette, dual-burner stovetop and a wall-mounted electric fireplace.",
    amenities: [
      ...BASE,
      "Kitchenette",
      "Dual-burner stovetop",
      "Wall-mounted electric fireplace",
      "Smart TV with Roku",
    ],
    images: ["43", "44", "45", "46", "47", "48"],
  },
  {
    slug: "premium-two-full",
    name: "Premium Lakefront Room with Two Full Beds",
    cloudbedsRoomTypeID: "394578",
    category: "lakefront",
    bedConfiguration: "Two full beds",
    maxGuests: 4,
    view: "Lakefront",
    kitchenette: true,
    fireplace: true,
    shortDescription:
      "A lakefront room with two full-size beds and rustic log furniture — room to spread out by the water. Includes a kitchenette, dual-burner stovetop and a wall-mounted electric fireplace.",
    amenities: [
      ...BASE,
      "Kitchenette",
      "Dual-burner stovetop",
      "Wall-mounted electric fireplace",
      "Smart TV with Roku",
    ],
    images: ["36", "37", "38", "39", "40", "41"],
  },
  {
    slug: "honeymoon-family-suite",
    name: "Honeymoon / Family Suite",
    cloudbedsRoomTypeID: "395682",
    category: "lakefront",
    maxGuests: 4,
    view: "Lakefront",
    kitchenette: true,
    fireplace: true,
    shortDescription:
      "Our most accommodating lakefront suite, filled with rustic log furniture. Features a full kitchen, an in-unit washer and dryer, and a large-screen TV above a fireplace.",
    amenities: [
      ...BASE,
      "Full kitchen",
      "Stove",
      "In-unit washer & dryer",
      "Wall-mounted electric fireplace",
      "Large-screen Smart TV with Roku",
    ],
    images: ["23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34"],
  },
];

// Give every room a default booking action (clean Cloudbeds URL) unless a
// verified room-specific link is added later.
for (const room of rooms) {
  room.bookingUrl ??= property.bookingUrl;
}

export const roomsBySlug = new Map(rooms.map((r) => [r.slug, r]));
export const roomByCloudbedsId = new Map(
  rooms.filter((r) => r.cloudbedsRoomTypeID).map((r) => [r.cloudbedsRoomTypeID as string, r])
);
export const offWaterRooms = rooms.filter((r) => r.category === "off-water");
export const lakefrontRooms = rooms.filter((r) => r.category === "lakefront");

export function roomImage(room: Room, index = 0): string {
  return `/images/gallery/${room.images[index] ?? room.images[0]}.jpg`;
}

// Maps an amenity label to a representative Material Symbols icon. First match
// wins, so order matters (e.g. "conditioning" before anything containing "air").
const AMENITY_ICONS: [match: string, icon: string][] = [
  ["conditioning", "ac_unit"],
  ["wi-fi", "wifi"],
  ["wifi", "wifi"],
  ["microwave", "microwave"],
  ["refrigerator", "kitchen"],
  ["fridge", "kitchen"],
  ["full kitchen", "countertops"],
  ["kitchenette", "countertops"],
  ["stove", "cooking"],
  ["burner", "cooking"],
  ["hairdry", "air"],
  ["hair dry", "air"],
  ["washer", "local_laundry_service"],
  ["dryer", "local_laundry_service"],
  ["fireplace", "fireplace"],
  ["shower", "shower"],
  ["coffee", "coffee_maker"],
  ["roku", "tv"],
  ["tv", "tv"],
  ["mattress", "bed"],
  ["log furniture", "cabin"],
  ["renovated", "auto_awesome"],
];

export function amenityIcon(label: string): string {
  const l = label.toLowerCase();
  for (const [match, icon] of AMENITY_ICONS) if (l.includes(match)) return icon;
  return "check_circle";
}
