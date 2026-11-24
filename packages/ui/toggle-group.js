// <k-toggle-group>: unstyled single-choice group of aria-pressed buttons (segmented control, chip presets).
// Children are your own <button value="…"> elements, so they can hold any markup.
// Exactly one button is pressed; pressing it again changes nothing. `label` names the group.
// Fires a bubbling `change` event; read or set the choice with `element.value`.
// Parts: data-part="item" on each button. No text of its own, so no FI/EN strings.

export class KToggleGroup extends HTMLElement {
  connectedCallback() {
    if (this.items) return;
    this.setAttribute("role", "group");
    if (this.hasAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label"));
    // ponytail: each button stays in the tab order like the site's current toggles; add arrow-key roving if a group grows long
    this.items = [...this.querySelectorAll("button")];
    for (const item of this.items) {
      item.type = "button";
      item.dataset.part = "item";
      item.addEventListener("click", () => {
        if (item.value === this.value) return;
        this.value = item.value;
        this.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
    const pressed = this.items.find((item) => item.getAttribute("aria-pressed") === "true");
    this.value = this.getAttribute("value") ?? pressed?.value ?? this.items[0]?.value ?? "";
  }

  get value() {
    return this.items?.find((item) => item.getAttribute("aria-pressed") === "true")?.value ?? "";
  }

  set value(value) {
    this.items?.forEach((item) => item.setAttribute("aria-pressed", String(item.value === value)));
  }
}

if (!customElements.get("k-toggle-group")) customElements.define("k-toggle-group", KToggleGroup);
