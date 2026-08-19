# Google Search Console & SEO Checklist

This checklist helps you submit the site to Google Search Console (GSC), verify ownership, submit the sitemap, and monitor indexing for top pages.

1. Create a Google Search Console property
   - Go to https://search.google.com/search-console
   - Choose "Domain" or "URL prefix". For full control, use `https://sivapestcontrol.com` as the URL prefix.

2. Verify ownership
   - Recommended: Use the HTML file upload or DNS TXT record.
   - If using HTML file: place the verification file under `public/` and upload to your server, then click "Verify".
   - If using DNS TXT: add the TXT record to your domain registrar and verify.

3. Submit sitemap
   - In GSC > Index > Sitemaps, enter `/sitemap.xml` and click "Submit".
   - Confirm status; GSC will report discovered URLs and errors.

4. Request indexing for priority pages
   - Use the URL Inspection tool to request indexing for:
     - `/` (homepage)
     - Top services: `/services/termite-control`, `/services/cockroach-gel-treatment`, etc.
     - Top blog posts (latest or updated): `/blog/monsoon-pest-pressure-south-india` etc.

5. Monitor coverage and enhancements
   - Check Index Coverage for errors (server errors, redirect issues, blocked by robots).
   - Check Enhancements > Core Web Vitals and Mobile Usability.
   - Check "Rich results" / "Enhancements" for FAQ, Breadcrumb, and Article results.

6. Test structured data
   - Use Google's Rich Results Test: https://search.google.com/test/rich-results
   - Use Schema Markup Validator: https://validator.schema.org/

7. Analytics & Search Console linkage
   - Link GA4 property to GSC to see search queries alongside site analytics.
   - In GSC: Settings > Associations > Link analytics property.

8. Ongoing tasks
   - Publish 1-2 SEO-optimized blog posts monthly targeting local keywords.
   - Build local citations: Google Business Profile, Justdial, Sulekha, etc.
   - Monitor GSC weekly for spikes, index coverage, or manual actions.

Commands and checks you can run locally:

- Build the site:

```bash
bun install
bun run build
```

- Run Lighthouse (requires Chrome installed):

```bash
npx --yes lighthouse "http://localhost:3000" --output html --output-path ./lighthouse-report.html --chrome-flags="--headless"
```

- Run Google's Structured Data test manually by pasting the page URL: https://search.google.com/test/rich-results

If you want, I can help with: creating the verification HTML file, preparing a sitemap snapshot for manual upload, or running Lighthouse and summarizing the top fixes.