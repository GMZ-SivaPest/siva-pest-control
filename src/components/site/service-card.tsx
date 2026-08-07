"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { type Service } from "@/data/services";
import { useNav } from "@/lib/store";
import { cn } from "@/lib/utils";

const accentMap = {
  orange: {
    bg: "bg-orange/10",
    text: "text-orange",
    hoverBg: "group-hover:bg-orange",
    glow: "group-hover:shadow-glow-orange",
    border: "group-hover:border-orange/40",
  },
  teal: {
    bg: "bg-teal/10",
    text: "text-teal",
    hoverBg: "group-hover:bg-teal",
    glow: "group-hover:shadow-glow-teal",
    border: "group-hover:border-teal/40",
  },
  brown: {
    bg: "bg-brown/10",
    text: "text-brown",
    hoverBg: "group-hover:bg-brown",
    glow: "group-hover:shadow-lift",
    border: "group-hover:border-brown/30",
  },
  rust: {
    bg: "bg-rust/10",
    text: "text-rust",
    hoverBg: "group-hover:bg-rust",
    glow: "group-hover:shadow-lift",
    border: "group-hover:border-rust/40",
  },
};

interface ServiceCardProps {
  service: Service;
  index?: number;
  variant?: "default" | "compact";
}

export function ServiceCard({ service, index = 0, variant = "default" }: ServiceCardProps) {
  const navigate = useNav((s) => s.navigate);
  const accent = accentMap[service.accent];
  const Icon = service.icon;

  return (
    <motion.button
      onClick={() => navigate(`service:${service.slug}`)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white p-6 text-left transition-all duration-300 shadow-premium",
        accent.border,
        accent.glow
      )}
    >
      {/* Decorative corner gradient */}
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
          accent.bg
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
          accent.bg,
          accent.text,
          accent.hoverBg,
          "group-hover:text-white"
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.6} />
      </div>

      {/* Title + short */}
      <h3 className="font-display text-lg font-bold leading-tight text-brown">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/65 line-clamp-3">
        {service.short}
      </p>

      {/* Meta row */}
      {variant === "default" && (
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brown/55">
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
      <div className="mt-5 flex items-center justify-between border-t border-brown/5 pt-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium uppercase tracking-wider text-brown/50">
            Starts from
          </span>
          <span className="font-display text-base font-bold text-brown">
            ₹{service.startsFrom.toLocaleString("en-IN")}
          </span>
        </div>
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
    </motion.button>
  );
}
