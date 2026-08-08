"use client";

import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { ShowcaseCarousel } from "@/components/site/showcase-carousel";
import { ServicesGallery } from "@/components/site/services-gallery";
import { WhyChooseStrip } from "@/components/site/why-choose-strip";
import { LocationsMap } from "@/components/site/locations-map";
import { IndustriesShowcase } from "@/components/site/industries-showcase";
import { Testimonials } from "@/components/site/testimonials";
import { CTASection } from "@/components/site/cta-section";
import { BlogTeaser } from "@/components/site/blog-teaser";
import { brand } from "@/data/brand";

/**
 * HomePage — image-rich, content-light homepage.
 *
 * Design philosophy (per client feedback Aug 2026):
 * - Homepage should be image-heavy with main points only
 * - Long-form content (Why Siva, How we work, FAQs) lives on
 *   dedicated pages — About, Process, FAQ
 * - Every section is either visual or links out for more detail
 *
 * Section order:
 *   1. Hero (cinematic, parallax, city pins)
 *   2. ShowcaseCarousel (auto-scrolling image gallery of pest-control work)
 *   3. Stats (4 key numbers, image cards)
 *   4. ServicesGallery (image grid of ALL 14 services)
 *   5. WhyChooseStrip (4 image-card reasons, links to About for full 8)
 *   6. LocationsMap (3 cities served)
 *   7. IndustriesShowcase (image grid of industries)
 *   8. Testimonials (horizontal continuous scroll)
 *   9. BlogTeaser (latest 3 articles)
 *  10. CTASection (final conversion push)
 *  11. Certifications strip (footer of trust)
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <ShowcaseCarousel />
      <Stats />
      <ServicesGallery />
      <WhyChooseStrip />
      <LocationsMap />
      <IndustriesShowcase />
      <Testimonials />

      {/* Latest insights */}
      <BlogTeaser />

      <CTASection />

      {/* Brand promise / certifications footer strip */}
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
