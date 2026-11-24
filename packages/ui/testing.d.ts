/** Puts markup in document.body and returns the body. */
export declare function mount(html: string): HTMLElement;
/** Dispatches a bubbling, cancelable keydown; returns false when a handler called preventDefault. */
export declare function press(target: EventTarget, key: string, modifiers?: KeyboardEventInit): boolean;
/** Sets the value and fires a bubbling `input` event. */
export declare function type(input: HTMLInputElement | HTMLTextAreaElement, text: string): void;
/** The control's name from aria-labelledby, aria-label, <label>, text, title or an img alt. */
export declare function accessibleName(el: Element): string;
/** Visible controls with no accessible name. */
export declare function unnamedControls(root: ParentNode): Element[];
