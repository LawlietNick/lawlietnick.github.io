# @karppinen/ui

Unstyled, accessible UI behaviour for karppinen.one and Niko's other projects. Plain JavaScript, no dependencies, TypeScript types included.

Each element comes two ways:

- **`bind*()`** adds behaviour to markup you already have and keeps your classes. Use it when the site owns the HTML and CSS.
- **`<k-*>`** is a custom element built on that same function. Use it for new markup. An Astro wrapper exists for each.

Nothing ships with styles. Style the `data-part` attributes, the ARIA state (`aria-expanded`, `aria-pressed`, `aria-selected`) or your own classes.

## Install

Not published. In another project, point to this folder:

```bash
npm install ../karppinen-one-astrojs-website/packages/ui
```

That creates a symlink, so changes here show up there at once.

## Import

```js
import { bindTabs, bindCopy } from "@karppinen/ui"; // everything; registers all <k-*> elements
import { bindTabs } from "@karppinen/ui/tabs";       // one module; registers only <k-tabs>
```

Every module also loads on a server (Astro frontmatter, Node tests). The custom elements register only in the browser.

## Elements

| Module | Function | Element | Astro wrapper | Pattern |
| --- | --- | --- | --- | --- |
| `copy` | `bindCopy`, `copyText` | `<k-copy>` | `Copy.astro` | Copy button with a status message |
| `dialog` | `bindDialog` | none | none | Modal dialog |
| `disclosure` | `bindDisclosure` | `<k-disclosure>` | `Disclosure.astro` | Show/hide panel or popup menu |
| `listbox` | `bindListbox` | `<k-listbox>` | `Listbox.astro` | Select-style combobox |
| `tabs` | `bindTabs` | `<k-tabs>` | `Tabs.astro` | Tabs with roving tabindex |
| `toggle-group` | `bindToggleGroup` | `<k-toggle-group>` | `ToggleGroup.astro` | Single-choice toggle buttons |

The options of each function are documented at the top of its `.js` file and in its `.d.ts` file.

## Examples

Behaviour on existing markup:

```js
import { bindTabs } from "@karppinen/ui/tabs";

const tabs = bindTabs(document.querySelector(".my-tabs"), {
  panelFor: (value) => document.getElementById(`panel-${value}`),
  onSelect: (value) => console.log(value),
});
tabs.select("second"); // from code; does not call onSelect
```

The same as an element:

```html
<k-tabs label="Format" value="csv">
  <button value="csv">CSV</button>
  <button value="json">JSON</button>
  <div data-panel="csv">…</div>
  <div data-panel="json">…</div>
</k-tabs>
```

In Astro:

```astro
---
import Tabs from "@karppinen/ui/Tabs.astro";
---
<Tabs label="Format" tabs={[{ value: "csv", label: "CSV" }, { value: "json", label: "JSON" }]}>
  <div data-panel="csv">…</div>
  <div data-panel="json">…</div>
</Tabs>
```

## Events

- `<k-listbox>`, `<k-tabs>`, `<k-toggle-group>`: `change`, read `element.value`.
- `<k-disclosure>`: `k-toggle` with `detail.open`.
- `bindCopy` and `<k-copy>`: `k-copy` with `detail.ok` and `detail.text`.

## Language

Elements with their own text (copy, listbox) choose Finnish or English from the nearest `lang` attribute. Anything other than `fi` gets English.

## Tests

```bash
npx vitest run packages/ui
```

## Adding an element

1. Write `name.js` with `bindName()` first, then the `<k-name>` class on top of it, extending `ElementBase` and registered with `define()` from `element.js`.
2. Add `name.d.ts`, `name.test.js` and, if it has an element, `Name.astro`.
3. Export it in `index.js`, `index.d.ts` and `package.json`.
4. Add a demo to `/design-system`.
