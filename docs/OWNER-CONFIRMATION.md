# Owner-confirmation checklist

Updated after syncing to the property's Cloudbeds booking system (source of
truth). Resolved items are checked; open items still omit gracefully from the
public site until confirmed.

## Synced from Cloudbeds ✅
- [x] **Room occupancy** — Standard Full 2 · Deluxe Queen 2 · Premium Queen 2 ·
      Premium Two Full 4 · Honeymoon/Family Suite 4.
- [x] **Kitchenettes per room** — Deluxe Queen, Premium Queen, Premium Two Full
      have kitchenettes; the Suite has a **full kitchen**; Standard Full has none.
- [x] **Fireplaces** — wall-mounted **electric** fireplaces in Deluxe Queen,
      Premium Queen, Premium Two Full and the Suite (not Standard Full).
- [x] **Suite** — full kitchen + in-unit washer/dryer + large-screen TV, sleeps 4.
- [x] **Photo → room mapping** — each room now shows its real photos, mapped to
      the exact images Cloudbeds assigns (our local shoot).
- [x] Per-room amenities, descriptions, dual-burner stovetops, Serta mattresses,
      Smart TV/Roku — synced.

## Please confirm / flag
- [ ] **Public email changed.** Cloudbeds lists `oldmillinnofclarkston@gmail.com`
      (now used site-wide). The earlier brief said `OldMillInn@icloud.com`.
      Confirm which is the correct public contact.
- [ ] **Cloudbeds amenity list is polluted with template defaults.** Its 69-item
      list includes things that are almost certainly **not** true for this
      property and were **deliberately not published**: on-site Restaurant
      (incl. Halal/Kosher), Room service (24h), Valet, Fax/Printer/Photocopying,
      24-hour front desk/security, Pool towels, plus dated COVID-era items
      (face masks, temperature checks, sterilizing, physical distancing).
      Please confirm these are template noise so they stay off the site.
- [x] **Property name — confirmed by ownership: "The Olde Mill Inn of Clarkston
      South."** Now used for the brand name, footer and JSON-LD, and the badge
      logo is shown in the header/footer. Header wordmark reads "Olde Mill Inn /
      Clarkston South". Note: Cloudbeds lists it **without** "South" — worth
      aligning the Cloudbeds/Google Business name so they match. (This reverses
      the original brief §4, which had forbidden the "South" variant.)
- [ ] **Suite bed configuration** — not specified on Cloudbeds (omitted).

## Still open (not on the booking page)
- [ ] Current rates (no prices shown; CTA is "Check Availability")
- [ ] Room-specific Cloudbeds URLs (all rooms use the general clean URL)
- [ ] Exact number of rooms / room dimensions
- [ ] Cancellation policy specifics, deposit requirements, minimum check-in age
- [ ] Early check-in / late checkout / late-arrival procedures
- [ ] Full **Terms & Conditions** (not present in the booking page's static data)
- [ ] Kayak & pedal-boat safety rules; seasonal watercraft windows
- [ ] Whether the beach is private (Cloudbeds tags "Beach area (private)" — confirm)
- [ ] Verified, owner-approved guest reviews (reviews section stays hidden)
- [ ] Seasonal offers; continuous text-line availability

## Technical (wire before/after launch)
- [ ] `CONTACT_WEBHOOK_URL` — activates contact-form delivery (else it errors
      clearly and points to call/text; never silently drops).
- [ ] `NEXT_PUBLIC_GA_ID` — analytics (events already emitted).
- [ ] Old-URL redirects if replacing the current live site (`next.config.mjs`).
- [ ] Legal review of Privacy & Accessibility drafts.

## Notes (decisions on record — no action needed)
- **Room display names are intentionally shortened** vs. the longer Cloudbeds
  names; each still maps 1:1 to the same room. Kept as-is for readability.
  If booking-flow name consistency is ever preferred, align these:
  | Site | Cloudbeds |
  |---|---|
  | Standard Full | Standard Full with Access to lake & Kayaks |
  | Deluxe Queen | Deluxe Queen with Lake Access to lake & Kayaks |
  | Premium Queen | Premium Lakefront room with Queen bed |
  | Premium Lakefront Room with Two Full Beds | Premium Lakefront room with 2 Full Beds |
  | Honeymoon / Family Suite | Premium Lakefront Honeymoon/Family Suite |
