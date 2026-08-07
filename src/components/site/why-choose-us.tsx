"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { SectionHeading } from "./section-heading";
import {
  ShieldCheck,
  Baby,
  Clock,
  BadgeCheck,
  FileText,
  Microscope,
  HeartPulse,
  Leaf,
} from "lucide-react";

const reasons = [
  {
    icon: Baby,
    title: "Child-safe first, always",
    description:
      "If a product isn't safe for a crawling toddler, we don't use it in your home. Our residential protocols are gel-bait, mechanical, or exclusion only — no broadcast spraying in living areas.",
    accent: "orange",
  },
  {
    icon: ShieldCheck,
    title: "Written warranties on every service",
    description:
      "180-day warranty on cockroach gel, 90-day on bed bugs and rodents, 5-year on termite, 3-year on bird netting. If pests return within warranty, we return free — no paperwork, no questions.",
    accent: "teal",
  },
  {
    icon: Microscope,
    title: "Science-led protocols",
    description:
      "Every protocol is calibrated for South Indian pest species, climate, and construction. We use transferable actives, pheromone monitoring, and integrated pest management — not blanket chemical spraying.",
    accent: "brown",
  },
  {
    icon: Clock,
    title: "2-hour response window",
    description:
      "Local field teams in each city mean we reach you faster. Most pin codes in Hyderabad, Chennai and Bangalore have a 2-hour response window — no waiting days for a technician.",
    accent: "orange",
  },
  {
    icon: BadgeCheck,
    title: "Certified, employed technicians",
    description:
      "Our technicians are full-time employees (not contractors) trained at our internal academy. Background-verified, photo-ID carrying, uniform-wearing. Consistent quality, every visit.",
    accent: "teal",
  },
  {
    icon: FileText,
    title: "Audit-ready documentation",
    description:
      "Every visit generates a digital service report with photo evidence. Commercial clients get trend analytics and a documentation portal for FSSAI, HACCP, ISO and NABH audits.",
    accent: "brown",
  },
  {
    icon: HeartPulse,
    title: "Healthcare-grade safety",
    description:
      "We service hospitals, ICUs, and sterile stores with odour-free, hospital-grade formulations. NABH-compliant documentation. Zero disruption to patient care.",
    accent: "orange",
  },
  {
    icon: Leaf,
    title: "Green Pro certified",
    description:
      "We're a Green Pro Service Provider — recognised for reduced-environmental-impact pest management. Bti larvicides, exclusion-first rodent control, and humane bird management.",
    accent: "teal",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Siva"
          title="Eight reasons families and businesses choose us"
          subtitle="Premium pest control is not about stronger chemicals — it's about smarter protocols, better people, and accountability that lasts beyond the visit."
        />

        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-brown/10 bg-white p-5 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift">
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                    reason.accent === "orange"
                      ? "bg-orange/10 text-orange"
                      : reason.accent === "teal"
                      ? "bg-teal/10 text-teal"
                      : "bg-brown/10 text-brown"
                  }`}
                >
                  <reason.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-base font-bold leading-tight text-brown">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown/65">
                  {reason.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
