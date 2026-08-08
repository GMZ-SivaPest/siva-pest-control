"use client";

import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Manifesto } from "@/components/site/manifesto";
import { ProtectionShield } from "@/components/site/protection-shield";
import { ShowcaseCarousel } from "@/components/site/showcase-carousel";
import { ServicesGallery } from "@/components/site/services-gallery";
import { BeforeAfterSlider } from "@/components/site/before-after-slider";
import { PestTrailDivider } from "@/components/site/pest-trail-divider";
import { WaveDivider } from "@/components/site/wave-divider";
import { WhyChooseStrip } from "@/components/site/why-choose-strip";
import { LocationsMap } from "@/components/site/locations-map";
import { IndustriesShowcase } from "@/components/site/industries-showcase";
import { Testimonials } from "@/components/site/testimonials";
import { ProtectionCTA } from "@/components/site/protection-cta";
import { BlogTeaser } from "@/components/site/blog-teaser";
import { brand } from "@/data/brand";

/**
 * HomePage — premium "protection not pests" visual journey.
 *
 * Design philosophy (per Aug 2026 design playbook):
 *   "Make protection the visual metaphor, not bugs."
 *   60% clean corporate + 20% organic + 10% nature + 10% pest accents
 *
 * Section order (matches playbook recommended journey):
 *   1.  Hero (cinematic, parallax, city pins)
 *   2.  ShowcaseCarousel (auto-scrolling field-work gallery)
 *   3.  Stats (4 key numbers, image cards)
 *   4.  Manifesto (large typography + small pest accent)        ← NEW
 *   5.  ProtectionShield (signature brand animation)            ← NEW
 *   6.  ServicesGallery (image grid of ALL 14 services)
 *   7.  BeforeAfterSlider (draggable result comparison)         ← NEW
 *   8.  WhyChooseStrip (4 image-card reasons)
 *   9.  LocationsMap (3 cities served)
 *  10.  IndustriesShowcase (image grid of industries)
 *  11.  Testimonials (horizontal continuous scroll)
 *  12.  BlogTeaser (latest 3 articles)
 *  13.  ProtectionCTA (dark premium final CTA with shield)      ← NEW
 *  14.  Certifications strip (footer of trust)
 *
 * Pest trail dividers + wave dividers used selectively between
 * sections for organic visual rhythm (playbook #10, #11).
 */
export function HomePage() {
  return (
    <>
      {/* 01 — Cinematic hero */}
      <Hero />

      {/* 02 — Auto-scrolling field-work gallery */}
      <ShowcaseCarousel />

      {/* 03 — Four key trust numbers */}
      <Stats />

      {/* Subtle ant trail divider (10% pest accent) */}
      <PestTrailDivider variant="ant" />

      {/* 04 — Big-typography brand promise with tiny pest accent */}
      <Manifesto />

      {/* 05 — Signature protection animation (pests deflected by shield) */}
      <ProtectionShield />

      {/* Organic wave roll-down into services */}
      <WaveDivider bg="var(--color-ivory-deep, #F0E6D2)" />

      {/* 06 — Image-first services grid (all 14 services) */}
      <ServicesGallery />

      {/* Subtle mosquito-trail divider before the result demonstration */}
      <PestTrailDivider variant="mosquito" />

      {/* 07 — Draggable before/after result comparison */}
      <BeforeAfterSlider />

      {/* 08 — Why choose Siva (image-card reasons) */}
      <WhyChooseStrip />

      {/* 09 — Three-city coverage map */}
      <LocationsMap />

      {/* 10 — Industries served */}
      <IndustriesShowcase />

      {/* 11 — Testimonials marquee */}
      <Testimonials />

      {/* 12 — Latest insights */}
      <BlogTeaser />

      {/* 13 — Dark premium final CTA with shield + pest silhouettes */}
      <ProtectionCTA />

      {/* 14 — Certifications trust strip */}
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
