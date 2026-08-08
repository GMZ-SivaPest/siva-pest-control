"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Phone,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { useNav } from "@/lib/store";
import { company } from "@/data/company";
import { locations } from "@/data/locations";
import { brand } from "@/data/brand";

/**
 * Hero — premium homepage hero with:
 * - 3D-tilt shield with concentric rings
 * - Animated city pin connections (Hyderabad → Chennai → Bangalore)
 * - Outward-drifting protective particles
 * - Trust badges, primary + secondary CTAs
 * - Subtle parallax on scroll
 */
export function Hero() {
  const navigate = useNav((s) => s.navigate);
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tilt for shield
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      className="relative overflow-hidden pt-24 md:pt-28"
    >
      {/* Background composition */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 gradient-warm" />
        <div className="absolute inset-0 bg-grid-warm opacity-50" />
        <div
          className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, #E8D2B5 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-20 right-10 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #719899 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-10 h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* LEFT — Copy column */}
          <div className="relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-brown/10 bg-white/70 px-4 py-1.5 text-xs font-semibold text-brown backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
              </span>
              {company.yearsOfExperience}+ years protecting South Indian homes & businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-brown text-balance sm:text-5xl lg:text-[3.75rem]"
            >
              Premium protection,{" "}
              <span className="text-gradient-orange">scientifically delivered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brown/70 text-pretty lg:mx-0 sm:text-lg"
            >
              Child-safe, pet-safe, odour-controlled pest control across Hyderabad, Chennai
              and Bangalore. Backed by certified technicians, written warranties, and a
              180-day service guarantee.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:items-start lg:justify-start justify-center"
            >
              <button
                onClick={() => navigate("contact")}
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #E88521 0%, #B85C04 100%)" }}
              >
                Get Free Quote
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href={`tel:${company.phonePrimaryHref}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white/60 px-6 py-3.5 text-sm font-semibold text-brown backdrop-blur transition-all hover:border-orange/40 hover:text-orange"
              >
                <Phone className="h-4 w-4" />
                {company.phonePrimary}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start text-xs text-brown/60"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-orange" />
                Child-safe formulations
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-orange" />
                Written 180-day warranty
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-orange" />
                ISO 9001 certified
              </div>
            </motion.div>

            {/* Rating row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-center justify-center gap-4 lg:justify-start"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange text-orange" />
                ))}
              </div>
              <div className="text-sm text-brown/70">
                <span className="font-semibold text-brown">4.9/5</span> from{" "}
                <span className="font-semibold text-brown">5,700+</span> verified reviews
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Cinematic hero image with floating shield + city pins */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <HeroImageComposition rotateX={rotateX} rotateY={rotateY} />
          </motion.div>
        </div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brown/10 bg-brown/5 md:grid-cols-4"
        >
          {company.trustSignals.map((stat) => (
            <div key={stat.label} className="bg-ivory/80 p-5 text-center backdrop-blur sm:p-6">
              <div className="font-display text-2xl font-bold text-brown sm:text-3xl">
                {stat.value.toLocaleString("en-IN")}
                <span className="text-orange">{stat.suffix}</span>
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-brown/60">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * HeroImageComposition — the cinematic hero image with subtle 3D tilt,
 * premium glassmorphism overlay cards, floating shield medallion,
 * and city pin accents over the image.
 */
function HeroImageComposition({
  rotateX,
  rotateY,
}: {
  rotateX: any;
  rotateY: any;
}) {
  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      className="relative aspect-[4/3] w-full max-w-[620px] lg:aspect-[5/5]"
    >
      {/* Main image with rounded premium frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full overflow-hidden rounded-3xl border border-white/40 shadow-premium-lg"
        style={{ transform: "translateZ(40px)" }}
      >
        <Image
          src="/images/hero/hero-main.png"
          alt="Protected modern Indian home at golden hour — Siva Pest Control"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 620px"
          className="object-cover"
        />
        {/* Warm gradient overlay for premium feel + text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(51,36,22,0) 0%, rgba(51,36,22,0.05) 50%, rgba(51,36,22,0.45) 100%)",
          }}
        />
        {/* Subtle orange glow from bottom-left */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 15% 90%, rgba(215,112,5,0.25) 0%, transparent 50%)",
          }}
        />

        {/* Image badge: protected home label */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brown backdrop-blur-md shadow-premium">
          <ShieldCheck className="h-3 w-3 text-orange" />
          Protected Home
        </div>
      </motion.div>

      {/* Floating glass card — top-right: rating */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 top-12 z-10 w-44 rounded-2xl border border-white/50 bg-white/85 p-3 shadow-premium backdrop-blur-xl sm:-right-6 sm:w-52"
        style={{ transform: "translateZ(80px)" }}
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-orange text-orange" />
          ))}
        </div>
        <div className="mt-1.5 font-display text-xl font-bold text-brown">
          4.9
          <span className="ml-1 text-xs font-medium text-brown/60">/ 5</span>
        </div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-brown/60">
          500+ Google reviews
        </div>
      </motion.div>

      {/* Floating glass card — bottom-left: response time */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -left-3 bottom-12 z-10 w-48 rounded-2xl border border-white/50 bg-white/85 p-3 shadow-premium backdrop-blur-xl sm:-left-6 sm:w-56"
        style={{ transform: "translateZ(80px)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-glow-orange"
            style={{ background: "linear-gradient(135deg, #E88521 0%, #B85C04 100%)" }}
          >
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <div className="font-display text-base font-bold text-brown">30 min</div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-brown/60">
              Response time
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating shield medallion — bottom-right */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="absolute -bottom-4 -right-3 z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white shadow-premium-lg sm:-right-5 sm:h-20 sm:w-20"
        style={{ transform: "translateZ(100px)" }}
      >
        <span className="font-display text-base font-bold text-brown sm:text-lg">180</span>
        <span className="text-[8px] font-semibold uppercase tracking-wider text-brown/60 sm:text-[9px]">
          day warranty
        </span>
      </motion.div>

      {/* City pins floating over image */}
      <CityPinConnections />
    </motion.div>
  );
}

/**
 * CityPinConnections — three pins for Hyderabad, Chennai, Bangalore
 * with thin animated connecting lines between them.
 */
function CityPinConnections() {
  const navigate = useNav((s) => s.navigate);

  // Pin positions in % of container
  const pins = [
    { city: "Hyderabad", x: 28, y: 30, slug: "hyderabad" },
    { city: "Chennai", x: 78, y: 70, slug: "chennai" },
    { city: "Bangalore", x: 60, y: 88, slug: "bangalore" },
  ];

  return (
    <div className="absolute inset-0">
      {/* SVG connecting lines */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0" stopColor="#D77005" stopOpacity="0.4" />
            <stop offset="0.5" stopColor="#719899" stopOpacity="0.6" />
            <stop offset="1" stopColor="#D77005" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Hyderabad → Bangalore */}
        <line
          x1={pins[0].x}
          y1={pins[0].y}
          x2={pins[2].x}
          y2={pins[2].y}
          stroke="url(#line-grad)"
          strokeWidth="0.3"
          strokeDasharray="1.5 1"
          style={{ animation: "dash-flow 18s linear infinite" }}
        />
        {/* Bangalore → Chennai */}
        <line
          x1={pins[2].x}
          y1={pins[2].y}
          x2={pins[1].x}
          y2={pins[1].y}
          stroke="url(#line-grad)"
          strokeWidth="0.3"
          strokeDasharray="1.5 1"
          style={{ animation: "dash-flow 18s linear infinite" }}
        />
        {/* Chennai → Hyderabad */}
        <line
          x1={pins[1].x}
          y1={pins[1].y}
          x2={pins[0].x}
          y2={pins[0].y}
          stroke="url(#line-grad)"
          strokeWidth="0.3"
          strokeDasharray="1.5 1"
          style={{ animation: "dash-flow 18s linear infinite" }}
        />
      </svg>

      {pins.map((pin, i) => (
        <motion.button
          key={pin.city}
          onClick={() => navigate(`location:${pin.slug}`)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          {/* Pulse rings */}
          <span
            className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-orange/50"
            style={{ animation: `pulse-ring 2.4s ease-out infinite ${i * 0.6}s` }}
          />
          <span
            className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-teal/40"
            style={{ animation: `pulse-ring 2.4s ease-out infinite ${i * 0.6 + 1.2}s` }}
          />

          {/* Pin head */}
          <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white shadow-lift ring-2 ring-orange">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          </span>

          {/* Pin label */}
          <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brown/10 bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-brown opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            {pin.city}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
