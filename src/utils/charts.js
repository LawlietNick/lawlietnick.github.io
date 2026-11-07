import { scaleLinear, scaleBand, scalePoint } from "d3-scale";
import { line, area } from "d3-shape";

// Build-time SVG charts. Spec comes from a ```chart fence in markdown (see markdown-charts.js).
// Colors and fonts use the site's CSS variables, so light/dark themes work without JS.
// Line charts are interactive without JS: each category is a focusable column that
// highlights and shows a tooltip on hover/focus (rules in global.css, `.m`).

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const n = (v) => +v.toFixed(1);
const fmt = (v) => v.toLocaleString("fi-FI");
const MUTED_FILL = "color-mix(in srgb,var(--muted) 38%,transparent)";

const text = (x, y, s, { size, weight = 400, fill = "var(--ink)", anchor = "middle" }) =>
  `<text x="${n(x)}" y="${n(y)}" text-anchor="${anchor}" style="fill:${fill};font-size:${size}px;font-weight:${weight}">${esc(s)}</text>`;

// One focusable column: highlight + transparent hit area + tooltip. The last one is open by default (`d`).
// rows: [{ text, swatch }] where swatch is an SVG fragment drawn at (x, y) for the row.
function column({ label, rows, left, width, top, height, W, tipY, open }) {
  const tw = Math.max(label.length * 10.5, ...rows.map((r) => r.text.length * 9.2 + 26)) + 20;
  const th = 26 + 25 * rows.length + 12;
  let tx = left + width + 4;
  if (tx + tw > W - 4) tx = left - 4 - tw;
  let tip = `<rect x="${n(tx)}" y="${tipY}" width="${n(tw)}" height="${th}" rx="6" style="fill:var(--color-surface);stroke:var(--line)"/>`;
  tip += text(tx + 10, tipY + 26, label, { size: 17, weight: 650, anchor: "start" });
  rows.forEach((r, i) => {
    const y = tipY + 26 + 25 * (i + 1);
    tip += r.swatch(tx + 10, y);
    tip += text(tx + 30, y, r.text, { size: 17, anchor: "start" });
  });
  const box = `x="${n(left)}" y="${top}" width="${n(width)}" height="${height}"`;
  return (
    `<g class="m${open ? " d" : ""}" tabindex="0" role="group" aria-label="${esc(`${label}: ${rows.map((r) => r.text).join(", ")}`)}">` +
    `<rect class="hl" ${box} style="fill:var(--accent);fill-opacity:.08"/>` +
    `<rect ${box} style="fill:transparent"/>` +
    `<g class="tip" style="pointer-events:none">${tip}</g></g>`
  );
}

const lineSwatch = (stroke) => (x, y) => `<rect x="${n(x)}" y="${n(y - 7)}" width="14" height="3" style="fill:${stroke}"/>`;

// `flat` is the low, wide layout used on wide screens (see .chart-w in global.css).
function bar({ data, badge }, flat) {
  const W = flat ? 1000 : 560, H = flat ? 330 : 360, base = flat ? 260 : 290, maxH = flat ? 190 : 244;
  const x = scaleBand().domain(data.map((_, i) => i)).range([40, W - 12]).paddingInner(flat ? 0.45 : 32 / 108);
  const y = scaleLinear().domain([0, Math.max(...data.map((d) => d.value))]).range([0, maxH]);
  let out = `<line x1="16" x2="${W - 16}" y1="${base}" y2="${base}" style="stroke:var(--line);stroke-width:2"/>`;
  data.forEach((d, i) => {
    const h = y(d.value), cx = x(i) + x.bandwidth() / 2, last = i === data.length - 1;
    out += `<rect x="${n(x(i))}" y="${n(base - h)}" width="${n(x.bandwidth())}" height="${n(h)}" rx="4" style="fill:${last ? "var(--accent)" : MUTED_FILL}"/>`;
    out += text(cx, base - h - 10, d.text, { size: 24, weight: 700 });
    out += text(cx, base + 28, d.label, { size: 21, weight: 500, fill: "var(--muted)" });
    if (d.note) out += text(cx, base + 54, d.note, { size: 20, fill: "var(--muted)" });
  });
  if (badge) {
    out += `<rect x="18" y="14" width="132" height="52" rx="6" style="fill:var(--pop);stroke:var(--ink);stroke-width:2"/>`;
    out += text(84, 50, badge.text, { size: 30, weight: 800 });
    out += text(164, 50, badge.label, { size: 19, fill: "var(--muted)", anchor: "start" });
  }
  return { w: W, h: H, body: out };
}

function hbar({ data, delta }) {
  const maxW = 520, pitch = 120;
  const x = scaleLinear().domain([0, Math.max(...data.map((d) => d.value))]).range([0, maxW]);
  let out = "";
  data.forEach((d, i) => {
    const top = 34 + i * pitch, last = i === data.length - 1, w = x(d.value);
    out += text(10, top, d.label, { size: 22, weight: 650, anchor: "start" });
    out += `<rect x="10" y="${top + 12}" width="${n(w)}" height="56" rx="6" style="fill:${last ? "var(--accent)" : MUTED_FILL}"/>`;
    out += text(26, top + 52, d.text, { size: 34, weight: 800, anchor: "start", fill: last ? "var(--bg)" : "var(--ink)" });
    if (last && delta) {
      const gx = 10 + w, gw = maxW - w;
      out += `<rect x="${n(gx)}" y="${top + 12}" width="${n(gw)}" height="56" rx="6" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:6 5"/>`;
      out += text(gx + gw / 2, top + 46, delta, { size: 26, weight: 800, fill: "var(--accent)" });
    }
  });
  return { w: 600, h: 10 + data.length * pitch, body: out };
}

// series[].raw (optional) holds the real values; `values` is what is plotted (e.g. an index).
function lineChart({ categories, series, baseline, titles }, flat) {
  // The first 100px above the plot is headroom for the tooltip, so it never covers the lines.
  const top = 100, plotH = flat ? 190 : 230, base = top + plotH, right = flat ? 770 : 470, labelX = right + 18;
  const W = right + 150, H = base + 50;
  const max = Math.max(...series.flatMap((s) => s.values));
  const x = scalePoint().domain(categories.map((_, i) => i)).range([50, right - 20]);
  const y = scaleLinear().domain([0, max]).range([base, base - plotH]);
  let out = `<line x1="20" x2="${right}" y1="${base}" y2="${base}" style="stroke:var(--line);stroke-width:2"/>`;
  if (baseline != null) {
    out += `<line x1="20" x2="${right}" y1="${n(y(baseline))}" y2="${n(y(baseline))}" style="stroke:var(--line);stroke-width:1.5;stroke-dasharray:6 5"/>`;
    out += text(20, y(baseline) - 8, baseline, { size: 18, fill: "var(--muted)", anchor: "start" });
  }
  // Shade the gap between the first two series over the last segment.
  if (series.length >= 2) {
    const last = categories.length - 1;
    const gap = area().x((i) => x(i)).y0((i) => y(series[0].values[i])).y1((i) => y(series[1].values[i]));
    out += `<path d="${gap([last - 1, last])}" style="fill:var(--accent);fill-opacity:.12"/>`;
  }
  const path = line().x((_, i) => x(i));
  series.forEach((s) => {
    const c = s.accent ? "var(--accent)" : "var(--ink)";
    out += `<path d="${path.y((v) => y(v))(s.values)}" style="fill:none;stroke:${c};stroke-width:5;stroke-linecap:round;stroke-linejoin:round"/>`;
  });
  series.forEach((s) => {
    const c = s.accent ? "var(--accent)" : "var(--ink)";
    s.values.forEach((v, i) => {
      out += `<circle cx="${x(i)}" cy="${n(y(v))}" r="6" style="fill:${c};stroke:var(--bg);stroke-width:2"/>`;
    });
    const ey = y(s.values.at(-1));
    out += text(labelX, ey - 14, s.name, { size: 19, fill: "var(--muted)", anchor: "start" });
    out += text(labelX, ey + 12, s.endText, { size: 28, weight: 800, fill: c, anchor: "start" });
  });
  categories.forEach((c, i) => (out += text(x(i), base + 30, c, { size: 21, weight: 500, fill: "var(--muted)" })));
  const step = x.step();
  categories.forEach((c, i) => {
    out += column({
      label: titles?.[i] ?? c,
      rows: series.map((s) => ({
        text: `${s.name} ${s.raw ? `${fmt(s.raw[i])} (${s.values[i]})` : s.values[i]}`,
        swatch: lineSwatch(s.accent ? "var(--accent)" : "var(--ink)"),
      })),
      left: Math.max(20, x(i) - step / 2), width: Math.min(right, x(i) + step / 2) - Math.max(20, x(i) - step / 2),
      top: top - 12, height: base + 40 - (top - 12), W: right + 10, tipY: 6, open: i === categories.length - 1,
    });
  });
  return { w: W, h: H, body: out };
}

const types = { bar, hbar, line: lineChart };
const svg = (id, cls, { w, h, body }, spec) =>
  `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="${id}t ${id}d" style="width:100%;height:auto;font-family:var(--font-body);font-variant-numeric:tabular-nums">` +
  `<title id="${id}t">${esc(spec.title)}</title><desc id="${id}d">${esc(spec.desc)}</desc>${body}</svg>`;
let counter = 0;

export function renderChart(spec) {
  const draw = types[spec.type];
  if (!draw) throw new Error(`Unknown chart type "${spec.type}". Use ${Object.keys(types).join(", ")}.`);
  const id = `chart${++counter}`;
  const flat = spec.wide && spec.type !== "hbar";
  const figure = spec.wide ? ' class="bleed" style="width:min(100rem,calc(50vw + 50% - var(--container-gutter) / 2))"' : ' style="width:100%"';
  return (
    `<figure${figure}>\n` +
    svg(id, flat ? "chart-n" : "", draw(spec), spec) +
    (flat ? svg(`${id}w`, "chart-w", draw(spec, true), spec) : "") +
    `\n<figcaption>${esc(spec.caption)}</figcaption>\n</figure>`
  );
}
