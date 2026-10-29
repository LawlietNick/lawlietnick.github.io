import { expect, test, type Page } from "@playwright/test";

const path = "/fi/tyokalut/viittausten-poissulkeminen/";

// A tall window and neighbouring sections keep the dragged row and its drop target on screen together,
// clear of the sticky site header
test.use({ viewport: { width: 1280, height: 1600 } });

const row = (page: Page, value: string) =>
  page.locator("tr[data-match]").filter({ has: page.locator("code", { hasText: new RegExp(`^${value.replace(/\./g, "\\.")}$`) }) });

test("the list is over GA4's 50 row limit until sections are merged", async ({ page }) => {
  await page.goto(path);
  await expect(page.locator("[data-limit]")).toContainText("GA4 sallii enintään 50");

  await page.getByRole("button", { name: "Yhdistä kaikki osiot" }).click();
  await expect(page.locator("[data-limit]")).toBeEmpty();
  await expect(page.locator("[data-status]")).toContainText("4 GA4-riviä");
  await expect(page.getByRole("button", { name: "Pura kaikki osiot" })).toBeVisible();
});

test("a row moves to another group with the select and the merged regex follows", async ({ page }) => {
  await page.goto(path);
  await row(page, "paypal.com").getByLabel("Siirrä ryhmään: paypal.com").selectOption("banks");
  await expect(page.locator('tbody[data-group="banks"]').locator(row(page, "paypal.com"))).toHaveCount(1);

  await page.locator('tbody[data-group="banks"] [data-merge]').check();
  await expect(page.locator('tbody[data-group="banks"] [data-merged-code]')).toContainText(".*paypal\\.com.*");
  await expect(page.locator('tbody[data-group="payments"] [data-merged-code]')).toBeHidden();
});

test("dragging a handle onto a group moves the row", async ({ page }) => {
  await page.goto(path);
  await row(page, "3dsecure.no").locator("[data-handle]").dragTo(page.locator('tbody[data-group="international"] .pr__grouphead'));
  await expect(page.locator('tbody[data-group="international"]').locator(row(page, "3dsecure.no"))).toHaveCount(1);
  await expect(page.locator('tbody[data-group="international"] [data-group-count]')).toHaveText("8 riviä");
});

test("dropping a row on 'new group' makes a group that is remembered, renamed and removable", async ({ page }) => {
  await page.goto(path);
  await row(page, "acs.luminorgroup.com").locator("[data-handle]").dragTo(page.locator("[data-new-group]"));

  const custom = page.locator("tbody[data-custom]");
  await expect(custom).toHaveCount(1);
  await expect(custom.locator(row(page, "acs.luminorgroup.com"))).toHaveCount(1);
  await custom.getByLabel("Ryhmän nimi").fill("Svea");
  await expect(row(page, "acs.luminorgroup.com").getByLabel("Siirrä ryhmään: acs.luminorgroup.com")).toHaveValue("custom-1");

  await page.reload();
  await expect(page.locator("tbody[data-custom]").getByLabel("Ryhmän nimi")).toHaveValue("Svea");
  await expect(page.locator("tbody[data-custom]").locator(row(page, "acs.luminorgroup.com"))).toHaveCount(1);

  await page.locator("tbody[data-custom]").getByRole("button", { name: "Poista ryhmä" }).click();
  await expect(page.locator("tbody[data-custom]")).toHaveCount(0);
  await expect(page.locator('tbody[data-group="international"]').locator(row(page, "acs.luminorgroup.com"))).toHaveCount(1);
});

test("merging a custom group counts as one GA4 row", async ({ page }) => {
  await page.goto(path);
  await page.getByRole("button", { name: "+ Uusi ryhmä" }).click();
  await row(page, "edb.com").getByLabel("Siirrä ryhmään: edb.com").selectOption("custom-1");
  await row(page, "acs4.privatbank.ua").getByLabel("Siirrä ryhmään: acs4.privatbank.ua").selectOption("custom-1");
  await page.locator("tbody[data-custom] [data-merge]").check();

  await expect(page.locator("tbody[data-custom] [data-merged-code]")).toContainText(".*edb\\.com.*|.*acs4\\.privatbank\\.ua.*");
  // 64 rows, two of them now in one merged row
  await expect(page.locator("[data-status]")).toContainText("63 GA4-riviä");
});
