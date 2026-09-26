// On-brand placeholder images for the hero cards → src/assets/hero/*.png
// ponytail: swap these files with real photos/art (keep the sizes) then rebuild.
// Run: node scripts/generate-hero-placeholders.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("src/assets/hero", { recursive: true });

const INK = "#16161a";
const INDIGO = "#6d5cf0";
const OFF = "#f2f2f7";
const POP = "#ffde59";

const render = (svg, out) =>
  sharp(Buffer.from(svg)).png().toFile(`src/assets/hero/${out}`).then(() => console.log("wrote", out));

// dot lattice helper (halftone/funky texture)
const dots = (x, y, cols, rows, gap, r, fill, opacity) => {
  let s = `<g fill="${fill}" opacity="${opacity}">`;
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      s += `<circle cx="${x + i * gap}" cy="${y + j * gap}" r="${r}"/>`;
  return s + "</g>";
};

// ---- feature: 1000x1500, deep editorial data-art with funky accents ----
const feature = `
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#251b60"/><stop offset="1" stop-color="#141322"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.16" r="0.65">
      <stop offset="0" stop-color="${INDIGO}" stop-opacity="0.6"/>
      <stop offset="1" stop-color="${INDIGO}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1000" height="1500" fill="url(#bg)"/>
  <rect width="1000" height="1500" fill="url(#glow)"/>
  ${dots(90, 1140, 9, 7, 46, 5, INDIGO, 0.55)}
  <circle cx="150" cy="240" r="70" fill="none" stroke="${POP}" stroke-width="10"/>
  <!-- dashboard window -->
  <rect x="150" y="470" width="700" height="470" rx="30" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.22" stroke-width="2"/>
  <circle cx="200" cy="522" r="8" fill="${INDIGO}"/><circle cx="228" cy="522" r="8" fill="#ffffff" fill-opacity="0.35"/><circle cx="256" cy="522" r="8" fill="#ffffff" fill-opacity="0.18"/>
  <line x1="150" y1="560" x2="850" y2="560" stroke="#ffffff" stroke-opacity="0.18"/>
  <polygon points="210,820 320,760 420,790 540,690 650,730 760,620 210,900 760,900" fill="${INDIGO}" fill-opacity="0.22"/>
  <polyline points="210,820 320,760 420,790 540,690 650,730 760,620" fill="none" stroke="#b7aeffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="540" cy="690" r="11" fill="#ffffff"/><circle cx="760" cy="620" r="11" fill="${POP}" stroke="${INK}" stroke-width="3"/>
  <rect x="600" y="960" width="250" height="90" rx="20" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.2"/>
  <circle cx="648" cy="1005" r="14" fill="${POP}" stroke="${INK}" stroke-width="3"/>
  <rect x="682" y="988" width="130" height="12" rx="6" fill="#ffffff" fill-opacity="0.55"/>
  <rect x="682" y="1016" width="90" height="12" rx="6" fill="#ffffff" fill-opacity="0.28"/>
</svg>`;

// ---- sub thumbnails: 800x450, light editorial line-art ----
const articles = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">
  <rect width="800" height="450" fill="${OFF}"/>
  ${dots(560, 60, 6, 6, 40, 5, INDIGO, 0.35)}
  <rect x="70" y="110" width="330" height="20" rx="10" fill="${INK}"/>
  <rect x="70" y="160" width="420" height="14" rx="7" fill="#c9c9d4"/>
  <rect x="70" y="196" width="380" height="14" rx="7" fill="#c9c9d4"/>
  <rect x="70" y="232" width="300" height="14" rx="7" fill="#c9c9d4"/>
  <rect x="70" y="300" width="180" height="46" rx="14" fill="${INDIGO}"/>
  <path d="M70 150 q 60 -26 120 0" fill="none" stroke="${POP}" stroke-width="8" stroke-linecap="round"/>
</svg>`;

const toolkit = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">
  <rect width="800" height="450" fill="${OFF}"/>
  ${dots(70, 320, 5, 3, 40, 5, INDIGO, 0.3)}
  <g fill="none" stroke="${INK}" stroke-width="6">
    <rect x="470" y="90" width="120" height="120" rx="20"/>
    <rect x="620" y="90" width="120" height="120" rx="20"/>
    <rect x="470" y="240" width="120" height="120" rx="20"/>
  </g>
  <rect x="620" y="240" width="120" height="120" rx="20" fill="${INDIGO}"/>
  <circle cx="530" cy="150" r="16" fill="${POP}"/>
  <path d="M150 150 l40 40 l-40 40" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="210" y="270" width="180" height="16" rx="8" fill="#c9c9d4"/>
</svg>`;

await Promise.all([
  render(feature, "feature.png"),
  render(articles, "articles.png"),
  render(toolkit, "toolkit.png"),
]);
