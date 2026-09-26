// Regenerates the default social-share image → public/og-default.png (1200×630).
// ponytail: run `node scripts/generate-og.mjs` after changing the brand mark or tagline.
import sharp from "sharp";
import { readFileSync } from "node:fs";

const W = 1200, H = 630;
const INK = "#16161a", ACCENT = "#8f88ff", MUTED = "#9a9aa5";

// recolor the logo mark to solid white for the dark canvas
const logoWhite = readFileSync("public/nk-logo.svg", "utf8")
  .replace(/<style>[\s\S]*?<\/style>/, "")
  .replace(/fill="#000000"/g, 'fill="#ffffff"')
  .replace(/fill:\s*#000/g, "fill:#ffffff");

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect x="0" y="0" width="10" height="${H}" fill="${ACCENT}"/>
  <text x="90" y="145" font-family="sans-serif" font-size="34" font-weight="700" fill="#ffffff">Niko Karppinen</text>
  <text x="90" y="275" font-family="Georgia, serif" font-size="76" font-weight="700" fill="#ffffff">Clearer measurement.</text>
  <text x="90" y="370" font-family="Georgia, serif" font-size="76" font-weight="700" fill="${ACCENT}">Better decisions.</text>
  <text x="90" y="455" font-family="sans-serif" font-size="30" fill="${MUTED}">Funky Analytics · SEO · Analytics · Digital measurement</text>
  <text x="90" y="560" font-family="sans-serif" font-size="28" font-weight="600" fill="#ffffff">karppinen.one</text>
</svg>`);

const logo = await sharp(Buffer.from(logoWhite)).resize({ height: 150 }).png().toBuffer();

await sharp(bg)
  .composite([{ input: logo, top: 70, left: 930 }])
  .png()
  .toFile("public/og-default.png");

console.log("Wrote public/og-default.png");
