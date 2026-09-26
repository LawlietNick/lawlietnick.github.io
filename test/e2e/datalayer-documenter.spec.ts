import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const path = "/fi/tyokalut/datalayer-dokumentaatiogeneraattori/";

test.beforeEach(async ({ page }) => {
  await page.goto(path);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("edits, reorders, persists and exports the selected document", async ({ page }) => {
  await page.getByLabel("Asiakkaan nimi").fill("Acme Oy");
  await page.getByLabel("Verkkokauppa-alusta").fill("Shopify");
  await page.getByLabel("select_item").check();
  const title = page.getByLabel("Tuotteen valitseminen listalta: otsikko");
  await title.fill("Tuotteen valinta listasta");
  await page.getByRole("button", { name: "Siirrä Tuotteen valinta listasta ylemmäs" }).click();
  await expect(page.getByText("Luonnos tallennettu tähän selaimeen.")).toBeVisible();

  const markdownPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Lataa Markdown" }).click();
  const markdownDownload = await markdownPromise;
  const markdown = await readFile((await markdownDownload.path())!, "utf8");
  expect(markdownDownload.suggestedFilename()).toBe("acme-oy-datalayer.md");
  expect(markdown).toContain("**Asiakas:** Acme Oy");
  expect(markdown).toContain("## Tuotteen valinta listasta (`select_item`)");

  await page.reload();
  await expect(page.getByLabel("Asiakkaan nimi")).toHaveValue("Acme Oy");
  await expect(page.getByLabel("Tuotteen valinta listasta: otsikko")).toHaveValue("Tuotteen valinta listasta");
});

test("downloads a real DOCX and exposes an intentional empty state", async ({ page }) => {
  const docxPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Lataa DOCX" }).click();
  const docxDownload = await docxPromise;
  const docx = await readFile((await docxDownload.path())!);
  expect(docxDownload.suggestedFilename()).toBe("datalayer-dokumentaatio-datalayer.docx");
  expect(docx.subarray(0, 2).toString()).toBe("PK");
  expect(docx.length).toBeGreaterThan(1_000);

  for (const checkbox of await page.getByRole("checkbox").all()) {
    if (await checkbox.isChecked()) await checkbox.uncheck();
  }
  await expect(page.getByRole("heading", { name: "Valitse vähintään yksi osio" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Lataa Markdown" })).toBeDisabled();
});
