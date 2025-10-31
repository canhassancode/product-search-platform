import { test, expect } from "@playwright/test";

test("on first load, the page should have all the expected elements", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Healf | Product Search Platform/);
  await expect(page.getByRole("button", { name: "Sort by: Relevance" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Clear all" })).toBeVisible();
  await expect(page.getByPlaceholder("Search products...")).toBeVisible();
  await expect(page.getByText("4450 products found")).toBeVisible();
  await expect(page.getByText("Filter")).toBeVisible();
  await expect(page.getByText("Vendors")).toBeVisible();
  await expect(page.getByText("Goals")).toBeVisible();
  await expect(page.getByText("Categories")).toBeVisible();
});

test("after searching for Thrive Coffee, the page should produce the expected results", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Search products...").fill("Thrive Coffee");

  await expect(page.getByText("Hunter & Gather")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: "Thrive Coffee" })).toBeVisible();
});

test("after searching for a product that doesn't exist, the page should show the user the expected message", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Search products...").fill("This is a made up product that doesn't exist");

  await expect(page.getByText("No products found")).toBeVisible();
});
