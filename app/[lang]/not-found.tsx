import type { Metadata } from "next";
import { NotFoundBody } from "@/components/NotFoundBody";
import { en } from "@/lib/dictionaries/en";
import { es } from "@/lib/dictionaries/es";

// Keeps the homepage canonical out of 404s. not-found gets no params, so the
// body picks its language from the URL on the client.
export const metadata: Metadata = {
  alternates: {},
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundBody en={en.notFound} es={es.notFound} />;
}
