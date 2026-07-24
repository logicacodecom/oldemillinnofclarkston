import Link from "next/link";
import { property, addressLine, directionsUrl } from "@/lib/property";
import { mainNav, legalNav } from "@/lib/nav";
import { EVENTS } from "@/lib/analytics";
import { Icon } from "./Icon";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-on-primary w-full py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max-width mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Icon name="water_drop" className="text-3xl text-secondary-fixed" />
            <span className="font-headline-lg text-headline-md text-secondary-fixed">
              Olde Mill Inn of Clarkston
            </span>
          </div>
          <p className="text-sm text-secondary-fixed-dim max-w-xs leading-relaxed">
            Independent, family-operated lakefront lodging on {property.lake} in Clarkston, Michigan.
          </p>
        </div>

        <div>
          <h2 className="font-label-lg text-label-lg text-secondary-fixed mb-6 uppercase tracking-widest">
            Explore
          </h2>
          <ul className="space-y-3">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-white transition-colors"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-label-lg text-label-lg text-secondary-fixed mb-6 uppercase tracking-widest">
            Contact
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
                Call {property.phone.display}
              </a>
            </p>
            <p>
              <a
                className="hover:text-surface-white transition-colors"
                href={property.text.href}
                data-analytics-event={EVENTS.textClick}
              >
                Text {property.text.display}
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
            Plan
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
                Book Now <Icon name="open_in_new" className="text-sm" />
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
                Get Directions <Icon name="explore" className="text-sm" />
              </a>
            </li>
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-white transition-colors"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto mt-12 pt-8 border-t border-on-primary-container/30 text-sm text-secondary-fixed-dim">
        © {year} {property.name}. {addressLine}.
      </div>
    </footer>
  );
}
