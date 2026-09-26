// Loaded only when Base finds content that needs enhancement.
const enhancedRoots = new WeakSet<HTMLElement>();

export function enhanceContent(root: HTMLElement) {
  if (enhancedRoots.has(root)) return;
  enhancedRoots.add(root);

  // copy-to-clipboard button on every code block.
  // The Base loader calls this for each new page that contains these controls.
  const addCopyButtons = () => {
    const label = document.documentElement.lang === "fi" ? "Kopioi" : "Copy";
    root.querySelectorAll("pre").forEach((pre) => {
      if (pre.dataset.language === "mermaid") return;
      // [data-copy] and code accordions opt back in — template pages mark the
      // whole article [data-no-copy] so illustrative snippets stay clean
      if (pre.closest("[data-no-copy]") && !pre.closest("[data-code-accordion], [data-copy]")) return;
      const copyHost = pre.closest("[data-code-accordion]") ?? pre;
      if (copyHost.querySelector(":scope > .copy")) return;  // already added
      const b = document.createElement("button");
      b.className = "copy";
      b.setAttribute("aria-live", "polite");  /* announce the ✓ feedback */
      b.textContent = label;
      b.onclick = () => {
        const code = pre.querySelector<HTMLElement>(":scope > code");
        navigator.clipboard.writeText(code?.innerText ?? pre.innerText);
        b.textContent = "✓";
        setTimeout(() => (b.textContent = label), 1500);
      };
      copyHost.append(b);
    });

    root.querySelectorAll<HTMLElement>("[data-code-accordion]").forEach((accordion) => {
      if (accordion.dataset.ready) return;
      accordion.dataset.ready = "true";
      const toggle = accordion.querySelector<HTMLElement>("[data-code-accordion-toggle]");
      toggle?.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        accordion.dataset.expanded = String(!expanded);
        toggle.textContent = (expanded ? toggle.dataset.collapsedLabel : toggle.dataset.expandedLabel) ?? "";
      });
    });

    // markdown task lists render disabled boxes; enable them so a reader can
    // tick items off while working through a guide, and remember the ticks.
    root.querySelectorAll<HTMLElement>(".contains-task-list").forEach((list) => {
      if (list.dataset.ready) return;
      list.dataset.ready = "true";
      const boxes = [...list.querySelectorAll<HTMLInputElement>(":scope > .task-list-item > input[type='checkbox']")];
      if (!boxes.length) return;
      const key = `checklist:${location.pathname}`;

      let saved = null;
      try { saved = JSON.parse(localStorage.getItem(key) ?? "null"); } catch { /* storage blocked */ }
      if (Array.isArray(saved) && saved.length === boxes.length) {
        boxes.forEach((box, i) => (box.checked = saved[i] === true));
      }

      const save = () => {
        try { localStorage.setItem(key, JSON.stringify(boxes.map((b) => b.checked))); } catch { /* storage blocked */ }
      };

      boxes.forEach((box) => {
        box.disabled = false;
        box.addEventListener("change", save);
        // the whole row is the click target, unless text is being selected
        box.parentElement?.addEventListener("click", (event) => {
          if (event.target === box || getSelection()?.toString()) return;
          box.click();
        });
      });
    });
  };
  addCopyButtons();

  const renderMermaidDiagrams = async () => {
    const nodes = [...root.querySelectorAll<HTMLPreElement>('pre[data-language="mermaid"]:not([data-processed])')];
    if (!nodes.length) return;

    const { default: mermaid } = await import("mermaid");
    mermaid.initialize({
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
    });
    for (const [index, node] of nodes.entries()) {
      if (!node.isConnected) return; // Navigation may finish while Mermaid loads.
      try {
        const source = node.textContent ?? "";
        const id = `mermaid-diagram-${Date.now()}-${index}`;
        const { svg, bindFunctions } = await mermaid.render(id, source);
        if (!node.isConnected) return;
        node.innerHTML = svg;
        node.dataset.processed = "true";
        bindFunctions?.(node);
      } catch (error) {
        console.error(`Mermaid render error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  };
  void renderMermaidDiagrams();

  root.querySelectorAll<HTMLElement>(".prose").forEach((prose) => prose.addEventListener("pointerdown", (event: PointerEvent) => {
    if (
      !event.isPrimary ||
      event.button !== 0 ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !(event.target instanceof Element)
    ) return;

    const control = event.target.closest(
      '.prose button:disabled, .prose .form-choice:has(input:is([type="radio"], [type="checkbox"]):disabled)'
    );
    if (!control) return;

    control.animate(
      [0, -3, 3, -2, 2, 0].map((x) => ({ transform: `translateX(${x}px)` })),
      { duration: 280, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  }));
}
