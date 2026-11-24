import { expect, test } from "vitest";
import { press } from "./testing.js";
import { bindDialog } from "./dialog.js";


test("custom modal: inert page, focus trap, Escape, focus back to the opener", () => {
  document.body.innerHTML = `<main><button id="menu">Menu</button></main><footer>f</footer>
    <div id="panel" role="dialog" aria-modal="true" tabindex="-1"><button id="close">x</button><a href="/a">A</a><a href="/b" hidden>B</a></div>`;
  const panel = document.getElementById("panel");
  const toggles = [];
  const menu = bindDialog(panel, {
    initialFocus: () => document.getElementById("close"),
    inertRoots: [document.querySelector("main"), document.querySelector("footer")],
    onToggle: (open) => toggles.push(open),
  });
  document.getElementById("menu").focus();
  menu.open();
  expect(document.querySelector("main").inert).toBe(true);
  expect(document.activeElement.id).toBe("close");
  document.querySelector('[href="/a"]').focus();
  press(panel, "Tab"); // last visible item wraps to the first
  expect(document.activeElement.id).toBe("close");
  press(panel, "Tab", { shiftKey: true });
  expect(document.activeElement.getAttribute("href")).toBe("/a");
  press(panel, "Escape");
  expect(menu.isOpen).toBe(false);
  expect(document.querySelector("footer").inert).toBe(false);
  expect(document.activeElement.id).toBe("menu");
  expect(toggles).toEqual([true, false]);
});

test("closing keeps focus where the caller moved it, or skips the return on request", () => {
  document.body.innerHTML = `<button id="open">Open</button><button id="elsewhere">Next</button><div id="d"><button id="ok">OK</button></div>`;
  const d = bindDialog(document.getElementById("d"), { initialFocus: () => document.getElementById("ok") });
  document.getElementById("open").focus();
  d.open();
  document.getElementById("elsewhere").focus(); // an action moved focus on purpose
  d.close();
  expect(document.activeElement.id).toBe("elsewhere");
  document.getElementById("open").focus();
  d.open();
  d.close({ restoreFocus: false });
  expect(document.activeElement.id).not.toBe("open");
});
