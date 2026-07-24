import Image from "next/image";

// Compact interior-page hero. With an image it renders full-bleed with an
// overlay and white text; without one it uses the solid primary surface.
export function PageHero({
  title,
  subtitle,
  eyebrow,
  image,
  imageAlt = "",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
}) {
  if (image) {
    return (
      <section className="relative min-h-[46vh] flex items-center justify-center overflow-hidden">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative z-10 text-center max-w-3xl px-margin-mobile py-16 text-surface-white">
          {eyebrow ? (
            <p className="font-label-lg text-label-lg uppercase tracking-[0.2em] text-primary-fixed mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg drop-shadow-lg">
            {title}
          </h1>
          {subtitle ? (
            <p className="font-body-lg text-body-lg mt-6 opacity-95 leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
      </section>
    );
  }
  return (
    <section className="bg-primary text-on-primary">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20 text-center">
        {eyebrow ? (
          <p className="font-label-lg text-label-lg uppercase tracking-[0.2em] text-primary-fixed-dim mb-4">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg">{title}</h1>
        {subtitle ? (
          <p className="font-body-lg text-body-lg mt-6 max-w-2xl mx-auto text-on-primary-container leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
