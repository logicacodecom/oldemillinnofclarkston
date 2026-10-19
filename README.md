# Olde Mill Inn of Clarkston

Website for the **Olde Mill Inn of Clarkston** — an independent, family-operated
lakefront motel on Van Norman Lake at 5835 Dixie Hwy, Clarkston, MI, about five
miles from Pine Knob.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, using the
approved **"Lakeside Heritage"** design system (Stitch/Neo export in
[design/stitch/](design/stitch/)) as the authoritative visual language.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Structure

```
app/                     App Router routes (home, rooms, rooms/[slug], lakefront-
                         experience, pine-knob, things-to-do, gallery,
                         plan-your-stay, contact, careers, privacy, accessibility,
                         api/contact, api/careers, sitemap.ts, robots.ts)
components/              Neo-matching UI (Header, Footer, MobileActionBar, CTA,
                         RoomCard, PageHero, GalleryGrid, ContactForm, …)
lib/                     Centralized data: property config, rooms, attractions,
                         faqs, gallery, nav, analytics
tailwind.config.ts       Ported Lakeside Heritage tokens (colors/fonts/spacing)
public/images/gallery/   69 web-optimized property photos (01–69.jpg)
public/images/           logo.avif / logo.png
design/stitch/           Approved design reference (screens + design system)
assets/                  Source masters (brand/, gallery/full — git-ignored)
docs/OWNER-CONFIRMATION.md  Outstanding facts to confirm before launch
```

## Configuration

All repeated business data lives in [lib/property.ts](lib/property.ts) — name,
address, phone, text, email, Cloudbeds booking URL, coordinates, check-in/out,
pet policy. Do not duplicate these in components.

Environment variables (all optional; the site builds and runs without them):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PROPERTY_EMAIL` | Override the public email (defaults to the iCloud fallback) |
| `CONTACT_WEBHOOK_URL` | Destination for contact-form submissions (until set, the form errors clearly instead of dropping messages) |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | Send contact-form and job-application emails through Gmail (a Google app password, not the account password; see `lib/mail.ts`). Preferred over the webhook |
| `CONTACT_TO` | Override the recipient of contact-form messages (default: ClarkstonHotel@gmail.com, `property.inquiryEmail`) |
| `CAREERS_TO` | Override the recipient of job applications (default ClarkstonHotel@gmail.com, in `lib/careers.ts`) |
| `NEXT_PUBLIC_GA_ID` | Analytics; events are already emitted via `lib/analytics.ts` |

See [docs/OWNER-CONFIRMATION.md](docs/OWNER-CONFIRMATION.md) for content and
technical items awaiting owner confirmation.

## Media assets

- `public/images/gallery/01–69.jpg` — 2048px web photos served by the site.
- `assets/gallery/full/` — 3900px originals, **git-ignored** (~418 MB, local
  only). Back these up separately; re-export web versions from them if needed.
