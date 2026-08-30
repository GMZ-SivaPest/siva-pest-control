import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID, GTM_ENABLED } from "@/lib/analytics";

/**
 * Google Tag Manager — uses the official @next/third-parties/google component.
 *
 * Note: The dataLayer and consent mode defaults are set up in the
 * AnalyticsScript component (analytics.tsx) which runs before GTM loads.
 *
 * Renders nothing when GTM is disabled (no container ID configured).
 */
export function GtmScript() {
  if (!GTM_ENABLED) return null;

  return <GoogleTagManager gtmId={GTM_ID} />;
}

export function GtmNoScript() {
  // GoogleTagManager component handles the noscript fallback automatically
  return null;
}
