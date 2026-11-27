import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineMdastPlugin } from "satteri";
import { renderChart } from "./charts.js";
import { mermaidConfig } from "./mermaid-config.js";

// Cache key: a config change re-renders every diagram.
export const mermaidKey = (source) =>
  createHash("sha256").update(JSON.stringify(mermaidConfig)).update(source).digest("hex").slice(0, 16);

// Pre-rendered by `npm run mermaid` (scripts/render-mermaid.mjs).
const mermaidSvgs = JSON.parse(readFileSync(new URL("../data/mermaid-svg.json", import.meta.url), "utf8"));

// Turns ```chart fences (JSON spec) into inline SVG figures at build time,
// and ```mermaid fences into their pre-rendered SVG.
export default defineMdastPlugin({
  name: "charts",
  code(node, ctx) {
    if (node.lang === "chart") {
      ctx.replaceNode(node, { type: "html", value: renderChart(JSON.parse(node.value)) });
    } else if (node.lang === "mermaid") {
      const svg = mermaidSvgs[mermaidKey(node.value)];
      // ponytail: an uncached diagram (a draft, or a new edit) falls back to rendering in the browser
      if (!svg) return console.warn(`Mermaid diagram not pre-rendered, run \`npm run mermaid\`: ${node.value.split("\n")[0]}…`);
      ctx.replaceNode(node, { type: "html", value: `<pre data-language="mermaid" data-processed="true">${svg}</pre>` });
    }
  },
});
