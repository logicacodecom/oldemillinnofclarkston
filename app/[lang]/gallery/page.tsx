import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { galleryPhotos, galleryCategories, featured } from "@/lib/gallery";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/gallery", getDict(params.lang).meta.gallery);
}

export default function GalleryPage({ params }: Props) {
  const g = getDict(params.lang).gallery;
  const categories = galleryCategories.map((c) => ({ id: c.id, label: g.categories[c.id].label }));
  const photos = galleryPhotos.map((p) => ({ ...p, alt: g.categories[p.categoryId].alt }));
  return (
    <>
      <PageHero eyebrow={g.eyebrow} title={g.title} image={featured.beachBoats} imageAlt={g.heroAlt} />
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <GalleryGrid photos={photos} categories={categories} t={g.ui} />
      </section>
    </>
  );
}
