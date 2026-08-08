"use client";

import Link from "next/link";
import { Bug, RefreshCw, Home, Phone } from "lucide-react";
import { company } from "@/data/company";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console (production: replace with Sentry / LogRocket)
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-warm-soft" />
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-20" />

      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange/10 text-orange">
          <Bug className="h-10 w-10" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
          Something went wrong
        </p>

        <h1 className="mt-4 font-display text-3xl font-bold text-brown sm:text-4xl text-balance">
          An unexpected error occurred
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brown/65 text-pretty">
          Don't worry — our team has been notified. You can try again, head
          home, or call us directly. We're here to help.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02] gradient-orange"
          >
            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3.5 text-sm font-semibold text-brown shadow-premium transition-colors hover:border-orange/40 hover:text-orange"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <a
            href={`tel:${company.phonePrimaryHref}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3.5 text-sm font-semibold text-brown shadow-premium transition-colors hover:border-orange/40 hover:text-orange"
          >
            <Phone className="h-4 w-4" />
            Call us
          </a>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-brown/45">
            Error reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}
      </div>
    </div>
  );
}
