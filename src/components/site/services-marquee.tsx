"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "./marquee";
import { services } from "@/data/services";

/**
 * ServicesMarquee — continuous horizontal auto-scroll of ALL 14 services,
 * placed directly below the navbar so users can jump to any service page
 * from anywhere on the site.
 *
 * Design:
 *   - Frosted-glass strip on a warm ivory background
 *   - Each item: small service thumbnail + name + price + arrow
 *   - Single set of items — the JS Marquee recycles items off-screen, so
 *     each service is visible exactly once (no duplicated copy)
 *   - Pauses on hover
 *   - Respects prefers-reduced-motion (animation disabled)
 *   - Each item is a real <Link href="/services/[slug]"> — crawlable,
 *     keyboard-accessible, opens in new tab on middle-click
 *
 * Placement: rendered in site-chrome.tsx right below the navbar on EVERY
 * page, including the homepage, so users can jump to any service from
 * anywhere without scrolling to find the services section.
 */
export function ServicesMarquee() {
  return (
    <div
      className="sticky top-16 z-30 border-b border-brown/10 bg-ivory/95 backdrop-blur-xl md:top-20"
      role="region"
      aria-label="Quick access — all services"
    >
      {/* Left + right edge fades for premium feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ivory to-transparent md:w-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ivory to-transparent md:w-20"
      />

      <Marquee
        speed={70}
        trackClassName="items-center gap-2 py-2.5"
      >
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex flex-shrink-0 items-center gap-2 rounded-full border border-brown/10 bg-white px-3 py-1.5 shadow-premium transition-all hover:border-orange/30 hover:shadow-glow-orange"
          >
            {/* Thumbnail */}
            <div className="relative h-7 w-7 overflow-hidden rounded-full">
              <Image
                src={service.image}
                alt=""
                fill
                sizes="28px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(51,36,22,0) 40%, rgba(51,36,22,0.5) 100%)",
                }}
              />
            </div>
            {/* Name */}
            <span className="whitespace-nowrap text-xs font-semibold text-brown">
              {service.name}
            </span>
            {/* Price */}
            <span className="rounded-full bg-orange/10 px-1.5 py-0.5 text-[10px] font-bold text-orange">
              ₹{service.startsFrom.toLocaleString("en-IN")}
            </span>
            {/* Arrow */}
            <ArrowUpRight className="h-3 w-3 text-brown/40 transition-colors group-hover:text-orange" />
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
