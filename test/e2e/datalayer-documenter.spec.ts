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

test("prints plain text instead of clipped form controls", async ({ page }) => {
  await page.getByLabel("Consent Mode ja tapahtumajärjestys: tarkoitus").fill("Ensimmäinen rivi\nToinen rivi");
  await page.emulateMedia({ media: "print" });

  const document = page.locator("#datalayer-document");
  await expect(document.locator("textarea:visible, input:visible, select:visible")).toHaveCount(0);
  await expect(page.locator(".tool-hero")).toBeHidden();
  await expect(document.locator(".dl-section").first()).toHaveCSS("break-before", "page");
  await expect(document.getByText("item_category...item_category5", { exact: true })).toBeVisible();
  await expect(document.locator(".dl-print", { hasText: /^Jompikumpi$/ }).first()).toBeVisible();
  const multiline = document.locator(".dl-print", { hasText: "Ensimmäinen rivi" });
  await expect(multiline).toBeVisible();
  expect(await multiline.innerText()).toBe("Ensimmäinen rivi\nToinen rivi");

  // Every printed value wraps inside its column instead of running off the page.
  const overflowing = await document.locator(".dl-print").evaluateAll((nodes) =>
    nodes.filter((node) => node.scrollWidth > node.clientWidth + 1).length);
  expect(overflowing).toBe(0);
});
