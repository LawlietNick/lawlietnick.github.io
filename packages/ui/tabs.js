// WAI-ARIA tabs with automatic activation and roving tabindex, two ways:
// - bindTabs(list, { getValue, panelFor, onSelect }): tab behaviour on existing markup, keeping its classes.
//   `list` becomes the role="tablist"; its <button>s become tabs. `getValue(tab)` names a tab (default
//   tab.value). `panelFor(value)` returns that tab's panel, or the same element for every tab when one
//   shared panel's content is swapped. Per-tab panels are shown and hidden; a shared panel follows the
//   selected tab's label. `onSelect(value)` runs when the user picks a different tab (click, Left/Right
//   wrapping, Home, End). Returns { select(value), value }; select() from code never calls onSelect.
// - <k-tabs>: the declarative element. Direct children: <button value="…"> tabs (wrapped in a generated
//   tablist div) and panels marked data-panel="…", or one shared data-panel="". `label` names the tab list.
//   Fires a bubbling `change` event; read or set the choice with `element.value`.
// Parts: data-part="tablist|tab". No text of its own, so no FI/EN strings.

let uid = 0;

export function bindTabs(list, { getValue = (tab) => tab.value, panelFor = () => null, onSelect = () => {} } = {}) {
  const id = `k-tabs-${++uid}`;
  const tabs = [...list.querySelectorAll("button")];
  const panelOf = new Map(tabs.map((tab) => [tab, panelFor(getValue(tab))]));
  const shared = new Set(panelOf.values()).size === 1 && tabs.length > 1 ? panelOf.get(tabs[0]) : null;
  list.setAttribute("role", "tablist");
  list.dataset.part = "tablist";

  tabs.forEach((tab, i) => {
    tab.type = "button";
    tab.dataset.part = "tab";
    tab.setAttribute("role", "tab");
    tab.id ||= `${id}-tab-${i}`;
    tab.addEventListener("click", () => pick(tab));
    const panel = panelOf.get(tab);
    if (!panel) return;
    panel.id ||= `${id}-panel-${shared ? "shared" : i}`;
    panel.setAttribute("role", "tabpanel");
    tab.setAttribute("aria-controls", panel.id);
  });

  list.addEventListener("keydown", (e) => {
    const n = tabs.indexOf(document.activeElement);
    if (n < 0) return;
    const last = tabs.length - 1;
    const to = { ArrowRight: n === last ? 0 : n + 1, ArrowLeft: n === 0 ? last : n - 1, Home: 0, End: last }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    pick(tabs[to]);
    tabs[to].focus();
  });

  let current;
  function select(value) {
    current = tabs.find((tab) => getValue(tab) === value) ?? tabs[0];
    for (const tab of tabs) {
      const on = tab === current;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      const panel = panelOf.get(tab);
      if (!panel) continue;
      if (panel === shared) {
        if (on) panel.setAttribute("aria-labelledby", tab.id);
      } else {
        panel.hidden = !on;
        panel.setAttribute("aria-labelledby", tab.id);
      }
    }
  }

  function pick(tab) {
    if (tab === current) return;
    select(getValue(tab));
    onSelect(getValue(tab));
  }

  const start = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0];
  if (start) select(getValue(start));
  return {
    select,
    get value() {
      return current ? getValue(current) : "";
    },
  };
}

export class KTabs extends HTMLElement {
  connectedCallback() {
    if (this.tabs) return;
    const buttons = [...this.querySelectorAll(":scope > button")];
    const panels = [...this.querySelectorAll(":scope > [data-panel]")];
    const shared = panels.find((panel) => panel.dataset.panel === "");
    for (const panel of panels) if (!panel.hasAttribute("tabindex")) panel.tabIndex = 0;

    const list = document.createElement("div");
    if (this.hasAttribute("label")) list.setAttribute("aria-label", this.getAttribute("label"));
    buttons[0]?.before(list);
    list.append(...buttons);
    const start = this.getAttribute("value");
    if (start !== null) buttons.forEach((b) => b.setAttribute("aria-selected", String(b.value === start)));

    this.tabs = bindTabs(list, {
      panelFor: (value) => shared ?? panels.find((panel) => panel.dataset.panel === value) ?? null,
      onSelect: () => this.dispatchEvent(new Event("change", { bubbles: true })),
    });
  }

  get value() {
    return this.tabs?.value ?? "";
  }

  set value(value) {
    this.tabs?.select(value);
  }
}

if (!customElements.get("k-tabs")) customElements.define("k-tabs", KTabs);
