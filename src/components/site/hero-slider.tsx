"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, Phone, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";
import { locations } from "@/data/locations";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";
import { Marquee } from "./marquee";

/**
 * HeroSlider — compact, light-theme hero.
 *
 * Design brief: "light colours, shorter height, auto-scrolling images with a
 * little bit of title, description and CTA".
 *
 * Layout
 *   - Light ivory canvas (brand `gradient-warm` + faint warm grid) with two
 *     soft glows, so the top of the page matches the rest of the site
 *     instead of the previous full-bleed dark wash.
 *   - Left column: eyebrow pill, short two-line headline, a single-sentence
 *     blurb, one primary CTA + a phone CTA, then a static trust line.
 *   - Right column: a bordered white frame holding the auto-advancing photo
 *     (crossfade + slow zoom) with the chapter chip, the slide stat and the
 *     chapter dots over it. Desktop height is 320px — the whole hero lands
 *     around 470px tall instead of a full viewport.
 *   - Below: an auto-scrolling thumbnail ribbon (the shared <Marquee />)
 *     showing every chapter as a clickable frame.
 *
 * Behaviour
 *   - Auto-advances every SLIDE_DURATION ms; pauses on hover/focus and while
 *     the tab is hidden. Swipeable, arrow-key navigable, dots are buttons
 *     with aria-current. prefers-reduced-motion disables zoom + autoplay.
 *
 * Height is intentionally fixed (`h-[200px] sm:h-[260px] lg:h-[320px]`) and
 * the copy block reserves a min-height so advancing slides never shift the
 * layout — the page below the hero stays perfectly still.
 */

interface Slide {
  id: string;
  /** Short label used by the dot/thumbnail accessible names. */
  chapter: string;
  image: string;
  alt: string;
  /** Small chip over the photo. */
  eyebrow: string;
  title: string;
  highlight: string;
  /** One-sentence summary shown in the left column. */
  blurb: string;
  href: string;
  cta: string;
  stat: { value: string; label: string };
}

const SLIDES: Slide[] = [
  {
    id: "infestation",
    chapter: "Kitchen",
    image: "/images/carousel/cockroach-colony.jpg",
    alt: "German cockroaches scattering across a kitchen counter",
    eyebrow: "Kitchen infestation",
    title: "When you see one,",
    highlight: "there are hundreds.",
    blurb:
      "German cockroaches hide by day and raid your kitchen by night. Gel-bait treatment collapses the colony in 7 days.",
    href: "/services/cockroach-gel-treatment",
    cta: "Get cockroach treatment",
    stat: { value: "1 → 30,000", label: "in 90 days" },
  },
  {
    id: "termite-threat",
    chapter: "Termites",
    image: "/images/carousel/termite-damage.jpg",
    alt: "Subterranean termite damage on a wooden door frame with mud tubes",
    eyebrow: "Structural damage",
    title: "They eat 24/7 —",
    highlight: "you'll never hear them.",
    blurb:
      "Termites hollow out frames, furniture and even RCC. A warranty-backed barrier stops them before the damage spreads.",
    href: "/services/termite-control",
    cta: "Get a termite barrier",
    stat: { value: "5-year", label: "warranty barrier" },
  },
  {
    id: "rodent-fire",
    chapter: "Rodents",
    image: "/images/carousel/rodent-infestation.jpg",
    alt: "Rodent droppings and chewed electrical wiring in an attic",
    eyebrow: "Fire risk",
    title: "Rats chew wires —",
    highlight: "and start fires.",
    blurb:
      "Rodents cause 25% of urban house fires by chewing wiring. Sealed entry points plus bait stations end the cycle.",
    href: "/services/rodent-control",
    cta: "Get rodent control",
    stat: { value: "25%", label: "of urban house fires" },
  },
  {
    id: "treatment",
    chapter: "Method",
    image: "/images/carousel/kitchen-treatment.jpg",
    alt: "Siva technician applying targeted gel-bait inside a kitchen cabinet",
    eyebrow: "Science-led protocol",
    title: "Targeted gel-bait,",
    highlight: "not blanket spray.",
    blurb:
      "Odourless micro-dots placed exactly where pests live. No spraying, no smell, no need to leave the house.",
    href: "/services/cockroach-gel-treatment",
    cta: "See how it works",
    stat: { value: "7 days", label: "to colony collapse" },
  },
  {
    id: "mosquito-fogging",
    chapter: "Outdoors",
    image: "/images/carousel/mosquito-fogging.png",
    alt: "Outdoor mosquito fogging treatment in a residential compound",
    eyebrow: "Garden & terrace",
    title: "Reclaim your",
    highlight: "garden & terrace.",
    blurb:
      "Thermal fogging plus larvicide breaks the breeding cycle — real protection from dengue, malaria and chikungunya.",
    href: "/services/mosquito-control",
    cta: "Get mosquito control",
    stat: { value: "30 min", label: "average response" },
  },
  {
    id: "protected",
    chapter: "Guarantee",
    image: "/images/carousel/protected-home.jpg",
    alt: "Modern South Indian home, clean and pest-free, at twilight",
    eyebrow: "Guaranteed outcome",
    title: "Your space,",
    highlight: "protected for 180 days.",
    blurb:
      "A written 180-day warranty, a free day-7 re-inspection and child-safe documentation with every single job.",
    href: "/contact",
    cta: "Book a service",
    stat: { value: "12,000+", label: "homes protected" },
  },
];

/** Per-slide time on screen (ms) — drives auto-advance and the progress bar. */
const SLIDE_DURATION = 6000;

/** Static trust signals under the CTAs — identical on every slide. */
const TRUST_SIGNALS = [
  { icon: ShieldCheck, label: `${company.stats.warrantyDays}-day written warranty` },
  { icon: Clock, label: `${company.stats.avgResponseMins}-minute response` },
  {
    icon: Star,
    label: `${company.stats.googleRating}/5 · ${company.stats.googleReviews}+ Google reviews`,
  },
];

export function HeroSlider() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const pointerStartX = useRef(0);

  /* ---------- Navigation ---------- */
  const next = useCallback(() => setActive((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);
  const goTo = useCallback((index: number) => setActive(index), []);

  /* ---------- Stop the clock while the tab is backgrounded ---------- */
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* ---------- Auto-advance ---------- */
  useEffect(() => {
    if (paused || tabHidden || reduceMotion) return;
    const timer = window.setInterval(next, SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, [paused, tabHidden, reduceMotion, next]);

  /* ---------- Keyboard ---------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  /* ---------- Touch / pointer swipe ---------- */
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
  const isPaused = paused || tabHidden || Boolean(reduceMotion);

  return (
    <section
      className="relative isolate overflow-hidden bg-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Siva Pest Control — treatments, method and guarantee"
    >
      {/* ---------- Light canvas: warm wash, glow blobs, faint grid ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 gradient-warm" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange/20 blur-[110px]" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-teal/20 blur-[120px]" />
        <div
          className="absolute inset-0 bg-grid-warm opacity-70"
          style={{
            maskImage: "radial-gradient(110% 80% at 12% 0%, #000 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(110% 80% at 12% 0%, #000 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
          {/* ================= LEFT — compact copy ================= */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-orange-ink uppercase ring-1 ring-orange/20">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              </span>
              Licensed IPM · {locations.length} cities · {company.stats.homesProtected.toLocaleString("en-IN")}
              + homes protected
            </div>

            {/* Reserved height lives OUTSIDE AnimatePresence so the layout
                never collapses during the exit→enter gap. */}
            <div className="min-h-[8.5rem] lg:min-h-[9.75rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={active === 0 ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                <h1 className="mt-4 font-display text-[1.75rem] leading-[1.14] font-extrabold tracking-tight text-balance text-brown sm:text-4xl lg:text-[2.5rem]">
                    {slide.title}{" "}
                    {/* orange-deep → orange-ink keeps the accent above the
                        3:1 large-text minimum on the ivory canvas. */}
                    <span className="bg-gradient-to-r from-orange-deep to-orange-ink bg-clip-text text-transparent">
                      {slide.highlight}
                    </span>
                  </h1>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-brown/70 sm:text-base">
                    {slide.blurb}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={slide.href}
                onClick={() =>
                  trackCTAClick({ location: "hero", label: slide.cta, href: slide.href })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-glow-orange gradient-orange transition-transform hover:scale-[1.02]"
              >
                {slide.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${company.phonePrimaryHref}`}
                onClick={() => trackPhoneClick({ location: "hero", phone: company.phonePrimary })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3 text-sm font-semibold text-brown shadow-lift transition-colors hover:border-orange/40 hover:text-orange-ink"
              >
                <Phone className="h-4 w-4" />
                {company.phonePrimary}
              </a>
            </div>

            {/* Static trust line */}
            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-brown/65 sm:text-xs">
              {TRUST_SIGNALS.map((signal) => (
                <li key={signal.label} className="flex items-center gap-1.5">
                  <signal.icon
                    className="h-3.5 w-3.5 shrink-0 text-orange-ink"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {signal.label}
                </li>
              ))}
            </ul>

            {/* Chapter counter */}
            <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-brown/40 uppercase">
              Chapter {String(active + 1).padStart(2, "0")} of {String(SLIDES.length).padStart(2, "0")} ·{" "}
              {slide.chapter}
            </p>
          </div>

          {/* ================= RIGHT — auto-advancing photo panel ================= */}
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-orange/15 blur-2xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-brown/10 bg-white p-2 shadow-premium-lg">
              <div className="relative h-[200px] overflow-hidden rounded-[1.25rem] bg-ivory-deep sm:h-[260px] lg:h-[320px]">
                {/* All frames stay mounted and crossfade via opacity. Mounting
                    on demand would flash an empty frame whenever the photo is
                    not yet decoded (dot-jumps, slow networks), so the payload
                    is paid up-front instead — only frame 1 is `priority`, so
                    the LCP image still wins the bandwidth race. */}
                {SLIDES.map((s, i) => (
                  <motion.div
                    key={s.id}
                    className="absolute inset-0"
                    initial={i === active ? { opacity: 1, scale: 1 } : false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1.12 : 1 }}
                    transition={{
                      opacity: { duration: 0.8, ease: "easeOut" },
                      scale: { duration: reduceMotion ? 0 : 9, ease: "linear" },
                    }}
                  >
                    <Image
                      src={s.image}
                      alt={i === active ? s.alt : ""}
                      fill
                      sizes="(max-width: 1024px) 92vw, 52vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </motion.div>
                ))}

                {/* Bottom scrim — keeps the overlaid text readable on any photo */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brown/75 to-transparent" />

                {/* Chapter chip */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-brown uppercase shadow-lift backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden />
                  {slide.eyebrow}
                </div>

                {/* Stat + chapter dots */}
                <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.stat.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="font-display text-xl leading-none font-extrabold text-white sm:text-2xl">
                        {slide.stat.value}
                      </div>
                      <div className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-white/80 uppercase">
                        {slide.stat.label}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex shrink-0 items-center gap-1.5">
                    {SLIDES.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Show the ${s.chapter} slide`}
                        aria-current={i === active ? "true" : undefined}
                        className={cn(
                          "block rounded-full transition-all duration-500",
                          i === active
                            ? "h-2 w-7 bg-white"
                            : "h-2 w-2 bg-white/50 hover:bg-white/80"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Auto-advance progress */}
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25" aria-hidden>
                  <motion.div
                    key={`${slide.id}-${isPaused}`}
                    className="h-full bg-orange"
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "0%" : "100%" }}
                    transition={{ duration: isPaused ? 0 : SLIDE_DURATION / 1000, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Auto-scrolling chapter ribbon (click any frame to jump) ---------- */}
        <div className="mask-fade-edges relative mt-6 lg:mt-8">
          <Marquee
            speed={40}
            trackClassName="items-center gap-3 py-1"
            ariaLabel="Browse the hero chapters"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show the ${s.chapter} slide`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "group relative h-10 w-20 flex-shrink-0 overflow-hidden rounded-xl border transition-all sm:h-11 sm:w-28",
                  i === active
                    ? "border-orange/60 ring-2 ring-orange/25"
                    : "border-brown/10 hover:border-orange/35"
                )}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={cn(
                    "absolute inset-0 transition-colors",
                    i === active ? "bg-brown/10" : "bg-brown/35 group-hover:bg-brown/20"
                  )}
                />
                <span className="absolute bottom-1 left-1.5 text-[9px] font-bold tracking-[0.12em] text-white uppercase drop-shadow">
                  {s.chapter}
                </span>
              </button>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}