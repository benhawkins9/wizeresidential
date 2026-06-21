import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Services = editorial content collection (markdown body + rich frontmatter).
 * Guides   = blog/educational content (AEO-formatted, authored, dated).
 * Locations are programmatic — see src/data/locations.ts + /locations/[slug].
 */
const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    icon: z.enum([
      "wrench",
      "droplet",
      "shield",
      "paint",
      "hammer",
      "door",
      "home",
      "spark",
      "doc",
      "fan",
      "leaf",
      "star",
      "pin",
      "spray",
      "gutter",
    ]),
    tagline: z.string(),
    /** Punchy, problem-first hook shown at the top of the page ("hit them with the pain"). */
    problemHook: z.string().optional(),
    summary: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    priceFrom: z.string().optional(),
    outcomes: z.array(z.string()).default([]),
    deliverables: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      "Home Repair",
      "Mold & Air Quality",
      "Water Filtration",
      "Carpentry & Wood Rot",
      "Maintenance",
      "Seasonal & Storm",
      "Hiring & Cost",
    ]),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    /** AEO: a 40–60 word self-contained answer, rendered up top + in FAQ schema. */
    answer: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Slugs of related guides + absolute paths of related service/location pages. */
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { services, guides };
