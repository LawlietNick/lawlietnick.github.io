// <k-listbox>: unstyled select-style combobox (WAI-ARIA combobox + listbox, aria-activedescendant).
// Options come from child <option value> elements. Add `searchable` to let the user type and filter.
// Parts carry data-part="label|input|listbox|option|empty" for styling; nothing is styled here.
// Fires a bubbling `change` event; read the choice from `element.value`.

const STRINGS = {
  en: { choose: "Choose…", search: "Search…", empty: "No results" },
  fi: { choose: "Valitse…", search: "Hae…", empty: "Ei tuloksia" },
};

let uid = 0;

export class KListbox extends HTMLElement {
  connectedCallback() {
    if (this.input) return; // ponytail: render once; options are read at first connect only
    const id = `k-listbox-${++uid}`;
    const t = STRINGS[(this.closest("[lang]")?.lang || "en").toLowerCase().startsWith("fi") ? "fi" : "en"];
    const searchable = this.hasAttribute("searchable");
    const options = [...this.querySelectorAll("option")].map((o) => [o.value, o.textContent.trim()]);
    this.replaceChildren();

    if (this.hasAttribute("label")) {
      const label = el("label", { "data-part": "label", id: `${id}-label`, for: `${id}-input` });
      label.textContent = this.getAttribute("label");
      this.append(label);
    }

    const input = (this.input = el("input", {
      "data-part": "input",
      id: `${id}-input`,
      type: "text",
      role: "combobox",
      autocomplete: "off",
      "aria-expanded": "false",
      "aria-controls": `${id}-listbox`,
      placeholder: this.getAttribute("placeholder") || (searchable ? t.search : t.choose),
    }));
    if (searchable) input.setAttribute("aria-autocomplete", "list");
    else input.readOnly = true;

    const menu = el("div", { "data-part": "listbox", role: "listbox", id: `${id}-listbox`, hidden: "" });
    if (this.hasAttribute("label")) menu.setAttribute("aria-labelledby", `${id}-label`);
    const empty = el("p", { "data-part": "empty", role: "status", hidden: "" });
    empty.textContent = t.empty;

    this.items = options.map(([value, text], i) => {
      const item = el("div", { "data-part": "option", role: "option", id: `${id}-option-${i}`, "aria-selected": "false" });
      item.dataset.value = value;
      item.textContent = text;
      item.addEventListener("mousedown", (e) => e.preventDefault()); // keep focus in the input
      item.addEventListener("click", () => this.choose(item));
      menu.append(item);
      return item;
    });
    this.append(input, menu, empty);
    this.menu = menu;
    this.empty = empty;
    this.active = -1;

    const visible = () => this.items.filter((item) => !item.hidden);
    const move = (step) => {
      const list = visible();
      if (!list.length) return;
      this.active = (this.active + step + list.length) % list.length;
      this.highlight();
    };

    input.addEventListener("click", () => (menu.hidden ? this.open() : this.close()));
    input.addEventListener("blur", () => this.close());
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      this.items.forEach((item) => (item.hidden = !item.textContent.toLowerCase().includes(query)));
      this.active = visible().length ? 0 : -1;
      this.setOpen(true);
      this.highlight();
    });
    input.addEventListener("keydown", (e) => {
      const open = !menu.hidden;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (open) move(e.key === "ArrowDown" ? 1 : -1);
        else this.open();
      } else if (e.key === "Home" && open && !searchable) {
        e.preventDefault();
        this.active = 0;
        this.highlight();
      } else if (e.key === "End" && open && !searchable) {
        e.preventDefault();
        this.active = visible().length - 1;
        this.highlight();
      } else if (e.key === "Enter" || (e.key === " " && !searchable)) {
        e.preventDefault();
        if (open && this.active >= 0) this.choose(visible()[this.active]);
        else if (!open) this.open();
      } else if (e.key === "Escape" && (open || !this.empty.hidden)) {
        e.preventDefault();
        this.close();
      } else if (e.key === "Tab") {
        this.close();
      }
    });

    this.value = this.getAttribute("value") ?? "";
  }

  get value() {
    return this.items?.find((item) => item.getAttribute("aria-selected") === "true")?.dataset.value ?? "";
  }

  set value(value) {
    const match = this.items?.find((item) => item.dataset.value === value);
    this.items?.forEach((item) => item.setAttribute("aria-selected", String(item === match)));
    if (this.input) this.input.value = match ? match.textContent : "";
  }

  open() {
    this.items.forEach((item) => (item.hidden = false));
    this.active = Math.max(0, this.items.findIndex((item) => item.getAttribute("aria-selected") === "true"));
    this.setOpen(true);
    this.highlight();
  }

  close() {
    this.setOpen(false);
    this.value = this.value; // drop half-typed search text, show the chosen label again
  }

  choose(item) {
    const changed = item.dataset.value !== this.value;
    this.value = item.dataset.value;
    this.setOpen(false);
    this.input.focus();
    if (changed) this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  setOpen(open) {
    const any = this.items.some((item) => !item.hidden);
    this.menu.hidden = !open || !any;
    this.empty.hidden = !open || any;
    this.input.setAttribute("aria-expanded", String(!this.menu.hidden));
    if (this.menu.hidden) this.input.removeAttribute("aria-activedescendant");
  }

  highlight() {
    const current = this.items.filter((item) => !item.hidden)[this.active];
    this.items.forEach((item) => item.toggleAttribute("data-active", item === current));
    if (current && !this.menu.hidden) {
      this.input.setAttribute("aria-activedescendant", current.id);
      current.scrollIntoView?.({ block: "nearest" });
    } else {
      this.input.removeAttribute("aria-activedescendant");
    }
  }
}

function el(tag, attrs) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  return node;
}

if (!customElements.get("k-listbox")) customElements.define("k-listbox", KListbox);
