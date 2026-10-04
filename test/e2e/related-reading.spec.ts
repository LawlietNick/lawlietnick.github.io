import { expect, test } from "@playwright/test";

for (const route of [
  "/blog/ai-panel-with-experts/",
  "/fi/blog/asiantuntijapaneeli-yhdella-promptilla/",
  "/blog/content-consumption-metrics/",
  "/fi/blog/sisallon-kulutuksen-mittaaminen/",
  "/templates/hubspot-form-tracking-gtm/",
  "/fi/toteutusmallit/hubspot-lomakkeiden-seuranta-gtm/",
  "/templates/cookiebot-guide/",
  "/fi/toteutusmallit/cookiebot-opas/",
]) {
  test(`${route} has unique, working related article links without JavaScript`, async ({ browser, request, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    await page.goto(route);
    const section = page.locator("section.related-articles");
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute("aria-labelledby", "related-articles-heading");
    await expect(section.locator("h2#related-articles-heading")).toHaveCount(1);
    const cards = section.locator("a.article-card[href]");
    const links = await cards.evaluateAll((cards) => cards.map((card) => ({
      href: card.getAttribute("href")!, title: card.querySelector("h3")!.textContent!,
    })));
    expect(links.length).toBeGreaterThan(0);
    expect(links.length).toBeLessThanOrEqual(3);
    expect(new Set(links.map(({ href }) => href)).size).toBe(links.length);
    for (const { href, title } of links) {
      expect(href).not.toBe(route);
      expect(href.startsWith("/fi/")).toBe(route.startsWith("/fi/"));
      const response = await request.get(href);
      expect(response.status()).toBe(200);
      await page.goto(href);
      await expect(page.locator("h1")).toHaveText(title);
    }
    await context.close();
  });
}

test("unmatched topics and normal pages have no empty or unrelated section", async ({ page }) => {
  for (const route of ["/blog/text-alignment-accessibility/", "/fi/blog/tekstin-tasaus-saavutettavuus/", "/about/", "/tools/"]) {
    await page.goto(route);
    await expect(page.locator(".related-articles")).toHaveCount(0);
  }
});

test("related reading reflows and supports Tab, visible focus and Enter", async ({ page }) => {
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/fi/blog/sisallon-kulutuksen-mittaaminen/");
    const section = page.locator(".related-articles");
    const archive = section.locator("header a");
    const first = section.locator(".article-card").first();
    await archive.focus();
    await page.keyboard.press("Tab");
    await expect(first).toBeFocused();
    expect(await first.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
    expect(await section.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    const href = await first.getAttribute("href");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  }
});
