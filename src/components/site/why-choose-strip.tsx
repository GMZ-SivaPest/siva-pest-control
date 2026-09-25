"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, HeartPulse, Leaf, SprayCan, BadgeCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";

/**
 * WhyChooseStrip — compact 4-card image strip for the homepage.
 *
 * Replaces the heavier <WhyChooseUs /> (8 cards, no images) on the homepage.
 * The four cards here are the household-pest headline claims: eco-friendly
 * chemicals, safety for pregnant women / kids / elderly, the odour choice, and
 * certified & licensed provider status. Links to /about for the full reasoning.
 */
const reasons = [
  {
    icon: Leaf,
    title: "Eco-friendly chemicals",
    punchline:
      "Low-toxicity, CIB & RC registered actives. Safety profile first, kill rate second.",
    image: "/images/showcase/work-restaurant-kitchen.png",
    accent: "teal",
  },
  {
    icon: HeartPulse,
    title: "Safe for kids & elderly",
    punchline:
      "Protocols chosen around pregnant women, children and senior citizens in the home.",
    image: "/images/showcase/work-bedbug-steam.png",
    accent: "orange",
  },
  {
    icon: SprayCan,
    title: "Odourless on request",
    punchline:
      "High-quality chemicals in odour-controlled and fully odourless variants.",
    image: "/images/treatments/gel-bait-application.png",
    accent: "brown",
  },
  {
    icon: BadgeCheck,
    title: "Certified & licensed",
    punchline:
      "ISO 9001 certified licensed provider. Written warranty on every treatment.",
    image: "/images/showcase/work-warehouse-termite.png",
    accent: "orange",
  },
];

export function WhyChooseStrip() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Siva"
          title="Four reasons families and businesses choose us"
          subtitle="Premium pest control is not about stronger chemicals — it's about smarter protocols, better people, and accountability that lasts beyond the visit."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Image */}
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(51,36,22,0) 30%, rgba(51,36,22,0.85) 100%)",
                    }}
                  />
                  {/* Icon chip — top-left */}
                  <div
                    className={`absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md ${
                      reason.accent === "orange"
                        ? "bg-orange/90 text-white"
                        : reason.accent === "teal"
                        ? "bg-teal/90 text-white"
                        : "bg-brown/90 text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  {/* Title on image */}
                  <h3 className="absolute bottom-3 left-4 right-4 font-display text-base font-bold leading-tight text-white drop-shadow-md">
                    {reason.title}
                  </h3>
                </div>
                {/* Body */}
                <div className="p-4">
                  <p className="text-sm leading-relaxed text-brown/70">
                    {reason.punchline}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Link to About for the full reasoning */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3 text-sm font-semibold text-brown shadow-premium transition-all hover:border-orange/40 hover:text-orange"
          >
            See all 8 reasons families choose us
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
