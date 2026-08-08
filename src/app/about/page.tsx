import { SiteChrome } from "@/components/site/site-chrome";
import { AboutPage } from "@/components/pages/about-page";

export const metadata = {
  title: "About Us — Field-tested. Locally trusted.",
  description:
    "Founded in 2012 in Hyderabad. Siva Pest Control is a licensed, ISO 9001:2015 certified pest control company protecting homes and businesses across South India.",
};

export default function About() {
  return (
    <SiteChrome>
      <AboutPage />
    </SiteChrome>
  );
}
