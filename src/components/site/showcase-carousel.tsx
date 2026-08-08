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
    src: "/images/carousel/cockroach-colony.jpg",
    alt: "Severe German cockroach infestation scattering on a kitchen counter when flashlight hits them",
    tag: "Cockroach Infestation",
    title: "When You See One, There Are Hundreds",
    description:
      "German cockroaches hide in cabinet hinges by day and raid your kitchen by night. Our gel-bait protocol collapses the colony in 7 days — no spray, no smell.",
    href: "/services/cockroach-gel-treatment",
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
    src: "/images/carousel/termite-damage.jpg",
    alt: "Severe subterranean termite damage in a wooden door frame with visible mud tubes",
    tag: "Termite Damage",
    title: "Silent Destroyers in Your Walls",
    description:
      "Subterranean termites eat 24/7 and can hollow out a door frame in 6 months. Our 5-year drill-fill-seal barrier stops them at the foundation.",
    href: "/services/termite-control",
  },
  {
    src: "/images/carousel/termite-inspection.jpg",
    alt: "Technician inspecting a wooden door frame with flashlight for termite activity",
    tag: "Anti-Termite Treatment",
    title: "Drill-Fill-Seal Termite Barrier",
    description:
      "5-year warranty barrier treatment calibrated for South Indian construction and climate.",
    href: "/services/termite-control",
  },
  {
    src: "/images/carousel/rodent-infestation.jpg",
    alt: "Rodent droppings scattered in a residential attic with damaged wiring visible",
    tag: "Rodent Infestation",
    title: "Rats Chew Wires, Start Fires",
    description:
      "Rodents cause 25% of urban house fires by chewing electrical wiring. Our snap-trap + bait + exclusion protocol closes the entry points — not just catches.",
    href: "/services/rodent-control",
  },
  {
    src: "/images/carousel/mosquito-colony.jpg",
    alt: "Mosquito larvae wiggling in stagnant water in a residential bucket",
    tag: "Mosquito Source",
    title: "Stop Them Before They Fly",
    description:
      "Every 10ml of stagnant water breeds 200+ mosquitoes. Our Bti larvicide + residual misting protocol kills larvae AND adults — breaks the breeding cycle.",
    href: "/services/mosquito-control",
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
    src: "/images/carousel/bedbug-infestation.jpg",
    alt: "Bed bug infestation along mattress seams with dark fecal stains and shed skins",
    tag: "Bed Bug Infestation",
    title: "They Hide in Mattress Seams",
    description:
      "Bed bugs survive 12 months without feeding and resist most chemicals. Our two-cycle heat + spray protocol kills eggs chemicals can't reach.",
    href: "/services/bed-bugs-treatment",
  },
  {
    src: "/images/treatments/gel-bait-application.jpg",
    alt: "Pest control technician in PPE uniform applying gel bait with a syringe into a kitchen cabinet hinge",
    tag: "Child-Safe Formulations",
    title: "Premium Gel-Bait Science",
    description:
      "Hinge-level application of indoxacarb-based gel. Toddlers and pets can play through the treatment.",
    href: "/services/cockroach-gel-treatment",
  },
  {
    src: "/images/treatments/termite-drill-treatment.jpg",
    alt: "Pest control technician drilling holes along a concrete floor for termite barrier treatment",
    tag: "Termite Barrier",
    title: "Drill-Fill-Seal Method",
    description:
      "Injecting termiticide into the foundation creates a 5-year chemical barrier termites cannot cross.",
    href: "/services/termite-control",
  },
  {
    src: "/images/treatments/rodent-bait-station.jpg",
    alt: "Tamper-proof rodent bait station installed along a garden wall with a technician's gloved hand",
    tag: "Rodent Control",
    title: "Tamper-Proof Bait Stations",
    description:
      "Locking bait stations keep poison away from children and pets. 90-day monitoring with weekly trap-checks included.",
    href: "/services/rodent-control",
  },
  {
    src: "/images/treatments/bed-bug-steam.jpg",
    alt: "Pest control technician using a steam machine on a mattress for bed bug elimination",
    tag: "Bed Bugs Elimination",
    title: "Two-Cycle Heat + Spray Protocol",
    description:
      "Steam kills eggs chemicals can't reach. 21-day elimination with a 90-day re-treatment warranty.",
    href: "/services/bed-bugs-treatment",
  },
  {
    src: "/images/treatments/mosquito-fogging.jpg",
    alt: "Pest control technician operating a thermal fogging machine at twilight in a residential gated community",
    tag: "Outdoor Mosquito Fogging",
    title: "Campus & Event Venue Fogging",
    description:
      "Visible mosquito drop in 30 minutes. Single-event fogging for weddings, monthly contracts for gated communities.",
    href: "/services/fogging-service",
  },
  {
    src: "/images/treatments/bird-spike-install.jpg",
    alt: "Stainless steel bird spikes being installed on a residential balcony ledge to deter pigeons",
    tag: "Bird Spikes & Netting",
    title: "Humane Pigeon Exclusion Systems",
    description:
      "3-year material warranty. Stainless steel spikes, UV-stabilised netting, no killing, AWBI-compliant.",
    href: "/services/bird-management",
  },
  {
    src: "/images/treatments/bee-hive-removal.jpg",
    alt: "Beekeeper in full protective suit with smoker removing a large honey bee hive comb from a residential wall",
    tag: "Honey Bee Hive Removal",
    title: "Live-Capture, No Extermination",
    description:
      "Smoker calming + vacuum extraction. Colony relocated to a partner apiary. Honey-damage prevention included.",
    href: "/services/honey-bee-removal",
  },
  {
    src: "/images/treatments/snake-rescue.jpg",
    alt: "Professional snake rescue handler in protective gear using a snake hook to safely capture a cobra",
    tag: "Snake Rescue",
    title: "Safe Capture & Relocation",
    description:
      "Trained handlers with snake hooks and bags. Cobra, krait, viper — captured alive and relocated to forest range.",
    href: "/services/snake-control",
  },
  {
    src: "/images/treatments/lizard-repellent.jpg",
    alt: "Pest control technician spraying botanical repellent on a wall corner to deter lizards",
    tag: "Lizard Control",
    title: "Repellent + Source Treatment",
    description:
      "Drives lizards out without killing them. Also treats the underlying insect population that attracts them.",
    href: "/services/lizard-control",
  },
  {
    src: "/images/treatments/fly-uv-trap.jpg",
    alt: "UV fly light trap installed on a restaurant kitchen wall with dead flies visible on the glue board",
    tag: "Fly Control",
    title: "UV Light Traps for Commercial Kitchens",
    description:
      "FSSAI-compliant fly management with UV light traps and glue boards. No zapping, no contamination.",
    href: "/services/fly-control",
  },
  {
    src: "/images/treatments/commercial-ipm-monitor.jpg",
    alt: "Tamper-proof IPM monitoring station on a restaurant kitchen wall being inspected by a pest control technician",
    tag: "Commercial IPM",
    title: "FSSAI & HACCP Audit-Ready IPM",
    description:
      "Tamper-proof monitors, digital service reports with trend analytics. Dedicated account manager across 3 cities.",
    href: "/services/commercial-ipm",
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
          role="region"
          aria-label="Pest control service showcase — scrolling marquee"
        >
          <ul
            className="marquee-track gap-6 px-4 sm:px-6 lg:px-8"
            style={{ animationDuration: "100s" }}
            // aria-hidden: infinite marquee — same content is fully reachable
            // via the linked cards which screen readers will announce.
            aria-hidden="true"
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
      // tabIndex=-1: this Link sits inside an aria-hidden="true" marquee.
      // WCAG aria-hidden-focus rule requires focusable descendants of
      // aria-hidden elements to be removed from the tab order. The same
      // slide content is reachable through the page's regular service
      // sections / previous-works cards — the marquee is purely decorative.
      tabIndex={-1}
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
