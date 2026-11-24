import { expect, test } from "vitest";
import { bindDisclosure } from "./disclosure.js";

const key = (el, k) => el.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));
const parts = (box) => ({ trigger: box.querySelector("button"), panel: box.querySelector("[data-panel]") });

test("plain mode toggles, starts open from the attribute, and ignores Escape", () => {
  document.body.innerHTML = '<k-disclosure open><button>Contents</button><nav data-panel>…</nav></k-disclosure>';
  const box = document.querySelector("k-disclosure");
  const { trigger, panel } = parts(box);
  const events = [];
  box.addEventListener("k-toggle", (e) => events.push(e.detail.open));
  expect(trigger.getAttribute("aria-controls")).toBe(panel.id);
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
  expect(panel.hidden).toBe(false);
  trigger.click();
  expect(panel.hidden).toBe(true);
  expect(box.hasAttribute("open")).toBe(false);
  box.open = true;
  key(panel, "Escape");
  expect(box.open).toBe(true);
  expect(events).toEqual([false, true]);
});

test("popup mode: arrows open and move, Escape returns focus, outside click closes, group keeps one open", () => {
  document.body.innerHTML = `<p id="outside">x</p>
    <k-disclosure popup group="nav"><button>Language</button>
      <div data-panel><a href="/en/">English</a><a href="/fi/">Suomi</a><a href="/sv/">Svenska</a></div></k-disclosure>
    <k-disclosure popup group="nav"><button>Tools</button><div data-panel><a href="/t/">Tool</a></div></k-disclosure>`;
  const [lang, tools] = document.querySelectorAll("k-disclosure");
  const { trigger, panel } = parts(lang);
  const links = [...panel.querySelectorAll("a")];

  key(trigger, "ArrowUp");
  expect(lang.open).toBe(true);
  expect(document.activeElement).toBe(links[2]);
  key(links[2], "ArrowDown"); // wraps
  expect(document.activeElement).toBe(links[0]);
  key(links[0], "End");
  expect(document.activeElement).toBe(links[2]);
  key(links[2], "Escape");
  expect(lang.open).toBe(false);
  expect(document.activeElement).toBe(trigger);

  trigger.click();
  parts(tools).trigger.click(); // same group: opening Tools closes Language
  expect([lang.open, tools.open]).toEqual([false, true]);
  document.getElementById("outside").click();
  expect(tools.open).toBe(false);
});

test("bindDisclosure on existing markup: onToggle, start state from aria-expanded, focusOut off keeps it open", () => {
  document.body.innerHTML = `<div class="anchor"><button id="add" aria-expanded="false">+ Add</button>
    <div id="pop" hidden><input id="search"><button>utm_source</button></div></div><p id="out">x</p>`;
  const changes = [];
  const picker = bindDisclosure(document.getElementById("add"), document.getElementById("pop"), {
    popup: true,
    root: document.querySelector(".anchor"),
    focusOut: false,
    onToggle: (open) => changes.push(open),
  });
  expect(document.getElementById("pop").hidden).toBe(true);
  document.getElementById("add").click();
  expect(picker.open).toBe(true);
  document.getElementById("search").focus();
  document.getElementById("search").blur(); // focus leaves: stays open with focusOut off
  expect(picker.open).toBe(true);
  document.getElementById("out").click();
  expect(picker.open).toBe(false);
  expect(changes).toEqual([true, false]);
});
