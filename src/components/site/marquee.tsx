"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Scroll speed in px/second. Default 60. */
  speed?: number;
  /** Viewport wrapper classes (overflow is handled internally). */
  className?: string;
  /** Track classes — use for gap, padding, alignment. */
  trackClassName?: string;
  trackStyle?: CSSProperties;
  /** Pause scrolling on hover (default true). */
  pauseOnHover?: boolean;
  ariaLabel?: string;
}

/**
 * Marquee — continuous auto-scroll row that NEVER shows duplicate content.
 *
 * Unlike a classic CSS marquee (which needs two identical copies of the
 * list so `translateX(-50%)` can loop seamlessly — making every item
 * visibly appear twice), this implementation scrolls a SINGLE set of
 * items with a requestAnimationFrame loop and recycles items off-screen:
 * as soon as the leading item has fully exited the left edge it is moved
 * to the end of the track, so every item is visible exactly once at any
 * moment — no perceived duplication.
 *
 * - Smooth rAF-driven translate (will-change: transform)
 * - Pauses on hover
 * - Respects prefers-reduced-motion (renders static, no animation)
 */
export function Marquee({
  children,
  speed = 60,
  className,
  trackClassName,
  trackStyle,
  pauseOnHover = true,
  ariaLabel,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion: disable the animation entirely.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion) return;

    let raf = 0;
    let x = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1); // clamp tab-switch gaps
      last = now;

      if (!pausedRef.current) {
        x -= speed * dt;

        // Recycle: move the leading item to the end once it has fully
        // cleared the left edge (width + flex gap).
        const first = track.firstElementChild as HTMLElement | null;
        if (first) {
          const gap =
            parseFloat(getComputedStyle(track).columnGap || "0") || 0;
          const stepWidth = first.offsetWidth + gap;
          if (stepWidth > 0 && x <= -stepWidth) {
            x += stepWidth;
            track.appendChild(first);
          }
        }

        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed, reducedMotion]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      onMouseEnter={() => pauseOnHover && (pausedRef.current = true)}
      onMouseLeave={() => pauseOnHover && (pausedRef.current = false)}
    >
      <div
        ref={trackRef}
        className={cn("marquee-track js-marquee-track", trackClassName)}
        style={trackStyle}
      >
        {children}
      </div>
    </div>
  );
}
