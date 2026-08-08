import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { blogPosts } from "@/data/blog";
import { brand } from "@/data/brand";

/**
 * sitemap.ts — Multi-page App Router sitemap.
 *
 * `lastModified` uses fixed content dates (not `new Date()`) so Google
 * doesn't think every page changed today — that would re-crawl the entire
 * site on every visit and waste crawl budget.
 *
 * Source of truth:
 *  - Static routes → brand.contentLastUpdated (audit P2)
 *  - Blog posts → post.publishedOn (already ISO dates in blog.ts)
 *  - Service & location routes → brand.contentLastUpdated
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.sivapestcontrol.com";
  const contentLastUpdated = new Date(brand.contentLastUpdated);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: contentLastUpdated, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: contentLastUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/locations`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pests`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/industries`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: contentLastUpdated, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: contentLastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: contentLastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.updatedOn ?? b.publishedOn),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
