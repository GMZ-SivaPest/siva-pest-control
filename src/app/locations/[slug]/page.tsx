import { SiteChrome } from "@/components/site/site-chrome";
import { LocationDetailPage } from "@/components/pages/location-detail-page";
import { locations, locationBySlug } from "@/data/locations";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locationBySlug(slug);
  if (!loc) return { title: "Location not found" };
  return {
    title: `Pest Control in ${loc.city} — ${loc.technicians} Technicians, ${loc.responseTime}`,
    description: `${loc.city} pest control by Siva Pest Control. ${loc.coverage.length} coverage zones, ${loc.technicians} certified technicians, ${loc.responseTime} response time.`,
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
  return (
    <SiteChrome>
      <LocationDetailPage slug={slug} />
    </SiteChrome>
  );
}
