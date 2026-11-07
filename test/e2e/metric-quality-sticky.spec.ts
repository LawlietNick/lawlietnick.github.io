import { expect, test } from "@playwright/test";

const locales = [
  { lang: "fi", path: "/fi/tyokalut/mittarin-laatutarkistus/", label: "Laatuarvio" },
  { lang: "en", path: "/tools/metric-quality-checker/", label: "Quality assessment" },
];

for (const locale of locales) {
  for (const theme of ["light", "dark"] as const) {
    test(`${locale.lang}: ${theme} score sticks within the tool and scrolls independently`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 600 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.goto(`${locale.path}?a=nnnnnnnnnn`);
      const panel = page.getByRole("complementary", { name: locale.label, exact: true });
      const layout = page.locator(".metric-checker__layout");
      const dimensions = await layout.evaluate((element) => ({ top: element.getBoundingClientRect().top + window.scrollY, height: element.getBoundingClientRect().height }));
      await page.evaluate((y) => window.scrollTo(0, y), dimensions.top + 250);
      const stickyTop = await panel.evaluate((element) => element.getBoundingClientRect().top);
      const headerBottom = await page.locator("[data-site-header]").evaluate((element) => element.getBoundingClientRect().bottom);
      expect(stickyTop).toBeGreaterThan(headerBottom);
      expect(await panel.evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(600 - 15);
      await page.evaluate(() => window.scrollBy(0, 200));
      expect(await panel.evaluate((element) => element.getBoundingClientRect().top)).toBeCloseTo(stickyTop, 0);
      expect(await panel.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);

      const pageScroll = await page.evaluate(() => window.scrollY);
      await panel.hover();
      await page.mouse.wheel(0, 250);
      await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
      expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll);
      await panel.evaluate((element) => { element.scrollTop = 0; });
      await panel.focus();
      await expect(panel).toBeFocused();
      expect(await panel.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");
      await page.keyboard.press("PageDown");
      await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
      await panel.locator("[data-copy-link]").focus();
      await expect(panel.locator("[data-copy-link]")).toBeInViewport();
      await panel.locator("[data-copy-link]").press("Enter");
      await expect(panel.locator("[data-copy-status]")).toContainText(locale.lang === "fi" ? "Kopioitu" : "Copied");
      await panel.evaluate((element) => { element.scrollTop = 0; });
      await page.screenshot({ path: `/tmp/sticky-${locale.lang}-${theme}.png` });

      await page.evaluate((y) => window.scrollTo(0, y), dimensions.top + dimensions.height - 250);
      expect(await panel.evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(251);
      await page.locator("#metric-examples-title").evaluate((element) => element.scrollIntoView());
      expect(await panel.evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThan(0);
    });
  }

  test(`${locale.lang}: short and incomplete scores retain natural height; mobile is not sticky`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 1200 });
    for (const query of ["", "?a=yyyyyyyyyy"]) {
      await page.goto(`${locale.path}${query}`);
      const panel = page.locator(".metric-checker__score");
      expect(await panel.evaluate((element) => getComputedStyle(element).position)).toBe("sticky");
      expect(await panel.evaluate((element) => element.clientHeight >= element.scrollHeight)).toBe(true);
    }
    await page.setViewportSize({ width: 375, height: 600 });
    await page.goto(`${locale.path}?a=nnnnnnnnnn`);
    const panel = page.locator(".metric-checker__score");
    expect(await panel.evaluate((element) => getComputedStyle(element).position)).toBe("static");
    expect(await panel.evaluate((element) => getComputedStyle(element).maxHeight)).toBe("none");
    expect(await panel.evaluate((element) => element.clientHeight >= element.scrollHeight)).toBe(true);
    const top = await panel.evaluate((element) => element.getBoundingClientRect().top);
    await page.evaluate(() => window.scrollBy(0, 300));
    expect(await panel.evaluate((element) => element.getBoundingClientRect().top)).toBeCloseTo(top - 300, 0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
