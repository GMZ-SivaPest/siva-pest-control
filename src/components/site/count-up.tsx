"use client";

interface CountUpProps {
  end: number;
  suffix?: string;
  className?: string;
  prefix?: string;
  /**
   * Kept for API compatibility. Numbers are no longer counted up from a
   * low start — the final value renders immediately (see below) so stats
   * never flash "0+" before animating.
   */
  start?: number;
  duration?: number;
}

/**
 * CountUp — renders the final value immediately, both on the server
 * (SSR HTML contains the real number for SEO) and on the client, so the
 * stats never show a misleading "0+" before animating.
 *
 * Entrance motion (if any) is handled by the parent card's stagger
 * animation — the number itself is always the true value.
 */
export function CountUp({
  end,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  return (
    <span className={className}>
      {prefix}
      {end.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
