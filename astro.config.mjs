// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Canonical production URL. Update if the apex/host changes.
const SITE = "https://www.wizeresidential.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: "static",
  // Clean, no-trailing-slash URLs everywhere (canonical + sitemap + output).
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/thank-you") && !page.includes("/404"),
    }),
  ],
  vite: {
    // Cast avoids a harmless types-version skew between @tailwindcss/vite and
    // Astro's bundled Vite. Runtime is unaffected.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  image: {
    // Allow remote optimization later (e.g. GBP photos) if needed.
    domains: [],
  },
});
