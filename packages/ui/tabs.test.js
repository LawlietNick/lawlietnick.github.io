import { expect, test } from "vitest";
import { press } from "./testing.js";
import { bindTabs } from "./tabs.js";

const mount = (html) => {
  document.body.innerHTML = html;
  const tabs = document.querySelector("k-tabs");
  return { tabs, buttons: [...tabs.querySelectorAll('[role="tab"]')], panels: [...tabs.querySelectorAll('[role="tabpanel"]')] };
};

test("wires tabs to their own panels and moves with arrow keys, Home and End", () => {
  const { tabs, buttons, panels } = mount(`<k-tabs label="Steps">
    <button value="naming">Naming</button><button value="utm">UTM</button><button value="check">Check</button>
    <div data-panel="naming">1</div><div data-panel="utm">2</div><div data-panel="check">3</div></k-tabs>`);
  const list = tabs.querySelector('[role="tablist"]');
  expect(list.getAttribute("aria-label")).toBe("Steps");
  expect(list.children.length).toBe(3);
  expect(buttons[1].getAttribute("aria-controls")).toBe(panels[1].id);
  expect(panels[1].getAttribute("aria-labelledby")).toBe(buttons[1].id);
  expect(panels.map((p) => p.hidden)).toEqual([false, true, true]);
  expect(buttons.map((b) => b.tabIndex)).toEqual([0, -1, -1]);

  let changes = 0;
  tabs.addEventListener("change", () => changes++);
  buttons[0].focus();
  press(buttons[0], "ArrowLeft"); // wraps to the last tab
  expect(tabs.value).toBe("check");
  expect(document.activeElement).toBe(buttons[2]);
  press(buttons[2], "Home");
  press(buttons[0], "ArrowRight");
  expect(tabs.value).toBe("utm");
  expect(panels.map((p) => p.hidden)).toEqual([true, false, true]);
  expect(buttons.map((b) => b.tabIndex)).toEqual([-1, 0, -1]);
  buttons[1].click(); // already selected: no change event
  expect(changes).toBe(3);
});

test("a vertical tab list moves with Up and Down only", () => {
  document.body.innerHTML = `<div aria-orientation="vertical"><button value="a">A</button><button value="b">B</button></div>`;
  const list = document.querySelector("div");
  const tabs = bindTabs(list);
  const [a, b] = list.querySelectorAll("button");
  a.focus();
  press(a, "ArrowRight");
  expect(tabs.value).toBe("a");
  press(a, "ArrowDown");
  expect(tabs.value).toBe("b");
  list.setAttribute("aria-orientation", "horizontal");
  press(b, "ArrowRight");
  expect(tabs.value).toBe("a");
});

test("a shared panel follows the selected tab", () => {
  const { tabs, buttons, panels } = mount(`<k-tabs value="html">
    <button value="css">CSS</button><button value="html">HTML</button><pre data-panel="">code</pre></k-tabs>`);
  expect(panels).toHaveLength(1);
  expect(buttons.every((b) => b.getAttribute("aria-controls") === panels[0].id)).toBe(true);
  expect(panels[0].getAttribute("aria-labelledby")).toBe(buttons[1].id);
  buttons[0].click();
  expect(tabs.value).toBe("css");
  expect(panels[0].getAttribute("aria-labelledby")).toBe(buttons[0].id);
  expect(panels[0].hidden).toBe(false);
});

test("bindTabs keeps existing markup, calls onSelect only for user picks, and select() stays silent", () => {
  document.body.innerHTML = `<div class="cbs__tabs" aria-label="Output">
    <button class="cbs__tab" data-tab="css" aria-selected="true">CSS</button><button class="cbs__tab" data-tab="js">JS</button></div>
    <div class="cbs__panel" data-panel="css"></div><div class="cbs__panel" data-panel="js"></div>`;
  const list = document.querySelector(".cbs__tabs");
  const [css, js] = list.querySelectorAll("button");
  const picked = [];
  const tabs = bindTabs(list, {
    getValue: (tab) => tab.dataset.tab,
    panelFor: (value) => document.querySelector(`.cbs__panel[data-panel="${value}"]`),
    onSelect: (value) => picked.push(value),
  });
  expect(list.getAttribute("role")).toBe("tablist");
  expect(css.className).toBe("cbs__tab");
  expect(tabs.value).toBe("css");
  expect(document.querySelector('[data-panel="js"]').hidden).toBe(true);
  css.focus();
  press(css, "End");
  expect(picked).toEqual(["js"]);
  expect(document.activeElement).toBe(js);
  tabs.select("css");
  expect(picked).toEqual(["js"]);
  expect([css.tabIndex, js.tabIndex]).toEqual([0, -1]);
  expect(document.querySelector('[data-panel="css"]').hidden).toBe(false);
});
