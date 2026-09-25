import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { property } from "@/lib/property";
import { featured } from "@/lib/gallery";
import { getDict, localePath, pageMetadata, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/lakefront-experience", getDict(params.lang).meta.lakefront);
}

export default function LakefrontExperiencePage({ params }: Props) {
  const { lang } = params;
  const t = getDict(lang);
  const l = t.lakefront;
  return (
    <>
      <PageHero eyebrow={l.eyebrow} title={l.title} image={featured.beachBoats} imageAlt={l.heroAlt} />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-12">
          {l.intro}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {l.highlights.map((h) => (
            <div key={h.icon} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
                <Icon name={h.icon} />
              </div>
              <h2 className="font-headline-md text-lg text-on-surface mb-2">{h.title}</h2>
              <p className="text-on-surface-variant text-sm">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo band */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
            <Image src={featured.lakefrontDeck} alt={l.deckAlt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
            <Image src={featured.waterfrontBuilding} alt={l.buildingAlt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Qualifier + CTA */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-surface-container-low rounded-2xl p-8 md:p-10">
          <p className="text-on-surface-variant flex items-start gap-3">
            <Icon name="info" className="text-primary mt-0.5" />
            <span>{l.qualifier}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <CTA href={property.bookingUrl} external size="lg" analyticsEvent={EVENTS.bookingClick}>
            {t.common.checkAvailability}
          </CTA>
          <CTA href={localePath(lang, "/rooms")} variant="outline" size="lg">
            {t.common.viewRooms}
          </CTA>
        </div>
      </section>
    </>
  );
}
