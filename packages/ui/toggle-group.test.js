import { expect, test } from "vitest";
import { bindToggleGroup } from "./toggle-group.js";

const mount = (html) => {
  document.body.innerHTML = html;
  const group = document.querySelector("k-toggle-group");
  return { group, items: [...group.querySelectorAll("button")] };
};
const pressed = (items) => items.map((b) => b.getAttribute("aria-pressed"));

test("labels the group, presses one button, and fires change only on a new choice", () => {
  const { group, items } = mount(
    '<k-toggle-group label="Preview size"><button value="desktop">Desktop</button><button value="mobile">Mobile</button></k-toggle-group>',
  );
  expect(group.getAttribute("role")).toBe("group");
  expect(group.getAttribute("aria-label")).toBe("Preview size");
  expect(items.every((b) => b.type === "button")).toBe(true);
  expect(pressed(items)).toEqual(["true", "false"]); // first button by default
  let changes = 0;
  group.addEventListener("change", () => changes++);
  items[1].click();
  items[1].click();
  expect(group.value).toBe("mobile");
  expect(pressed(items)).toEqual(["false", "true"]);
  expect(changes).toBe(1);
  group.value = "desktop"; // setting from code does not fire change
  expect(pressed(items)).toEqual(["true", "false"]);
  expect(changes).toBe(1);
});

test("starts from the value attribute, else from a pressed button in the markup", () => {
  const attr = mount('<k-toggle-group value="b"><button value="a">A</button><button value="b">B</button></k-toggle-group>');
  expect(attr.group.value).toBe("b");
  const markup = mount('<k-toggle-group><button value="a">A</button><button value="b" aria-pressed="true">B <span>note</span></button></k-toggle-group>');
  expect(markup.group.value).toBe("b");
  expect(markup.items[1].querySelector("span").textContent).toBe("note");
});

test("bindToggleGroup keeps markup, reports repeat presses, and select() stays silent", () => {
  document.body.innerHTML = `<div class="mu__chips" role="group" aria-label="utm_medium">
    <button class="mu__chip" data-medium-preset="paidsocial">paidsocial</button><button class="mu__chip" data-medium-preset="custom">Other</button></div>`;
  const group = document.querySelector(".mu__chips");
  const [paid, custom] = group.querySelectorAll("button");
  const presses = [];
  const toggles = bindToggleGroup(group, { getValue: (b) => b.dataset.mediumPreset, onPress: (v) => presses.push(v) });
  expect(group.getAttribute("aria-label")).toBe("utm_medium");
  expect([paid.getAttribute("aria-pressed"), custom.getAttribute("aria-pressed")]).toEqual(["false", "false"]);
  custom.click();
  custom.click(); // repeat press still reaches the tool
  expect(presses).toEqual(["custom", "custom"]);
  expect(toggles.value).toBe("custom");
  toggles.select("paidsocial");
  expect(presses).toHaveLength(2);
  expect(paid.getAttribute("aria-pressed")).toBe("true");
  expect(paid.className).toBe("mu__chip");
  toggles.select(null);
  expect(toggles.value).toBe("");
});

test("k-toggle-group fires change after a value set from code", () => {
  document.body.innerHTML = '<k-toggle-group><button value="a">A</button><button value="b">B</button></k-toggle-group>';
  const group = document.querySelector("k-toggle-group");
  let changes = 0;
  group.addEventListener("change", () => changes++);
  group.value = "b";
  group.querySelector('[value="a"]').click();
  expect(changes).toBe(1);
  expect(group.value).toBe("a");
});
