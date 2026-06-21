/**
 * JSON-LD builders. Centralizing here keeps structured data consistent and
 * correct across every page — the backbone of local + AI search visibility.
 */
import { site } from "../data/site";
import { locations, serviceAreaCities } from "../data/locations";

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const PERSON_ID = `${site.url}/#founder`;

/** Topical association set — what the org + founder "know about" (entity SEO). */
const KNOWS_ABOUT = [
  "Home repair",
  "Handyman services",
  "Residential remodeling",
  "Mold remediation",
  "Structural cleaning",
  "EPA-registered disinfectants",
  "Water damage repair",
  "Water filtration systems",
  "Reverse osmosis (RO) systems",
  "Whole-home water filtration",
  "Drywall repair",
  "Sheetrock & texture matching",
  "Interior painting",
  "Carpentry",
  "Wood rot repair",
  "Fascia and soffit repair",
  "Deck and fence repair",
  "Door and window repair",
  "Weatherstripping",
  "Caulking and sealing",
  "Ceiling fan and fixture installation",
  "TV mounting",
  "Furniture assembly",
  "Smart home installation",
  "Gutter maintenance",
  "Property maintenance",
  "Coastal home maintenance",
];

function sameAs(): string[] {
  return (Object.values(site.social) as string[]).filter((u) => u.length > 0);
}

/** Service area = cities + counties + a GeoCircle around the home base. */
function areaServed() {
  const cities = serviceAreaCities.map((city) => ({
    "@type": "City",
    name: `${city}, ${site.baseRegion}`,
  }));
  const counties = ["Jackson County", "Harrison County"].map((c) => ({
    "@type": "AdministrativeArea",
    name: `${c}, ${site.baseRegionName}`,
  }));
  const circle = {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    geoRadius: 40000, // ~25 mi — realistic service radius from Ocean Springs
  };
  return [...cities, ...counties, circle];
}

/** Core services offered (kept in sync with /services). */
const OFFERINGS: { name: string; desc: string }[] = [
  {
    name: "Small Job Handyman Service",
    desc: "TV mounting, fixtures, ceiling fans, furniture assembly, and to-do lists",
  },
  {
    name: "Mold Remediation",
    desc: "Science-based mold removal and structural cleaning with EPA-registered products",
  },
  {
    name: "Water Filtration Service",
    desc: "Whole-home and under-sink RO filtration maintenance, repair, and installation",
  },
  {
    name: "Drywall Repair & Interior Painting",
    desc: "Sheetrock patching, texture matching, and interior painting",
  },
  {
    name: "Carpentry & Wood Rot Repair",
    desc: "Fascia, soffit, deck, and trim repair built for the coastal climate",
  },
  {
    name: "Door & Window Repair",
    desc: "Sticking doors, screens, weatherstripping, and sliding-door service",
  },
];

function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Home Repair & Handyman Services",
    itemListElement: OFFERINGS.map((o) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: o.name,
        description: o.desc,
        provider: { "@id": ORG_ID },
        areaServed: areaServed(),
      },
    })),
  };
}

/** Standalone Person entity for the owner (E-E-A-T + AI attribution). */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.founder.name,
    jobTitle: site.founder.role,
    description: site.founder.bio,
    worksFor: { "@id": ORG_ID },
    knowsAbout: KNOWS_ABOUT,
    sameAs: site.social.linkedin ? [site.social.linkedin] : [],
  };
}

/** HomeAndConstructionBusiness is the LocalBusiness subtype for home repair. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.shortDescription,
    slogan: site.tagline,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    image: `${site.url}/og-image.png`,
    logo: `${site.url}/logo.png`,
    areaServed: areaServed(),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.baseCity,
      addressRegion: site.baseRegion,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    founder: { "@id": PERSON_ID },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: site.license,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: sameAs(),
    knowsAbout: KNOWS_ABOUT,
    hasOfferCatalog: offerCatalog(),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.name,
    provider: { "@id": ORG_ID },
    areaServed: areaServed(),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${site.url}${c.url}`,
    })),
  };
}

/** Article / blog post schema (guides) — authored by the owner Person. */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: opts.image
      ? new URL(opts.image, site.url).href
      : `${site.url}/og-image.png`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    ...(opts.section ? { articleSection: opts.section } : {}),
  };
}

/** Type a page (AboutPage / ContactPage / CollectionPage) for entity clarity. */
export function webPageSchema(
  type: "AboutPage" | "ContactPage" | "CollectionPage" | "WebPage",
  opts: { name: string; url: string; description?: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: opts.name,
    url: new URL(opts.url, site.url).href,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

/** HowTo schema for process/step content. */
export function howToSchema(opts: {
  name: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Per-city Service reference for location pages (areaServed = that city). */
export function locationServiceSchema(slug: string) {
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Handyman & Home Repair in ${loc.name}, ${site.baseRegion}`,
    description: loc.blurb,
    url: `${site.url}/locations/${loc.slug}`,
    serviceType: "Home repair and handyman service",
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: `${loc.name}, ${site.baseRegion}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.geo.lat,
        longitude: loc.geo.lng,
      },
    },
  };
}
