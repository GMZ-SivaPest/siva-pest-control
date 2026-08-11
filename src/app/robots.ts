import type { MetadataRoute } from "next";
import { company } from "@/data/company";

/**
 * robots.ts — dynamically generated robots.txt.
 *
 * Allows all major bots, disallows the API and Next.js internals so
 * crawl budget is spent on content pages, not boilerplate routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Bingbot", "Twitterbot", "facebookexternalhit", "Applebot"],
        allow: "/",
        disallow: ["/api", "/_next", "/_static"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/_next", "/_static"],
      },
    ],
    sitemap: `${company.siteUrl}/sitemap.xml`,
    host: company.siteUrl,
  };
}
