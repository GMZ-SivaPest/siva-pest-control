import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/site-chrome";
import { HomePage } from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: undefined, // use default title from layout
  description:
    "Licensed pest control across Hyderabad, Chennai and Bangalore. Child-safe, 30-min response, 180-day warranty. ISO 9001 certified.",
  alternates: {
    canonical: "https://www.sivapestcontrol.com",
  },
  openGraph: {
    title: "Siva Pest Control — Licensed Protection for Homes & Businesses",
    description:
      "Science-led pest control across Hyderabad, Chennai and Bangalore. Fully guaranteed treatments with 30-min response and child-safe formulations.",
    url: "https://www.sivapestcontrol.com",
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
