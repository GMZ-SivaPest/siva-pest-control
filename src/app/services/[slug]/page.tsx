import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { services, servicesBySlug } from "@/data/services";
import { notFound } from "next/navigation";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas, generateServiceMetadata } from "@/lib/seo";

const BASE = company.siteUrl;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesBySlug(slug);
  if (!service) {
    return {
      title: "Service not found",
      robots: { index: false, follow: false },
    };
  }

  return generateServiceMetadata(service);
}

export default async function ServiceDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesBySlug(slug);
  if (!service) notFound();

  // Build the JSON-LD blocks to inject using centralized SEO utilities
  const serviceSchema = generateServiceSchema(service);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE },
    { name: "Services", url: `${BASE}/services` },
    { name: service.name, url: `${BASE}/services/${service.slug}` },
  ]);
  const faqSchema = generateFAQSchema(service.faqs);
  const combinedSchemas = combineSchemas(serviceSchema, breadcrumbSchema, faqSchema);

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ServiceDetailPage slug={slug} />
    </SiteChrome>
  );
}
