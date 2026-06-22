# Wise Residential — Review & Decisions Needed

Built autonomously by adapting the Ocean Springs SEO framework. The site **builds clean (37 pages)** and runs locally, but it is **not deployed** — everything below needs your accounts or a decision. Work top-down: 🔴 blocks launch · 🟡 confirm · 🟢 polish.

Find every placeholder in code: `grep -rn "REVIEW" src/`.

---

## 🔴 Blockers — resolve before go-live

| # | Item | Where | Notes |
|---|------|-------|-------|
| 1 | **Brand spelling: "Wise" vs "Wize"** | `src/data/site.ts → name` | Built as **"Wise Residential"** (matches your live site, logo, and the plan's recommendation); domain stays `wizeresidential.com`. Change `name` once and it propagates everywhere. |
| 2 | ✅ **Phone — resolved** | `src/data/site.ts` | Set to **(251) 272-9682** everywhere (2026-06-21) to match the Google Business Profile; old (228) dropped. |
| 3 | **Domain & hosting** | `astro.config.mjs`, `src/data/site.ts → url` | Decision: repoint **wizeresidential.com** (currently Wix) to Vercel, or use a new EMD (e.g. `oceanspringshomerepair.com`, per your plan). Build assumes `https://www.wizeresidential.com`. |
| 4 | **Lead-form email backend** | Vercel env + `api/lead.js` | Set `RESEND_API_KEY` and verify the sending domain in Resend; optionally set `LEAD_NOTIFY_TO` / `LEAD_REPLY_TO` (default `cwise@wizeresidential.com`). Until then the form shows an honest "call/text me" fallback — no leads are silently dropped. |
| 5 | **Legal pages** | `src/pages/privacy.astro`, `terms.astro`, `accessibility.astro` | Starters only. Your live site has real Terms/warranty + an accessibility statement — port those in and have counsel confirm. |

## 🟡 Confirm (I made a reasonable call — change if wrong)

| # | Decision | Where |
|---|----------|-------|
| 6 | **Owner bio** (framer → Air National Guard → 26-yr law enforcement → contractor) | `src/data/site.ts → founder`, `src/pages/about.astro` — drafted from your live bio; skim for accuracy. |
| 7 | **6-service lineup** | `src/content/services/*.md` — consider adding **Kitchen & Bath Remodel** (you offer it!), Pressure Washing, Gutters — see GAP-ANALYSIS §4. |
| 8 | **8 service-area cities** | `src/data/locations.ts` — add/remove by editing one object each. |
| 9 | **Service Packages have no published prices** | `src/pages/service-packages.astro` — your live site doesn't publish prices either; add real prices/terms if you want them public. |
| 10 | **Hours Mon–Fri 8–5** | `src/data/site.ts → hours` (feeds schema + footer + contact). |

## 🟢 Assets & polish (can launch without, better with)

| # | Item | Where |
|---|------|-------|
| 11 | **Photos for 2 services** | `src/assets/generated/service-carpentry-wood-rot.jpg` & `service-door-window.jpg` are missing (those pages render with no hero image — safe). Drop in real photos. Some other images are stock/illustration — real job photos lift trust. |
| 12 | **Real reviews** | `src/pages/results.astro` (`reviews[]`) + `src/data/testimonials.ts` — only add real, approved ones (never fabricate). |
| 13 | **GBP + social links** | `src/data/site.ts → social` — paste the verified Google Business Profile share link + any socials (feeds schema `sameAs` + footer "Find us on Google"). |
| 14 | **Analytics** | `src/layouts/BaseLayout.astro` — add GA4 / Vercel Analytics (one snippet). |
| 15 | **Logo** | Using your real Wix logo (orange square) at `src/assets/brand/logo.jpg`. A transparent-background PNG would look crisper in the white header. |

---

## Deploy (when you're ready)
1. ✅ Git repo initialized + initial commit + `origin` set to `github.com/benhawkins9/wizeresidential`. **Next:** create the empty GitHub repo, then `git -C "<project>" push -u origin main` (needs your GitHub auth).
2. Import the repo in **Vercel** (auto-detects Astro; `vercel.json` sets headers/caching; `api/lead.js` becomes the `/api/lead` function).
3. Set env vars (`RESEND_API_KEY`, etc.) and add the domain.
4. Point DNS (apex + `www`) and confirm SSL.

## What I deliberately did NOT do (needs your accounts/decisions)
Register/repoint DNS · stand up GitHub/Vercel · claim or fix the Google Business Profile · set the Resend key · publish anything · invent reviews, prices, or credentials.

## Decisions log
- Reskinned the OS-SEO palette **in place** (token names kept `navy`/`gulf`/`sand`; values remapped to the logo's slate / sky-blue / orange) so every component re-themed with zero markup churn.
- Dropped the `industries` collection (irrelevant to a handyman); repurposed city pages around "common repairs" instead of industries.
- Renamed routes: `/free-seo-audit → /estimate`, `/pricing → /service-packages`.
- Honesty guardrails kept: no fabricated reviews/stats, no guarantees.
