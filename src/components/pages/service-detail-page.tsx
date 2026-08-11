"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { CTASection } from "@/components/site/cta-section";
import { FAQAccordion } from "@/components/site/faq-accordion";
import { InlineQuoteForm } from "@/components/site/inline-quote-form";
import { services as allServices, servicesBySlug } from "@/data/services";
import { locations } from "@/data/locations";
import { company } from "@/data/company";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = servicesBySlug(slug);

  if (!service) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-brown">Service not found</h1>
          <Link
            href="/services"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  // Pick related services (same category, exclude self)
  const related = allServices
    .filter((s) => s.slug !== service.slug && (s.category === service.category || s.category === "both"))
    .slice(0, 3);

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
            <Link href="/" className="hover:text-orange">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <Link href="/services" className="hover:text-orange">Services</Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="text-brown/80" aria-current="page">{service.name}</span>
          </motion.nav>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange ring-1 ring-orange/20"
              >
                <span className="h-1 w-1 rounded-full bg-current" />
                {service.treatment.toUpperCase()} treatment
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-brown sm:text-5xl"
              >
                {service.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-5 max-w-2xl text-base leading-relaxed text-brown/70 text-pretty sm:text-lg"
              >
                {service.long}
              </motion.p>

              {/* Meta row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                <div className="inline-flex items-center gap-2 text-sm text-brown/70">
                  <Clock className="h-4 w-4 text-orange" />
                  {service.duration}
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-brown/70">
                  <ShieldCheck className="h-4 w-4 text-orange" />
                  {service.warranty} warranty
                </div>
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02] gradient-orange"
                >
                  Book this service
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={`tel:${company.phonePrimaryHref}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white/60 px-6 py-3.5 text-sm font-semibold text-brown backdrop-blur transition-colors hover:border-orange/40 hover:text-orange"
                >
                  <Phone className="h-4 w-4" />
                  Call to discuss
                </a>
              </motion.div>
            </div>

            {/* Right column — service image + card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="sticky top-24 overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium">
                {/* Service image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(51,36,22,0) 50%, rgba(51,36,22,0.7) 100%)" }} />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/85 text-orange backdrop-blur-md">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-brown">
                  Quick service facts
                </h3>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between border-b border-brown/5 pb-2.5">
                    <dt className="text-brown/60">Duration</dt>
                    <dd className="font-semibold text-brown">{service.duration}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-brown/5 pb-2.5">
                    <dt className="text-brown/60">Warranty</dt>
                    <dd className="font-semibold text-brown">{service.warranty}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-brown/5 pb-2.5">
                    <dt className="text-brown/60">Treatment type</dt>
                    <dd className="font-semibold text-brown capitalize">{service.treatment}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-brown/5 pb-2.5">
                    <dt className="text-brown/60">Best for</dt>
                    <dd className="font-semibold text-brown capitalize">{service.category}</dd>
                  </div>
                </dl>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02] gradient-orange"
                >
                  Get Free Quote
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Inline quote form — converts visitors without forcing a page-away click */}
          <div className="mt-8">
            <InlineQuoteForm serviceName={service.name} />
          </div>
        </div>
      </section>

      {/* What we treat + benefits */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* What we treat */}
            <Reveal>
              <div className="h-full rounded-3xl border border-brown/10 bg-white p-8 shadow-premium">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange">
                  <Sparkles className="h-3 w-3" />
                  What we treat
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-brown">
                  Pests this service eliminates
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.treats.map((pest, i) => (
                    <li key={pest} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                      <span className="text-sm leading-relaxed text-brown/75">{pest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Benefits */}
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-brown/10 bg-white p-8 shadow-premium">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                  <ShieldCheck className="h-3 w-3" />
                  Why it works
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-brown">
                  Benefits of this protocol
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal" />
                      <span className="text-sm leading-relaxed text-brown/75">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 gradient-warm-soft" />
        <div className="absolute inset-0 -z-10 bg-dot-warm opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange ring-1 ring-orange/20">
              <span className="h-1 w-1 rounded-full bg-current" />
              The process
            </div>
            <h2 className="font-display text-3xl font-bold text-brown sm:text-4xl">
              How this service is delivered
            </h2>
            <p className="mt-4 text-base text-brown/70">
              Every step is documented. Every deliverable tracked. Every warranty honoured.
            </p>
          </div>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {service.process.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative h-full rounded-2xl border border-brown/10 bg-white p-5 shadow-premium">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange/10 font-display text-base font-bold text-orange">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-sm font-bold text-brown">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-brown/65">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Safety + prevention */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-brown/10 bg-white p-8 shadow-premium sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brown/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brown">
                  <ShieldCheck className="h-3 w-3 text-orange" />
                  Safety profile
                </div>
                <h3 className="font-display text-xl font-bold text-brown">
                  Child-safe, pet-safe, surface-safe
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown/65">
                  Every product used in this protocol meets our internal safety bar — if it
                  isn't safe for a crawling toddler, we don't use it in your home.
                </p>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {service.safety.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl bg-brown/[0.03] p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                    <span className="text-sm leading-relaxed text-brown/75">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange ring-1 ring-orange/20">
              <span className="h-1 w-1 rounded-full bg-current" />
              Service FAQs
            </div>
            <h2 className="font-display text-3xl font-bold text-brown sm:text-4xl">
              Common questions about this service
            </h2>
          </div>
          <FAQAccordion items={service.faqs.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold text-brown">
                Related services
              </h2>
              <Link
                href="/services"
                className="text-sm font-semibold text-orange hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => {
                const RIcon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-start gap-4 rounded-2xl border border-brown/10 bg-white p-5 text-left shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                      <RIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-bold text-brown">{s.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-brown/65 line-clamp-2">
                        {s.short}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Ready to book your ${service.name.toLowerCase()}?`}
        subtitle="Free inspection, fixed-price quote, certified technician. Same-day service across Hyderabad, Chennai and Bangalore."
      />
    </>
  );
}
