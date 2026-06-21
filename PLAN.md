# Ocean Springs SEO — Architecture & Build Plan

**Domain:** `oceanspringsseo.com`
**What it is:** A local **SEO agency** website (Service-Area Business) for **Ocean Springs, MS + the Mississippi Gulf Coast**. Flagship site of a planned `[city]seo.com` EMD portfolio (1 LLC → DBAs → ~15 sites + 15 GBPs).
**Stack:** Astro 5 (static) · Tailwind CSS v4 · `@astrojs/sitemap` · deploy to Vercel.
**Status:** ✅ Built, type-checks clean, builds clean (25 pages), verified in browser. **Not yet deployed.** See `REVIEW.md` for everything needing Ben's input before launch.

---

## Why this architecture

The keyword research (validated 2026-06-15) drove every decision:

- **"ocean springs seo" = 0 search volume.** A town of ~18k can't sustain a site that targets one EMD phrase. So the site is **not** built around that.
- **The money is in "near me" + map-pack intent:** "seo company near me" (17.9K, ~$41 CPC), "seo services near me" (27.1K), "local seo services" (10.1K). These resolve by *proximity* — the GBP + a locally-optimized site win them.
- **Therefore the model is GBP-anchored local SEO + city-modified service pages across the whole coast**, not a single-keyword EMD play. That's why we have programmatic **location pages** for every Gulf Coast city, each targeting "[service] in [city]".
- **AEO/GEO is the differentiator.** Ben specializes in AI search; almost no local agency offers it. It's a featured service and a recurring theme — first-mover advantage while AI search is new.

## Site map (25 pages)

```
/                         Home — Ocean Springs flagship; targets "seo company near me"/local
/services                 Services hub
/services/[slug]          6 services (content collection, markdown):
                            • local-seo            • google-business-profile
                            • ai-search-optimization (AEO/GEO ★)   • web-design
                            • reputation-management • content-seo
/locations                Service-area hub (grouped by county)
/locations/[slug]         9 programmatic city pages (unique local content each):
                            biloxi, gulfport, d-iberville, gautier, pascagoula,
                            moss-point, long-beach, pass-christian, bay-st-louis
/free-seo-audit           Primary lead magnet + lead form
/contact                  Contact + lead form
/about                    Founder story / E-E-A-T / values
/results                  Methodology + honest timeline (real case studies when earned)
/privacy, /terms          Legal (starter templates — need review)
/404                      Friendly not-found
```

## Code structure

```
src/
  data/
    site.ts            ← SINGLE SOURCE OF TRUTH: NAP, phone, founder, hours, form config
    locations.ts       ← Gulf Coast cities w/ unique per-city data (drives /locations/[slug])
    testimonials.ts    ← real-only, approved-gated (nothing fake renders)
  content/services/    ← 6 service .md files (frontmatter + body) via content.config.ts
  lib/schema.ts        ← JSON-LD builders (ProfessionalService, Service, FAQ, Breadcrumb)
  layouts/BaseLayout   ← <head>, SEO meta, OG/Twitter, canonical, JSON-LD injection
  components/          ← Header, Footer, Logo, Hero bits, ServiceCard, LocationCard,
                         CTASection, FAQ, Breadcrumbs, LeadForm, Testimonials, Icon
  pages/               ← routes above
public/                ← robots.txt, favicon.svg, og-image.png, icons, manifest
scripts/gen-images.mjs ← regenerates og-image + icons from SVG (sharp)
```

### Design decisions worth knowing
- **Services = content collection** (editorial, markdown). **Locations = data + template** (programmatic, scales to new cities by adding one object). Intentional hybrid.
- **Everything reads from `site.ts`.** Change the phone once, it updates header, footer, schema, every CTA.
- **No fabricated proof.** Testimonials/case studies are gated on real, approved data (FTC-safe). Until then the site sells on the founder's real credentials + methodology.
- **Clean URLs** (`build.format: "file"`, `trailingSlash: "never"`) so canonical = sitemap = served URL, no trailing slashes.
- **AI crawlers explicitly welcomed** in `robots.txt` (GPTBot, PerplexityBot, Google-Extended, etc.) — we *want* to be cited.

## Local dev / build

```bash
npm install
npm run dev      # http://localhost:4321   (preview config name: "osseo")
npm run build    # → dist/  (static)
npm run preview  # serve the build
npm run check    # astro type-check (currently 0/0/0)
node scripts/gen-images.mjs   # regenerate og-image + icons
```

## Deploy (Vercel) — not done yet
1. Git repo is **initialized** (no commits yet — left for you to authorize). Make the first commit, create a GitHub repo, and push (or use the `vercel` CLI).
2. Vercel auto-detects Astro → build `astro build`, output `dist/`. `vercel.json` adds security headers + asset caching.
3. Add domain `oceanspringsseo.com` once registered (see REVIEW).

## Roadmap after launch
- Programmatic **"[service] in [city]"** pages (services × cities matrix) once the base ranks — biggest scale lever.
- Blog/local content engine (helpful local-search content + AI-citation bait).
- Replicate this codebase for the rest of the `[city]seo.com` portfolio (it's built to be forked — change `site.ts` + `locations.ts`).
- Real GBP heatmap tracking + rank tracking wired into a results dashboard.

_See `REVIEW.md` for the punch list of decisions and assets needed from Ben._
