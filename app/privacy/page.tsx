import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { property } from "@/lib/property";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Olde Mill Inn of Clarkston handles information collected through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy" />
      <section className="py-section-gap max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-on-surface-variant leading-relaxed space-y-6">
        <p className="text-sm">This statement describes how this website handles personal information. It is provided for transparency and should be reviewed and approved by the property before launch.</p>

        <h2 className="font-headline-md text-headline-md text-on-surface">Information we collect</h2>
        <p>If you use our contact form, we collect the details you provide — such as your name, email address, optional phone number, optional travel dates and your message — so we can respond to your inquiry.</p>
        <p>Like most websites, we may collect limited technical and usage information (such as pages viewed) to understand how the site is used and to improve it. This is only active if an analytics service has been configured.</p>

        <h2 className="font-headline-md text-headline-md text-on-surface">How we use information</h2>
        <p>We use the information you submit to reply to your questions and to help arrange your stay. We do not sell your personal information.</p>

        <h2 className="font-headline-md text-headline-md text-on-surface">Third-party services</h2>
        <p>Reservations are handled by our booking provider (Cloudbeds) on their secure system; any details you enter there are governed by their terms and privacy practices. Map and directions links open Google Maps.</p>

        <h2 className="font-headline-md text-headline-md text-on-surface">Contact</h2>
        <p>
          Questions about this statement? Contact us at{" "}
          <a className="text-primary underline underline-offset-2 break-all" href={`mailto:${property.email}`}>
            {property.email}
          </a>{" "}
          or {property.phone.display}.
        </p>
      </section>
    </>
  );
}
