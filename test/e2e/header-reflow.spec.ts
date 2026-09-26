import { expect, test } from '@playwright/test';

for (const path of ['/fi/', '/']) {
  test(`header and mobile navigation reflow at enlarged text: ${path}`, async ({ page }) => {
    for (const width of [320, 390, 768, 896, 1440]) {
      for (const scale of [100, 200]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        await page.evaluate((size) => { document.documentElement.style.fontSize = `${size}%`; }, scale);
        await page.evaluate(() => document.fonts.ready);
        const header = page.locator('[data-site-header]');
        const overflow = () => header.evaluate((root) => [...root.querySelectorAll('*')].filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden').some(el => { const r = el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; }));
        expect(await overflow(), `${path} ${width} ${scale}`).toBe(false);
        const toggle = page.locator('[data-mobile-nav-toggle]');
        if (await toggle.isVisible()) {
          const box = await toggle.boundingBox();
          expect(box!.width).toBeGreaterThanOrEqual(44);
          await toggle.click();
          const panel = page.locator('[data-mobile-nav-panel]');
          await expect(panel).toBeVisible();
          const headerBox = await header.boundingBox();
          await expect.poll(async () => Math.round((await panel.boundingBox())!.y)).toBe(Math.round(headerBox!.height));
          await page.locator('[data-mobile-section-toggle]').first().click();
          expect(await panel.evaluate(el => el.scrollWidth <= el.clientWidth), `${path} panel ${width} ${scale}`).toBe(true);
          await page.keyboard.press('Escape');
          await expect(toggle).toBeFocused();
          await expect(page.locator('body')).not.toHaveClass(/has-mobile-nav-open/);
        }
      }
    }
  });
}

test('mobile focus trap and breakpoint transition release page scroll and focus', async ({ page }) => {
  await page.setViewportSize({ width: 850, height: 900 });
  await page.goto('/fi/');
  const toggle = page.locator('[data-mobile-nav-toggle]');
  await toggle.click();
  const close = page.locator('.mobile-nav-overlay__close');
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('.mobile-nav-overlay__actions .cta')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.setViewportSize({ width: 896, height: 900 });
  await expect(page.locator('[data-mobile-nav-overlay]')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('body')).not.toHaveClass(/has-mobile-nav-open/);
  expect(await page.locator('main').evaluate(el => el.inert)).toBe(false);
  await expect(page.locator('.site-header__nav a').first()).toBeFocused();
  await page.setViewportSize({ width: 850, height: 900 });
  await expect(toggle).toBeFocused();
});
