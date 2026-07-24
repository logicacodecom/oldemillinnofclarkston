import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteUrl, property } from "@/lib/property";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Main } from "@/components/Main";
import { MobileActionBar } from "@/components/MobileActionBar";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { JsonLd, lodgingJsonLd } from "@/components/JsonLd";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lakefront Hotel in Clarkston, MI | Olde Mill Inn Near Pine Knob",
    template: "%s | Olde Mill Inn of Clarkston",
  },
  description:
    "Stay beside Van Norman Lake at Olde Mill Inn of Clarkston, approximately five miles from Pine Knob, with comfortable rooms, kayaks, pedal boats and direct booking.",
  applicationName: property.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: property.name,
    url: siteUrl,
    title: "Lakefront Hotel in Clarkston, MI | Olde Mill Inn Near Pine Knob",
    description:
      "Stay beside Van Norman Lake at Olde Mill Inn of Clarkston, approximately five miles from Pine Knob.",
    images: [{ url: "/images/gallery/50.jpg", width: 2048, height: 1528, alt: property.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olde Mill Inn of Clarkston",
    description: "A relaxed, affordable lakefront stay near Pine Knob.",
    images: ["/images/gallery/50.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#002046",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
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
          Skip to content
        </a>
        <Header />
        <Main>{children}</Main>
        <Footer />
        <MobileActionBar />
        <AnalyticsListener />
        <JsonLd data={lodgingJsonLd()} />
      </body>
    </html>
  );
}
