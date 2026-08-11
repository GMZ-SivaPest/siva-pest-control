import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { AboutPage } from "@/components/pages/about-page";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2012 in Hyderabad. Siva Pest Control is a licensed, ISO 9001:2015 certified pest control company protecting homes and businesses across South India.",
  alternates: {
    canonical: `${company.siteUrl}/about`,
  },
};

export default function About() {
  return (
    <SiteChrome>
      <AboutPage />
    </SiteChrome>
  );
}
