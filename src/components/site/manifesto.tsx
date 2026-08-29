"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Bug } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import { Reveal } from "./reveal";

/**
 * Manifesto — large premium typography section with a subtle pest accent.
 *
 * Design rationale (from playbook #13):
 *   "WE DON'T JUST CONTROL PESTS. WE PROTECT SPACES."
 *   with a tiny animated insect crawling along the typography.
 *
 * Premium direction: 60% clean corporate + 10% pest accent.
 */
export function Manifesto() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brown py-24 md:py-32">
      {/* Subtle warm dot texture */}
      <div className="absolute inset-0 bg-dot-warm opacity-[0.06]" aria-hidden />

      {/* Warm radial glow from bottom-left */}
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
      />
      {/* Cool teal glow from top-right */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #719899 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <Reveal>
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-orange/60" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange">
              Our promise
            </span>
            <span className="h-px w-12 bg-orange/60" />
          </div>
        </Reveal>

        {/* === Big typography statement === */}
        <Reveal>
          <h2 className="text-center font-display text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            We don't just
            <br />
            control pests.
            <br />
            <span className="relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #F4B266 0%, #E88521 50%, #D77005 100%)",
                }}
              >
                We protect spaces.
              </span>
              {/* Tiny crawling pest accent on the gradient line */}
              {!reduceMotion && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 right-0 text-sm opacity-70"
                  animate={{
                    x: [0, -8, 0, 8, 0],
                    y: [0, -2, 0, 2, 0],
                    rotate: [0, -10, 0, 10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Bug
                    className="h-4 w-4 text-orange"
                    aria-hidden
                  />
                </motion.span>
              )}
            </span>
          </h2>
        </Reveal>

        {/* Supporting copy */}
        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-white/75 text-pretty sm:text-lg">
            Any exterminator can spray. We're here for the family that wants
            their kitchen safe, the restaurant that needs to stay open, the
            warehouse that can't afford downtime. Science-led, locally trusted,
            fully guaranteed — that's the Siva standard.
          </p>
        </Reveal>

        {/* === Three promise chips === */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {[
              "Child-safe formulations",
              "Written 180-day warranty",
              "ISO 9001 certified",
              "30-min response",
            ].map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-md"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-12 flex justify-center">
            <Link
              href="/about"
              onClick={() =>
                trackCTAClick({
                  location: "manifesto",
                  label: "Why Siva",
                  href: "/about",
                })
              }
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              Why 12,000+ families chose Siva
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
