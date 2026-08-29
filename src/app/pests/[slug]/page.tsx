import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/site/site-chrome";
import { PestDetailView } from "@/components/pages/pest-detail-view";
import { pestBySlug, pests } from "@/data/pests";
import { company } from "@/data/company";
import {
  generateBreadcrumbSchema,
  generatePestMetadata,
  generatePestSchema,
} from "@/lib/seo";

const BASE = company.siteUrl;

export async function generateStaticParams() {
  return pests.map((pest) => ({ slug: pest.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pest = pestBySlug(slug);

  if (!pest) {
    return {
      title: "Pest not found",
      robots: { index: false, follow: false },
    };
  }

  return generatePestMetadata(pest);
}

export default async function PestDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pest = pestBySlug(slug);
  if (!pest) notFound();

  const pestSchema = generatePestSchema(pest);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE },
    { name: "Pest Library", url: `${BASE}/pests` },
    { name: pest.name, url: `${BASE}/pests/${pest.slug}` },
  ]);

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pestSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PestDetailView slug={slug} />
    </SiteChrome>
  );
}
