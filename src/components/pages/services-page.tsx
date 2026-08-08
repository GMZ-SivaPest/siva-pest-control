"use client";

import { PageHero } from "@/components/site/page-hero";
import { ServicesGrid } from "@/components/site/services-grid";
import { CTASection } from "@/components/site/cta-section";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ShieldCheck, Clock, BadgeIndianRupee, Phone } from "lucide-react";

const promises = [
  {
    icon: BadgeIndianRupee,
    title: "Fixed-price quotes, no upsell",
    description:
      "You receive a fixed-price quote before any work begins. No surprise charges at the door, no upsell add-ons, no 'while we're here' fees.",
  },
  {
    icon: Clock,
    title: "On-time or it's free",
    description:
      "If our technician is more than 30 minutes late to a scheduled appointment without notice, your service is free. We respect your time.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty honoured without paperwork",
    description:
      "Pests return within warranty? Call us. We come back, re-treat, no questions, no service charge, no fine print.",
  },
];

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Premium pest control, end to end"
        subtitle="From odourless cockroach gel-bait to 5-year termite barriers to FSSAI-compliant commercial IPM — every service is child-safe, documented, and warranty-backed."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "Services" }]}
      />

      {/* Promises strip */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-brown/10 bg-white p-5 shadow-premium">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-brown">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-brown/65">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid showHeading={false} />

      <CTASection
        title="Not sure which service you need?"
        subtitle="Share what you're seeing and our team will recommend the right protocol — no obligation, no upsell."
      />
    </>
  );
}
