import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { BlogPage } from "@/components/pages/blog-page";

export const metadata: Metadata = {
  title: "Insights — Pest Control Field Notes",
  description:
    "Practical pest control guidance for South Indian homes and businesses: monsoon pressure, termite season, cockroach behaviour, FSSAI compliance and more.",
  alternates: {
    canonical: `${company.siteUrl}/blog`,
  },
};

export default function Blog() {
  return (
    <SiteChrome>
      <BlogPage />
    </SiteChrome>
  );
}
