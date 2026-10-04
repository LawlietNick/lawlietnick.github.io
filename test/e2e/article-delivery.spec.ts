import { expect, test } from "@playwright/test";

for (const route of ["/blog/content-consumption-metrics/", "/fi/blog/sisallon-kulutuksen-mittaaminen/"]) {
  test(`article hero selects an image close to its rendered width: ${route}`, async ({ browser, baseURL }) => {
    for (const deviceScaleFactor of [1, 2]) {
      const page = await browser.newPage({ baseURL, viewport: { width: 412, height: 915 }, deviceScaleFactor });
      await page.goto(route);
      const selected = await page.locator(".article-hero__visual-panel img").evaluate((image: HTMLImageElement) => {
        const source = image.parentElement!.querySelector("source")!;
        const candidate = source.srcset.split(",").find((item) => image.currentSrc === new URL(item.trim().split(/\s+/)[0], location.href).href)!;
        return { width: image.getBoundingClientRect().width, pixels: Number(candidate.trim().split(/\s+/)[1].slice(0, -1)) };
      });
      expect(selected.pixels).toBeGreaterThanOrEqual(selected.width * deviceScaleFactor);
      expect(selected.pixels).toBeLessThan(selected.width * deviceScaleFactor * 1.25);
      await page.close();
    }
  });
}

test("articles include specialized CSS only when their content needs it", async ({ page }) => {
  await page.goto("/blog/content-consumption-metrics/");
  await expect(page.locator("style[data-article-forms], style[data-article-algorithm]")).toHaveCount(0);
  await page.goto("/fi/blog/mika-on-algoritmi/");
  await expect(page.locator("style[data-article-algorithm]")).toHaveCount(1);
  expect(await page.locator(".algorithm-flow").evaluate((el) => getComputedStyle(el).display)).toBe("grid");
  await page.goto("/templates/cookiebot-guide/");
  await expect(page.locator("style[data-article-forms]")).toHaveCount(1);
  await expect(page.locator("style[data-article-algorithm]")).toHaveCount(0);
});
