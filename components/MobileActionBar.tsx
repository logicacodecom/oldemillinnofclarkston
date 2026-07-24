import { property, directionsUrl } from "@/lib/property";
import { EVENTS } from "@/lib/analytics";
import { Icon } from "./Icon";

// Compact one-handed action bar, mobile only (§26). Fixed to the bottom, with
// safe-area padding. A body bottom-padding spacer in the layout keeps it from
// covering content.
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.08)] rounded-t-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex justify-around items-center px-4 py-2">
        <a
          className="flex flex-col items-center justify-center gap-0.5 text-on-surface-variant min-w-[64px] min-h-[48px] py-1 px-3 rounded-lg"
          href={property.phone.href}
          data-analytics-event={EVENTS.phoneClick}
        >
          <Icon name="call" />
          <span className="font-label-md text-label-md">Call</span>
        </a>
        <a
          className="flex flex-col items-center justify-center gap-0.5 text-on-surface-variant min-w-[64px] min-h-[48px] py-1 px-3 rounded-lg"
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event={EVENTS.directionsClick}
        >
          <Icon name="explore" />
          <span className="font-label-md text-label-md">Directions</span>
        </a>
        <a
          className="flex flex-col items-center justify-center gap-0.5 bg-primary text-on-primary rounded-full px-6 min-h-[48px] justify-center active:scale-95 transition-transform"
          href={property.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event={EVENTS.bookingClick}
        >
          <Icon name="calendar_month" />
          <span className="font-label-md text-label-md">Book Now</span>
        </a>
      </div>
    </nav>
  );
}
