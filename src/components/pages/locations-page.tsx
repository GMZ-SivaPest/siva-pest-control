"use client";

import { PageHero } from "@/components/site/page-hero";
import { LocationsMap } from "@/components/site/locations-map";
import { CTASection } from "@/components/site/cta-section";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { locations } from "@/data/locations";
import { company } from "@/data/company";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Star, Users, Clock } from "lucide-react";

export function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we serve"
        title="Three cities, one standard of excellence"
        subtitle={`Local field teams in Hyderabad, Chennai and Bangalore — ${company.stats.technicians} certified technicians, 74+ coverage zones, 30-minute average response. We're not a national call-centre; we're your neighbours.`}
        breadcrumb={[{ label: "Home", view: "home" }, { label: "Locations" }]}
      />

      <LocationsMap />

      {/* Detailed coverage table */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Coverage detail"
            title="Every zone we serve, in every city"
            subtitle="If your area isn't listed, call us — we're often able to accommodate nearby pin codes."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium"
              >
                {/* Header */}
                <div className="relative bg-gradient-to-br from-brown to-[#1a0f08] p-6 text-white">
                  <div className="absolute inset-0 bg-dot-warm opacity-[0.05]" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-orange" />
                        <h3 className="font-display text-xl font-bold">{loc.city}</h3>
                      </div>
                      <span className="rounded-full bg-orange/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange">
                        {loc.state}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">{loc.tagline}</p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-teal" />
                        {loc.technicians} techs
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-orange text-orange" />
                        {loc.rating} ({loc.reviewsCount})
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-orange" />
                        {loc.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brown/70">
                    Coverage zones
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {loc.coverage.map((area) => (
                      <span
                        key={area}
                        className="rounded-full bg-brown/5 px-2.5 py-1 text-[11px] font-medium text-brown/70"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-brown/[0.03] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/70">
                      Field office
                    </div>
                    <div className="mt-1 text-xs text-brown/75">
                      {loc.address.line1}
                      <br />
                      {loc.address.landmark}
                      <br />
                      {loc.address.line2} - {loc.address.pincode}
                    </div>
                    <a
                      href={`tel:${loc.phoneHref}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-orange hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {loc.phone}
                    </a>
                  </div>

                  <Link
                    href={`/locations/${loc.slug}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-4 py-2.5 text-sm font-semibold text-brown transition-all hover:border-orange/40 hover:text-orange"
                  >
                    View {loc.city} detail
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Don't see your area listed?"
        subtitle="Call us — we cover nearby pin codes and are expanding our coverage zones every quarter."
      />
    </>
  );
}
