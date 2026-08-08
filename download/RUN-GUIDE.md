# Siva Pest Control — Source Code

Production-ready Next.js 16 app for **Siva Pest Control** (Hyderabad · Chennai · Bangalore).

## Quick start

```bash
# 1. Install dependencies
npm install   # or: bun install

# 2. Set up environment variables
cp .env.example .env   # then edit .env with your values

# 3. Generate Prisma client + push schema to SQLite
npx prisma generate
npx prisma db push

# 4. Run dev server
npm run dev
# → http://localhost:3000

# 5. Production build
npm run build
npm run start
```

## What's in this archive

| Path | What |
|------|------|
| `src/app/` | Next.js App Router routes (14 pages + `/api/contact`) |
| `src/components/site/` | 30+ reusable UI components (hero, services-gallery, protection-shield, before-after-slider, whatsapp-fab, etc.) |
| `src/components/pages/` | Page-level compositions (home, services, pests, blog, etc.) |
| `src/data/` | Single source of truth — services, pests (37 entries), locations, blog, testimonials, company, brand |
| `src/lib/` | Analytics, db client, navigation store, utils |
| `prisma/` | Database schema (Lead model) |
| `public/images/` | Real photography — 43 pest images, 11 treatment images, 12 carousel images, hero composition |
| `next.config.ts` | Next.js config (standalone output, image optimization) |
| `package.json` | Dependencies + scripts |

## Environment variables needed

Create `.env` with:

```bash
DATABASE_URL="file:./db/siva.db"   # SQLite (default) or postgres URL
RESEND_API_KEY=""                   # Optional — email notifications
LEADS_EMAIL_TO="info@sivapestcontrol.com"
LEADS_EMAIL_FROM="leads@sivapestcontrol.com"
```

If `RESEND_API_KEY` is empty, leads still save to the DB — just no email notification. The API route logs them to console as fallback.

## Tech stack

- **Next.js 16** (App Router, Turbopack, standalone output)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** + custom brand palette (brown / ivory / orange / teal)
- **Framer Motion** for animations (respects `prefers-reduced-motion`)
- **Prisma 6** + SQLite (swap to Postgres for production)
- **Resend** for transactional email (optional)
- **GA4 + Consent Mode v2** for analytics
- **shadcn/ui** components

## Key features

- 14 service pages with inline quote forms
- 37-entry pest library with real photography + SEO schema
- 3 location pages (Hyderabad, Chennai, Bangalore)
- 6 blog articles with full markdown content
- Real `/api/contact` route with validation, honeypot, DB persistence, email hook
- Premium visual system: ProtectionShield signature animation, BeforeAfterSlider, Manifesto, ProtectionCTA
- Floating WhatsApp + Call FAB (desktop hover-expand, mobile two-icon bar)
- Cookie consent + reduced-motion + skip-to-content + ARIA labels throughout
- JSON-LD structured data (PestControl schema) for SEO
- Sitemap + robots.txt auto-generated

## Build verified

- `npx tsc --noEmit` — clean
- `npx next build` — all 38 routes compiled successfully
- 37 pests × 14 services × 3 locations × 6 blog posts all pre-rendered
