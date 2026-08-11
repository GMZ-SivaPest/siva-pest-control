import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { LocationDetailPage } from "@/components/pages/location-detail-page";
import { locations, locationBySlug } from "@/data/locations";
import { notFound } from "next/navigation";

const BASE = company.siteUrl;

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = locationBySlug(slug);
  if (!loc) {
    return {
      title: "Location not found",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `Pest Control in ${loc.city} — ${loc.technicians} Technicians`,
    description: `${loc.city} pest control by Siva Pest Control. ${loc.coverage.length} coverage zones, ${loc.technicians} certified technicians, ${loc.responseTime} response time.`,
    alternates: {
      canonical: `${BASE}/locations/${slug}`,
    },
    openGraph: {
      title: `Pest Control in ${loc.city} — Siva Pest Control`,
      description: `${loc.coverage.length} coverage zones, ${loc.technicians} certified technicians, ${loc.responseTime} response time.`,
      url: `${BASE}/locations/${slug}`,
      type: "website",
    },
  };
}

export default async function LocationDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = locationBySlug(slug);
  if (!loc) notFound();

  // Per-location PestControl schema (separate from the global HQ schema)
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "PestControl",
    name: `Siva Pest Control — ${loc.city}`,
    parentOrganization: {
      "@type": "PestControl",
      name: "Siva Pest Control",
      url: BASE,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.line1,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.address.pincode,
      addressCountry: "IN",
    },
    telephone: loc.phone,
    areaServed: loc.coverage.map((zone) => ({
      "@type": "City",
      name: `${zone} — ${loc.city}`,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    priceRange: "₹₹",
    url: `${BASE}/locations/${slug}`,
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${BASE}/locations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: loc.city,
        item: `${BASE}/locations/${slug}`,
      },
    ],
  };

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LocationDetailPage slug={slug} />
    </SiteChrome>
  );
}
