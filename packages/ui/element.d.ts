/** HTMLElement in the browser, an empty stand-in class on a server. */
export declare const ElementBase: typeof HTMLElement;
/** Registers a custom element once, and only where `customElements` exists. */
export declare function define(name: string, constructor: CustomElementConstructor): void;
