import { expect, test } from "@playwright/test";

test.describe("Products", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("product list loads", async ({ page }) => {
    const productCards = page.locator(".product-image-wrapper");
    await expect(productCards).not.toHaveCount(0);
  });

  test("opens Blue Top details", async ({ page }) => {
    const blueTopCard = page
      .locator(".product-image-wrapper")
      .filter({ hasText: "Blue Top" });
    await blueTopCard.getByRole("link", { name: "View Product" }).click();
    await expect(page).toHaveURL(/\/product_details\/\d+/);
  });

  test("product names include Blue Top", async ({ page }) => {
    const names = page.locator(".productinfo p");
  await expect(names.first()).toBeVisible();            // wait until the list has rendered
  const productNames = await names.allTextContents();
  expect(productNames).toContain("Blue Top");
  });
});