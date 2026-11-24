// <k-disclosure>: unstyled show/hide button for a panel, optionally behaving as a popup menu.
// Direct children: one <button> trigger and one panel marked data-panel.
// Plain mode (table of contents, code accordion): the button only toggles the panel.
// `popup` mode (language menu, header mega menu) adds: Escape closes and returns focus to the trigger,
// a click outside or focus leaving closes it, ArrowDown/ArrowUp on the trigger open it on the first/last
// link or button, and Up/Down/Home/End move between them inside the panel.
// `open` sets the start state and reflects the current one. Disclosures sharing a `group` name close
// each other, so only one is open at a time.
// Fires a bubbling `k-toggle` event with detail { open } (not `toggle`, which the browser uses itself). Parts: data-part="trigger" and your data-panel.
// No text of its own, so no FI/EN strings.

let uid = 0;
const FOCUSABLE = "a[href], button:not([disabled])";

export class KDisclosure extends HTMLElement {
  connectedCallback() {
    if (this.trigger) {
      if (this.onOutside) document.addEventListener("click", this.onOutside); // moved in the DOM
      return;
    }
    const trigger = (this.trigger = this.querySelector(":scope > button"));
    const panel = (this.panel = this.querySelector(":scope > [data-panel]"));
    if (!trigger || !panel) return;
    panel.id ||= `k-disclosure-${++uid}`;
    trigger.type = "button";
    trigger.dataset.part = "trigger";
    trigger.setAttribute("aria-controls", panel.id);
    trigger.addEventListener("click", () => this.toggle());
    this.render();
    if (!this.hasAttribute("popup")) return;

    const items = () => [...panel.querySelectorAll(FOCUSABLE)];
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.open) this.toggle(false);
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      this.toggle(true);
      const list = items();
      list[e.key === "ArrowDown" ? 0 : list.length - 1]?.focus();
    });
    panel.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        this.toggle(false);
        trigger.focus();
        return;
      }
      const list = items();
      const i = list.indexOf(document.activeElement);
      if (i < 0) return;
      const n = list.length;
      const next = { ArrowDown: list[(i + 1) % n], ArrowUp: list[(i - 1 + n) % n], Home: list[0], End: list[n - 1] }[e.key];
      if (!next) return;
      e.preventDefault();
      next.focus();
    });
    this.addEventListener("focusout", (e) => {
      if (!e.relatedTarget || !this.contains(e.relatedTarget)) this.toggle(false);
    });
    this.onOutside = (e) => {
      if (!this.contains(e.target)) this.toggle(false);
    };
    document.addEventListener("click", this.onOutside);
  }

  disconnectedCallback() {
    if (this.onOutside) document.removeEventListener("click", this.onOutside);
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggle(Boolean(value));
  }

  toggle(force = !this.open) {
    if (!this.trigger || force === this.open) return;
    this.toggleAttribute("open", force);
    if (force && this.hasAttribute("group")) {
      const name = this.getAttribute("group");
      document.querySelectorAll("k-disclosure[group][open]").forEach((other) => {
        if (other !== this && other.getAttribute("group") === name) other.toggle(false);
      });
    }
    this.render();
    this.dispatchEvent(new CustomEvent("k-toggle", { bubbles: true, detail: { open: force } }));
  }

  render() {
    this.trigger.setAttribute("aria-expanded", String(this.open));
    this.panel.hidden = !this.open;
  }
}

if (!customElements.get("k-disclosure")) customElements.define("k-disclosure", KDisclosure);
