import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { PestLibraryPage } from "@/components/pages/pest-library-page";

export const metadata: Metadata = {
  title: "Pest Library",
  description:
    "A field guide to the pests we treat most often: cockroaches, termites, rodents, mosquitoes, bed bugs, ants, spiders, flies. Identification, behaviour, and Siva's treatment protocol.",
  alternates: {
    canonical: `${company.siteUrl}/pests`,
  },
};

export default function Pests() {
  return (
    <SiteChrome>
      <PestLibraryPage />
    </SiteChrome>
  );
}
