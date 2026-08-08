"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Phone, ShieldCheck, Clock } from "lucide-react";
import { Reveal } from "./reveal";
import { company } from "@/data/company";
import { brand } from "@/data/brand";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact";
}

export function CTASection({
  title = "Ready to take back your space?",
  subtitle = "Free inspection, fixed-price quote, certified technicians. Same-day service available across all three cities.",
  variant = "default",
}: CTASectionProps) {
  return (
    <section className={variant === "compact" ? "py-12 md:py-16" : "py-20 md:py-24"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl shadow-premium">
            {/* Background */}
            <div className="absolute inset-0 gradient-brown" />
            <div className="absolute inset-0 bg-dot-warm opacity-[0.05]" />
            <div
              className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, #719899 0%, transparent 70%)" }}
              aria-hidden="true"
            />

            <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16 md:py-20">
              {/* Trust badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange/15 px-3.5 py-1.5 text-xs font-semibold text-orange ring-1 ring-orange/30">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {brand.guaranteeLabel}
              </div>

              <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-[1.1] text-white text-balance sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 text-pretty sm:text-lg">
                {subtitle}
              </p>

              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  onClick={() => trackCTAClick({ location: "cta-section", label: "Get Free Quote", href: "/contact" })}
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.02] gradient-orange"
                >
                  Get Free Quote
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <a
                  href={`tel:${company.phonePrimaryHref}`}
                  onClick={() => trackPhoneClick({ location: "cta-section", phone: company.phonePrimary })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {company.phonePrimary}
                </a>
              </div>

              {/* Sub trust row */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {company.stats.avgResponseMins}-minute average response
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  ISO 9001:2015 certified
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {company.hoursShort}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
