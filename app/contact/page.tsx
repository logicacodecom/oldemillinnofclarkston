import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { property, addressLine, directionsUrl } from "@/lib/property";
import { EVENTS } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Contact Olde Mill Inn of Clarkston at 5835 Dixie Hwy for reservations, directions and lodging information.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="We're here to help" title="Contact Olde Mill Inn of Clarkston" />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Reach us</h2>
          <address className="not-italic space-y-5 text-on-surface">
            <p className="flex items-start gap-3">
              <Icon name="location_on" className="text-primary mt-0.5" />
              <span>{addressLine}</span>
            </p>
            <p className="flex items-center gap-3">
              <Icon name="call" className="text-primary" />
              <a className="hover:text-primary" href={property.phone.href} data-analytics-event={EVENTS.phoneClick}>
                {property.phone.display}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Icon name="sms" className="text-primary" />
              <a className="hover:text-primary" href={property.text.href} data-analytics-event={EVENTS.textClick}>
                Text {property.text.display}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Icon name="mail" className="text-primary" />
              <a
                className="hover:text-primary break-all"
                href={`mailto:${property.email}`}
                data-analytics-event={EVENTS.emailClick}
              >
                {property.email}
              </a>
            </p>
          </address>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <CTA href={property.bookingUrl} external analyticsEvent={EVENTS.bookingClick}>
              Check Availability
            </CTA>
            <CTA href={directionsUrl} external variant="outline" icon="explore" analyticsEvent={EVENTS.directionsClick}>
              Get Directions
            </CTA>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden border border-outline-variant/20">
            <div className="bg-surface-container p-6">
              <p className="font-headline-md text-lg text-on-surface mb-1">Directions</p>
              <p className="text-on-surface-variant text-sm">
                We&apos;re on Dixie Highway in Clarkston, along Van Norman Lake. Tap “Get Directions”
                for turn-by-turn navigation.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Send a message</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
