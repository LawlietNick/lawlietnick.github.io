// storedState(key): one localStorage entry, JSON in and out, that never throws. Storage can be blocked
// (private modes, site settings) or hold something unreadable; the page keeps working either way.
// - get(fallback): the stored value, or `fallback` when nothing is stored, it can't be read or isn't JSON.
// - set(value): stores JSON; returns false when storage refused, so the page can say saving is off.
// - remove(): deletes it; returns false when storage refused.

export function storedState(key) {
  const attempt = (action) => {
    try {
      action();
      return true;
    } catch {
      return false;
    }
  };
  return {
    get(fallback) {
      try {
        const raw = globalThis.localStorage?.getItem(key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set: (value) => attempt(() => localStorage.setItem(key, JSON.stringify(value))),
    remove: () => attempt(() => localStorage.removeItem(key)),
  };
}
