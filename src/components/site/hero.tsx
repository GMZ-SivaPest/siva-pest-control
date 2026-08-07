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

          {/* RIGHT — 3D Shield + city map composition */}
          <div className="relative flex items-center justify-center">
            <HeroShield rotateX={rotateX} rotateY={rotateY} />
          </div>
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
 * HeroShield — the centerpiece 3D shield with concentric rings,
 * animated city pin connections, and drifting protective particles.
 */
function HeroShield({
  rotateX,
  rotateY,
}: {
  rotateX: any;
  rotateY: any;
}) {
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulseKey((k) => k + 1), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      className="relative aspect-square w-full max-w-[520px]"
    >
      {/* Particle field — outward-drifting dots */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[80%] w-[80%]">
          {[...Array(18)].map((_, i) => {
            const angle = (i / 18) * Math.PI * 2;
            const dist = 80 + (i % 3) * 40;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            const delay = (i * 0.3) % 4;
            const size = 3 + (i % 4);
            return (
              <motion.span
                key={`${pulseKey}-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: size,
                  height: size,
                  background: i % 3 === 0 ? "#D77005" : i % 3 === 1 ? "#719899" : "#D8AE7F",
                  ["--dx" as any]: `${dx}px`,
                  ["--dy" as any]: `${dy}px`,
                  animation: `drift ${4 + (i % 3)}s ease-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Concentric rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer slow ring with dashed pattern */}
        <svg
          viewBox="0 0 400 400"
          className="absolute h-full w-full animate-spin-slow text-orange/30"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="190"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 8"
          />
        </svg>

        {/* Mid ring — counter-rotating */}
        <svg
          viewBox="0 0 400 400"
          className="absolute h-[88%] w-[88%] animate-spin-rev-slow text-teal/40"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="2 12"
          />
        </svg>

        {/* Solid warm ring */}
        <div className="absolute h-[72%] w-[72%] rounded-full border border-brown/15" />
        <div className="absolute h-[60%] w-[60%] rounded-full border-2 border-orange/25" />
      </div>

      {/* Central shield medallion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: "translateZ(60px)" }}
      >
        <div className="relative flex h-[46%] w-[46%] items-center justify-center">
          {/* Glow base */}
          <div
            className="absolute inset-0 rounded-full opacity-60 blur-2xl"
            style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
          />

          {/* Shield SVG */}
          <svg
            viewBox="0 0 200 220"
            className="relative h-full w-full drop-shadow-2xl"
            fill="none"
          >
            <defs>
              <linearGradient id="shield-fill" x1="100" y1="10" x2="100" y2="210" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4A3624" />
                <stop offset="1" stopColor="#221610" />
              </linearGradient>
              <linearGradient id="shield-rim" x1="100" y1="10" x2="100" y2="210" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E88521" />
                <stop offset="1" stopColor="#B85C04" />
              </linearGradient>
              <radialGradient id="shield-sheen" cx="0.3" cy="0.2" r="0.7">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.25" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path
              d="M100 10 L180 38 V110 C180 162 145 198 100 215 C55 198 20 162 20 110 V38 Z"
              fill="url(#shield-fill)"
              stroke="url(#shield-rim)"
              strokeWidth="3"
            />
            <path
              d="M100 10 L180 38 V110 C180 162 145 198 100 215 C55 198 20 162 20 110 V38 Z"
              fill="url(#shield-sheen)"
            />

            {/* Inner border */}
            <path
              d="M100 22 L168 46 V110 C168 154 138 184 100 200 C62 184 32 154 32 110 V46 Z"
              fill="none"
              stroke="#D77005"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />

            {/* Central S monogram */}
            <path
              d="M115 75 C100 75 88 84 88 98 C88 112 102 116 118 121 C134 126 140 134 140 148 C140 162 124 172 108 172"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Top tick marks */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={100}
                y1="28"
                x2={100}
                y2="32"
                stroke="#D8AE7F"
                strokeWidth="1.5"
                transform={`rotate(${(i - 2) * 18} 100 30)`}
              />
            ))}
          </svg>

          {/* Floating shield-check badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lift sm:-right-6 sm:-top-6 sm:h-14 sm:w-14"
          >
            <ShieldCheck className="h-6 w-6 text-orange sm:h-7 sm:w-7" />
          </motion.div>

          {/* Floating warranty badge */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-3 -left-4 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-white shadow-lift sm:-bottom-5 sm:-left-6 sm:h-16 sm:w-16"
          >
            <span className="font-display text-sm font-bold text-brown sm:text-base">180</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-brown/60 sm:text-[9px]">
              day
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated city pins with connecting lines */}
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
