// Shared by the build-time renderer (scripts/render-mermaid.mjs) and the
// browser fallback in content-enhancements.ts, so both draw the same diagram.
export const mermaidConfig = {
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  look: "classic",
  layout: "dagre",
  themeVariables: {
    background: "#1C1921",
    fontFamily: '"Roboto Flex", system-ui, sans-serif',
    fontSize: "16px",
    lineColor: "#D8D1E0",
    primaryColor: "#27232D",
    primaryTextColor: "#F7F4FA",
    primaryBorderColor: "#AE8EFF",
    clusterBkg: "#1C1921",
    clusterBorder: "#AE8EFF",
  },
  flowchart: {
    curve: "basis",
    nodeSpacing: 28,
    rankSpacing: 34,
  },
};

