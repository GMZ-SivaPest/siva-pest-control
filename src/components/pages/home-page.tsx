"use client";

import dynamic from "next/dynamic";
import { HeroSlider } from "@/components/site/hero-slider";
import { HomeTreatmentPlanner } from "@/components/site/home-treatment-planner";
import { ShowcaseCarousel } from "@/components/site/showcase-carousel";
import { Stats } from "@/components/site/stats";
import { Manifesto } from "@/components/site/manifesto";
import { ProtectionShield } from "@/components/site/protection-shield";
import { ServicesGallery } from "@/components/site/services-gallery";
import { PestTrailDivider } from "@/components/site/pest-trail-divider";
import { WaveDivider } from "@/components/site/wave-divider";
import { brand } from "@/data/brand";

/**
 * HomePage — premium "protection not pests" visual journey.
 *
 * Performance strategy:
 *   - Above-the-fold sections (Hero, ShowcaseCarousel, Stats) are eagerly
 *     imported so they ship in the First Load JS bundle.
 *   - Below-the-fold sections are loaded via next/dynamic with ssr: true
 *     (still server-rendered for SEO/SEO, but split into separate chunks
 *     so the homepage's initial JS payload stays small). The browser
 *     fetches these chunks lazily as the user scrolls.
 *
 * Design philosophy (per Aug 2026 design playbook):
 *   "Make protection the visual metaphor, not bugs."
 *   60% clean corporate + 20% organic + 10% nature + 10% pest accents
 *
 * Section order (matches playbook recommended journey):
 *   1.  Hero (cinematic, parallax, city pins)
 *   2.  ShowcaseCarousel (auto-scrolling field-work gallery)
 *   3.  Stats (4 key numbers, image cards)
 *   4.  Manifesto (large typography + small pest accent)
 *   5.  ProtectionShield (signature brand animation)
 *   6.  ServicesGallery (image grid of ALL 14 services)
 *   7.  BeforeAfterSlider (draggable result comparison)
 *   8.  WhyChooseStrip (4 image-card reasons)
 *   9.  LocationsMap (3 cities served)
 *  10.  IndustriesShowcase (image grid of industries)
 *  11.  Testimonials (horizontal continuous scroll)
 *  12.  BlogTeaser (latest 3 articles)
 *  13.  ProtectionCTA (dark premium final CTA with shield)
 *  14.  Certifications strip (footer of trust)
 *
 * Pest trail dividers + wave dividers used selectively between
 * sections for organic visual rhythm (playbook #10, #11).
 */

// Lazy-loaded below-the-fold sections (separate JS chunks, SSR preserved for SEO)
const BeforeAfterSlider = dynamic(
  () => import("@/components/site/before-after-slider").then((m) => m.BeforeAfterSlider),
  { ssr: true, loading: () => <div className="h-[600px] bg-brown/5" aria-hidden /> }
);
const WhyChooseStrip = dynamic(
  () => import("@/components/site/why-choose-strip").then((m) => m.WhyChooseStrip),
  { ssr: true, loading: () => <div className="h-[400px] bg-brown/5" aria-hidden /> }
);
const LocationsMap = dynamic(
  () => import("@/components/site/locations-map").then((m) => m.LocationsMap),
  { ssr: true, loading: () => <div className="h-[500px] bg-brown/5" aria-hidden /> }
);
const IndustriesShowcase = dynamic(
  () => import("@/components/site/industries-showcase").then((m) => m.IndustriesShowcase),
  { ssr: true, loading: () => <div className="h-[400px] bg-brown/5" aria-hidden /> }
);
const Testimonials = dynamic(
  () => import("@/components/site/testimonials").then((m) => m.Testimonials),
  { ssr: true, loading: () => <div className="h-[400px] bg-brown/5" aria-hidden /> }
);
const BlogTeaser = dynamic(
  () => import("@/components/site/blog-teaser").then((m) => m.BlogTeaser),
  { ssr: true, loading: () => <div className="h-[400px] bg-brown/5" aria-hidden /> }
);
const ProtectionCTA = dynamic(
  () => import("@/components/site/protection-cta").then((m) => m.ProtectionCTA),
  { ssr: true, loading: () => <div className="h-[400px] bg-brown/5" aria-hidden /> }
);

export function HomePage() {
  return (
    <>
      {/* 01 — Auto-rotating hero carousel with pest-control story slides */}
      <HeroSlider />

      {/* 02 — Interactive diagnosis-to-treatment path */}
      <HomeTreatmentPlanner />

      {/* 03 — Auto-scrolling field-work gallery */}
      <ShowcaseCarousel />

      {/* 04 — Four key trust numbers */}
      <Stats />

      {/* Subtle ant trail divider (10% pest accent) */}
      <PestTrailDivider variant="ant" />

      {/* 05 — Big-typography brand promise with tiny pest accent */}
      <Manifesto />

      {/* 06 — Signature protection animation (pests deflected by shield) */}
      <ProtectionShield />

      {/* Organic wave roll-down into services */}
      <WaveDivider bg="var(--color-ivory-deep, #F0E6D2)" />

      {/* 07 — Image-first services grid (all 14 services) */}
      <ServicesGallery />

      {/* Subtle mosquito-trail divider before the result demonstration */}
      <PestTrailDivider variant="mosquito" />

      {/* 08 — Draggable before/after result comparison */}
      <BeforeAfterSlider />

      {/* 09 — Why choose Siva (image-card reasons) */}
      <WhyChooseStrip />

      {/* 10 — Three-city coverage map */}
      <LocationsMap />

      {/* 11 — Industries served */}
      <IndustriesShowcase />

      {/* 12 — Testimonials marquee */}
      <Testimonials />

      {/* 13 — Latest insights */}
      <BlogTeaser />

      {/* 14 — Dark premium final CTA with shield + pest silhouettes */}
      <ProtectionCTA />

      {/* 15 — Certifications trust strip */}
      <section className="bg-brown/5 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 text-center sm:gap-x-10">
          {brand.certifications.map((cert) => (
            <div
              key={cert}
              className="text-xs font-semibold uppercase tracking-wider text-brown/65"
            >
              {cert}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
