"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { useNav } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const navigate = useNav((s) => s.navigate);

  const featured = testimonials.slice(0, 6);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 6000);
    return () => clearInterval(t);
  }, [autoPlay, featured.length]);

  const current = featured[index];

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 -z-10 gradient-brown" />
      <div className="absolute inset-0 -z-10 bg-dot-warm opacity-[0.04]" />
      <div
        className="absolute top-0 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer voices"
          title="Real stories from real customers"
          subtitle="Over 5,700 verified reviews across three cities. Here are a few that capture what we work for."
          light
        />

        {/* Featured testimonial carousel */}
        <Reveal className="mt-12" delay={0.1}>
          <div
            className="relative mx-auto max-w-4xl"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-12">
              <Quote className="absolute right-6 top-6 h-16 w-16 text-orange/15" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Rating */}
                  <div className="mb-5 flex items-center gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange text-orange" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-display text-xl font-medium leading-relaxed text-white text-pretty sm:text-2xl">
                    "{current.text}"
                  </blockquote>

                  {/* Author + meta */}
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
                        <Image
                          src={current.avatar}
                          alt={current.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{current.name}</div>
                        <div className="text-sm text-white/60">{current.role}</div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-white/50">
                          <MapPin className="h-3 w-3" />
                          {current.location}, {current.city}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold text-orange ring-1 ring-orange/30">
                        {current.service}
                      </div>
                      {current.highlight && (
                        <div className="mt-2 text-xs text-white/60">
                          {current.highlight}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setIndex((i) => (i - 1 + featured.length) % featured.length)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-all hover:bg-white/15"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === index ? "w-6 bg-orange" : "w-1.5 bg-white/30 hover:bg-white/50"
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIndex((i) => (i + 1) % featured.length)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-all hover:bg-white/15"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Mini grid of additional testimonials */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(6, 9).map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => navigate("contact")}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur transition-all hover:bg-white/[0.08]"
            >
              <div className="mb-3 flex items-center gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-orange text-orange" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-white/75 line-clamp-4">
                "{t.text}"
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3">
                <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{t.name}</div>
                  <div className="text-[11px] text-white/50">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating ? "fill-orange text-orange" : "text-white/20"
          )}
        />
      ))}
    </div>
  );
}
