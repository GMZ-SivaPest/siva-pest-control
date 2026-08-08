import { SiteChrome } from "@/components/site/site-chrome";
import { PestLibraryPage } from "@/components/pages/pest-library-page";

export const metadata = {
  title: "Pest Library — Identify, Understand, Eliminate",
  description:
    "A field guide to the pests we treat most often: cockroaches, termites, rodents, mosquitoes, bed bugs, ants, spiders, flies. Identification, behaviour, and Siva's treatment protocol.",
};

export default function Pests() {
  return (
    <SiteChrome>
      <PestLibraryPage />
    </SiteChrome>
  );
}
