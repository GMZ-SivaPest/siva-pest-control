import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { IndustriesPage } from "@/components/pages/industries-page";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Restaurants, hotels, warehouses, healthcare, manufacturing, retail, schools, offices — FSSAI-compliant Integrated Pest Management with full documentation.",
  alternates: {
    canonical: `${company.siteUrl}/industries`,
  },
};

export default function Industries() {
  return (
    <SiteChrome>
      <IndustriesPage />
    </SiteChrome>
  );
}
