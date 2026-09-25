"use client";

import Link from "next/link";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { SectionHeading } from "./section-heading";
import {
  ShieldCheck,
  Clock,
  BadgeCheck,
  FileText,
  Microscope,
  HeartPulse,
  Leaf,
  SprayCan,
  Wind,
} from "lucide-react";

/**
 * WhyChooseUs — the "Why Siva" block on /about.
 *
 * The headline differentiators we sell with are the CHEMICALS and the SAFETY
 * PROFILE of the household pest service, so the cards are ordered around them
 * first — eco-friendliness, safety for pregnant women / kids / elderly, and the
 * choice between odour-controlled and fully odourless high-quality products.
 */
const reasons = [
  {
    icon: Leaf,
    title: "Eco-friendly household pest chemicals",
    description:
      "Our residential pest chemical services run on eco-friendly formulations — Bti larvicides, gel baits and low-toxicity actives chosen for their safety profile first and kill rate second. Green Pro certified, with humane, exclusion-first protocols that cut chemical load instead of maximising it.",
    accent: "teal",
  },
  {
    icon: HeartPulse,
    title: "Safe for pregnant women, kids & the elderly",
    description:
      "Tell us who lives in the house and we select accordingly. We default to gel-bait, mechanical and exclusion methods in occupied rooms — no broadcast spraying in living areas, no evacuation needed, and clear re-entry guidance before we start.",
    accent: "orange",
  },
  {
    icon: SprayCan,
    title: "High-quality chemicals — your choice of odour",
    description:
      "We carry premium, CIB & RC registered products in both odour-controlled and completely odourless variants. Ask for odourless if you have asthma, allergies, a newborn, or simply don't want a smell in your home — we quote and treat to that choice.",
    accent: "brown",
  },
  {
    icon: BadgeCheck,
    title: "Certified & licensed pest service provider",
    description:
      "A licensed provider, not a handyman with a sprayer. ISO 9001:2015, ISO 14001, FSSAI compliant, IPCA member and a Green Pro Service Provider. Every product we use is CIB & RC registered, with batch numbers on your service report.",
    accent: "teal",
  },
  {
    icon: ShieldCheck,
    title: "Written warranties on every service",
    description:
      "180-day warranty on cockroach gel, 90-day on bed bugs and rodents, 5-year on termite, 3-year on bird netting. If pests return within warranty, we return free — no paperwork, no questions.",
    accent: "orange",
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
    title: "30-minute average response",
    description:
      "Local field teams in each state mean we reach you faster. Most pin codes across Andhra Pradesh and Telangana see a 30-minute average response time — no waiting days for a technician.",
    accent: "orange",
  },
  {
    icon: FileText,
    title: "Audit-ready documentation",
    description:
      "Every visit generates a digital service report with photo evidence, product batch numbers and a safety data sheet. Commercial clients get trend analytics and a documentation portal for FSSAI, HACCP, ISO and NABH audits.",
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

        {/* Odour-choice callout — the single most-asked household question */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-orange/20 bg-orange/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Wind
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-base font-bold text-brown">
                  Odour-controlled or fully odourless — your call
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-brown/65">
                  Same high-quality chemistry, same written warranty. If anyone
                  in the home is pregnant, elderly, a child, or asthmatic, we
                  quote you the odourless protocol by default.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex flex-shrink-0 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.02] gradient-orange"
            >
              Request a Quote
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
