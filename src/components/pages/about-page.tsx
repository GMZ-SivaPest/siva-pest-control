"use client";

import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CTASection } from "@/components/site/cta-section";
import { Stats } from "@/components/site/stats";
import { CountUp } from "@/components/site/count-up";
import { brand } from "@/data/brand";
import { company } from "@/data/company";
import {
  Target,
  Heart,
  Microscope,
  ShieldCheck,
  Leaf,
  Award,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Care first",
    description:
      "We treat every home as if our own children lived there. Child-safe formulations are non-negotiable, even when cheaper alternatives exist.",
  },
  {
    icon: Microscope,
    title: "Science over spray",
    description:
      "We invest in protocols, training, and calibration — not blanket chemical spraying. Smarter, not harder.",
  },
  {
    icon: ShieldCheck,
    title: "Warranties that mean something",
    description:
      "A warranty is a promise, not a marketing line. We honour every one without paperwork, questions, or service charges.",
  },
  {
    icon: Leaf,
    title: "Stewardship",
    description:
      "Green Pro certified. We minimise environmental load through exclusion-first design, Bti larvicides, and humane wildlife protocols.",
  },
];

const milestones = [
  {
    year: "2012",
    title: "Founded in Hyderabad",
    description:
      "Started as a 3-technician operation in Madhapur serving residential customers within 5km.",
  },
  {
    year: "2015",
    title: "Commercial IPM launch",
    description:
      "Pioneered the first FSSAI-compliant commercial IPM programme in Hyderabad's restaurant sector.",
  },
  {
    year: "2018",
    title: "Chennai expansion",
    description:
      "Opened the T. Nagar field office. Brought our science-led protocols to coastal Tamil Nadu.",
  },
  {
    year: "2021",
    title: "Bangalore launch",
    description:
      "Expanded to Koramangala. Adapted protocols for Bangalore's tech-park and gated-community density.",
  },
  {
    year: "2023",
    title: "ISO 9001 certification",
    description:
      "Achieved ISO 9001:2015 certification across all three branches. Standardised protocols company-wide.",
  },
  {
    year: "2026",
    title: "14 years, 12,000+ homes",
    description:
      "Now serving 3 cities with 24 certified technicians. Preparing Pune and Coimbatore expansion for late 2026.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Fourteen years of calibrate-to-trust pest control"
        subtitle="From a 3-technician Madhapur operation in 2012 to a three-city, 24-technician regional network — built on a single non-negotiable principle: child-safe first, always."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "About" }]}
      />

      {/* Hero image */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative h-64 overflow-hidden rounded-3xl shadow-premium-lg md:h-80 lg:h-96">
              <Image
                src="/images/misc/about-hero.png"
                alt="Siva Pest Control field team — certified technicians across Hyderabad, Chennai and Bangalore"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(51,36,22,0) 50%, rgba(51,36,22,0.5) 100%)" }} />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-display text-xl font-bold drop-shadow-md md:text-2xl">Field-tested, certified, locally trusted</div>
                <div className="mt-1 text-sm text-white/85">14 years · 3 cities · 24 certified technicians</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-brown/10 bg-white p-8 shadow-premium sm:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-brown">Our mission</h3>
                <p className="mt-3 text-base leading-relaxed text-brown/70 text-pretty">
                  To make premium, science-led pest control accessible to every South Indian home
                  and business — without compromising on safety, transparency, or accountability.
                  We exist to prove that pest control can be both effective and genuinely
                  child-safe, that warranties can mean something, and that local teams deliver
                  better service than national call-centres.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-brown/10 bg-white p-8 shadow-premium sm:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-brown">Our vision</h3>
                <p className="mt-3 text-base leading-relaxed text-brown/70 text-pretty">
                  To be South India's most trusted pest control brand by 2030 — recognised for
                  scientific rigour, operational reliability, and genuine customer care. We're
                  building a regional network where every technician is a trained professional,
                  every treatment is documented, and every warranty is honoured without
                  argument.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Stats />

      {/* Values */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we stand for"
            title="Four values that shape every decision"
            subtitle="When we have to choose between profit and these values, we choose the values. Every time."
          />
          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-brown/10 bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift">
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white"
                  >
                    <value.icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display text-base font-bold leading-tight text-brown">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown/65">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 gradient-warm-soft" />
        <div className="absolute inset-0 -z-10 bg-dot-warm opacity-30" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our journey"
            title="From Madhapur to three cities"
            subtitle="Sixteen years of careful, customer-led growth — never franchise, never contractor, never compromise."
          />

          <div className="mt-12 space-y-3">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.06}>
                <div className="group flex flex-col gap-4 rounded-2xl border border-brown/10 bg-white p-5 shadow-premium transition-all hover:shadow-lift sm:flex-row sm:items-center sm:p-6">
                  <div className="flex flex-shrink-0 flex-col items-center justify-center sm:w-28">
                    <div className="font-display text-3xl font-bold text-orange sm:text-4xl">
                      {m.year}
                    </div>
                  </div>
                  <div className="hidden w-px self-stretch bg-brown/10 sm:block" />
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-brown sm:text-lg">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brown/65">
                      {m.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications strip */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-brown/10 bg-white p-8 shadow-premium sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brown">
                  Certified, registered, audited
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown/65">
                  Our certifications aren't decorations — they're audited annually and govern
                  every protocol we run.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {brand.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-3 rounded-xl bg-brown/5 p-3"
                  >
                    <ShieldCheck className="h-5 w-5 flex-shrink-0 text-orange" />
                    <span className="text-sm font-semibold text-brown">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Join 18,500+ protected homes and businesses"
        subtitle="Free inspection, fixed-price quote, certified technicians. Same-day service across Hyderabad, Chennai and Bangalore."
      />
    </>
  );
}
