"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Phone, ShieldCheck, Clock, Bug } from "lucide-react";
import { company } from "@/data/company";
import { brand } from "@/data/brand";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";
import { Reveal } from "./reveal";

/**
 * ProtectionCTA — premium dark final CTA.
 *
 * Per playbook #19: "The final CTA shouldn't look like another section.
 * Use a dark full-width section. Behind the text: giant shield, very
 * subtle pest silhouettes, animated particles."
 *
 * This replaces the lighter CTASection on the homepage for a more
 * cinematic, brand-signature ending.
 */
export function ProtectionCTA() {
  const reduceMotion = useReducedMotion();

  // Faint pest silhouettes positioned around the canvas (Lucide icon system
  // instead of platform-dependent emoji glyphs)
  const silhouettes = [
    { top: "18%", left: "8%", size: "h-7 w-7", delay: 0 },
    { top: "28%", left: "92%", size: "h-6 w-6", delay: 0.5 },
    { top: "72%", left: "6%", size: "h-5 w-5", delay: 1.0 },
    { top: "78%", left: "88%", size: "h-7 w-7", delay: 1.5 },
    { top: "12%", left: "82%", size: "h-6 w-6", delay: 2.0 },
    { top: "82%", left: "20%", size: "h-5 w-5", delay: 0.3 },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1A1208] py-24 md:py-32">
      {/* === Layer 1: Subtle dot texture === */}
      <div className="absolute inset-0 bg-dot-warm opacity-[0.04]" aria-hidden />

      {/* === Layer 2: Giant shield silhouette behind text === */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.07, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <ShieldCheck
          className="h-[480px] w-[480px] text-orange md:h-[640px] md:w-[640px]"
          strokeWidth={0.6}
        />
      </motion.div>

      {/* === Layer 3: Pest silhouettes drifting around (10% pest accent) === */}
      {!reduceMotion &&
        silhouettes.map((s, i) => (
          <motion.span
            key={i}
            aria-hidden
            className={`pointer-events-none absolute ${s.size} opacity-[0.08]`}
            style={{ top: s.top, left: s.left }}
            animate={{
              y: [0, -10, 0, 10, 0],
              x: [0, 6, 0, -6, 0],
              opacity: [0.05, 0.12, 0.05],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >
            <Bug className={s.size} strokeWidth={1.5} />
          </motion.span>
        ))}

      {/* === Layer 4: Warm radial glow from bottom === */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(215,112,5,0.35) 0%, transparent 70%)",
        }}
      />

      {/* === Layer 5: Drifting particles for atmosphere === */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-orange/40"
              style={{
                left: `${(i * 67) % 100}%`,
                top: `${(i * 41) % 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 6 + (i % 5),
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* === Foreground content === */}
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 text-xs font-semibold text-orange backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            {brand.guaranteeLabel}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
            See a pest?
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #F4B266 0%, #E88521 50%, #D77005 100%)",
              }}
            >
              Don't wait.
            </span>
          </h2>
        </Reveal>

        <Reveal>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 text-pretty sm:text-lg">
            Free inspection, fixed-price quote, certified technicians. Same-day
            service available across Hyderabad, Chennai and Bangalore. The
            longer you wait, the bigger the colony grows.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              onClick={() =>
                trackCTAClick({
                  location: "protection-cta",
                  label: "Book Free Inspection",
                  href: "/contact",
                })
              }
              className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white shadow-glow-orange transition-transform hover:scale-[1.03] gradient-orange"
            >
              Book a Free Inspection
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <a
              href={`tel:${company.phonePrimaryHref}`}
              onClick={() =>
                trackPhoneClick({
                  location: "protection-cta",
                  phone: company.phonePrimary,
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {company.phonePrimary}
            </a>
          </div>
        </Reveal>

        {/* Trust row */}
        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {company.stats.avgResponseMins}-min average response
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              ISO 9001:2015 certified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {company.hoursShort}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
