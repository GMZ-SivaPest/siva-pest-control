"use client";

import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { industries } from "@/data/industries";
import { CheckCircle2, ShieldCheck, ArrowUpRight, FileText } from "lucide-react";

export function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries we serve"
        title="Audit-ready IPM for every sector"
        subtitle="From single-outlet restaurants to multi-specialty hospitals to FMCG manufacturing plants — we have a documented, audit-defensible IPM programme calibrated for your sector's compliance regime."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "Industries" }]}
      />

      {/* Industries grid */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2" stagger={0.06}>
            {industries.map((industry) => (
              <StaggerItem key={industry.slug}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brown/10 bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift sm:p-8">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange/5 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                      <industry.icon className="h-7 w-7" strokeWidth={1.6} />
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-brown">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-orange">
                    {industry.short}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-brown/70">
                    {industry.description}
                  </p>

                  {/* Pests treated */}
                  <div className="mt-5">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/55">
                      Pests covered
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {industry.pests.map((pest) => (
                        <span
                          key={pest}
                          className="rounded-full bg-brown/5 px-2.5 py-0.5 text-[11px] font-medium text-brown/70"
                        >
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Compliance */}
                  <div className="mt-5 border-t border-brown/5 pt-4">
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-brown/55">
                      Compliance standards
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {industry.compliance.map((c) => (
                        <div
                          key={c}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-teal/5 px-2.5 py-1 text-[11px] font-medium text-teal"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Commercial IPM callout */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium">
              <div className="grid lg:grid-cols-3">
                <div className="border-b border-brown/10 bg-gradient-to-br from-brown to-[#1a0f08] p-8 text-white lg:border-b-0 lg:border-r">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold text-orange ring-1 ring-orange/30">
                    <FileText className="h-3 w-3" />
                    Commercial IPM
                  </div>
                  <h3 className="font-display text-2xl font-bold">
                    One vendor, three cities, every audit covered
                  </h3>
                  <p className="mt-2 text-sm text-white/65">
                    Multi-site commercial contracts include a dedicated account manager,
                    tamper-proof monitoring stations, scheduled service visits, and a
                    documentation portal your QA team can access 24/7.
                  </p>
                </div>
                <div className="col-span-2 grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
                  {[
                    "Single contract across Hyderabad, Chennai, Bangalore",
                    "Dedicated account manager + 4-hour response SLA",
                    "Digital service reports with photo evidence",
                    "Trend analytics dashboard for QA teams",
                    "FSSAI, HACCP, ISO 22000, NABH audit attendance",
                    "Tamper-proof monitoring stations included",
                    "Out-of-hours emergency response",
                    "Consolidated monthly invoicing with GST",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                      <span className="text-sm text-brown/75">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's design your commercial IPM programme"
        subtitle="Free facility risk assessment, fixed-quote proposal, dedicated account manager. Multi-site contracts across all three cities."
      />
    </>
  );
}
