"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const featuredSlugs = ["termite-control", "cockroach-gel-treatment", "commercial-ipm"];

export function ServicesGallery() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-15" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we treat"
          title="A visual library of treatment work"
          subtitle="Browse the service gallery by image first. Each tile opens the detailed protocol, warranty, and safety guidance for that treatment."
        />

        <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[210px]">
          {services.map((service, index) => {
            const featured = featuredSlugs.includes(service.slug);

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: (index % 6) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-brown/10 bg-brown shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift",
                  featured && "sm:col-span-2 lg:row-span-2",
                  !featured && index % 5 === 0 && "lg:row-span-2"
                )}
              >
                <GalleryTile service={service} featured={featured} />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3 text-sm font-semibold text-brown shadow-premium transition-colors hover:border-orange/35 hover:text-orange-ink"
          >
            View all service details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryTile({
  service,
  featured,
}: {
  service: (typeof services)[number];
  featured: boolean;
}) {
  const Icon = service.icon;

  return (
    <Link href={`/services/${service.slug}`} className="relative block h-full w-full">
      <Image
        src={service.image}
        alt={service.name}
        fill
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 640px"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        }
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/20 to-transparent" />
      <div className="absolute inset-0 opacity-0 ring-2 ring-inset ring-orange/45 transition-opacity group-hover:opacity-100" />

      <div
        className={cn(
          "absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-premium backdrop-blur",
          service.accent === "teal"
            ? "bg-teal/90"
            : service.accent === "rust"
              ? "bg-rust/90"
              : service.accent === "brown"
                ? "bg-brown/90"
                : "bg-orange/90"
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.7} />
      </div>

      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white opacity-0 ring-1 ring-white/25 backdrop-blur transition-opacity group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white ring-1 ring-white/20 backdrop-blur">
            <Clock className="h-3 w-3" />
            {service.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white ring-1 ring-white/20 backdrop-blur">
            <ShieldCheck className="h-3 w-3" />
            {service.warranty}
          </span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display font-bold leading-tight text-white drop-shadow",
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          {service.name}
        </h3>
        {featured && (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 line-clamp-2">
            {service.short}
          </p>
        )}
      </div>
    </Link>
  );
}
