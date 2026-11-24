import { expect, test } from "vitest";
import { accessibleName, mount, press, type, unnamedControls } from "./testing.js";

test("finds controls without a name and reads names from every source", () => {
  mount(`<button>Save</button><button aria-label="Close"></button><button id="bare"></button>
    <label for="q">Search</label><input id="q"><input id="nameless">
    <span id="l">Format</span><div role="tab" aria-labelledby="l"></div>
    <div hidden><button></button></div>`);
  expect(unnamedControls(document.body).map((el) => el.id)).toEqual(["bare", "nameless"]);
  expect(accessibleName(document.querySelector("#q"))).toBe("Search");
  expect(accessibleName(document.querySelector('[role="tab"]'))).toBe("Format");
});

test("press and type reach the listeners the SDK uses", () => {
  const body = mount(`<input>`);
  const input = body.querySelector("input");
  const seen = [];
  body.addEventListener("keydown", (e) => { seen.push(e.key + (e.shiftKey ? "+shift" : "")); e.preventDefault(); });
  body.addEventListener("input", () => seen.push(input.value));
  expect(press(input, "Tab", { shiftKey: true })).toBe(false);
  type(input, "abc");
  expect(seen).toEqual(["Tab+shift", "abc"]);
});
