// <k-copy>: unstyled copy-to-clipboard button.
// Text source, first match wins: the `text` property (a string, or a function called at click time
// so generated output is never stale), then the element named by `for` (its value for form fields,
// otherwise its textContent).
// The button label briefly shows the result; a visually hidden status region announces it.
// Fires a bubbling `k-copy` event with detail { ok, text }.
// Parts: data-part="button|status". Built-in FI/EN labels follow the nearest `lang`; `label` overrides the idle one.

const STRINGS = {
  en: { copy: "Copy", done: "Copied", fail: "Try again" },
  fi: { copy: "Kopioi", done: "Kopioitu", fail: "Yritä uudelleen" },
};

// Accessibility, not styling: keeps the status out of sight but readable by screen readers.
const HIDDEN = "position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0";

export class KCopy extends HTMLElement {
  connectedCallback() {
    if (this.button) return;
    const t = STRINGS[(this.closest("[lang]")?.lang || "en").toLowerCase().startsWith("fi") ? "fi" : "en"];
    const label = this.getAttribute("label") || t.copy;
    const button = (this.button = document.createElement("button"));
    button.type = "button";
    button.dataset.part = "button";
    button.textContent = label;
    const status = document.createElement("span");
    status.dataset.part = "status";
    status.setAttribute("role", "status");
    status.style.cssText = HIDDEN;
    this.replaceChildren(button, status);

    let timer;
    button.addEventListener("click", async () => {
      const text = this.read();
      let ok = true;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        ok = false; // ponytail: no execCommand fallback; clipboard API is baseline on https and localhost
      }
      const message = ok ? t.done : t.fail;
      clearTimeout(timer);
      button.textContent = message;
      button.dataset.state = ok ? "done" : "fail";
      // VoiceOver skips a repeat of the previous message, so make repeats differ
      status.textContent = status.dataset.last === message ? `${message} ` : message;
      status.dataset.last = status.textContent;
      timer = setTimeout(() => {
        button.textContent = label;
        delete button.dataset.state;
        status.textContent = "";
      }, 1500);
      this.dispatchEvent(new CustomEvent("k-copy", { bubbles: true, detail: { ok, text } }));
    });
  }

  read() {
    if (typeof this.text === "function") return String(this.text());
    if (typeof this.text === "string") return this.text;
    const target = document.getElementById(this.getAttribute("for") || "");
    if (!target) return "";
    return "value" in target && typeof target.value === "string" ? target.value : target.textContent ?? "";
  }
}

if (!customElements.get("k-copy")) customElements.define("k-copy", KCopy);
