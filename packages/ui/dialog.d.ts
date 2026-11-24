export interface BindDialogOptions {
  /** The element to focus on open (default: the dialog). */
  initialFocus?: () => HTMLElement | null | undefined;
  /** Native <dialog> only: close on a backdrop click (default true). */
  closeOnBackdrop?: boolean;
  /** Non-native dialogs only: elements made inert while open. */
  inertRoots?: HTMLElement[];
  /** Runs on every open and close. */
  onToggle?: (open: boolean) => void;
}

export interface DialogController {
  readonly isOpen: boolean;
  /** Opens the dialog; `opener` gets focus back on close (default: the focused element). */
  open(opener?: Element | null): void;
  close(options?: { restoreFocus?: boolean }): void;
}

/** Modal behaviour for a native <dialog> or any element with role="dialog". */
export declare function bindDialog(dialog: HTMLElement, options?: BindDialogOptions): DialogController;
