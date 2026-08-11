"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress — thin fixed bar at the very top of the viewport showing
 * page scroll progress in the brand gradient (crimson → gold).
 * Rendered in SiteChrome above everything else (z-60).
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    // Set initial value (scroll position persists across App Router navigations)
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] transition-[width] duration-100 ease-out"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #a32525, #b68d42)",
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
