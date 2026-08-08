"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ArrowUpRight } from "lucide-react";

/**
 * ShowcaseCarousel — auto-scrolling horizontal carousel of pest-control
 * photography. Each slide is a full-bleed image with a gradient scrim,
 * an eyebrow tag, a title, and a one-line description.
 *
 * - Uses the CSS `marquee-x` keyframe (defined in globals.css) for the
 *   continuous scroll.
 * - Track renders two identical copies for a seamless loop.
 * - Pauses on hover so users can read a slide.
 * - Respects `prefers-reduced-motion` (animation disabled globally).
 * - Each slide is a real `<Link>` so users can jump to the relevant
 *   service page (crawlable for SEO, keyboard-accessible).
 */

interface ShowcaseSlide {
  src: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
  href: string;
}

const slides: ShowcaseSlide[] = [
  {
    src: "/images/carousel/protected-home.jpg",
    alt: "Modern South Indian home at golden hour protected by Siva Pest Control",
    tag: "Residential Protection",
    title: "Home Protection Plans",
    description:
      "Year-round defence for apartments and independent houses — child-safe, pet-safe, odour-controlled.",
    href: "/services",
  },
  {
    src: "/images/carousel/kitchen-treatment.jpg",
    alt: "Siva technician applying gel-bait treatment in a modern Indian kitchen",
    tag: "Cockroach Gel Treatment",
    title: "Kitchen-First Cockroach Control",
    description:
      "Targeted gel-bait application behind hinges and crevices. No spraying, no smell, no evacuation needed.",
    href: "/services/cockroach-gel-treatment",
  },
  {
    src: "/images/carousel/termite-inspection.jpg",
    alt: "Technician inspecting a wooden door frame with flashlight for termite activity",
    tag: "Anti-Termite Treatment",
    title: "Drill-Fill-Seal Termite Barrier",
    description:
      "5-year warranty barrier treatment calibrated for South Indian construction and climate.",
    href: "/services/anti-termite-treatment",
  },
  {
    src: "/images/carousel/mosquito-fogging.jpg",
    alt: "Mosquito fogging treatment at twilight in a residential garden",
    tag: "Mosquito Control",
    title: "Monsoon Mosquito Programme",
    description:
      "Residual misting plus Bti larvicidal treatment of standing water. Monthly contracts for lake-side homes.",
    href: "/services/mosquito-control",
  },
  {
    src: "/images/carousel/restaurant-service.jpg",
    alt: "Commercial pest control technician inspecting a UV fly trap in a restaurant kitchen",
    tag: "Commercial IPM",
    title: "Restaurant & Cloud-Kitchen IPM",
    description:
      "Swiggy-, Zomato-, and FSSAI-audit-ready documentation. UV fly units, drain-fly protocols, tamper-proof baits.",
    href: "/industries",
  },
  {
    src: "/images/carousel/gel-bait-macro.jpg",
    alt: "Macro close-up of cockroach gel bait application on a kitchen hinge",
    tag: "Child-Safe Formulations",
    title: "Premium Gel-Bait Science",
    description:
      "Hinge-level application of indoxacarb-based gel.Toddlers and pets can play through the treatment.",
    href: "/services/cockroach-gel-treatment",
  },
  {
    src: "/images/carousel/bathroom-treatment.jpg",
    alt: "Technician treating a modern Indian bathroom for silverfish and drain flies",
    tag: "Bathroom & Drain Pests",
    title: "Drain-Fly & Silverfish Control",
    description:
      "Humidity-calibrated protocols for coastal Chennai and Bangalore's cooler climate. Biodegradable formulations.",
    href: "/services",
  },
];

export function ShowcaseCarousel() {
  // Two copies for seamless loop
  const loop = [...slides, ...slides];

  return (
    <section className="relative overflow-hidden bg-ivory py-20 md:py-24">
      <div className="absolute inset-0 -z-10 bg-dot-warm opacity-[0.05]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="In the field"
          title="Pest control, in action"
          subtitle="A glimpse of the work our certified technicians do every day across Hyderabad, Chennai and Bangalore — from residential kitchens to commercial kitchens."
        />
      </div>

      <Reveal className="mt-12" delay={0.1}>
        <div
          className="marquee-viewport mask-fade-edges"
          aria-label="Pest control service showcase — scrolling"
        >
          <ul
            className="marquee-track gap-6 px-4 sm:px-6 lg:px-8"
            style={{ animationDuration: "70s" }}
            aria-live="polite"
          >
            {loop.map((slide, i) => (
              <li
                key={`${slide.title}-${i}`}
                className="w-[320px] sm:w-[380px] lg:w-[440px]"
              >
                <ShowcaseCard slide={slide} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function ShowcaseCard({ slide }: { slide: ShowcaseSlide }) {
  return (
    <Link
      href={slide.href}
      className="group relative block aspect-[5/4] overflow-hidden rounded-3xl shadow-premium ring-1 ring-brown/10"
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 440px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Top-down cinematic gradient for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,18,10,0) 0%, rgba(28,18,10,0) 35%, rgba(28,18,10,0.75) 75%, rgba(28,18,10,0.95) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Top tag */}
      <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/30">
        <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
        {slide.tag}
      </div>
      {/* Hover affordance */}
      <div className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md ring-1 ring-white/30 transition-opacity duration-300 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </div>
      {/* Bottom title + description */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold leading-tight text-white drop-shadow sm:text-2xl">
          {slide.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/90 text-pretty">
          {slide.description}
        </p>
      </div>
    </Link>
  );
}
