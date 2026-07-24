import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { property } from "@/lib/property";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Olde Mill Inn of Clarkston's commitment to an accessible website.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero title="Accessibility" />
      <section className="py-section-gap max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-on-surface-variant leading-relaxed space-y-6">
        <p>
          We want this website to be usable by as many people as possible and aim to meet the Web
          Content Accessibility Guidelines (WCAG) 2.2 Level AA.
        </p>

        <h2 className="font-headline-md text-headline-md text-on-surface">What we&apos;ve done</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Semantic structure with clear headings and landmarks</li>
          <li>Keyboard navigation with visible focus styles</li>
          <li>Descriptive alternative text for images</li>
          <li>Color contrast checked against the design palette</li>
          <li>Support for reduced-motion preferences</li>
          <li>Labels and clear error messages on the contact form</li>
        </ul>

        <h2 className="font-headline-md text-headline-md text-on-surface">Booking &amp; the property</h2>
        <p>
          Reservations are completed on our booking provider&apos;s system, which is maintained
          separately. For questions about accessibility features of the rooms or property, please
          contact us directly so we can help.
        </p>

        <h2 className="font-headline-md text-headline-md text-on-surface">Let us know</h2>
        <p>
          If you encounter any difficulty using this site, contact us at{" "}
          <a className="text-primary underline underline-offset-2 break-all" href={`mailto:${property.email}`}>
            {property.email}
          </a>{" "}
          or {property.phone.display} and we&apos;ll do our best to help and to fix the issue.
        </p>
      </section>
    </>
  );
}
