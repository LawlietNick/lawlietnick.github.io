import { expect, test, type Page } from "@playwright/test";

const article = "/fi/blog/mckinsey-tyylinen-esitys-chatgpt-gemini/";
const source = "/images/blog/mckinsey-analysoiva-dia-fi.jpeg";

async function openImage(page: Page) {
  const trigger = page.locator("figure[data-image-modal] .image-modal-trigger").nth(1);
  await expect(trigger).toBeVisible();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Kuvan tarkastelu" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".image-modal__image")).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Suurenna", exact: true })).toBeEnabled();
  return { dialog, trigger };
}

test("image links have no text-link decorations at rest, on hover or on focus", async ({ page }) => {
  await page.goto(article);
  const trigger = page.locator(".image-modal-trigger").nth(1);
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => { document.documentElement.style.colorScheme = value; }, theme);
      await trigger.scrollIntoViewIfNeeded();
      for (const state of ["rest", "hover", "focus"]) {
        if (state === "hover") await trigger.hover();
        if (state === "focus") await trigger.focus();
        await expect(trigger).toHaveCSS("display", "block");
        await expect(trigger).toHaveCSS("background-image", "none");
        await expect(trigger).toHaveCSS("box-shadow", "none");
        await expect(trigger).toHaveCSS("padding", "0px");
      }
      await trigger.blur();
      await page.mouse.move(0, 0);
    }
  }
});

test("only selected images open, fit, trap focus and restore the reading position", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(article);
  await expect(page.locator(".article-hero__visual-panel .image-modal-trigger")).toHaveCount(0);
  await expect(page.locator(".image-modal-trigger")).toHaveCount(2);
  const trigger = page.locator(".image-modal-trigger").nth(1);
  await trigger.scrollIntoViewIfNeeded();
  const scroll = await page.evaluate(() => window.scrollY);
  const { dialog } = await openImage(page);
  await expect(dialog.locator("img")).toHaveAttribute("src", new RegExp(source.replaceAll("/", "\\/")));
  const fits = await dialog.evaluate((element) => {
    const stage = element.querySelector(".image-modal__viewport")!.getBoundingClientRect();
    const image = element.querySelector("img")!.getBoundingClientRect();
    return image.left >= stage.left && image.right <= stage.right && image.top >= stage.top && image.bottom <= stage.bottom;
  });
  expect(fits).toBe(true);
  for (let index = 0; index < 8; index++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(scroll, 0);
  await expect(page.locator("html")).not.toHaveClass(/image-modal-open/);
  await page.getByRole("link", { name: "Suurenna analysoiva dia", exact: true }).click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Sulje", exact: true }).click();
  await expect(page.getByRole("link", { name: "Suurenna analysoiva dia", exact: true })).toBeFocused();
  expect(errors).toEqual([]);
});

test("zoom, mouse drag, keyboard panning and fit work without scrolling the page", async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 800 });
  await page.goto(article);
  const { dialog } = await openImage(page);
  const image = dialog.locator("img");
  const initialWidth = await image.evaluate((element) => element.getBoundingClientRect().width);
  await dialog.getByRole("button", { name: "Suurenna", exact: true }).click();
  await dialog.getByRole("button", { name: "Suurenna", exact: true }).click();
  expect(await image.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(initialWidth * 2);
  const stage = dialog.locator(".image-modal__viewport");
  const bounds = await stage.boundingBox();
  if (!bounds) throw new Error("Missing image viewport");
  const before = await image.getAttribute("style");
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2 + 100, bounds.y + bounds.height / 2, { steps: 5 });
  await page.mouse.up();
  expect(await image.getAttribute("style")).not.toBe(before);
  await stage.focus();
  const dragged = await image.getAttribute("style");
  await page.keyboard.press("ArrowRight");
  expect(await image.getAttribute("style")).not.toBe(dragged);
  await dialog.getByRole("button", { name: "Sovita ruutuun" }).click();
  await expect(dialog.getByRole("button", { name: "Pienennä", exact: true })).toBeDisabled();
  expect(await image.evaluate((element) => element.getBoundingClientRect().width)).toBeCloseTo(initialWidth, 0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("mobile pinch and drag keep controls on screen in both themes", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(article);
  const { dialog } = await openImage(page);
  const image = dialog.locator("img");
  const initialWidth = await image.evaluate((element) => element.getBoundingClientRect().width);
  const stage = await dialog.locator(".image-modal__viewport").boundingBox();
  if (!stage) throw new Error("Missing touch viewport");
  const client = await context.newCDPSession(page);
  const y = stage.y + stage.height / 2;
  const touches = (distance: number) => [
    { id: 1, x: 195 - distance, y },
    { id: 2, x: 195 + distance, y },
  ];
  await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: touches(35) });
  for (const distance of [50, 70, 100]) await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: touches(distance) });
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  expect(await image.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(initialWidth * 2);
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => { document.documentElement.style.colorScheme = value; }, theme);
    const close = await dialog.getByRole("button", { name: "Sulje", exact: true }).boundingBox();
    expect(close!.x).toBeGreaterThanOrEqual(0);
    expect(close!.x + close!.width).toBeLessThanOrEqual(390);
    expect(close!.y).toBeGreaterThanOrEqual(0);
    await expect(dialog.getByRole("button", { name: "Sovita ruutuun" })).toBeVisible();
  }
  await dialog.getByRole("button", { name: "Sovita ruutuun" }).click();
  expect(await image.evaluate((element) => element.getBoundingClientRect().width)).toBeCloseTo(initialWidth, 0);
  await context.close();
});

test("loading failures offer a direct image link and an escape route", async ({ page }) => {
  await page.route(`**${source}`, (route) => route.fulfill({ status: 404, body: "Not found" }));
  await page.goto(article);
  await page.locator(".image-modal-trigger").nth(1).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("[data-image-status]")).toHaveText("Kuva ei latautunut.");
  await expect(dialog.getByRole("link", { name: "Avaa kuvatiedosto" })).toHaveAttribute("href", new RegExp(source));
  await expect(dialog.getByRole("button", { name: "Suurenna", exact: true })).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("the global opt-in works in English and survives ClientRouter navigation", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/about/");
  expect(requests.some((url) => url.includes("/scripts/image-modal"))).toBe(false);
  await page.evaluate(() => {
    const link = document.createElement("a");
    link.href = "/images/blog/mckinsey-analysis-slide-en.jpeg";
    link.dataset.imageModal = "";
    link.dataset.imageCaption = "Analysis slide";
    link.textContent = "Enlarge example";
    document.querySelector("main")!.prepend(link);
    document.dispatchEvent(new Event("astro:page-load"));
  });
  const link = page.getByRole("link", { name: "Enlarge example" });
  await expect(link).toHaveAttribute("aria-haspopup", "dialog");
  await link.click();
  const dialog = page.getByRole("dialog", { name: "Image viewer", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Zoom in", exact: true })).toBeEnabled();
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await page.evaluate((href) => {
    const navigation = document.createElement("a");
    navigation.href = href;
    navigation.textContent = "Visit Finnish example";
    document.querySelector("main")!.prepend(navigation);
  }, article);
  await page.getByRole("link", { name: "Visit Finnish example" }).click();
  await expect(page).toHaveURL(new RegExp(article));
  await expect(page.locator("#image-modal")).toHaveCount(1);
  const opened = await openImage(page);
  await expect(opened.dialog.getByRole("button", { name: "Sulje", exact: true })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator("html")).not.toHaveClass(/image-modal-open/);
  await page.goForward();
  await openImage(page);
});

test("without JavaScript the enlargement link still opens the image", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(article);
  const link = page.getByRole("link", { name: "Suurenna analysoiva dia", exact: true });
  await expect(link).toHaveAttribute("href", source);
  await link.click();
  await expect(page).toHaveURL(new RegExp(source));
  await context.close();
});
