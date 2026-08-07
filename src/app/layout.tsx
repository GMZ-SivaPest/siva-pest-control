import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sivapestcontrol.com"),
  title: {
    default: "Siva Pest Control — Premium Protection for Homes & Businesses",
    template: "%s · Siva Pest Control",
  },
  description:
    "Premium pest control services across Hyderabad, Chennai and Bangalore. Science-led, locally trusted, fully guaranteed. Residential and commercial protection with fast response and child-safe treatments.",
  keywords: [
    "pest control Hyderabad",
    "pest control Chennai",
    "pest control Bangalore",
    "termite control",
    "cockroach treatment",
    "bed bugs treatment",
    "rodent control",
    "mosquito control",
    "commercial pest control",
    "Siva Pest Control",
  ],
  authors: [{ name: "Siva Pest Control" }],
  creator: "Siva Pest Control",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Siva Pest Control — Premium Protection for Homes & Businesses",
    description:
      "Science-led pest control across Hyderabad, Chennai and Bangalore. Fully guaranteed treatments with fast response and child-safe formulations.",
    url: "https://www.sivapestcontrol.com",
    siteName: "Siva Pest Control",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siva Pest Control — Premium Protection",
    description:
      "Science-led pest control across Hyderabad, Chennai and Bangalore.",
  },
  alternates: {
    canonical: "https://www.sivapestcontrol.com",
  },
  category: "Home Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
