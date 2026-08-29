"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/site/cta-section";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { pestBySlug, pestCategories, pests, type Pest } from "@/data/pests";
import { servicesBySlug } from "@/data/services";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bug,
  ChevronRight,
  Clock,
  Microscope,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const threatStyles: Record<Pest["threat"], string> = {
  high: "bg-rust/10 text-rust ring-rust/20",
  medium: "bg-orange/10 text-orange-ink ring-orange/20",
  low: "bg-teal/10 text-teal ring-teal/20",
};

const threatDotStyles: Record<Pest["threat"], string> = {
  high: "bg-rust",
  medium: "bg-orange",
  low: "bg-teal",
};

const categoryAccent: Record<Pest["category"], string> = {
  insect: "from-orange/20 to-white",
  rodent: "from-brown/15 to-white",
  arachnid: "from-teal/20 to-white",
  bird: "from-teal/15 to-white",
  reptile: "from-rust/15 to-white",
  mammal: "from-sand/35 to-white",
  other: "from-ivory-deep to-white",
};

const heroPests = [
  pestBySlug("subterranean-termite"),
  pestBySlug("german-cockroach"),
  pestBySlug("aedes-mosquito"),
  pestBySlug("house-rat"),
].filter(Boolean) as Pest[];

const quickSignals = [
  { icon: Microscope, label: "Field ID", value: "Visual markers" },
  { icon: AlertTriangle, label: "Risk", value: "Health and damage" },
  { icon: ShieldCheck, label: "Response", value: "Matched service" },
];

export function PestLibraryPage() {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pests.filter((pest) => {
      const matchesCat = category === "all" || pest.category === category;
      const matchesSearch =
        !query ||
        pest.name.toLowerCase().includes(query) ||
        pest.scientificName.toLowerCase().includes(query) ||
        pest.description.toLowerCase().includes(query) ||
        pest.signs.some((sign) => sign.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [category, search]);

  const highThreatCount = pests.filter((pest) => pest.threat === "high").length;
  const categoryCount = new Set(pests.map((pest) => pest.category)).size;
  const selectedCategoryLabel =
    pestCategories.find((cat) => cat.id === category)?.label ?? "All pests";

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="absolute inset-0 -z-10 gradient-warm" />
        <div className="absolute inset-0 -z-10 bg-grid-warm opacity-50" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-background to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-7 flex items-center gap-1.5 text-xs text-brown/70">
            <Link href="/" className="transition-colors hover:text-orange-ink">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="text-brown/85" aria-current="page">
              Pest Library
            </span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <Reveal y={16}>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-ink ring-1 ring-orange/20 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" />
                  Pest intelligence library
                </div>
                <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] text-brown text-balance sm:text-5xl md:text-[3.5rem]">
                  Identify the pest before it becomes a treatment problem.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brown/70 text-pretty sm:text-lg">
                  Browse the pests Siva treats most often across South Indian
                  homes, kitchens, offices, factories, campuses, and apartment
                  communities. Each guide shows identification cues, risk level,
                  seasonal behavior, and the right control protocol.
                </p>
              </Reveal>

              <Reveal delay={0.08} y={16}>
                <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
                  {quickSignals.map((item) => (
                    <div
                      key={item.label}
                      className="border-l border-brown/15 bg-white/55 px-4 py-3 backdrop-blur"
                    >
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-brown/55">
                        <item.icon className="h-3.5 w-3.5 text-orange-ink" />
                        {item.label}
                      </div>
                      <div className="mt-1 font-display text-sm font-bold text-brown">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.16} y={16}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#pest-index"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.02] gradient-orange"
                  >
                    Browse pest index
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white/70 px-6 py-3 text-sm font-semibold text-brown backdrop-blur transition-colors hover:border-orange/35 hover:text-orange-ink"
                  >
                    Send a photo for ID
                    <Search className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} y={20}>
              <div className="relative min-h-[460px]">
                <div className="absolute inset-0 rounded-[2rem] border border-white/70 bg-white/40 shadow-premium backdrop-blur" />
                <div className="absolute inset-3 rounded-[1.55rem] border border-brown/10 bg-brown/[0.03]" />
                <div className="relative grid h-full min-h-[460px] grid-cols-2 grid-rows-5 gap-3 p-4">
                  {heroPests.map((pest, index) => (
                    <Link
                      key={pest.slug}
                      href={`/pests/${pest.slug}`}
                      className={cn(
                        "group relative overflow-hidden rounded-2xl bg-brown shadow-premium",
                        index === 0 && "col-span-2 row-span-3",
                        index > 0 && "row-span-2"
                      )}
                    >
                      <Image
                        src={pest.image}
                        alt={pest.name}
                        fill
                        priority={index === 0}
                        sizes={
                          index === 0
                            ? "(max-width: 1024px) 100vw, 600px"
                            : "(max-width: 1024px) 50vw, 280px"
                        }
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/20 to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white ring-1 ring-white/20 backdrop-blur">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            threatDotStyles[pest.threat]
                          )}
                        />
                        {pest.threat} threat
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="font-display text-lg font-bold leading-tight text-white">
                          {pest.name}
                        </h2>
                        <p className="mt-1 text-xs italic text-white/75">
                          {pest.scientificName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <LibraryStat label="Pest profiles" value={`${pests.length}+`} />
            <LibraryStat label="Threat markers" value={`${highThreatCount} high`} />
            <LibraryStat label="Biological groups" value={`${categoryCount}`} />
          </div>
        </div>
      </section>

      <section id="pest-index" className="scroll-mt-24 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal ring-1 ring-teal/15">
                <Bug className="h-3.5 w-3.5" />
                {selectedCategoryLabel}
              </div>
              <h2 className="font-display text-3xl font-bold text-brown sm:text-4xl">
                Pest index
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brown/65 sm:text-base">
                Filter by biological group or search by species, risk, signs,
                or common activity clues.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brown/40" />
              <input
                type="text"
                placeholder="Search pests, signs, risks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-12 w-full rounded-full border border-brown/15 bg-white pl-11 pr-4 text-sm text-brown shadow-premium placeholder:text-brown/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 thin-scroll">
            {pestCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "inline-flex h-10 flex-shrink-0 items-center rounded-full px-4 text-sm font-semibold transition-all",
                  category === cat.id
                    ? "bg-brown text-white shadow-premium"
                    : "border border-brown/15 bg-white/70 text-brown/70 hover:border-orange/35 hover:text-orange-ink"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="border border-brown/10 bg-white px-6 py-14 text-center shadow-premium">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brown/5 text-brown/45">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-brown">
                No pests found
              </h3>
              <p className="mt-1 text-sm text-brown/65">
                Try a different search term or category filter.
              </p>
            </div>
          ) : (
            <StaggerContainer
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.04}
            >
              {filtered.map((pest) => (
                <StaggerItem key={pest.slug}>
                  <PestIndexCard pest={pest} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <CTASection
        title="Not sure which pest you are dealing with?"
        subtitle="Send us a photo on WhatsApp and our team will identify it during business hours, then recommend the right control protocol."
      />
    </>
  );
}

function LibraryStat({ label, value }: { label: string; value: string }) {
  return (
    <Reveal>
      <div className="border-y border-brown/10 bg-white/60 px-5 py-4 backdrop-blur">
        <div className="font-display text-3xl font-bold text-brown">{value}</div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-brown/55">
          {label}
        </div>
      </div>
    </Reveal>
  );
}

function PestIndexCard({ pest }: { pest: Pest }) {
  const Icon = pest.icon;
  const service = servicesBySlug(pest.serviceSlug);
  const primarySign = pest.signs[0] ?? pest.identification[0];

  return (
    <Link
      href={`/pests/${pest.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div
        className={cn(
          "relative h-56 overflow-hidden bg-gradient-to-br",
          categoryAccent[pest.category]
        )}
      >
        <Image
          src={pest.image}
          alt={pest.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/10 to-transparent" />
        <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-orange-ink shadow-premium backdrop-blur">
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </div>
        <span
          className={cn(
            "absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 backdrop-blur",
            threatStyles[pest.threat]
          )}
        >
          {pest.threat} threat
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-xl font-bold leading-tight text-white">
            {pest.name}
          </h3>
          <p className="mt-1 text-xs italic text-white/75">{pest.scientificName}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brown/[0.04] px-2.5 py-1 text-[11px] font-semibold capitalize text-brown/70">
            <BadgeCheck className="h-3 w-3 text-teal" />
            {pest.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brown/[0.04] px-2.5 py-1 text-[11px] font-semibold text-brown/70">
            <Clock className="h-3 w-3 text-orange-ink" />
            {pest.seasonality}
          </span>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-brown/65 line-clamp-3">
          {pest.description}
        </p>

        <div className="mt-5 border-t border-brown/10 pt-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/45">
            Common signal
          </div>
          <p className="mt-1 text-xs leading-relaxed text-brown/70 line-clamp-2">
            {primarySign}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/45">
              Treatment
            </div>
            <div className="truncate text-xs font-semibold text-brown">
              {service?.name ?? pest.serviceSlug.replace(/-/g, " ")}
            </div>
          </div>
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange-ink transition-colors group-hover:bg-orange group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
