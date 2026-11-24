import { expect, test } from "vitest";
import "./listbox.js";

const mount = (html, lang = "en") => {
  document.body.innerHTML = `<div lang="${lang}">${html}</div>`;
  const box = document.querySelector("k-listbox");
  return { box, input: box.querySelector('[data-part="input"]') };
};
const key = (input, k) => input.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));
const opts = '<option value="a">Apple</option><option value="b">Banana</option><option value="c">Cherry</option>';

test("arrow keys move and Enter selects, firing change", () => {
  const { box, input } = mount(`<k-listbox label="Fruit" value="a">${opts}</k-listbox>`);
  let changes = 0;
  box.addEventListener("change", () => changes++);
  expect(input.value).toBe("Apple");
  expect(input.readOnly).toBe(true);
  key(input, "ArrowDown"); // opens on the selected option
  expect(input.getAttribute("aria-expanded")).toBe("true");
  key(input, "ArrowDown");
  key(input, "ArrowDown");
  expect(document.getElementById(input.getAttribute("aria-activedescendant")).textContent).toBe("Cherry");
  key(input, "ArrowDown"); // wraps
  key(input, "Enter");
  expect(box.value).toBe("a");
  expect(changes).toBe(0);
  key(input, "ArrowDown");
  key(input, "End");
  key(input, "Enter");
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
  key(input, "Escape");
  expect(input.value).toBe("Banana");
  expect(empty.hidden).toBe(true);
});
