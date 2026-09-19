"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { company } from "@/data/company";

/**
 * Testimonials — compact marquee of customer stories.
 *
 * Design brief: "reduce the size, improve the design". The previous version
 * was a tall dark-gradient band with large glass cards. This version:
 *  - sits on the light ivory canvas used by the rest of the homepage,
 *  - uses small white cards (280–340px) with a tight internal hierarchy:
 *    person row on top, short clamped quote in the middle, service chip and
 *    proof line at the bottom — all on white cards over the ivory canvas.
 *  - keeps the continuous scroll + hover-pause + seamless 2-copy loop,
 *  - keeps `aria-hidden` on the track (a live marquee would spam screen
 *    readers) and respects `prefers-reduced-motion` via globals.css.
 */
export function Testimonials() {
  // Two copies of the same list so the marquee can loop seamlessly.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden py-12 md:py-14">
      <div className="absolute inset-0 -z-10 bg-ivory" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 gradient-warm" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer voices"
          title="Loved by homes and businesses"
          subtitle={`${company.stats.googleReviews.toLocaleString("en-IN")}+ verified Google reviews. A few words from the people we work for.`}
        />
      </div>

      {/* Marquee — full-bleed, edge-faded, pauses on hover */}
      <Reveal className="relative mt-8" delay={0.1}>
        <div
          className="marquee-viewport mask-fade-edges"
          aria-label="Customer testimonials — scrolling marquee"
        >
          <ul
            className="marquee-track gap-4 px-4 sm:px-6 lg:px-8"
            style={{ animationDuration: "90s" }}
            // aria-hidden: an infinite marquee would spam screen readers if
            // announced live; the same content is fully available in the
            // accessible testimonials section on the homepage and via the
            // aggregate-rating row below.
            aria-hidden="true"
          >
            {loop.map((t, i) => (
              <li
                key={`${t.id}-${i}`}
                className="w-[290px] sm:w-[320px] lg:w-[350px]"
              >
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Aggregate rating — one quiet, centered line */}
      <div className="relative mx-auto mt-8 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-brown/10 bg-white px-5 py-2.5 shadow-premium">
          <div className="flex items-center gap-1" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-orange text-orange" />
            ))}
          </div>
          <span className="text-sm font-bold text-brown">
            {company.stats.googleRating.toFixed(1)} / 5
          </span>
          <span className="hidden h-3 w-px bg-brown/15 sm:block" aria-hidden="true" />
          <span className="text-xs text-brown/65">
            {company.stats.googleReviews.toLocaleString("en-IN")}+ verified Google reviews
          </span>
        </div>
      </div>
    </section>
  );
}

/**
 * TestimonialCard — single testimonial in the marquee.
 * Compact light card: person row on top, short clamped quote in the
 * middle, service chip + proof line at the bottom. White on ivory with
 * the brand ring — matches the rest of the homepage instead of the old
 * dark-glass style.
 */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-brown/10 bg-white p-5 shadow-premium transition-shadow duration-300 hover:shadow-premium-lg">
      {/* Person row: avatar, name/role, rating */}
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-orange/25">
          <Image
            src={t.avatar}
            alt={`Photo of ${t.name}`}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-brown">{t.name}</div>
          <div className="truncate text-[11px] text-brown/60">
            {t.role} · {t.city}
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-0.5" aria-label={`Rated ${t.rating} out of 5`}>
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-orange text-orange" aria-hidden="true" />
          ))}
        </div>
      </div>

      {/* Quote — clamped so every card shares the same height */}
      <blockquote className="mt-3 line-clamp-4 text-[13px] leading-relaxed text-brown/80 text-pretty">
        &ldquo;{t.text}&rdquo;
      </blockquote>

      {/* Bottom row: service chip + proof line */}
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <span className="inline-flex flex-shrink-0 rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-semibold text-orange-ink ring-1 ring-orange/20">
          {t.service}
        </span>
        {t.highlight && (
          <span className="truncate text-[10px] font-semibold text-brown/70">{t.highlight}</span>
        )}
      </div>
    </article>
  );
}
