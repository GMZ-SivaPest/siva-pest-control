import { GTM_ID, GTM_ENABLED } from "@/lib/analytics";

/**
 * Google Tag Manager — server-rendered head/body snippets.
 *
 * GtmScript (mount in <head>):
 *   - Bootstraps the shared `dataLayer` + a `window.gtag` stub so the
 *     site's tracking helpers (lib/analytics.ts) push events into the
 *     SAME dataLayer that GTM listens on.
 *   - Sets Google Consent Mode v2 defaults (all marketing/analytics
 *     storage DENIED) BEFORE the container loads — the cookie consent
 *     banner later flips `analytics_storage` to granted via
 *     grantAnalyticsConsent().
 *   - Loads the GTM container (async).
 *
 * GtmNoScript (mount at top of <body>):
 *   - Standard <noscript> iframe for visitors with JS disabled.
 *
 * Both render nothing when GTM is disabled (no container ID configured).
 */
export function GtmScript() {
  if (!GTM_ENABLED) return null;

  return (
    <>
      {/* Consent Mode v2 defaults + dataLayer bootstrap — must run BEFORE
          the container loader so GTM honors the consent state */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
          `,
        }}
      />
      <script
        // Defer loading of the GTM container until the browser is idle
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              function loadGTM(){
                var s=document.createElement('script');
                s.async=true;
                s.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
                var n=document.getElementsByTagName('script')[0];
                n.parentNode.insertBefore(s,n);
              }
              if('requestIdleCallback' in window){
                requestIdleCallback(loadGTM,{timeout:2000});
              } else {
                setTimeout(loadGTM,2000);
              }
            })();
          `,
        }}
      />
    </>
  );
}

export function GtmNoScript() {
  if (!GTM_ENABLED) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
