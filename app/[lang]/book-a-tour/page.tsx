import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { property } from "@/lib/property";
import { tourPhotos } from "@/lib/gallery";
import { getDict, localePath, pageMetadata, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/book-a-tour", getDict(params.lang).meta.tour);
}

// Google's full appointment-schedule URL can be embedded (with gv=true); a short
// calendar.app.google link can't, so it only gets the "open" button.
function embedUrl(url: string): string | null {
  if (!url.includes("calendar.google.com/calendar/appointments")) return null;
  if (url.includes("gv=true")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}gv=true`;
}

export default function BookATourPage({ params }: Props) {
  const t = getDict(params.lang);
  const c = t.tour;
  const bookingUrl = property.tourBookingUrl;
  const embed = bookingUrl ? embedUrl(bookingUrl) : null;
  // The full-page booking view, for the button (gv=true is the embed layout).
  const openUrl = bookingUrl.replace(/[?&]gv=true$/, "").replace(/([?&])gv=true&/, "$1");

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} image={tourPhotos.outdoor[0]} imageAlt={c.heroAlt} />

      <section id="book" className="bg-surface-container-low py-section-gap scroll-mt-20">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl mb-8">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{c.bookTitle}</h2>
            <p className="text-on-surface-variant leading-relaxed">{bookingUrl ? c.bookIntro : c.pending}</p>
          </div>

          {embed && (
            <iframe
              src={embed}
              title={c.calendarTitle}
              loading="lazy"
              className="w-full h-[720px] rounded-2xl border border-outline-variant/20 bg-surface-white mb-6"
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {bookingUrl ? (
              <CTA href={openUrl} external icon="event_available" analyticsEvent={EVENTS.tourBookingClick}>
                {c.openCalendar}
              </CTA>
            ) : (
              <CTA href={property.phone.href} icon="call" analyticsEvent={EVENTS.phoneClick}>
                {t.common.callNumber}
              </CTA>
            )}
          </div>

          <p className="mt-6 text-sm text-on-surface-variant">
            <Link className="text-primary font-semibold underline underline-offset-2" href={localePath(params.lang, "/celebrate")}>
              {c.seeSpaces}
            </Link>
          </p>

          <p className="mt-3 text-sm text-on-surface-variant">
            {c.callPrefix}{" "}
            <a className="text-primary underline underline-offset-2" href={property.phone.href} data-analytics-event={EVENTS.phoneClick}>
              {property.phone.display}
            </a>{" "}
            {c.textPrefix}{" "}
            <a className="text-primary underline underline-offset-2" href={property.text.href} data-analytics-event={EVENTS.textClick}>
              {property.text.display}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
