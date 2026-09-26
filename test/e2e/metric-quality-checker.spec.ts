import { expect, test, type Page } from "@playwright/test";

const path = "/tools/metric-quality-checker/";

const answerEveryQuestionYes = async (page: Page) => {
  for (const answer of await page.locator('input[data-answer][value="yes"]').all()) {
    await answer.check();
  }
};

test("uses the optional metric name throughout a completed assessment", async ({ page }) => {
  await page.goto(path);

  const input = page.getByLabel("Metric to assess");
  const identity = page.locator("[data-metric-name]");

  await expect(identity).toBeHidden();
  await input.fill("Customer acquisition cost");
  await expect(identity).toHaveText("Customer acquisition cost");
  await expect(identity).toBeVisible();

  await input.fill("Qualified pipeline");
  await expect(identity).toHaveText("Qualified pipeline");
  await input.clear();
  await expect(identity).toBeHidden();
  await input.fill("Customer acquisition cost");

  await answerEveryQuestionYes(page);
  await expect(page.getByRole("heading", { name: "Business-critical metric" })).toBeVisible();
  await expect(identity).toHaveText("Customer acquisition cost");

  await page.getByRole("button", { name: "Copy summary" }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Metric quality check: Customer acquisition cost",
  );

  await page.getByRole("button", { name: "Copy link" }).click();
  const sharedLink = await page.evaluate(() => navigator.clipboard.readText());
  expect(sharedLink).toContain("m=Customer+acquisition+cost");
  expect(sharedLink).toContain("a=yyyyyyyy");

  await page.goto(sharedLink);
  await expect(input).toHaveValue("Customer acquisition cost");
  await expect(identity).toHaveText("Customer acquisition cost");
  await expect(page.getByRole("heading", { name: "Business-critical metric" })).toBeVisible();
});

test("keeps unnamed assessments valid and provides equivalent Finnish guidance", async ({ page }) => {
  await page.goto(path);
  await answerEveryQuestionYes(page);
  await expect(page.locator("[data-metric-name]")).toBeHidden();
  await expect(page.getByRole("heading", { name: "Business-critical metric" })).toBeVisible();

  await page.goto("/fi/tyokalut/mittarin-laatutarkistus/");
  await expect(page.getByText("Valinnainen. Nimi näkyy tuloksessa, kopioidussa yhteenvedossa ja jaetussa linkissä. Nimi ei vaikuta pisteisiin.")).toBeVisible();
  await page.getByLabel("Arvioitava mittari").fill("Asiakaspito");
  await expect(page.locator("[data-metric-name]")).toHaveText("Asiakaspito");
});
