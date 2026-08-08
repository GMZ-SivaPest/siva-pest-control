import { SiteChrome } from "@/components/site/site-chrome";
import { BlogPage } from "@/components/pages/blog-page";

export const metadata = {
  title: "Insights — Pest Control Field Notes from South India",
  description:
    "Practical pest control guidance for South Indian homes and businesses: monsoon pressure, termite season, cockroach behaviour, FSSAI compliance and more.",
};

export default function Blog() {
  return (
    <SiteChrome>
      <BlogPage />
    </SiteChrome>
  );
}
