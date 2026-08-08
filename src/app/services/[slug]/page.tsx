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

  // Per-service Service schema (richer than the global OfferCatalog entry)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.long,
    image: `https://www.sivapestcontrol.com${service.image}`,
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
    other: {
      // JSON-LD emitted via <script> tag in the page body
      "service-schema": JSON.stringify(serviceSchema),
      ...(faqSchema ? { "faq-schema": JSON.stringify(faqSchema) } : {}),
    },
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
    image: `https://www.sivapestcontrol.com${service.image}`,
    url: `https://www.sivapestcontrol.com/services/${service.slug}`,
    provider: {
      "@type": "PestControl",
      name: "Siva Pest Control",
      url: "https://www.sivapestcontrol.com",
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
