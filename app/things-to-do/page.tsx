import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { attractionsByCategory } from "@/lib/attractions";
import { featured } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Things to Do Near Clarkston, MI",
  description:
    "Concerts at Pine Knob, nearby skiing, shopping at Great Lakes Crossing and local dining in Clarkston — all a short drive from Olde Mill Inn.",
  alternates: { canonical: "/things-to-do" },
};

const sections = [
  { id: "concerts", title: "Concerts & Entertainment", icon: "music_note", items: attractionsByCategory.concerts },
  { id: "skiing", title: "Skiing & Winter Activities", icon: "downhill_skiing", items: attractionsByCategory.skiing },
  { id: "shopping", title: "Shopping", icon: "shopping_bag", items: attractionsByCategory.shopping },
  {
    id: "local",
    title: "Local Dining & Clarkston",
    icon: "restaurant",
    items: [...attractionsByCategory.local, ...attractionsByCategory.dining],
  },
];

function directionsTo(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export default function ThingsToDoPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore the area"
        title="Things to Do"
        subtitle="From concerts and skiing to shopping and local dining, Clarkston's best is a short drive from the inn. Distances are approximate."
        image={featured.streetExterior}
        imageAlt="Street view of Olde Mill Inn of Clarkston"
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
                      <span className="text-sm text-on-surface-variant whitespace-nowrap">≈{a.approxMiles} mi</span>
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
                    Directions <Icon name="explore" className="text-base" />
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
