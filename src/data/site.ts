/**
 * Central business identity & site config — single source of truth.
 *
 * Adapted from the Ocean Springs SEO framework for **Wise Residential**, a
 * licensed home-repair / handyman service in Ocean Springs, MS.
 *
 * ⚠️ REVIEW: values tagged `// REVIEW` need Ben/Chris to confirm before launch
 * (see REVIEW.md). The biggest two: the BRAND SPELLING (Wise vs Wize) and the
 * PHONE NUMBER (the live site shows two different numbers — see `phone`).
 */

export const site = {
  // Brand spelling: the live site, the logo, and the plan all use "Wise".
  // The domain keeps the "Z" (wizeresidential.com). Change `name` here and it
  // propagates everywhere. // REVIEW: confirm Wise vs Wize as the public brand.
  name: "Wise Residential",
  legalName: "Wise Residential", // REVIEW: registered LLC/DBA. MS Lic. #1500778
  domain: "wizeresidential.com",
  url: "https://www.wizeresidential.com",
  tagline: "A healthy home starts with a 'Wise' decision",
  shortDescription:
    "Wise Residential is a licensed, insured home-repair and handyman service in Ocean Springs, MS — general repairs, mold remediation, water filtration, drywall, carpentry, and door & window work, done cleanly and on schedule.",

  // Contact -----------------------------------------------------------
  // Phone: (251) 272-9682 — confirmed 2026-06-21 to match the Google Business
  // Profile (NAP consistency). The old (228) number from the prior site was
  // dropped so there's one number everywhere (site + GBP + citations).
  phone: "(251) 272-9682",
  phoneHref: "tel:+12512729682",
  email: "cwise@wizeresidential.com",
  bookingUrl: "/estimate", // internal lead-gen page (free estimate + $10 credit)

  // Lead form submission → Vercel serverless function (api/lead.js), which
  // emails the business + sends the lead a branded auto-reply via Resend.
  // Until RESEND_API_KEY is set in Vercel, the function returns "not configured"
  // and the form gracefully tells visitors to call instead (no silent lead loss).
  forms: {
    endpoint: "/api/lead",
  },

  // New-client offer (from the SEO plan) — drives the email-capture CTA.
  offer: {
    headline: "Get $10 Off Your First Service",
    buttonText: "Claim My $10 Credit",
    success: "Check your inbox! Your $10 credit is on its way.",
    disclaimer:
      "Valid for new customers in the Ocean Springs / Jackson County area only.",
  },

  // Owner / E-E-A-T ---------------------------------------------------
  founder: {
    name: "Chris Wise",
    role: "Owner & Licensed Contractor",
    bio: "Chris Wise is the owner of Wise Residential. He started framing houses at 18 — “do it right the first time, keep it level and true” — served four years in the Air Force National Guard, and spent 26 years in law enforcement, retiring as a shift supervisor. He brings that same discipline to home repair: on-time arrivals, clear communication, one fair price regardless of your zip code, and a job site left cleaner than he found it.",
  },

  // License / credentials --------------------------------------------
  license: "MS Residential Builder/Remodeler Lic. #1500778",
  insured: true,

  // Service-Area Business (SAB): no public street address ------------
  isServiceAreaBusiness: true,
  baseCity: "Ocean Springs",
  baseRegion: "MS",
  baseRegionName: "Mississippi",
  baseCounty: "Jackson County",
  geo: { lat: 30.4113, lng: -88.8276 }, // Ocean Springs, MS centroid

  hours: [
    { day: "Monday", open: "08:00", close: "17:00" },
    { day: "Tuesday", open: "08:00", close: "17:00" },
    { day: "Wednesday", open: "08:00", close: "17:00" },
    { day: "Thursday", open: "08:00", close: "17:00" },
    { day: "Friday", open: "08:00", close: "17:00" },
  ],
  hoursLabel: "Mon–Fri, 8am–5pm",

  priceRange: "$$",

  social: {
    // REVIEW: claim/clean up the Google Business Profile (the live one shows a
    // mismatched phone). Add URLs once verified — empty entries are skipped.
    facebook: "",
    instagram: "",
    linkedin: "",
    google: "", // REVIEW: paste verified GBP share link here
  },

  // Trust signals (used on home / about) -----------------------------
  stats: {
    licensed: "Licensed & Insured",
    local: "Ocean Springs Local",
    promise: "Left Cleaner Than Found",
    response: "Fast, Fair Estimates",
  },
} as const;

export type Site = typeof site;
