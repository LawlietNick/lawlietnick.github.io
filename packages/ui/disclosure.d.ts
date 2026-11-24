export interface BindDisclosureOptions {
  /** Popup menu: Escape, outside click and focus leaving close it. */
  popup?: boolean;
  /** Holds both trigger and panel (default: the trigger's parent). */
  root?: HTMLElement;
  /** Disclosures with the same group name close each other. */
  group?: string;
  /** Arrow, Home and End keys between the panel's links and buttons (default: `popup`). */
  arrows?: boolean;
  /** Close when focus leaves `root` (default: `popup`). */
  focusOut?: boolean;
  /** Runs on every change. */
  onToggle?: (open: boolean) => void;
}

export interface DisclosureController {
  readonly open: boolean;
  readonly trigger: HTMLElement;
  readonly root: HTMLElement;
  /** Flips the state, or sets it to `force`. Also calls onToggle. */
  toggle(force?: boolean): void;
}

export declare function bindDisclosure(trigger: HTMLElement, panel: HTMLElement, options?: BindDisclosureOptions): DisclosureController;

/** `<k-disclosure popup open group="…">` with a child <button> and a child [data-panel]. */
export declare class KDisclosure extends HTMLElement {
  open: boolean;
  toggle(force?: boolean): void;
}

declare global {
  interface HTMLElementTagNameMap {
    "k-disclosure": KDisclosure;
  }
  interface HTMLElementEventMap {
    "k-toggle": CustomEvent<{ open: boolean }>;
  }
}
