"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

/**
 * ServicesGallery — homepage image-dense grid showing EVERY service.
 *
 * Unlike <ServicesTeaser /> which shows 3 featured services in big cards,
 * this component shows all services in a compact masonry-style image grid.
 * This is the user's "heavy images, main points only" section.
 *
 * Layout: responsive grid with featured (large) cards mixed with smaller cards
 * for visual rhythm. Each card links directly to the service detail page.
 */
export function ServicesGallery() {
  // Show all services — featured ones get a larger card
  const featuredSlugs = ["termite-control", "cockroach-gel-treatment", "commercial-ipm"];
  const featured = services.filter((s) => featuredSlugs.includes(s.slug));
  const rest = services.filter((s) => !featuredSlugs.includes(s.slug));

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-15" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we treat"
          title="Every pest, every premise — one certified vendor"
          subtitle="From odourless cockroach gel-bait to 5-year termite barriers to 24/7 snake removal — 14 specialised services covering every South Indian pest challenge."
        />

        {/* Featured row — 3 large cards */}
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
                          "linear-gradient(180deg, rgba(51,36,22,0) 40%, rgba(51,36,22,0.88) 100%)",
                      }}
                    />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange/90 text-white backdrop-blur-md">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold leading-tight text-white drop-shadow-md">
                      {service.name}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-brown/65 line-clamp-3">
                      {service.short}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brown/70">
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

        {/* Compact image-card grid for the rest */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-premium transition-all duration-300 hover:shadow-lift"
              >
                <Link href={`/services/${service.slug}`} className="block">
                  {/* Image — taller for visual impact */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(51,36,22,0) 40%, rgba(51,36,22,0.92) 100%)",
                      }}
                    />
                    {/* Icon chip */}
                    <div
                      className={cn(
                        "absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md",
                        service.accent === "orange"
                          ? "bg-orange/90 text-white"
                          : service.accent === "teal"
                          ? "bg-teal/90 text-white"
                          : service.accent === "rust"
                          ? "bg-rust/90 text-white"
                          : "bg-brown/90 text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </div>
                    {/* Title on image */}
                    <h3 className="absolute bottom-3 left-3 right-3 font-display text-base font-bold leading-tight text-white drop-shadow-md">
                      {service.name}
                    </h3>
                  </div>
                  {/* Body — compact */}
                  <div className="p-4">
                    <p className="text-xs leading-relaxed text-brown/65 line-clamp-2">
                      {service.short}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-brown/60">
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        {service.warranty}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-orange opacity-0 transition-opacity group-hover:opacity-100">
                        View
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
