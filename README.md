# wizeresidential-web

Marketing site for **Wise Residential** — a licensed, insured home-repair & handyman service in **Ocean Springs, MS** and the Mississippi Gulf Coast. Built with **Astro 5 + Tailwind v4**, deploys static to **Vercel**. Adapted from the Ocean Springs SEO local-SEO framework.

> 📋 Read **[GAP-ANALYSIS.md](./GAP-ANALYSIS.md)** for what's built vs. what to add next, and **[REVIEW.md](./REVIEW.md)** for the decisions/assets needed before launch.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve the build locally
npm run check      # astro type-check
node scripts/gen-brand.mjs   # regenerate logo.png / og-image.png / icons from src/assets/brand/logo.jpg
```

## Editing content

| To change… | Edit… |
|---|---|
| Brand name, phone, email, owner, hours, license, $10 offer | `src/data/site.ts` (single source of truth) |
| A service page | `src/content/services/<slug>.md` |
| Add/edit a city | `src/data/locations.ts` (append one object → new page) |
| A blog post | `src/content/guides/<slug>.md` |
| Brand colors / fonts | `src/styles/global.css` (`@theme`) |
| Reviews (real only) | `src/pages/results.astro` (`reviews[]`) + `src/data/testimonials.ts` |
| Lead-email copy/recipients | `api/lead.js` (+ Vercel env vars) |

## Brand assets

Real logo and photos live in `src/assets/brand/` and `src/assets/generated/` (pulled from the existing wizeresidential.com). `public/logo.png`, `og-image.png`, and icons are generated from the logo via `scripts/gen-brand.mjs`.

## Deploy

Push to GitHub (`benhawkins9/wizeresidential`) and import in Vercel (auto-detects Astro). `vercel.json` sets security headers + asset caching; `api/lead.js` runs as the `/api/lead` serverless function. Set `RESEND_API_KEY` and add the domain.

Find every launch placeholder: `grep -rn "REVIEW" src/`.
