// Modal dialog behaviour on existing markup: bindDialog(dialog, { initialFocus, closeOnBackdrop, inertRoots, trapFocus, onToggle }).
// - A native <dialog> uses showModal(), so the browser provides the top layer, the inert page and Escape.
//   A click on the backdrop (the dialog element itself) closes it unless closeOnBackdrop is false.
// - Any other element (e.g. a div with role="dialog" aria-modal="true" and its own open animation) gets
//   the same contract by hand: `inertRoots` are made inert while it is open, Tab and Shift+Tab stay inside
//   it, and Escape closes it.
// - `trapFocus` keeps Tab inside a native <dialog> too, which browsers let move on to their own toolbar.
// Opening remembers the opener (default: the focused element) and focuses `initialFocus()` (default: the
// dialog). Closing returns focus to the opener unless the caller already moved focus elsewhere, or passes
// { restoreFocus: false }. `onToggle(open)` runs on every change, for classes and attributes the markup needs.
// Returns { open(opener), close({ restoreFocus }), isOpen }. No text of its own, so no FI/EN strings.

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// focus now, and once more on the next frame for panels that only become focusable when an open class applies
function focusSoon(element) {
  element?.focus();
  if (element && document.activeElement !== element) requestAnimationFrame(() => element.focus());
}

export function bindDialog(dialog, { initialFocus = () => dialog, closeOnBackdrop = true, inertRoots = [], trapFocus, onToggle = () => {} } = {}) {
  const native = typeof HTMLDialogElement !== "undefined" && dialog instanceof HTMLDialogElement;
  let opener = null;
  let open = native ? dialog.open : false;
  let restoreOnClose = true;
  const trap = trapFocus ?? !native;

  // Only return focus when nothing else took it: an action that closed the dialog may have moved focus on purpose.
  const focusLost = () => !document.activeElement || document.activeElement === document.body || dialog.contains(document.activeElement);
  const finishClose = () => {
    open = false;
    onToggle(false);
    if (restoreOnClose && opener?.isConnected && focusLost()) focusSoon(opener);
    restoreOnClose = true;
  };

  if (native) {
    dialog.addEventListener("close", finishClose);
    if (closeOnBackdrop) dialog.addEventListener("click", (event) => event.target === dialog && controller.close());
  }
  dialog.addEventListener("keydown", (event) => {
    if (!open) return;
    if (event.key === "Escape" && !native) {
      event.preventDefault();
      controller.close();
      return;
    }
    if (event.key !== "Tab" || !trap) return;
    const items = [...dialog.querySelectorAll(FOCUSABLE)].filter((el) => !el.closest("[hidden]"));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  const controller = {
    get isOpen() {
      return open;
    },
    open(from = document.activeElement) {
      if (open) return;
      opener = from;
      open = true;
      if (native) dialog.showModal();
      else inertRoots.forEach((el) => (el.inert = true));
      onToggle(true);
      focusSoon(initialFocus());
    },
    close({ restoreFocus = true } = {}) {
      if (!open) return;
      restoreOnClose = restoreFocus;
      if (native) {
        dialog.close(); // the close event finishes the job, also for Escape
      } else {
        inertRoots.forEach((el) => (el.inert = false));
        finishClose();
      }
    },
  };
  return controller;
}
