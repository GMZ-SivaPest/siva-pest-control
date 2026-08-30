"use client";

import Link from "next/link";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { SouthIndiaMap } from "./south-india-map";
import { locations } from "@/data/locations";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowUpRight, Star, Users } from "lucide-react";

/**
 * LocationsMap — "Where we serve" section on the homepage.
 * Uses the realistic South India map with interactive city markers.
 */
export function LocationsMap() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="absolute inset-0 -z-10 gradient-warm" />
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Where we serve"
          title="Protecting homes across South India"
          subtitle="Local teams, local knowledge, local response — backed by the resources and protocols of a regional network spanning four states."
        />

        <div className="mt-8 grid gap-8 lg:gap-10 items-start">
          {/* FULL-WIDTH MAP HERO — compact landscape, fits any device viewport */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brown/10 bg-white/60 p-5 shadow-premium sm:p-8">
              <div className="absolute inset-0 bg-dot-warm opacity-20" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between px-2">
                  <h3 className="font-display text-lg font-bold text-brown">
                    South India service network
                  </h3>
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange">
                    Live network
                  </span>
                </div>
                <SouthIndiaMap showDetail={false} />
              </div>
            </div>
          </Reveal>

          {/* CITY CARDS — 2-column grid below the map */}
          <div className="grid gap-4 sm:grid-cols-2">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.slug}
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
                    <p className="mt-1 text-xs font-medium text-brown/70">{loc.tagline}</p>
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
                      <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[10px] font-semibold text-teal">
                        Nearby by call
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA link */}
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-orange/30 bg-orange/5 px-6 py-3 text-sm font-semibold text-orange transition-all hover:bg-orange hover:text-white"
            >
              View all service areas
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
