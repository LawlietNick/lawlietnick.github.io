import { expect, test } from "vitest";
import { press } from "./testing.js";
import { bindListbox } from "./listbox.js";

const mount = (html, lang = "en") => {
  document.body.innerHTML = `<div lang="${lang}">${html}</div>`;
  const box = document.querySelector("k-listbox");
  return { box, input: box.querySelector('[data-part="input"]') };
};
const opts = '<option value="a">Apple</option><option value="b">Banana</option><option value="c">Cherry</option>';

test("arrow keys move and Enter selects, firing change", () => {
  const { box, input } = mount(`<k-listbox label="Fruit" value="a">${opts}</k-listbox>`);
  let changes = 0;
  box.addEventListener("change", () => changes++);
  expect(input.value).toBe("Apple");
  expect(input.readOnly).toBe(true);
  press(input, "ArrowDown"); // opens on the selected option
  expect(input.getAttribute("aria-expanded")).toBe("true");
  press(input, "ArrowDown");
  press(input, "ArrowDown");
  expect(document.getElementById(input.getAttribute("aria-activedescendant")).textContent).toBe("Cherry");
  press(input, "ArrowDown"); // wraps
  press(input, "Enter");
  expect(box.value).toBe("a");
  expect(changes).toBe(0);
  press(input, "ArrowDown");
  press(input, "End");
  press(input, "Enter");
  expect(box.value).toBe("c");
  expect(changes).toBe(1);
  expect(input.getAttribute("aria-expanded")).toBe("false");
});

test("searchable filters, shows empty state, and restores label on close", () => {
  const { box, input } = mount(`<k-listbox searchable value="b">${opts}</k-listbox>`, "fi");
  expect(input.placeholder).toBe("Hae…");
  input.value = "ch";
  input.dispatchEvent(new Event("input"));
  const shown = [...box.querySelectorAll('[data-part="option"]')].filter((o) => !o.hidden);
  expect(shown.map((o) => o.textContent)).toEqual(["Cherry"]);
  input.value = "zzz";
  input.dispatchEvent(new Event("input"));
  const empty = box.querySelector('[data-part="empty"]');
  expect(empty.hidden).toBe(false);
  expect(empty.textContent).toBe("Ei tuloksia");
  press(input, "Escape");
  expect(input.value).toBe("Banana");
  expect(empty.hidden).toBe(true);
});

test("bindListbox on site markup: editable mode, own option markup, no Home/End unless asked", () => {
  document.body.innerHTML = '<input id="cur" value="EUR" data-value="EUR"><div id="cur-menu" hidden></div>';
  const input = document.getElementById("cur");
  const menu = document.getElementById("cur-menu");
  let selects = 0;
  bindListbox(input, menu, {
    options: [["EUR", "Euro"], ["SEK", "Swedish krona"], ["USD", "US dollar"]],
    mode: "editable",
    activeClass: "is-active",
    renderOption: (value, label) => Object.assign(document.createElement("button"), { className: "combobox__option", textContent: label }),
    onSelect: () => selects++,
  });
  const items = [...menu.querySelectorAll("button")];
  expect(items[0].className).toBe("combobox__option");
  expect(items[0].tabIndex).toBe(-1);
  expect(input.readOnly).toBe(false);
  input.value = "s";
  input.dispatchEvent(new Event("input"));
  expect(input.dataset.value).toBe("s"); // free text is the value in editable mode
  expect(items.filter((o) => !o.hidden).map((o) => o.dataset.value)).toEqual(["SEK", "USD"]);
  press(input, "ArrowDown");
  press(input, "End"); // not enabled: stays on the first match
  expect(items[1].classList.contains("is-active")).toBe(true);
  press(input, "Enter");
  expect([input.value, input.dataset.value]).toEqual(["SEK", "SEK"]);
  expect(selects).toBe(2);
});
