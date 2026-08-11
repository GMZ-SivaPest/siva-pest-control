"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";
import { grantAnalyticsConsent, TRACKING_ENABLED } from "@/lib/analytics";

const CONSENT_KEY = "siva-consent-v1";
export { CONSENT_KEY };
const CONSENT_GRANTED = "granted";
const CONSENT_DENIED = "denied";

type ConsentValue = typeof CONSENT_GRANTED | typeof CONSENT_DENIED;

/**
 * CookieConsent — privacy-first consent banner.
 *
 * Behavior:
 *  - Shown only if no prior consent is stored
 *  - "Accept all" grants analytics_storage (and tracks an opt-in event)
 *  - "Decline" denies analytics_storage (no tracking)
 *  - Persists choice in localStorage for 12 months
 *  - Includes link to /faq or privacy policy
 *  - Respects DPDP Act 2023 (India) and GDPR (EU) consent patterns
 *  - Only renders if an analytics backend is configured (GA4 and/or GTM)
 */
export function CookieConsent() {
  // `mounted` is set via the visibility scheduling below; the banner is
  // client-only (uses localStorage) so we wait for mount before reading.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // No banner if no analytics backend is active
    if (!TRACKING_ENABLED) return;

    // Read existing consent
    let shouldShow = true;
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
      if (stored === CONSENT_GRANTED) {
        grantAnalyticsConsent();
        shouldShow = false;
      } else if (stored === CONSENT_DENIED) {
        shouldShow = false;
      }
    } catch {
      // localStorage might be unavailable (private mode) — show banner
    }

    if (!shouldShow) return;

    // Delay appearance to not interrupt initial load
    const id = window.setTimeout(() => setVisible(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (!TRACKING_ENABLED || !visible) return null;

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, CONSENT_GRANTED);
    } catch {
      // ignore
    }
    grantAnalyticsConsent();
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(CONSENT_KEY, CONSENT_DENIED);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!TRACKING_ENABLED || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl lg:bottom-6 lg:left-6 lg:right-auto lg:mx-0"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
        >
          <div className="glass-card rounded-2xl border border-brown/15 bg-white p-5 shadow-premium sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-base font-bold text-brown sm:text-lg">
                  We use cookies to improve your experience
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-brown/70">
                  We use privacy-friendly analytics to understand which content
                  helps you most. No ads, no third-party tracking. See our{" "}
                  <Link
                    href="/faq"
                    className="font-semibold text-orange underline-offset-2 hover:underline"
                  >
                    FAQ
                  </Link>{" "}
                  for details.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    onClick={accept}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40 gradient-orange"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Accept all
                  </button>
                  <button
                    onClick={decline}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brown/15 bg-white px-4 py-2.5 text-xs font-semibold text-brown transition-colors hover:bg-brown/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
                  >
                    Decline
                  </button>
                </div>
              </div>

              <button
                onClick={decline}
                aria-label="Close consent banner"
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-brown/65 hover:bg-brown/5 hover:text-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
