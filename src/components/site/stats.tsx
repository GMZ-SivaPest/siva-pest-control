"use client";

import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { SectionHeading } from "./section-heading";
import { CountUp } from "./count-up";
import { Home, Building2, Clock, ShieldCheck } from "lucide-react";
import { company } from "@/data/company";

const stats = [
  {
    icon: Home,
    value: company.stats.homesProtected,
    suffix: "+",
    label: "Homes protected",
    sublabel: `Across 3 cities since ${company.foundedYear}`,
    accent: "orange",
  },
  {
    icon: Building2,
    value: company.stats.commercialSites,
    suffix: "+",
    label: "Commercial sites",
    sublabel: "Restaurants, hotels, warehouses",
    accent: "teal",
  },
  {
    icon: Clock,
    value: company.stats.avgResponseMins,
    suffix: " min",
    label: "Average response time",
    sublabel: "Within city coverage zones",
    accent: "brown",
  },
  {
    icon: ShieldCheck,
    value: company.stats.warrantyDays,
    suffix: " days",
    label: "Service warranty",
    sublabel: "Free re-treatment guarantee",
    accent: "orange",
  },
];

export function Stats() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="By the numbers"
          title="Trust earned, one treatment at a time"
          subtitle={`${company.yearsOfExperience}+ years of protecting South Indian homes and businesses — backed by data, not just promises.`}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="group relative overflow-hidden rounded-2xl border border-brown/10 bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift">
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-30"
                  style={{
                    background:
                      stat.accent === "orange"
                        ? "#D77005"
                        : stat.accent === "teal"
                        ? "#719899"
                        : "#332416",
                  }}
                />
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                    stat.accent === "orange"
                      ? "bg-orange/10 text-orange"
                      : stat.accent === "teal"
                      ? "bg-teal/10 text-teal"
                      : "bg-brown/10 text-brown"
                  }`}
                >
                  <stat.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="font-display text-3xl font-bold text-brown sm:text-4xl">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2200} />
                </div>
                <div className="mt-2 text-sm font-semibold text-brown">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs text-brown/65">
                  {stat.sublabel}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
