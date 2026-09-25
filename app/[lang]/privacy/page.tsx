import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { property } from "@/lib/property";
import { getDict, pageMetadata, type Lang } from "@/lib/i18n";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/privacy", getDict(params.lang).meta.privacy);
}

export default function PrivacyPage({ params }: Props) {
  const p = getDict(params.lang).privacy;
  return (
    <>
      <PageHero title={p.title} />
      <section className="py-section-gap max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-on-surface-variant leading-relaxed space-y-6">
        <p className="text-sm">{p.note}</p>

        {p.blocks.map((b) => (
          <div key={b.h} className="space-y-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">{b.h}</h2>
            {b.ps.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        ))}

        <h2 className="font-headline-md text-headline-md text-on-surface">{p.contactTitle}</h2>
        <p>
          {p.contactPrefix}{" "}
          <a className="text-primary underline underline-offset-2 break-all" href={`mailto:${property.email}`}>
            {property.email}
          </a>{" "}
          {p.or} {property.phone.display}.
        </p>
      </section>
    </>
  );
}
