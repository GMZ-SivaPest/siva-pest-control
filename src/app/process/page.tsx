import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { ProcessPage } from "@/components/pages/process-page";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "A documented 5-step process: free inspection, custom treatment plan, expert execution, follow-up guarantee, and warranty support. Every visit logged, every warranty honoured.",
  alternates: {
    canonical: `${company.siteUrl}/process`,
  },
};

export default function Process() {
  return (
    <SiteChrome>
      <ProcessPage />
    </SiteChrome>
  );
}
