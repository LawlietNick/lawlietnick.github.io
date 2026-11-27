// Renders every ```mermaid fence in published pages to SVG and stores it in
// src/data/mermaid-svg.json, which the markdown plugin inlines at build time.
// Run after adding or editing a diagram: `npm run mermaid`. CI only reads the JSON.
// Git-ignored drafts are skipped so their content stays out of the public repo;
// their diagrams render in the browser until published.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "@playwright/test";
import { mermaidConfig } from "../src/utils/mermaid-config.js";
import { mermaidKey } from "../src/utils/markdown-charts.js";

const outFile = "src/data/mermaid-svg.json";
const files = readdirSync("src/pages", { recursive: true }).filter((f) => f.endsWith(".md")).map((f) => `src/pages/${f}`);
const gitIgnored = () => {
  try { return execFileSync("git", ["check-ignore", "--stdin"], { input: files.join("\n") }).toString(); }
  catch (error) { if (error.status === 1) return ""; throw error; } // 1 = nothing ignored
};
const ignored = new Set(gitIgnored().split("\n").filter(Boolean));
const sources = files
  .filter((f) => !ignored.has(f))
  .flatMap((f) => [...readFileSync(f, "utf8").matchAll(/^```mermaid\n([\s\S]*?)\n```/gm)].map((m) => m[1]));

const browser = await chromium.launch();
const page = await browser.newPage();
const font = readFileSync("public/fonts/roboto-flex.woff2").toString("base64");
await page.setContent(`<style>@font-face{font-family:"Roboto Flex";src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:100 1000}</style>`);
await page.addScriptTag({ path: createRequire(import.meta.url).resolve("mermaid/dist/mermaid.min.js") });
await page.evaluate(async (config) => {
  await document.fonts.load('16px "Roboto Flex"');
  window.mermaid.initialize(config);
}, mermaidConfig);

const svgs = {};
for (const source of sources) {
  const key = mermaidKey(source);
  svgs[key] ??= await page.evaluate(async ([id, src]) => (await window.mermaid.render(id, src)).svg, [`mermaid-${key}`, source]);
}
await browser.close();

writeFileSync(outFile, JSON.stringify(svgs, null, 1) + "\n");
console.log(`${Object.keys(svgs).length} diagrams from ${sources.length} fences → ${outFile} (${ignored.size} ignored drafts skipped)`);
