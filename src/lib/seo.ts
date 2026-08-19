/**
 * seo.ts — Centralized SEO utilities and structured data generators.
 * Single source of truth for all JSON-LD schemas and metadata helpers.
 */

import { company } from "@/data/company";
import { brand } from "@/data/brand";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { pests } from "@/data/pests";
import { blogPosts } from "@/data/blog";

const BASE = company.siteUrl;

/**
 * Generate Organization / PestControl schema for the main business
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PestControl",
    "@id": `${BASE}/#business`,
    name: brand.legalName,
    alternateName: brand.name,
    description: brand.description,
    url: BASE,
    telephone: company.phonePrimaryHref,
    email: company.email,
    image: `${BASE}/og-image.jpg`,
    logo: `${BASE}/logo.png`,
    foundingDate: String(brand.foundedYear),
    knowsAbout: [
      "Termite Control",
      "Cockroach Gel Treatment",
      "Bed Bugs Elimination",
      "Rodent Control",
      "Mosquito Control",
      "Bird Management",
      "Commercial IPM",
      "Integrated Pest Management",
      "Fumigation Services",
      "Pre-Construction Termite Treatment",
      "Post-Construction Termite Treatment",
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pest Control Services",
      itemListElement: services.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.short,
          url: `${BASE}/services/${s.slug}`,
        },
      })),
    },
    sameAs: [
      company.socials.instagram,
      company.socials.facebook,
      company.socials.linkedin,
      company.socials.youtube,
    ],
    founder: {
      "@type": "Person",
      name: company.founder,
      jobTitle: "Founder & Chief Entomologist",
      credential: company.founderCredential,
    },
    numberOfEmployees: company.stats.technicians,
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, UPI, Bank Transfer",
    priceRange: "₹₹",
  };
}

/**
 * Generate Service schema for individual service pages
 */
export function generateServiceSchema(service: typeof services[0]) {
  return {
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
    areaServed: locations.map((l) => ({
      "@type": "City",
      name: l.city,
    })),
    warranty: service.warranty,
    serviceType: service.category,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${BASE}/contact`,
      servicePhone: company.phonePrimaryHref,
      availableLanguage: "English",
    },
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate LocalBusiness schema for location pages
 */
export function generateLocationSchema(loc: typeof locations[0]) {
  return {
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
    url: `${BASE}/locations/${loc.slug}`,
    image: `${BASE}/images/locations/${loc.slug}.jpg`,
  };
}

/**
 * Generate Pest schema for pest library pages
 */
export function generatePestSchema(pest: typeof pests[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: pest.name,
    alternateName: pest.scientificName,
    description: pest.description,
    image: `${BASE}${pest.image}`,
    url: `${BASE}/pests/${pest.slug}`,
    category: pest.category,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Threat Level", value: pest.threat },
      { "@type": "PropertyValue", name: "Seasonality", value: pest.seasonality },
      { "@type": "PropertyValue", name: "Health Risk", value: pest.healthRisk },
    ],
    subjectOf: {
      "@type": "Service",
      name: "Professional Treatment",
      url: `${BASE}/services/${pest.serviceSlug}`,
    },
  };
}

/**
 * Generate BlogPosting schema for blog articles
 */
export function generateBlogSchema(post: typeof blogPosts[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${BASE}${post.image}`,
    url: `${BASE}/blog/${post.slug}`,
    datePublished: post.publishedOn,
    dateModified: post.updatedOn ?? post.publishedOn,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Pest Control Specialist",
    },
    publisher: {
      "@type": "Organization",
      name: "Siva Pest Control",
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    articleSection: "Pest Control",
  };
}

/**
 * Generate WebSite schema with SearchAction for sitelinks searchbox
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: BASE,
    name: "Siva Pest Control",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Combine multiple schemas into a single array for rendering
 */
export function combineSchemas(...schemas: (object | null)[]) {
  return schemas.filter(Boolean);
}

/**
 * Generate metadata for service pages with enhanced SEO
 */
export function generateServiceMetadata(service: typeof services[0]) {
  const breadcrumbs = [
    { name: "Home", url: BASE },
    { name: "Services", url: `${BASE}/services` },
    { name: service.name, url: `${BASE}/services/${service.slug}` },
  ];

  return {
    title: service.name,
    description: service.short,
    alternates: { canonical: `${BASE}/services/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.short,
      url: `${BASE}/services/${service.slug}`,
      type: "website",
      images: [
        {
          url: `${BASE}${service.image}`,
          width: 1024,
          height: 1024,
          alt: `${service.name} — treatment performed by Siva Pest Control technician`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.name,
      description: service.short,
      images: [`${BASE}${service.image}`],
    },
    robots: { index: true, follow: true },
    other: {
      "schema:serviceType": service.category,
      "schema:warranty": service.warranty,
    },
  };
}

/**
 * Generate metadata for location pages
 */
export function generateLocationMetadata(loc: typeof locations[0]) {
  return {
    title: `Pest Control in ${loc.city} — ${loc.technicians} Technicians`,
    description: `${loc.city} pest control by Siva Pest Control. ${loc.coverage.length} coverage zones, ${loc.technicians} certified technicians, ${loc.responseTime} response time.`,
    alternates: { canonical: `${BASE}/locations/${loc.slug}` },
    openGraph: {
      title: `Pest Control in ${loc.city} — Siva Pest Control`,
      description: `${loc.coverage.length} coverage zones, ${loc.technicians} certified technicians, ${loc.responseTime} response time.`,
      url: `${BASE}/locations/${loc.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Pest Control in ${loc.city}`,
      description: `${loc.coverage.length} coverage zones, ${loc.technicians} certified technicians.`,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Generate metadata for pest library pages
 */
export function generatePestMetadata(pest: typeof pests[0]) {
  return {
    title: `${pest.name} Control & Treatment — Siva Pest Control`,
    description: `Identify ${pest.name.toLowerCase()} signs, health risks, and prevention. Professional ${pest.name.toLowerCase()} treatment with 180-day warranty.`,
    alternates: { canonical: `${BASE}/pests/${pest.slug}` },
    openGraph: {
      title: `${pest.name} — Identification & Treatment`,
      description: pest.description.slice(0, 160),
      url: `${BASE}/pests/${pest.slug}`,
      type: "website",
      images: [
        {
          url: `${BASE}${pest.image}`,
          width: 1024,
          height: 1024,
          alt: `${pest.name} — identification guide`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pest.name} Control`,
      description: pest.description.slice(0, 160),
      images: [`${BASE}${pest.image}`],
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Generate metadata for blog pages
 */
export function generateBlogMetadata(post: typeof blogPosts[0]) {
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${BASE}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedOn,
      modifiedTime: post.updatedOn ?? post.publishedOn,
      authors: [post.author],
      images: [
        {
          url: `${BASE}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${BASE}${post.image}`],
    },
    robots: { index: true, follow: true },
    other: {
      "article:published_time": post.publishedOn,
      "article:modified_time": post.updatedOn ?? post.publishedOn,
      "article:author": post.author,
      "article:section": "Pest Control",
      "article:tag": post.keywords.join(","),
    },
  };
}