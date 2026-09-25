import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { property } from "@/lib/property";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/accessibility", getDict(params.lang).meta.accessibility);
}

export default function AccessibilityPage({ params }: Props) {
  const a = getDict(params.lang).accessibility;
  return (
    <>
      <PageHero title={a.title} />
      <section className="py-section-gap max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-on-surface-variant leading-relaxed space-y-6">
        <p>{a.intro}</p>

        <h2 className="font-headline-md text-headline-md text-on-surface">{a.doneTitle}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {a.done.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="font-headline-md text-headline-md text-on-surface">{a.propertyTitle}</h2>
        <p>{a.propertyText}</p>

        <h2 className="font-headline-md text-headline-md text-on-surface">{a.tellTitle}</h2>
        <p>
          {a.tellPrefix}{" "}
          <a className="text-primary underline underline-offset-2 break-all" href={`mailto:${property.email}`}>
            {property.email}
          </a>{" "}
          {a.or} {property.phone.display} {a.tellSuffix}
        </p>
      </section>
    </>
  );
}
