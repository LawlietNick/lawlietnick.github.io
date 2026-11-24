// Copy to clipboard, three ways:
// - copyText(text): the one clipboard call; resolves true or false. Falls back to execCommand only
//   where the Clipboard API is missing, so a denied permission is never reported as success.
// - bindCopy(button, { text, quiet, label }): copy behaviour on an existing button, keeping its markup
//   and classes. `text` is a string or a function called at click time. By default the button label
//   briefly shows the result and a visually hidden status region announces it; `quiet` leaves all
//   feedback to the caller. Either way the button fires a bubbling `k-copy` event with detail { ok, text }.
// - <k-copy>: the declarative element. Wraps an existing child <button> or creates one. Text source,
//   first match wins: the `text` property (string or function), the `text` attribute, then the element
//   named by `for` (its value for form fields, otherwise its textContent). Attributes: label, quiet.
// Built-in FI/EN labels follow the nearest `lang`. Parts: data-part="button|status".

const STRINGS = {
  en: { copy: "Copy", done: "Copied", fail: "Try again" },
  fi: { copy: "Kopioi", done: "Kopioitu", fail: "Yritä uudelleen" },
};

// Accessibility, not styling: keeps the status out of sight but readable by screen readers.
const HIDDEN = "position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0";

const strings = (node) => STRINGS[(node.closest("[lang]")?.lang || "en").toLowerCase().startsWith("fi") ? "fi" : "en"];

export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.style.cssText = "position:fixed;opacity:0";
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function bindCopy(button, { text = "", quiet = false, label } = {}) {
  let status;
  let timer;
  if (!quiet) {
    status = document.createElement("span");
    status.dataset.part = "status";
    status.setAttribute("role", "status");
    status.style.cssText = HIDDEN;
    button.after(status);
  }
  button.addEventListener("click", async () => {
    const value = String(typeof text === "function" ? text() : text);
    const ok = await copyText(value);
    if (!quiet) {
      const t = strings(button);
      const idle = label ?? button.textContent;
      const message = ok ? t.done : t.fail;
      clearTimeout(timer);
      if (!button.dataset.state) button.dataset.idle = idle; // remember the label once, not "Copied"
      button.textContent = message;
      button.dataset.state = ok ? "done" : "fail";
      // VoiceOver skips a repeat of the previous message, so make repeats differ
      status.textContent = status.dataset.last === message ? `${message} ` : message;
      status.dataset.last = status.textContent;
      timer = setTimeout(() => {
        button.textContent = button.dataset.idle;
        delete button.dataset.state;
        status.textContent = "";
      }, 1500);
    }
    button.dispatchEvent(new CustomEvent("k-copy", { bubbles: true, detail: { ok, text: value } }));
  });
}

export class KCopy extends HTMLElement {
  connectedCallback() {
    if (this.button) return;
    let button = this.querySelector(":scope > button");
    if (!button) {
      button = document.createElement("button");
      button.textContent = this.getAttribute("label") || strings(this).copy;
      this.replaceChildren(button);
    }
    button.type = "button";
    button.dataset.part = "button";
    this.button = button;
    bindCopy(button, { text: () => this.read(), quiet: this.hasAttribute("quiet") });
  }

  read() {
    if (typeof this.text === "function") return String(this.text());
    if (typeof this.text === "string") return this.text;
    if (this.hasAttribute("text")) return this.getAttribute("text");
    const target = document.getElementById(this.getAttribute("for") || "");
    if (!target) return "";
    return "value" in target && typeof target.value === "string" ? target.value : target.textContent ?? "";
  }
}

if (!customElements.get("k-copy")) customElements.define("k-copy", KCopy);
