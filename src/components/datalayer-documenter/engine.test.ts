import { describe, expect, test } from "vitest";
import {
  buildDocxBlob,
  buildMarkdown,
  createInitialState,
  documentFilename,
  parseSavedState,
  selectedSections,
} from "./engine";

describe("dataLayer documentation engine", () => {
  test("starts with implementation foundations and then orders events by business priority", () => {
    expect(createInitialState().sections.map(({ id }) => id)).toEqual([
      "implementation", "consent", "items", "purchase", "refund", "begin_checkout", "add_payment_info", "add_shipping_info",
      "add_to_cart", "view_cart", "view_item", "select_item", "view_item_list",
      "remove_from_cart", "add_to_wishlist", "select_promotion", "view_promotion",
      "sign_up", "login",
    ]);
  });

  test("starts with the source-document events selected and new optional events available", () => {
    const state = createInitialState();
    expect(selectedSections(state).map(({ id }) => id)).toEqual(expect.arrayContaining([
      "implementation", "consent", "items", "view_item_list", "view_item", "add_to_cart",
      "remove_from_cart", "view_cart", "begin_checkout", "add_shipping_info",
      "add_payment_info", "purchase", "refund", "sign_up", "login",
    ]));
    expect(state.sections.find(({ id }) => id === "select_item")?.selected).toBe(false);
    expect(state.sections.find(({ id }) => id === "view_promotion")?.selected).toBe(false);
    expect(state.sections.find(({ id }) => id === "items")?.parameters.slice(0, 2).map(({ required }) => required)).toEqual(["Jompikumpi", "Jompikumpi"]);
    expect(state.sections.find(({ id }) => id === "purchase")?.source).toBe(
      "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#make_a_purchase_or_issue_a_refund",
    );
    expect(state.sections.find(({ id }) => id === "view_item")?.source).toContain("#view_item_details");
    expect(state.sections.find(({ id }) => id === "begin_checkout")?.source).toContain("#initiate_the_checkout_process");
    expect(state.sections.find(({ id }) => id === "login")?.source).toContain("client_type=gtm#login");
  });

  test("exports edited metadata and only selected sections to Markdown", () => {
    const state = createInitialState();
    state.settings.clientName = "Acme Oy";
    state.settings.platform = "Shopify";
    state.sections = state.sections.map((section) => ({ ...section, selected: section.id === "purchase" }));
    state.sections.find(({ id }) => id === "purchase")!.title = "Valmis tilaus";
    const markdown = buildMarkdown(state);
    expect(markdown).toContain("**Asiakas:** Acme Oy");
    expect(markdown).toContain("**Verkkokauppa-alusta:** Shopify");
    expect(markdown).toContain("## Valmis tilaus (`purchase`)");
    expect(markdown).not.toContain("`view_item`");
    expect(markdown).toContain("| `transaction_id` | string | Kyllä |");
  });

  test("restores the saved order and merges newly added template sections", () => {
    const state = createInitialState();
    state.sections = [state.sections.find(({ id }) => id === "purchase")!, state.sections.find(({ id }) => id === "items")!];
    const restored = parseSavedState(JSON.stringify(state));
    expect(restored.sections[0].id).toBe("purchase");
    expect(restored.sections[1].id).toBe("items");
    expect(restored.sections.some(({ id }) => id === "select_item")).toBe(true);
  });

  test("creates a safe Finnish document filename", () => {
    const state = createInitialState();
    state.settings.clientName = "Ääkkönen & Kumppanit Oy";
    expect(documentFilename(state, "docx")).toBe("aakkonen-kumppanit-oy-datalayer.docx");
  });

  test("creates a non-empty DOCX blob in the browser-compatible exporter", async () => {
    const state = createInitialState();
    state.sections = state.sections.map((section) => ({ ...section, selected: section.id === "purchase" }));
    const blob = await buildDocxBlob(state);
    expect(blob.type).toBe("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    expect(blob.size).toBeGreaterThan(1_000);
  });
});
