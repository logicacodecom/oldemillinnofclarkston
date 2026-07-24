// Analytics hooks (§30). Events are attached declaratively via
// `data-analytics-event` attributes and dispatched by <AnalyticsListener>.
// No analytics provider ID is hardcoded; wire one with NEXT_PUBLIC_GA_ID.

export const EVENTS = {
  bookingClick: "booking_click",
  availabilitySearch: "availability_search",
  phoneClick: "phone_click",
  textClick: "text_click",
  directionsClick: "directions_click",
  roomView: "room_view",
  pineKnobCtaClick: "pine_knob_cta_click",
  contactFormSubmit: "contact_form_submit",
  emailClick: "email_click",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

// Client-side dispatch. Safe no-op until an analytics layer is present.
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
  w.gtag?.("event", event, params);
}
