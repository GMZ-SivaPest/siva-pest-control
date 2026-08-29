"use client";

import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/site/cta-section";
import { InlineQuoteForm } from "@/components/site/inline-quote-form";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { pestBySlug, pests, type Pest } from "@/data/pests";
import { servicesBySlug } from "@/data/services";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bug,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crosshair,
  Microscope,
  Phone,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const threatStyles: Record<Pest["threat"], string> = {
  high: "bg-rust/10 text-rust ring-rust/20",
  medium: "bg-orange/10 text-orange-ink ring-orange/20",
  low: "bg-teal/10 text-teal ring-teal/20",
};

const threatCopy: Record<Pest["threat"], string> = {
  high: "Treat quickly. High-risk pests can spread disease, damage property, or escalate fast.",
  medium: "Plan a controlled response. These pests usually need targeted treatment before they spread.",
  low: "Monitor and exclude. Low-risk pests still need prevention when activity repeats.",
};

export function PestDetailView({ slug }: { slug: string }) {
  const pest = pestBySlug(slug);

  if (!pest) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-brown">Pest not found</h1>
          <Link
            href="/pests"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to pest library
          </Link>
        </div>
      </div>
    );
  }

  const Icon = pest.icon;
  const service = servicesBySlug(pest.serviceSlug);
  const related = pests
    .filter((item) => item.slug !== pest.slug && item.category === pest.category)
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="absolute inset-0 -z-10 gradient-warm" />
        <div className="absolute inset-0 -z-10 bg-grid-warm opacity-50" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-7 flex flex-wrap items-center gap-1.5 text-xs text-brown/70">
            <Link href="/" className="transition-colors hover:text-orange-ink">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <Link href="/pests" className="transition-colors hover:text-orange-ink">
              Pest Library
            </Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="text-brown/85" aria-current="page">
              {pest.name}
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Reveal y={16}>
                <div
                  className={cn(
                    "mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ring-1",
                    threatStyles[pest.threat]
                  )}
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {pest.threat} threat profile
                </div>
                <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.04] text-brown text-balance sm:text-5xl md:text-[3.5rem]">
                  {pest.name}
                </h1>
                <p className="mt-3 text-sm italic text-brown/55">
                  {pest.scientificName}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brown/70 text-pretty sm:text-lg">
                  {pest.description}
                </p>
              </Reveal>

              <Reveal delay={0.08} y={16}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={service ? `/services/${service.slug}` : "/services"}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.02] gradient-orange"
                  >
                    {service ? service.name : "View treatment"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`tel:${company.phonePrimaryHref}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white/70 px-6 py-3 text-sm font-semibold text-brown backdrop-blur transition-colors hover:border-orange/35 hover:text-orange-ink"
                  >
                    <Phone className="h-4 w-4" />
                    Call specialist
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} y={20}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/45 p-3 shadow-premium backdrop-blur">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-brown">
                  <Image
                    src={pest.image}
                    alt={pest.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 580px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-transparent to-brown/15" />
                  <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 text-orange-ink shadow-premium backdrop-blur">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                    <ImageFact icon={Microscope} label="Category" value={pest.category} />
                    <ImageFact icon={Clock} label="Season" value={pest.seasonality} />
                    <ImageFact icon={ShieldCheck} label="Service" value={service?.name ?? "Inspection"} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-8">
            <InlineQuoteForm serviceName={service?.name ?? `${pest.name} inspection`} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="h-full rounded-2xl border border-brown/10 bg-white p-6 shadow-premium sm:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-ink">
                  <Crosshair className="h-3.5 w-3.5" />
                  Field identification
                </div>
                <h2 className="font-display text-2xl font-bold text-brown">
                  What to look for
                </h2>
                <div className="mt-6 space-y-3">
                  {pest.identification.map((item) => (
                    <SignalRow key={item} icon={Microscope} text={item} />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-brown/10 bg-white p-6 shadow-premium sm:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                  <Search className="h-3.5 w-3.5" />
                  Activity signs
                </div>
                <h2 className="font-display text-2xl font-bold text-brown">
                  Evidence around the property
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pest.signs.map((item) => (
                    <SignalRow key={item} icon={BadgeCheck} text={item} compact />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 -z-10 gradient-warm-soft" />
        <div className="absolute inset-0 -z-10 bg-dot-warm opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="rounded-2xl border border-rust/20 bg-white p-6 shadow-premium sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rust/10 text-rust">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-brown">
                  Risk assessment
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brown/70">
                  {threatCopy[pest.threat]}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-brown/75">
                  {pest.healthRisk}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-brown/10 bg-white p-6 shadow-premium sm:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Prevention plan
                </div>
                <h2 className="font-display text-2xl font-bold text-brown">
                  Practical steps before treatment
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pest.prevention.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl bg-brown/[0.035] p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                      <span className="text-sm leading-relaxed text-brown/70">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {service && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="grid overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-premium lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[300px] bg-brown">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/75 via-brown/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20 backdrop-blur">
                      Matched service
                    </div>
                    <h2 className="mt-3 font-display text-3xl font-bold text-white">
                      {service.name}
                    </h2>
                  </div>
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <p className="text-base leading-relaxed text-brown/70">
                    {service.short}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <TreatmentFact label="Duration" value={service.duration} />
                    <TreatmentFact label="Warranty" value={service.warranty} />
                    <TreatmentFact label="Type" value={service.treatment} />
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow-orange gradient-orange"
                    >
                      View service protocol
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/pests"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 px-6 py-3 text-sm font-semibold text-brown transition-colors hover:border-orange/35 hover:text-orange-ink"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to library
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brown/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brown/70">
                  <Bug className="h-3.5 w-3.5 text-orange-ink" />
                  Related profiles
                </div>
                <h2 className="font-display text-2xl font-bold text-brown">
                  More {pest.category} pests
                </h2>
              </div>
              <Link
                href="/pests"
                className="hidden text-sm font-semibold text-orange-ink hover:underline sm:inline"
              >
                View all
              </Link>
            </div>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <StaggerItem key={item.slug}>
                  <RelatedPestCard pest={item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <CTASection
        title={`Need help with ${pest.name.toLowerCase()} activity?`}
        subtitle="Book a professional inspection and get a fixed treatment recommendation from a certified Siva technician."
      />
    </>
  );
}

function ImageFact({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl bg-white/15 px-3 py-2 text-white ring-1 ring-white/20 backdrop-blur">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/65">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="mt-1 truncate text-xs font-semibold capitalize">{value}</div>
    </div>
  );
}

function SignalRow({
  icon: Icon,
  text,
  compact = false,
}: {
  icon: LucideIcon;
  text: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl bg-brown/[0.035]",
        compact ? "p-3" : "p-4"
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-ink" />
      <span className="text-sm leading-relaxed text-brown/70">{text}</span>
    </div>
  );
}

function TreatmentFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-brown/15 pl-4">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/45">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold capitalize text-brown">{value}</div>
    </div>
  );
}

function RelatedPestCard({ pest }: { pest: Pest }) {
  return (
    <Link
      href={`/pests/${pest.slug}`}
      className="group flex overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative h-32 w-32 flex-shrink-0 bg-brown">
        <Image
          src={pest.image}
          alt={pest.name}
          fill
          sizes="128px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brown/10" />
      </div>
      <div className="min-w-0 flex-1 p-4">
        <div
          className={cn(
            "mb-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1",
            threatStyles[pest.threat]
          )}
        >
          {pest.threat}
        </div>
        <h3 className="font-display text-sm font-bold text-brown">{pest.name}</h3>
        <p className="mt-1 text-xs italic text-brown/55">{pest.scientificName}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-ink">
          Open profile
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
