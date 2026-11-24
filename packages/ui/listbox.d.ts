export interface BindListboxOptions {
  /** [value, label] pairs. */
  options?: [value: string, label: string][];
  /** An optional button that opens and closes the list. */
  toggle?: HTMLElement;
  /** "select": read-only; "editable": any text is the value; "search": typing filters. Default "select". */
  mode?: "select" | "editable" | "search";
  /** Runs on every choice, and on every keystroke in editable mode. */
  onSelect?: () => void;
  /** Builds one option element (default: a div with the label). */
  renderOption?: (value: string, label: string) => HTMLElement;
  /** Class added to the highlighted option besides data-active. */
  activeClass?: string;
  /** Home and End keys in open select lists. */
  homeEnd?: boolean;
  /** Status line shown when a search finds nothing. */
  emptyText?: string;
}

export interface ListboxController {
  readonly items: HTMLElement[];
  value: string;
}

/** Combobox + listbox on an existing input and menu. `menu` needs an id. */
export declare function bindListbox(input: HTMLInputElement, menu: HTMLElement, options?: BindListboxOptions): ListboxController;

/** `<k-listbox label="…" value="…" placeholder="…" searchable>` with child <option>s. Fires `change`. */
export declare class KListbox extends HTMLElement {
  value: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "k-listbox": KListbox;
  }
}
