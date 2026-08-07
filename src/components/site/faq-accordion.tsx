"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export interface FaqItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FaqItem[];
  className?: string;
  defaultOpen?: number;
}

export function FAQAccordion({ items, className, defaultOpen = 0 }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={i} delay={i * 0.04}>
            <div
              className={cn(
                "overflow-hidden rounded-2xl border bg-white transition-colors",
                isOpen
                  ? "border-orange/30 shadow-premium"
                  : "border-brown/10 hover:border-brown/20"
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                aria-expanded={isOpen}
              >
                <span
                  className={cn(
                    "font-display text-base font-semibold transition-colors sm:text-lg",
                    isOpen ? "text-orange" : "text-brown"
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all",
                    isOpen
                      ? "bg-orange text-white rotate-180"
                      : "bg-brown/5 text-brown"
                  )}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                      <p className="text-sm leading-relaxed text-brown/70 sm:text-[15px]">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
