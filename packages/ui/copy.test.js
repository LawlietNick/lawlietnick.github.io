import { afterEach, expect, test, vi } from "vitest";
import "./copy.js";

const writeText = vi.fn();
Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
afterEach(() => vi.useRealTimers());

const mount = (html, lang = "en") => {
  document.body.innerHTML = `<div lang="${lang}">${html}</div>`;
  const copy = document.querySelector("k-copy");
  return { copy, button: copy.querySelector('[data-part="button"]'), status: copy.querySelector('[data-part="status"]') };
};
const click = async (button) => {
  button.click();
  await Promise.resolve();
  await Promise.resolve();
};

test("copies the for target, shows feedback, then resets", async () => {
  vi.useFakeTimers();
  writeText.mockResolvedValue();
  const { copy, button, status } = mount('<pre id="code">gtag()</pre><k-copy for="code"></k-copy>');
  const events = [];
  copy.addEventListener("k-copy", (e) => events.push(e.detail));
  expect(button.textContent).toBe("Copy");
  await click(button);
  expect(writeText).toHaveBeenLastCalledWith("gtag()");
  expect(button.textContent).toBe("Copied");
  expect(status.textContent).toBe("Copied");
  await click(button);
  expect(status.textContent).toBe("Copied "); // repeat differs so screen readers announce it
  expect(events).toEqual([{ ok: true, text: "gtag()" }, { ok: true, text: "gtag()" }]);
  vi.advanceTimersByTime(1500);
  expect(button.textContent).toBe("Copy");
  expect(status.textContent).toBe("");
});

test("reads a form value, a text function at click time, and reports failure in Finnish", async () => {
  writeText.mockResolvedValue();
  const { copy, button } = mount('<input id="f" value="utm_source=x"><k-copy for="f" label="Kopioi URL"></k-copy>', "fi");
  expect(button.textContent).toBe("Kopioi URL");
  await click(button);
  expect(writeText).toHaveBeenLastCalledWith("utm_source=x");
  let n = 0;
  copy.text = () => `json ${++n}`;
  writeText.mockRejectedValue(new Error("denied"));
  await click(button);
  expect(writeText).toHaveBeenLastCalledWith("json 1");
  expect(button.textContent).toBe("Yritä uudelleen");
  expect(button.dataset.state).toBe("fail");
});
