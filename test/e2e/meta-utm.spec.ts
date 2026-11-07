import { expect, test, type Page } from "@playwright/test";

const path = "/fi/tyokalut/metan-utm-rimpsu/";
const defaultString =
  "utm_source={{site_source_name}}&utm_medium=paidsocial&utm_source_platform=Meta%20Ads&utm_campaign={{campaign.name}}&utm_id={{campaign.id}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_marketing_tactic=prospecting&utm_creative_format=video";

const previewKeys = (page: Page) => page.locator("[data-preview] .mu__key").allTextContents();

test("builds the default string, previews the same parameters and copies it", async ({ page }) => {
  await page.goto(path);
  await expect(page.locator("[data-out]")).toHaveText(defaultString);
  expect(await previewKeys(page)).toEqual(defaultString.split("&").map((pair) => pair.split("=")[0]));

  await page.getByRole("button", { name: "Kopioi rimpsu" }).click();
  await expect(page.locator("[data-copy-status]")).toHaveText("Rimpsu kopioitu leikepöydälle.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(defaultString);
});

test("choices update the string, the preview and the parameter list together", async ({ page }) => {
  await page.goto(path);
  await page.getByLabel(/Millainen kampanja on/).selectOption("remarketing");
  await page.getByLabel(/Minkä muotoinen mainos on/).selectOption("{{media_type}}");
  await page.getByRole("radio", { name: /Näyttöpaikkaa/ }).check();

  const out = page.locator("[data-out]");
  await expect(out).toContainText("utm_term={{placement}}");
  await expect(out).toContainText("utm_marketing_tactic=remarketing");
  await expect(out).toContainText("utm_creative_format={{media_type}}");
  await expect(page.locator("[data-preview]")).toContainText("instagram_stories");
  await expect(page.locator("[data-preview]")).toContainText("Meta ei listaa tämän makron arvoja");

  await page.getByRole("radio", { name: /Ei kumpaakaan/ }).check();
  await expect(out).not.toContainText("utm_term");
  expect(await previewKeys(page)).not.toContain("utm_term");
  await page.getByText("Näytä parametrit eriteltynä").click();
  await expect(page.locator("[data-parts]")).not.toContainText("utm_term");
  await expect(page.locator("[data-term-report]")).toContainText("fb");
});

test("advanced settings stay editable, and an empty one drops its parameter", async ({ page }) => {
  await page.goto(path);
  await expect(page.locator("details.mu__advanced")).not.toHaveAttribute("open", "");
  await page.getByText("Lisäasetukset").click();
  await page.getByLabel(/Hallinta-alusta/).fill("Meta & Co");
  await expect(page.locator("[data-out]")).toContainText("utm_source_platform=Meta%20%26%20Co");
  await page.getByLabel(/Kanavatyyppi/).fill("");
  await expect(page.locator("[data-out]")).not.toContainText("utm_medium");
  expect(await previewKeys(page)).not.toContain("utm_medium");
});

test("directory finds a value by technical value and plain name and filters", async ({ page }) => {
  await page.goto(path);
  const search = page.getByLabel("Hae arvoa");
  const names = () => page.locator(".mu__entry td:nth-child(2) .mu__code").allTextContents();

  await search.fill("instagram_stories");
  // the ig source row mentions Stories in its explanation, so it matches too
  await expect(page.locator("[data-count]")).toHaveText("2 arvoa");
  expect((await names()).sort()).toEqual(["ig", "instagram_stories"]);

  await search.fill("Stories");
  expect(await names()).toContain("instagram_stories");

  await search.fill("threads");
  expect((await names()).sort()).toEqual(["th", "threads_stream"]);

  await search.fill("ei-ole-olemassa");
  await expect(page.locator("[data-empty]")).toBeVisible();
  await expect(page.locator(".mu__entry")).toHaveCount(0);
});

test("works after ClientRouter navigation, also on a second visit", async ({ page }) => {
  await page.goto("/fi/tyokalut/");
  for (let visit = 0; visit < 2; visit++) {
    await page.locator('a[href="/fi/tyokalut/metan-utm-rimpsu/"]').first().click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.locator("[data-out]")).toHaveText(defaultString);
    await page.getByRole("radio", { name: /Näyttöpaikkaa/ }).check();
    await expect(page.locator("[data-out]")).toContainText("utm_term={{placement}}");
    await page.getByLabel("Hae arvoa").fill("th");
    await expect(page.locator(".mu__entry").first()).toBeVisible();
    expect(await page.locator("[data-meta-utm]").count()).toBe(1);
    await page.goBack();
    await expect(page).toHaveURL(/\/fi\/tyokalut\/$/);
  }
});

test("mobile layout has no horizontal scroll and the tool is usable by keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  const radio = page.getByRole("radio", { name: /Mainosjoukkoa/ });
  await radio.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: /Näyttöpaikkaa/ })).toBeChecked();
  await expect(page.locator("[data-out]")).toContainText("utm_term={{placement}}");

  await page.getByLabel("Hae arvoa").fill("feed");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  for (const status of ["[data-copy-status]", "[data-count]"]) {
    await expect(page.locator(status)).toHaveAttribute("role", "status");
  }
});

test("renders in light and dark themes with readable text", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto(path);
    const contrast = await page.locator(".mu__meaning").first().evaluate((node) => {
      // Resolve any CSS colour (including color-mix and light-dark) to sRGB through a canvas.
      const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
      const rgba = (css: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        return [...ctx.getImageData(0, 0, 1, 1).data];
      };
      const luminance = ([r, g, b]: number[]) => {
        const [R, G, B] = [r, g, b].map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
      };
      let background: number[] = [0, 0, 0, 0];
      for (let el: HTMLElement | null = node as HTMLElement; el && background[3] < 255; el = el.parentElement) {
        const layer = rgba(getComputedStyle(el).backgroundColor);
        if (layer[3] > 0) background = background[3] === 0 ? layer : background;
      }
      const a = luminance(rgba(getComputedStyle(node).color));
      const b = luminance(background);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    });
    expect(contrast, colorScheme).toBeGreaterThan(4.5);
  }
});

test("sections follow the agreed order", async ({ page }) => {
  await page.goto(path);
  const ids = await page.locator("[data-meta-utm] > section").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("aria-labelledby")));
  expect(ids).toEqual(["mu-build", "mu-preview", "mu-dir", "mu-tech"]);
});

test("desktop: choices and result sit side by side, copy is in the first screen, extras are closed", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(path);
  await page.locator(".mu__build").scrollIntoViewIfNeeded();
  const box = async (selector: string) => (await page.locator(selector).boundingBox())!;
  const choices = await box(".mu__choices");
  const result = await box(".mu__result");
  expect(result.x).toBeGreaterThan(choices.x + choices.width - 1);
  expect(Math.abs(result.y - choices.y)).toBeLessThan(40);
  const copy = await box("[data-copy]");
  expect(copy.y + copy.height).toBeLessThanOrEqual(800);
  expect((await box(".mu__build")).height).toBeLessThan(560);
  await expect(page.locator("details.mu__advanced")).not.toHaveAttribute("open", "");
  await expect(page.locator("details.mu__parts")).not.toHaveAttribute("open", "");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("mobile: one column, result and full-width copy come right after the three choices", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  const top = async (selector: string) => (await page.locator(selector).first().boundingBox())!.y + (await page.evaluate(() => scrollY));
  const order = [await top("[data-tactic]"), await top("[data-format]"), await top("[data-term]"), await top("[data-out]"), await top("[data-copy]"), await top("details.mu__advanced"), await top("#mu-preview")];
  expect(order).toEqual([...order].sort((a, b) => a - b));
  const copy = (await page.locator("[data-copy]").boundingBox())!;
  const out = (await page.locator("[data-out]").boundingBox())!;
  expect(copy.width).toBeGreaterThan(out.width * 0.95);
});

test("a very long string stays inside a bounded, scrollable area and is copied in full", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  await page.getByText("Lisäasetukset").click();
  await page.getByLabel(/Kanavatyyppi/).fill("x".repeat(400));
  const out = page.locator("[data-out]");
  const metrics = await out.evaluate((node) => ({ client: node.clientHeight, scroll: node.scrollHeight }));
  expect(metrics.client).toBeLessThanOrEqual(160);
  expect(metrics.scroll).toBeGreaterThan(metrics.client);
  await expect(out).toHaveAttribute("tabindex", "0");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Kopioi rimpsu" }).click();
  await expect(page.locator("[data-copy-status]")).toHaveText("Rimpsu kopioitu leikepöydälle.");
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("utm_medium=" + "x".repeat(400));
  expect(copied).toBe(await out.evaluate((node) => node.textContent));
});

test("a failed copy says so", async ({ page }) => {
  await page.goto(path);
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("denied")) }, configurable: true }));
  await page.getByRole("button", { name: "Kopioi rimpsu" }).click();
  await expect(page.locator("[data-copy-status]")).toContainText("Kopiointi ei onnistunut");
});

test("directory is a three-column table with the agreed headers", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(path);
  const table = page.getByRole("table", { name: "Metan arvohakemisto" });
  await expect(table.getByRole("columnheader")).toHaveText(["Variable", "Value", "Selite"]);
  await page.getByLabel("Hae arvoa").fill("instagram_stories");
  const cells = table.locator("tbody tr").filter({ hasText: "placement" }).first().getByRole("cell");
  await expect(cells.nth(0)).toContainText("placement");
  await expect(cells.nth(1)).toContainText("instagram_stories");
  await expect(cells.nth(2)).toContainText("koko näytön pystysuuntaisessa esitysmuodossa");
  const widths = await page.locator(".mu__table th").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().width));
  expect(widths[2]).toBeGreaterThan(widths[0]);
  expect(widths[2]).toBeGreaterThan(widths[1]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("the explanation column is searchable", async ({ page }) => {
  await page.goto(path);
  await page.getByLabel("Hae arvoa").fill("palkinnosta");
  await expect(page.locator(".mu__entry")).toHaveCount(1);
  await expect(page.locator(".mu__entry")).toContainText("audience_network_rewarded_video");
});

test("mobile: table rows stack with labelled cells and no horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  await page.getByLabel("Hae arvoa").fill("instagram_stories");
  const row = page.locator(".mu__entry").first();
  const cells = row.locator("td");
  await expect(cells).toHaveCount(3);
  expect(await cells.evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).display))).toEqual(["block", "block", "block"]);
  expect(await cells.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-label")))).toEqual(["Variable", "Value", "Selite"]);
  const tops = await cells.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top));
  expect(tops).toEqual([...tops].sort((a, b) => a - b));
  expect(new Set(tops).size).toBe(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page.getByRole("table", { name: "Metan arvohakemisto" })).toBeVisible();
});

test("opening the parameter list does not resize the input fields", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(path);
  const heights = () => page.locator(".mu__choices select, .mu__radios").evaluateAll((nodes) => nodes.map((node) => Math.round(node.getBoundingClientRect().height)));
  const before = await heights();
  await page.getByText("Näytä parametrit eriteltynä").click();
  expect(await heights()).toEqual(before);
});
