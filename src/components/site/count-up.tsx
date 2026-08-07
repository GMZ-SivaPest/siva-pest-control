"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  prefix?: string;
  start?: number;
}

/**
 * CountUp — animates from 0 (or start) to end when scrolled into view.
 */
export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
  start = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (t: number) => {
      if (startTime === null) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, start, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
