"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNav } from "@/lib/store";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; view?: string }[];
  variant?: "default" | "dark";
}

/**
 * PageHero — consistent hero for sub-pages (About, Services, etc.)
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  variant = "default",
}: PageHeroProps) {
  const navigate = useNav((s) => s.navigate);
  const isDark = variant === "dark";

  return (
    <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="absolute inset-0 -z-10">
        {isDark ? (
          <>
            <div className="absolute inset-0 gradient-brown" />
            <div className="absolute inset-0 bg-dot-warm opacity-[0.05]" />
            <div
              className="absolute -top-32 left-1/2 h-96 w-[640px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 gradient-warm" />
            <div className="absolute inset-0 bg-grid-warm opacity-40" />
            <div
              className="absolute -top-32 left-1/2 h-96 w-[640px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, #E8D2B5 0%, transparent 70%)" }}
            />
          </>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Breadcrumb */}
          {breadcrumb && (
            <motion.nav
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "mb-6 flex items-center justify-center gap-1.5 text-xs",
                isDark ? "text-white/60" : "text-brown/55"
              )}
            >
              {breadcrumb.map((crumb, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  {crumb.view ? (
                    <button
                      onClick={() => navigate(crumb.view!)}
                      className="transition-colors hover:text-orange"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className={isDark ? "text-white/80" : "text-brown/80"}>
                      {crumb.label}
                    </span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <ChevronRight className="h-3 w-3 opacity-60" />
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className={cn(
                "mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
                isDark
                  ? "bg-white/10 text-white/80 ring-1 ring-white/20"
                  : "bg-orange/10 text-orange ring-1 ring-orange/20"
              )}
            >
              <span className="h-1 w-1 rounded-full bg-current" />
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-[3.25rem] md:leading-[1.08]",
              isDark ? "text-white" : "text-brown"
            )}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
                isDark ? "text-white/70" : "text-brown/70"
              )}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
