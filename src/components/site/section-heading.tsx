"use client";

import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

/**
 * SectionHeading — consistent section header across the site.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
            light
              ? "bg-white/10 text-white/80 ring-1 ring-white/20"
              : "bg-orange/10 text-orange ring-1 ring-orange/20"
          )}
        >
          <span className="h-1 w-1 rounded-full bg-current" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.85rem] md:leading-[1.1]",
          light ? "text-white" : "text-brown"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg text-pretty",
            light ? "text-white/70" : "text-brown/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
