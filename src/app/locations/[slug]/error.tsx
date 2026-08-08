"use client";

import Link from "next/link";
import { MapPin, RefreshCw, Home, Phone } from "lucide-react";
import { company } from "@/data/company";
import { useEffect } from "react";

export default function LocationDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Location detail error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-warm-soft" />
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-20" />

      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange/10 text-orange">
          <MapPin className="h-8 w-8" aria-hidden="true" />
        </div>

        <h1 className="mt-5 font-display text-2xl font-bold text-brown sm:text-3xl text-balance">
          This location page couldn't load
        </h1>

        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-brown/65 text-pretty">
          Please try again, browse all locations, or call us directly.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02] gradient-orange"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/locations"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3 text-sm font-semibold text-brown shadow-premium transition-colors hover:border-orange/40 hover:text-orange"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            All locations
          </Link>
          <a
            href={`tel:${company.phonePrimaryHref}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3 text-sm font-semibold text-brown shadow-premium transition-colors hover:border-orange/40 hover:text-orange"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call us
          </a>
        </div>
      </div>
    </div>
  );
}
