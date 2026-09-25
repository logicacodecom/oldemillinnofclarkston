import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { featured } from "@/lib/gallery";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/things-to-do", getDict(params.lang).meta.thingsToDo);
}

function directionsTo(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export default function ThingsToDoPage({ params }: Props) {
  const t = getDict(params.lang);
  const td = t.thingsToDo;
  const inCategory = (...cats: string[]) => t.attractions.filter((a) => cats.includes(a.category));
  const sections = [
    { id: "concerts", title: td.sections.concerts, icon: "music_note", items: inCategory("concerts") },
    { id: "skiing", title: td.sections.skiing, icon: "downhill_skiing", items: inCategory("skiing") },
    { id: "shopping", title: td.sections.shopping, icon: "shopping_bag", items: inCategory("shopping") },
    { id: "local", title: td.sections.local, icon: "restaurant", items: inCategory("local", "dining") },
  ];

  return (
    <>
      <PageHero
        eyebrow={td.eyebrow}
        title={td.title}
        subtitle={td.subtitle}
        image={featured.streetExterior}
        imageAlt={td.heroAlt}
      />

      <div className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
        {sections.map((section) => (
          <section key={section.id}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Icon name={section.icon} />
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary">{section.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {section.items.map((a) => (
                <div key={a.name} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10 flex flex-col">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="font-headline-md text-lg text-on-surface">{a.name}</h3>
                    {a.approxMiles ? (
                      <span className="text-sm text-on-surface-variant whitespace-nowrap">{t.common.miles(a.approxMiles)}</span>
                    ) : null}
                  </div>
                  <p className="text-on-surface-variant text-sm mb-4 flex-1">{a.description}</p>
                  {a.address ? <p className="text-xs text-on-surface-variant mb-4">{a.address}</p> : null}
                  {a.note ? <p className="text-xs text-on-surface-variant/80 italic mb-4">{a.note}</p> : null}
                  <a
                    href={directionsTo(a.address ?? `${a.name}, Clarkston, MI`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-label-lg text-label-lg hover:underline underline-offset-4 mt-auto"
                  >
                    {t.common.directions} <Icon name="explore" className="text-base" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
