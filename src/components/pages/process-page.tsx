"use client";

import { PageHero } from "@/components/site/page-hero";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { CTASection } from "@/components/site/cta-section";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ShieldCheck, Microscope, FileText, Clock, Award } from "lucide-react";

const standards = [
  {
    icon: Microscope,
    title: "Calibrated inspection protocols",
    description:
      "Every inspection follows a documented checklist calibrated for South Indian pest species, construction patterns, and climate. No technician improvises.",
  },
  {
    icon: ShieldCheck,
    title: "CIB & RC registered products only",
    description:
      "We use only products registered with the Central Insecticides Board. No grey-market actives, no off-label use, no experimental formulations on your property.",
  },
  {
    icon: FileText,
    title: "Photo-documented service reports",
    description:
      "Every visit generates a digital report with photo evidence of treatment points, product batch numbers, and re-entry advisories. Emailed to you within 24 hours.",
  },
  {
    icon: Clock,
    title: "Scheduled follow-up, not 'call if needed'",
    description:
      "Most services include a calendar-scheduled follow-up visit. We don't wait for you to notice a problem — we proactively verify colony collapse or activity drop.",
  },
  {
    icon: Award,
    title: "Honoured warranties, no fine print",
    description:
      "Read our warranty terms. They're plain English, no asterisks, no 'void if' clauses. If pests return within warranty, we return free. Period.",
  },
];

export function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A documented process, start to warranty"
        subtitle="No surprises, no upsell at the door. Five clear steps, every visit photo-documented, every warranty honoured without paperwork."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "Process" }]}
      />

      <ProcessTimeline />

      {/* Standards */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quality standards"
            title="Five standards behind every treatment"
            subtitle="These aren't marketing claims — they're documented operating procedures audited under ISO 9001:2015."
          />

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {standards.map((standard, i) => (
              <StaggerItem key={standard.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-brown/10 bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                    <standard.icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/65">
                    Standard 0{i + 1}
                  </div>
                  <h3 className="mt-1 font-display text-base font-bold leading-tight text-brown">
                    {standard.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown/65">
                    {standard.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What's included callout */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium">
              <div className="grid lg:grid-cols-3">
                <div className="border-b border-brown/10 bg-gradient-to-br from-brown to-[#1a0f08] p-8 text-white lg:border-b-0 lg:border-r">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold text-orange ring-1 ring-orange/30">
                    <ShieldCheck className="h-3 w-3" />
                    Every service includes
                  </div>
                  <h3 className="font-display text-2xl font-bold">
                    No hidden charges, ever
                  </h3>
                  <p className="mt-2 text-sm text-white/65">
                    What you see in the quote is what you pay. Here's what every service includes
                    — at no additional cost.
                  </p>
                </div>
                <div className="col-span-2 grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
                  {[
                    "Free on-site inspection (termite, rodent, commercial)",
                    "Fixed-price quote before any work begins",
                    "Photo-documented service report",
                    "Written re-treatment warranty",
                    "Scheduled follow-up visit (per service)",
                    "Safety data sheet on request",
                    "Prevention advisory report",
                    "Priority support line for warranty claims",
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

      <CTASection />
    </>
  );
}
