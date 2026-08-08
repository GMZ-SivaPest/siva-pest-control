import { SiteChrome } from "@/components/site/site-chrome";
import { ServicesPage } from "@/components/pages/services-page";

export const metadata = {
  title: "Pest Control Services — Premium Protection, End to End",
  description:
    "Cockroach gel-bait, 5-year termite barriers, bed bug elimination, rodent control, mosquito misting, bird netting, and FSSAI-compliant commercial IPM across Hyderabad, Chennai and Bangalore.",
};

export default function Services() {
  return (
    <SiteChrome>
      <ServicesPage />
    </SiteChrome>
  );
}
