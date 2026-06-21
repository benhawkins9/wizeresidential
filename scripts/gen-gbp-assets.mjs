// Generates branded Google Business Profile image assets (logo, cover, posts)
// using sharp. Run from the web project (has sharp):  node scripts/gen-gbp-assets.mjs
// Output: ../brand-assets/
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "..", "brand-assets");
mkdirSync(OUT, { recursive: true });

const FONT = "Inter, Arial, Helvetica, sans-serif";

// Brand mark (rounded-square, wave + gold sun). Drawn in a 40x40 unit space.
const markContents = `
  <rect width="40" height="40" rx="9" fill="url(#m)"/>
  <path d="M9 23c1.9 0 1.9 1.8 3.8 1.8S14.7 23 16.6 23s1.9 1.8 3.8 1.8S22.3 23 24.2 23s1.9 1.8 3.8 1.8" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M9 17c1.9 0 1.9 1.8 3.8 1.8S14.7 17 16.6 17s1.9 1.8 3.8 1.8S22.3 17 24.2 17s1.9 1.8 3.8 1.8" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.55"/>
  <circle cx="29" cy="12" r="2.3" fill="#f3b258"/>`;
const mark = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">${markContents}</g>`;
const GRAD = `<linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d4a82"/><stop offset="1" stop-color="#0fa288"/></linearGradient>`;
const glow = (w, h) => `<circle cx="${w * 0.18}" cy="${h * 0.12}" r="${h * 0.5}" fill="#0fa288" opacity="0.16"/><circle cx="${w * 0.9}" cy="${h * 0.1}" r="${h * 0.42}" fill="#1d4a82" opacity="0.28"/>`;
const wave = (w, h) => `<path d="M0 ${h - 70}c${w * 0.17} 40 ${w * 0.33} 40 ${w * 0.5} 14s${w * 0.33} -58 ${w * 0.5} -40v110H0z" fill="#0b1f39" opacity="0.55"/>`;

// 1) Square logo — full-bleed mark (best for the profile photo/avatar)
const logoMark = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><defs>${GRAD}</defs><g transform="scale(27)">${markContents}</g></svg>`;

// 2) Square logo — mark + wordmark lockup on white (alt logo)
const logoLockup = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><defs>${GRAD}</defs>
  <rect width="1080" height="1080" fill="#ffffff"/>
  ${mark(380, 250, 8)}
  <text x="540" y="730" text-anchor="middle" font-family="${FONT}" font-size="88" font-weight="800" fill="#0b1f39" letter-spacing="-2">Ocean Springs SEO</text>
  <text x="540" y="800" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="700" fill="#0fa288" letter-spacing="6">MISSISSIPPI GULF COAST</text>
</svg>`;

// 3) Cover photo (16:9)
const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><defs>${GRAD}</defs>
  <rect width="1200" height="675" fill="#061224"/>
  ${glow(1200, 675)}
  ${mark(80, 70, 3)}
  <text x="80" y="350" font-family="${FONT}" font-size="84" font-weight="800" fill="#ffffff" letter-spacing="-2">Ocean Springs SEO</text>
  <text x="82" y="420" font-family="${FONT}" font-size="40" font-weight="600" fill="#57d6bd">Local SEO for the Mississippi Gulf Coast</text>
  <text x="82" y="486" font-family="${FONT}" font-size="28" font-weight="400" fill="#adc8e6">Map pack &#183; Google Business Profile &#183; AI search</text>
  ${wave(1200, 675)}
</svg>`;

// Post template (1200x900)
function post({ kicker, title, titleSize = 92, sub, pill }) {
  const titleLines = title
    .map((t, i) => `<text x="600" y="${430 + i * (titleSize + 8)}" text-anchor="middle" font-family="${FONT}" font-size="${titleSize}" font-weight="800" fill="#ffffff" letter-spacing="-2">${t}</text>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><defs>${GRAD}</defs>
    <rect width="1200" height="900" fill="#061224"/>
    ${glow(1200, 900)}
    ${mark(70, 66, 2.1)}
    <text x="170" y="100" font-family="${FONT}" font-size="34" font-weight="800" fill="#ffffff" letter-spacing="-1">Ocean Springs SEO</text>
    <text x="600" y="300" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="700" fill="#57d6bd" letter-spacing="6">${kicker}</text>
    ${titleLines}
    <text x="600" y="${470 + titleLines.length}" text-anchor="middle" font-family="${FONT}" font-size="36" font-weight="500" fill="#adc8e6">${sub}</text>
    <rect x="${600 - pill.length * 9.5}" y="720" width="${pill.length * 19}" height="68" rx="34" fill="#ef9c2f"/>
    <text x="600" y="765" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="700" fill="#0b1f39">${pill}</text>
  </svg>`;
}

const postAudit = post({
  kicker: "FREE SEO AUDIT",
  title: ["See where you", "rank on Google"],
  sub: "Free, no-obligation — for Gulf Coast businesses",
  pill: "oceanspringsseo.com/free-seo-audit",
});
const postLocal = post({
  kicker: "GET FOUND LOCALLY",
  title: ["Own the", "local map pack"],
  sub: "Local SEO across the Mississippi Gulf Coast",
  pill: "oceanspringsseo.com",
});
const postAi = post({
  kicker: "AI SEARCH",
  title: ["Get found in", "AI answers"],
  titleSize: 84,
  sub: "Be the business ChatGPT &amp; Google AI recommend",
  pill: "oceanspringsseo.com",
});

const jobs = [
  ["gbp-logo-mark.png", logoMark],
  ["gbp-logo-lockup.png", logoLockup],
  ["gbp-cover.png", cover],
  ["gbp-post-free-audit.png", postAudit],
  ["gbp-post-local-seo.png", postLocal],
  ["gbp-post-ai-search.png", postAi],
];

for (const [name, svg] of jobs) {
  await sharp(Buffer.from(svg)).png().toFile(join(OUT, name));
  console.log("✓", name);
}
console.log("\nAll GBP assets written to:", OUT);
