import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const path = "/fi/tyokalut/ga4-annotaatiot/";

test("suggestions open, close and complete without moving the date and color guidance", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    if (width < 760) await page.getByLabel("Kategoria", { exact: true }).selectOption("ADS");
    else await page.locator('input[value="ADS"]').check();
    const positions = () => page.locator('.annotation-instructions').evaluateAll((items) => items.map((item) => item.getBoundingClientRect().top + scrollY));
    const before = await positions();
    const description = page.getByLabel("Kuvaus", { exact: true });
    await description.fill("Kampanja kohdistettiin");
    await expect(page.locator('[data-suggestions]')).toBeVisible();
    expect(await positions()).toEqual(before);
    await page.getByRole('button', { name: 'Sulje', exact: true }).click();
    await expect(page.locator('[data-suggestions]')).toBeHidden();
    expect(await positions()).toEqual(before);
    await page.getByRole('button', { name: 'Ehdotukset', exact: true }).click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(description).toHaveValue('Kampanja kohdistettiin uusille asiakkaille.');
    expect(await positions()).toEqual(before);
  }
});

test("creates and copies an annotation, including a completed description placeholder", async ({ page }) => {
  await page.goto(path);
  const title = page.getByLabel("Otsikko (pakollinen)");
  const description = page.getByLabel("Kuvaus", { exact: true });
  await expect(title).toHaveValue("Uutiskirje: [aihe]");
  await expect(page.getByRole("button", { name: "Kopioi otsikko" })).toBeDisabled();
  await title.fill("Uutiskirje: Black Friday");
  await page.getByRole("button", { name: "Kopioi otsikko" }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("[MPR] Uutiskirje: Black Friday");
  await description.focus();
  await page.getByRole("button", { name: "Uutiskirje lähetettiin [kohderyhmälle].", exact: true }).click();
  await expect(page.getByRole("button", { name: "Kopioi kuvaus" })).toBeDisabled();
  await page.keyboard.insertText("tilaajille");
  await expect(description).toHaveValue("Uutiskirje lähetettiin tilaajille.");
  await page.getByRole("button", { name: "Kopioi kuvaus" }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("Uutiskirje lähetettiin tilaajille.");
  await expect(page.locator("[data-status]")).toHaveText("Kuvaus kopioitu.");
});

test("completes a typed sentence by keyboard and enforces GA4 character limits", async ({ page }) => {
  await page.goto(path);
  await page.getByRole("radio", { name: "Mainonta [ADS]" }).check();
  await expect(page.locator("[data-color-name]")).toHaveText("Turkoosi");
  const description = page.getByLabel("Kuvaus", { exact: true });
  await description.fill("Kampanja kohdistettiin");
  await description.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(description).toHaveValue("Kampanja kohdistettiin uusille asiakkaille.");
  await expect(description).toBeFocused();
  const title = page.getByLabel("Otsikko (pakollinen)");
  await title.fill("x".repeat(54));
  await expect(page.locator("[data-title-count]")).toHaveText("60 / 60");
  await expect(page.getByRole("button", { name: "Kopioi otsikko" })).toBeEnabled();
  await title.fill("x".repeat(55));
  await expect(title).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("button", { name: "Kopioi otsikko" })).toBeDisabled();
  await description.fill("x".repeat(150));
  await expect(page.getByRole("button", { name: "Kopioi kuvaus" })).toBeEnabled();
  await page.getByRole("button", { name: "Ehdotukset", exact: true }).click();
  await expect(page.locator("[data-suggestion-list] button:enabled")).toHaveCount(0);
  await description.fill("x".repeat(151));
  await expect(page.getByRole("button", { name: "Kopioi kuvaus" })).toBeDisabled();
  await expect(description).toHaveValue("x".repeat(151));
});

test("switches output language, remembers it and preserves drafts and custom wording", async ({ page }) => {
  await page.goto(path);
  const title = page.getByLabel("Otsikko (pakollinen)");
  const description = page.getByLabel("Kuvaus", { exact: true });
  await page.getByRole("radio", { name: "English", exact: true }).check();
  await expect(title).toHaveValue("Newsletter: [topic]");
  await description.focus();
  await expect(page.getByRole("button", { name: "Newsletter sent to [audience].", exact: true })).toBeVisible();
  await title.fill("Oma otsikko");
  await description.fill("Omat havainnot säilyvät.");
  await page.getByRole("radio", { name: "Suomi", exact: true }).check();
  await expect(title).toHaveValue("Oma otsikko");
  await expect(description).toHaveValue("Omat havainnot säilyvät.");
  await page.getByLabel("Tapahtumapohja").selectOption("pr");
  await expect(title).toHaveValue("Tiedote julkaistu: [aihe]");
  await page.getByLabel("Tapahtumapohja").selectOption("newsletter");
  await expect(title).toHaveValue("Oma otsikko");
  await expect(description).toHaveValue("Omat havainnot säilyvät.");
  await page.getByRole("radio", { name: "English", exact: true }).check();
  await page.reload();
  await expect(title).toHaveValue("Newsletter: [topic]");
  await expect(page.locator("html")).toHaveAttribute("lang", "fi");
});

test("handles clipboard rejection honestly and allows manual copying", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("denied")) } }));
  await page.goto(path);
  const description = page.getByLabel("Kuvaus", { exact: true });
  await description.fill("Muutos julkaistiin GTM:ssä.");
  await page.getByRole("button", { name: "Kopioi kuvaus" }).click();
  await expect(page.locator("[data-status]")).toContainText("Kopiointi ei onnistunut");
  await expect(description).toBeFocused();
  expect(await description.evaluate((el: HTMLTextAreaElement) => el.selectionEnd - el.selectionStart)).toBe("Muutos julkaistiin GTM:ssä.".length);
});

test("is discoverable only on the Finnish hub and works after client navigation", async ({ page }) => {
  await page.goto("/fi/tyokalut/");
  await page.getByRole("link", { name: /GA4-annotaatiotyökalu/ }).click();
  await expect(page.getByLabel("Otsikko (pakollinen)")).toHaveValue("Uutiskirje: [aihe]");
  await page.getByRole("radio", { name: "Analytiikan ja seurannan muutokset [DATA]" }).check();
  await expect(page.locator("[data-prefix]")).toHaveText("[DATA]");
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(0);
  await page.goto("/tools/");
  await expect(page.getByRole("link", { name: /GA4-annotaatiotyökalu/ })).toHaveCount(0);
});

test("renders the active writing flow on desktop and mobile in both themes", async ({ page }) => {
  await mkdir(".impeccable/review", { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto(path);
  await page.addStyleTag({ content: "astro-dev-toolbar { display: none !important; }" });
  await page.evaluate(() => { document.documentElement.style.colorScheme = "light"; });
  await page.getByRole("radio", { name: "Mainonta [ADS]" }).check();
  await page.getByLabel("Otsikko (pakollinen)").fill("Meta-kampanja: Syksyn uutuudet");
  await page.getByLabel("Kuvaus", { exact: true }).fill("Kampanja kohdistettiin");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: ".impeccable/review/ga4-desktop.png", fullPage: true });
  await page.evaluate(() => { document.documentElement.style.colorScheme = "dark"; });
  await page.screenshot({ path: ".impeccable/review/ga4-desktop-dark.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { document.documentElement.style.colorScheme = "light"; });
  await page.screenshot({ path: ".impeccable/review/ga4-mobile.png", fullPage: true });
  await page.evaluate(() => { document.documentElement.style.colorScheme = "dark"; });
  await page.screenshot({ path: ".impeccable/review/ga4-mobile-dark.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});


test("dismissal survives typing and returning to a draft; arrows keep editing text", async ({ page }) => {
  await page.goto(path);
  const description = page.getByLabel("Kuvaus", { exact: true });
  await description.fill("Ensimmäinen rivi\nToinen rivi");
  await description.press("Escape");
  await description.press("Home");
  await description.press("ArrowUp");
  await expect(description).toBeFocused();
  await page.keyboard.insertText("Lisäys ");
  await expect(page.locator('[data-suggestions]')).toBeHidden();
  await description.press("ArrowDown");
  await expect(description).toBeFocused();
  await expect(page.locator('[data-suggestions]')).toBeHidden();
  await page.getByLabel("Tapahtumapohja").selectOption("pr");
  await page.getByLabel("Tapahtumapohja").selectOption("newsletter");
  await description.focus();
  await expect(page.locator('[data-suggestions]')).toBeHidden();
  await page.getByRole("button", { name: "Ehdotukset", exact: true }).click();
  await expect(page.locator('[data-suggestions]')).toBeVisible();
  await expect(page.getByRole("button", { name: "Ehdotukset", exact: true })).toHaveAttribute("aria-expanded", "true");
});

test("language changes preserve draft language and mobile category controls stay in sync", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  await page.getByLabel("Kategoria", { exact: true }).selectOption("ADS");
  await page.getByLabel("Tapahtumapohja").selectOption("offline");
  const title = page.getByLabel("Otsikko (pakollinen)");
  await expect(title).toHaveValue("Offline-mainonta: [kampanja]");
  await expect(page.locator('[data-color-name]')).toHaveText("Turkoosi");
  await title.fill("Radio: [INC-123]");
  await page.getByRole("radio", { name: "English", exact: true }).check();
  await expect(title).toHaveValue("Radio: [INC-123]");
  await expect(title).not.toHaveAttribute("lang", "en");
  await expect(page.getByRole("button", { name: "Kopioi otsikko" })).toBeEnabled();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole("radio", { name: "Mainonta [ADS]" })).toBeChecked();
});


test("compact layout fits narrow screens and popups clear the header in short viewports", async ({ page }) => {
  for (const width of [320, 390, 760, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390) {
      const title = await page.locator('[data-title]').boundingBox();
      expect(title!.y + title!.height).toBeLessThan(844);
      await page.screenshot({ path: '.impeccable/review/ga4-mobile-initial.png' });
    }
  }
  await page.setViewportSize({ width: 390, height: 400 });
  await page.getByRole('button', { name: 'Ehdotukset', exact: true }).click();
  await expect(page.locator('[data-suggestions]')).toBeVisible();
  const popup = await page.locator('[data-suggestions]').boundingBox();
  const header = await page.locator('[data-site-header]').boundingBox();
  expect(popup!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
  const close = await page.getByRole('button', { name: 'Sulje', exact: true }).boundingBox();
  expect(close!.y + close!.height).toBeLessThan(400);
  await page.getByRole('button', { name: 'Sulje', exact: true }).click();
  await page.setViewportSize({ width: 320, height: 844 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  expect(await page.locator('[data-annotation-builder]').evaluate((root) => [...root.querySelectorAll('*')].every((el) => el.getBoundingClientRect().right <= innerWidth))).toBe(true);
});
