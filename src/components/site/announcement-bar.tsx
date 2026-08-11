"use client";

import { Phone, X } from "lucide-react";
import { company } from "@/data/company";
import { trackPhoneClick } from "@/lib/analytics";

/**
 * AnnouncementBar — promo strip rendered at the very top of the page,
 * above the sticky navbar. Uses the `shimmer` keyframe from globals.css
 * for the sweep animation. Dismissal is controlled by the parent
 * (SiteChrome), which persists it in localStorage.
 *
 * Styled with the brand palette (gradient-brown + sand/orange accents)
 * so it matches the footer and navbar instead of the old emerald theme.
 */
export function AnnouncementBar({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative overflow-hidden gradient-brown">
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
      {/* Warm top edge accent, mirrors the footer's decorative line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent"
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-4 py-2 sm:px-6">
        <div className="flex items-center gap-2 text-center text-xs sm:text-sm">
          <span aria-hidden>🎉</span>
          <span className="font-medium text-white/90">
            <strong className="text-sand">20% Off</strong> First Treatment — Limited Time!
          </span>
          <a
            href={`tel:${company.phonePrimaryHref}`}
            onClick={() =>
              trackPhoneClick({
                location: "announcement-bar",
                phone: company.phonePrimary,
              })
            }
            className="hidden sm:inline-flex items-center gap-1 rounded-full bg-orange/20 px-2 py-0.5 text-[10px] font-semibold text-sand ring-1 ring-orange/40 transition-colors hover:bg-orange/30"
          >
            <Phone className="h-2.5 w-2.5" />
            Call Now
          </a>
        </div>
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
          aria-label="Dismiss announcement"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
