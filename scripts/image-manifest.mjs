// Source of truth for AI-generated page images (fal.ai). HYBRID:
//   PHOTO (FLUX) for hero + location banners — rich, reliable.
//   ILLO (Recraft) for concepts — rendered as SINGLE CLEAN ICONS (1–2 symbols),
//   because scenes/UIs/cards make Recraft hallucinate gibberish text.
// Redo one: node scripts/gen-fal-images.mjs --only=<id> --force
const PHOTO = "fal-ai/flux/dev";
const ILLO = "fal-ai/flux/dev";

// Aggressive anti-text negatives — the recurring failure mode was fake text.
export const STYLE =
  "— navy blue, teal, and warm sand colors, clean modern minimal flat style, " +
  "soft plain background, generous negative space, no text, no words, no letters, " +
  "no labels, no color palette, no swatches, no charts, no numbers, no UI, no watermark";

// Concepts are forced to simple centered icons → reliable, text-free.
const concept = (id, alt, subject, size = "landscape_4_3") => ({
  id,
  model: ILLO,
  size,
  alt,
  prompt: `Simple minimalist flat 2D vector illustration of ${subject}, bold solid shapes, off-white background, centered, lots of empty space, no realism, no 3d`,
});
const photo = (id, alt, prompt, size = "landscape_16_9") => ({
  id,
  model: PHOTO,
  size,
  alt,
  prompt,
});

export const images = [
  // ---------- Home (photo) ----------
  photo(
    "home-hero",
    "Mississippi Gulf Coast pier over calm water at sunrise",
    "A serene Mississippi Gulf Coast morning: a wooden fishing pier reaching over calm gulf water, soft sunrise light, wide open sky, empty negative space on the left for a headline"
  ),

  // ---------- Services (icons) ----------
  concept("service-local-seo", "Location pin", "a location map pin"),
  concept("service-google-business-profile", "Phone with a map pin", "a smartphone showing a single location pin and one star"),
  concept("service-ai-search-optimization", "Speech bubble with a circuit question mark", "a speech bubble containing a question mark made of circuit-board lines"),
  concept("service-web-design", "Browser window of blocks", "a browser window made of a few simple colored blocks"),
  concept("service-reputation-management", "Gold stars and a phone", "five gold stars above a single smartphone"),
  concept("service-content-seo", "Magnifying glass over a page", "a magnifying glass over a single simple document page"),

  // ---------- Industries (icons) ----------
  concept("industry-hvac", "Air conditioner and wrench", "an air-conditioner unit with a small wrench"),
  concept("industry-plumbers", "Pipe wrench and water drop", "a pipe wrench crossed with a water droplet"),
  concept("industry-roofers", "House roof with shingles", "a house roof with a few shingles"),
  concept("industry-contractors", "Hard hat and hammer", "a hard hat with a hammer"),
  concept("industry-dentists", "Clean tooth", "a single clean tooth"),
  concept("industry-medical", "Medical cross", "a medical cross inside a soft rounded square"),
  concept("industry-law-firms", "Scales of justice", "balanced scales of justice"),
  concept("industry-restaurants", "Plate with fork and knife", "a dinner plate with a fork and a knife"),
  concept("industry-real-estate", "House with a key", "a small house with a single key"),
  concept("industry-auto-repair", "Car and wrench", "a car with a wrench"),
  concept("industry-landscaping", "Tree and grass", "a leafy tree above a patch of grass"),

  // ---------- Guides (icons, 16:9) ----------
  concept("guide-what-is-local-seo", "Magnifying glass over a pin", "a magnifying glass over a single location pin", "landscape_16_9"),
  concept("guide-what-is-the-google-map-pack", "Three stacked pins", "three location pins stacked, the top one larger and gold", "landscape_16_9"),
  concept("guide-what-is-a-google-business-profile", "Storefront with a pin", "a small storefront with a single location pin above it", "landscape_16_9"),
  concept("guide-how-to-rank-in-the-google-map-pack", "Pin atop ascending bars", "a gold location pin sitting on top of three ascending bars", "landscape_16_9"),
  concept("guide-how-to-get-more-google-reviews", "Gold stars and a phone", "five gold stars rising from a single smartphone", "landscape_16_9"),
  concept("guide-how-much-does-local-seo-cost", "Coins and an upward arrow", "a stack of coins beside a single upward arrow", "landscape_16_9"),
  concept("guide-aeo-vs-geo-vs-seo", "Three speech bubbles", "three speech bubbles in a row, one holding a magnifying glass, one a spark, one chat dots", "landscape_16_9"),
  concept("guide-local-seo-vs-google-ads", "Scale with a pin and a tag", "a balanced scale holding a location pin on one side and a plain price tag on the other", "landscape_16_9"),
  concept("guide-what-are-citations-and-nap-consistency", "One storefront linked to small pins", "a single storefront in the center linked by thin lines to a few small identical location pins", "landscape_16_9"),
  concept("guide-how-long-does-local-seo-take", "Clock and upward curve", "a clock beside a single upward growth curve", "landscape_16_9"),

  // ---------- Locations (photos — generic coastal, NO landmarks) ----------
  photo("location-biloxi", "Gulf Coast beach boardwalk at golden hour", "A generic Mississippi Gulf Coast beach boardwalk at golden hour, gentle waves, a few palms, no recognizable landmarks"),
  photo("location-gulfport", "Calm coastal harbor with small boats", "A calm Gulf Coast harbor at midday with small fishing boats and still water, no recognizable landmarks"),
  photo("location-d-iberville", "Quiet back-bay water with grasses", "A quiet Gulf Coast back-bay at soft light with marsh grasses and calm water, no recognizable landmarks"),
  photo("location-gautier", "Live oaks beside a calm coastal river", "Spanish-moss live oaks beside a calm coastal river at golden hour, no recognizable landmarks"),
  photo("location-pascagoula", "Working waterfront at dusk", "A calm Gulf Coast working waterfront at blue-hour dusk, soft lights on the water, no recognizable landmarks"),
  photo("location-moss-point", "Cypress riverfront at soft light", "A peaceful Gulf Coast cypress riverfront at soft morning light, still reflective water, no recognizable landmarks"),
  photo("location-long-beach", "Wide sandy beach and a simple pier", "A wide empty Gulf Coast sandy beach with a simple wooden pier and calm water, no recognizable landmarks"),
  photo("location-pass-christian", "Upscale coastal street lined with oaks", "An upscale coastal residential street lined with grand live oaks and tidy homes, golden light, no recognizable landmarks"),
  photo("location-bay-st-louis", "Walkable coastal town waterfront at sunset", "A charming walkable coastal town waterfront at warm sunset, relaxed and artsy mood, no recognizable landmarks"),
];
