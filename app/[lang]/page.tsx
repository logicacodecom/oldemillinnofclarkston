import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import { RoomCard } from "@/components/RoomCard";
import { AvailabilityWidget } from "@/components/AvailabilityWidget";
import { property, addressLine, directionsUrl, northLocation } from "@/lib/property";
import { offWaterRooms, lakefrontRooms } from "@/lib/rooms";
import { featured } from "@/lib/gallery";
import { getDict, localePath, pageMetadata, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";

type Props = { params: { lang: Lang } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(params.lang, "/", {});
}

export default function HomePage({ params }: Props) {
  const { lang } = params;
  const t = getDict(lang);
  const h = t.home;
  const to = (path: string) => localePath(lang, path);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <Image
          src={featured.heroAerial}
          alt={h.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="relative z-10 text-center max-w-4xl px-margin-mobile text-surface-white pt-20">
          <p className="font-label-lg text-label-lg uppercase tracking-[0.2em] text-primary-fixed mb-4">
            {h.eyebrow}
          </p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 drop-shadow-lg">
            {h.heroTitle}
          </h1>
          <p className="font-body-lg text-body-lg mb-10 max-w-2xl mx-auto opacity-95 leading-relaxed">
            {h.heroText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTA href={to("/rooms")} size="lg">
              {t.common.viewRooms}
            </CTA>
            <CTA
              href={property.phone.href}
              variant="glass"
              size="lg"
              icon="call"
              analyticsEvent={EVENTS.phoneClick}
            >
              {t.common.callNumber}
            </CTA>
          </div>
        </div>
      </section>

      {/* Live availability & rates — overlaps the hero on desktop, sits below it on mobile */}
      <section
        id="availability"
        className="relative z-20 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-0 md:-mt-24 md:mb-16 scroll-mt-24"
      >
        <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-6 md:hidden">
          {h.availabilityTitle}
        </h2>
        <AvailabilityWidget lang={lang} t={t.availability} />
      </section>

      {/* Trust strip */}
      <section aria-label={h.glanceAria} className="bg-surface-white py-12 border-b border-outline-variant/20">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {h.trust.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-12 h-12 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Icon name={item.icon} />
              </div>
              <span className="font-label-lg text-on-surface">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          {h.introTitle}
        </h2>
        <div className="h-1 w-20 bg-sunset-accent mx-auto rounded-full mb-8" />
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          {h.introText}
        </p>
      </section>

      {/* Featured rooms */}
      <section className="pb-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <h2 className="font-headline-lg text-headline-lg text-primary">{h.lakefrontRooms}</h2>
          <CTA href={to("/rooms")} variant="ghost">
            {h.viewAllRooms}
          </CTA>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
          {lakefrontRooms.map((room) => (
            <RoomCard key={room.slug} room={room} lang={lang} />
          ))}
        </div>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">{h.offWaterRooms}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {offWaterRooms.map((room) => (
            <RoomCard key={room.slug} room={room} lang={lang} />
          ))}
        </div>
      </section>

      {/* Lakefront experience editorial */}
      <section className="py-section-gap bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={featured.lakefrontDeck}
                alt={h.waterAlt}
                width={2048}
                height={1363}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-8 -right-8 w-56 h-56 bg-sunset-accent rounded-2xl -z-0 opacity-20" />
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-sunset-accent font-label-lg uppercase tracking-[0.2em] mb-4 block">
              {h.waterEyebrow}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6 leading-tight">
              {h.waterTitle}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              {h.waterText}
            </p>
            <ul className="space-y-5 mb-8">
              {h.waterItems.map((item) => (
                <li key={item.icon} className="flex gap-4">
                  <Icon name={item.icon} className="text-primary" />
                  <div>
                    <h3 className="font-bold text-on-surface">{item.title}</h3>
                    <p className="text-on-surface-variant text-sm">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <CTA href={to("/lakefront-experience")} variant="outline">
              {h.exploreLakefront}
            </CTA>
          </div>
        </div>
      </section>

      {/* Pine Knob */}
      <section className="py-section-gap">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-primary rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between text-on-primary gap-10">
            <div className="lg:w-3/5">
              <h2 className="font-headline-lg text-[32px] md:text-[40px] leading-tight mb-6">
                {h.pineTitle}
              </h2>
              <p className="text-on-primary-container text-body-lg mb-8 max-w-lg leading-relaxed">
                {h.pineText}
              </p>
              <CTA
                href={to("/pine-knob")}
                className="bg-sunset-accent text-primary hover:bg-surface-white border-0"
                analyticsEvent={EVENTS.pineKnobCtaClick}
              >
                {h.pineCta}
              </CTA>
            </div>
            <div className="lg:w-2/5 flex justify-center">
              <div className="bg-surface-white/10 backdrop-blur-md p-8 rounded-2xl border border-on-primary/20 w-full text-center">
                <p className="font-display-lg text-[56px] leading-none mb-2">≈5</p>
                <p className="text-sm uppercase tracking-wider opacity-80 mb-6">{h.milesToPineKnob}</p>
                <p className="text-sm opacity-80">
                  {h.pineNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two locations */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-10">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{h.locationsTitle}</h2>
            <div className="h-1 w-20 bg-sunset-accent mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto">
            <div className="bg-surface-white rounded-2xl p-8 border-2 border-primary">
              <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 bg-primary text-on-primary">
                {h.youAreHere}
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">{h.southName}</h3>
              <p className="text-on-surface-variant mb-4">{addressLine}</p>
              <p className="text-on-surface-variant text-sm mb-6">{h.southText}</p>
              <CTA href={property.phone.href} variant="outline" icon="call" analyticsEvent={EVENTS.phoneClick}>
                {t.common.callNumber}
              </CTA>
            </div>
            <div className="bg-surface-white rounded-2xl p-8 border border-outline-variant/20">
              <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 bg-secondary-container text-on-secondary-container">
                {h.petFriendly}
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">{northLocation.short}</h3>
              <p className="text-on-surface-variant mb-4">{northLocation.address}</p>
              <p className="text-on-surface-variant text-sm mb-6">{h.northText}</p>
              <CTA href={h.northUrl} external variant="outline" icon="open_in_new" analyticsEvent={EVENTS.northSiteClick}>
                {h.visitNorth}
              </CTA>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby attractions */}
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-10">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{h.exploreTitle}</h2>
          <div className="h-1 w-20 bg-sunset-accent mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {t.attractions.slice(0, 6).map((a) => (
            <div key={a.name} className="bg-surface-white rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline-md text-lg text-on-surface">{a.name}</h3>
                {a.approxMiles ? (
                  <span className="text-sm text-on-surface-variant whitespace-nowrap">
                    {t.common.miles(a.approxMiles)}
                  </span>
                ) : null}
              </div>
              <p className="text-on-surface-variant text-sm">{a.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <CTA href={to("/things-to-do")} variant="outline">
            {h.seeThingsToDo}
          </CTA>
        </div>
      </section>

      {/* Independent property */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center max-w-3xl">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
            {h.independentTitle}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {h.independentText}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section-gap max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
          {h.finalTitle}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTA href={property.bookingUrl} external size="lg" analyticsEvent={EVENTS.bookingClick}>
            {t.common.checkAvailability}
          </CTA>
          <CTA href={property.phone.href} variant="outline" size="lg" icon="call" analyticsEvent={EVENTS.phoneClick}>
            {t.common.callInn}
          </CTA>
          <CTA href={directionsUrl} external variant="outline" size="lg" icon="explore" analyticsEvent={EVENTS.directionsClick}>
            {t.common.getDirections}
          </CTA>
        </div>
      </section>
    </>
  );
}
