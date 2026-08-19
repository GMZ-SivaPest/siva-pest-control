import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { LocationDetailPage } from "@/components/pages/location-detail-page";
import { locations, locationBySlug } from "@/data/locations";
import { notFound } from "next/navigation";
import { generateLocationMetadata, generateLocationSchema, generateBreadcrumbSchema } from "@/lib/seo";

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

  return generateLocationMetadata(loc);
}

export default async function LocationDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = locationBySlug(slug);
  if (!loc) notFound();

  const locationSchema = generateLocationSchema(loc);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE },
    { name: "Locations", url: `${BASE}/locations` },
    { name: loc.city, url: `${BASE}/locations/${slug}` },
  ]);

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
