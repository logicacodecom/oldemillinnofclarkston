import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CareersForm } from "@/components/CareersForm";
import { Icon } from "@/components/Icon";
import { positions, positionIcons } from "@/lib/careers";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";
import { featured } from "@/lib/gallery";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/careers", getDict(params.lang).meta.careers);
}

export default function CareersPage({ params }: Props) {
  const t = getDict(params.lang);
  const c = t.careers;
  const positionTitles = Object.fromEntries(positions.map((p) => [p, c.positions[p].title])) as Record<
    (typeof positions)[number],
    string
  >;
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.intro} image={featured.waterfrontBuilding} imageAlt={c.heroAlt} />

      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{c.openingsTitle}</h2>
          <ul className="space-y-4">
            {positions.map((p) => (
              <li key={p} className="rounded-2xl border border-outline-variant/20 bg-surface-container p-6 flex gap-4">
                <Icon name={positionIcons[p]} className="text-primary text-3xl" />
                <div>
                  <h3 className="font-headline-md text-lg text-on-surface mb-1">{c.positions[p].title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{c.positions[p].summary}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href="#apply" className="inline-flex items-center gap-1 mt-6 text-primary underline underline-offset-2 lg:hidden">
            {c.applyLink} <Icon name="arrow_downward" className="text-sm" />
          </a>
          <p className="mt-10 text-sm text-on-surface-variant leading-relaxed">{c.eeo}</p>
        </div>

        <div id="apply" className="scroll-mt-[calc(6rem+var(--promo-h))]">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{c.formTitle}</h2>
          <CareersForm t={t.careersForm} positionTitles={positionTitles} lang={params.lang} />
        </div>
      </section>
    </>
  );
}
