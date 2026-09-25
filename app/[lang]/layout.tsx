import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { siteUrl, property } from "@/lib/property";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Main } from "@/components/Main";
import { MobileActionBar } from "@/components/MobileActionBar";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { JsonLd, lodgingJsonLd } from "@/components/JsonLd";
import { langs, isLang, getDict, localePath, type Lang } from "@/lib/i18n";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Ornate script for the "Olde Mill Inn" wordmark, approximating the logo lettering.
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

// Only /en (served at the root) and /es exist; anything else 404s.
export const dynamicParams = false;
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  const t = getDict(params.lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.defaultTitle, template: t.meta.titleTemplate },
    description: t.meta.description,
    applicationName: property.name,
    alternates: {
      canonical: localePath(params.lang, "/"),
      languages: { en: "/", es: "/es", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: property.name,
      locale: t.ogLocale,
      url: `${siteUrl}${localePath(params.lang, "/")}`,
      title: t.meta.defaultTitle,
      description: t.meta.ogDescription,
      images: [{ url: "/images/gallery/50.jpg", width: 2048, height: 1528, alt: property.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Olde Mill Inn of Clarkston",
      description: t.meta.twitterDescription,
      images: ["/images/gallery/50.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#002046",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang;
  const t = getDict(lang);
  return (
    <html lang={t.htmlLang} className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} scroll-smooth`}>
      <head>
        {/* Material Symbols icon font (decorative icons; paired with text labels) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- icon font in root layout loads site-wide */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap"
        />
      </head>
      <body className="bg-background text-on-surface font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:rounded-lg"
        >
          {t.skip}
        </a>
        <Header lang={lang} nav={t.nav} bookNow={t.common.bookNow} callNumber={t.common.callNumber} toggle={t.toggle} />
        <Main>{children}</Main>
        <Footer lang={lang} />
        <MobileActionBar lang={lang} />
        <AnalyticsListener />
        <JsonLd data={lodgingJsonLd()} />
      </body>
    </html>
  );
}
