import { expect, test } from "@playwright/test";

for (const colorScheme of ["light", "dark"] as const) {
  for (const width of [1440, 1024, 768, 375]) {
    test(`workflow navigation: ${colorScheme}, ${width}px`, async ({ page }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/design-system/#workflow-example");
      const workflow = page.locator("workflow-steps");
      const tabs = workflow.getByRole("tab");
      await expect(tabs).toHaveCount(4);
      const progress = workflow.getByRole("progressbar");
      await expect(progress).toHaveAttribute("aria-valuemax", "4");
      await expect(progress).toHaveAttribute("aria-valuenow", "1");
      await expect(progress.locator(".is-reached")).toHaveCount(1);
      await expect(workflow.getByRole("tabpanel")).toHaveCount(1);
      await expect(workflow.getByRole("button", { name: "Previous step" })).toBeDisabled();
      const initialHeight = (await workflow.boundingBox())!.height;
      const vertical = width >= 768;
      await expect(workflow.getByRole("tablist")).toHaveAttribute("aria-orientation", vertical ? "vertical" : "horizontal");
      const tabBounds = (await tabs.first().boundingBox())!;
      const panelBounds = (await workflow.getByRole("tabpanel").boundingBox())!;
      if (vertical) expect(tabBounds.x + tabBounds.width).toBeLessThan(panelBounds.x);
      else expect(tabBounds.y + tabBounds.height).toBeLessThan(panelBounds.y);
      const imageBounds = (await workflow.getByRole("tabpanel").locator("img").boundingBox())!;
      const titleBounds = (await workflow.getByRole("tabpanel").getByRole("heading").boundingBox())!;
      expect(imageBounds.y + imageBounds.height).toBeLessThan(titleBounds.y);
      if (vertical) expect(imageBounds.height).toBeLessThanOrEqual(240);
      await tabs.first().focus();
      await page.keyboard.press(vertical ? "ArrowDown" : "ArrowRight");
      await expect(tabs.nth(1)).toBeFocused();
      await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
      await expect(progress).toHaveAttribute("aria-valuenow", "2");
      await expect(progress.locator(".is-reached")).toHaveCount(2);
      await expect(workflow.getByRole("tabpanel")).toContainText("Define the reader actions");
      await page.keyboard.press("End");
      await expect(workflow.getByRole("button", { name: "Next step" })).toBeDisabled();
      await expect(progress.locator(".is-reached")).toHaveCount(4);
      await page.keyboard.press(vertical ? "ArrowDown" : "ArrowRight");
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      await expect(progress.locator(".is-reached")).toHaveCount(1);
      await workflow.getByRole("button", { name: "Next step" }).click();
      await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
      await workflow.getByRole("button", { name: "Previous step" }).click();
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      await tabs.nth(2).click();
      await expect(workflow.getByRole("tabpanel")).toContainText("Connect the events in GTM");
      expect((await workflow.boundingBox())!.height).toBe(initialHeight);
      expect(await workflow.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
      if (vertical) {
        const inactiveArrow = tabs.last().locator(".workflow__tab-arrow");
        await expect(inactiveArrow).toHaveCSS("opacity", "0.22");
        const inactiveSurface = await tabs.last().evaluate((element) => {
          const style = getComputedStyle(element);
          return { background: style.backgroundColor, border: style.borderColor, color: style.color };
        });
        await tabs.last().hover();
        await expect(inactiveArrow).toHaveCSS("opacity", "0.65");
        await expect(inactiveArrow).toHaveCSS("transform", "none");
        expect(await tabs.last().evaluate((element) => {
          const style = getComputedStyle(element);
          return { background: style.backgroundColor, border: style.borderColor, color: style.color };
        })).toEqual(inactiveSurface);
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await expect(inactiveArrow).toHaveCSS("transform", "matrix(1, 0, 0, 1, 3, -3)");
        await tabs.nth(2).hover();
        await expect(tabs.nth(2).locator(".workflow__tab-arrow")).toHaveCSS("opacity", "1");
        await expect(tabs.nth(2).locator(".workflow__tab-arrow")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 3, -3)");
        await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
      }
      await workflow.scrollIntoViewIfNeeded();
      await workflow.screenshot({ path: `/tmp/workflow-${colorScheme}-${width}.png` });
      await page.goto("/about/");
      await page.goBack();
      await expect(workflow.getByRole("tab")).toHaveCount(4);
      await workflow.getByRole("tab").last().click();
      await expect(workflow.getByRole("tabpanel")).toContainText("Check the whole journey");
    });
  }
}

test("workflow is readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/design-system/#workflow-example");
  const workflow = page.locator("workflow-steps");
  await expect(workflow.getByRole("heading", { level: 3 })).toHaveCount(4);
  await expect(workflow.getByRole("heading", { name: "Check the whole journey" })).toBeVisible();
  await expect(workflow.getByRole("button")).toHaveCount(0);
  await context.close();
});
