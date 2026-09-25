import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";

// Overrides the homepage's canonical/description that would otherwise be
// inherited from the root layout on this 404 page.
export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  alternates: {},
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
      <h1 className="font-display-lg text-[36px] md:text-[44px] text-primary mb-4">Page Not Found</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
        Sorry, we couldn't find that page. Try one of the links below.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <CTA href="/">Back Home</CTA>
        <CTA href="/rooms" variant="outline">
          View Rooms
        </CTA>
        <Link href="/contact" className="text-primary underline underline-offset-2">
          Contact us
        </Link>
      </div>
    </div>
  );
}
