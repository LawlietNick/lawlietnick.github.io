import { expect, test } from "@playwright/test";

const englishPath = "/templates/cookiebot-guide/";

test("updates every generated script option and validates the Domain Group ID", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(englishPath);

  const cbid = page.getByLabel("Cookiebot ID (data-cbid)");
  const script = page.locator("#cookiebot-script-output");
  const consentDefaultScript = page.locator("#consent-default-script-output");
  const declaration = page.locator("#cookiebot-declaration-output");
  const id = "12345678-90ab-cdef-1234-567890abcdef";

  const includeUet = page.getByLabel("Include Microsoft Advertising UET consent handling");
  const includeClarity = page.getByLabel("Include Microsoft Clarity consent handling");
  await expect(includeUet).toBeChecked();
  await expect(includeClarity).toBeChecked();
  await expect(consentDefaultScript).toContainText("window.uetq.push('consent', 'default'");
  await expect(consentDefaultScript).toContainText("window.clarity('consentv2'");

  await includeUet.uncheck();
  await expect(consentDefaultScript).not.toContainText("window.uetq");
  await expect(consentDefaultScript).toContainText("window.clarity('consentv2'");

  await includeClarity.uncheck();
  await expect(consentDefaultScript).not.toContainText("window.clarity");
  await expect(consentDefaultScript).toContainText("gtag('consent', 'default'");

  await includeUet.check();
  await includeClarity.check();

  await cbid.fill("not-an-id");
  await expect(cbid).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Enter the complete Domain Group ID in UUID format.")).toBeVisible();
  await expect(script).toContainText("YOUR COOKIEBOT ID HERE");

  await cbid.fill(id);
  await expect(cbid).not.toHaveAttribute("aria-invalid", "");
  await expect(script).toContainText(`data-cbid="${id}"`);
  await expect(declaration).toContainText(`https://consent.cookiebot.com/${id}/cd.js`);
  await expect(declaration).toContainText("async");
  await expect(declaration).not.toContainText("defer");

  await page.getByLabel("Blocking mode").selectOption("manual");
  await expect(script).toContainText("async");
  await expect(script).not.toContainText("data-blockingmode");

  await page.getByLabel("Banner language (data-culture)").selectOption("");
  await expect(script).not.toContainText("data-culture");
  await expect(script).not.toContainText('data-consentmode="disabled"');
  await expect(script).not.toContainText('data-ms-consent-mode="disabled"');
  await expect(script).not.toContainText('data-ms-clarity-consent-mode="disabled"');
  await expect(page.getByText("Advanced: disable an automatic consent integration")).toBeVisible();

  await page.getByLabel("Declaration language (data-culture)").selectOption("FI");
  await expect(declaration).toContainText('data-culture="FI"');
  await expect(pageErrors).toEqual([]);
});

test("switches between the recommended and advanced default-state scripts", async ({ page }) => {
  await page.goto(englishPath);

  const includeUet = page.getByLabel("Include Microsoft Advertising UET consent handling");
  const includeClarity = page.getByLabel("Include Microsoft Clarity consent handling");
  const storedScript = page.locator("#cookiebot-stored-consent-script pre code");

  await expect(page.locator("#consent-default-denied")).toBeVisible();
  await expect(page.locator("#consent-default-stored")).toBeHidden();

  await page.getByLabel(/Yes — advanced/).check();
  await expect(page.locator("#consent-default-denied")).toBeHidden();
  await expect(page.locator("#consent-default-stored")).toBeVisible();
  await expect(storedScript).toContainText("includeMicrosoftUet: true");
  await expect(storedScript).toContainText("includeMicrosoftClarity: true");

  await includeUet.uncheck();
  await includeClarity.uncheck();
  await expect(storedScript).toContainText("includeMicrosoftUet: false");
  await expect(storedScript).toContainText("includeMicrosoftClarity: false");

  await includeUet.check();
  await includeClarity.check();
  await expect(storedScript).toContainText("includeMicrosoftUet: true");
  await expect(storedScript).toContainText("includeMicrosoftClarity: true");

  await page.getByLabel(/No — recommended/).check();
  await expect(page.locator("#consent-default-denied")).toBeVisible();
  await expect(page.locator("#consent-default-stored")).toBeHidden();
});

test("keeps generated code visible across language switches", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(englishPath);
  await expect(page.locator("#cookiebot-script-output")).toContainText('data-culture="EN"');

  await page.locator("header").getByRole("button", { name: "Language: English" }).click();
  await page.getByRole("link", { name: "Suomi", exact: true }).click();
  await expect(page).toHaveURL(/\/fi\/toteutusmallit\/cookiebot-opas\/$/);
  await expect(page.locator("#cookiebot-script-output")).toContainText('data-culture="FI"');
  await expect(page.locator("#cookiebot-declaration-output")).toContainText("COOKIEBOT-TUNNUS-TÄHÄN");

  await page.getByLabel(/Kyllä\. Edistynyt toteutus/).check();
  await expect(page.locator("#consent-default-stored")).toBeVisible();

  const accordion = page.locator("#consent-default-stored [data-code-accordion]");
  const content = accordion.locator("[data-code-accordion-content]");
  const toggle = accordion.locator("[data-code-accordion-toggle]");

  await expect(accordion).toHaveAttribute("data-ready", "true");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toHaveText("Näytä koko Consent Mode -skripti");

  const collapsed = await content.evaluate((element) => ({
    clientHeight: element.clientHeight,
    overflowY: getComputedStyle(element).overflowY,
    scrollHeight: element.scrollHeight,
  }));
  expect(collapsed.clientHeight).toBeLessThan(collapsed.scrollHeight);
  expect(["auto", "scroll"]).toContain(collapsed.overflowY);

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toHaveText("Piilota koko Consent Mode -skripti");
  const expandedHeight = await content.evaluate((element) => element.clientHeight);
  expect(expandedHeight).toBeGreaterThan(collapsed.clientHeight);
  expect(pageErrors).toEqual([]);
});
