import { SiteChrome } from "@/components/site/site-chrome";
import { ProcessPage } from "@/components/pages/process-page";

export const metadata = {
  title: "Our Process — From Inspection to 180-Day Warranty",
  description:
    "A documented 4-step process: free inspection, custom treatment plan, expert execution, and follow-up guarantee. Every visit logged, every warranty honoured.",
};

export default function Process() {
  return (
    <SiteChrome>
      <ProcessPage />
    </SiteChrome>
  );
}
