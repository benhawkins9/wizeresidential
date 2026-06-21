// Generates og-image.png (1200x630) and apple-touch-icon.png (180x180)
// from inline SVG using sharp. Re-run after brand/logo changes:  node scripts/gen-images.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, "..", "public");

const mark = (s) => `
  <defs>
    <linearGradient id="m" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1d4a82"/><stop offset="1" stop-color="#0fa288"/>
    </linearGradient>
  </defs>
  <g transform="translate(${s.x},${s.y}) scale(${s.k})">
    <rect width="40" height="40" rx="9" fill="url(#m)"/>
    <path d="M9 23c1.9 0 1.9 1.8 3.8 1.8S14.7 23 16.6 23s1.9 1.8 3.8 1.8S22.3 23 24.2 23s1.9 1.8 3.8 1.8" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <path d="M9 17c1.9 0 1.9 1.8 3.8 1.8S14.7 17 16.6 17s1.9 1.8 3.8 1.8S22.3 17 24.2 17s1.9 1.8 3.8 1.8" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
    <circle cx="29" cy="12" r="2.3" fill="#f3b258"/>
  </g>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#061224"/>
  <circle cx="240" cy="120" r="340" fill="#0fa288" opacity="0.16"/>
  <circle cx="1050" cy="120" r="280" fill="#1d4a82" opacity="0.28"/>
  ${mark({ x: 90, y: 86, k: 1.7 })}
  <text x="90" y="300" font-family="Inter, Arial, sans-serif" font-size="80" font-weight="800" fill="#ffffff" letter-spacing="-2">Ocean Springs SEO</text>
  <text x="92" y="372" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="600" fill="#57d6bd">Local SEO for the Mississippi Gulf Coast</text>
  <text x="92" y="446" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="400" fill="#adc8e6">Map pack rankings &#183; Google Business Profile &#183; AI search</text>
  <g font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#0b1f39">
    <rect x="92" y="500" width="270" height="58" rx="29" fill="#ef9c2f"/>
    <text x="227" y="538" text-anchor="middle">Get a Free SEO Audit</text>
  </g>
  <path d="M0 560c200 40 400 40 600 14s400-58 600-40v96H0z" fill="#0b1f39" opacity="0.6"/>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#061224"/>
  ${mark({ x: 34, y: 34, k: 2.8 })}
</svg>`;

await sharp(Buffer.from(og)).png().toFile(join(pub, "og-image.png"));
await sharp(Buffer.from(icon)).png().toFile(join(pub, "apple-touch-icon.png"));
await sharp(Buffer.from(icon)).resize(512, 512).png().toFile(join(pub, "icon-512.png"));
console.log("✓ Generated og-image.png, apple-touch-icon.png, icon-512.png");
