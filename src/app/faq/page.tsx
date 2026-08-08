import { SiteChrome } from "@/components/site/site-chrome";
import { FaqPage } from "@/components/pages/faq-page";

export const metadata = {
  title: "FAQ — Answers to Common Pest Control Questions",
  description:
    "Pricing, safety, warranty, treatment types, child/pet safety, preparation, frequency — straight answers to the questions we hear most.",
};

export default function Faq() {
  return (
    <SiteChrome>
      <FaqPage />
    </SiteChrome>
  );
}
