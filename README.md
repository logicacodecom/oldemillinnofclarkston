# Olde Mill Inn of Clarkston

Website for the **Olde Mill Inn of Clarkston** — a rustic lakefront log-cabin
motel at 5835 Dixie Hwy, Clarkston, MI.

**Status:** new project. Media organized; site build not started yet.

## Media assets

```
assets/
├─ brand/                logos
│  ├─ logo.avif
│  └─ logo.png
└─ gallery/
   ├─ web/   01–69.jpg    2048px, optimized — use these on the site (committed)
   └─ full/  01–69.jpg    3900px originals — NOT in git (see below)
```

69 property photos in listing order: street exterior → guest-room doors →
guest rooms → kitchenettes → baths → covered lakeside deck → waterfront/beach.

### Hi-res originals are not committed

`assets/gallery/full/` (~418 MB, 3900px) is git-ignored to keep the repo lean —
a website only needs the `web/` set. The originals live on the local machine
only, so **back them up separately**. Re-export web versions from them if needed.

## Next step

Pick a stack (static HTML, Astro, or Next.js) and scaffold the site.
