"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Phone,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useNav } from "@/lib/store";
import { company } from "@/data/company";
import { locations } from "@/data/locations";
import { brand } from "@/data/brand";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";

/**
 * Hero — premium cinematic homepage hero with:
 * - Full-bleed background image (protected home with shield dome)
 * - Parallax layers (background drifts slower than foreground)
 * - Animated protective shield pulse overlay
 * - Floating glass cards (rating, response time, warranty badge)
 * - Animated city pin connections (Hyderabad → Chennai → Bangalore)
 * - Particle drift (outward from shield center)
 * - Subtle 3D-tilt on foreground composition
 * - Scroll-driven fade + parallax
 */
export function Hero() {
  const navigate = useNav((s) => s.navigate);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, -60]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  // Mouse tilt for foreground composition
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  return (
    <section ref={ref} onMouseMove={handleMouse} className="relative overflow-hidden">
      {/* === LAYER 1: Full-bleed background image with parallax === */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/images/hero/hero-shield-home.png"
          alt="Modern South Indian home under protective energy shield at twilight"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic darkening gradient for text legibility (top-down) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,18,10,0.80) 0%, rgba(40,28,16,0.40) 32%, rgba(51,36,22,0.55) 70%, rgba(28,18,10,0.92) 100%)",
          }}
        />
        {/* Side gradient for navbar legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(28,18,10,0.55) 0%, rgba(28,18,10,0) 30%, rgba(28,18,10,0) 70%, rgba(28,18,10,0.40) 100%)",
          }}
        />
        {/* Warm orange glow from bottom-left (brand warmth) */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 12% 92%, rgba(215,112,5,0.35) 0%, transparent 45%)",
          }}
        />
        {/* Teal glow from top-right (cool protective tone) */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 88% 8%, rgba(113,152,153,0.30) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* === LAYER 2: Particle drift (skipped if user prefers reduced motion) === */}
      {!reduceMotion && <ParticleDrift />}

      {/* === LAYER 3: Shield pulse centered on the dome === */}
      {!reduceMotion && <ShieldPulse />}

      {/* === LAYER 4: City pins floating across the hero === */}
      {!reduceMotion && <CityPinConnections />}

      {/* === LAYER 5: Foreground content with parallax === */}
      <motion.div style={{ y: fgY }} className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 py-32 md:py-40 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            {/* LEFT — Copy column */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
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
                transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.75rem]"
                style={{
                  textShadow:
                    "0 2px 24px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.55)",
                }}
              >
                Premium protection,{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #F4B266 0%, #E88521 50%, #D77005 100%)",
                    // Fallback solid color in case the gradient fails to render
                    color: "#E88521",
                  }}
                >
                  scientifically delivered.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/90 text-pretty lg:mx-0 sm:text-lg"
                style={{
                  textShadow: "0 1px 12px rgba(0,0,0,0.45)",
                }}
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
                <Link
                  href="/contact"
                  onClick={() => trackCTAClick({ location: "hero", label: "Get Free Quote", href: "/contact" })}
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02] gradient-orange"
                >
                  Get Free Quote
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={`tel:${company.phonePrimaryHref}`}
                  onClick={() => trackPhoneClick({ location: "hero", phone: company.phonePrimary })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
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
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start text-xs text-white/80"
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
                <div className="text-sm text-white/85">
                  <span className="font-semibold text-white">4.9/5</span> from{" "}
                  <span className="font-semibold text-white">{company.stats.googleReviews.toLocaleString("en-IN")}+</span> verified reviews
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Glassmorphism composition with technician image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden items-center justify-center lg:flex"
            >
              <HeroGlassComposition rotateX={rotateX} rotateY={rotateY} />
            </motion.div>
          </div>
        </div>

        {/* === Bottom stats strip — glassmorphism === */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl md:grid-cols-4"
          >
            {company.trustSignals.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
                className="bg-white/5 p-5 text-center backdrop-blur-md sm:p-6"
              >
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value.toLocaleString("en-IN")}
                  <span className="text-orange">{stat.suffix}</span>
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * ParticleDrift — slow drifting particles for atmospheric depth.
 */
function ParticleDrift() {
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 53) % 100}%`,
    top: `${(i * 37) % 100}%`,
    size: 2 + ((i * 7) % 3),
    delay: (i * 0.4) % 6,
    duration: 8 + ((i * 3) % 8),
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/40"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            x: [0, 12, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * ShieldPulse — concentric animated rings centered on the shield dome area.
 */
function ShieldPulse() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] flex items-start justify-center">
      <div className="relative mt-[28%] md:mt-[22%]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/40"
            style={{ width: 180 + i * 120, height: 180 + i * 120 }}
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.5, 0.15, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Central shield icon */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/30">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * HeroGlassComposition — premium glassmorphism composition with technician
 * image, floating glass info cards, and a glass CTA panel.
 */
function HeroGlassComposition({
  rotateX,
  rotateY,
}: {
  rotateX: any;
  rotateY: any;
}) {
  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      className="relative aspect-[4/5] w-full max-w-[460px]"
    >
      {/* Main image with rounded premium frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full overflow-hidden rounded-3xl border border-white/30 shadow-premium-lg"
        style={{ transform: "translateZ(40px)" }}
      >
        <Image
          src="/images/hero/hero-technician.png"
          alt="Professional Siva Pest Control technician in uniform"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 460px"
          className="object-cover"
        />
        {/* Gradient overlay for premium feel + text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(51,36,22,0) 0%, rgba(51,36,22,0.05) 50%, rgba(51,36,22,0.55) 100%)",
          }}
        />

        {/* Image badge: certified technician */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brown backdrop-blur-md shadow-premium">
          <ShieldCheck className="h-3 w-3 text-orange" />
          Certified Technician
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Field-trained · Background-verified
          </div>
          <div className="mt-0.5 font-display text-sm font-bold text-white drop-shadow">
            ISO 9001:2015 Certified Service
          </div>
        </div>
      </motion.div>

      {/* Floating glass card — top-right: rating */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 top-12 z-10 w-44 rounded-2xl border border-white/40 bg-white/85 p-3 shadow-premium backdrop-blur-xl sm:w-52"
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
          {company.stats.googleReviews.toLocaleString("en-IN")}+ Google reviews
        </div>
      </motion.div>

      {/* Floating glass card — bottom-left: response time */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -left-4 bottom-16 z-10 w-48 rounded-2xl border border-white/40 bg-white/85 p-3 shadow-premium backdrop-blur-xl sm:w-56"
        style={{ transform: "translateZ(80px)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-glow-orange gradient-orange"
          >
            <Clock className="h-4 w-4" aria-hidden="true" />
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
        className="absolute -bottom-4 -right-3 z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white shadow-premium-lg sm:h-20 sm:w-20"
        style={{ transform: "translateZ(100px)" }}
      >
        <span className="font-display text-base font-bold text-brown sm:text-lg">180</span>
        <span className="text-[8px] font-semibold uppercase tracking-wider text-brown/60 sm:text-[9px]">
          day warranty
        </span>
      </motion.div>
    </motion.div>
  );
}

/**
 * CityPinConnections — three pins for Hyderabad, Chennai, Bangalore
 * with thin animated connecting lines between them.
 * Positioned across the upper portion of the hero.
 */
function CityPinConnections() {
  // Pin positions in % of hero section
  const pins = [
    { city: "Hyderabad", x: 24, y: 22, slug: "hyderabad" },
    { city: "Chennai", x: 82, y: 28, slug: "chennai" },
    { city: "Bangalore", x: 54, y: 16, slug: "bangalore" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[3]">
      {/* SVG connecting lines */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0" stopColor="#F4B266" stopOpacity="0.5" />
            <stop offset="0.5" stopColor="#719899" stopOpacity="0.7" />
            <stop offset="1" stopColor="#F4B266" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* Hyderabad → Bangalore */}
        <line
          x1={pins[0].x}
          y1={pins[0].y}
          x2={pins[2].x}
          y2={pins[2].y}
          stroke="url(#line-grad)"
          strokeWidth="0.18"
          strokeDasharray="1.2 0.8"
          style={{ animation: "dash-flow 22s linear infinite" }}
        />
        {/* Bangalore → Chennai */}
        <line
          x1={pins[2].x}
          y1={pins[2].y}
          x2={pins[1].x}
          y2={pins[1].y}
          stroke="url(#line-grad)"
          strokeWidth="0.18"
          strokeDasharray="1.2 0.8"
          style={{ animation: "dash-flow 22s linear infinite" }}
        />
        {/* Chennai → Hyderabad */}
        <line
          x1={pins[1].x}
          y1={pins[1].y}
          x2={pins[0].x}
          y2={pins[0].y}
          stroke="url(#line-grad)"
          strokeWidth="0.18"
          strokeDasharray="1.2 0.8"
          style={{ animation: "dash-flow 22s linear infinite" }}
        />
      </svg>

      {pins.map((pin, i) => (
        <Link
          key={pin.city}
          href={`/locations/${pin.slug}`}
          className="pointer-events-auto group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          {/* Pulse rings */}
          <motion.span
            className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-orange/60"
            animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
          />
          <motion.span
            className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-teal/50"
            animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 + 1.2 }}
          />

          {/* Pin head */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
            className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white shadow-lift ring-2 ring-orange"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          </motion.span>

          {/* Pin label */}
          <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-brown/70 px-2.5 py-0.5 text-[10px] font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            {pin.city}
          </span>
        </Link>
      ))}
    </div>
  );
}
