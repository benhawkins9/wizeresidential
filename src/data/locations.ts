/**
 * Programmatic location pages for Wise Residential's MS Gulf Coast service area.
 * Each city carries UNIQUE local detail (home stock, landmarks, coastal angle)
 * so the generated pages are genuinely distinct — not doorway/thin pages.
 *
 * Home page (/) covers Ocean Springs itself, so it is intentionally NOT a
 * location page here (avoids cannibalizing the homepage). It still appears in
 * the service-area lists via site.baseCity.
 *
 * Cities = the SEO plan's 6 GBP service-area towns (Gautier, Biloxi, St. Martin,
 * Vancleave, Gulf Hills, Moss Point) + 2 adjacent gap adds (D'Iberville,
 * Pascagoula). St. Martin / Gulf Hills are unincorporated CDPs — low-competition
 * hyperlocal pages right next to Ocean Springs.
 *
 * ⚠️ REVIEW: populations are approximate; landmarks/notes are drafted from public
 * knowledge of the coast — skim for accuracy before launch.
 */

export interface LocationData {
  slug: string;
  name: string;
  county: string;
  population: string;
  driveTime: string; // from Ocean Springs
  geo: { lat: number; lng: number };
  /** One-line positioning used in cards + meta. */
  blurb: string;
  /** 2–3 sentence unique intro for the page body. */
  intro: string;
  /** The most-requested local repairs here (becomes "common jobs near you"). */
  commonJobs: string[];
  /** Recognizable local anchors for genuine local relevance (trust signals). */
  landmarks: string[];
  /** A market-specific angle — why home repair matters *here* (coastal homes). */
  marketNote: string;
  /** slugs of nearby cities for internal linking. */
  nearby: string[];
}

export const locations: LocationData[] = [
  {
    slug: "gautier",
    name: "Gautier",
    county: "Jackson County",
    population: "~18,000",
    driveTime: "10 minutes",
    geo: { lat: 30.3858, lng: -88.6118 },
    blurb: "Fast, reliable home repair just across the Pascagoula River from Ocean Springs.",
    intro:
      "Gautier sits a few minutes east of our home base in Ocean Springs, so it's one of the first calls we say yes to. Between established riverfront homes and the newer family neighborhoods off Highway 90, there's no shortage of honey-do lists, wood rot, and small repairs that need someone who actually shows up. That someone is Wise Residential.",
    commonJobs: [
      "Wood rot & fascia repair",
      "Drywall patching & painting",
      "Door & window service",
      "Small jobs & installations",
      "Mold remediation",
    ],
    landmarks: ["Shepard State Park", "Singing River", "Gautier Town Green", "Hwy 90 corridor"],
    marketNote:
      "Gautier's mix of older riverfront houses and fast-growing subdivisions means two kinds of work: protecting aging wood and trim from coastal humidity, and knocking out the punch lists new homeowners never get to. We handle both.",
    nearby: ["ocean-springs-area", "pascagoula", "moss-point"],
  },
  {
    slug: "st-martin",
    name: "St. Martin",
    county: "Jackson County",
    population: "~9,000",
    driveTime: "8 minutes",
    geo: { lat: 30.4283, lng: -88.8642 },
    blurb: "Your next-door handyman for the St. Martin community between Ocean Springs and Biloxi.",
    intro:
      "St. Martin is practically our backyard — an unincorporated community tucked between Ocean Springs and the Back Bay. Most of the homes here are owner-occupied and a few decades old, which is exactly when fixtures start failing, trim starts rotting, and the to-do list starts growing. We keep St. Martin homes in good repair without the wait or the runaround.",
    commonJobs: [
      "General home repairs",
      "Ceiling fan & fixture swaps",
      "Drywall & texture repair",
      "Water filtration service",
      "Wood rot repair",
    ],
    landmarks: ["Fountainebleau", "Old Fort Bayou", "Lemoyne Boulevard", "St. Martin schools"],
    marketNote:
      "Settled, owner-occupied neighborhoods like St. Martin reward a handyman who's close by and reliable. Because we're minutes away in Ocean Springs, we can often get to St. Martin homes the same week — and prioritize urgent leaks and rot.",
    nearby: ["ocean-springs-area", "gulf-hills", "d-iberville"],
  },
  {
    slug: "gulf-hills",
    name: "Gulf Hills",
    county: "Jackson County",
    population: "~6,000",
    driveTime: "6 minutes",
    geo: { lat: 30.4399, lng: -88.8459 },
    blurb: "Trusted home repair for the established Gulf Hills neighborhood on Old Fort Bayou.",
    intro:
      "Gulf Hills is one of the most established neighborhoods right next to Ocean Springs — bayou-front lots, mature trees, and homes with real character (and real maintenance needs). Older, well-loved houses near the water need an experienced hand for wood rot, drywall, and the steady drip of small repairs. We're just up the road and glad to help.",
    commonJobs: [
      "Wood rot & deck repair",
      "Drywall & interior painting",
      "Door & window weatherstripping",
      "Mold remediation",
      "Small jobs & to-do lists",
    ],
    landmarks: ["Gulf Hills Hotel & Golf Club", "Old Fort Bayou", "Bayou View", "Gulf Hills Drive"],
    marketNote:
      "Waterfront and bayou-adjacent homes in Gulf Hills face the coast's toughest combination: humidity, salt air, and shade-loving moisture. That's prime territory for wood rot and mold — the exact specialties we built Wise Residential around.",
    nearby: ["ocean-springs-area", "st-martin", "d-iberville"],
  },
  {
    slug: "biloxi",
    name: "Biloxi",
    county: "Harrison County",
    population: "~49,000",
    driveTime: "15 minutes",
    geo: { lat: 30.396, lng: -88.8853 },
    blurb: "Licensed handyman & home-repair service across Biloxi and the Back Bay.",
    intro:
      "Biloxi's housing runs from historic homes near the water to rental properties and family neighborhoods up toward Keesler. Coastal weather is hard on all of them. Whether you own your home or manage a rental, Wise Residential brings licensed, insured repair work — from mold and water damage to the small fixes that keep a property rentable — a short drive from Ocean Springs.",
    commonJobs: [
      "Mold remediation & cleanup",
      "Water damage & drywall repair",
      "Wood rot & exterior trim",
      "Water filtration service",
      "Rental turn & punch lists",
    ],
    landmarks: ["Biloxi Lighthouse", "Beau Rivage", "Point Cadet", "Keesler AFB area"],
    marketNote:
      "Older homes and rental properties near the Biloxi waterfront take a beating from humidity and storms. Landlords and homeowners alike need a repair pro who handles mold, water damage, and rot the right way — with EPA-registered products and real structural drying, not a coat of paint over the problem.",
    nearby: ["d-iberville", "ocean-springs-area"],
  },
  {
    slug: "d-iberville",
    name: "D'Iberville",
    county: "Harrison County",
    population: "~14,000",
    driveTime: "18 minutes",
    geo: { lat: 30.4427, lng: -88.8895 },
    blurb: "Home repair & maintenance for D'Iberville's growing Back Bay neighborhoods.",
    intro:
      "D'Iberville has grown fast around the Promenade and the Back Bay, with newer subdivisions and a steady stream of homeowners settling in. New and newer homes still need someone for the things builders leave undone and warranties don't cover — fixture installs, drywall dings, weatherstripping, and the first signs of coastal wear. We've got it.",
    commonJobs: [
      "Small jobs & installations",
      "Drywall & paint touch-ups",
      "Door & window service",
      "Water filtration installs & service",
      "Wood rot prevention",
    ],
    landmarks: ["Promenade shopping center", "Back Bay of Biloxi", "I-110 / I-10 interchange", "D'Iberville waterfront"],
    marketNote:
      "Newer D'Iberville homes don't escape the coast — humidity, hard water, and builder shortcuts catch up fast. Getting ahead of weatherstripping, caulking, and filtration early saves these homeowners from bigger repairs down the road.",
    nearby: ["biloxi", "ocean-springs-area"],
  },
  {
    slug: "vancleave",
    name: "Vancleave",
    county: "Jackson County",
    population: "~5,000",
    driveTime: "20 minutes",
    geo: { lat: 30.5402, lng: -88.6878 },
    blurb: "The rural-home repair specialist for Vancleave — including well-water filtration.",
    intro:
      "Vancleave is a different kind of coast: wooded lots, larger properties, and a lot of homes on well water north of the bayou. That means repair needs city handymen skip — well-water filtration, larger decks and outbuildings, and trim that battles serious humidity under the tree canopy. We make the drive and treat Vancleave homes right.",
    commonJobs: [
      "Well-water filtration & testing",
      "Deck & fence repair",
      "Wood rot & carpentry",
      "General home repairs",
      "Drywall & painting",
    ],
    landmarks: ["Bluff Creek", "Mississippi Sandhill Crane Refuge", "Hickory Hill", "Hwy 57"],
    marketNote:
      "Rural Vancleave homes lean on well water, so filtration maintenance and water-quality testing matter more here than almost anywhere on the coast. Add bigger lots with decks, fences, and outbuildings, and there's steady carpentry and rot work too.",
    nearby: ["ocean-springs-area", "gautier", "moss-point"],
  },
  {
    slug: "moss-point",
    name: "Moss Point",
    county: "Jackson County",
    population: "~13,000",
    driveTime: "20 minutes",
    geo: { lat: 30.4097, lng: -88.5342 },
    blurb: "Reliable repair & mold remediation for Moss Point's riverfront homes.",
    intro:
      "Moss Point is riverfront, tight-knit, and no stranger to high water. Homes here see more than their share of moisture, which means mold, wood rot, and water-damaged drywall come with the territory. Wise Residential brings science-based mold remediation and honest repair work to Moss Point — fix the source, dry it right, and protect the home.",
    commonJobs: [
      "Mold remediation & structural cleaning",
      "Water damage & drywall repair",
      "Wood rot repair",
      "Door & window service",
      "General home repairs",
    ],
    landmarks: ["Pascagoula River Audubon Center", "Escatawpa River", "Downtown Moss Point", "Riverfront neighborhoods"],
    marketNote:
      "River-adjacent, flood-prone homes in Moss Point are ground zero for mold and wood rot. The wrong fix — paint over the stain, ignore the moisture — comes back fast. We find the source, use EPA-registered products, and dry it properly so it stays gone.",
    nearby: ["pascagoula", "gautier", "ocean-springs-area"],
  },
  {
    slug: "pascagoula",
    name: "Pascagoula",
    county: "Jackson County",
    population: "~21,000",
    driveTime: "18 minutes",
    geo: { lat: 30.3658, lng: -88.5561 },
    blurb: "Home repair for Pascagoula's working households and historic coastal homes.",
    intro:
      "Pascagoula is the coast's industrial anchor — Ingalls Shipbuilding and the thousands of working households around it. These are homes that get used hard and deserve honest, dependable upkeep. From salt-air wood rot near the beach to drywall, doors, and the everyday repair list, Wise Residential gives Pascagoula homeowners a contractor who shows up and does it right.",
    commonJobs: [
      "Wood rot & exterior trim repair",
      "Drywall & interior painting",
      "Door & window weatherstripping",
      "Water filtration service",
      "Small jobs & installations",
    ],
    landmarks: ["Ingalls Shipbuilding", "Round Island Lighthouse", "Beach Boulevard", "La Pointe-Krebs House"],
    marketNote:
      "Salt air off the Mississippi Sound is brutal on Pascagoula's beachside homes — fascia, soffits, and trim rot first. For a city of busy working families, a repair pro who arrives on schedule and charges one fair price is exactly what's needed.",
    nearby: ["moss-point", "gautier", "ocean-springs-area"],
  },
];

/** Helper used by the home page / footer service-area lists. */
export const serviceAreaCities = [
  "Ocean Springs",
  ...locations.map((l) => l.name),
];

export function getLocation(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug);
}

/**
 * Resolve a `nearby` slug to a link. The special slug "ocean-springs-area"
 * points back to the home page (Ocean Springs is covered there, not as a
 * /locations page).
 */
export function resolveNearby(
  slug: string
): { name: string; href: string } | null {
  if (slug === "ocean-springs-area") {
    return { name: "Ocean Springs", href: "/" };
  }
  const loc = getLocation(slug);
  return loc ? { name: loc.name, href: `/locations/${loc.slug}` } : null;
}
