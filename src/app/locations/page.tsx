import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { LocationsPage } from "@/components/pages/locations-page";

export const metadata: Metadata = {
  title: "Locations — Hyderabad, Chennai, Bangalore",
  description:
    "Locally based pest control teams in Hyderabad, Chennai and Bangalore. 30-min response, certified technicians, in-city coverage.",
  alternates: {
    canonical: `${company.siteUrl}/locations`,
  },
};

export default function Locations() {
  return (
    <SiteChrome>
      <LocationsPage />
    </SiteChrome>
  );
}
