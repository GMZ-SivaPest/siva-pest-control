"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  size?: number;
  withWordmark?: boolean;
  variant?: "default" | "light";
}

/**
 * LogoMark — the Siva Pest Control brand seal.
 * Uses the official logo PNG and pairs it with a typographic wordmark.
 * The logo itself is the single source of truth for the brand mark;
 * only the wordmark color adapts to light/dark backgrounds.
 */
export function LogoMark({
  className,
  size = 44,
  withWordmark = true,
  variant = "default",
}: LogoMarkProps) {
  // WCAG: rgba(51,36,22,0.6) on ivory gives only 3.95:1 contrast, failing
  // the 4.5:1 minimum. Bumping alpha to 0.85 yields ~7:1 contrast on ivory
  // (#4F4036 on #F7F1E8) — comfortably passes AA for the small uppercase
  // tagline text. The light variant stays at 0.7 because white backdrop
  // gives higher base contrast.
  const textColor = variant === "light" ? "#FFFFFF" : "#332416";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "rgba(51,36,22,0.85)";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex-shrink-0 overflow-hidden rounded-full",
          variant === "light" ? "ring-2 ring-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.35)]" : "ring-1 ring-brown/10"
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Siva Pest Control logo"
          fill
          sizes={`${size}px`}
          priority
          className="object-cover"
        />
      </div>

      {withWordmark && (
        <div className="flex flex-col leading-tight">
          <span
            className="font-display text-[15px] font-bold tracking-tight"
            style={{ color: textColor }}
          >
            SIVA PEST CONTROL
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: subColor }}
          >
            Protection · Science · Trust
          </span>
        </div>
      )}
    </div>
  );
}
