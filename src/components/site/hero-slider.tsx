"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Star,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { company } from "@/data/company";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";

/**
 * HeroSlider — auto-rotating 6-slide hero carousel.
 *
 * Each slide tells a piece of the pest-control story:
 *   1. The problem (infestation imagery)
 *   2. The threat (what's at stake)
 *   3. The approach (science-led)
 *   4. The treatment (in-action imagery)
 *   5. The result (clean protected space)
 *   6. The promise (warranty + trust)
 *
 * UX:
 *   - Auto-advances every 6s
 *   - Pauses on hover, resumes on leave
 *   - Swipeable on touch (pointer events)
 *   - Clickable dots + arrow keys for keyboard users
 *   - Progress bar shows time-to-next-slide
 *   - Respects prefers-reduced-motion (no auto-advance, just static first slide)
 *
 * Each slide is a real <Link> to the relevant service page.
 */

interface Slide {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  href: string;
  cta: string;
  accent: "orange" | "teal" | "rust";
  stat?: { value: string; label: string };
}

const SLIDES: Slide[] = [
  {
    id: "infestation",
    image: "/images/carousel/cockroach-colony.jpg",
    alt: "Severe German cockroach infestation scattering on a kitchen counter",
    eyebrow: "The problem",
    title: "When you see one,",
    highlight: "there are hundreds.",
    description:
      "German cockroaches hide in cabinet hinges by day and raid your kitchen by night. They spread salmonella, trigger asthma, and double their population every 2 weeks.",
    href: "/services/cockroach-gel-treatment",
    cta: "Get cockroach treatment",
    accent: "rust",
    stat: { value: "1 → 30,000", label: "in 90 days" },
  },
  {
    id: "termite-threat",
    image: "/images/carousel/termite-damage.jpg",
    alt: "Severe subterranean termite damage on a wooden door frame with mud tubes",
    eyebrow: "The silent threat",
    title: "They eat 24/7 —",
    highlight: "you'll never hear them.",
    description:
      "Subterranean termites hollow out wooden door frames, furniture, and even concrete reinforcement. By the time you spot mud tubes, the structural damage is already done.",
    href: "/services/termite-control",
    cta: "Get termite barrier",
    accent: "orange",
    stat: { value: "5-year", label: "warranty barrier" },
  },
  {
    id: "rodent-fire",
    image: "/images/carousel/rodent-infestation.jpg",
    alt: "Rodent droppings and chewed electrical wiring in a residential attic",
    eyebrow: "Hidden danger",
    title: "Rats chew wires —",
    highlight: "and start fires.",
    description:
      "Rodents cause 25% of urban house fires by chewing electrical wiring. They also spread leptospirosis, hantavirus, and contaminate 10× more food than they eat.",
    href: "/services/rodent-control",
    cta: "Get rodent control",
    accent: "rust",
    stat: { value: "25%", label: "of urban house fires" },
  },
  {
    id: "treatment",
    image: "/images/carousel/kitchen-treatment.jpg",
    alt: "Siva technician applying targeted gel-bait treatment in a kitchen",
    eyebrow: "Our approach",
    title: "Targeted gel-bait,",
    highlight: "not blanket spray.",
    description:
      "Certified technicians apply gel-bait behind hinges and crevices where roaches actually live. No spraying, no smell, no evacuation — colony collapses in 7 days.",
    href: "/services/cockroach-gel-treatment",
    cta: "See how it works",
    accent: "teal",
    stat: { value: "7 days", label: "colony collapse" },
  },
  {
    id: "mosquito-fogging",
    image: "/images/carousel/mosquito-fogging.jpg",
    alt: "Outdoor mosquito fogging treatment in a residential compound",
    eyebrow: "Outdoor control",
    title: "Reclaim your",
    highlight: "garden & terrace.",
    description:
      "Thermal fogging + larvicide treatment knocks down adult mosquitoes and breaks the breeding cycle in stagnant water. Protects against dengue, malaria, and chikungunya.",
    href: "/services/mosquito-control",
    cta: "Get mosquito control",
    accent: "teal",
    stat: { value: "30-min", label: "response time" },
  },
  {
    id: "protected",
    image: "/images/carousel/protected-home.jpg",
    alt: "Modern South Indian home protected and pest-free at twilight",
    eyebrow: "The promise",
    title: "Your space,",
    highlight: "protected for 180 days.",
    description:
      "Every treatment ends with a written 180-day warranty, free re-inspection at day 7, and child-safe documentation. 12,000+ South Indian families already trust Siva.",
    href: "/contact",
    cta: "Book free inspection",
    accent: "orange",
    stat: { value: "12,000+", label: "homes protected" },
  },
];

const SLIDE_DURATION = 6000; // ms per slide

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const pointerStartX = useRef(0);

  const next = useCallback(
    () => setActive((i) => (i + 1) % SLIDES.length),
    []
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  // Auto-advance
  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(t);
  }, [paused, reduceMotion, next]);

  // Keyboard nav
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  // Swipe (pointer events)
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - pointerStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  };

  const slide = SLIDES[active];

  const accentColor =
    slide.accent === "teal" ? "#719899" : slide.accent === "rust" ? "#99341F" : "#D77005";

  return (
    <section
      className="relative h-[88vh] min-h-[640px] w-full overflow-hidden bg-brown"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Pest control stories — what we treat, how we treat, what we deliver"
      aria-live="polite"
    >
      {/* === Background image crossfade === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={active === 0 ? false : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={active === 0}
            loading={active === 0 ? "eager" : "lazy"}
            sizes="100vw"
            className="object-cover"
          />
          {/* Cinematic gradient for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,18,10,0.80) 0%, rgba(40,28,16,0.40) 35%, rgba(51,36,22,0.55) 75%, rgba(28,18,10,0.92) 100%)",
            }}
          />
          {/* Left-side gradient so text is readable on the left */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(28,18,10,0.85) 0%, rgba(28,18,10,0.55) 35%, rgba(28,18,10,0.2) 60%, rgba(28,18,10,0.3) 100%)",
            }}
          />
          {/* Accent glow */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(circle at 12% 92%, ${accentColor}55 0%, transparent 50%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* === Foreground content === */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={active === 0 ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow with accent dot */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  {slide.eyebrow}
                </div>

                {/* Title */}
                <h1
                  className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
                  style={{
                    textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.65)",
                  }}
                >
                  {slide.title}{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${accentColor} 0%, #F4B266 100%)`,
                    }}
                  >
                    {slide.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p
                  className="mt-5 max-w-xl text-base leading-relaxed text-white/90 text-pretty sm:text-lg"
                  style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
                >
                  {slide.description}
                </p>

                {/* Stat callout */}
                {slide.stat && (
                  <div className="mt-6 inline-flex items-baseline gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur-md">
                    <span className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {slide.stat.value}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                      {slide.stat.label}
                    </span>
                  </div>
                )}

                {/* CTAs */}
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={slide.href}
                    onClick={() =>
                      trackCTAClick({
                        location: "hero-slider",
                        label: slide.cta,
                        href: slide.href,
                      })
                    }
                    className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.02] gradient-orange"
                  >
                    {slide.cta}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={`tel:${company.phonePrimaryHref}`}
                    onClick={() =>
                      trackPhoneClick({
                        location: "hero-slider",
                        phone: company.phonePrimary,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
                  >
                    <Phone className="h-4 w-4" />
                    {company.phonePrimary}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* === Trust row (always visible) === */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/85">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-orange text-orange" />
                ))}
                <span className="ml-1.5 font-semibold">4.9/5</span>
                <span className="text-white/60">· {company.stats.googleReviews}+ reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-orange" />
                Child-safe
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-orange" />
                180-day warranty
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-orange" />
                {company.stats.avgResponseMins}-min response
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Bottom: slide indicators + progress bar === */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        {/* Progress bar */}
        {!reduceMotion && !paused && (
          <div className="h-0.5 w-full bg-white/15">
            <motion.div
              key={active + (paused ? "p" : "r")}
              className="h-full origin-left"
              style={{ backgroundColor: accentColor }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            />
          </div>
        )}

        {/* Dots */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                aria-current={i === active}
                className="group relative h-2 overflow-hidden rounded-full bg-white/25 transition-all"
                style={{ width: i === active ? 40 : 16 }}
              >
                {i === active && (
                  <span
                    className="absolute inset-0"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <div className="hidden font-display text-sm font-bold text-white/80 sm:block">
            <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-white/40"> / {String(SLIDES.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
