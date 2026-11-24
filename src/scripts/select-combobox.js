// The site's combobox: the SDK's bindListbox with this site's option markup and highlight class.
// Value lives in input.dataset.value. Select-only (default): the input is read-only and shows the chosen label.
// Editable: the user may type any text; the list filters as they type and a chosen option puts its value in the input.
import { bindListbox } from "../../packages/ui/listbox.js";

function siteOption(value, label) {
  const item = document.createElement("button");
  item.type = "button";
  item.className = "combobox__option";
  item.innerHTML = `<span><span class="combobox__name"></span></span>`;
  item.querySelector(".combobox__name").textContent = label;
  return item;
}

export function initSelectCombobox(input, toggle, menu, options, onSelect, { editable = false } = {}) {
  return bindListbox(input, menu, {
    options,
    toggle,
    mode: editable ? "editable" : "select",
    onSelect,
    renderOption: siteOption,
    activeClass: "is-active",
  });
}
