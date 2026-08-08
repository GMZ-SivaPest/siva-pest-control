"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

/**
 * ServicesTeaser — Home page teaser showing 3 featured services.
 * Does NOT expand the full grid (per user feedback). Links to /services
 * for the full catalog with filter.
 */
export function ServicesTeaser() {
  // Pick 3 representative services: termite, cockroach, commercial
  const featuredSlugs = ["termite-control", "cockroach-gel-treatment", "commercial-ipm"];
  const featured = services.filter((s) => featuredSlugs.includes(s.slug));

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we treat"
          title="Premium pest control, end to end"
          subtitle="From odourless cockroach gel-bait to 5-year termite barriers to FSSAI-compliant commercial IPM — one vendor, three cities, every pest covered."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-premium transition-all duration-300 hover:shadow-glow-orange"
              >
                <Link href={`/services/${service.slug}`} className="block">
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(51,36,22,0) 40%, rgba(51,36,22,0.85) 100%)",
                      }}
                    />
                    {/* Icon chip */}
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange/90 text-white backdrop-blur-md">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    {/* Price chip */}
                    <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-brown shadow-premium backdrop-blur-md">
                      from ₹{service.startsFrom.toLocaleString("en-IN")}
                    </div>
                    {/* Name on image */}
                    <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold leading-tight text-white drop-shadow-md">
                      {service.name}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-brown/65 line-clamp-3">
                      {service.short}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brown/55">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {service.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {service.warranty}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-brown/5 pt-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-orange">
                        View details
                      </span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brown/5 text-brown transition-all group-hover:scale-110 group-hover:bg-orange group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* "View all services" CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3 text-sm font-semibold text-brown shadow-premium transition-all hover:border-orange/40 hover:text-orange"
          >
            View all {services.length} services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-xs text-brown/55">
            Residential, commercial, and Integrated Pest Management — every treatment certified and warranty-backed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
