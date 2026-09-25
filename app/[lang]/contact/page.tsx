import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { property, addressLine, directionsUrl } from "@/lib/property";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/contact", getDict(params.lang).meta.contact);
}

export default function ContactPage({ params }: Props) {
  const t = getDict(params.lang);
  const c = t.contact;
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{c.reachUs}</h2>
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
                {t.common.textNumber}
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
              {t.common.checkAvailability}
            </CTA>
            <CTA href={directionsUrl} external variant="outline" icon="explore" analyticsEvent={EVENTS.directionsClick}>
              {t.common.getDirections}
            </CTA>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden border border-outline-variant/20">
            <div className="bg-surface-container p-6">
              <p className="font-headline-md text-lg text-on-surface mb-1">{c.directionsTitle}</p>
              <p className="text-on-surface-variant text-sm">{c.directionsText}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{c.formTitle}</h2>
          <ContactForm t={t.form} />
        </div>
      </section>
    </>
  );
}
