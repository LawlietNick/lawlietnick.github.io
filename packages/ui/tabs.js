// <k-tabs>: unstyled WAI-ARIA tabs with automatic activation and roving tabindex.
// Direct children: your own <button value="…"> tabs (wrapped in a role="tablist" div),
// and panels marked data-panel="…" with the matching value. One shared panel for every tab
// (content swapped by your own `change` listener) is a single element with an empty data-panel="".
// Keys: Left/Right (wrapping), Home, End. `label` names the tab list.
// Fires a bubbling `change` event; read or set the choice with `element.value`.
// Parts: data-part="tablist|tab" plus your data-panel elements. No text of its own, so no FI/EN strings.

let uid = 0;

export class KTabs extends HTMLElement {
  connectedCallback() {
    if (this.tabs) return;
    const id = `k-tabs-${++uid}`;
    this.tabs = [...this.querySelectorAll(":scope > button")];
    this.panels = [...this.querySelectorAll(":scope > [data-panel]")];
    const shared = this.panels.find((panel) => panel.dataset.panel === "");

    const list = document.createElement("div");
    list.dataset.part = "tablist";
    list.setAttribute("role", "tablist");
    if (this.hasAttribute("label")) list.setAttribute("aria-label", this.getAttribute("label"));
    this.tabs[0]?.before(list);
    list.append(...this.tabs);

    this.tabs.forEach((tab, i) => {
      tab.type = "button";
      tab.dataset.part = "tab";
      tab.setAttribute("role", "tab");
      tab.id ||= `${id}-tab-${i}`;
      tab.addEventListener("click", () => this.select(tab));
    });
    for (const panel of this.panels) {
      panel.id ||= `${id}-panel-${panel.dataset.panel || "shared"}`;
      panel.setAttribute("role", "tabpanel");
      if (!panel.hasAttribute("tabindex")) panel.tabIndex = 0;
    }
    for (const tab of this.tabs) {
      const panel = shared ?? this.panels.find((p) => p.dataset.panel === tab.value);
      if (panel) tab.setAttribute("aria-controls", panel.id);
    }

    list.addEventListener("keydown", (e) => {
      const n = this.tabs.indexOf(document.activeElement);
      if (n < 0) return;
      const last = this.tabs.length - 1;
      const to = { ArrowRight: n === last ? 0 : n + 1, ArrowLeft: n === 0 ? last : n - 1, Home: 0, End: last }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      this.select(this.tabs[to]);
      this.tabs[to].focus();
    });

    const selected = this.tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
    this.value = this.getAttribute("value") ?? selected?.value ?? this.tabs[0]?.value ?? "";
  }

  select(tab) {
    if (tab.value === this.value) return;
    this.value = tab.value;
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  get value() {
    return this.tabs?.find((tab) => tab.getAttribute("aria-selected") === "true")?.value ?? "";
  }

  set value(value) {
    if (!this.tabs) return;
    const current = this.tabs.find((tab) => tab.value === value) ?? this.tabs[0];
    for (const tab of this.tabs) {
      tab.setAttribute("aria-selected", String(tab === current));
      tab.tabIndex = tab === current ? 0 : -1;
    }
    for (const panel of this.panels) {
      if (panel.dataset.panel === "") panel.setAttribute("aria-labelledby", current.id);
      else {
        panel.hidden = panel.dataset.panel !== current.value;
        panel.setAttribute("aria-labelledby", this.tabs.find((tab) => tab.value === panel.dataset.panel)?.id ?? "");
      }
    }
  }
}

if (!customElements.get("k-tabs")) customElements.define("k-tabs", KTabs);
