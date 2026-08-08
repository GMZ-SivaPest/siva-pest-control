import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/site-chrome";
import { ContactPage } from "@/components/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact — Book Your Free Inspection",
  description:
    "Talk to Siva Pest Control. Free inspection, fixed-price quote, 30-min response across Hyderabad, Chennai and Bangalore.",
  alternates: {
    canonical: "https://www.sivapestcontrol.com/contact",
  },
};

export default function Contact() {
  return (
    <SiteChrome>
      <ContactPage />
    </SiteChrome>
  );
}
