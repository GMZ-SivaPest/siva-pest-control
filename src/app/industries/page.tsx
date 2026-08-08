import { SiteChrome } from "@/components/site/site-chrome";
import { IndustriesPage } from "@/components/pages/industries-page";

export const metadata = {
  title: "Industries We Serve — FSSAI-Compliant Commercial IPM",
  description:
    "Restaurants, hotels, warehouses, healthcare, manufacturing, retail, schools, offices — FSSAI-compliant Integrated Pest Management with full documentation.",
};

export default function Industries() {
  return (
    <SiteChrome>
      <IndustriesPage />
    </SiteChrome>
  );
}
