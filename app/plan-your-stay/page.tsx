import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { property } from "@/lib/property";
import { EVENTS } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Plan Your Stay — FAQs & Policies",
  description:
    "Check-in and check-out times, pet policy, kayaks and pedal boats, Wi-Fi, parking and booking information for Olde Mill Inn of Clarkston.",
  alternates: { canonical: "/plan-your-stay" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const quickFacts = [
  { icon: "login", label: "Check-in", value: `From ${property.checkIn}` },
  { icon: "logout", label: "Check-out", value: `By ${property.checkOut}` },
  { icon: "pets", label: "Pets", value: "Not permitted" },
  { icon: "local_parking", label: "Parking", value: "Available on-site" },
];

export default function PlanYourStayPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan your stay"
        title="FAQs & Policies"
        subtitle="The practical details for a comfortable visit. For anything not covered here, contact the inn directly."
      />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {quickFacts.map((f) => (
            <div key={f.label} className="bg-surface-white rounded-xl p-5 border border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary mb-3">
                <Icon name={f.icon} />
              </div>
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">{f.label}</p>
              <p className="font-headline-md text-lg text-on-surface">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="bg-surface-white rounded-xl border border-outline-variant/20 p-5">
                <summary className="font-headline-md text-lg text-on-surface cursor-pointer marker:text-primary">
                  {f.q}
                </summary>
                <p className="text-on-surface-variant mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <CTA href={property.bookingUrl} external size="lg" analyticsEvent={EVENTS.bookingClick}>
              Check Availability
            </CTA>
            <CTA href={property.phone.href} variant="outline" size="lg" icon="call" analyticsEvent={EVENTS.phoneClick}>
              Call {property.phone.display}
            </CTA>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd} />
    </>
  );
}
