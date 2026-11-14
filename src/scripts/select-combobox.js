// Combobox on a text input with a listbox. Value lives in input.dataset.value.
// Select-only (default): the input is read-only and shows the chosen label.
// Editable: the user may type any text; the list filters as they type and a chosen option puts its value in the input.
export function initSelectCombobox(input, toggle, menu, options, onSelect, { editable = false } = {}) {
  const items = options.map(([value, label], index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.id = `${menu.id}-option-${index}`;
    item.className = "combobox__option";
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", String(input.dataset.value === value));
    item.tabIndex = -1;
    item.dataset.value = value;
    item.dataset.filterText = `${value} ${label}`.toLowerCase();
    item.innerHTML = `<span><span class="combobox__name"></span></span>`;
    item.querySelector(".combobox__name").textContent = label;
    item.addEventListener("mousedown", (event) => event.preventDefault());
    item.addEventListener("click", () => choose(item));
    menu.appendChild(item);
    return item;
  });
  let active = -1;
  const visible = () => items.filter((item) => !item.hidden);

  function setOpen(open) {
    menu.hidden = !open;
    input.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-expanded", String(open));
    if (!open) input.removeAttribute("aria-activedescendant");
  }

  function openAll() {
    items.forEach((item) => (item.hidden = false));
    const selected = visible().findIndex((item) => item.dataset.value === input.dataset.value);
    active = editable ? selected : Math.max(0, selected);
    setOpen(true);
    highlight();
  }

  function highlight() {
    const list = visible();
    items.forEach((item) => item.classList.remove("is-active"));
    if (active >= 0 && list[active]) {
      list[active].classList.add("is-active");
      input.setAttribute("aria-activedescendant", list[active].id);
      list[active].scrollIntoView({ block: "nearest" });
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  }

  function choose(item) {
    input.value = editable ? item.dataset.value : item.querySelector(".combobox__name").textContent;
    input.dataset.value = item.dataset.value;
    items.forEach((other) => other.setAttribute("aria-selected", String(other === item)));
    setOpen(false);
    input.focus();
    onSelect();
  }

  input.addEventListener("click", () => (menu.hidden ? openAll() : setOpen(false)));
  toggle.addEventListener("click", () => {
    if (menu.hidden) openAll();
    else setOpen(false);
    input.focus();
  });

  if (editable) {
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      input.dataset.value = input.value;
      items.forEach((item) => {
        item.hidden = !item.dataset.filterText.includes(query);
        item.setAttribute("aria-selected", String(item.dataset.value === input.value));
      });
      active = -1;
      setOpen(visible().length > 0);
      highlight();
      onSelect();
    });
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Tab") { setOpen(false); return; }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const list = visible();
      if (menu.hidden) { openAll(); return; }
      if (!list.length) return;
      active = (active + (event.key === "ArrowDown" ? 1 : list.length - 1)) % list.length;
      highlight();
    } else if (event.key === "Enter" && !menu.hidden && active >= 0) {
      event.preventDefault();
      choose(visible()[active]);
    } else if (event.key === "Enter" && !editable) {
      event.preventDefault();
      openAll();
    } else if (event.key === " " && !editable) {
      event.preventDefault();
      if (menu.hidden) openAll();
      else if (active >= 0) choose(visible()[active]);
    }
  });
  input.addEventListener("blur", () => setOpen(false));
}
