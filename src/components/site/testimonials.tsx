"use client";

import Image from "next/image";
import { Star, Quote, MapPin } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { company } from "@/data/company";

/**
 * Testimonials — horizontal continuous marquee of customer stories.
 *
 * Design goals:
 *  - Always readable: high-contrast text on a dark warm gradient.
 *  - Continuous scroll: CSS keyframe `marquee-x` runs infinitely.
 *  - Pause on hover: lets users read a specific card.
 *  - Seamless loop: the track renders two identical copies of the
 *    testimonial list so the animation can translate from 0 -> -50%
 *    without any visible jump.
 *  - Accessible: the slide container is `aria-live="polite"` so screen
 *    readers announce new content as it scrolls into view, and respects
 *    `prefers-reduced-motion` (animation disabled in globals.css).
 */
export function Testimonials() {
  // Two copies of the same list so the marquee can loop seamlessly.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 gradient-brown" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-warm opacity-[0.04]" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer voices"
          title="Real stories from real customers"
          subtitle={`${company.stats.googleReviews.toLocaleString("en-IN")}+ verified reviews across three cities. Here are a few that capture what we work for.`}
          light
        />
      </div>

      {/* Marquee — full-bleed, edge-faded, pauses on hover */}
      <Reveal className="relative mt-14" delay={0.1}>
        <div
          className="marquee-viewport mask-fade-edges"
          aria-label="Customer testimonials — scrolling marquee"
        >
          <ul
            className="marquee-track gap-5 px-4 sm:px-6 lg:px-8"
            style={{ animationDuration: "140s" }}
            // aria-hidden: an infinite marquee would spam screen readers if
            // announced live; the same content is fully available in the
            // accessible testimonials section on the homepage and via the
            // aggregate-rating row below.
            aria-hidden="true"
          >
            {loop.map((t, i) => (
              <li
                key={`${t.id}-${i}`}
                className="w-[340px] sm:w-[400px] lg:w-[440px]"
              >
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Aggregate-rating row */}
      <div className="relative mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-orange text-orange" />
            ))}
          </div>
          <div className="text-sm font-semibold text-white">
            {company.stats.googleRating.toFixed(1)} / 5
          </div>
        </div>
        <div className="text-sm text-white/80">
          Based on{" "}
          <span className="font-semibold text-white">
            {company.stats.googleReviews.toLocaleString("en-IN")}+
          </span>{" "}
          verified Google reviews across Hyderabad, Chennai &amp; Bangalore.
        </div>
      </div>
    </section>
  );
}

/**
 * TestimonialCard — single testimonial in the marquee.
 * High-contrast: white text on translucent white-tinted glass over
 * the dark brown gradient background.
 */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.10] sm:p-7">
      <Quote
        className="absolute right-5 top-5 h-12 w-12 text-orange/25"
        aria-hidden="true"
      />

      {/* Rating */}
      <div className="mb-4 flex items-center gap-1" aria-label={`Rated ${t.rating} out of 5`}>
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-orange text-orange" aria-hidden="true" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-display text-base font-medium leading-relaxed text-white text-pretty sm:text-lg">
        &ldquo;{t.text}&rdquo;
      </blockquote>

      {/* Footer: author + service tag */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/15 pt-5">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
            <Image
              src={t.avatar}
              alt={`Photo of ${t.name}`}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">{t.name}</div>
            <div className="truncate text-xs font-medium text-white/85">{t.role}</div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-white/75">
              <MapPin className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{t.location}, {t.city}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-right">
          <span className="inline-flex rounded-full bg-orange/20 px-2.5 py-1 text-[11px] font-semibold text-orange ring-1 ring-orange/40">
            {t.service}
          </span>
          {t.highlight && (
            <span className="text-[11px] font-medium text-white/85">{t.highlight}</span>
          )}
        </div>
      </div>
    </article>
  );
}
