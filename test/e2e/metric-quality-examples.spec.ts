import { expect, test } from "@playwright/test";

const locales = [
  { lang: "fi", path: "/fi/tyokalut/mittarin-laatutarkistus/", heading: "Esimerkkejä hyvistä mittareista ja SMART-tavoitteista", fictional: "kuvitteellisia opetusesimerkkejä" },
  { lang: "en", path: "/tools/metric-quality-checker/", heading: "Examples of useful metrics and SMART goals", fictional: "fictional teaching examples" },
];

for (const locale of locales) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [1280, 375]) {
      test(`${locale.lang}: examples preserve answers, support keyboard and fit ${theme} at ${width}px`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme });
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`${locale.path}?a=ynyyyyynyy&r=diagnostic&m=Test`);
        const section = page.getByRole("region", { name: locale.heading });
        await expect(section).toContainText(locale.fictional);
        const examples = section.locator("details");
        await expect(examples).toHaveCount(4);
        await expect(examples.first()).toHaveAttribute("open", "");
        await expect(section.locator("details[open]")).toHaveCount(1);
        await expect(section.locator("input, button, script")).toHaveCount(0);
        const answersBefore = await page.locator("[data-answer]:checked").evaluateAll((inputs) => inputs.map((input) => ({ name: input.getAttribute("name"), value: input.getAttribute("value") })));
        const urlBefore = page.url();
        const questionTexts = await page.locator(".metric-checker__question-copy strong").allTextContents();
        for (const [index, example] of (await examples.all()).entries()) {
          const summary = example.locator("summary");
          if (index !== 0) {
            await summary.focus();
            await expect(summary).toBeFocused();
            await page.keyboard.press("Enter");
            await expect(example).toHaveAttribute("open", "");
          }
          await expect(example.locator(".metric-examples__smart dt")).toHaveCount(5);
          const markers = example.locator(".metric-examples__smart-letter");
          expect((await markers.allTextContents()).join("")).toBe("SMART");
          const treatments = await markers.evaluateAll((elements) => elements.map((element) => {
            const style = getComputedStyle(element);
            return [style.backgroundColor, style.borderStyle, style.borderRadius].join("|");
          }));
          expect(new Set(treatments).size).toBe(5);
          await expect(example.locator("ol li")).toHaveCount(10);
          await expect(example.locator("ol")).toHaveCount(3);
          expect(await example.locator("ol").evaluateAll((lists) => lists.map((list) => list.start))).toEqual([1, 3, 6]);
          const exampleQuestions = await example.locator(".metric-examples__question").allTextContents();
          expect(exampleQuestions).toEqual(questionTexts.map((text) => text.replace(/^\d+\.\s*/, "")));
          for (const answer of await example.locator("ol li > p:last-child").allTextContents()) {
            expect(answer).toMatch(locale.lang === "fi" ? /^Kyllä\. / : /^Yes\. /);
          }
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
          if (index !== 0) await summary.press("Space");
        }
        expect(await page.locator("[data-answer]:checked").evaluateAll((inputs) => inputs.map((input) => ({ name: input.getAttribute("name"), value: input.getAttribute("value") })))).toEqual(answersBefore);
        await expect(page.locator('[name="metric-purpose"][value="diagnostic"]')).toBeChecked();
        await expect(page.locator("#metric-name")).toHaveValue("Test");
        await expect(page.locator("[data-score]")).toHaveText("8");
        expect(page.url()).toBe(urlBefore);
        await section.getByRole("heading", { level: 2 }).evaluate((heading) => window.scrollTo(0, window.scrollY + heading.getBoundingClientRect().top - 100));
        await page.screenshot({ path: `/tmp/examples-${locale.lang}-${theme}-${width}.png` });
        await examples.first().locator(".metric-examples__smart").scrollIntoViewIfNeeded();
        await page.screenshot({ path: `/tmp/examples-smart-${locale.lang}-${theme}-${width}.png` });
      });
    }
  }
  test(`${locale.lang}: examples remain readable without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(locale.path);
    const examples = page.locator(".metric-examples details");
    await examples.nth(3).locator("summary").click();
    await expect(examples.nth(3)).toHaveAttribute("open", "");
    await expect(examples.nth(3).locator("ol li")).toHaveCount(10);
    await context.close();
  });
}

for (const locale of locales) {
  for (const width of [1280, 375]) {
    test(`${locale.lang}: accordion heading does not move when toggled at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(locale.path);
      const example = page.locator("#example-ecommerce");
      const summary = example.locator("summary");
      await page.locator(".metric-examples details").evaluateAll((elements) => elements.forEach((element) => { element.open = false; }));
      await summary.scrollIntoViewIfNeeded();
      const measure = () => summary.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const title = element.querySelector(".metric-examples__title").getBoundingClientRect();
        return { x: title.left, y: title.top + window.scrollY, viewportY: title.top, width: rect.width, height: rect.height };
      });
      const before = await measure();
      await summary.click();
      await expect(example).toHaveAttribute("open", "");
      expect(await measure()).toEqual(before);
      await summary.press("Enter");
      await expect(example).not.toHaveAttribute("open", "");
      expect(await measure()).toEqual(before);
    });
  }
}
