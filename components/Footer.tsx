import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "./SocialLinks";
import { property, addressLine, directionsUrl } from "@/lib/property";
import { getDict, localePath, type Lang } from "@/lib/i18n";
import { EVENTS } from "@/lib/analytics";
import { Icon } from "./Icon";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-on-primary w-full py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max-width mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Image src="/images/logo.png" alt="" width={292} height={350} className="h-14 w-auto" />
            <span className="font-script text-[32px] text-secondary-fixed leading-tight text-center">
              <span className="align-super text-[0.3em] font-label-lg not-italic uppercase tracking-[0.15em] mr-0.5">
                The
              </span>
              Olde Mill Inn
              <span className="block text-[11px] uppercase tracking-[0.18em] font-label-lg text-secondary-fixed-dim mt-1">
                of Clarkston South
              </span>
            </span>
          </div>
          <p className="text-sm text-secondary-fixed-dim max-w-xs leading-relaxed">
            {t.footer.tagline}
          </p>
          <SocialLinks className="mt-6" ariaLabel={t.social.aria} />
        </div>

        <div>
          <h2 className="font-label-lg text-label-lg text-secondary-fixed mb-6 uppercase tracking-widest">
            {t.footer.explore}
          </h2>
          <ul className="space-y-3">
            {t.nav.main.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-white transition-colors"
                  href={localePath(lang, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-label-lg text-label-lg text-secondary-fixed mb-6 uppercase tracking-widest">
            {t.footer.contact}
          </h2>
          <address className="not-italic space-y-3 text-secondary-fixed-dim">
            <p>
              {property.address.street}
              <br />
              {property.address.city}, {property.address.state} {property.address.postalCode}
            </p>
            <p>
              <a
                className="hover:text-surface-white transition-colors"
                href={property.phone.href}
                data-analytics-event={EVENTS.phoneClick}
              >
                {t.common.callNumber}
              </a>
            </p>
            <p>
              <a
                className="hover:text-surface-white transition-colors"
                href={property.text.href}
                data-analytics-event={EVENTS.textClick}
              >
                {t.common.textNumber}
              </a>
            </p>
            <p>
              <a
                className="hover:text-surface-white transition-colors break-all"
                href={`mailto:${property.email}`}
                data-analytics-event={EVENTS.emailClick}
              >
                {property.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="font-label-lg text-label-lg text-secondary-fixed mb-6 uppercase tracking-widest">
            {t.footer.plan}
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                className="inline-flex items-center gap-1 text-secondary-fixed-dim hover:text-surface-white transition-colors"
                href={property.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event={EVENTS.bookingClick}
              >
                {t.common.bookNow} <Icon name="open_in_new" className="text-sm" />
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-1 text-secondary-fixed-dim hover:text-surface-white transition-colors"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event={EVENTS.directionsClick}
              >
                {t.common.getDirections} <Icon name="explore" className="text-sm" />
              </a>
            </li>
            {t.nav.legal.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-white transition-colors"
                  href={localePath(lang, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto mt-12 pt-8 border-t border-on-primary-container/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-secondary-fixed-dim">
        <p>© {year} {property.name}. {addressLine}.</p>
        <p>
          {t.footer.credit}{" "}
          <a
            href="https://www.logicacode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-fixed hover:text-surface-white underline underline-offset-2 transition-colors"
          >
            logicacode
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
