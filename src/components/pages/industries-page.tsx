"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { industries } from "@/data/industries";
import {
  CheckCircle2,
  ShieldCheck,
  FileText,
  ArrowRight,
  ChevronRight,
  Bug,
} from "lucide-react";

/* ---------- helper: split industries into featured vs rest ---------- */
const FEATURED_SLUGS = ["restaurants", "hotels", "healthcare"];
const featured = industries.filter((i) => FEATURED_SLUGS.includes(i.slug));
const rest = industries.filter((i) => !FEATURED_SLUGS.includes(i.slug));

/* ---------- stats for the impact bar ---------- */
const stats = [
  { value: "3", label: "Cities" },
  { value: "12,000+", label: "Spaces protected" },
  { value: "10+", label: "Industry verticals" },
  { value: "480+", label: "Commercial sites" },
  { value: "98%", label: "Client satisfaction" },
];

export function IndustriesPage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Industries we serve"
        title="Audit-ready IPM for every sector"
        subtitle="From single-outlet restaurants to multi-specialty hospitals — we have a documented, audit-defensible IPM programme calibrated for your sector's compliance regime."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "Industries" }]}
      />

      {/* ─── Impact stats strip ───────────────────────────────────── */}
      <section className="relative -mt-6 z-10 pb-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-premium sm:grid-cols-5">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center px-4 py-5 text-center ${
                    i < stats.length - 1
                      ? "border-brown/10 sm:border-r"
                      : ""
                  }`}
                >
                  <span className="font-display text-2xl font-bold text-orange sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-brown/60">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Featured industries — large alternating cards ──────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured sectors"
            title="Specialised programmes for high-compliance sectors"
            subtitle="These industries demand the highest audit standards. Our dedicated programmes ensure zero-observation compliance every time."
          />

          <div className="mt-14 space-y-8">
            {featured.map((industry, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <Reveal key={industry.slug} delay={idx * 0.1}>
                  <div
                    className={`group grid overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium transition-shadow hover:shadow-lift lg:grid-cols-2 ${
                      isReversed ? "" : ""
                    }`}
                  >
                    {/* Image half */}
                    <div
                      className={`relative min-h-65 overflow-hidden sm:min-h-85 ${
                        isReversed ? "lg:order-2" : ""
                      }`}
                    >
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-brown/70 via-brown/20 to-transparent" />

                      {/* Floating icon badge */}
                      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md">
                        <industry.icon className="h-6 w-6" strokeWidth={1.6} />
                      </div>

                      {/* Overlay name (mobile-visible, hidden on lg since text card shows it) */}
                      <div className="absolute bottom-5 left-5 right-5 lg:hidden">
                        <h3 className="font-display text-xl font-bold text-white drop-shadow-lg">
                          {industry.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/80">
                          {industry.short}
                        </p>
                      </div>
                    </div>

                    {/* Text half */}
                    <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${
                      isReversed ? "lg:order-1" : ""
                    }`}>
                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange ring-1 ring-orange/20">
                        <industry.icon className="h-3 w-3" />
                        {industry.name}
                      </div>

                      <h3 className="mt-4 hidden font-display text-2xl font-bold text-brown lg:block">
                        {industry.name}
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-brown/70">
                        {industry.description}
                      </p>

                      {/* Pests covered */}
                      <div className="mt-5">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-brown/60">
                          Pests covered
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {industry.pests.map((pest) => (
                            <span
                              key={pest}
                              className="inline-flex items-center gap-1 rounded-full bg-orange/8 px-2.5 py-1 text-xs font-medium text-orange-ink"
                            >
                              <Bug className="h-3 w-3" />
                              {pest}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Compliance */}
                      <div className="mt-4 border-t border-brown/8 pt-4">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-brown/60">
                          Compliance standards
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {industry.compliance.map((c) => (
                            <span
                              key={c}
                              className="inline-flex items-center gap-1 rounded-lg bg-teal/8 px-2.5 py-1 text-xs font-medium text-teal"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── All industries compact grid ──────────────────────────── */}
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 -z-10 gradient-warm-soft" />
        <div className="absolute inset-0 -z-10 bg-dot-warm opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="All sectors"
            title="Comprehensive pest management across every industry"
            subtitle="Whether you operate a tech park, a school, a manufacturing plant, or a transport hub — we have the expertise and certifications to match."
          />

          <StaggerContainer
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            stagger={0.05}
          >
            {rest.map((industry) => {
              const isOpen = expandedSlug === industry.slug;
              return (
                <StaggerItem key={industry.slug}>
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                      isOpen
                        ? "border-orange/20 ring-1 ring-orange/10"
                        : "border-brown/10"
                    }`}
                  >
                    {/* Top image strip */}
                    <div className="relative h-28 w-full overflow-hidden">
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-brown/60 to-transparent" />

                      {/* Icon */}
                      <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md">
                        <industry.icon
                          className="h-4.5 w-4.5"
                          strokeWidth={1.6}
                        />
                      </div>

                      {/* Name overlay */}
                      <h3 className="absolute bottom-3 left-3 right-3 font-display text-sm font-bold leading-tight text-white drop-shadow-md">
                        {industry.name}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-xs leading-relaxed text-brown/65 line-clamp-2">
                        {industry.short}
                      </p>

                      {/* Pests preview */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {industry.pests.slice(0, 3).map((pest) => (
                          <span
                            key={pest}
                            className="rounded-full bg-brown/5 px-2 py-0.5 text-[10px] font-medium text-brown/65"
                          >
                            {pest}
                          </span>
                        ))}
                        {industry.pests.length > 3 && (
                          <span className="rounded-full bg-orange/8 px-2 py-0.5 text-[10px] font-semibold text-orange-ink">
                            +{industry.pests.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Compliance row */}
                      <div className="mt-3 flex items-center gap-1.5 border-t border-brown/5 pt-2.5 text-[11px] text-brown/70">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-teal" />
                        <span className="truncate">
                          {industry.compliance[0]}
                        </span>
                        {industry.compliance.length > 1 && (
                          <span className="text-brown/40">
                            +{industry.compliance.length - 1}
                          </span>
                        )}
                      </div>

                      {/* Expand toggle */}
                      <button
                        onClick={() =>
                          setExpandedSlug(isOpen ? null : industry.slug)
                        }
                        className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-brown/10 bg-brown/2 py-2 text-[11px] font-semibold uppercase tracking-wider text-brown/60 transition-colors hover:bg-orange/8 hover:text-orange"
                      >
                        {isOpen ? "Show less" : "View details"}
                        <ChevronRight
                          className={`h-3 w-3 transition-transform duration-200 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {/* Expanded detail */}
                      {isOpen && (
                        <div className="mt-3 border-t border-brown/8 pt-3 text-xs leading-relaxed text-brown/70">
                          {industry.description}
                          <div className="mt-3">
                            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-brown/60">
                              All compliance standards
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {industry.compliance.map((c) => (
                                <span
                                  key={c}
                                  className="inline-flex items-center gap-1 rounded-lg bg-teal/8 px-2 py-0.5 text-[11px] font-medium text-teal"
                                >
                                  <CheckCircle2 className="h-2.5 w-2.5" />
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Commercial IPM callout ─────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium-lg">
              <div className="grid lg:grid-cols-5">
                {/* Left — dark panel */}
                <div className="relative overflow-hidden bg-linear-to-br from-brown to-[#1a0f08] p-8 text-white lg:col-span-2 lg:p-10">
                  {/* Decorative glow */}
                  <div
                    className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full opacity-30 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, #D77005 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold text-orange ring-1 ring-orange/30">
                      <FileText className="h-3 w-3" />
                      Commercial IPM
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-tight">
                      One vendor, three cities, every audit covered
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">
                      Multi-site commercial contracts include a dedicated account
                      manager, tamper-proof monitoring stations, scheduled service
                      visits, and a documentation portal your QA team can access
                      24/7.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.02]"
                    >
                      Get a commercial quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Right — feature grid */}
                <div className="grid content-start gap-0 sm:grid-cols-2 lg:col-span-3">
                  {[
                    "Single contract across Hyderabad, Chennai, Bangalore",
                    "Dedicated account manager + 4-hour response SLA",
                    "Digital service reports with photo evidence",
                    "Trend analytics dashboard for QA teams",
                    "FSSAI, HACCP, ISO 22000, NABH audit attendance",
                    "Tamper-proof monitoring stations included",
                    "Out-of-hours emergency response",
                    "Consolidated monthly invoicing with GST",
                  ].map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 border-b border-brown/5 px-6 py-4 ${
                        i >= 4 ? "sm:border-t-0" : ""
                      }`}
                    >
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span className="text-sm text-brown/75">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <CTASection
        title="Let's design your commercial IPM programme"
        subtitle="Free facility risk assessment, fixed-quote proposal, dedicated account manager. Multi-site contracts across all three cities."
      />
    </>
  );
}
