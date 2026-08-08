import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { blogPosts } from "@/data/blog";

/**
 * sitemap.ts — Multi-page App Router sitemap.
 * Each route is a real URL now (no more hash routing).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.sivapestcontrol.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pests`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.publishedOn),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
