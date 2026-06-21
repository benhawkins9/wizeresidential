// Generates page images via fal.ai into src/assets/generated/ (served optimized
// via astro:assets). Idempotent: skips existing images unless --force.
//
// Setup:   npm install @fal-ai/client   &&   set FAL_KEY=...   (or export FAL_KEY=...)
// Run all: node scripts/gen-fal-images.mjs
// One:     node scripts/gen-fal-images.mjs --only=home-hero
// Redo:    node scripts/gen-fal-images.mjs --force
import { fal } from "@fal-ai/client";
import sharp from "sharp";
import { images, STYLE } from "./image-manifest.mjs";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

if (!process.env.FAL_KEY) {
  console.error("✗ Set FAL_KEY first:  export FAL_KEY=your_key   (Windows: set FAL_KEY=your_key)");
  process.exit(1);
}

const FORCE = process.argv.includes("--force");
const only = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];
const OUT = "src/assets/generated";
await mkdir(OUT, { recursive: true });

const todo = images.filter((i) => !only || i.id === only);
if (!todo.length) {
  console.error(`No manifest entry matches --only=${only}`);
  process.exit(1);
}

let made = 0;
for (const img of todo) {
  const EXTS = ["png", "jpg", "webp"];
  const existing = EXTS.map((e) => join(OUT, `${img.id}.${e}`)).find(existsSync);
  if (!FORCE && existing) {
    console.log("·  skip (exists):", img.id);
    continue;
  }
  process.stdout.write(`→  ${img.id}  [${img.model}] … `);
  try {
    const result = await fal.subscribe(img.model, {
      input: {
        prompt: `${img.prompt} ${STYLE}`,
        image_size: img.size ?? "landscape_16_9",
        ...(img.input ?? {}),
      },
    });
    const url =
      result?.data?.images?.[0]?.url ?? result?.images?.[0]?.url ?? null;
    if (!url) throw new Error("no image URL in fal response");
    let buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    // Detect format → correct extension. SVG (Recraft vector) → rasterize to PNG.
    let ext = "png";
    const txt = buf.subarray(0, 120).toString("utf8").trimStart().toLowerCase();
    const sig = buf.subarray(0, 4).toString("hex");
    if (txt.startsWith("<svg") || txt.startsWith("<?xml")) {
      buf = await sharp(buf, { density: 220 })
        .resize({ width: 1400, withoutEnlargement: true })
        .png()
        .toBuffer();
      ext = "png";
    } else if (sig.startsWith("ffd8")) ext = "jpg";
    else if (sig === "89504e47") ext = "png";
    else if (sig === "52494646") ext = "webp";
    // remove any stale other-extension version of this id
    for (const e of EXTS) {
      const p = join(OUT, `${img.id}.${e}`);
      if (e !== ext && existsSync(p)) await rm(p);
    }
    await writeFile(join(OUT, `${img.id}.${ext}`), buf);
    made++;
    console.log("✓ saved");
  } catch (e) {
    console.log("✗ FAILED —", e?.message ?? e);
  }
}

console.log(`\nDone. ${made} image(s) written to ${OUT}/`);
console.log("Next: render with <Image src={...} alt={...}/> from astro:assets, and commit the files.");
