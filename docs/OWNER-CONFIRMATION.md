# Owner-confirmation checklist

The website ships without these values rather than inventing them. Each is
omitted gracefully from the public site until confirmed. Update the noted file,
then the content appears automatically.

## Branding
- [ ] **Logo says "SOUTH".** The supplied logo (`assets/brand/logo.png`) reads
      "Olde Mill Inn of Clarkston — SOUTH", which conflicts with the required
      public name "Olde Mill Inn of Clarkston" (no "South"). The site currently
      uses a typographic wordmark. Provide a logo without "South" (or confirm the
      correct mark) to feature the badge in the header/footer.

## Rooms (`lib/rooms.ts`)
- [ ] Exact occupancy / max guests per room type
- [ ] Exact number of rooms
- [ ] Room dimensions / square footage
- [ ] Which specific rooms have kitchenettes
- [ ] Any fireplaces (none currently claimed)
- [ ] Presidential / Honeymoon Suite bed configuration
- [ ] Full-kitchen availability (none currently claimed)
- [ ] Washer / dryer availability (none currently claimed)
- [ ] Current rates (no prices are shown; CTA is "Check Availability")
- [ ] Room-specific Cloudbeds URLs (all rooms currently use the general clean URL)
- [ ] **Photo → room mapping.** Room photos are currently *representative*
      interior shots (labeled as such). Confirm which gallery images belong to
      each room type so galleries can be made room-accurate.

## Amenities & policies
- [ ] Accessibility features of rooms/property (none claimed on-site)
- [ ] Wi-Fi quality (shown as "available", not "high-speed")
- [ ] Smoking policy (non-smoking options mentioned generally)
- [ ] Cancellation policy specifics
- [ ] Deposit requirements
- [ ] Minimum check-in age
- [ ] Early check-in rules
- [ ] Late checkout rules
- [ ] Late-arrival procedure
- [ ] Kayak & pedal-boat safety rules
- [ ] Seasonal watercraft availability windows
- [ ] Whether the beach is private
- [ ] Exact connected-lake access description

## Contact & reviews
- [ ] Professional domain email (currently `OldMillInn@icloud.com` via
      `NEXT_PUBLIC_PROPERTY_EMAIL`)
- [ ] Verified, owner-approved guest reviews (the reviews section is hidden until
      supplied — no reviews are fabricated)
- [ ] Seasonal offers (no Offers page is active)
- [ ] Continuous text-line availability (no guaranteed response time is promised)

## Distances
Pine Knob (≈5 mi), Pine Knob Ski (≈5 mi), Alpine Valley (≈8 mi), Mt. Holly
(≈12 mi) are shown as **approximate**. Confirm if you want exact figures.

## Technical items to wire before/after launch
- [ ] **Contact backend** — set `CONTACT_WEBHOOK_URL` so the contact form
      delivers messages. Until set, the form returns a clear error and directs
      guests to call/text (it never silently drops a submission). See
      `app/api/contact/route.ts`.
- [ ] **Analytics** — set `NEXT_PUBLIC_GA_ID` (or wire `window.dataLayer`).
      Events are already emitted: booking_click, availability_search,
      phone_click, text_click, directions_click, room_view, pine_knob_cta_click,
      contact_form_submit, email_click. No analytics ID is hardcoded.
- [ ] **Email capture** — no newsletter signup is shipped (no destination
      configured). Add one only when there is a real list to collect into.
- [ ] **Availability widget** — the site links to the secure Cloudbeds booking
      system rather than simulating live availability/date search. If a real
      embeddable availability integration is provided, it can replace the CTA.
- [ ] **Redirects** — if replacing the current live site, map old URLs to the new
      routes (add to `next.config.mjs`).
- [ ] **Legal review** — Privacy and Accessibility statements are drafts to be
      reviewed/approved before launch.
