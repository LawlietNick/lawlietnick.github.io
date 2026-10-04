import { expect, test } from "@playwright/test";

for (const route of ["/", "/fi/"]) {
  for (const width of [390, 412, 1280]) {
    test(`homepage stays stable when web fonts arrive late: ${route} (${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 915 });
      let releaseFonts!: () => void;
      const fontsGate = new Promise<void>((resolve) => { releaseFonts = resolve; });
      await page.route("**/fonts/*.woff2", async (request) => {
        await fontsGate;
        await request.continue();
      });
      await page.addInitScript(() => {
        (window as any).__fontShifts = [];
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) (window as any).__fontShifts.push(entry.value);
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      // Let font-display's short blocking period expire before releasing fonts.
      await page.waitForTimeout(300);
      const before = await page.locator(".hero-card--feature").boundingBox();
      releaseFonts();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      const after = await page.locator(".hero-card--feature").boundingBox();
      const cls = await page.evaluate(() => (window as any).__fontShifts.reduce((total: number, value: number) => total + value, 0));
      expect(cls).toBeLessThan(0.01);
      expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
    });
  }
}
