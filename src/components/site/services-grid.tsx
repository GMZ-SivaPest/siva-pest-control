"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
        </div>
      </div>
    </section>
  );
}
