"use client";

import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CTASection } from "@/components/site/cta-section";
import { Stats } from "@/components/site/stats";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { CountUp } from "@/components/site/count-up";
import { PreviousWorks } from "@/components/site/previous-works";
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

/**
 * The founder's actual, verifiable path — microbiology first, then field
 * pest management. `year` is the anchor point (kept short so it fits the
 * timeline's narrow year column); `label` carries the extra qualifier
 * (a month, or a multi-year span) when the anchor alone is ambiguous.
 */
const milestones: { year: string; label?: string; title: string; description: string }[] = [
  {
    year: "2003",
    title: "M.Sc. in Microbiology",
    description:
      `${company.founder} completes an M.Sc. in Microbiology — the foundation for everything that follows: understand the organism, control the environment, and use the least chemistry that actually works.`,
  },
  {
    year: "2008",
    label: "2003 – 2008",
    title: "Five years in the laboratory",
    description:
      "Five years of bench work — culturing, testing and reading results. It built the habit that still runs this company: diagnose before you treat, and measure the result instead of assuming it.",
  },
  {
    year: "2012",
    title: "Professional training at CFTRA, Mysore",
    description:
      "Trained at CFTRA in Mysore, moving from laboratory science into field practice — application technique, chemical safety and treatment protocol, learned professionally before a single household was served.",
  },
  {
    year: "2012",
    label: "September",
    title: "Siva Pest Control is founded in Repalle",
    description:
      "Started in September 2012 in Repalle, Andhra Pradesh — at the most local scale possible, with our own field team, our own equipment and our own service standards. Our registered head office sits at Isukapalli, Repalle.",
  },
  {
    year: "2025",
    title: "Hyderabad, Telangana",
    description:
      "Thirteen years after founding we opened a staffed Hyderabad branch with its own field team — bringing the same laboratory-grade protocols to our largest metro market.",
  },
  {
    year: "Next",
    label: "Coming soon",
    title: "Chennai · Bengaluru · Kochi",
    description:
      "Three branches are under setup across Tamil Nadu, Karnataka and Kerala. Each one opens only when a local field team is trained, equipped and in place. Never before.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Fourteen years of calibrate-to-trust pest control"
        subtitle={`Founded in September 2012 at Repalle, Andhra Pradesh by ${company.founder} — a microbiology graduate with five years in the laboratory and CFTRA training from Mysore. Siva Pest Control has grown from one coastal-Ap office into a two-state regional network, built on a single non-negotiable principle: eco-friendly, family-safe chemicals first, always.`}
        breadcrumb={[{ label: "Home", view: "home" }, { label: "About" }]}
      />

      {/* Hero image — real Siva field team at work */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative h-64 overflow-hidden rounded-3xl shadow-premium-lg md:h-80 lg:h-96">
              <Image
                src="/images/misc/about-hero-team.png"
                alt="The Siva Pest Control field team in uniform with branded service vehicles and spraying equipment outside a customer's home"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(51,36,22,0) 50%, rgba(51,36,22,0.55) 100%)" }} />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-display text-xl font-bold drop-shadow-md md:text-2xl">Field-tested, certified, locally trusted</div>
                <div className="mt-1 text-sm text-white/85">14 years · 2 states · 24 certified technicians · 12,000+ treatments delivered</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* === Mission & Vision — premium split layout === */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Subtle warm gradient backdrop */}
        <div className="absolute inset-0 -z-10 gradient-warm-soft" />
        <div className="absolute inset-0 -z-10 bg-dot-warm opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section eyebrow */}
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange">
                <Target className="h-3.5 w-3.5" />
                Why we exist
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-brown text-balance sm:text-4xl md:text-5xl">
                Built on principle,
                <br className="hidden sm:block" />{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #D77005 0%, #E88521 50%, #F4B266 100%)",
                  }}
                >
                  not on shortcuts.
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brown/65 text-pretty">
                Two statements shape every decision we make — who we serve, how we work,
                and what we refuse to compromise on.
              </p>
            </div>
          </Reveal>

          {/* === MISSION CARD — left, image-accented === */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium-lg">
              <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
                {/* Left: copy */}
                <div className="relative p-8 sm:p-10 md:p-12">
                  {/* Big background number */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-2 font-display text-[120px] font-bold leading-none text-orange/5 md:text-[160px]"
                  >
                    01
                  </span>

                  <div className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                        <Target className="h-6 w-6" strokeWidth={1.6} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-orange">
                        Mission
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold leading-tight text-brown sm:text-3xl md:text-4xl">
                      Make premium, science-led pest control
                      <span className="text-orange"> accessible</span> to every South Indian home
                      & business.
                    </h3>

                    <p className="mt-5 text-base leading-relaxed text-brown/70 text-pretty">
                      We exist to prove that pest control can be both genuinely effective and
                      genuinely child-safe — that warranties can mean something, that local
                      teams deliver better service than national call-centres, and that
                      transparency isn't a marketing word but a daily operating practice.
                    </p>

                    {/* Mission chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {[
                        "Child-safe first",
                        "Science over spray",
                        "Local teams, not call-centres",
                        "Transparent pricing",
                      ].map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-orange/20 bg-orange/5 px-3 py-1 text-xs font-semibold text-orange"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: image with floating stat card */}
                <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
                  <Image
                    src="/images/carousel/restaurant-service.jpg"
                    alt="A Siva technician in uniform installing a UV fly-trap unit in a commercial kitchen — a local, field-trained team on site"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(51,36,22,0.05) 0%, rgba(51,36,22,0.65) 100%)",
                    }}
                  />
                  {/* Floating stat card */}
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/85 p-4 backdrop-blur-xl">
                    <div className="font-display text-2xl font-bold text-brown">
                      12,000+
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wider text-brown/65">
                      Homes & businesses protected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* === VISION CARD — right-shifted, dark premium === */}
          <Reveal delay={0.1}>
            <div className="relative mt-6 overflow-hidden rounded-3xl shadow-premium-lg">
              {/* Dark background */}
              <div className="absolute inset-0 gradient-brown" />
              <div className="absolute inset-0 bg-dot-warm opacity-[0.06]" />
              {/* Warm glow accents */}
              <div
                aria-hidden
                className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
              />
              <div
                aria-hidden
                className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-25 blur-3xl"
                style={{ background: "radial-gradient(circle, #719899 0%, transparent 70%)" }}
              />

              <div className="relative grid gap-0 lg:grid-cols-[1fr_1.2fr]">
                {/* Left: visual — target/horizon composition */}
                <div className="relative flex min-h-[280px] items-center justify-center p-8 lg:min-h-full">
                  {/* Concentric target rings */}
                  <div className="relative h-56 w-56 md:h-64 md:w-64">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-orange/30"
                        style={{ transform: `scale(${1 - i * 0.2})` }}
                      />
                    ))}
                    {/* Center medallion */}
                    <div className="absolute inset-0 m-auto flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-orange to-orange-deep text-white shadow-glow-orange md:h-28 md:w-28">
                      <Sparkles className="h-7 w-7" strokeWidth={1.6} />
                      <span className="mt-1 text-[9px] font-bold uppercase tracking-widest">
                        2030
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: copy */}
                <div className="relative p-8 sm:p-10 md:p-12">
                  {/* Big background number */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-2 font-display text-[120px] font-bold leading-none text-white/5 md:text-[160px]"
                  >
                    02
                  </span>

                  <div className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/15 text-orange">
                        <Sparkles className="h-6 w-6" strokeWidth={1.6} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-orange">
                        Vision
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                      Be South India's most
                      <span className="text-orange"> trusted</span> pest control brand by 2030.
                    </h3>

                    <p className="mt-5 text-base leading-relaxed text-white/80 text-pretty">
                      Recognised for scientific rigour, operational reliability, and genuine
                      customer care. We're building a regional network where every technician
                      is a trained professional, every treatment is documented, and every
                      warranty is honoured without argument.
                    </p>

                    {/* Vision chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {[
                        "Scientific rigour",
                        "Operational reliability",
                        "Genuine customer care",
                        "Warranties honoured",
                      ].map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur-md"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* === Founder quote === */}
          <Reveal delay={0.15}>
            <figure className="mx-auto mt-12 max-w-4xl text-center">
              <div className="mb-4 text-5xl font-display leading-none text-orange/30">
                &ldquo;
              </div>
              <blockquote className="font-display text-xl font-medium leading-relaxed text-brown text-pretty sm:text-2xl md:text-3xl">
                Any exterminator can spray. We're here for the family that wants their kitchen
                safe, the restaurant that needs to stay open, the warehouse that can't afford
                downtime. Science-led, locally trusted, fully guaranteed — that's the Siva
                standard.
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange ring-2 ring-orange/20">
                  <Users className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="text-left">
                  <div className="font-display text-sm font-bold text-brown">
                    {company.founder}
                  </div>
                  <div className="text-xs text-brown/60">
                    Founder · {company.founderCredential}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <Stats />

      {/* Why Siva — moved from homepage (per client feedback Aug 2026) */}
      <WhyChooseUs />

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
            title="From the lab bench to a two-state network"
            subtitle={`${company.yearsOfExperience}+ years of careful, customer-led growth — never franchise, never contractor, never compromise.`}
          />

          <div className="mt-12 space-y-3">
            {milestones.map((m, i) => (
              <Reveal key={`${m.year}-${m.title}`} delay={i * 0.06}>
                <div className="group flex flex-col gap-4 rounded-2xl border border-brown/10 bg-white p-5 shadow-premium transition-all hover:shadow-lift sm:flex-row sm:items-center sm:p-6">
                  <div className="flex flex-shrink-0 flex-col items-center justify-center sm:w-28">
                    <div className="font-display text-3xl font-bold text-orange sm:text-4xl">
                      {m.year}
                    </div>
                    {m.label && (
                      <div className="mt-1 text-center text-[11px] font-semibold uppercase tracking-wider text-brown/50">
                        {m.label}
                      </div>
                    )}
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

      {/* === Recent work showcase — proof, not promises === */}
      <PreviousWorks />

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
        title={`Join ${(company.stats.homesProtected + company.stats.commercialSites).toLocaleString("en-IN")}+ protected homes and businesses`}
        subtitle="Fixed-price quote, certified technicians. Same-day service across Andhra Pradesh and Telangana."
      />
    </>
  );
}
