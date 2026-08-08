import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/site-chrome";
import { FaqPage } from "@/components/pages/faq-page";
import { faqs } from "@/data/faqs";

const BASE = "https://www.sivapestcontrol.com";

export const metadata: Metadata = {
  title: "FAQ — Pest Control Questions",
  description:
    "Pricing, safety, warranty, treatment types, child/pet safety, preparation, frequency — straight answers to the questions we hear most.",
  alternates: {
    canonical: `${BASE}/faq`,
  },
};

// FAQPage schema for rich results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

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
