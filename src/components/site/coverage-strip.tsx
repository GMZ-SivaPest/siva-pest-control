"use client";

import Link from "next/link";
import { ArrowRight, Building2, Clock, MapPin, Phone } from "lucide-react";
import {
  activeLocations,
  upcomingLocations,
  networkSummary,
} from "@/data/locations";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * CoverageStrip — the homepage's "where we serve" section.
 *
 * Replaces the old full map section, which the client found visually heavy.
 * Design brief: "simple and clean". So this is a quiet card strip:
 *   - One white card per *open* office (head office badge on the first),
 *     showing city, state, address and a tap-to-call phone link.
 *   - One slim dashed row for upcoming branches — announced but clearly NOT
 *     staffed yet, so the site never advertises coverage it can't dispatch.
 *   - Driven entirely by the `locations.ts` helpers, so adding an office in
 *     the data file updates this section automatically.
 * The interactive map still lives on /locations and /contact for visitors
 * who want the geographic view.
 */

export function CoverageStrip() {
  return (
    <section className="relative overflow-hidden py-14 md:py-16">
      <div className="absolute inset-0 -z-10 bg-ivory" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 gradient-warm" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Where we serve"
          title={`${networkSummary.states.length} states, one standard of protection`}
          subtitle={`Every job is dispatched from a staffed office — no call-centre referrals. Currently ${networkSummary.openOfficesLabel} across ${networkSummary.states.join(", ")}.`}
        />

        {/* Open offices */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeLocations.map((loc, i) => (
            <Reveal key={loc.slug} delay={0.08 * i}>
              <article className="flex h-full flex-col rounded-2xl border border-brown/10 bg-white p-5 shadow-premium transition-shadow duration-300 hover:shadow-premium-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange-ink">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-brown">{loc.label}</h3>
                      <p className="text-xs text-brown/60">{loc.state}</p>
                    </div>
                  </div>
                  <span
                    className={
                      loc.status === "head-office"
                        ? "inline-flex flex-shrink-0 rounded-full bg-orange px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase"
                        : "inline-flex flex-shrink-0 rounded-full bg-teal/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-teal-ink uppercase ring-1 ring-teal/25"
                    }
                  >
                    {loc.status === "head-office" ? "Head office" : loc.branchLabel ?? "Branch"}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-brown/70">
                  {loc.tagline}
                </p>

                <div className="mt-auto flex flex-col gap-2 border-t border-brown/10 pt-4 mt-5">
                  <p className="flex min-w-0 items-center gap-1.5 text-xs text-brown/60">
                    <Building2 className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {loc.address?.line1 ?? "Service by appointment"}
                    </span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${loc.phoneHref}`}
                      className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-brown/15 px-3 py-1.5 text-xs font-semibold text-brown transition-colors hover:border-orange/40 hover:text-orange-ink"
                      aria-label={`Call the ${loc.label} office on ${loc.phone}`}
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {loc.phone}
                    </a>
                    <a
                      href={`tel:${loc.phoneAltHref}`}
                      className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-brown/15 px-3 py-1.5 text-xs font-semibold text-brown transition-colors hover:border-orange/40 hover:text-orange-ink"
                      aria-label={`Call the ${loc.label} office on ${loc.phoneAlt}`}
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {loc.phoneAlt}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Opening soon — clearly NOT live offices */}
        <Reveal delay={0.15}>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-orange/35 bg-orange/[0.06] px-5 py-4 text-center sm:flex-row sm:gap-4">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brown">
              <Clock className="h-4 w-4 text-orange-ink" aria-hidden="true" />
              Opening soon in {upcomingLocations.map((l) => l.label).join(" & ")}
            </span>
            <span className="hidden h-4 w-px bg-orange/30 sm:block" aria-hidden="true" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink transition-colors hover:text-orange"
            >
              Book now — we service nearby areas today
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}