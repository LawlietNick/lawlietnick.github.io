import { afterEach, expect, test, vi } from "vitest";
import { announce, nextMessage } from "./status.js";
import { storedState } from "./storage.js";
import { downloadFile } from "./download.js";

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

test("announce makes a repeated message differ and clears with an empty string", () => {
  const region = document.createElement("p");
  announce(region, "Copied");
  expect(region.textContent).toBe("Copied");
  announce(region, "Copied");
  expect(region.textContent).toBe("Copied ");
  announce(region, "Copied");
  expect(region.textContent).toBe("Copied");
  announce(region, "");
  expect(region.textContent).toBe("");
  expect(nextMessage("Saved", "Saved")).toBe("Saved ");
  expect(nextMessage("Saved ", "Saved")).toBe("Saved");
});

test("storedState round-trips JSON and falls back instead of throwing", () => {
  const store = storedState("k-test");
  expect(store.get("none")).toBe("none");
  expect(store.set({ a: 1 })).toBe(true);
  expect(store.get()).toEqual({ a: 1 });
  localStorage.setItem("k-test", "{broken");
  expect(store.get(0)).toBe(0);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
  vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => { throw new Error("blocked"); });
  expect(store.set(1)).toBe(false);
  expect(store.remove()).toBe(false);
});

test("downloadFile clicks a link named after the file and releases the URL later", async () => {
  URL.createObjectURL = vi.fn(() => "blob:x");
  URL.revokeObjectURL = vi.fn();
  const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function () {
    expect(this.download).toBe("a.json");
    expect(this.href).toBe("blob:x");
  });
  downloadFile("{}", "a.json", "application/json");
  expect(click).toHaveBeenCalledOnce();
  expect(URL.revokeObjectURL).not.toHaveBeenCalled();
  await new Promise((r) => setTimeout(r, 0));
  expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:x");
});
