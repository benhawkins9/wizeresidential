# Wise Residential — Build & Gap Analysis

Built by adapting the **Ocean Springs SEO framework** (Astro 5 + Tailwind v4, local service-area-business structure, programmatic city pages, full JSON-LD, `llms.txt`, "near me" optimization) to **Wise Residential**, reusing the existing site's brand assets, owner bio, and voice.

**Local project:** `F:\ObsidianVault\Projects\Wize Residential\wizeresidential-web`
**Target repo:** `github.com/benhawkins9/wizeresidential`

---

## 1. The existing site (baseline) — why the new one is an upgrade

Crawled `wizeresidential.com` (Screaming Frog, 128 URLs → ~10 real pages, built on Wix):

- **Every page's H1 is just "Wise Residential"** and every H2 is "Hours of Operation…" → **zero keyword-optimized headings** (the single biggest on-page miss).
- Thin content; **no service-area/city pages, no blog, no service-specific landing pages**, no meaningful schema.
- **NAP inconsistency:** the homepage shows **(228) 327-8859**, but the accessibility page **and the Google listings show (251) 272-9682** (a Mobile, AL area code). This actively confuses Google and customers.
- Brand is shown as **"Wise"** but the domain is **wizeresidential.com** ("Wize") — Google can get confused (your plan flagged this too).

The new site fixes all of the above: unique, keyword-rich H1/H2s on every page, 8 city pages, 6 service pages, 9 guides, full local + FAQ + breadcrumb + Person schema, and a consistent NAP pulled from one config file.

---

## 2. Your plan (the xlsx) → all implemented

Your plan scoped: homepage, 6 service pages, 6 city landing pages, GBP setup, a 14-post blog calendar, and a "$10 New Client Credit" CTA. **All of it is built**, plus the pages below that the plan didn't include.

### Full page inventory (37 pages)
| Group | Pages |
|---|---|
| Core | Home (Ocean Springs flagship) |
| Services (6) | Small Jobs · Mold Remediation · Water Filtration · Drywall & Painting · Carpentry & Wood Rot · Door & Window |
| Service areas (8) | Gautier · St. Martin · Gulf Hills · Biloxi · D'Iberville · Vancleave · Moss Point · Pascagoula |
| Hubs | Services · Service Areas · Guides |
| Blog | 9 of your 14 calendar posts (see §6) |
| Conversion | Free Estimate (+$10 credit) · Service Packages · Contact · Reviews |
| Trust/Legal | About (Chris's story) · Accessibility · Privacy · Terms · Sitemap · 404 |

---

## 3. Pages we added that the plan / old site lacked (gaps filled)

- **About / Bio** as a real E-E-A-T page — Chris's framer → Air National Guard → 26-year law-enforcement → contractor story. Huge for local trust and AI answers; the old "Bio" page existed but wasn't leveraged.
- **Free Estimate** lead-gen page — the **$10 new-customer credit funnel**, wired to email (Resend).
- **Service Packages** — rebuilt into 3 real offers (per-visit / filtration plan / custom maintenance).
- **Reviews & Promise** — honest, no fabricated reviews, ready to plug in real Google reviews.
- **Hubs** (Services / Service Areas / Guides) for internal-link equity.
- **Accessibility / Privacy / Terms / Sitemap / 404**.
- **D'Iberville + Pascagoula** city pages (beyond the plan's 6).

---

## 4. Pages we should ADD next (NOT yet built — recommendations)

**HIGH PRIORITY**
- **Kitchen & Bath Remodel** service page — ⚠️ your **live site advertises "kitchen & bath renovations,"** but neither the plan nor this build has a page for it. High-intent, high-value. Add `/services/kitchen-bath-remodel`.
- **Pressure Washing** — very high "near me" volume on the coast (mildew on siding/driveways); pairs naturally with the mold/healthy-home angle.
- **Gutter Cleaning & Guards** — strong local volume, storm-season relevant, already referenced inside Small Jobs.

**MEDIUM**
- **Deck Building & Staining** (beyond repair) · **Senior / Aging-in-Place** (grab bars, ramps) · standalone **TV Mounting** and **Furniture Assembly** pages (each is its own "near me" query) · **Flooring repair / LVP install**.

**BIGGEST SCALE LEVER — Service × City matrix**
- Programmatic pages like `/locations/gautier/mold-remediation` — **6 services × 8 cities = 48 pages** of high-intent "[service] in [city]" + "near me" surface. The framework already supports this pattern. Do it **after** the base set starts ranking, and only with genuinely localized copy (avoid thin/doorway pages).

---

## 5. Common keyword phrases — every page targets main keyword **+ "[keyword] near me"**

| Page | Primary keyword | "Near me" / secondary |
|---|---|---|
| Home | handyman Ocean Springs MS | handyman near me · home repair near me |
| Small Jobs | small job handyman Ocean Springs | handyman for small jobs near me · TV mounting near me |
| Mold Remediation | mold removal Ocean Springs | mold remediation near me · black mold removal near me |
| Water Filtration | water filter service Ocean Springs | water filter maintenance near me · RO service near me |
| Drywall & Painting | drywall repair Ocean Springs | drywall repair near me · interior painter near me |
| Carpentry & Wood Rot | wood rot repair Ocean Springs | wood rot repair near me · fascia repair near me |
| Door & Window | door repair Ocean Springs | door repair near me · window screen repair near me |
| City pages | handyman [city] MS | handyman near me in [city] |

Each is placed in the **title tag, H1, an H2, FAQ questions, and JSON-LD** — the pattern proven on oceanspringsseo.com.

---

## 6. Blog: 9 of 14 built; 5 remaining from your calendar

**Built (9):** common home repairs · how to choose a contractor · property maintenance (Jackson County) · handyman vs. general contractor · the ultimate to-do list · preventing mold after a storm · what's in your tap water · why wood rot spreads · hurricane prep checklist.

**Remaining from your calendar (write next):** "Chemicals vs. Biology: Why I Use Botanical Disinfectants" · "Spring Maintenance: Prepping Filters for Summer Heat" · "5 Small Repairs That Increase Home Value" · "The Hidden Cost of Ignoring Leaky Faucets" · "Project Spotlight: Restoring a Local Ocean Springs Home."

---

## 7. Off-page / local-SEO gaps (not the website — but where ranking is won)

1. **Google Business Profile** is the #1 lever for "near me." Claim/clean it: primary category **Handyman**, secondaries (Home Repair Service, Property Maintenance, Drywall Contractor, Carpenter, Painter), service-area = the 8 towns, **no street address** (SAB). Fix the phone.
2. **NAP consistency** — one phone, one brand spelling, everywhere (site, GBP, citations).
3. **Citations** — build/clean directory listings to match the GBP.
4. **Reviews** — a steady Google-review habit; the Reviews page is ready to receive them.

➡️ **Decisions & launch checklist: see [REVIEW.md](./REVIEW.md).**
