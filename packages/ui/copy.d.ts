export interface BindCopyOptions {
  /** The text to copy, or a function called at click time. */
  text?: string | (() => unknown);
  /** Leave all feedback to the caller: no label change, no status region. */
  quiet?: boolean;
  /** The idle label to restore after "Copied" (default: the button's text at first click). */
  label?: string;
}

/** Detail of the bubbling `k-copy` event. */
export interface CopyEventDetail {
  ok: boolean;
  text: string;
}

/** Copies text; resolves false when the browser refuses. */
export declare function copyText(text: string): Promise<boolean>;
/** Adds copy behaviour to an existing button, keeping its markup and classes. */
export declare function bindCopy(button: HTMLElement, options?: BindCopyOptions): void;

/** `<k-copy for="id" text="…" label="…" quiet>` */
export declare class KCopy extends HTMLElement {
  /** Text source that wins over the `text` and `for` attributes. */
  text?: string | (() => unknown);
  readonly button?: HTMLButtonElement;
  read(): string;
}

declare global {
  interface HTMLElementTagNameMap {
    "k-copy": KCopy;
  }
  interface HTMLElementEventMap {
    "k-copy": CustomEvent<CopyEventDetail>;
  }
}
