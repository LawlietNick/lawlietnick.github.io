export interface BindToggleGroupOptions {
  /** Names a button (default: button.value). */
  getValue?: (button: HTMLButtonElement) => string;
  /** Runs on every press, also a repeat press of the pressed button; never for select() from code. */
  onPress?: (value: string) => void;
  /** Adds role="group" and this aria-label. */
  label?: string;
}

export interface ToggleGroupController {
  /** Presses the matching button; null presses none. */
  select(value: string | null): void;
  readonly value: string;
}

/** Single-choice aria-pressed buttons inside `group`. */
export declare function bindToggleGroup(group: HTMLElement, options?: BindToggleGroupOptions): ToggleGroupController;

/** `<k-toggle-group label="…" value="…">` with child <button value>s. Fires `change` when the choice changes. */
export declare class KToggleGroup extends HTMLElement {
  value: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "k-toggle-group": KToggleGroup;
  }
}
