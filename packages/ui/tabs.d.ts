export interface BindTabsOptions {
  /** Names a tab (default: tab.value). */
  getValue?: (tab: HTMLButtonElement) => string;
  /** The tab's panel, the same element for every tab when one shared panel is swapped, or null. */
  panelFor?: (value: string) => HTMLElement | null | undefined;
  /** Runs when the user picks a different tab; never for select() from code. */
  onSelect?: (value: string) => void;
}

export interface TabsController {
  select(value: string): void;
  readonly value: string;
}

/** Tabs on an existing list of <button>s. */
export declare function bindTabs(list: HTMLElement, options?: BindTabsOptions): TabsController;

/** `<k-tabs label="…" value="…">` with child <button value> tabs and [data-panel] panels. Fires `change`. */
export declare class KTabs extends HTMLElement {
  value: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "k-tabs": KTabs;
  }
}
