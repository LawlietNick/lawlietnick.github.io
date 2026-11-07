import { expect, test, type Page } from "@playwright/test";

const answerAll = async (page: Page, value = "yes") => {
  for (const answer of await page.locator(`input[data-answer][value="${value}"]`).all()) {
    await answer.check();
  }
};
const locales = [
  { lang: "en", path: "/tools/metric-quality-checker/", strong: "Sound basis for decisions", weak: "Needs clarification", summary: "Copy summary", link: "Copy link", reset: "Clear answers", name: "Metric to assess", },
  { lang: "fi", path: "/fi/tyokalut/mittarin-laatutarkistus/", strong: "Hyvä pohja päätöksenteolle", weak: "Vaatii täsmennystä", summary: "Kopioi yhteenveto", link: "Kopioi linkki", reset: "Tyhjennä vastaukset", name: "Arvioitava mittari", },
];

for (const locale of locales) {
  test(`${locale.lang}: separates quality and role, generates a summary without text fields and restores shared assessment`, async ({ page }) => {
    await page.goto(locale.path);
    await expect(page.locator("[data-metric-name]")).toBeHidden();
    await page.getByLabel(locale.name, { exact: true }).fill("Customer acquisition cost <test>");
    await expect(page.locator("[data-metric-name]")).toHaveText("Customer acquisition cost <test>");
    await answerAll(page);
    await expect(page.getByRole("heading", { name: locale.strong })).toBeVisible();
    await expect(page.locator("[data-score]")).toHaveText("10");
    await page.locator('input[name="metric-purpose"][value="diagnostic"]').check();
    await expect(page.getByRole("heading", { name: locale.strong })).toBeVisible();
    await expect(page.locator("[data-result-role]")).toContainText(locale.lang === "fi" ? "Diagnostinen" : "Diagnostic");
    await page.getByRole("button", { name: locale.summary, exact: true }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain("Customer acquisition cost <test>");
    await expect(page.locator("[data-metric-checker] textarea")).toHaveCount(0);
    const summary = await page.evaluate(() => navigator.clipboard.readText());
    expect(summary).toContain(locale.strong);
    expect(summary).toContain("10/10");
    expect(summary).toContain(locale.lang === "fi" ? "Diagnostinen mittari" : "Diagnostic metric");
    expect(summary).toContain(locale.lang === "fi" ? "Sovi mittarin seuraava tarkistusajankohta." : "Agree on the next review date for this metric.");
    await page.getByRole("button", { name: locale.link, exact: true }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain("a=yyyyyyyyyy");
    const shared = await page.evaluate(() => navigator.clipboard.readText());
    expect(new URL(shared).searchParams.get("m")).toBe("Customer acquisition cost <test>");
    expect(new URL(shared).searchParams.get("r")).toBe("diagnostic");
    await page.goto(shared);
    await expect(page.getByRole("heading", { name: locale.strong })).toBeVisible();
    await expect(page.locator('input[name="metric-purpose"][value="diagnostic"]')).toBeChecked();
    await page.getByRole("button", { name: locale.reset, exact: true }).click();
    await expect(page.locator("[data-verdict]")).toBeHidden();
    await expect(page.getByLabel(locale.name, { exact: true })).toHaveValue("");
    await expect(page.locator('input[name="metric-purpose"]:checked')).toHaveCount(0);
    await expect(page.locator("input[data-answer]:checked")).toHaveCount(0);
    await expect(page).toHaveURL(new RegExp(`${locale.path}$`));
  });

  test(`${locale.lang}: explains the role from a plain-language purpose without affecting quality`, async ({ page }) => {
    await page.goto(locale.path);
    await expect(page.locator("#metric-role")).toHaveCount(0);
    await expect(page.locator("[data-role-feedback]")).toBeHidden();
    const roles = locale.lang === "fi"
      ? ["Tulosmittari", "Ennakoiva mittari", "Diagnostinen mittari", "Laatu- tai vastamittari"]
      : ["Outcome metric", "Leading indicator", "Diagnostic metric", "Quality or counter metric"];
    for (const [index, value] of ["outcome", "leading", "diagnostic", "guardrail"].entries()) {
      await page.locator(`input[name="metric-purpose"][value="${value}"]`).check();
      await expect(page.locator("[data-role-feedback]")).toContainText(roles[index]);
      await expect(page.locator("[data-score]")).toHaveText("0");
      await expect(page.locator("[data-progress]")).toContainText("0 / 10");
    }
    await page.getByRole("button", { name: locale.reset, exact: true }).click();
    await expect(page.locator('input[name="metric-purpose"]:checked')).toHaveCount(0);
    await expect(page.locator('[data-answer][value="unknown"]')).toHaveCount(0);
    await expect(page.locator('input[name="metric-purpose"][value=""]')).toHaveCount(0);
    await answerAll(page);
    await expect(page.getByRole("heading", { name: locale.strong })).toBeVisible();
    await expect(page.locator("[data-result-role]")).toContainText(locale.lang === "fi" ? "Rooli vielä epäselvä" : "Role still unclear");
  });

  test(`${locale.lang}: caps essential gaps and gives a prioritized action`, async ({ page }) => {
    await page.goto(`${locale.path}?a=ynyyyyynyy`);
    await expect(page.locator("[data-score]")).toHaveText("8");
    await expect(page.getByRole("heading", { name: locale.weak })).toBeVisible();
    await expect(page.locator("[data-capped]")).toContainText("8.");
    await expect(page.locator("[data-gaps-list]")).toContainText("2.");
    await expect(page.locator("[data-gaps-list]")).toContainText("8.");
    await expect(page.locator("[data-next-text]")).toHaveText(await page.locator("[data-gaps-list] li:last-child").innerText().then((text) => text.replace(/^8\. /, "")));
    await expect(page.locator("[data-cta]")).toBeVisible();
    await page.getByRole("button", { name: locale.summary, exact: true }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain(locale.lang === "fi" ? "Korjattavaa" : "Gaps to close");
    await page.getByRole("button", { name: locale.link, exact: true }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain("a=ynyyyyynyy");
    await page.goto(await page.evaluate(() => navigator.clipboard.readText()));
    await expect(page.locator('input[name="q8"][value="no"]')).toBeChecked();
    await expect(page.getByRole("heading", { name: locale.weak })).toBeVisible();
  });

  test(`${locale.lang}: handles unanswered and no answers with keyboard controls`, async ({ page }) => {
    await page.goto(`${locale.path}?a=yyyyyyyyy!&r=invalid`);
    await expect(page.locator("[data-verdict]")).toBeHidden();
    await expect(page.locator("[data-progress]")).toContainText("9 / 10");
    await expect(page.locator('input[name="metric-purpose"]:checked')).toHaveCount(0);
    const radio = page.locator('input[name="q10"][value="no"]');
    await radio.focus();
    await page.keyboard.press("Space");
    await expect(radio).toBeChecked();
    await expect(page.locator("[data-verdict]")).toBeVisible();
    await expect(page.locator("[data-gaps]")).toBeVisible();
    await answerAll(page, "no");
    await expect(page.locator("[data-score]")).toHaveText("0");
    await expect(page.locator("[data-gaps-list] li")).toHaveCount(10);
    await expect(page.locator("[data-result-label]")).toHaveText(locale.lang === "fi" ? "Käyttökelpoisuus osoittamatta" : "Usefulness not established");
    await expect(page.locator('[role="status"][aria-live="polite"]')).toHaveCount(1);
  });

  test(`${locale.lang}: reports clipboard failure without claiming success`, async ({ page }) => {
    await page.goto(`${locale.path}?a=yyyyyyyyyy`);
    await page.evaluate(() => {
      Object.defineProperty(navigator.clipboard, "writeText", { value: async () => { throw new Error("Denied"); } });
    });
    await page.getByRole("button", { name: locale.summary, exact: true }).click();
    await expect(page.locator("[data-copy-status]")).toContainText(locale.lang === "fi" ? "Kopiointi epäonnistui" : "Copy failed");
  });

  for (const theme of ["light", "dark"] as const) {
    for (const width of [1280, 375]) {
      test(`${locale.lang}: ${theme} layout at ${width}px`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme });
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`${locale.path}?a=ynyyyyynyy&r=outcome`);
        await expect(page.getByRole("heading", { name: locale.weak })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        const toggles = page.locator(".metric-checker__toggle");
        for (const toggle of await toggles.all()) {
          expect(await toggle.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
        }
        await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo(0, 0); });
        await page.screenshot({ fullPage: true, path: `/tmp/metric-${locale.lang}-${theme}-${width}.png` });
      });
    }
  }
}


test("initializes the checker after client-side language navigation", async ({ page }) => {
  await page.goto("/tools/metric-quality-checker/");
  await page.evaluate(() => { window.__metricNavigationMarker = true; });
  await page.locator(".lang-menu__trigger").first().click();
  await page.locator('a[href="/fi/tyokalut/mittarin-laatutarkistus/"]').first().click();
  await expect(page).toHaveURL(/fi\/tyokalut\/mittarin-laatutarkistus\//);
  expect(await page.evaluate(() => window.__metricNavigationMarker)).toBe(true);
  await answerAll(page);
  await expect(page.getByRole("heading", { name: "Hyvä pohja päätöksenteolle" })).toBeVisible();
});

for (const locale of locales) {
  test(`${locale.lang}: shared assessments discard unrelated page anchors`, async ({ page }) => {
    await page.goto(`${locale.path}?a=yyyyyyyyyy#metric-examples-title`);
    await page.getByRole("button", { name: locale.link, exact: true }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain("a=yyyyyyyyyy");
    const shared = new URL(await page.evaluate(() => navigator.clipboard.readText()));
    expect(shared.hash).toBe("");
    await page.goto(shared.href);
    await expect(page.getByRole("heading", { name: locale.strong })).toBeInViewport();
  });

  test(`${locale.lang}: mobile users can reach the completed assessment from the last answer`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(locale.path);
    const jump = page.locator("[data-jump-to-score]");
    await expect(jump).toBeHidden();
    await answerAll(page);
    await expect(jump).toBeVisible();
    await jump.click();
    await expect(page.locator("#metric-quality-assessment")).toBeFocused();
    await expect(page.getByRole("heading", { name: locale.strong })).toBeInViewport();
    await page.setViewportSize({ width: 1280, height: 700 });
    await expect(jump).toBeHidden();
    await page.setViewportSize({ width: 375, height: 700 });
    await expect(jump).toBeVisible();
    await page.getByRole("button", { name: locale.reset, exact: true }).click();
    await expect(jump).toBeHidden();
  });
}

for (const locale of locales) {
  test(`${locale.lang}: naming a completed metric does not rewrite live results`, async ({ page }) => {
    await page.goto(`${locale.path}?a=yyyyyyyyyy&r=outcome`);
    await page.evaluate(() => {
      window.__metricLiveMutations = 0;
      const observer = new MutationObserver((records) => { window.__metricLiveMutations += records.length; });
      for (const element of document.querySelectorAll('[data-verdict], [data-role-feedback], [data-score]')) {
        observer.observe(element, { childList: true, subtree: true, characterData: true });
      }
    });
    await page.getByLabel(locale.name, { exact: true }).pressSequentially("Liidit");
    expect(await page.evaluate(() => window.__metricLiveMutations)).toBe(0);
    await expect(page.locator("[data-metric-name]")).toHaveText("Liidit");
    await page.locator('input[name="q1"][value="no"]').check();
    await expect(page.getByRole("heading", { name: locale.weak })).toBeVisible();
    expect(await page.evaluate(() => window.__metricLiveMutations)).toBeGreaterThan(0);
    await page.getByRole("button", { name: locale.reset, exact: true }).click();
    await expect(page.locator("[data-progress]")).toHaveAttribute("aria-live", "polite");
    await page.locator('input[name="q1"][value="no"]').check();
    await expect(page.locator("[data-progress]")).toContainText("1 / 10");
  });

  test(`${locale.lang}: explains the JavaScript requirement while examples stay usable`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(locale.path);
    await expect(page.locator(".metric-checker__noscript")).toContainText("JavaScript");
    await expect(page.locator('.metric-checker__noscript a[href="#metric-examples-title"]')).toBeVisible();
    await page.locator("#example-ecommerce summary").click();
    await expect(page.locator("#example-ecommerce")).toHaveAttribute("open", "");
    await context.close();
  });
}
