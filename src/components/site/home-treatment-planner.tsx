"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bug,
  CalendarClock,
  ChevronRight,
  Crosshair,
  Home,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./reveal";
import { pestBySlug } from "@/data/pests";
import { servicesBySlug } from "@/data/services";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";

const PROBLEMS = [
  {
    id: "cockroach",
    label: "Kitchen roaches",
    symptom: "Night sightings, pepper-like droppings, musty cabinets",
    pestSlug: "german-cockroach",
    serviceSlug: "cockroach-gel-treatment",
    fit: "Best for homes, cafes, cloud kitchens, and office pantries",
  },
  {
    id: "termite",
    label: "Termite damage",
    symptom: "Mud tubes, hollow wood, bubbling paint, discarded wings",
    pestSlug: "subterranean-termite",
    serviceSlug: "termite-control",
    fit: "Best for villas, apartments, offices, and warehouses",
  },
  {
    id: "rodent",
    label: "Rats or mice",
    symptom: "Droppings, gnaw marks, ceiling sounds, wiring damage",
    pestSlug: "house-rat",
    serviceSlug: "rodent-control",
    fit: "Best for homes, restaurants, stores, and factories",
  },
  {
    id: "mosquito",
    label: "Mosquito pressure",
    symptom: "Dawn bites, standing water, garden or terrace activity",
    pestSlug: "aedes-mosquito",
    serviceSlug: "mosquito-control",
    fit: "Best for homes, schools, communities, and events",
  },
  {
    id: "bed-bug",
    label: "Bed bugs",
    symptom: "Linear bites, blood stains, mattress seam activity",
    pestSlug: "bed-bug",
    serviceSlug: "bed-bugs-treatment",
    fit: "Best for bedrooms, PGs, hotels, and staff housing",
  },
  {
    id: "commercial",
    label: "Audit readiness",
    symptom: "Fly activity, recurring pest logs, FSSAI/HACCP pressure",
    pestSlug: "housefly",
    serviceSlug: "commercial-ipm",
    fit: "Best for restaurants, hotels, hospitals, and food units",
  },
];

export function HomeTreatmentPlanner() {
  const [activeId, setActiveId] = useState(PROBLEMS[0].id);
  const activeProblem = PROBLEMS.find((problem) => problem.id === activeId) ?? PROBLEMS[0];

  const recommendation = useMemo(() => {
    const pest = pestBySlug(activeProblem.pestSlug);
    const service = servicesBySlug(activeProblem.serviceSlug);
    return { pest, service };
  }, [activeProblem]);

  const { pest, service } = recommendation;

  return (
    <section className="relative overflow-hidden bg-ivory py-16 md:py-20">
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-20" />
      <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-brown/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal y={16}>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-ink ring-1 ring-orange/20">
              <Crosshair className="h-3.5 w-3.5" />
              Find the right protocol
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.08] text-brown text-balance sm:text-4xl md:text-[2.85rem]">
              Start with what you are seeing. We map it to the right treatment.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brown/70 text-pretty">
              A clean pest-control website should help people decide quickly.
              Choose a symptom and see the pest profile, treatment method,
              warranty, and next step without hunting through every service.
            </p>
          </Reveal>

          <Reveal delay={0.08} y={16}>
            <div className="grid gap-3 sm:grid-cols-3">
              <PlannerMetric icon={Home} label="Use case" value="Home + business" />
              <PlannerMetric icon={CalendarClock} label="Response" value="Same-day slots" />
              <PlannerMetric icon={ShieldCheck} label="Warranty" value="Written cover" />
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {PROBLEMS.map((problem) => {
                const optionPest = pestBySlug(problem.pestSlug);
                const active = problem.id === activeId;

                return (
                  <button
                    key={problem.id}
                    type="button"
                    onClick={() => setActiveId(problem.id)}
                    className={cn(
                      "group grid min-h-[126px] grid-cols-[86px_1fr] overflow-hidden rounded-2xl border bg-white text-left shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-lift",
                      active
                        ? "border-orange/35 ring-2 ring-orange/15"
                        : "border-brown/10"
                    )}
                  >
                    <span className="relative h-full min-h-[126px] overflow-hidden bg-brown">
                      {optionPest && (
                        <Image
                          src={optionPest.image}
                          alt=""
                          fill
                          sizes="86px"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute inset-0 bg-brown/15" />
                    </span>
                    <span className="flex min-w-0 flex-col justify-between p-4">
                      <span>
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-full",
                              active
                                ? "bg-orange text-white"
                                : "bg-brown/[0.05] text-brown/60"
                            )}
                          >
                            <Bug className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-display text-sm font-bold text-brown">
                            {problem.label}
                          </span>
                        </span>
                        <span className="mt-2 block text-xs leading-relaxed text-brown/65">
                          {problem.symptom}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-3 text-[10px] font-semibold uppercase tracking-wider",
                          active ? "text-orange-ink" : "text-brown/40"
                        )}
                      >
                        {active ? "Selected" : "Select"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-premium">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProblem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                    <div className="relative min-h-[320px] bg-brown">
                      {service && (
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 420px"
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brown/82 via-brown/15 to-transparent" />
                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20 backdrop-blur">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Recommended
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                          Matched service
                        </p>
                        <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-white">
                          {service?.name ?? "Professional inspection"}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap gap-2">
                        {pest && (
                          <Link
                            href={`/pests/${pest.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-brown/[0.04] px-3 py-1 text-xs font-semibold text-brown/70 transition-colors hover:text-orange-ink"
                          >
                            <Bug className="h-3.5 w-3.5 text-orange-ink" />
                            {pest.name}
                          </Link>
                        )}
                        {service && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            {service.warranty}
                          </span>
                        )}
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-brown/70 sm:text-base">
                        {service?.short ??
                          "Our technician verifies pest species, activity level, entry points, and the safest treatment route before quoting."}
                      </p>

                      <div className="mt-6 divide-y divide-brown/10 border-y border-brown/10">
                        {[
                          ["Best fit", activeProblem.fit],
                          ["Typical duration", service?.duration ?? "Inspection dependent"],
                          ["Treatment type", service?.treatment ?? "Inspection"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="flex items-center justify-between gap-4 py-3 text-sm"
                          >
                            <span className="text-brown/55">{label}</span>
                            <span className="text-right font-semibold capitalize text-brown">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={service ? `/services/${service.slug}` : "/services"}
                          onClick={() =>
                            trackCTAClick({
                              location: "home-treatment-planner",
                              label: "View protocol",
                              href: service ? `/services/${service.slug}` : "/services",
                            })
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-glow-orange gradient-orange"
                        >
                          View protocol
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                          href={`tel:${company.phonePrimaryHref}`}
                          onClick={() =>
                            trackPhoneClick({
                              location: "home-treatment-planner",
                              phone: company.phonePrimary,
                            })
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 px-5 py-3 text-sm font-semibold text-brown transition-colors hover:border-orange/35 hover:text-orange-ink"
                        >
                          <Phone className="h-4 w-4" />
                          Call team
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-brown/60">
            <span>Photo-based pest ID available during business hours</span>
            <ChevronRight className="hidden h-3 w-3 opacity-45 sm:block" />
            <span>No blanket spraying without diagnosis</span>
            <ChevronRight className="hidden h-3 w-3 opacity-45 sm:block" />
            <span>Service reports for homes and commercial audits</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlannerMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="border-l border-brown/15 bg-white/65 px-4 py-3 shadow-premium backdrop-blur">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-brown/50">
        <Icon className="h-3.5 w-3.5 text-orange-ink" />
        {label}
      </div>
      <div className="mt-1 font-display text-sm font-bold text-brown">{value}</div>
    </div>
  );
}
