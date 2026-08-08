"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * ProtectionShield — signature brand animation.
 *
 * Visual metaphor: "Pests are the problem. Protection is our brand."
 * Pests (silhouette dots) drift inward toward a central home/shield,
 * hit an invisible protective barrier, and dissolve. The shield pulses
 * with concentric rings. This is THE signature visual of the site.
 *
 * Pure SVG + CSS — no images required.
 */
export function ProtectionShield() {
  const reduceMotion = useReducedMotion();

  // 8 pests approaching from different angles
  const pests = [
    { angle: 0, icon: "🪳", label: "Roach", delay: 0 },
    { angle: 45, icon: "🐜", label: "Ant", delay: 0.4 },
    { angle: 90, icon: "🦟", label: "Mosquito", delay: 0.8 },
    { angle: 135, icon: "🕷️", label: "Spider", delay: 1.2 },
    { angle: 180, icon: "🐀", label: "Rodent", delay: 0.2 },
    { angle: 225, icon: "🪲", label: "Bed Bug", delay: 0.6 },
    { angle: 270, icon: "🐝", label: "Bee", delay: 1.0 },
    { angle: 315, icon: "🦂", label: "Scorpion", delay: 1.4 },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory to-ivory-deep py-20 md:py-28">
      {/* Subtle warm grid backdrop */}
      <div className="absolute inset-0 bg-grid-warm opacity-[0.08]" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Siva difference"
          title="Pests are the problem. Protection is our brand."
          subtitle="Every treatment creates an invisible barrier — pests approach, meet science, and turn back. That's the promise we deliver across 12,000+ protected spaces."
        />

        {/* === Signature animation canvas === */}
        <div className="relative mx-auto mt-16 aspect-square w-full max-w-2xl">
          {/* Outer ring — boundary of protection zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute inset-[18%] rounded-full border-2 border-dashed border-orange/25"
            aria-hidden
          />

          {/* Concentric pulse rings emanating from shield */}
          {!reduceMotion &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/40"
                style={{ width: "30%", height: "30%" }}
                animate={{
                  scale: [1, 3.2, 3.2],
                  opacity: [0.6, 0, 0],
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: "easeOut",
                }}
              />
            ))}

          {/* === Pests approaching + deflecting === */}
          {pests.map((pest, i) => {
            // Convert angle to start position (outer) and end position (just before shield)
            const rad = (pest.angle * Math.PI) / 180;
            const startX = 50 + 42 * Math.cos(rad);
            const startY = 50 + 42 * Math.sin(rad);
            // Stop ~22% from center (just outside the shield)
            const endX = 50 + 22 * Math.cos(rad);
            const endY = 50 + 22 * Math.sin(rad);

            return (
              <motion.div
                key={i}
                // role=img + aria-label exposes the pest species to screen
                // readers. Without an explicit role, ARIA spec forbids
                // aria-label on a <div> (audit: aria-prohibited-attr).
                // The motion.div is purely decorative; the three-pillar
                // promise below carries the actual content meaning.
                role="img"
                aria-label={pest.label}
                className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg shadow-premium backdrop-blur-md"
                style={{ left: `${startX}%`, top: `${startY}%` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  reduceMotion
                    ? { opacity: 0.85, scale: 1 }
                    : {
                        left: [`${startX}%`, `${endX}%`, `${endX}%`],
                        top: [`${startY}%`, `${endY}%`, `${endY}%`],
                        opacity: [0, 0.9, 0],
                        scale: [0.6, 1, 0.4],
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.5 }
                    : {
                        duration: 4,
                        repeat: Infinity,
                        delay: pest.delay,
                        ease: "easeInOut",
                        times: [0, 0.6, 1],
                      }
                }
              >
                <span aria-hidden>{pest.icon}</span>
              </motion.div>
            );
          })}

          {/* === Central shield — the brand promise === */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-orange to-orange-deep text-white shadow-glow-orange md:h-40 md:w-40"
          >
            {/* Inner glow ring */}
            <span
              aria-hidden
              className="absolute inset-2 rounded-full ring-2 ring-white/30"
            />
            {/* Pulsing aura */}
            {!reduceMotion && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-orange"
                animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <ShieldCheck className="relative h-10 w-10 md:h-12 md:w-12" strokeWidth={1.6} />
            <span className="relative mt-1 text-[10px] font-bold uppercase tracking-widest md:text-xs">
              Protected
            </span>
          </motion.div>

          {/* === House silhouette at center base === */}
          <svg
            aria-hidden
            className="absolute bottom-[28%] left-1/2 h-12 w-12 -translate-x-1/2 text-brown/30 md:h-16 md:w-16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 11l9-8 9 8v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z" />
            <path d="M9 22V12h6v10" />
          </svg>
        </div>

        {/* === Three-pillar promise === */}
        <Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Inspect",
                desc: "Certified technicians identify pest species, entry points, and infestation severity before any treatment begins.",
              },
              {
                step: "02",
                title: "Treat",
                desc: "Targeted, child-safe, pet-safe formulations applied with precision equipment — no broadcast spraying.",
              },
              {
                step: "03",
                title: "Protect",
                desc: "A written 180-day warranty + free re-inspection at day 7 keeps your space protected long after we leave.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-2xl border border-brown/10 bg-white p-6 shadow-premium"
              >
                <div className="font-display text-4xl font-bold text-orange/20">
                  {pillar.step}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-brown">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown/70">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
