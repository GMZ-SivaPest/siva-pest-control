"use client";

import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CTASection } from "@/components/site/cta-section";
import { FAQAccordion } from "@/components/site/faq-accordion";
import { useNav } from "@/lib/store";
import { locationBySlug } from "@/data/locations";
import { testimonialsByCity } from "@/data/testimonials";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Star,
  Navigation,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Quote,
} from "lucide-react";

export function LocationDetailPage({ slug }: { slug: string }) {
  const navigate = useNav((s) => s.navigate);
  const location = locationBySlug(slug);

  if (!location) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-brown">Location not found</h1>
          <button
            onClick={() => navigate("locations")}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to locations
          </button>
        </div>
      </div>
    );
  }

  const cityTestimonials = testimonialsByCity(location.city);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 -z-10 gradient-warm" />
        <div className="absolute inset-0 -z-10 bg-grid-warm opacity-40" />
        <div
          className="absolute -top-32 left-1/2 h-96 w-[640px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, #E8D2B5 0%, transparent 70%)" }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center gap-1.5 text-xs text-brown/70"
          >
            <button onClick={() => navigate("home")} className="hover:text-orange">Home</button>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <button onClick={() => navigate("locations")} className="hover:text-orange">Locations</button>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="text-brown/80">{location.city}</span>
          </motion.nav>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange ring-1 ring-orange/20"
              >
                <span className="h-1 w-1 rounded-full bg-current" />
                {location.state}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-brown sm:text-5xl"
              >
                Pest control in {location.city}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-2 font-display text-lg font-medium text-orange"
              >
                {location.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 max-w-2xl text-base leading-relaxed text-brown/70 text-pretty"
              >
                {location.longIntro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                <div className="inline-flex items-center gap-2 text-sm text-brown/70">
                  <Users className="h-4 w-4 text-teal" />
                  {location.technicians} local technicians
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-brown/70">
                  <Star className="h-4 w-4 fill-orange text-orange" />
                  {location.rating} rating · {location.reviewsCount.toLocaleString("en-IN")} reviews
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-brown/70">
                  <Clock className="h-4 w-4 text-orange" />
                  {location.responseTime}
                </div>
              </motion.div>
            </div>

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="sticky top-24 rounded-3xl border border-brown/10 bg-white p-6 shadow-premium sm:p-8">
                <h3 className="font-display text-lg font-bold text-brown">
                  {location.city} field office
                </h3>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" />
                    <div className="text-brown/75">
                      {location.address.line1}
                      <br />
                      {location.address.landmark}
                      <br />
                      {location.address.line2} - {location.address.pincode}
                    </div>
                  </div>

                  <a
                    href={`tel:${location.phoneHref}`}
                    className="flex items-center gap-3 text-brown/75 transition-colors hover:text-orange"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0 text-orange" />
                    {location.phone}
                  </a>

                  <a
                    href={`mailto:${location.email}`}
                    className="flex items-center gap-3 text-brown/75 transition-colors hover:text-orange"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0 text-orange" />
                    {location.email}
                  </a>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" />
                    <div className="text-brown/75">
                      {location.hours}
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02] gradient-orange"
                >
                  Book service in {location.city}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage zones */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border border-brown/10 bg-white p-8 shadow-premium sm:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange">
                    <Navigation className="h-3 w-3" />
                    Coverage zones
                  </div>
                  <h2 className="font-display text-2xl font-bold text-brown">
                    {location.coverage.length} zones we serve in {location.city}
                  </h2>
                </div>
                <div className="text-sm text-brown/70">
                  Don't see your area? Call us — we often accommodate nearby pin codes.
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {location.coverage.map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className="rounded-full bg-brown/5 px-3 py-1.5 text-sm font-medium text-brown/75"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>

              {/* Landmarks */}
              <div className="mt-8 border-t border-brown/10 pt-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-brown/70">
                  Local landmarks we know
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {location.landmarks.map((landmark) => (
                    <div
                      key={landmark}
                      className="flex items-center gap-2 rounded-lg bg-brown/[0.03] px-3 py-2 text-xs text-brown/70"
                    >
                      <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-teal" />
                      {landmark}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Local testimonials */}
      {cityTestimonials.length > 0 && (
        <section className="relative py-20 md:py-24">
          <div className="absolute inset-0 -z-10 gradient-warm-soft" />
          <div className="absolute inset-0 -z-10 bg-dot-warm opacity-30" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange ring-1 ring-orange/20">
                <span className="h-1 w-1 rounded-full bg-current" />
                {location.city} customers
              </div>
              <h2 className="font-display text-3xl font-bold text-brown sm:text-4xl">
                What {location.city} says about us
              </h2>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cityTestimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative rounded-2xl border border-brown/10 bg-white p-6 shadow-premium"
                >
                  <Quote className="absolute right-4 top-4 h-8 w-8 text-orange/15" />
                  <div className="mb-3 flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-orange text-orange" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-brown/75">"{t.text}"</p>
                  <div className="mt-4 border-t border-brown/5 pt-3">
                    <div className="text-sm font-semibold text-brown">{t.name}</div>
                    <div className="text-xs text-brown/70">
                      {t.role} · {t.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local FAQs */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange ring-1 ring-orange/20">
              <span className="h-1 w-1 rounded-full bg-current" />
              {location.city}-specific FAQs
            </div>
            <h2 className="font-display text-3xl font-bold text-brown sm:text-4xl">
              {location.city} pest control, explained
            </h2>
          </div>
          <FAQAccordion items={location.faqs.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <CTASection
        title={`Ready to protect your ${location.city} property?`}
        subtitle={`Free inspection, fixed-price quote. Our ${location.city} field team is ready to dispatch within 30 minutes.`}
      />
    </>
  );
}
