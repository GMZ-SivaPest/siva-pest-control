"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { SectionHeading } from "./section-heading";
import { processSteps, processPrinciples } from "@/data/process";
import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ProcessTimeline — image-first, alternating (zigzag) step showcase.
 *
 * Redesign rationale:
 *   - The previous version was a 5-column text grid: cramped on laptop,
 *     unreadable descriptions, and the only image-less section style on an
 *     otherwise photo-led site.
 *   - Each step now pairs a real field photograph (from data/process.ts)
 *     with the step content, alternating sides on desktop so the eye
 *     travels down the page like a documented visit.
 *   - Mobile stacks image-above-content, preserving reading order.
 */
export function ProcessTimeline() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 -z-10 gradient-warm-soft" />
      <div className="absolute inset-0 -z-10 bg-dot-warm opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How we work"
          title="Five steps from first call to written warranty"
          subtitle="No surprises, no upsell at the door. Every step is documented, every visit photo-logged, every warranty honoured."
        />

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
          {processSteps.map((step, i) => {
            const reversed = i % 2 === 1;

            return (
              <div
                key={step.step}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
              >
                {/* === Image === */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("relative", reversed && "md:order-2")}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-brown/10 shadow-premium-lg">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {/* Bottom scrim for the duration chip */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(51,36,22,0) 55%, rgba(51,36,22,0.55) 100%)",
                      }}
                      aria-hidden="true"
                    />
                    {/* Duration chip */}
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur-md">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {step.duration}
                    </div>
                  </div>

                  {/* Floating step-number badge */}
                  <div className="absolute -top-5 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange to-orange-deep font-display text-lg font-bold text-white shadow-glow-orange ring-4 ring-white">
                    {step.step}
                  </div>
                </motion.div>

                {/* === Content === */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(reversed && "md:order-1")}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange">
                      Step {step.step}
                    </span>
                    <span className="h-px max-w-16 flex-1 bg-orange/30" />
                    <span className="text-xs font-semibold text-brown/50">
                      of {String(processSteps.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-brown sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-brown/70 text-pretty sm:text-base">
                    {step.description}
                  </p>

                  {/* What you receive */}
                  <div className="mt-6 inline-flex items-start gap-2.5 rounded-2xl border border-brown/10 bg-white px-4 py-3 shadow-premium">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brown/50">
                        You receive
                      </div>
                      <div className="text-sm font-semibold text-brown">
                        {step.deliverable}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * ProcessPrinciples — dark premium section for the five operating principles.
 * Follows the site's signature dark-section style (Manifesto / Testimonials):
 * warm brown gradient, subtle dot texture, orange radial glow, glass cards
 * with ghost step numbers.
 */
export function ProcessPrinciples() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 gradient-brown" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-warm opacity-[0.05]" aria-hidden="true" />
      <div
        className="absolute -bottom-32 right-0 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Why it works"
          title="Five principles behind every treatment"
          subtitle="Documented operating procedures, not marketing claims — audited under ISO 9001:2015 and applied identically in all three cities."
        />

        <StaggerContainer className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {processPrinciples.map((p, i) => (
            <StaggerItem key={p.title}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.10]">
                {/* Ghost number */}
                <div className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-bold text-white/[0.06] transition-colors group-hover:text-orange/10">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Orange tick bar */}
                <div className="mb-4 h-1 w-8 rounded-full bg-orange" aria-hidden="true" />

                <h3 className="font-display text-lg font-bold leading-snug text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/70 text-pretty">
                  {p.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
