// Show/hide button for a panel, optionally behaving as a popup menu, two ways:
// - bindDisclosure(trigger, panel, { popup, root, group, arrows, onToggle }): behaviour on existing markup.
//   Plain (table of contents, menu sections): the button only toggles the panel.
//   `popup` (language menu, header dropdowns): Escape closes and returns focus to the trigger; a click
//   outside `root` or focus leaving it closes it. `root` defaults to the trigger's parent and must hold
//   both. With `arrows` (default on for popups), ArrowDown/ArrowUp on the trigger open the panel on its
//   first/last link or button, and Up/Down/Home/End move between them. `focusOut: false` keeps a popup
//   open when focus leaves it (for panels with fields, where clicking empty space would blur them).
//   Disclosures sharing a `group` name close each other. `onToggle(open)` runs on every change, for
//   classes or content the markup needs. The start state is the trigger's aria-expanded.
//   Returns { open, toggle(force) }; toggle() from code also calls onToggle.
// - <k-disclosure>: the declarative element. Direct children: one <button> trigger and one panel marked
//   data-panel. Attributes: popup, open (start state, reflected), group. Fires a bubbling `k-toggle` event
//   with detail { open } (not `toggle`, which the browser uses itself).
// Parts: data-part="trigger" and your panel. No text of its own, so no FI/EN strings.

let uid = 0;
const FOCUSABLE = "a[href], button:not([disabled])";
const groups = new Map(); // group name -> Set of controllers
const openPopups = new Set();
let outsideBound = false;

// One document listener for every popup, so pages that rebind on each navigation don't pile up listeners.
function bindOutsideClick() {
  if (outsideBound) return;
  outsideBound = true;
  document.addEventListener("click", (event) => {
    for (const popup of [...openPopups]) {
      if (!popup.root.isConnected) openPopups.delete(popup);
      else if (!popup.root.contains(event.target)) popup.toggle(false);
    }
  });
}

export function bindDisclosure(trigger, panel, { popup = false, root = trigger.parentElement, group, arrows = popup, focusOut = popup, onToggle = () => {} } = {}) {
  panel.id ||= `k-disclosure-${++uid}`;
  trigger.type = "button";
  trigger.dataset.part = "trigger";
  trigger.setAttribute("aria-controls", panel.id);
  let open = trigger.getAttribute("aria-expanded") === "true";

  const controller = {
    root,
    trigger,
    get open() {
      return open;
    },
    toggle(force = !open) {
      if (force === open) return;
      open = force;
      if (open && group) {
        for (const other of groups.get(group)) {
          if (!other.trigger.isConnected) groups.get(group).delete(other);
          else if (other !== controller) other.toggle(false);
        }
      }
      if (popup) open ? openPopups.add(controller) : openPopups.delete(controller);
      render();
      onToggle(open);
    },
  };

  function render() {
    trigger.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  render();
  if (open && popup) openPopups.add(controller);
  if (group) {
    if (!groups.has(group)) groups.set(group, new Set());
    groups.get(group).add(controller);
  }
  trigger.addEventListener("click", () => controller.toggle());
  if (!popup) return controller;

  bindOutsideClick();
  const items = () => [...panel.querySelectorAll(FOCUSABLE)];
  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!open) return;
      e.preventDefault();
      controller.toggle(false);
      trigger.focus();
      return;
    }
    if (!arrows) return;
    if (e.target === trigger && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      controller.toggle(true);
      const list = items();
      const target = list[e.key === "ArrowDown" ? 0 : list.length - 1];
      target?.focus();
      // a panel styled visibility: hidden until its open class applies can refuse focus for a frame
      if (target && document.activeElement !== target) requestAnimationFrame(() => target.focus());
      return;
    }
    const list = items();
    const i = list.indexOf(document.activeElement);
    if (i < 0) return;
    const n = list.length;
    const next = { ArrowDown: list[(i + 1) % n], ArrowUp: list[(i - 1 + n) % n], Home: list[0], End: list[n - 1] }[e.key];
    if (!next) return;
    e.preventDefault();
    next.focus();
  });
  if (focusOut) {
    root.addEventListener("focusout", (e) => {
      if (!e.relatedTarget || !root.contains(e.relatedTarget)) controller.toggle(false);
    });
  }
  return controller;
}

export class KDisclosure extends HTMLElement {
  connectedCallback() {
    if (this.controller) return;
    const trigger = this.querySelector(":scope > button");
    const panel = this.querySelector(":scope > [data-panel]");
    if (!trigger || !panel) return;
    trigger.setAttribute("aria-expanded", String(this.hasAttribute("open")));
    this.controller = bindDisclosure(trigger, panel, {
      popup: this.hasAttribute("popup"),
      root: this,
      group: this.getAttribute("group") ?? undefined,
      onToggle: (open) => {
        this.toggleAttribute("open", open);
        this.dispatchEvent(new CustomEvent("k-toggle", { bubbles: true, detail: { open } }));
      },
    });
  }

  get open() {
    return this.controller?.open ?? this.hasAttribute("open");
  }

  set open(value) {
    this.controller?.toggle(Boolean(value));
  }

  toggle(force) {
    this.controller?.toggle(force);
  }
}

if (!customElements.get("k-disclosure")) customElements.define("k-disclosure", KDisclosure);
