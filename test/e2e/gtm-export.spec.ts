import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const path = "/tools/gtm-container-builder/";

// Each export stamps its own exportTime, so compare everything else.
const withoutExportTime = (json: string) => json.replace(/"exportTime": "[^"]*"/, "");

test.beforeEach(async ({ page }) => {
  await page.goto(path);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("selects tag types and exports identical copied and downloaded JSON", async ({ page }) => {
  await page.getByRole("button", { name: "Essential only" }).click();
  await expect(page.getByRole("heading", { name: "6 tags selected" })).toBeVisible();
  await page.getByLabel("GA4 measurement ID").fill("G-PLAYWRIGHT1");
  await page.getByLabel("Company suffix").fill("Acme");
  await page.getByText("Preview JSON").click();

  const preview = await page.getByLabel("Generated GTM JSON").inputValue();
  expect(JSON.parse(preview).containerVersion.tag).toHaveLength(6);
  expect(preview).toContain("G-PLAYWRIGHT1");
  expect(preview).not.toContain("G-ABCDEFGHIJK");
  expect(preview.endsWith("\n")).toBe(true);

  await page.getByRole("button", { name: "Copy JSON" }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromise;
  const downloaded = await readFile((await download.path())!, "utf8");
  expect(withoutExportTime(copied)).toBe(withoutExportTime(preview));
  expect(withoutExportTime(downloaded)).toBe(withoutExportTime(preview));
});

test("restores saved choices and resets to the default ecommerce tags", async ({ page }) => {
  await page.getByRole("button", { name: "Essential only" }).click();
  // Wait for the choice to land before reloading — persistence happens in an effect, not on click.
  await expect(page.getByRole("heading", { name: "6 tags selected" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "6 tags selected" })).toBeVisible();
  await expect(page.getByText("Saved tag choices recovered.")).toBeVisible();
  await page.getByRole("button", { name: "Reset choices" }).click();
  await expect(page.getByRole("heading", { name: "14 tags selected" })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: /page_view/i })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: /page_view/i })).toBeDisabled();
});

test("exports the simplified shared tag with short names", async ({ page }) => {
  await page.getByLabel("Tag structure").selectOption("simplified");
  await page.getByLabel("Tag naming").selectOption("short");
  await expect(page.getByRole("heading", { name: "2 tags selected" })).toBeVisible();
  await expect(page.getByText("GA4 - Ecommerce Event - Supported Events")).toBeVisible();
  await page.getByLabel("GA4 measurement ID").fill("G-SIMPLE123");
  await page.getByLabel("Company suffix").fill("Acme");
  await page.getByText("Preview JSON").click();

  const output = JSON.parse(await page.getByLabel("Generated GTM JSON").inputValue());
  expect(output.containerVersion.tag).toHaveLength(2);
  expect(output.containerVersion.tag.some((tag: { name: string }) => tag.name === "GA4 - Page View - All Pages")).toBe(true);
  expect(output.containerVersion.tag.some((tag: { name: string }) => tag.name === "GA4 - Ecommerce Event - Supported Events")).toBe(true);
  expect(output.containerVersion.trigger).toHaveLength(13);
  expect(output.containerVersion.variable).toHaveLength(2);
});
