// Regenerates EN/FI social-share defaults → public/og-default*.png (1200×630).
// Run `node scripts/generate-og.mjs` after changing the brand or site typography.
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { siteName } from "../src/data/site.js";

const W = 1200, H = 630;
const tokens = readFileSync("src/styles/tokens.css", "utf8");
const font = (file) => readFileSync(`public/fonts/${file}`).toString("base64");
const name = siteName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const logo = readFileSync("public/nk-logo.svg").toString("base64");

// Render with the site's actual variable fonts instead of system-font SVG text.
const browser = await chromium.launch();
try {
  for (const [lang, headline, emphasis, ending] of [
    ["en", "Cleaner measurement", "Better", "decisions"],
    ["fi", "Selkeämpää mittaamista", "Parempia", "päätöksiä"],
  ]) {
  const output = `public/og-default${lang === "fi" ? "-fi" : ""}.png`;
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, colorScheme: "light" });
  await page.setContent(`<!doctype html><html lang="${lang}"><head><style>
    ${tokens}
    @font-face { font-family: "Roboto Flex"; src: url(data:font/woff2;base64,${font("roboto-flex.woff2")}) format("woff2"); font-weight: 100 1000; }
    @font-face { font-family: "Fraunces"; src: url(data:font/woff2;base64,${font("fraunces.woff2")}) format("woff2"); font-weight: 100 900; }
    * { box-sizing: border-box; }
    body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; background: var(--bg); color: var(--ink); }
    main { position: relative; width: 100%; height: 100%; padding: 72px; }
    main::after { content: ""; position: absolute; inset: 16px; border: 1.5px solid var(--line); border-radius: 28px; pointer-events: none; }
    .dots { position: absolute; inset: 17.5px; border-radius: 26.5px; overflow: hidden; pointer-events: none; }
    .dots::before {
      content: ""; position: absolute; top: -30px; right: -26px; width: 390px; height: 275px;
      background: radial-gradient(circle, color-mix(in srgb, var(--ink) 28%, transparent) 0 2.5px, transparent 3px) 0 0 / 18px 18px;
      mask-image: radial-gradient(ellipse at top right, #000 0%, transparent 72%);
      transform: rotate(-4deg);
    }
    .name { position: absolute; left: 72px; top: 94px; margin: 0; font: 560 30px var(--font-body); }
    h1 { position: relative; margin: 156px 0 0; font: 700 86px / 1.12 var(--font-display); letter-spacing: -0.015em; font-variation-settings: "opsz" 144, "WONK" 1; }
    .line { display: block; white-space: nowrap; }
    .brand-mark { position: relative; display: inline-block; margin-right: 0.12em; color: var(--accent); font-style: italic; z-index: 1; }
    .brand-mark::after { content: ""; position: absolute; left: -0.08em; right: -0.08em; bottom: 0.12em; height: 0.34em; background: color-mix(in srgb, var(--accent) 18%, transparent); z-index: -1; border-radius: var(--radius-xs); transform: rotate(-1.5deg); }
    footer { position: absolute; left: 72px; bottom: 58px; font: 560 28px var(--font-body); color: var(--muted); }
    .logo { position: absolute; right: 72px; top: 64px; width: 140px; height: 98px; }
  </style></head><body><main>
    <div class="dots" aria-hidden="true"></div>
    <p class="name">${name}</p>
    <h1><span class="line">${headline}</span><span class="line"><span class="brand-mark">${emphasis}</span> ${ending}</span></h1>
    <footer>Karppinen.one</footer>
    <img class="logo" src="data:image/svg+xml;base64,${logo}" alt="NK" width="140" height="98">
  </main></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  const fits = await page.locator("h1 .line").evaluateAll((lines) => lines.every((line) => line.scrollWidth <= line.clientWidth));
  if (!fits) throw new Error("OG headline overflows its safe area.");
  const screenshot = await page.screenshot({ type: "png" });
  await sharp(screenshot).png({ compressionLevel: 9 }).toFile(output);
  console.log(`Wrote ${output} (${W}×${H})`);
  await page.close();
  }
} finally {
  await browser.close();
}
