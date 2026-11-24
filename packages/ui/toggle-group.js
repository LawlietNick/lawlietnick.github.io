// Single-choice group of aria-pressed buttons (segmented control, chip presets), two ways:
// - bindToggleGroup(group, { getValue, onPress, label }): behaviour on existing markup, keeping its classes.
//   Its <button>s become toggle buttons. `getValue(button)` names a button (default button.value).
//   A press marks that button pressed and calls `onPress(value)` every time, also when it was already
//   pressed, because some tools act on a repeat press (e.g. focus a field again). `label` adds
//   role="group" and an aria-label; leave it out when the markup already names the group.
//   Returns { select(value), value }; select() from code never calls onPress. select(null) presses none.
// - <k-toggle-group>: the declarative element. Children are your own <button value="…">; exactly one is
//   pressed (the `value` attribute, else a pressed button in the markup, else the first). `label` names it.
//   Fires a bubbling `change` event only when the choice changes; read or set it with `element.value`.
// Parts: data-part="item" on each button. No text of its own, so no FI/EN strings.

import { ElementBase, define } from "./element.js";

export function bindToggleGroup(group, { getValue = (button) => button.value, onPress = () => {}, label } = {}) {
  const items = [...group.querySelectorAll("button")];
  if (label) {
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", label);
  }
  // ponytail: each button stays in the tab order like the site's current toggles; add arrow-key roving if a group grows long
  for (const item of items) {
    item.type = "button";
    item.dataset.part = "item";
    if (!item.hasAttribute("aria-pressed")) item.setAttribute("aria-pressed", "false");
    item.addEventListener("click", () => {
      select(getValue(item));
      onPress(getValue(item));
    });
  }

  function select(value) {
    items.forEach((item) => item.setAttribute("aria-pressed", String(value != null && getValue(item) === value)));
  }

  return {
    select,
    get value() {
      const pressed = items.find((item) => item.getAttribute("aria-pressed") === "true");
      return pressed ? getValue(pressed) : "";
    },
  };
}

export class KToggleGroup extends ElementBase {
  connectedCallback() {
    if (this.group) return;
    const buttons = [...this.querySelectorAll("button")];
    const pressed = buttons.find((button) => button.getAttribute("aria-pressed") === "true");
    this.current = this.getAttribute("value") ?? pressed?.value ?? buttons[0]?.value ?? "";
    this.group = bindToggleGroup(this, {
      label: this.getAttribute("label") ?? undefined,
      onPress: (value) => {
        if (value === this.current) return;
        this.current = value;
        this.dispatchEvent(new Event("change", { bubbles: true }));
      },
    });
    this.group.select(this.current);
    if (!this.hasAttribute("label")) this.setAttribute("role", "group");
  }

  get value() {
    return this.group?.value ?? "";
  }

  set value(value) {
    this.current = value;
    this.group?.select(value);
  }
}

define("k-toggle-group", KToggleGroup);
