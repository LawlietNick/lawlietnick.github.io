import { expect, test } from "vitest";
import "./toggle-group.js";

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
