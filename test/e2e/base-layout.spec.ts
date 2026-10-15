import { expect, test, type Page } from "@playwright/test";

test.describe("article code block statistics", () => {
  test.use({ javaScriptEnabled: false });

  for (const route of [
    "/blog/content-consumption-metrics/",
    "/fi/blog/sisallon-kulutuksen-mittaaminen/",
    "/templates/hubspot-form-tracking-gtm/",
    "/fi/toteutusmallit/hubspot-lomakkeiden-seuranta-gtm/",
  ]) {
    test(`excludes Mermaid from the server-rendered count on ${route}`, async ({ page }) => {
      await page.goto(route);
      const diagrams = page.locator('article pre[data-language="mermaid"]');
      expect(await diagrams.count()).toBeGreaterThan(0);
      const codeBlocks = page.locator('article pre:not([data-language="mermaid"])');
      const row = page.locator(".article-telemetry__row").filter({
        has: page.locator("dt", { hasText: /^(CODE BLOCKS|KOODILOHKOT)$/ }),
      });
      await expect(row.locator(".article-telemetry__value")).toHaveText(String(await codeBlocks.count()));
    });
  }
});

// Exercise the router with real link clicks, including routes absent from menus.
async function navigate(page: Page, href: string) {
  await page.evaluate((href) => {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = "Test navigation";
    link.id = "test-navigation";
    document.body.prepend(link);
  }, href);
  await page.locator("#test-navigation").click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.locator("#test-navigation")).toHaveCount(0);
}

test("classification metadata follows ClientRouter navigation without duplicates", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => { (window as any).__classificationNavigation = true; });
  for (const [route, pageType, category] of [
    ["/fi/blog/sivujen-luokittelu-analytiikassa/", "article", "analytics"],
    ["/templates/cookiebot-guide/", "template", "privacy"],
    ["/fi/toteutusmallit/cookiebot-opas/", "template", "privacy"],
    ["/tools/ga4-report-builder/", "tool", "reporting"],
    ["/fi/palvelut/consent-mode-toteutus/", "service", "privacy"],
    ["/fi/palvelut/digitaalisen-analyysin-paketti/", "service", "analytics"],
    ["/fi/privacy/", "legal", "privacy"],
    ["/fi/tyokalut/", "listing", "general"],
    ["/about/", "about", "general"],
    ["/fi/", "home", "general"],
  ]) {
    await navigate(page, route);
    for (const [name, value] of [["page_type", pageType], ["primary_category", category]]) {
      const tag = page.locator(`head meta[name="${name}"]`);
      await expect(tag).toHaveCount(1);
      await expect(tag).toHaveAttribute("content", value);
    }
    expect(await page.evaluate(() => (window as any).__classificationNavigation)).toBe(true);
  }
});

test("normal pages and text-only articles do not fetch content enhancements or Mermaid", async ({ page }) => {
  const scripts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") scripts.push(request.url());
  });
  await page.goto("/about/");
  await page.evaluate(() => { (window as any).__baseNavigation = true; });
  for (const href of ["/services/", "/contact/", "/tools/", "/blog/text-alignment-accessibility/"]) {
    await navigate(page, href);
    await expect(page.locator(".theme-switcher input:checked")).toHaveCount(1);
  }
  expect(await page.evaluate(() => (window as any).__baseNavigation)).toBe(true);
  expect(scripts.filter((url) => /content-enhancements|mermaid/i.test(url))).toEqual([]);
  // Positive control: this normal tool page still needs Base's code-copy button.
  await navigate(page, "/tools/form-name-builder/");
  await expect(page.locator(".code-block__header > .copy")).toHaveCount(1);
  expect(scripts.some((url) => url.includes("content-enhancements"))).toBe(true);
  expect(scripts.filter((url) => /mermaid/i.test(url))).toEqual([]);
});

test("copy, checklists and disabled-control feedback survive article round trips", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/blog/tester-post/");
  const copy = page.locator(".code-block__header > .copy").first();
  await expect(copy).toBeVisible();
  expect(await copy.evaluate((button) => {
    const block = button.closest(".code-block")!;
    return block.querySelector(".code-block__header")!.getBoundingClientRect().bottom
      <= block.querySelector("pre")!.getBoundingClientRect().top;
  })).toBe(true);
  const code = await copy.evaluate((button) => {
    const pre = button.closest(".code-block")!.querySelector("pre")!;
    return (pre.querySelector("code") as HTMLElement | null)?.innerText ?? pre.innerText;
  });
  await copy.click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(code);
  const box = page.locator(".task-list-item input").nth(1);
  await expect(box).toBeEnabled();
  await box.check();
  await navigate(page, "/about/");
  await navigate(page, "/blog/tester-post/");
  await expect(box).toBeChecked();
  await page.evaluate(() => document.dispatchEvent(new Event("astro:page-load")));
  await box.locator("..").click();
  await expect(box).not.toBeChecked();
  expect(await page.locator("pre").evaluateAll((blocks) => blocks.every((pre) => (pre.closest(".code-block")?.querySelectorAll(".copy").length ?? 0) <= 1))).toBe(true);

  const disabled = page.locator(".prose button:disabled").first();
  await disabled.dispatchEvent("pointerdown", { isPrimary: true, button: 0 });
  expect(await disabled.evaluate((button) => button.getAnimations().length)).toBe(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await disabled.evaluate((button) => button.getAnimations().forEach((animation) => animation.cancel()));
  await disabled.dispatchEvent("pointerdown", { isPrimary: true, button: 0 });
  expect(await disabled.evaluate((button) => button.getAnimations().length)).toBe(0);
  expect(errors).toEqual([]);
});

test("accordions and copy opt-outs survive navigation and repeated initialization", async ({ page }) => {
  await page.goto("/about/");
  for (let visit = 0; visit < 2; visit++) {
    await navigate(page, "/templates/cookiebot-guide/");
    await page.getByLabel(/Yes — advanced/).check();
    const accordion = page.locator("#consent-default-stored [data-code-accordion]");
    const toggle = accordion.locator("[data-code-accordion-toggle]");
    await expect(accordion).toHaveAttribute("data-ready", "true");
    const header = accordion.locator(":scope > .code-block__header");
    await expect(header).toContainText("HTML");
    expect(await header.evaluate((element) =>
      element.getBoundingClientRect().bottom <= element.nextElementSibling!.getBoundingClientRect().top,
    )).toBe(true);
    const source = await accordion.locator("pre > code").textContent();
    await header.getByRole("button", { name: "Copy", exact: true }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(source);
    await page.evaluate(() => document.dispatchEvent(new Event("astro:page-load")));
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(accordion.locator(":scope > .code-block__header > .copy")).toHaveCount(1);
    expect(await page.locator("[data-no-copy] pre").evaluateAll((blocks) => blocks.every((pre) =>
      pre.closest("[data-code-accordion], [data-copy]") || !pre.closest(".code-block")?.querySelector(".copy"),
    ))).toBe(true);
    await navigate(page, "/about/");
  }
});

test("code copy does not report success when the clipboard is unavailable", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", {
    value: { writeText: () => Promise.reject(new Error("denied")) },
  }));
  await page.goto("/blog/tester-post/");
  const copy = page.locator(".code-block__header > .copy").first();
  await copy.click();
  await expect(copy).toHaveText("Try again");
});

test("Mermaid is fetched only for diagrams and renders on initial load and return navigation", async ({ page }) => {
  test.setTimeout(60_000);
  const scripts: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => { if (request.resourceType() === "script") scripts.push(request.url()); });
  page.on("pageerror", (error) => errors.push(error.message));
  const route = "/blog/marketing-automation-flows/";
  await page.goto(route);
  await expect(page.locator('pre[data-language="mermaid"] svg')).toHaveCount(18);
  expect(scripts.some((url) => /mermaid/i.test(url))).toBe(true);
  await navigate(page, "/about/");
  await navigate(page, route);
  await expect(page.locator('pre[data-language="mermaid"][data-processed] svg')).toHaveCount(18);
  await expect(page.locator('pre[data-language="mermaid"] .copy')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("light, dark and system themes persist across article and normal pages", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/about/");
  for (const preference of ["light", "dark", "system"]) {
    await page.locator(`.theme-switcher label:has(input[value="${preference}"])`).click();
    await navigate(page, "/blog/tester-post/");
    await expect(page.locator("html")).toHaveAttribute("data-theme-preference", preference);
    await expect(page.locator("html")).toHaveAttribute("data-theme", preference === "system" ? "dark" : preference);
    await navigate(page, "/about/");
    await expect(page.locator(`.theme-switcher input[value="${preference}"]`)).toBeChecked();
  }
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});


for (const { route, light } of [
  { route: "/templates/hubspot-form-tracking-gtm/", light: "Light" },
  { route: "/fi/toteutusmallit/hubspot-lomakkeiden-seuranta-gtm/", light: "Vaalea" },
]) {
  test(`code controls keep their focus and fit enlarged text on ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.getByRole("radio", { name: light, exact: true }).check({ force: true });
    const block = page.locator("[data-code-accordion]:has(#hubspot-worker-script)");
    const copy = block.locator(".copy");
    await copy.press("Space");
    await expect(copy).toBeFocused();
    expect(await copy.evaluate((button) => {
      const style = getComputedStyle(button);
      return style.outlineStyle === "solid" && style.outlineColor === style.backgroundColor;
    })).toBe(true);

    await page.setViewportSize({ width: 320, height: 844 });
    await page.addStyleTag({ content: "html { font-size: 200% !important; } body { font-size: 36px !important; }" });
    expect(await block.evaluate((element) => {
      const header = element.querySelector(".code-block__header")!.getBoundingClientRect();
      return [...element.querySelectorAll(".code-block__header > *")].every((item) => {
        const bounds = item.getBoundingClientRect();
        return bounds.left >= header.left && bounds.right <= header.right
          && bounds.top >= header.top && bounds.bottom <= header.bottom;
      });
    })).toBe(true);
  });
}
