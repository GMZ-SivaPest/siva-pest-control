"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  initAnalytics,
  trackPageView,
  GA_ENABLED,
  GA_MEASUREMENT_ID,
} from "@/lib/analytics";

/**
 * Analytics — Google Analytics 4 loader + route-change tracker.
 *
 * Mount ONCE in the root layout's <body>. It:
 *   1. Initializes gtag.js on first client render (lazy, after hydration)
 *   2. Tracks a page_view on every pathname / searchParams change
 *   3. Honors NEXT_PUBLIC_GA_MEASUREMENT_ID — if unset, renders nothing
 *
 * This component renders no visible UI.
 */
export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize once on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page view on route change
  useEffect(() => {
    if (!GA_ENABLED) return;
    if (!pathname) return;

    // Compose the path + query string
    const search = searchParams?.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;

    // Small delay so document.title is updated by Next.js first
    const id = window.setTimeout(() => {
      trackPageView(fullPath);
    }, 50);

    return () => window.clearTimeout(id);
  }, [pathname, searchParams]);

  if (!GA_ENABLED) return null;

  return (
    <>
      {/* Preconnect to Google Analytics for faster script load */}
      <link
        rel="preconnect"
        href={`https://www.googletagmanager.com`}
        crossOrigin="anonymous"
      />
      {/* Hidden identifier for debugging */}
      <span
        aria-hidden="true"
        data-ga4-id={GA_MEASUREMENT_ID}
        style={{ display: "none" }}
      />
    </>
  );
}

/**
 * AnalyticsScript — Server-rendered <script> tags for initial GA4 load.
 *
 * Place this in <head> of the root layout for optimal load timing.
 * It renders the GA4 script tag + inline config bootstrap.
 *
 * NOTE: We use Next.js <Script> strategy="afterInteractive" by default.
 * This component is provided as an alternative for direct <head> injection.
 */
export function AnalyticsScript() {
  if (!GA_ENABLED) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            // Consent Mode v2 — default denied
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}
