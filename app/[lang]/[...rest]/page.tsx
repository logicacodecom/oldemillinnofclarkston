import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, type Lang } from "@/lib/i18n";

// Unknown URLs land here so they 404 inside the [lang] layout (header, footer,
// correct <html lang>) instead of Next's bare default page.
export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  return { title: getDict(params.lang).meta.notFound.title };
}

export default function CatchAll() {
  notFound();
}
