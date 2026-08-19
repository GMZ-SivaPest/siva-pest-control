# GA4, gtag.js, and GTM Setup Guide

This guide helps you configure Google Analytics 4 (GA4), optionally use Google Tag Manager (GTM), and link GA4 to Google Search Console (GSC).

1. Create a GA4 property
   - Go to https://analytics.google.com/ and create a new GA4 property for your domain.
   - Add a Web data stream and copy the Measurement ID (format: `G-XXXXXXXXXX`).

2. Choose GTM vs direct GA4 (gtag.js)
   - Recommended: Use GTM if you need flexible tag management, marketing tags, A/B testing, or future integrations.
   - Direct gtag.js is simpler for straightforward pageview and custom event tracking.

3. Configure GTM (if using)
   - Create a GTM container and note its ID (`GTM-XXXXXXXX`).
   - In GTM, add a new Tag: Google Analytics: GA4 Configuration.
     - Set Measurement ID to your GA4 `G-...` value.
     - Set trigger to All Pages.
   - Publish the container.

4. Add container & measurement ID to the app
   - Set environment variables in your hosting provider or `.env.local`:

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
```

   - If you use GTM, you can leave `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty and manage GA through GTM.
   - For direct gtag.js usage, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and GTM may remain unset.

5. Verify runtime presence (local / staging)
   - Start the dev server with the env vars set.
   - Open the page in Chrome and check DevTools → Network for `gtag/js?id=G-...` or `gtm.js?id=GTM-...`.
   - Check `window.dataLayer` and `window.gtag` in the console.

6. Map events & conversions
   - The app emits custom events (e.g., `generate_lead`, `cta_click`, `phone_click`).
   - In GA4, configure custom events and mark `generate_lead` as a conversion.
   - In GTM, you can create triggers based on Data Layer events and forward them to GA4 if needed.

7. Link GA4 to Google Search Console
   - In GSC: Settings → Associations → Link Google Analytics.
   - Select your GA4 property and follow the on-screen flow.
   - Linking enables richer data (Search Console reports in GA) and helps correlate organic queries with on-site behavior.

8. Consent & privacy notes
   - The site uses Consent Mode v2 defaults that deny analytics and ad storage until the user grants consent (e.g., after a contact form submission).
   - This setup is DPDP-friendly for India and GDPR-friendly for EU — ensure your privacy page documents the consent behavior.

9. Testing checklist
   - Verify page_view events in GA4 Realtime after visiting pages.
   - Submit the contact form and verify `generate_lead` and consent update appear in realtime.
   - Verify that `dataLayer` events appear in GTM Preview mode (if using GTM).

10. Troubleshooting
   - If events are missing: check env vars, console for gtag errors, adblocker extensions, and network requests to `googletagmanager.com`.
   - Use GTM Preview mode to inspect Data Layer events before publishing.

If you want, I can:
- Start the dev server here, load a test page, and report back whether `window.dataLayer` and `window.gtag` appear.
- Prepare GTM container JSON with preconfigured tags/triggers for `generate_lead` and `cta_click` events.
