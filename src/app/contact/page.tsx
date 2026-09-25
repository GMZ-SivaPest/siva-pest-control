import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { ContactPage } from "@/components/pages/contact-page";
import { faqs } from "@/data/faqs";
import { generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact — Book a Service",
  description:
    "Talk to Siva Pest Control. Fixed-price quote, 30-min response across Andhra Pradesh and Telangana. Call 77024 87195 or 98491 57510.",
  alternates: {
    canonical: `${company.siteUrl}/contact`,
  },
};

// FAQPage structured data — the contact page is now the site's FAQ home
// (standalone /faq page removed); must mirror the FAQ list rendered in
// contact-page.tsx.
const faqSchema = generateFAQSchema(faqs);

export default function Contact() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactPage />
    </SiteChrome>
  );
}
