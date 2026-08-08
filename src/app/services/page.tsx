import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/site-chrome";
import { ServicesPage } from "@/components/pages/services-page";

export const metadata: Metadata = {
  title: "Pest Control Services",
  description:
    "Cockroach gel-bait, 5-year termite barriers, bed bug elimination, rodent control, mosquito misting, bird netting, and FSSAI-compliant commercial IPM across Hyderabad, Chennai and Bangalore.",
  alternates: {
    canonical: "https://www.sivapestcontrol.com/services",
  },
};

export default function Services() {
  return (
    <SiteChrome>
      <ServicesPage />
    </SiteChrome>
  );
}
