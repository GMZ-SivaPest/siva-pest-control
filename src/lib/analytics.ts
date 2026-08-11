/**
 * analytics.ts — Google Analytics 4 (GA4) + Google Tag Manager (GTM) layer.
 *
 * Features:
 *  - GTM container loaded server-side (see components/site/gtm.tsx); all
 *    typed helpers push into the shared `dataLayer` so GTM tags can fire.
 *  - Lazy-loaded gtag.js for direct GA4 (no impact on initial page weight)
 *  - Consent Mode v2 (defaults to denied, grants on user action)
 *  - Automatic page-view tracking on Next.js App Router route changes
 *  - Typed custom-event helpers (cta_click, lead, phone_click, whatsapp_click, search, etc.)
 *  - No-op when no backend is active (dev builds stay clean)
 *  - Respects navigator.doNotTrack and window privacy flags
 *
 * Usage:
 *   import { trackEvent, trackCTAClick, trackLead } from "@/lib/analytics";
 *   trackCTAClick({ location: "hero", label: "Get Free Quote" });
 *
 * Configuration:
 *   Set NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXXXX in your .env.local or hosting env
 *   (defaults to GTM-PCVDG8ND). Optionally also set
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX for direct gtag.js GA4.
 *   If both are unset, all tracking calls become silent no-ops.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const GA_ENABLED = Boolean(
  GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith("G-")
);

/** Google Tag Manager container (defaults to the client's container). */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-PCVDG8ND";

export const GTM_ENABLED = Boolean(GTM_ID && GTM_ID.startsWith("GTM-"));

/** True when ANY analytics backend is active (GA4 and/or GTM). */
export const TRACKING_ENABLED = GA_ENABLED || GTM_ENABLED;

/* ------------------------------------------------------------------ */
/*  TypeScript declarations for gtag                                   */
/* ------------------------------------------------------------------ */

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
    __ga4ConsentGranted?: boolean;
  }
}

interface Gtag {
  (
    command: "js",
    target: Date | string
  ): void;
  (
    command: "config" | "set" | "get",
    target: string,
    config?: Record<string, unknown>
  ): void;
  (
    command: "event",
    action: string,
    params?: Record<string, unknown>
  ): void;
  (
    command: "consent",
    action: "default" | "update" | "grant",
    params?: Record<string, "granted" | "denied">
  ): void;
}

/* ------------------------------------------------------------------ */
/*  Initialization                                                     */
/* ------------------------------------------------------------------ */

let initialized = false;

/**
 * Initialize GA4. Idempotent. Safe to call from client components or layout.
 * - Loads gtag.js script lazily
 * - Sets up Consent Mode v2 with all-granted default (DPDP-friendly: no PII collected
 *   until user submits a form)
 * - Sends the initial config (page_path will be updated on route changes)
 */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (initialized) return;
  if (!GA_ENABLED) return;

  // Honor Do Not Track
  if (
    navigator.doNotTrack === "1" ||
    (window as unknown as { __ga4OptOut?: boolean }).__ga4OptOut
  ) {
    return;
  }

  // Inject script
  const src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${src}"]`
  );
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };

  // Consent Mode v2 — default to denied. Analytics storage granted only after
  // the user explicitly interacts with the contact form (trackLead call).
  (window.gtag as Gtag)("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500 as unknown as "granted" | "denied",
  });

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false, // we send manually for SPA-like reliability
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure",
    cookie_domain: "auto",
    cookie_expires: 63072000, // 2 years
  });

  initialized = true;
}

/**
 * Send a page_view to GA4. Called on every route change.
 */
export function trackPageView(pathname: string): void {
  if (typeof window === "undefined") return;
  if (!TRACKING_ENABLED || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: pathname,
    page_location: `${window.location.origin}${pathname}`,
    page_title: document.title,
  });
}

/**
 * Grant analytics consent. Call after a user has meaningfully consented
 * (e.g., after submitting the contact form). This activates analytics_storage
 * under Google Consent Mode v2.
 */
export function grantAnalyticsConsent(): void {
  if (typeof window === "undefined") return;
  if (!TRACKING_ENABLED || !window.gtag) return;
  if (window.__ga4ConsentGranted) return;

  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied", // we don't run ads, keep denied
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.__ga4ConsentGranted = true;
}

/* ------------------------------------------------------------------ */
/*  Typed event helpers                                                */
/* ------------------------------------------------------------------ */

/** Generic event tracker — the lowest-level helper. */
export function trackEvent(
  action: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  if (!TRACKING_ENABLED || !window.gtag) return;
  window.gtag("event", action, params);
}

/** CTA button click. `location` = where on the page (hero, navbar, footer, etc.). */
export function trackCTAClick(params: {
  location: string;
  label: string;
  href?: string;
}): void {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: params.label,
    cta_location: params.location,
    cta_href: params.href,
  });
}

/** Phone number click (tel: link). */
export function trackPhoneClick(params: {
  location: string;
  phone: string;
}): void {
  trackEvent("phone_click", {
    event_category: "contact",
    event_label: params.phone,
    cta_location: params.location,
  });
}

/** WhatsApp FAB / link click. */
export function trackWhatsAppClick(params: {
  location: string;
}): void {
  trackEvent("whatsapp_click", {
    event_category: "contact",
    event_label: "whatsapp",
    cta_location: params.location,
  });
}

/** Lead submission. Grants consent (so the conversion itself is recorded) and emits a lead event. */
export function trackLead(params: {
  location: string;
  service?: string;
  city?: string;
  propertyType?: string;
}): void {
  // Grant consent on meaningful engagement — this is DPDP-aligned because
  // the user explicitly submitted the form to be contacted.
  grantAnalyticsConsent();

  trackEvent("generate_lead", {
    event_category: "conversion",
    event_label: params.service ?? "general",
    cta_location: params.location,
    service: params.service,
    city: params.city,
    property_type: params.propertyType,
    value: 1,
    currency: "INR",
  });

  // Also emit a `lead` event for GA4's built-in "Lead" marked-conversion tracking
  trackEvent("lead", {
    event_category: "conversion",
    cta_location: params.location,
  });
}

/** Search (e.g., pest library search box). */
export function trackSearch(params: { term: string; location: string }): void {
  trackEvent("search", {
    event_category: "engagement",
    search_term: params.term,
    cta_location: params.location,
  });
}

/** Service detail page view (deeper than page_view — captures intent). */
export function trackServiceView(params: { slug: string; name: string }): void {
  trackEvent("service_view", {
    event_category: "engagement",
    service_slug: params.slug,
    service_name: params.name,
  });
}

/** Outbound link click (social media, WhatsApp, etc.). */
export function trackOutboundClick(params: {
  url: string;
  location: string;
}): void {
  trackEvent("click_outbound", {
    event_category: "engagement",
    link_url: params.url,
    cta_location: params.location,
  });
}

/** FAQ accordion expand — captures which questions users care about. */
export function trackFAQExpand(params: { question: string }): void {
  trackEvent("faq_expand", {
    event_category: "engagement",
    event_label: params.question,
  });
}

/** Pest library modal open. */
export function trackPestView(params: { slug: string; name: string }): void {
  trackEvent("pest_view", {
    event_category: "engagement",
    pest_slug: params.slug,
    pest_name: params.name,
  });
}
