"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { type Service } from "@/data/services";
import { cn } from "@/lib/utils";

const accentMap = {
  orange: {
    bg: "bg-orange/10",
    text: "text-orange",
    hoverBg: "group-hover:bg-orange",
    glow: "group-hover:shadow-glow-orange",
    border: "group-hover:border-orange/40",
    ring: "ring-orange/20",
  },
  teal: {
    bg: "bg-teal/10",
    text: "text-teal",
    hoverBg: "group-hover:bg-teal",
    glow: "group-hover:shadow-glow-teal",
    border: "group-hover:border-teal/40",
    ring: "ring-teal/20",
  },
  brown: {
    bg: "bg-brown/10",
    text: "text-brown",
    hoverBg: "group-hover:bg-brown",
    glow: "group-hover:shadow-lift",
    border: "group-hover:border-brown/30",
    ring: "ring-brown/20",
  },
  rust: {
    bg: "bg-rust/10",
    text: "text-rust",
    hoverBg: "group-hover:bg-rust",
    glow: "group-hover:shadow-lift",
    border: "group-hover:border-rust/40",
    ring: "ring-rust/20",
  },
};

interface ServiceCardProps {
  service: Service;
  index?: number;
  variant?: "default" | "compact";
}

export function ServiceCard({ service, index = 0, variant = "default" }: ServiceCardProps) {
  const accent = accentMap[service.accent];
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white text-left transition-all duration-300 shadow-premium",
        accent.border,
        accent.glow
      )}
    >
      <Link href={`/services/${service.slug}`} className="flex h-full flex-col">
      {/* Premium image header */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(51,36,22,0) 40%, rgba(51,36,22,0.75) 100%)",
          }}
        />
        {/* Icon chip */}
        <div
          className={cn(
            "absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-md transition-colors",
            accent.bg,
            accent.text,
            "ring-1",
            accent.ring
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </div>
        {/* Service name on image */}
        <h3 className="absolute bottom-3 left-4 right-4 font-display text-lg font-bold leading-tight text-white drop-shadow-md">
          {service.name}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-brown/65 line-clamp-2">
          {service.short}
        </p>

        {/* Meta row */}
        {variant === "default" && (
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
        )}

        {/* CTA row */}
        <div className="mt-4 flex items-center justify-between border-t border-brown/5 pt-4">
          <span className={cn("text-xs font-semibold uppercase tracking-wider", accent.text)}>
            View details
          </span>
          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full bg-brown/5 text-brown transition-all group-hover:scale-110",
              accent.hoverBg,
              "group-hover:text-white"
            )}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}
