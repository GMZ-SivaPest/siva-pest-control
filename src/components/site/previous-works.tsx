"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * PreviousWorks — magazine-style gallery of recent Siva field jobs.
 *
 * Layout:
 *   - First card is a large featured story (spans 2 cols on desktop, with
 *     a longer summary that's always visible — not hover-only).
 *   - Remaining 5 cards form a 3-col masonry grid below.
 *   - Each card: image + date chip + title + location + summary + duration.
 *   - Each card is a real <Link> so Google can crawl service pages from /about.
 *
 * Lives on /about to give visitors proof-of-work without leaving the
 * brand story.
 */

interface WorkItem {
  image: string;
  alt: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  href: string;
  summary: string;
  tags: string[];
}

const WORKS: WorkItem[] = [
  {
    image: "/images/showcase/work-restaurant-kitchen.jpg",
    alt: "Siva technician logging service at a clean restaurant kitchen with UV fly trap installed",
    title: "FSSAI-compliant IPM programme — 60-cover QSR",
    location: "T. Nagar, Chennai",
    date: "Jun 2026",
    duration: "1-day install · 12-month AMC",
    href: "/services/commercial-pest-control",
    summary:
      "Full integrated pest management programme across a 60-cover quick-service restaurant in T. Nagar. We installed wall-mounted UV fly traps, deployed tamper-resistant rodent stations at all entry points, set up a monthly audit log, and trained the kitchen team on exclusion hygiene. The restaurant passed its quarterly FSSAI inspection without a single pest-related finding.",
    tags: ["Commercial", "FSSAI", "IPM"],
  },
  {
    image: "/images/showcase/work-warehouse-termite.jpg",
    alt: "Siva technician drilling into warehouse concrete floor for termite chemical barrier",
    title: "Warehouse perimeter termite barrier",
    location: "Whitefield, Bangalore",
    date: "May 2026",
    duration: "2-day install · 5-year warranty",
    href: "/services/termite-control",
    summary:
      "Drill-fill-seal barrier along 180m of warehouse perimeter wall. 5-year written warranty. Zero termite activity in 11 months since.",
    tags: ["Termite", "Commercial"],
  },
  {
    image: "/images/showcase/work-bedbug-steam.jpg",
    alt: "Siva technician applying steam treatment to a bedroom mattress for bed bug eradication",
    title: "Bed bug steam treatment — mattress",
    location: "Madhapur, Hyderabad",
    date: "May 2026",
    duration: "2 rounds · 6-hr re-entry",
    href: "/services/bed-bug-control",
    summary:
      "Two-round steam + residual spray protocol. Family of four back sleeping in the same room within 6 hours. No smell, no evacuation.",
    tags: ["Residential", "Bed bug"],
  },
  {
    image: "/images/showcase/work-rodent-station.jpg",
    alt: "Tamper-resistant rodent bait station installed along a warehouse exterior wall",
    title: "Rodent bait station network",
    location: "Guindy, Chennai",
    date: "Apr 2026",
    duration: "21-day knockdown",
    href: "/services/rodent-control",
    summary:
      "24 tamper-resistant bait stations deployed around a 12,000 sq ft logistics warehouse. Rodent sightings dropped from weekly to zero within 21 days.",
    tags: ["Commercial", "Rodent"],
  },
  {
    image: "/images/showcase/work-beehive-removal.jpg",
    alt: "Siva technician in bee suit removing a large honeycomb hive from an apartment balcony",
    title: "Bee hive live relocation",
    location: "Koramangala, Bangalore",
    date: "Apr 2026",
    duration: "90-min removal",
    href: "/services/bee-control",
    summary:
      "Live relocation of a 14-inch honeycomb hive from a 7th-floor balcony. No chemical used. Hive handed over to a local beekeeper.",
    tags: ["Residential", "Wildlife"],
  },
  {
    image: "/images/showcase/work-bird-spike.jpg",
    alt: "Newly installed stainless steel bird spikes along a commercial building window ledge",
    title: "Bird spike installation — commercial ledge",
    location: "Hitech City, Hyderabad",
    date: "Mar 2026",
    duration: "1-day install · 48-hr result",
    href: "/services/bird-control",
    summary:
      "120 linear feet of stainless-steel spike strips installed along window ledges of a 9-floor commercial building. Pigeon roosting eliminated within 48 hours.",
    tags: ["Commercial", "Bird control"],
  },
];

export function PreviousWorks() {
  const [featured, ...rest] = WORKS;

  return (
    <section className="relative py-20 md:py-28">
      {/* soft warm backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory-deep/40 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Recent work"
          title="A look at what we actually do"
          subtitle="Real Siva field jobs from the last few months — across homes, restaurants, warehouses, and apartments. Tap any card to see the relevant service in detail."
        />

        {/* === Featured story (large) === */}
        <Reveal>
          <FeaturedCard work={featured} />
        </Reveal>

        {/* === Masonry grid of remaining work === */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((w, i) => (
            <Reveal key={w.title} delay={Math.min(i * 0.06, 0.36)}>
              <WorkCard work={w} />
            </Reveal>
          ))}
        </div>

        {/* === Footer CTA === */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-brown/10 bg-white p-6 shadow-premium sm:flex-row sm:p-8">
            <div>
              <h3 className="font-display text-lg font-bold text-brown sm:text-xl">
                Want a similar treatment for your space?
              </h3>
              <p className="mt-1 text-sm text-brown/65">
                Free inspection, fixed-price quote, certified technicians. Same-day service in Hyderabad, Chennai and Bangalore.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.02] gradient-orange"
            >
              Book free inspection
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// === FEATURED CARD — large, summary always visible ===
function FeaturedCard({ work }: { work: WorkItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={work.href}
        className="group relative block overflow-hidden rounded-3xl bg-brown shadow-premium-lg ring-1 ring-brown/10 transition-all hover:-translate-y-1 hover:shadow-lift"
      >
        <div className="grid lg:grid-cols-[1.4fr_1fr]">
          {/* Image side */}
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[440px]">
            <Image
              src={work.image}
              alt={work.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(28,18,10,0) 0%, rgba(28,18,10,0) 50%, rgba(28,18,10,0.5) 100%)",
              }}
              aria-hidden="true"
            />
            {/* Featured chip + date */}
            <div className="absolute left-5 top-5 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow-orange">
                Featured
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/30">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                {work.date}
              </span>
            </div>
          </div>

          {/* Content side — ivory background, summary always visible */}
          <div className="relative flex flex-col justify-between bg-white p-7 sm:p-9 lg:p-10">
            <div>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-xl font-bold leading-tight text-brown sm:text-2xl lg:text-[1.6rem]">
                {work.title}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-brown/65">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
                  {work.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
                  {work.duration}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brown/75 text-pretty">
                {work.summary}
              </p>
            </div>

            <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-all group-hover:gap-2.5">
              View service detail
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// === WORK CARD — compact, summary visible on hover ===
function WorkCard({ work }: { work: WorkItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={work.href}
        className="group relative block h-full overflow-hidden rounded-2xl bg-brown shadow-premium ring-1 ring-brown/10 transition-all hover:-translate-y-1 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={work.image}
            alt={work.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Top-down cinematic gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,18,10,0) 0%, rgba(28,18,10,0) 30%, rgba(28,18,10,0.85) 80%, rgba(28,18,10,0.97) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Top-right hover affordance */}
          <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md ring-1 ring-white/30 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </div>
          {/* Date chip — top-left */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/30">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {work.date}
          </div>
        </div>

        {/* Content overlay — summary always visible (better for mobile + SEO) */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {work.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-display text-base font-bold leading-tight text-white drop-shadow-md sm:text-lg">
            {work.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-white/85">
            <MapPin className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
            {work.location}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/80 line-clamp-3">
            {work.summary}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-white/65">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {work.duration}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
