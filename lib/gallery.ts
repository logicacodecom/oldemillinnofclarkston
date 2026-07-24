// Photo gallery (§23). 69 professional property photos live in
// /public/images/gallery/01.jpg … 69.jpg.
//
// Categories follow the listing-shoot order, which runs street exterior →
// guest-room interiors → lakefront/deck/aerial. Boundaries are approximate and
// flagged for owner confirmation (docs/OWNER-CONFIRMATION.md). We deliberately
// use broad, defensible buckets and category-level alt text rather than
// asserting a specific room type for any single photo.

export type GalleryCategory = {
  id: string;
  label: string;
  alt: string; // category-level alt text applied to each photo in the bucket
  numbers: number[];
};

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const galleryCategories: GalleryCategory[] = [
  {
    id: "exterior",
    label: "Exterior & Grounds",
    alt: "Exterior and grounds at Olde Mill Inn of Clarkston",
    numbers: range(1, 9),
  },
  {
    id: "rooms",
    label: "Rooms & Interiors",
    alt: "Guest room interior at Olde Mill Inn of Clarkston",
    numbers: range(10, 49),
  },
  {
    id: "lakefront",
    label: "Lakefront & Deck",
    alt: "Lakefront setting and covered deck at Olde Mill Inn of Clarkston",
    numbers: range(50, 69),
  },
];

export type GalleryPhoto = {
  src: string;
  alt: string;
  categoryId: string;
};

export const galleryPhotos: GalleryPhoto[] = galleryCategories.flatMap((cat) =>
  cat.numbers.map((n) => ({
    src: `/images/gallery/${String(n).padStart(2, "0")}.jpg`,
    alt: cat.alt,
    categoryId: cat.id,
  }))
);

// A few hand-picked, confidently-identified images for feature placements.
export const featured = {
  heroAerial: "/images/gallery/50.jpg", // aerial: the inn on Van Norman Lake
  lakefrontDeck: "/images/gallery/64.jpg", // covered lakeside deck
  beachBoats: "/images/gallery/69.jpg", // beach with pedal boat & kayaks
  waterfrontBuilding: "/images/gallery/56.jpg", // building over the water
  streetExterior: "/images/gallery/04.jpg", // street view + vacancy sign
} as const;
