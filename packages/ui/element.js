// Lets every module load on a server (SSR, Node tests): the custom element classes extend a stand-in
// there and are only registered where a browser provides customElements.
export const ElementBase = globalThis.HTMLElement ?? class {};

export function define(name, constructor) {
  if (globalThis.customElements && !customElements.get(name)) customElements.define(name, constructor);
}
