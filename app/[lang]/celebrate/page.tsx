import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { PhotoGrid } from "@/components/PhotoGrid";
import { property } from "@/lib/property";
import { tourPhotos } from "@/lib/gallery";
import { getDict, localePath, pageMetadata, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/celebrate", getDict(params.lang).meta.celebrate);
}

// Events landing page: what can be celebrated and where. Every call to action
// leads to Schedule a Tour (/book-a-tour), which holds the booking calendar.
export default function CelebratePage({ params }: Props) {
  const { lang } = params;
  const t = getDict(lang);
  const c = t.celebrate;
  const to = (path: string) => localePath(lang, path);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} image={tourPhotos.outdoor[0]} imageAlt={c.heroAlt} />

      {/* Occasions */}
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mb-10">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{c.occasionsTitle}</h2>
          <p className="text-on-surface-variant leading-relaxed">{c.occasionsIntro}</p>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {c.occasions.map((o) => (
            <li key={o.icon} className="min-w-0 bg-surface-white rounded-xl p-4 md:p-5 border border-outline-variant/10 flex items-center gap-3">
              <span className="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Icon name={o.icon} />
              </span>
              <span className="min-w-0 font-headline-md text-base md:text-lg leading-snug text-on-surface">{o.label}</span>
            </li>
          ))}
        </ul>
        <CTA href={to("/book-a-tour")} icon="event_available">
          {c.scheduleCta}
        </CTA>
      </section>

      {/* Spaces + photos */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">{c.spacesTitle}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {c.spaces.map((s) => (
              <li key={s.icon} className="flex gap-4">
                <Icon name={s.icon} className="text-primary text-3xl" />
                <div>
                  <h3 className="font-bold text-on-surface mb-1">{s.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-14">
            <PhotoGrid title={c.outdoorTitle} photos={tourPhotos.outdoor} alt={c.outdoorAlt} />
            <PhotoGrid title={c.indoorTitle} photos={tourPhotos.indoor} alt={c.indoorAlt} />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <CTA href={to("/gallery")} variant="ghost" icon="photo_library">
              {c.morePhotos}
            </CTA>
            <CTA href={to("/lakefront-experience")} variant="ghost" icon="water">
              {c.seeLakefront}
            </CTA>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">{c.howTitle}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.steps.map((s, i) => (
            <li key={s.icon} className="bg-surface-white rounded-2xl p-6 border border-outline-variant/10">
              <span className="flex items-center gap-3 mb-3 text-primary">
                <span className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <Icon name={s.icon} />
              </span>
              <h3 className="font-headline-md text-lg text-on-surface mb-1">{s.title}</h3>
              <p className="text-on-surface-variant text-sm">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Stay the night */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-surface-container-low rounded-3xl p-8 md:p-12">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{c.stayTitle}</h2>
          <p className="text-on-surface-variant leading-relaxed max-w-2xl mb-6">{c.stayText}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTA href={to("/rooms")} variant="outline">
              {c.viewRooms}
            </CTA>
            <CTA href={to("/rooms/honeymoon-family-suite")} variant="outline" icon="favorite">
              {c.viewSuite}
            </CTA>
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="py-section-gap bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto px-margin-mobile text-center">
          <h2 className="font-headline-lg text-headline-lg mb-4">{c.finalTitle}</h2>
          <p className="text-on-primary-container mb-8 leading-relaxed">{c.finalText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTA
              href={to("/book-a-tour")}
              icon="event_available"
              className="bg-sunset-accent text-primary hover:bg-surface-white border-0"
            >
              {c.scheduleCta}
            </CTA>
            <CTA href={property.phone.href} variant="glass" icon="call" analyticsEvent={EVENTS.phoneClick}>
              {t.common.callNumber}
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}
