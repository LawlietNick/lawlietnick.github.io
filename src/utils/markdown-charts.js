import { defineMdastPlugin } from "satteri";
import { renderChart } from "./charts.js";

// Turns ```chart fences (JSON spec) into inline SVG figures at build time.
export default defineMdastPlugin({
  name: "charts",
  code(node, ctx) {
    if (node.lang !== "chart") return;
    ctx.replaceNode(node, { type: "html", value: renderChart(JSON.parse(node.value)) });
  },
});
