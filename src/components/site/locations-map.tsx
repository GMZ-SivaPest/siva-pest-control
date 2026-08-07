"use client";

import { motion } from "framer-motion";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { locations } from "@/data/locations";
import { useNav } from "@/lib/store";
import { ArrowUpRight, MapPin, Phone, Star, Users } from "lucide-react";

/**
 * LocationsMap — stylised South India map with three city pins,
 * coverage zones, and city detail cards.
 */
export function LocationsMap() {
  const navigate = useNav((s) => s.navigate);

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 -z-10 gradient-warm" />
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Where we serve"
          title="Three cities, one standard of excellence"
          subtitle="Local teams, local knowledge, local response — backed by the resources and protocols of a regional network."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* LEFT — Stylised map */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brown/10 bg-white/60 p-6 shadow-premium sm:p-8">
              <div className="absolute inset-0 bg-dot-warm opacity-30" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-brown">
                    South India coverage
                  </h3>
                  <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange">
                    Live network
                  </span>
                </div>

                {/* SVG map */}
                <svg viewBox="0 0 100 100" className="w-full" fill="none">
                  <defs>
                    <linearGradient id="map-grad" x1="0" y1="0" x2="100" y2="100">
                      <stop offset="0" stopColor="#E8D2B5" stopOpacity="0.6" />
                      <stop offset="1" stopColor="#D8AE7F" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Stylised South India outline */}
                  <path
                    d="M 20 35 Q 25 30 35 32 L 45 28 Q 55 26 60 35 L 65 45 Q 68 55 65 65 L 60 78 Q 55 88 48 90 L 40 85 Q 30 80 25 70 L 22 60 Q 18 50 20 35 Z"
                    fill="url(#map-grad)"
                    stroke="#332416"
                    strokeWidth="0.3"
                    strokeOpacity="0.3"
                  />

                  {/* Connecting lines between cities */}
                  <line x1="40" y1="58" x2="50" y2="75" stroke="#D77005" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.5" />
                  <line x1="50" y1="75" x2="60" y2="78" stroke="#D77005" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.5" />
                  <line x1="40" y1="58" x2="60" y2="78" stroke="#719899" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                </svg>

                {/* City pins overlaid */}
                <div className="absolute inset-0">
                  {locations.map((loc, i) => (
                    <motion.button
                      key={loc.slug}
                      onClick={() => navigate(`location:${loc.slug}`)}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${loc.mapCoords.x}%`, top: `${loc.mapCoords.y}%` }}
                    >
                      <span
                        className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-orange/40"
                        style={{ animation: `pulse-ring 2.5s ease-out infinite ${i * 0.5}s` }}
                      />
                      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lift ring-2 ring-orange transition-transform group-hover:scale-125">
                        <span className="h-2 w-2 rounded-full bg-orange" />
                      </span>
                      <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-brown">
                        {loc.city}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Map stats footer */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-brown/10 pt-4 text-center">
                  <div>
                    <div className="font-display text-lg font-bold text-brown">3</div>
                    <div className="text-[10px] uppercase tracking-wider text-brown/55">Cities</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-brown">78</div>
                    <div className="text-[10px] uppercase tracking-wider text-brown/55">Technicians</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-brown">74+</div>
                    <div className="text-[10px] uppercase tracking-wider text-brown/55">Zones</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — City cards */}
          <div className="grid gap-4">
            {locations.map((loc, i) => (
              <motion.button
                key={loc.slug}
                onClick={() => navigate(`location:${loc.slug}`)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-2xl border border-brown/10 bg-white p-5 text-left shadow-premium transition-all hover:shadow-lift sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange" />
                      <h3 className="font-display text-xl font-bold text-brown">
                        {loc.city}
                      </h3>
                      <span className="rounded-full bg-brown/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brown/60">
                        {loc.state}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-brown/55">{loc.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-brown/70">
                      {loc.shortIntro}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brown/65">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-teal" />
                        {loc.technicians} technicians
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-orange text-orange" />
                        {loc.rating} ({loc.reviewsCount.toLocaleString("en-IN")} reviews)
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-orange" />
                        {loc.phone}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {loc.coverage.slice(0, 5).map((area) => (
                        <span
                          key={area}
                          className="rounded-full bg-brown/5 px-2.5 py-0.5 text-[10px] font-medium text-brown/65"
                        >
                          {area}
                        </span>
                      ))}
                      <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[10px] font-semibold text-orange">
                        +{loc.coverage.length - 5} more
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brown/5 text-brown transition-all group-hover:scale-110 group-hover:bg-orange group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
