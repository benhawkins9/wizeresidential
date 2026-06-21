import sharp from 'sharp';
const root = 'F:/ObsidianVault/Projects/Wize Residential/wizeresidential-web';
const brand = root + '/src/assets/brand/logo.jpg';
const pub = root + '/public';
const ORANGE = { r: 232, g: 116, b: 15, alpha: 1 }; // #e8740f
async function main() {
  await sharp(brand).resize(512, 512, { fit: 'cover' }).png().toFile(pub + '/logo.png');
  await sharp(brand).resize(512, 512, { fit: 'cover' }).png().toFile(pub + '/icon-512.png');
  await sharp(brand).resize(180, 180, { fit: 'cover' }).png().toFile(pub + '/apple-touch-icon.png');
  const logo = await sharp(brand).resize(400, 400, { fit: 'contain', background: ORANGE }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: ORANGE } })
    .composite([{ input: logo, gravity: 'center' }]).png().toFile(pub + '/og-image.png');
  console.log('OK brand images generated');
}
main().catch((e) => { console.error(e); process.exit(1); });
