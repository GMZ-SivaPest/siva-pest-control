import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { blogPosts } from "@/data/blog";

/**
 * sitemap.ts — single-page app route, but we expose all logical "pages"
 * as hash routes for crawler discovery. Since the live site uses client-side
 * view switching on `/`, all entries point to the home route with hash anchors
 * that the SPA can resolve on load (progressive enhancement).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.sivapestcontrol.com";
  const now = new Date();

  const staticViews = [
    "",
    "#about",
    "#services",
    "#locations",
    "#process",
    "#pests",
    "#industries",
    "#faq",
    "#contact",
    "#blog",
  ];

  const entries: MetadataRoute.Sitemap = staticViews.map((v) => ({
    url: `${base}/${v}`,
    lastModified: now,
    changeFrequency: v === "" ? "weekly" : "monthly",
    priority: v === "" ? 1 : 0.8,
  }));

  // Service detail pages
  services.forEach((s) => {
    entries.push({
      url: `${base}/#service-${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Location detail pages
  locations.forEach((l) => {
    entries.push({
      url: `${base}/#location-${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Blog posts
  blogPosts.forEach((b) => {
    entries.push({
      url: `${base}/#blog-${b.slug}`,
      lastModified: new Date(b.publishedOn),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return entries;
}
