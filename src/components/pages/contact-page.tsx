"use client";

import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { FAQAccordion } from "@/components/site/faq-accordion";
import { SouthIndiaMap } from "@/components/site/south-india-map";
import { locations } from "@/data/locations";
import { company } from "@/data/company";
import { faqs } from "@/data/faqs";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, Users, Star, Navigation } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

/**
 * FAQ home — the standalone /faq page has been removed; the contact page
 * now carries ALL general FAQs (general, safety, booking, warranty).
 * Service-specific FAQs live on service detail pages (services.ts) and
 * city FAQs on location detail pages (locations.ts).
 * Mirrored as FAQPage JSON-LD in src/app/contact/page.tsx — keep the two
 * lists in sync.
 */
const contactFaqs = faqs;

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's design your protection plan"
        subtitle="Free inspection, fixed-price quote, certified technician dispatch. Our team responds within 30 minutes during business hours — across all four cities."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "Contact" }]}
      />

      <ContactForm />

      {/* ───────── Where We Serve — South India Map ───────── */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 -z-10 gradient-warm" />
        <div className="absolute inset-0 -z-10 bg-grid-warm opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Where we serve"
            title="Service coverage across South India"
            subtitle="Click on any city marker to explore our service areas, field offices, and local expertise."
          />

          <div className="mt-8 grid gap-8 lg:gap-10 items-start">
            {/* Full-width map hero — compact landscape, fits viewport */}
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
                  <SouthIndiaMap />
                </div>
              </div>
            </Reveal>

            {/* City cards — 2-column grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {locations.map((loc, i) => (
                <motion.div
                  key={loc.slug}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="overflow-hidden rounded-2xl border border-brown/10 bg-white/80 shadow-premium"
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange/10 to-orange/5">
                      <MapPin className="h-5 w-5 text-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-brown">
                          {loc.city}
                        </h3>
                        <span className="rounded-full bg-brown/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brown/55">
                          {loc.state}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-brown/60 truncate">
                        {loc.tagline}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-brown/55">
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3 text-teal" />
                          {loc.technicians} techs
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3 fill-orange text-orange" />
                          {loc.rating} ({loc.reviewsCount})
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3 text-orange" />
                          {loc.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-brown/10 px-5 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-brown/70">
                      {loc.shortIntro}
                    </p>

                    {/* Coverage areas */}
                    <div className="mt-4">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/50">
                        Priority service areas
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {loc.coverage.map((area) => (
                          <span
                            key={area}
                            className="rounded-full bg-brown/5 px-2.5 py-1 text-[11px] font-medium text-brown/70"
                          >
                            {area}
                          </span>
                        ))}
                        <span className="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal">
                          + nearby by call
                        </span>
                      </div>
                    </div>

                    {/* Office info */}
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-brown/3 p-3">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/50">
                          Field office
                        </div>
                        <div className="mt-1 text-xs text-brown/70 leading-snug">
                          {loc.address.line1}
                          <br />
                          {loc.address.landmark}
                          <br />
                          {loc.address.line2} - {loc.address.pincode}
                        </div>
                      </div>
                      <div className="rounded-xl bg-brown/3 p-3">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/50">
                          Contact
                        </div>
                        <div className="mt-1 space-y-1.5">
                          <a
                            href={`tel:${loc.phoneHref}`}
                            className="flex items-center gap-1.5 text-xs font-semibold text-orange hover:underline"
                          >
                            <Phone className="h-3 w-3" />
                            {loc.phone}
                          </a>
                          <a
                            href={`mailto:${loc.email}`}
                            className="flex items-center gap-1.5 text-xs text-brown/60 hover:text-orange"
                          >
                            <Mail className="h-3 w-3" />
                            {loc.email}
                          </a>
                          <div className="flex items-center gap-1.5 text-xs text-brown/60">
                            <Clock className="h-3 w-3" />
                            {loc.hours}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Landmarks */}
                    <div className="mt-4">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/50">
                        Nearby landmarks
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {loc.landmarks.slice(0, 4).map((lm) => (
                          <span
                            key={lm}
                            className="inline-flex items-center gap-1 rounded-full bg-orange/5 px-2 py-0.5 text-[10px] text-brown/55"
                          >
                            <Navigation className="h-2.5 w-2.5 text-orange/60" />
                            {lm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── State-wise quick summary ───────── */}
      <section className="py-16 md:py-20 bg-brown/3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="State coverage"
            title="Where we operate"
            subtitle="Our service network spans four South Indian states, each with dedicated field offices and priority service areas."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                state: "Telangana",
                cities: ["Hyderabad"],
                icon: "🏙️",
                highlights: "Largest operation. 14 technicians. Same-day response.",
              },
              {
                state: "Tamil Nadu",
                cities: ["Chennai"],
                icon: "🌊",
                highlights: "Coastal expertise. OMR corridor. Humidity-calibrated.",
              },
              {
                state: "Karnataka",
                cities: ["Bangalore"],
                icon: "💻",
                highlights: "Tech-corridor precision. Gated community specialists.",
              },
              {
                state: "Andhra Pradesh",
                cities: ["Isukapalli"],
                icon: "🌾",
                highlights: "Coastal area coverage. Agricultural storage support.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.state}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-brown/10 bg-white p-6 shadow-premium"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 font-display text-lg font-bold text-brown">
                  {item.state}
                </h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {item.cities.map((city) => (
                    <span
                      key={city}
                      className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange"
                    >
                      {city}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-brown/65 leading-relaxed">
                  {item.highlights}
                </p>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-linear-to-br from-orange/5 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — full general FAQ set (standalone /faq page was removed) */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Before you book"
            title="Frequently asked questions"
            subtitle="Everything most customers ask before booking — safety, scheduling, payment and warranty. Still unsure? Call us — we reply within 30 minutes during business hours."
          />

          <Reveal className="mt-10">
            <FAQAccordion
              items={contactFaqs.map((f) => ({ q: f.q, a: f.a }))}
              defaultOpen={0}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
