"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  Calendar,
  Clock,
  Building2,
  Home,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * PreviousWorks — proof-of-work gallery for the About page.
 *
 * Design goals (redesigned):
 *   1. Filterable — segment pills let visitors jump between Residential /
 *      Commercial / Wildlife categories. Active filter animates with
 *      `layoutId` so the pill background slides between tabs.
 *   2. Cinematic featured story at top — large image + tag column + key
 *      metrics (duration, warranty, location) called out as data points
 *      instead of being buried in prose.
 *   3. Asymmetric grid below — alternating card sizes (large + small +
 *      small) for magazine rhythm, never a uniform 3-col block.
 *   4. Each card surfaces a single bold metric ("5-year warranty",
 *      "21-day knockdown", "48-hr result") — proof, not marketing copy.
 *   5. Each card is a real <Link> so Google crawls service pages from /about.
 *   6. Footer stat strip — total jobs, cities, technicians. Reinforces
 *      scale without bragging.
 */

type Segment = "all" | "residential" | "commercial" | "wildlife";

interface WorkItem {
  image: string;
  alt: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  warranty?: string;
  metric: { value: string; label: string };
  href: string;
  summary: string;
  tags: string[];
  segment: Exclude<Segment, "all">;
}

const WORKS: WorkItem[] = [
  {
    image: "/images/showcase/work-restaurant-kitchen.jpg",
    alt: "Siva technician logging service at a clean restaurant kitchen with UV fly trap installed",
    title: "FSSAI-compliant IPM programme — 60-cover QSR",
    location: "T. Nagar, Chennai",
    date: "Jun 2026",
    duration: "1-day install · 12-month AMC",
    warranty: "FSSAI audit pass",
    metric: { value: "0", label: "FSSAI findings" },
    href: "/services/commercial-pest-control",
    summary:
      "Full integrated pest management programme across a 60-cover quick-service restaurant in T. Nagar. We installed wall-mounted UV fly traps, deployed tamper-resistant rodent stations at all entry points, set up a monthly audit log, and trained the kitchen team on exclusion hygiene. The restaurant passed its quarterly FSSAI inspection without a single pest-related finding.",
    tags: ["Commercial", "FSSAI", "IPM"],
    segment: "commercial",
  },
  {
    image: "/images/showcase/work-warehouse-termite.jpg",
    alt: "Siva technician drilling into warehouse concrete floor for termite chemical barrier",
    title: "Warehouse perimeter termite barrier",
    location: "Whitefield, Bangalore",
    date: "May 2026",
    duration: "2-day install",
    warranty: "5-year written warranty",
    metric: { value: "5-yr", label: "warranty barrier" },
    href: "/services/termite-control",
    summary:
      "Drill-fill-seal barrier along 180m of warehouse perimeter wall. 5-year written warranty. Zero termite activity in 11 months since.",
    tags: ["Termite", "Commercial"],
    segment: "commercial",
  },
  {
    image: "/images/showcase/work-bedbug-steam.jpg",
    alt: "Siva technician applying steam treatment to a bedroom mattress for bed bug eradication",
    title: "Bed bug steam treatment — mattress",
    location: "Madhapur, Hyderabad",
    date: "May 2026",
    duration: "2 rounds",
    warranty: "90-day re-treatment",
    metric: { value: "6-hr", label: "back in bed" },
    href: "/services/bed-bug-control",
    summary:
      "Two-round steam + residual spray protocol. Family of four back sleeping in the same room within 6 hours. No smell, no evacuation.",
    tags: ["Residential", "Bed bug"],
    segment: "residential",
  },
  {
    image: "/images/showcase/work-rodent-station.jpg",
    alt: "Tamper-resistant rodent bait station installed along a warehouse exterior wall",
    title: "Rodent bait station network",
    location: "Guindy, Chennai",
    date: "Apr 2026",
    duration: "21-day knockdown",
    metric: { value: "21d", label: "to zero sightings" },
    href: "/services/rodent-control",
    summary:
      "24 tamper-resistant bait stations deployed around a 12,000 sq ft logistics warehouse. Rodent sightings dropped from weekly to zero within 21 days.",
    tags: ["Commercial", "Rodent"],
    segment: "commercial",
  },
  {
    image: "/images/showcase/work-beehive-removal.jpg",
    alt: "Siva technician in bee suit removing a large honeycomb hive from an apartment balcony",
    title: "Bee hive live relocation",
    location: "Koramangala, Bangalore",
    date: "Apr 2026",
    duration: "90-min removal",
    metric: { value: "0", label: "chemicals used" },
    href: "/services/bee-control",
    summary:
      "Live relocation of a 14-inch honeycomb hive from a 7th-floor balcony. No chemical used. Hive handed over to a local beekeeper.",
    tags: ["Residential", "Wildlife"],
    segment: "wildlife",
  },
  {
    image: "/images/showcase/work-bird-spike.jpg",
    alt: "Newly installed stainless steel bird spikes along a commercial building window ledge",
    title: "Bird spike installation — commercial ledge",
    location: "Hitech City, Hyderabad",
    date: "Mar 2026",
    duration: "1-day install",
    warranty: "3-year material",
    metric: { value: "48-hr", label: "result visible" },
    href: "/services/bird-control",
    summary:
      "120 linear feet of stainless-steel spike strips installed along window ledges of a 9-floor commercial building. Pigeon roosting eliminated within 48 hours.",
    tags: ["Commercial", "Bird control"],
    segment: "commercial",
  },
];

const FILTERS: { id: Segment; label: string; count: number }[] = [
  { id: "all", label: "All work", count: WORKS.length },
  {
    id: "residential",
    label: "Residential",
    count: WORKS.filter((w) => w.segment === "residential").length,
  },
  {
    id: "commercial",
    label: "Commercial",
    count: WORKS.filter((w) => w.segment === "commercial").length,
  },
  {
    id: "wildlife",
    label: "Wildlife",
    count: WORKS.filter((w) => w.segment === "wildlife").length,
  },
];

export function PreviousWorks() {
  const [filter, setFilter] = useState<Segment>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return WORKS;
    return WORKS.filter((w) => w.segment === filter);
  }, [filter]);

  const [featured, ...rest] = filtered;

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

        {/* === Filter pill bar === */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
              >
                {/* Active pill background — animated via layoutId */}
                {active && (
                  <motion.span
                    layoutId="previous-works-filter-pill"
                    className="absolute inset-0 rounded-full bg-brown shadow-premium"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={
                    active
                      ? "relative z-10 text-ivory"
                      : "relative z-10 text-brown/70 hover:text-brown"
                  }
                >
                  {f.label}
                </span>
                {/* Count chip */}
                <span
                  className={
                    active
                      ? "relative z-10 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold text-white"
                      : "relative z-10 rounded-full bg-brown/10 px-1.5 py-0.5 text-[10px] font-bold text-brown/70"
                  }
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* === Cards grid (animated on filter change) === */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            {/* === Featured story === */}
            {featured && (
              <Reveal>
                <FeaturedCard work={featured} />
              </Reveal>
            )}

            {/* === Asymmetric grid: 2-col on tablet, 3-col on desktop === */}
            {rest.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((w, i) => (
                  <Reveal key={w.title} delay={Math.min(i * 0.06, 0.36)}>
                    <WorkCard work={w} />
                  </Reveal>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* === Footer: stats strip + CTA === */}
        <Reveal delay={0.2}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium">
            {/* Stat strip */}
            <div className="grid grid-cols-2 divide-brown/10 sm:grid-cols-4 sm:divide-x">
              {[
                { value: "12,000+", label: "treatments delivered" },
                { value: "3", label: "cities served" },
                { value: "180-day", label: "warranty standard" },
                { value: "30-min", label: "average response" },
              ].map((stat, i, arr) => (
                <div
                  key={stat.label}
                  className={
                    i < arr.length - 1
                      ? "border-b border-brown/10 p-5 sm:border-b-0"
                      : "p-5"
                  }
                >
                  <div className="font-display text-2xl font-bold text-brown sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-brown/65">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-col items-start justify-between gap-4 border-t border-brown/10 bg-ivory/50 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <h3 className="font-display text-lg font-bold text-brown sm:text-xl">
                  Want a similar treatment for your space?
                </h3>
                <p className="mt-1 text-sm text-brown/75">
                  Free inspection, fixed-price quote, certified technicians.
                  Same-day service in Hyderabad, Chennai and Bangalore.
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// === FEATURED CARD — large, with key metrics called out as data points ===
function FeaturedCard({ work }: { work: WorkItem }) {
  const SegmentIcon =
    work.segment === "commercial"
      ? Building2
      : work.segment === "wildlife"
        ? ShieldCheck
        : Home;

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
            {/* Bold metric callout — bottom-left of image */}
            <div className="absolute bottom-5 left-5">
              <div className="font-display text-4xl font-bold text-white drop-shadow-lg sm:text-5xl">
                {work.metric.value}
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/85">
                {work.metric.label}
              </div>
            </div>
          </div>

          {/* Content side — ivory background, summary always visible */}
          <div className="relative flex flex-col justify-between bg-white p-7 sm:p-9 lg:p-10">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brown/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brown">
                  <SegmentIcon className="h-3 w-3" aria-hidden="true" />
                  {work.segment}
                </span>
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-xl font-bold leading-tight text-brown sm:text-2xl lg:text-[1.6rem]">
                {work.title}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-brown/75">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orange-ink" aria-hidden="true" />
                  {work.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-orange-ink" aria-hidden="true" />
                  {work.duration}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brown/80 text-pretty">
                {work.summary}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink transition-all group-hover:gap-2.5">
                View service detail
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              {work.warranty && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-semibold text-teal ring-1 ring-teal/20">
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  {work.warranty}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// === WORK CARD — compact, with bold metric in corner ===
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
          {/* Bold metric callout — bottom-right of image */}
          <div className="absolute bottom-3 right-3 text-right">
            <div className="font-display text-2xl font-bold text-white drop-shadow-md sm:text-3xl">
              {work.metric.value}
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-wider text-white/80">
              {work.metric.label}
            </div>
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
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-white/70">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {work.duration}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
