import { expect, test, type Page } from "@playwright/test";

const path = "/fi/tyokalut/meta-campaigncraft/";
const defaultString =
  "utm_source={{site_source_name}}&utm_medium=paidsocial&utm_source_platform=Meta%20Ads&utm_campaign={{campaign.name}}&utm_id={{campaign.id}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_marketing_tactic=prospecting&utm_creative_format=video";

// The tool opens on the naming step; the UTM tests start from step 2.
// The builder opens with Suositeltu in place. Another template is one change away.
const openNaming = async (page: Page, template = "Suositeltu") => {
  await page.goto(path);
  if (template === "Suositeltu") return;
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("button", { name: "Näytä kaikki 7 mallia" }).click();
  await page.getByRole("radio", { name: template }).check();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();
};

const openUtm = async (page: Page) => {
  await page.goto(path);
  await page.getByRole("tab", { name: /UTM-rakentaja/ }).click();
};

const choose = async (page: Page, name: RegExp, option: string | RegExp) => {
  await page.getByRole("combobox", { name }).click();
  await page.getByRole("option", { name: option }).click();
};

const previewKeys = (page: Page) => page.locator("[data-preview] .mu__key").allTextContents();

test("builds the default string, previews the same parameters and copies it", async ({ page }) => {
  await openUtm(page);
  await expect(page.locator("[data-out]")).toHaveText(defaultString);
  expect(await previewKeys(page)).toEqual(defaultString.split("&").map((pair) => pair.split("=")[0]));

  await page.getByRole("button", { name: "Kopioi UTM-parametrit" }).click();
  await expect(page.locator("[data-copy-status]")).toHaveText("UTM-parametrit kopioitu leikepöydälle.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(defaultString);
});

test("choices update the string, the preview and the parameter list together", async ({ page }) => {
  await openUtm(page);
  await choose(page, /Millainen kampanja on/, "Remarketing (aiemmin kontaktoidut)");
  await choose(page, /Minkä muotoinen mainos on/, /Advantage\+ -katalogimainos/);
  await page.getByRole("radio", { name: /Näyttöpaikkaa/ }).check();

  const out = page.locator("[data-out]");
  await expect(out).toContainText("utm_term={{placement}}");
  await expect(out).toContainText("utm_marketing_tactic=remarketing");
  await expect(out).toContainText("utm_creative_format={{media_type}}");
  await expect(page.locator("[data-preview]")).toContainText("instagram_stories");
  await expect(page.locator("[data-preview]")).toContainText("Meta ei listaa tämän makron arvoja");

  await page.getByRole("radio", { name: /Ei kumpaakaan/ }).check();
  await expect(out).not.toContainText("utm_term");
  expect(await previewKeys(page)).not.toContain("utm_term");
  await expect(page.locator("[data-parts]")).not.toContainText("utm_term");
});

test("advanced settings stay editable, and an empty one drops its parameter", async ({ page }) => {
  await openUtm(page);
  await expect(page.locator("details.mu__advanced")).not.toHaveAttribute("open", "");
  await page.getByText("Lisäasetukset").click();
  await page.getByLabel(/Hallinta-alusta/).fill("Meta & Co");
  await expect(page.locator("[data-out]")).toContainText("utm_source_platform=Meta%20%26%20Co");
  await page.locator("[data-medium]").fill("");
  await expect(page.locator("[data-out]")).toContainText("utm_medium=paidsocial&");
  expect(await previewKeys(page)).toContain("utm_medium");
});

test("directory finds a value by technical value and plain name and filters", async ({ page }) => {
  await openUtm(page);
  const search = page.getByLabel("Hae arvoa");
  const names = () => page.locator('.mu__entry [data-cell="value"] .mu__code').allTextContents();

  await search.fill("instagram_stories");
  // the ig source row mentions Stories in its explanation, so it matches too
  await expect(page.locator("[data-count]")).toHaveText("2 arvoa");
  expect((await names()).sort()).toEqual(["ig", "instagram_stories"]);

  await search.fill("Stories");
  expect(await names()).toContain("instagram_stories");

  await search.fill("threads");
  expect((await names()).sort()).toEqual(["th", "threads_stream"]);

  await search.fill("ei-ole-olemassa");
  await expect(page.locator("[data-empty]")).toBeVisible();
  await expect(page.locator(".mu__entry")).toHaveCount(0);
});

test("works after ClientRouter navigation, also on a second visit", async ({ page }) => {
  await page.goto("/fi/tyokalut/");
  for (let visit = 0; visit < 2; visit++) {
    await page.locator('a[href="/fi/tyokalut/meta-campaigncraft/"]').first().click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await page.getByRole("tab", { name: /UTM-rakentaja/ }).click();
    await expect(page.locator("[data-out]")).toHaveText(defaultString);
    await page.getByRole("radio", { name: /Näyttöpaikkaa/ }).check();
    await expect(page.locator("[data-out]")).toContainText("utm_term={{placement}}");
    await page.getByLabel("Hae arvoa").fill("th");
    await expect(page.locator(".mu__entry").first()).toBeVisible();
    expect(await page.locator("[data-meta-utm]").count()).toBe(1);
    await page.goBack();
    await expect(page).toHaveURL(/\/fi\/tyokalut\/$/);
  }
});

test("mobile layout has no horizontal scroll and the tool is usable by keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openUtm(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  const radio = page.getByRole("radio", { name: /Mainosjoukkoa/ });
  await radio.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: /Näyttöpaikkaa/ })).toBeChecked();
  await expect(page.locator("[data-out]")).toContainText("utm_term={{placement}}");

  await page.getByLabel("Hae arvoa").fill("feed");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  for (const status of ["[data-copy-status]", "[data-count]"]) {
    await expect(page.locator(status)).toHaveAttribute("role", "status");
  }
});

test("renders in light and dark themes with readable text", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await openUtm(page);
    const contrast = await page.locator(".mu__meaning").first().evaluate((node) => {
      // Resolve any CSS colour (including color-mix and light-dark) to sRGB through a canvas.
      const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
      const rgba = (css: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        return [...ctx.getImageData(0, 0, 1, 1).data];
      };
      const luminance = ([r, g, b]: number[]) => {
        const [R, G, B] = [r, g, b].map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
      };
      let background: number[] = [0, 0, 0, 0];
      for (let el: HTMLElement | null = node as HTMLElement; el && background[3] < 255; el = el.parentElement) {
        const layer = rgba(getComputedStyle(el).backgroundColor);
        if (layer[3] > 0) background = background[3] === 0 ? layer : background;
      }
      const a = luminance(rgba(getComputedStyle(node).color));
      const b = luminance(background);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    });
    expect(contrast, colorScheme).toBeGreaterThan(4.5);
  }
});

test("every section is labelled by a heading and the sections stay in document order", async ({ page }) => {
  await openUtm(page);
  const sections = await page.locator("[data-step=\"utm\"] section").evaluateAll((nodes) =>
    nodes.map((node) => {
      const heading = document.getElementById(node.getAttribute("aria-labelledby") ?? "");
      return { labelled: Boolean(heading && heading.textContent?.trim()), top: node.getBoundingClientRect().top + scrollY };
    })
  );
  expect(sections.length).toBeGreaterThan(0);
  expect(sections.every((section) => section.labelled)).toBe(true);
  const tops = sections.map((section) => section.top);
  expect(tops).toEqual([...tops].sort((a, b) => a - b));
});

test("desktop: choices and result sit side by side, copy is in the first screen, extras are closed", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openUtm(page);
  await page.locator('[data-step="utm"] .mu__build').scrollIntoViewIfNeeded();
  const box = async (selector: string) => (await page.locator(selector).boundingBox())!;
  const choices = await box(".mu__choices-card");
  const result = await box('[data-step="utm"] .mu__result');
  expect(result.x).toBeGreaterThan(choices.x + choices.width - 1);
  expect(Math.abs(result.y - choices.y)).toBeLessThan(40);
  const copy = await box("[data-copy]");
  expect(copy.y + copy.height).toBeLessThanOrEqual(800);
  expect((await box('[data-step="utm"] .mu__build')).height).toBeLessThan(1160); // the parts table is taller than the old list
  await expect(page.locator("details.mu__advanced")).not.toHaveAttribute("open", "");
  await expect(page.locator("details.mu__parts")).toHaveAttribute("open", "");
  const firstPart = page.locator("[data-parts] tr").first().getByRole("cell");
  await expect(firstPart.nth(0)).toContainText("utm_source");
  await expect(firstPart.nth(0)).toContainText("Lähde");
  await expect(firstPart.nth(1)).toHaveText("{{site_source_name}}");
  await expect(page.locator('[data-step="utm"] .cta--primary')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("mobile: one column, result and full-width copy come right after the three choices", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openUtm(page);
  const top = async (selector: string) => (await page.locator(selector).first().boundingBox())!.y + (await page.evaluate(() => scrollY));
  const order = [await top("[data-tactic]"), await top("[data-format]"), await top("[data-term]"), await top("[data-out]"), await top("[data-copy]"), await top("details.mu__advanced"), await top("#mu-preview")];
  expect(order).toEqual([...order].sort((a, b) => a - b));
  const copy = (await page.locator("[data-copy]").boundingBox())!;
  const out = (await page.locator("[data-out]").boundingBox())!;
  expect(copy.width).toBeGreaterThan(out.width * 0.95);
});

test("a very long string stays inside a bounded, scrollable area and is copied in full", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openUtm(page);
  await page.getByText("Lisäasetukset").click();
  await page.locator("[data-medium]").fill("x".repeat(400));
  const out = page.locator("[data-out]");
  const metrics = await out.evaluate((node) => ({ client: node.clientHeight, scroll: node.scrollHeight }));
  expect(metrics.client).toBeLessThanOrEqual(160);
  expect(metrics.scroll).toBeGreaterThan(metrics.client);
  await expect(out).toHaveAttribute("tabindex", "0");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Kopioi UTM-parametrit" }).click();
  await expect(page.locator("[data-copy-status]")).toHaveText("UTM-parametrit kopioitu leikepöydälle.");
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("utm_medium=" + "x".repeat(400));
  expect(copied).toBe(await out.evaluate((node) => node.textContent));
});

test("a failed copy says so", async ({ page }) => {
  await openUtm(page);
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("denied")) }, configurable: true }));
  await page.getByRole("button", { name: "Kopioi UTM-parametrit" }).click();
  await expect(page.locator("[data-copy-status]")).toContainText("Kopiointi ei onnistunut");
});

test("directory is a three-column table with the agreed headers", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openUtm(page);
  const table = page.getByRole("table", { name: "Metan arvohakemisto" });
  await expect(table.getByRole("columnheader")).toHaveText(["Muuttuja", "Arvo", "Selite"]);
  await page.getByLabel("Hae arvoa").fill("instagram_stories");
  const cells = table.locator("tbody tr").filter({ hasText: "placement" }).first().getByRole("cell");
  await expect(cells.nth(0)).toContainText("placement");
  await expect(cells.nth(1)).toContainText("instagram_stories");
  await expect(cells.nth(2)).toContainText("koko näytön pystysuuntaisessa esitysmuodossa");
  const widths = await table.locator("th").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().width));
  expect(widths[2]).toBeGreaterThan(widths[0]);
  expect(widths[2]).toBeGreaterThan(widths[1]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("the explanation column is searchable", async ({ page }) => {
  await openUtm(page);
  const row = page.locator(".mu__entry").filter({ hasText: "audience_network_rewarded_video" });
  const note = (await row.locator('[data-cell="note"] .mu__desc').textContent()) ?? "";
  const word = note.split(/\s+/).find((w) => /^[a-zäö]{8,}$/i.test(w) && !/audience|network|rewarded/i.test(w))!;
  await page.getByLabel("Hae arvoa").fill(word);
  await expect(page.locator(".mu__entry").filter({ hasText: "audience_network_rewarded_video" })).toHaveCount(1);
});

test("mobile: table rows stack with labelled cells and no horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openUtm(page);
  await page.getByLabel("Hae arvoa").fill("instagram_stories");
  const row = page.locator(".mu__entry").first();
  const cells = row.locator("td");
  await expect(cells).toHaveCount(3);
  expect(await cells.evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).display))).toEqual(["block", "block", "block"]);
  expect(await cells.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-label")))).toEqual(["Muuttuja", "Arvo", "Selite"]);
  const tops = await cells.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top));
  expect(tops).toEqual([...tops].sort((a, b) => a - b));
  expect(new Set(tops).size).toBe(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page.getByRole("table", { name: "Metan arvohakemisto" })).toBeVisible();
});

test("opening the parameter list does not resize the input fields", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openUtm(page);
  const heights = () => page.locator(".mu__choices .combobox__input").evaluateAll((nodes) => nodes.map((node) => Math.round(node.getBoundingClientRect().height)));
  const before = await heights();
  await page.getByText("Parametrit yksitellen").click();
  expect(await heights()).toEqual(before);
});

test("the choice lists open from the keyboard and keep the chosen label", async ({ page }) => {
  await openUtm(page);
  const tactic = page.getByRole("combobox", { name: /Millainen kampanja on/ });
  await tactic.focus();
  await tactic.press("ArrowDown");
  await expect(page.getByRole("listbox", { name: /Millainen kampanja on/ }).getByRole("option")).toHaveCount(6);
  await tactic.press("ArrowDown");
  await tactic.press("Enter");
  await expect(tactic).toHaveValue("Remarketing (aiemmin kontaktoidut)");
  await expect(page.locator("[data-out]")).toContainText("utm_marketing_tactic=remarketing");
});

test("naming step builds the formula, edits separators and carries on to the UTM step", async ({ page }) => {
  await openNaming(page);
  await expect(page.locator("[data-formula]")).toHaveText("{market}_{objective}_{campaign}_{year}");
  await expect(page.locator("[data-example]")).toHaveText("fi_leads_summer_2027");

  await page.locator('[data-sep-btn="-"]').click();
  await expect(page.locator("[data-example]")).toHaveText("fi-leads-summer-2027");

  await page.getByRole("tab", { name: /2\. Mainosjoukko/ }).click();
  await expect(page.locator("[data-example]")).toHaveText("prospecting_broad_conversions");

  await page.getByRole("combobox", { name: "Lisää komponentti kirjastosta" }).click();
  await page.getByRole("option", { name: /Versio \(Version\) \{version\}/ }).click();
  await expect(page.locator("[data-formula]")).toHaveText("{funnel_stage}_{audience}_{optimization}_{version}");

  await page.getByRole("button", { name: "Poista komponentti: version" }).click();
  await expect(page.locator("[data-formula]")).toHaveText("{funnel_stage}_{audience}_{optimization}");

  await expect(page.locator("[data-banner]")).toBeHidden();
  await page.getByRole("button", { name: /Vie nimet UTM-rakentajaan/ }).click();
  await expect(page.locator("[data-out]")).toHaveText(defaultString);
  await expect(page.locator("[data-banner]")).toContainText("Nimeämiskäytäntö on määritetty");
});

test("a custom component joins the library and the level", async ({ page }) => {
  await openNaming(page);
  await lowercaseBox(page).uncheck();
  await page.getByRole("button", { name: "Lisää uusi komponentti" }).click();
  await page.locator("[data-custom-key]").fill("Offer!");
  await page.getByRole("combobox", { name: "Arvon tyyppi" }).click();
  await page.getByRole("option", { name: "Ennalta määritelty lista" }).click();
  await page.locator("[data-custom-allowed]").fill("20Off, BOGO");
  await page.locator("[data-custom-save]").click();
  await expect(page.locator("[data-formula]")).toHaveText("{market}_{objective}_{campaign}_{year}_{offer}");
  await expect(page.locator("[data-example]")).toHaveText("FI_Leads_Summer_2027_20Off");

  await page.getByRole("button", { name: "Lisää uusi komponentti" }).click();
  await page.locator("[data-custom-key]").fill("offer");
  await page.locator("[data-custom-save]").click();
  await expect(page.locator("[data-custom-error]")).toHaveText("Avain on jo kirjastossa.");
});

test("a custom campaign type is typed in and lands in the string, and the new options exist", async ({ page }) => {
  await openUtm(page);
  await choose(page, /Millainen kampanja on/, "Retention (nykyiset asiakkaat)");
  await expect(page.locator("[data-out]")).toContainText("utm_marketing_tactic=retention");
  await choose(page, /Millainen kampanja on/, "Muu (oma arvo)");
  await page.locator("[data-tactic-custom]").fill("Lead Gen");
  await expect(page.locator("[data-out]")).toContainText("utm_marketing_tactic=lead_gen");
  await choose(page, /Minkä muotoinen mainos on/, "Kokoelma");
  await expect(page.locator("[data-out]")).toContainText("utm_creative_format=collection");
  await expect(page.locator("[data-parts]")).toContainText("lead_gen");
  await expect(page.locator("[data-parts]")).toContainText("collection");
});

test("the naming step has no native selects and a row value is picked from a combobox", async ({ page }) => {
  await openNaming(page);
  await lowercaseBox(page).uncheck();
  await expect(page.locator("[data-meta-utm] select")).toHaveCount(0);
  await page.getByRole("combobox", { name: "Arvo: market" }).click();
  await page.getByRole("option", { name: "SE" }).click();
  await expect(page.locator("[data-example]")).toHaveText("SE_Leads_Summer_2027");
  await page.getByRole("combobox", { name: "Lisää komponentti kirjastosta" }).click();
  await page.getByRole("option", { name: /Kieli \(Language\) \{language\}/ }).click();
  await expect(page.locator("[data-formula]")).toHaveText("{market}_{objective}_{campaign}_{year}_{language}");
  await expect(page.getByRole("combobox", { name: "Lisää komponentti kirjastosta" })).toHaveValue("+ Lisää komponentti kirjastosta");
});

test("the step tabs change with arrow keys without scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 500 });
  await openNaming(page);
  await page.evaluate(() => window.scrollTo(0, 300));
  const before = await page.evaluate(() => scrollY);
  await page.getByRole("tab", { name: /Nimeämiskäytäntö/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /UTM-rakentaja/ })).toHaveAttribute("aria-selected", "true");
  expect(await page.evaluate(() => scrollY)).toBe(before);
});

const levelTabs = ["Kampanja", "Mainosjoukko", "Mainos"];
const lowercaseBox = (page: Page) => page.getByRole("checkbox", { name: "Kaikki pienillä kirjaimilla" });

test("lowercase is on by default, is chosen per level, leaves the formula alone and can be switched off", async ({ page }) => {
  await openNaming(page);
  const box = lowercaseBox(page);
  await expect(box).toBeChecked();
  await expect(page.locator("[data-example]")).toHaveText("fi_leads_summer_2027");
  await expect(page.locator("[data-formula]")).toHaveText("{market}_{objective}_{campaign}_{year}");
  await expect(page.locator("[data-overview]")).toContainText("fi_leads_summer_2027");
  await page.getByRole("button", { name: "Kopioi nimi" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("fi_leads_summer_2027");

  await page.getByRole("tab", { name: /2\. Mainosjoukko/ }).click();
  await expect(box).toBeChecked();
  await box.uncheck();
  await expect(page.locator("[data-example]")).toHaveText("Prospecting_Broad_Conversions");
  await expect(page.locator("[data-overview]")).toContainText("Prospecting_Broad_Conversions");
  await expect(page.locator("[data-overview]")).toContainText("fi_leads_summer_2027");

  await page.getByRole("tab", { name: /1\. Kampanja/ }).click();
  await expect(box).toBeChecked();

  await page.getByRole("button", { name: /Vie nimet UTM-rakentajaan/ }).click();
  await page.locator("[data-banner] summary").click();
  await expect(page.locator("[data-banner]")).toContainText("fi_leads_summer_2027");
  await expect(page.locator("[data-banner]")).toContainText("Prospecting_Broad_Conversions");
  await page.getByRole("button", { name: "Muokkaa nimeämiskäytäntöä" }).click();

  await box.uncheck();
  await expect(page.locator("[data-example]")).toHaveText("FI_Leads_Summer_2027");
  await expect(page.locator("[data-overview]")).not.toContainText("fi_leads_summer_2027");
});

test("the separator and lowercase controls stay in the same place on every level", async ({ page }) => {
  for (const size of [{ width: 390, height: 844 }, { width: 800, height: 900 }, { width: 1280, height: 800 }]) {
    await page.setViewportSize(size);
    await openNaming(page);
    // late-loading fonts shift the layout by a few pixels, so measure after they are ready
    await page.evaluate(() => document.fonts.ready);
    const places: number[][] = [];
    for (const [n, name] of levelTabs.entries()) {
      await page.getByRole("tab", { name: new RegExp(`${n + 1}\\. ${name}`) }).click();
      // read the box and the scroll position in one step, so a scroll in progress cannot skew the result
      const spot = (selector: string) =>
        page.evaluate((sel) => {
          const box = document.querySelector(sel)!.getBoundingClientRect();
          return [box.x, box.y + scrollY, box.width, box.height];
        }, selector);
      places.push([...(await spot(".mu__sepgroup")), ...(await spot(".mu__check"))]);
      // its own row: below the heading, above the components
      const rowBox = (await page.locator(".mu__levelopts").boundingBox())!;
      expect((await page.locator("[data-comps-heading]").boundingBox())!.y).toBeLessThan(rowBox.y);
      expect((await page.locator("[data-comps] li").first().boundingBox())!.y).toBeGreaterThan(rowBox.y);
    }
    // the same x, y, width and height on all three levels, within a pixel of rounding
    for (let k = 0; k < places[0].length; k++) {
      const column = places.map((place) => place[k]);
      expect(Math.max(...column) - Math.min(...column), `${size.width}px value ${k}: ${column.join(", ")}`).toBeLessThanOrEqual(1);
    }
  }
});

test("Escape closes an open list first and the dialog only on the second press", async ({ page }) => {
  await openNaming(page);
  await page.getByRole("button", { name: "Lisää uusi komponentti" }).click();
  const dialog = page.locator("[data-custom-dialog]");
  await expect(dialog).toBeVisible();
  const type = page.getByRole("combobox", { name: "Arvon tyyppi" });
  await type.click();
  await expect(page.getByRole("listbox", { name: "Arvon tyyppi" })).toBeVisible();
  await type.press("Escape");
  await expect(page.getByRole("listbox", { name: "Arvon tyyppi" })).toBeHidden();
  await expect(dialog).toBeVisible();
  await type.press("Escape");
  await expect(dialog).toBeHidden();
});

test("the value type list opens in full inside the dialog", async ({ page }) => {
  await openNaming(page);
  await page.getByRole("button", { name: "Lisää uusi komponentti" }).click();
  await page.getByRole("combobox", { name: "Arvon tyyppi" }).click();
  const options = page.getByRole("listbox", { name: "Arvon tyyppi" }).getByRole("option");
  const count = await options.count();
  expect(count).toBeGreaterThan(1);
  for (let n = 0; n < count; n++) {
    await expect(options.nth(n)).toBeVisible();
    // what sits at the centre of the option is the option itself, so nothing clips or covers it
    const reachable = await options.nth(n).evaluate((node) => {
      const box = node.getBoundingClientRect();
      const top = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
      return Boolean(top && node.contains(top));
    });
    expect(reachable, `option ${n}`).toBe(true);
  }
});

test("the dialog has one primary button, and the level tabs show a focus ring that is not clipped", async ({ page }) => {
  await openNaming(page);
  await page.getByRole("button", { name: "Lisää uusi komponentti" }).click();
  await expect(page.locator("[data-custom-dialog] .cta--primary")).toHaveCount(1);
  await expect(page.locator("[data-custom-save]")).toHaveClass(/cta--primary/);
  await expect(page.locator("[data-custom-cancel]")).toHaveClass(/cta--secondary/);
  await page.locator("[data-custom-cancel]").click();

  await page.getByRole("tab", { name: /1\. Kampanja/ }).focus();
  await page.keyboard.press("ArrowRight");
  const ring = await page.locator("[data-level-btn]:focus-visible").evaluate((node) => {
    const style = getComputedStyle(node);
    return { offset: parseFloat(style.outlineOffset), width: parseFloat(style.outlineWidth) };
  });
  expect(ring.offset).toBeLessThan(0);
  expect(ring.width).toBeGreaterThan(0);
});

test("focus stays on the matching button after a row is moved or removed", async ({ page }) => {
  await openNaming(page);
  const row = (n: number) => page.locator("[data-comps] .mu__comp").nth(n);
  const act = (n: number, name: string) => row(n).locator(`[data-act="${name}"]`);

  // second row up: it becomes the first, whose up arrow is disabled, so the down arrow gets focus
  await act(1, "up").click();
  await expect(act(0, "down")).toBeFocused();
  // down from the first row: the moved row is second now and its down arrow still works
  await act(0, "down").click();
  await expect(act(1, "down")).toBeFocused();
  // down to the end: the last row's down arrow is disabled, focus goes to its up arrow
  await act(1, "down").click();
  await act(2, "down").click();
  await expect(act(3, "up")).toBeFocused();

  // removing a row puts focus on the remove button of the row that took its place
  await act(1, "remove").click();
  await expect(act(1, "remove")).toBeFocused();
  await act(1, "remove").click();
  await expect(act(1, "remove")).toBeFocused();
  // removing the last row leaves the add list
  await act(1, "remove").click();
  await expect(act(0, "remove")).toHaveCount(1);
  await expect(page.getByRole("combobox", { name: "Lisää komponentti kirjastosta" })).toBeFocused();
});

test("mobile: every step and level tab fits inside the ribbon", async ({ page }) => {
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await openNaming(page);
    for (const selector of [".mu__steptabs", ".mu__tabs"]) {
      const metrics = await page.locator(selector).evaluate((node) => ({ scroll: node.scrollWidth, client: node.clientWidth }));
      expect(metrics.scroll, `${selector} at ${width}px`).toBeLessThanOrEqual(metrics.client);
    }
    for (const tab of await page.getByRole("tab").all()) {
      const box = (await tab.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    await expect(page.getByRole("tab", { name: /3\. Mainos$/ })).toBeVisible();
    await expect(page.getByRole("tab", { name: "UTM-rakentaja" })).toBeVisible();
  }
});

test("step 2 has the same eyebrow, heading structure as step 1", async ({ page }) => {
  await openUtm(page);
  await expect(page.locator('[data-step="naming"] .mu__eyebrow')).toHaveText("Vaihe 1 / 2");
  await expect(page.locator('[data-step="utm"] .mu__head .mu__eyebrow')).toHaveText("Vaihe 2 / 2");
  await expect(page.locator('[data-step="utm"] .mu__head h2')).toHaveText("Metan UTM-rakentaja");
});

test("the result box is named neutrally and its titles are headings", async ({ page }) => {
  await openNaming(page);
  await expect(page.getByRole("complementary", { name: "Tulos" })).toBeVisible();
  await expect(page.locator("aside.mu__result").getByRole("heading")).toHaveText(["Kaava", "Generoitu nimi", "Koko nimeämiskäytäntö"]);
});

test("the copied message goes away when the name changes", async ({ page }) => {
  await openNaming(page);
  const status = page.locator("[data-naming-status]");
  await page.getByRole("button", { name: "Kopioi nimi" }).click();
  await expect(status).toHaveText("Nimi kopioitu leikepöydälle.");
  await lowercaseBox(page).uncheck();
  await expect(status).toHaveText("");
  await page.getByRole("button", { name: "Kopioi nimi" }).click();
  await expect(status).toHaveText("Nimi kopioitu leikepöydälle.");
  await page.locator('[data-sep-btn="-"]').click();
  await expect(status).toHaveText("");
  await page.getByRole("button", { name: "Kopioi nimi" }).click();
  await expect(status).toHaveText("Nimi kopioitu leikepöydälle.");
  await page.getByRole("textbox", { name: "Arvo: campaign" }).fill("Summer");
  await expect(status).toHaveText("");
});

test("the dialog gives focus back to its opener, and Space switches lowercase", async ({ page }) => {
  await openNaming(page);
  const opener = page.getByRole("button", { name: "Lisää uusi komponentti" });
  await opener.click();
  await page.locator("[data-custom-cancel]").click();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();

  const box = lowercaseBox(page);
  await box.focus();
  await expect(box).toBeChecked();
  await page.keyboard.press("Space");
  await expect(box).not.toBeChecked();
  await expect(page.locator("[data-example]")).toHaveText("FI_Leads_Summer_2027");
  await page.keyboard.press("Space");
  await expect(box).toBeChecked();
  await expect(page.locator("[data-example]")).toHaveText("fi_leads_summer_2027");
});

test("lowercase also applies to a custom component", async ({ page }) => {
  await openNaming(page);
  await page.getByRole("button", { name: "Lisää uusi komponentti" }).click();
  await page.locator("[data-custom-key]").fill("offer");
  await page.locator("[data-custom-save]").click();
  await page.getByRole("textbox", { name: "Arvo: offer" }).fill("SummerSale");
  await expect(page.locator("[data-example]")).toHaveText("fi_leads_summer_2027_summersale");
  await lowercaseBox(page).uncheck();
  await expect(page.locator("[data-example]")).toHaveText("FI_Leads_Summer_2027_SummerSale");
  await expect(page.locator("[data-formula]")).toHaveText("{market}_{objective}_{campaign}_{year}_{offer}");
});

test("a dialog error marks the field invalid, points to the message and moves focus to the field", async ({ page }) => {
  await openNaming(page);
  await page.getByRole("button", { name: "Lisää uusi komponentti" }).click();
  const key = page.locator("[data-custom-key]");
  await page.locator("[data-custom-save]").click();
  await expect(page.locator("[data-custom-error]")).toHaveText("Anna komponentille avain.");
  await expect(key).toHaveAttribute("aria-invalid", "true");
  await expect(key).toHaveAttribute("aria-describedby", "mu-custom-error");
  await expect(key).toBeFocused();
  await key.fill("offer");
  await expect(key).not.toHaveAttribute("aria-invalid", "true");
  await expect(key).not.toHaveAttribute("aria-describedby", /.+/);
});

test("the add row, the example button and the dialog buttons are as tall as their neighbours", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openNaming(page);
  const height = async (selector: string) => (await page.locator(selector).first().boundingBox())!.height;
  const add = [await height(".mu__add .combobox__input"), await height(".mu__add .btn-quiet")];
  expect(Math.abs(add[0] - add[1])).toBeLessThanOrEqual(1);
  await page.getByRole("button", { name: "Lisää uusi komponentti" }).click();
  const dialog = await page.locator(".mu__dialogact .cta").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
  expect(Math.abs(dialog[0] - dialog[1])).toBeLessThanOrEqual(1);
  expect(Math.abs(dialog[0] - add[1])).toBeLessThanOrEqual(1);
});

test("the lowercase checkbox uses the small UI font and sits on the separator's centre line", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openNaming(page);
  const check = page.locator(".mu__check");
  expect(await check.evaluate((node) => getComputedStyle(node).fontSize)).toBe("14px");
  const centre = async (selector: string) => { const box = (await page.locator(selector).boundingBox())!; return box.y + box.height / 2; };
  expect(Math.abs((await centre(".mu__check")) - (await centre(".segmented")))).toBeLessThanOrEqual(1);
});

test("the medium has shortcut buttons and a field for your own value, and emptying it falls back to paidsocial", async ({ page }) => {
  await openUtm(page);
  await page.getByText("Lisäasetukset").click();
  const field = page.locator("[data-medium]");
  const chip = (name: string | RegExp) => page.locator("[data-medium-preset]").filter({ hasText: name });
  await expect(field).toHaveValue("paidsocial");
  await expect(chip("paidsocial")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-medium-preset]")).toHaveText([/paidsocial/, "paid_social", "cpc", "Muu (oma arvo)"]);

  await chip("paid_social").click();
  await expect(field).toHaveValue("paid_social");
  await expect(page.locator("[data-out]")).toContainText("utm_medium=paid_social&");
  await expect(chip("paid_social")).toHaveAttribute("aria-pressed", "true");
  await expect(chip("paidsocial").first()).toHaveAttribute("aria-pressed", "false");

  await chip("Muu (oma arvo)").click();
  await expect(field).toBeFocused();
  await field.fill("Oma kanava");
  await expect(page.locator("[data-out]")).toContainText("utm_medium=Oma%20kanava&");
  await expect(chip("Muu (oma arvo)")).toHaveAttribute("aria-pressed", "true");

  await field.fill("");
  await expect(page.locator("[data-out]")).toContainText("utm_medium=paidsocial&");
  expect(await previewKeys(page)).toContain("utm_medium");
  await expect(page.getByLabel(/Hallinta-alusta/)).toHaveValue("Meta Ads");
});

test("a published campaign swaps campaign, content and term for typed values", async ({ page }) => {
  await openUtm(page);
  const out = page.locator("[data-out]");
  await expect(page.locator("[data-published-group]")).toBeHidden();
  await expect(page.locator("[data-term-group]")).toBeVisible();

  await page.getByRole("radio", { name: "Julkaistu kampanja" }).check();
  await expect(page.locator("[data-published-group]")).toBeVisible();
  await expect(page.locator("[data-term-group]")).toBeHidden();
  await expect(out).not.toContainText("utm_campaign");
  await expect(out).toContainText("utm_id={{campaign.id}}");

  await page.locator("[data-fixed-campaign]").fill("BlackFriday 2026");
  await page.locator("[data-fixed-content]").fill("video_a");
  await page.locator("[data-fixed-term]").fill("Retargeting_30d");
  await expect(out).toContainText("utm_campaign=BlackFriday%202026&utm_id={{campaign.id}}&utm_content=video_a&utm_term=Retargeting_30d&");
  await expect(page.locator("[data-parts]")).toContainText("Retargeting_30d");

  await page.getByRole("radio", { name: "Uusi kampanja" }).check();
  await expect(out).toContainText("utm_campaign={{campaign.name}}");
  await expect(out).toContainText("utm_content={{ad.name}}");
});

test("published campaign fields start from the naming step and keep what the user typed", async ({ page }) => {
  await openNaming(page);
  await page.getByRole("button", { name: /Vie nimet UTM-rakentajaan/ }).click();
  await page.getByRole("radio", { name: "Julkaistu kampanja" }).check();
  await expect(page.locator("[data-fixed-campaign]")).toHaveValue("fi_leads_summer_2027");
  await expect(page.locator("[data-fixed-term]")).not.toHaveValue("");
  await expect(page.locator("[data-fixed-content]")).not.toHaveValue("");

  await page.locator("[data-fixed-campaign]").fill("oma_nimi");
  await page.getByRole("button", { name: /Rakenna päivitetyt nimet/ }).click();
  await expect(page.locator('[data-step="naming"]')).toBeVisible();
  await page.getByRole("tab", { name: /UTM-rakentaja/ }).click();
  await expect(page.locator("[data-fixed-campaign]")).toHaveValue("oma_nimi");
});

// ---------- naming templates ----------

const picker = (page: Page) => page.locator("[data-tpl-picker]");
const cardNames = (page: Page) => page.locator("[data-tpl-cards] .mu__termname").allTextContents();
const nameOfLevel = async (page: Page, tab: RegExp) => {
  await page.getByRole("tab", { name: tab }).click();
  return page.locator("[data-example]").textContent();
};
const utmState = (page: Page) =>
  page.evaluate(() => {
    const root = document.querySelector("[data-meta-utm]")!;
    const read = (selector: string) => (root.querySelector(selector) as HTMLInputElement | null)?.value ?? null;
    return {
      out: root.querySelector("[data-out]")!.textContent,
      mode: (root.querySelector("[data-mode]:checked") as HTMLInputElement).value,
      tactic: read("[data-tactic]"),
      format: read("[data-format]"),
      term: (root.querySelector("[data-term]:checked") as HTMLInputElement).value,
      medium: read("[data-medium]"),
      platform: read("[data-platform]"),
    };
  });

test("templates: the builder opens with Suositeltu in place and no separate first step", async ({ page }) => {
  await page.goto(path);
  await expect(picker(page)).toBeHidden();
  await expect(page.locator("[data-tpl-builder]")).toBeVisible();
  await expect(page.locator("[data-tpl-name]")).toHaveText("Suositeltu");
  await expect(page.locator("[data-example]")).toHaveText("fi_leads_summer_2027");
  await expect(page.getByRole("button", { name: /Vie nimet UTM-rakentajaan/ })).toBeVisible();
});

test("templates: Vaihda mallia shows the four main templates, and show all opens the other three", async ({ page }) => {
  await page.goto(path);
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await expect(picker(page)).toBeVisible();
  await expect(page.locator("[data-tpl-builder]")).toBeHidden();
  expect(await cardNames(page)).toEqual(["Suositeltu", "Verkkokauppa", "Liidihankinta", "Mukautettu"]);
  await expect(page.getByRole("radio", { name: "Suositeltu" })).toBeChecked();

  await page.getByRole("button", { name: "Näytä kaikki 7 mallia" }).click();
  expect(await cardNames(page)).toEqual(["Suositeltu", "Verkkokauppa", "Liidihankinta", "Mukautettu", "Yksinkertainen", "Toimisto / Agency", "Kansainvälinen"]);
  await page.getByRole("button", { name: "Näytä vähemmän" }).click();
  expect(await cardNames(page)).toHaveLength(4);

  await page.getByRole("button", { name: "Peruuta" }).first().click();
  await expect(page.locator("[data-tpl-builder]")).toBeVisible();
  await expect(page.getByRole("button", { name: "Vaihda mallia" })).toBeFocused();
});

test("templates: choosing a card previews three levels but applies nothing until it is used", async ({ page }) => {
  await page.goto(path);
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("radio", { name: "Verkkokauppa" }).check();
  await expect(page.locator("[data-tpl-preview] dt")).toHaveCount(3);
  await expect(page.locator("[data-tpl-preview]")).toContainText("fi-shoes-blackfriday-2027");
  await expect(picker(page)).toBeVisible();
  await page.getByRole("button", { name: "Peruuta" }).first().click();
  await expect(page.locator("[data-tpl-name]")).toHaveText("Suositeltu");
  await expect(page.locator("[data-example]")).toHaveText("fi_leads_summer_2027");

  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("radio", { name: "Verkkokauppa" }).check();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();
  await expect(picker(page)).toBeHidden();
  await expect(page.locator("[data-tpl-name]")).toHaveText("Verkkokauppa");
  await expect(page.locator("[data-tpl-name]")).toBeFocused();
  await expect(page.locator("[data-tpl-edited]")).toBeHidden();
});

test("templates: every template gives the expected formulas and example names with its own separators", async ({ page }) => {
  const expected: Record<string, [string, string, string]> = {
    Suositeltu: ["fi_leads_summer_2027", "prospecting_broad_conversions", "video_benefits_v1"],
    Verkkokauppa: ["fi-shoes-blackfriday-2027", "prospecting-broad-purchase", "sneakers-carousel-v1"],
    Liidihankinta: ["fi_b2b_consulting_leads", "decisionmakers|prospecting|leads", "freeaudit|video|v1"],
    Mukautettu: ["summer_sale", "broad", "video_01"],
    Yksinkertainen: ["leads_summer", "broad", "video_v1"],
    "Toimisto / Agency": ["client|fi|leads|summer2027", "prospecting|broad|leads", "benefits|video|v1"],
    Kansainvälinen: ["fi/en/leads/summer2027", "fi/broad/conversions", "en/benefits/video/v1"],
  };
  for (const [template, names] of Object.entries(expected)) {
    await openNaming(page, template);
    const levels = [/1\. Kampanja/, /2\. Mainosjoukko/, /3\. Mainos/];
    for (const [n, tab] of levels.entries()) expect(await nameOfLevel(page, tab), `${template} level ${n + 1}`).toBe(names[n]);
    await expect(page.locator("[data-overview] code")).toHaveText(names);
  }
});

test("templates: Mukautettu starts with exactly one editable component per level", async ({ page }) => {
  await openNaming(page, "Mukautettu");
  for (const tab of [/1\. Kampanja/, /2\. Mainosjoukko/, /3\. Mainos/]) {
    await page.getByRole("tab", { name: tab }).click();
    await expect(page.locator("[data-comps] .field-row")).toHaveCount(1);
  }
  await page.getByRole("tab", { name: /1\. Kampanja/ }).click();
  await page.locator("[data-comps] input.field").first().fill("winter_sale");
  await expect(page.locator("[data-example]")).toHaveText("winter_sale");
});

test("templates: the preview follows edits, and Muokattu appears and goes away with the real structure", async ({ page }) => {
  await openNaming(page);
  const edited = page.locator("[data-tpl-edited]");
  await expect(edited).toBeHidden();
  await expect(page.locator("[data-tpl-reset]")).toBeHidden();

  await page.getByRole("combobox", { name: "Arvo: market" }).click();
  await page.getByRole("option", { name: "SE" }).click();
  await expect(page.locator("[data-example]")).toHaveText("se_leads_summer_2027");
  await expect(page.locator("[data-overview]")).toContainText("se_leads_summer_2027");
  await expect(edited).toBeVisible();
  await expect(page.locator("[data-tpl-bar]")).toContainText("Suositeltu · Muokattu");

  await page.getByRole("combobox", { name: "Arvo: market" }).click();
  await page.getByRole("option", { name: "FI" }).click();
  await expect(edited).toBeHidden();

  // a separator, an order change and a removed component count as edits as well
  await page.locator('[data-sep-btn="-"]').click();
  await expect(edited).toBeVisible();
  await page.locator('[data-sep-btn="_"]').click();
  await expect(edited).toBeHidden();
  await page.getByRole("button", { name: "Siirrä alemmas" }).first().click();
  await expect(edited).toBeVisible();
  await page.getByRole("button", { name: "Siirrä ylemmäs" }).nth(1).click();
  await expect(edited).toBeHidden();
  await page.getByRole("button", { name: "Poista komponentti: year" }).click();
  await expect(edited).toBeVisible();
});

test("templates: changing an unedited template needs no confirmation, the same template again neither", async ({ page }) => {
  await openNaming(page);
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await expect(picker(page)).toBeVisible();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();
  await expect(page.locator("[data-confirm-dialog]")).toBeHidden();
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("radio", { name: "Liidihankinta" }).check();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();
  await expect(page.locator("[data-confirm-dialog]")).toBeHidden();
  await expect(page.locator("[data-tpl-name]")).toHaveText("Liidihankinta");
});

test("templates: changing an edited template asks first, cancelling keeps everything, confirming replaces it", async ({ page }) => {
  await openNaming(page);
  await page.locator('[data-sep-btn="-"]').click();
  await expect(page.locator("[data-example]")).toHaveText("fi-leads-summer-2027");
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("radio", { name: "Verkkokauppa" }).check();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();

  const dialog = page.locator("[data-confirm-dialog]");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Korvataanko nykyinen nimeämiskäytäntö?" })).toBeVisible();
  await expect(dialog).toContainText("Olet muokannut nykyistä mallia. Uuden mallin käyttöönotto korvaa nimeämiskäytännön komponentit, arvot ja erottimet.");
  await dialog.getByRole("button", { name: "Peruuta" }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Käytä tätä mallia" })).toBeFocused();

  // Escape cancels too, and the current structure is untouched
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await page.getByRole("button", { name: "Peruuta" }).first().click();
  await expect(page.locator("[data-tpl-name]")).toHaveText("Suositeltu");
  await expect(page.locator("[data-example]")).toHaveText("fi-leads-summer-2027");
  await expect(page.locator("[data-tpl-edited]")).toBeVisible();

  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("radio", { name: "Verkkokauppa" }).check();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();
  await dialog.getByRole("button", { name: "Korvaa malli" }).click();
  await expect(page.locator("[data-tpl-name]")).toHaveText("Verkkokauppa");
  await expect(page.locator("[data-tpl-name]")).toBeFocused();
  await expect(page.locator("[data-tpl-edited]")).toBeHidden();
  await expect(page.locator("[data-example]")).toHaveText("fi-shoes-blackfriday-2027");
});

test("templates: restore defaults asks first and brings back components, values, order and separators", async ({ page }) => {
  await openNaming(page);
  await page.locator('[data-sep-btn="|"]').click();
  await page.getByRole("button", { name: "Siirrä alemmas" }).first().click();
  await page.getByRole("button", { name: "Poista komponentti: year" }).click();
  await page.getByRole("combobox", { name: "Arvo: objective" }).click();
  await page.getByRole("option", { name: "Sales" }).click();
  await expect(page.locator("[data-tpl-bar]")).toContainText("Suositeltu · Muokattu");

  const reset = page.getByRole("button", { name: "Palauta oletukset" });
  const dialog = page.locator("[data-confirm-dialog]");
  await reset.click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Peruuta" }).click();
  await expect(reset).toBeFocused();
  await expect(page.locator("[data-tpl-edited]")).toBeVisible();

  await reset.click();
  await dialog.getByRole("button", { name: "Palauta oletukset" }).click();
  await expect(page.locator("[data-formula]")).toHaveText("{market}_{objective}_{campaign}_{year}");
  await expect(page.locator("[data-example]")).toHaveText("fi_leads_summer_2027");
  await expect(page.locator("[data-tpl-edited]")).toBeHidden();
  await expect(reset).toBeHidden();
});

test("templates: switching and restoring leave the UTM settings untouched", async ({ page }) => {
  await openUtm(page);
  await page.getByRole("radio", { name: "Julkaistu kampanja" }).check();
  await page.locator("[data-fixed-campaign]").fill("oma_kampanja");
  await choose(page, /Millainen kampanja on/, "Retention (nykyiset asiakkaat)");
  await page.getByText("Lisäasetukset").click();
  await page.locator("[data-medium]").fill("cpc");
  await page.getByLabel(/Hallinta-alusta/).fill("Meta & Co");
  const before = await utmState(page);

  await page.getByRole("tab", { name: /Nimeämiskäytäntö/ }).click();
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("radio", { name: "Verkkokauppa" }).check();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();
  await page.locator('[data-sep-btn="|"]').click();
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("radio", { name: "Mukautettu" }).check();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).click();
  await page.locator("[data-confirm-dialog]").getByRole("button", { name: "Korvaa malli" }).click();
  await page.locator('[data-sep-btn="-"]').click();
  await page.getByRole("button", { name: "Palauta oletukset" }).click();
  await page.locator("[data-confirm-dialog]").getByRole("button", { name: "Palauta oletukset" }).click();

  await page.getByRole("tab", { name: /UTM-rakentaja/ }).click();
  expect(await utmState(page)).toEqual(before);
  await expect(page.locator("[data-fixed-campaign]")).toHaveValue("oma_kampanja");
});

test("templates: the picker and the dialog work from the keyboard", async ({ page }) => {
  await page.goto(path);
  await page.getByRole("button", { name: "Vaihda mallia" }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("radio", { name: "Suositeltu" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Verkkokauppa" })).toBeChecked();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-tpl-name]")).toHaveText("Verkkokauppa");

  await page.locator('[data-sep-btn="_"]').click();
  await page.getByRole("button", { name: "Vaihda mallia" }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("radio", { name: "Suositeltu" }).check();
  await page.getByRole("button", { name: "Käytä tätä mallia" }).focus();
  await page.keyboard.press("Enter");
  const dialog = page.locator("[data-confirm-dialog]");
  await expect(dialog.getByRole("button", { name: "Peruuta" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Käytä tätä mallia" })).toBeFocused();
});

test("templates: the cards sit in one column on a phone without horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  await page.getByRole("button", { name: "Vaihda mallia" }).click();
  await page.getByRole("button", { name: "Näytä kaikki 7 mallia" }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const xs = await page.locator("[data-tpl-cards] .mu__tplcard").evaluateAll((nodes) => nodes.map((n) => Math.round(n.getBoundingClientRect().x)));
  expect(new Set(xs).size).toBe(1);
});

// ---------- English page ----------

const enPath = "/tools/meta-campaigncraft/";

test("english page: same tool in English, with reciprocal language links", async ({ page }) => {
  await page.goto(enPath);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("[data-meta-utm]")).toHaveAttribute("lang", "en");
  await expect(page.locator("[data-tpl-name]")).toHaveText("Recommended");
  await expect(page.locator("[data-example]")).toHaveText("fi_leads_summer_2027");
  await expect(page.getByRole("button", { name: /Send names to the UTM builder/ })).toBeVisible();
  await expect(page.locator('link[rel="alternate"][hreflang="fi"]')).toHaveAttribute("href", /\/fi\/tyokalut\/meta-campaigncraft\/$/);

  await page.goto(path);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/tools\/meta-campaigncraft\/$/);
});

test("english page: no Finnish text in either step, and the default string matches", async ({ page }) => {
  await page.goto(enPath);
  const finnish = /[äöÄÖ]|\b(Nimeämis|Kampanja|Mainos|Valitse|Vaihda|Muokattu|Palauta)\b/;
  expect(await page.locator("[data-step='naming']").innerText()).not.toMatch(finnish);
  await page.getByRole("tab", { name: /UTM builder/ }).click();
  expect(await page.locator("[data-step='utm']").innerText()).not.toMatch(finnish);
  await expect(page.locator("[data-out]")).toHaveText(defaultString);
});

test("english page: templates, edited state and the published-campaign fields work", async ({ page }) => {
  await page.goto(enPath);
  await page.getByRole("button", { name: "Change template" }).click();
  await page.getByRole("button", { name: "Show all 7 templates" }).click();
  expect(await cardNames(page)).toEqual(["Recommended", "E-commerce", "Lead generation", "Custom", "Simple", "Agency", "International"]);
  await page.getByRole("radio", { name: "Agency" }).check();
  await expect(page.locator("[data-tpl-preview]")).toContainText("client|fi|leads|summer2027");
  await page.getByRole("button", { name: "Use this template" }).click();
  await expect(page.locator("[data-tpl-name]")).toHaveText("Agency");

  await page.locator('[data-sep-btn="_"]').click();
  await expect(page.locator("[data-tpl-bar]")).toContainText("Agency · Edited");
  await page.getByRole("button", { name: "Restore defaults" }).click();
  await expect(page.locator("[data-confirm-dialog]").getByRole("heading", { name: "Restore the template defaults?" })).toBeVisible();
  await page.locator("[data-confirm-dialog]").getByRole("button", { name: "Restore defaults" }).click();
  await expect(page.locator("[data-tpl-edited]")).toBeHidden();

  await page.getByRole("button", { name: /Send names to the UTM builder/ }).click();
  await page.getByRole("radio", { name: "Published campaign" }).check();
  await expect(page.locator("[data-fixed-campaign]")).toHaveValue("client|fi|leads|summer2027");
  await expect(page.getByRole("button", { name: /Build the updated names/ })).toBeVisible();
  await page.locator("[data-fixed-campaign]").fill("");
  await expect(page.locator("[data-out]")).not.toContainText("utm_campaign");
});
