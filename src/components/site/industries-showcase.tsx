"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { SectionHeading } from "./section-heading";
import { industries } from "@/data/industries";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function IndustriesShowcase() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="absolute inset-0 -z-10 gradient-warm-soft" />
      <div className="absolute inset-0 -z-10 bg-dot-warm opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries we serve"
          title="Audit-ready pest control for every sector"
          subtitle="From single-outlet restaurants to 200-store QSR chains, from boutique hotels to multi-specialty hospitals — we have a documented, audit-defensible IPM programme for your sector."
        />

        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {industries.map((industry) => (
            <StaggerItem key={industry.slug}>
              <Link
                href="/industries"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white text-left shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Industry image */}
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(51,36,22,0) 30%, rgba(51,36,22,0.85) 100%)",
                    }}
                  />
                  <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md">
                    <industry.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
                  </div>
                  <h3 className="absolute bottom-3 left-3 right-3 font-display text-sm font-bold leading-tight text-white drop-shadow-md">
                    {industry.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="flex-1 text-xs leading-relaxed text-brown/65 line-clamp-2">
                    {industry.short}
                  </p>

                  {/* Pests treated */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {industry.pests.slice(0, 3).map((pest) => (
                      <span
                        key={pest}
                        className="rounded-full bg-brown/5 px-2 py-0.5 text-[10px] font-medium text-brown/65"
                      >
                        {pest}
                      </span>
                    ))}
                  </div>

                  {/* Compliance row */}
                  <div className="mt-3 flex items-center gap-1.5 border-t border-brown/5 pt-2.5 text-[11px] text-brown/70">
                    <CheckCircle2 className="h-3 w-3 text-teal" />
                    <span className="truncate">{industry.compliance[0]}</span>
                    {industry.compliance.length > 1 && (
                      <span className="text-brown/40">
                        +{industry.compliance.length - 1}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
