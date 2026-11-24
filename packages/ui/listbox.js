// Select-style combobox (WAI-ARIA combobox + listbox, aria-activedescendant), two ways:
// - bindListbox(input, menu, { options, toggle, mode, onSelect, renderOption, activeClass, homeEnd, emptyText }):
//   behaviour on existing markup. `options` is a list of [value, label]. The chosen value lives in
//   input.dataset.value. `menu` needs an id; option ids derive from it.
//   Modes: "select" (read-only, shows the chosen label), "editable" (any text is the value; the list
//   filters as the user types and a chosen option puts its value in the input), "search" (typing only
//   filters; the value changes on choosing, and closing restores the chosen label).
//   `onSelect()` runs on every choice, and on every keystroke in editable mode. `renderOption(value, label)`
//   returns the option element (default: a div with the label). `activeClass` is added to the highlighted
//   option besides data-active. `homeEnd` adds Home/End in open select lists. `emptyText` shows a status
//   line after the menu when a search finds nothing.
// - <k-listbox>: the declarative, unstyled element. Options from child <option value>; `searchable`,
//   `label`, `placeholder`, `value`. Built-in FI/EN strings follow the nearest `lang`. Fires a bubbling
//   `change` event when the choice changes; read or set it with `element.value`.
// Parts: data-part="label|input|listbox|option|empty".

const STRINGS = {
  en: { choose: "Choose…", search: "Search…", empty: "No results" },
  fi: { choose: "Valitse…", search: "Hae…", empty: "Ei tuloksia" },
};

let uid = 0;

export function bindListbox(input, menu, { options = [], toggle, mode = "select", onSelect = () => {}, renderOption, activeClass, homeEnd = false, emptyText } = {}) {
  const editable = mode === "editable";
  const search = mode === "search";
  const labelOf = (value) => options.find(([v]) => v === value)?.[1] ?? "";
  input.readOnly = !editable && !search;
  input.dataset.part = "input";
  menu.dataset.part = "listbox";

  const items = options.map(([value, label], index) => {
    const item = renderOption ? renderOption(value, label) : document.createElement("div");
    if (!renderOption) item.textContent = label;
    item.id = `${menu.id}-option-${index}`;
    item.dataset.part = "option";
    item.dataset.value = value;
    item.dataset.filterText = `${value} ${label}`.toLowerCase();
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", String(input.dataset.value === value));
    if (item instanceof HTMLButtonElement) item.tabIndex = -1;
    item.addEventListener("mousedown", (event) => event.preventDefault()); // keep focus in the input
    item.addEventListener("click", () => choose(item));
    menu.appendChild(item);
    return item;
  });

  let empty;
  if (emptyText) {
    empty = document.createElement("p");
    empty.dataset.part = "empty";
    empty.setAttribute("role", "status");
    empty.hidden = true;
    empty.textContent = emptyText;
    menu.after(empty);
  }

  let active = -1;
  const visible = () => items.filter((item) => !item.hidden);

  function setOpen(open) {
    const any = visible().length > 0;
    menu.hidden = !open || (search && !any);
    if (empty) empty.hidden = !open || any;
    input.setAttribute("aria-expanded", String(!menu.hidden));
    toggle?.setAttribute("aria-expanded", String(!menu.hidden));
    if (menu.hidden) input.removeAttribute("aria-activedescendant");
  }

  function close() {
    setOpen(false);
    if (search) input.value = labelOf(input.dataset.value); // drop half-typed search text
  }

  function openAll() {
    items.forEach((item) => (item.hidden = false));
    const selected = visible().findIndex((item) => item.dataset.value === input.dataset.value);
    active = editable ? selected : Math.max(0, selected);
    setOpen(true);
    highlight();
  }

  function highlight() {
    const current = visible()[active];
    for (const item of items) {
      item.toggleAttribute("data-active", item === current);
      if (activeClass) item.classList.toggle(activeClass, item === current);
    }
    if (current && !menu.hidden) {
      input.setAttribute("aria-activedescendant", current.id);
      current.scrollIntoView?.({ block: "nearest" });
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  }

  function choose(item) {
    input.value = editable ? item.dataset.value : labelOf(item.dataset.value);
    input.dataset.value = item.dataset.value;
    items.forEach((other) => other.setAttribute("aria-selected", String(other === item)));
    setOpen(false);
    input.focus();
    onSelect();
  }

  input.addEventListener("click", () => (menu.hidden ? openAll() : close()));
  toggle?.addEventListener("click", () => {
    if (menu.hidden) openAll();
    else close();
    input.focus();
  });

  if (editable || search) {
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      items.forEach((item) => (item.hidden = !item.dataset.filterText.includes(query)));
      if (editable) {
        input.dataset.value = input.value;
        items.forEach((item) => item.setAttribute("aria-selected", String(item.dataset.value === input.value)));
        active = -1;
        setOpen(visible().length > 0);
      } else {
        active = visible().length ? 0 : -1;
        setOpen(true);
      }
      highlight();
      if (editable) onSelect();
    });
  }

  input.addEventListener("keydown", (event) => {
    const open = !menu.hidden;
    if (event.key === "Tab") {
      close();
    } else if (event.key === "Escape") {
      if (open || (empty && !empty.hidden)) close();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const list = visible();
      if (!open) {
        openAll();
        return;
      }
      if (!list.length) return;
      active = (active + (event.key === "ArrowDown" ? 1 : list.length - 1)) % list.length;
      highlight();
    } else if (homeEnd && open && mode === "select" && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      active = event.key === "Home" ? 0 : visible().length - 1;
      highlight();
    } else if (event.key === "Enter" && open && active >= 0) {
      event.preventDefault();
      choose(visible()[active]);
    } else if (event.key === "Enter" && !editable) {
      event.preventDefault();
      openAll();
    } else if (event.key === " " && mode === "select") {
      event.preventDefault();
      if (!open) openAll();
      else if (active >= 0) choose(visible()[active]);
    }
  });
  input.addEventListener("blur", close);

  return {
    items,
    get value() {
      return input.dataset.value ?? "";
    },
    set value(value) {
      input.dataset.value = value;
      input.value = editable ? value : labelOf(value);
      items.forEach((item) => item.setAttribute("aria-selected", String(item.dataset.value === value)));
    },
  };
}

export class KListbox extends HTMLElement {
  connectedCallback() {
    if (this.listbox) return; // ponytail: render once; options are read at first connect only
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
    const input = el("input", {
      id: `${id}-input`,
      type: "text",
      role: "combobox",
      autocomplete: "off",
      "aria-expanded": "false",
      "aria-controls": `${id}-listbox`,
      placeholder: this.getAttribute("placeholder") || (searchable ? t.search : t.choose),
    });
    if (searchable) input.setAttribute("aria-autocomplete", "list");
    const menu = el("div", { role: "listbox", id: `${id}-listbox`, hidden: "" });
    if (this.hasAttribute("label")) menu.setAttribute("aria-labelledby", `${id}-label`);
    this.append(input, menu);

    let current = this.getAttribute("value") ?? "";
    input.dataset.value = current;
    this.listbox = bindListbox(input, menu, {
      options,
      mode: searchable ? "search" : "select",
      homeEnd: true,
      emptyText: t.empty,
      onSelect: () => {
        if (input.dataset.value === current) return;
        current = input.dataset.value;
        this.dispatchEvent(new Event("change", { bubbles: true }));
      },
    });
    this.listbox.value = current;
    this.setCurrent = (value) => (current = value);
  }

  get value() {
    return this.listbox?.value ?? "";
  }

  set value(value) {
    if (!this.listbox) return;
    this.setCurrent(value);
    this.listbox.value = value;
  }
}

function el(tag, attrs) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  return node;
}

if (!customElements.get("k-listbox")) customElements.define("k-listbox", KListbox);
