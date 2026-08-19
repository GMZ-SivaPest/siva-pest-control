# Analytics Verification

Steps to add GA4 and verify analytics events for `Siva Pest Control`.

1. Add env vars
   - Copy `.env.example` to `.env.local`.
   - Set your values:
     - `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXXXX` (optional)
     - `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` (optional, starts with `G-`)
     - `NEXT_PUBLIC_DEBUG_ANALYTICS=1` (for a small overlay in dev only)

2. Start the dev server

```bash
bun install
bun dev
# or
npm install
npm run dev
```

3. Verify the analytics overlay (dev only)
   - With `NEXT_PUBLIC_DEBUG_ANALYTICS=1`, a small overlay appears bottom-right showing `GA4 enabled` and the `GA_MEASUREMENT_ID`.

4. Check runtime objects in the browser console
   - Open DevTools → Console
   - Inspect:

```js
window.dataLayer         // should be an array (possibly empty)
window.gtag              // should be a function if GA is loaded
window.__ga4ConsentGranted // true if consent granted after a lead
```

5. Trigger events
   - Navigate between pages; the `dataLayer` should receive `page_view` events (if GA/GTN enabled).
   - Submit the contact form to trigger `trackLead` which grants consent and emits a `generate_lead` event.

6. Confirm in Google Analytics
   - In GA4: Realtime → Events to see events arriving.
   - Look for `page_view`, `cta_click`, `generate_lead`, `lead` and other custom events.

7. Optional automated check (server-side HTML)
   - Fetch the homepage and look for the GA script URL `googletagmanager.com/gtag/js?id=G-...` in the HTML head.

8. Cleanup
   - Do NOT set `NEXT_PUBLIC_DEBUG_ANALYTICS=1` in production.

If you want, I can enable the debug overlay in the root `layout.tsx` while we test, then remove it afterward. I can also run a live verification by starting the dev server here and checking `window.dataLayer` for page_view events.