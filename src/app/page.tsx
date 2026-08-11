import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { HomePage } from "@/components/pages/home-page";

export const metadata: Metadata = {
  // Title intentionally omitted — Next.js will fall back to the `default`
  // title set in src/app/layout.tsx, which is what we want on the homepage.
  // Setting `title: undefined` previously caused Lighthouse to flag the
  // page as "missing <title>" because Next 16 reads it as "explicitly
  // empty" rather than "inherit from layout".
  description:
    "Licensed pest control across Hyderabad, Chennai and Bangalore. Child-safe, 30-min response, 180-day warranty. ISO 9001 certified.",
  alternates: {
    canonical: company.siteUrl,
  },
  openGraph: {
    title: "Siva Pest Control — Licensed Protection for Homes & Businesses",
    description:
      "Science-led pest control across Hyderabad, Chennai and Bangalore. Fully guaranteed treatments with 30-min response and child-safe formulations.",
    url: company.siteUrl,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Siva Pest Control — Protection. Science. Trust.",
      },
    ],
  },
};

export default function Home() {
  return (
    <SiteChrome>
      <HomePage />
    </SiteChrome>
  );
}
