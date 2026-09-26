import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import sourceTemplate from "../../src/data/gtm-templates/full_ecom_gtm.json";
import simplifiedTemplate from "../../src/data/gtm-templates/full_simplified_ecom_gtm.json";
import GtmContainerBuilder from "../../src/components/gtm-builder/GtmContainerBuilder";
import { createBuilderState, selectTags, type GtmRecord } from "../../src/components/gtm-builder/engine";

const STORAGE_KEY = "karppinen-gtm-tag-selection-v1";

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("focused GTM builder UI", () => {
  test("uses EUR by default and allows another currency", async () => {
    const user = userEvent.setup();
    render(<GtmContainerBuilder />);
    const currency = screen.getByRole("combobox", { name: "Default currency" });
    expect(currency).toHaveValue("EUR");
    await user.selectOptions(currency, "USD");
    expect(currency).toHaveValue("USD");
  });

  test("changes tag structure and naming independently", async () => {
    const user = userEvent.setup();
    render(<GtmContainerBuilder />);
    expect(screen.getByRole("combobox", { name: "Tag naming" })).toHaveValue("numbered");
    await user.selectOptions(screen.getByRole("combobox", { name: "Tag structure" }), "simplified");
    expect(screen.getByRole("heading", { name: "2 tags selected" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /supported_ecommerce_events/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /page_view/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /page_view/i })).toBeDisabled();
    expect(screen.getByText("01.02 GA4 - Ecommerce Event - Supported Events")).toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox", { name: "Tag naming" }), "short");
    expect(screen.getByText("GA4 - Ecommerce Event - Supported Events")).toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: "Default currency" })).not.toBeInTheDocument();
    expect(screen.getByText(/ecommerce\.currency/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Essential only" })).not.toBeInTheDocument();
  });

  test("starts with all ecommerce events and the required page view selected", () => {
    render(<GtmContainerBuilder />);
    expect(screen.getByRole("heading", { name: "14 tags selected" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /purchase/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /view_item_list/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /page_view/i })).toBeChecked();
  });

  test("keeps the required page view selected when optional tags are cleared", async () => {
    const user = userEvent.setup();
    render(<GtmContainerBuilder />);
    const pageView = screen.getByRole("checkbox", { name: /page_view/i });
    expect(pageView).toBeChecked();
    expect(pageView).toBeDisabled();
    expect(pageView.closest("tr")).toHaveTextContent("Required");
    await user.click(screen.getByRole("button", { name: "Page view only" }));
    expect(screen.getByRole("heading", { name: "1 tag selected" })).toBeInTheDocument();
    expect(pageView).toBeChecked();
  });

  test("lists each tag as a row with its type and necessity", () => {
    render(<GtmContainerBuilder />);
    // 1 header + 5 stage headings + 14 tags
    expect(screen.getAllByRole("row")).toHaveLength(20);
    const purchase = screen.getByRole("checkbox", { name: /purchase/i }).closest("tr")!;
    expect(purchase).toHaveTextContent("GA4 Event");
    expect(purchase).toHaveTextContent("Essential");
    expect(purchase).toHaveTextContent("01.02 GA4 - Ecom Event - Purchase");
  });

  test("groups the rows into funnel stages with per-stage counts", () => {
    render(<GtmContainerBuilder />);
    const stages = screen.getAllByRole("columnheader").filter((cell) => (cell as HTMLTableCellElement).colSpan === 5);
    expect(stages.map((cell) => cell.textContent)).toEqual([
      "Page views1/1", "Browse3/3", "Cart4/4", "Checkout4/4", "Promotions2/2",
    ]);
    // The purchase row sits inside the Checkout section
    const section = screen.getByRole("checkbox", { name: /purchase/i }).closest("tbody")!;
    expect(section.querySelector(".gtm-tags__group")).toHaveTextContent("Checkout");
  });

  test("toggles a tag from the checkbox itself and from the tag name", async () => {
    const user = userEvent.setup();
    render(<GtmContainerBuilder />);
    const box = screen.getByRole("checkbox", { name: /add_to_cart/i });

    // The visible box is a styled span; it only works because it sits inside its own label.
    await user.click(box.nextElementSibling!);
    expect(screen.getByRole("checkbox", { name: /add_to_cart/i })).not.toBeChecked();

    await user.click(screen.getByText("add_to_cart"));
    expect(screen.getByRole("checkbox", { name: /add_to_cart/i })).toBeChecked();
  });

  test("keeps export disabled until the required details are filled in", async () => {
    const user = userEvent.setup();
    render(<GtmContainerBuilder />);
    expect(screen.getByRole("button", { name: "Download" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Copy JSON" })).toBeDisabled();
    await user.type(screen.getByLabelText("GA4 measurement ID"), "G-TEST123");
    await user.type(screen.getByLabelText("Company suffix"), "Acme");
    expect(screen.getByRole("button", { name: "Download" })).toBeEnabled();
  });

  test("offers the essential preset with the required page view and previews matching JSON", async () => {
    const user = userEvent.setup();
    render(<GtmContainerBuilder />);
    await user.click(screen.getByRole("button", { name: "Essential only" }));
    expect(screen.getByRole("heading", { name: "6 tags selected" })).toBeInTheDocument();
    await user.type(screen.getByLabelText("GA4 measurement ID"), "G-TEST123");
    await user.type(screen.getByLabelText("Company suffix"), "Acme");
    await user.click(screen.getByText("Preview JSON"));
    await waitFor(() => expect(screen.getByLabelText("Generated GTM JSON")).toBeInTheDocument());
    const json = JSON.parse((screen.getByLabelText("Generated GTM JSON") as HTMLTextAreaElement).value);
    expect(json.containerVersion.tag).toHaveLength(6);
    expect(JSON.stringify(json)).toContain("G-TEST123");
  });

  test("recovers saved tag choices", async () => {
    const source = sourceTemplate as GtmRecord;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectTags(createBuilderState(source), ["35"])));
    render(<GtmContainerBuilder />);
    await waitFor(() => expect(screen.getByRole("heading", { name: "2 tags selected" })).toBeInTheDocument());
    expect(screen.getByText("Saved tag choices recovered.")).toBeInTheDocument();
  });

  test("recovers the saved simplified template", async () => {
    const source = simplifiedTemplate as GtmRecord;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(createBuilderState(source)));
    render(<GtmContainerBuilder />);
    await waitFor(() => expect(screen.getByRole("combobox", { name: "Tag structure" })).toHaveValue("simplified"));
    expect(screen.getByRole("combobox", { name: "Tag naming" })).toHaveValue("short");
    expect(screen.getByRole("checkbox", { name: /supported_ecommerce_events/i })).toBeChecked();
  });
});
