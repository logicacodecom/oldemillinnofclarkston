import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { property } from "@/lib/property";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/plan-your-stay", getDict(params.lang).meta.plan);
}

export default function PlanYourStayPage({ params }: Props) {
  const t = getDict(params.lang);
  const p = t.plan;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: t.htmlLang,
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {p.quickFacts.map((f) => (
            <div key={f.icon} className="bg-surface-white rounded-xl p-5 border border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary mb-3">
                <Icon name={f.icon} />
              </div>
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">{f.label}</p>
              <p className="font-headline-md text-lg text-on-surface">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{p.faqTitle}</h2>
          <div className="space-y-3">
            {t.faqs.map((f) => (
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
              {t.common.checkAvailability}
            </CTA>
            <CTA href={property.phone.href} variant="outline" size="lg" icon="call" analyticsEvent={EVENTS.phoneClick}>
              {t.common.callNumber}
            </CTA>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd} />
    </>
  );
}
