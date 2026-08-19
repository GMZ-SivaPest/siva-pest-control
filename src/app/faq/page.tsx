import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { FaqPage } from "@/components/pages/faq-page";
import { faqs } from "@/data/faqs";
import { generateFAQSchema } from "@/lib/seo";

const BASE = company.siteUrl;

export const metadata: Metadata = {
  title: "FAQ — Pest Control Questions",
  description:
    "Pricing, safety, warranty, treatment types, child/pet safety, preparation, frequency — straight answers to the questions we hear most.",
  alternates: {
    canonical: `${BASE}/faq`,
  },
};

const faqSchema = generateFAQSchema(faqs);

export default function Faq() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqPage />
    </SiteChrome>
  );
}
