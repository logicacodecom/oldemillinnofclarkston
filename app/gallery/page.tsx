import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { galleryPhotos, galleryCategories, featured } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Photo Gallery — Rooms and Lakefront Views",
  description:
    "View current photos of the rooms, lakefront setting, covered patio and outdoor areas at Olde Mill Inn of Clarkston.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Photo gallery"
        title="See the Property"
        image={featured.beachBoats}
        imageAlt="Beach and lake at Olde Mill Inn of Clarkston"
      />
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <GalleryGrid photos={galleryPhotos} categories={galleryCategories} />
      </section>
    </>
  );
}
