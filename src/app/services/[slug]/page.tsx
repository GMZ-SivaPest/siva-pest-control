import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/site-chrome";
import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { services, servicesBySlug } from "@/data/services";
import { notFound } from "next/navigation";

const BASE = "https://www.sivapestcontrol.com";

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

  // Build the JSON-LD blocks (also emitted via <script> tags in the JSX below)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.long,
    image: `${BASE}${service.image}`,
    url: `${BASE}/services/${service.slug}`,
    provider: {
      "@type": "PestControl",
      name: "Siva Pest Control",
      url: BASE,
    },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Chennai" },
      { "@type": "City", name: "Bangalore" },
    ],
    offers: {
      "@type": "Offer",
      price: service.startsFrom,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    warranty: service.warranty,
  };

  // BreadcrumbList schema — helps Google show breadcrumbs in search results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${BASE}/services/${service.slug}` },
    ],
  };

  // FAQPage schema (if the service has FAQs)
  const faqSchema =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return {
    title: `${service.name} — From ₹${service.startsFrom.toLocaleString("en-IN")}`,
    description: service.short,
    alternates: {
      canonical: `${BASE}/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} — From ₹${service.startsFrom.toLocaleString("en-IN")}`,
      description: service.short,
      url: `${BASE}/services/${slug}`,
      type: "website",
      images: [
        {
          url: service.image,
          width: 1024,
          height: 1024,
          alt: `${service.name} — treatment performed by Siva Pest Control technician`,
        },
      ],
    },
    // No `other` field — JSON-LD is emitted via <script> tags in the page body below.
  };
}

export default async function ServiceDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesBySlug(slug);
  if (!service) notFound();

  // Build the JSON-LD blocks to inject
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.long,
    image: `${BASE}${service.image}`,
    url: `${BASE}/services/${service.slug}`,
    provider: {
      "@type": "PestControl",
      name: "Siva Pest Control",
      url: BASE,
    },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Chennai" },
      { "@type": "City", name: "Bangalore" },
    ],
    offers: {
      "@type": "Offer",
      price: service.startsFrom,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    warranty: service.warranty,
  };

  // BreadcrumbList schema — helps Google show breadcrumbs in search results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${BASE}/services/${service.slug}` },
    ],
  };

  const faqSchema =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

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
