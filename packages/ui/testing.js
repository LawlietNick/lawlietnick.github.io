// Test helpers for code built on @karppinen/ui (Vitest or any runner with a DOM such as jsdom).
// - mount(html): puts markup in document.body and returns the body; custom elements upgrade at once.
// - press(target, key, modifiers): a bubbling keydown, the way the SDK listens for keys.
// - type(input, text): sets the value and fires `input`, the way a person typing ends up.
// - unnamedControls(root): every button, field, link and role="tab|option|combobox" without an
//   accessible name, so a test can `expect(unnamedControls(document.body)).toEqual([])`.
// Not part of the main entry; import it from "@karppinen/ui/testing" in tests only.

export function mount(html) {
  document.body.innerHTML = html;
  return document.body;
}

export function press(target, key, modifiers = {}) {
  return target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...modifiers }));
}

export function type(input, text) {
  input.value = text;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

const CONTROLS = 'button, a[href], input:not([type="hidden"]), select, textarea, [role="tab"], [role="option"], [role="combobox"]';

// ponytail: covers aria-labelledby, aria-label, <label>, text, title and alt; not the full accname spec
export function accessibleName(el) {
  const ids = el.getAttribute("aria-labelledby");
  if (ids) return ids.split(/\s+/).map((id) => el.ownerDocument.getElementById(id)?.textContent ?? "").join(" ").trim();
  const name = el.getAttribute("aria-label")
    || [...(el.labels ?? [])].map((label) => label.textContent).join(" ")
    || (el.matches("input, select, textarea") ? "" : el.textContent)
    || el.getAttribute("title")
    || el.querySelector("img[alt]")?.getAttribute("alt")
    || "";
  return name.trim();
}

export function unnamedControls(root) {
  return [...root.querySelectorAll(CONTROLS)].filter((el) => !el.closest("[hidden], [aria-hidden='true']") && !accessibleName(el));
}
