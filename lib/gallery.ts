// Photo gallery (§23). 69 professional property photos live in
// /public/images/gallery/01.jpg … 69.jpg.
//
// Categories follow the listing-shoot order, which runs street exterior →
// guest-room interiors → lakefront/deck/aerial. Boundaries are approximate and
// flagged for owner confirmation (docs/OWNER-CONFIRMATION.md). We deliberately
// use broad, defensible buckets and category-level alt text rather than
// asserting a specific room type for any single photo.


function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// Label and category-level alt text come from the dictionaries (gallery.categories).
export const galleryCategories = [
  { id: "exterior", numbers: range(1, 8) },
  { id: "rooms", numbers: range(9, 48) },
  { id: "lakefront", numbers: range(49, 69) },
] as const;

// Photos intentionally not shown anywhere on the site.
const EXCLUDE = new Set([15, 20, 22]);

export const galleryPhotos = galleryCategories.flatMap((cat) =>
  cat.numbers
    .filter((n) => !EXCLUDE.has(n))
    .map((n) => ({ src: `/images/gallery/${String(n).padStart(2, "0")}.jpg`, categoryId: cat.id }))
);

// A few hand-picked, confidently-identified images for feature placements.
export const featured = {
  heroAerial: "/images/gallery/50.jpg", // aerial: the inn on Van Norman Lake
  lakefrontDeck: "/images/gallery/64.jpg", // covered lakeside deck
  beachBoats: "/images/gallery/69.jpg", // beach with pedal boat & kayaks
  waterfrontBuilding: "/images/gallery/56.jpg", // building over the water
  streetExterior: "/images/gallery/04.jpg", // street view + vacancy sign
} as const;
