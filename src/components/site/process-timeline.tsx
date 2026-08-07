"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { SectionHeading } from "./section-heading";
import { processSteps, processPrinciples } from "@/data/process";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessTimeline() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 -z-10 gradient-warm-soft" />
      <div className="absolute inset-0 -z-10 bg-dot-warm opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How we work"
          title="A clear, documented process — start to warranty"
          subtitle="No surprises, no upsell at the door. Every step is documented, every visit logged, every warranty honoured."
        />

        {/* Process steps — horizontal on desktop, vertical on mobile */}
        <div className="mt-14">
          {/* Desktop timeline */}
          <div className="relative hidden md:block">
            {/* Horizontal connecting line */}
            <div className="absolute left-0 right-0 top-12 h-0.5 bg-gradient-to-r from-orange/10 via-orange/40 to-orange/10" />

            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Step number circle */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange bg-ivory font-display text-base font-bold text-orange shadow-lift">
                      {step.step}
                    </div>
                    {/* Pulse dot */}
                    <span
                      className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/30"
                      style={{
                        animation: `pulse-ring 3s ease-out infinite ${i * 0.5}s`,
                      }}
                    />
                  </div>

                  <div className="rounded-2xl border border-brown/10 bg-white p-5 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift">
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-orange">
                      {step.duration}
                    </div>
                    <h3 className="font-display text-base font-bold leading-tight text-brown">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-brown/65">
                      {step.description}
                    </p>
                    <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-brown/5 px-2.5 py-2 text-[11px] text-brown/70">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-orange" />
                      <span>{step.deliverable}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden">
            <div className="relative">
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-orange/40 via-orange/20 to-transparent" />
              <div className="space-y-5">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative flex gap-4 pl-0"
                  >
                    <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange bg-ivory font-display text-base font-bold text-orange shadow-lift">
                      {step.step}
                    </div>
                    <div className="flex-1 rounded-2xl border border-brown/10 bg-white p-4 shadow-premium">
                      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-orange">
                        {step.duration}
                      </div>
                      <h3 className="font-display text-base font-bold leading-tight text-brown">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-brown/65">
                        {step.description}
                      </p>
                      <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-brown/5 px-2.5 py-2 text-[11px] text-brown/70">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-orange" />
                        <span>{step.deliverable}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Process principles */}
        <Reveal className="mt-16">
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-premium sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-orange" />
              <h3 className="font-display text-lg font-bold text-brown">
                Five principles behind every treatment
              </h3>
            </div>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.05}>
              {processPrinciples.map((p) => (
                <StaggerItem key={p.title}>
                  <div className="h-full rounded-2xl bg-brown/[0.03] p-4 transition-colors hover:bg-orange/5">
                    <ArrowRight className="mb-2 h-4 w-4 text-orange" />
                    <div className="text-sm font-semibold text-brown">{p.title}</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-brown/65">
                      {p.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
