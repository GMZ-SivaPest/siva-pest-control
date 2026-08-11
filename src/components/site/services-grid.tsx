"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ServiceCard } from "./service-card";
import { servicesByCategory, serviceCategories } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServicesGridProps {
  showFilter?: boolean;
  showHeading?: boolean;
  limit?: number;
}

export function ServicesGrid({
  showFilter = true,
  showHeading = true,
  limit,
}: ServicesGridProps) {
  const [category, setCategory] = useState<string>("all");
  const filtered = limit
    ? servicesByCategory(category).slice(0, limit)
    : servicesByCategory(category);

  return (
    <section className="relative py-20 md:py-24">
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow="What we treat"
            title="Premium pest control, end to end"
            subtitle="From cockroach gel-bait to 5-year termite barriers to FSSAI-compliant commercial IPM — one vendor, three cities, every pest covered."
          />
        )}

        {showFilter && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  category === cat.id
                    ? "bg-orange text-white shadow-glow-orange"
                    : "border border-brown/15 bg-white/60 text-brown/70 hover:text-brown hover:border-brown/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}

          {/* CTA card — "not sure what pest you have?" */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-700 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-white">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold leading-tight text-white">
              Not sure what pest you have?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100/70">
              Our experts will identify the problem and recommend the right
              treatment — at no cost.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Book Free Inspection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
