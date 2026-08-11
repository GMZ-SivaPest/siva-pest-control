import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics, AnalyticsScript } from "@/components/site/analytics";
import { GtmScript, GtmNoScript } from "@/components/site/gtm";
import { CookieConsent } from "@/components/site/cookie-consent";
import { LegalModal } from "@/components/site/legal-modal";
import { company } from "@/data/company";
import { brand } from "@/data/brand";
import { locations } from "@/data/locations";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Siva Pest Control — Licensed Protection for Homes & Businesses",
    template: "%s · Siva Pest Control",
  },
  description:
    "Licensed pest control services across Hyderabad, Chennai and Bangalore. Science-led, locally trusted, fully guaranteed. Residential and commercial protection with 30-min response and child-safe treatments.",
  // Note: keywords meta tag intentionally omitted — Google has ignored it
  // since 2009 and it adds page weight for zero SEO benefit.
  authors: [{ name: "Siva Pest Control" }],
  creator: "Siva Pest Control",
  publisher: "Siva Pest Control",
  applicationName: "Siva Pest Control",
  category: "Home Services",
  // NOTE: per-page canonical URLs are set in each route's metadata.
  // The homepage canonical lives in src/app/page.tsx.
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Siva Pest Control — Licensed Protection for Homes & Businesses",
    description:
      "Science-led pest control across Hyderabad, Chennai and Bangalore. Fully guaranteed treatments with 30-min response and child-safe formulations.",
    url: company.siteUrl,
    siteName: "Siva Pest Control",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Siva Pest Control — Protection. Science. Trust.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sivapestcontrol",
    creator: "@sivapestcontrol",
    title: "Siva Pest Control — Licensed Protection",
    description:
      "Science-led pest control across Hyderabad, Chennai and Bangalore.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Structured data: LocalBusiness schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PestControl",
  "@id": `${company.siteUrl}/#business`,
  name: brand.legalName,
  alternateName: brand.name,
  description: brand.description,
  url: company.siteUrl,
  telephone: company.phonePrimaryHref,
  email: company.email,
  image: `${company.siteUrl}/og-image.jpg`,
  logo: `${company.siteUrl}/logo.png`,
  foundingDate: String(brand.foundedYear),
  knowsAbout: [
    "Termite Control",
    "Cockroach Gel Treatment",
    "Bed Bugs Elimination",
    "Rodent Control",
    "Mosquito Control",
    "Bird Management",
    "Commercial IPM",
  ],
  areaServed: locations.map((l) => ({
    "@type": "City",
    name: l.city,
    state: l.state,
  })),
  address: locations.map((l) => ({
    "@type": "PostalAddress",
    streetAddress: l.address.line1,
    addressLocality: l.city,
    addressRegion: l.state,
    postalCode: l.address.pincode,
    addressCountry: "IN",
  })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "20:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(company.stats.googleRating),
    reviewCount: String(company.stats.googleReviews),
    bestRating: "5",
    worstRating: "1",
  },
  // Let Google know which sub-organizations exist (one per city).
  // Each location page also emits its own PestControl schema.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pest Control Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Termite Control" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cockroach Gel Treatment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bed Bugs Treatment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rodent Control" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mosquito Control" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bird Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial IPM" } },
    ],
  },
  sameAs: [
    company.socials.instagram,
    company.socials.facebook,
    company.socials.linkedin,
    company.socials.youtube,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GA4 — server-rendered script for optimal load timing */}
        <AnalyticsScript />
        {/* Google Tag Manager — dataLayer + consent bootstrap + container */}
        <GtmScript />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased bg-background text-foreground`}
      >
        {/* GTM <noscript> fallback for no-JS visitors */}
        <GtmNoScript />

        {/* Skip-to-content link for keyboard & screen-reader users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-orange focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-glow-orange"
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Respect prefers-reduced-motion globally */}
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>

        {/* Analytics (client route tracker) */}
        <Analytics />

        {/* Privacy-first cookie consent banner */}
        <CookieConsent />

        {/* Legal documents modal (Privacy / Cookie / Terms) — opened via the
            `open-legal-modal` window event from footer links & the DPDP
            consent checkbox on the contact form */}
        <LegalModal />

        <Toaster />
      </body>
    </html>
  );
}
