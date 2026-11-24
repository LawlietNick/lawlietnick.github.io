---
name: karppinen-ui
description: Builds interface behaviour with @karppinen/ui (Niko's SDK). Use when a project has @karppinen/ui installed or packages/ui present, or when adding a copy button, dialog, disclosure or popup menu, listbox or select, tabs or toggle group to one of Niko's projects.
---

# Build with @karppinen/ui

The SDK is unstyled behaviour: keyboard, focus, ARIA and FI/EN strings. Reach for it before writing a widget by hand; a hand-rolled tab list or popup is the slop this package exists to replace.

## Read first

- The API is each module's header comment and its `.d.ts` file (`copy`, `dialog`, `disclosure`, `listbox`, `tabs`, `toggle-group`). Read only the modules the task needs.
- `README.md` in the package lists the modules, events and the Astro wrappers.

## Pick the form

1. **Markup the project already owns** (its classes, its CSS): call `bind*()` on it. The markup and classes stay; the function adds behaviour and ARIA. Every tool on karppinen.one works this way.
2. **New markup**: use the `<k-*>` element, or its Astro wrapper (`@karppinen/ui/Tabs.astro`). Dialog has `bindDialog` only.

Import the single module (`@karppinen/ui/tabs`) in pages that need one element, the root only where most are used.

## Rules

- **Style from state.** Target `data-part`, the ARIA state (`aria-expanded`, `aria-pressed`, `aria-selected`, `data-active`, `data-state`) and the project's own classes. State lives in attributes, never inline styles.
- **Default look.** `@karppinen/ui/ui.css` styles the `<k-*>` elements in the karppinen.one style inside `@layer k-ui`; the project's unlayered rules win. Tune it with the `--k-*` properties. It leaves `bind*()` markup alone.
- **Name every control.** A visible label, `label` attribute or `aria-label`. People on screen readers and agents both find controls by name.
- **Language from `lang`.** Built-in strings follow the nearest `lang`; set it on the element or an ancestor for Finnish.
- **Changes from code are silent.** `select()` and `value =` never fire `onSelect`, `onPress` or `change`; update dependent state yourself.

## Test it

Import `mount`, `press`, `type` and `unnamedControls` from `@karppinen/ui/testing` (Vitest with jsdom). Test the wiring, not the SDK:

- every key the user relies on (`press(el, "ArrowDown")`), and where focus lands after it;
- every value change reaches the app (`change`, `onSelect`);
- `expect(unnamedControls(document.body)).toEqual([])` on each page or component.

Done means each control is named, each key path is tested, and the visual check passes in light and dark themes and at mobile width.
