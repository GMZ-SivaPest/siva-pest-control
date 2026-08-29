"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bug } from "lucide-react";

/**
 * PestTrailDivider — organic section separator with a subtle animated
 * pest trail (small dots + a single pest silhouette) drifting along the line.
 *
 * Usage: place between two homepage sections to add visual rhythm
 * without screaming "BUGS!" — matches the 10% pest accent rule from
 * the design playbook.
 *
 * Variants:
 *   - "ant"   → tiny dots in a row (ant trail)
 *   - "mosquito" → wavy line with single mosquito emoji
 *   - "minimal" → just dots, no pest
 */
interface PestTrailDividerProps {
  variant?: "ant" | "mosquito" | "minimal";
  className?: string;
}

export function PestTrailDivider({
  variant = "ant",
  className = "",
}: PestTrailDividerProps) {
  const reduceMotion = useReducedMotion();

  if (variant === "mosquito") {
    return (
      <div
        className={`relative flex items-center justify-center py-8 ${className}`}
        aria-hidden
      >
        <div className="relative h-8 w-full max-w-3xl">
          {/* Wavy line */}
          <svg
            viewBox="0 0 100 8"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4"
              stroke="var(--color-brown-soft, #B8A78A)"
              strokeWidth="0.2"
              strokeDasharray="1 1"
              opacity="0.5"
            />
          </svg>
          {/* Mosquito drifting along the wave */}
          {!reduceMotion && (
            <motion.span
              className="absolute top-1/2 -translate-y-1/2"
              animate={{
                left: ["2%", "96%", "2%"],
                top: ["50%", "20%", "50%", "80%", "50%"],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Bug className="h-4 w-4 text-brown/50" />
            </motion.span>
          )}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div
        className={`flex items-center justify-center gap-2 py-10 ${className}`}
        aria-hidden
      >
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-brown/30"
            animate={
              reduceMotion
                ? {}
                : { opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  // Default: "ant" trail — dotted line with single ant + tiny dots
  return (
    <div
      className={`relative flex items-center justify-center py-10 ${className}`}
      aria-hidden
    >
      <div className="relative flex w-full max-w-3xl items-center">
        {/* Left dashed line */}
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brown/20 to-brown/30" />

        {/* Ant trail — 6 dots + 1 ant */}
        <div className="relative mx-4 flex items-center gap-1.5">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-brown/40"
              animate={
                reduceMotion
                  ? {}
                  : { opacity: [0.2, 0.8, 0.2] }
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
          {!reduceMotion && (
            <motion.span
              className="ml-1"
              animate={{ x: [0, 6, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Bug className="h-3.5 w-3.5 text-brown/50" />
            </motion.span>
          )}
        </div>

        {/* Right dashed line */}
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-brown/20 to-brown/30" />
      </div>
    </div>
  );
}
