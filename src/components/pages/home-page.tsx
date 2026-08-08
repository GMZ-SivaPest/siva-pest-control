"use client";

import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { ServicesTeaser } from "@/components/site/services-teaser";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { LocationsMap } from "@/components/site/locations-map";
import { IndustriesShowcase } from "@/components/site/industries-showcase";
import { Testimonials } from "@/components/site/testimonials";
import { FAQAccordion } from "@/components/site/faq-accordion";
import { CTASection } from "@/components/site/cta-section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { BlogTeaser } from "@/components/site/blog-teaser";
import { faqs } from "@/data/faqs";
import { brand } from "@/data/brand";

export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesTeaser />
      <WhyChooseUs />
      <ProcessTimeline />
      <LocationsMap />
      <IndustriesShowcase />
      <Testimonials />

      {/* Latest insights */}
      <BlogTeaser />

      {/* FAQ teaser */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Common questions"
            title="Quick answers to what most customers ask"
            subtitle="Detailed FAQs live on the dedicated FAQ page — these are the most common questions we hear on the first call."
          />
          <Reveal className="mt-10">
            <FAQAccordion items={faqs.slice(0, 6).map((f) => ({ q: f.q, a: f.a }))} />
          </Reveal>
        </div>
      </section>

      <CTASection />

      {/* Brand promise footer strip */}
      <section className="bg-brown/5 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 text-center sm:gap-x-10">
          {brand.certifications.map((cert) => (
            <div
              key={cert}
              className="text-xs font-semibold uppercase tracking-wider text-brown/60"
            >
              {cert}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
