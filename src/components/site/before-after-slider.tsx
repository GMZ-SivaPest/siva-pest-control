"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * BeforeAfterSlider — draggable image comparison.
 *
 * Visual metaphor: "This is the problem. This is the result."
 * Uses existing carousel images (infestation → clean space).
 * Draggable handle, click-to-position, keyboard accessible.
 */
interface Comparison {
  id: string;
  title: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}

const COMPARISONS: Comparison[] = [
  {
    id: "kitchen",
    title: "Cockroach infestation → Gel-bait treated kitchen",
    before: {
      src: "/images/before-after/kitchen-before.jpg",
      alt: "South Indian apartment kitchen corner with German cockroach infestation — before treatment",
    },
    after: {
      src: "/images/before-after/kitchen-after.jpg",
      alt: "Same South Indian apartment kitchen corner after Siva gel-bait treatment — clean and pest-free",
    },
  },
  {
    id: "termite",
    title: "Termite damage → Drill-fill-seal barrier",
    before: {
      src: "/images/before-after/termite-before.jpg",
      alt: "Wooden door frame with severe subterranean termite damage and mud tubes — before treatment",
    },
    after: {
      src: "/images/before-after/termite-after.jpg",
      alt: "Same wooden door frame after Siva drill-fill-seal termite barrier treatment — sealed and protected",
    },
  },
  {
    id: "mosquito",
    title: "Mosquito breeding ground → Fogged & treated yard",
    before: {
      src: "/images/before-after/mosquito-before.jpg",
      alt: "Residential backyard with stagnant water puddle and mosquito swarm — before treatment",
    },
    after: {
      src: "/images/before-after/mosquito-after.jpg",
      alt: "Same backyard corner after Siva fogging and larvicide treatment — dry, clean, mosquito-free",
    },
  },
];

export function BeforeAfterSlider() {
  const [activeId, setActiveId] = useState(COMPARISONS[0].id);
  const [position, setPosition] = useState(50); // 0 = all before, 100 = all after
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const active = COMPARISONS.find((c) => c.id === activeId)!;

  const updateFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  }, []);

  // Pointer events for unified mouse + touch
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  // Keyboard: left/right arrows move slider 5%
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    }
  };

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="See the difference"
          title="The result, not the marketing"
          subtitle="Drag the slider to see what our treatments actually deliver. Each pair shows the same scene before and after a Siva treatment — real field photography, no stock images, no filters."
        />

        {/* Tab switcher */}
        <Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {COMPARISONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all ${
                  activeId === c.id
                    ? "bg-orange text-white shadow-glow-orange"
                    : "bg-white text-brown/70 ring-1 ring-brown/10 hover:ring-orange/30"
                }`}
              >
                {c.title.split(" → ")[0]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Slider */}
        <Reveal>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto mt-8 max-w-4xl"
          >
            <div
              ref={containerRef}
              className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-brown/10 shadow-premium-lg"
              onPointerDown={(e) => {
                draggingRef.current = true;
                updateFromClientX(e.clientX);
              }}
              onKeyDown={onKeyDown}
              tabIndex={0}
              role="slider"
              aria-valuenow={Math.round(position)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Before/after comparison slider"
            >
              {/* AFTER image (bottom layer, full visible) */}
              <Image
                src={active.after.src}
                alt={active.after.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
              />
              {/* BEFORE image (top layer, clipped via clip-path so it stays
                  aligned with the after image without setting width on a
                  fill Image — Next.js forbids fill + style.width) */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - position}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - position}% 0 0)`,
                }}
              >
                <Image
                  src={active.before.src}
                  alt={active.before.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Labels */}
              <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-brown/85 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur">
                Before
              </div>
              <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-glow-orange">
                After
              </div>

              {/* Caption */}
              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-center text-xs font-semibold text-brown shadow-premium backdrop-blur">
                {active.title}
              </div>

              {/* Divider + handle */}
              <div
                className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)]"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brown shadow-premium-lg ring-1 ring-brown/10">
                  <MoveHorizontal className="h-5 w-5" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-brown/60">
              Drag the handle, click anywhere on the image, or use ← → arrow keys
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
