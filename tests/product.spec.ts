import { expect, test } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";

test.describe("Products", () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.open();
  });

  test("opens Blue Top details", async ({ page }) => {
    await expect(productPage.productDetailsLink("Blue Top")).toBeVisible();
    await productPage.openProduct("Blue Top");
    await expect(page).toHaveURL(/\/product_details\/\d+/);
    await expect(page.getByRole("heading", { name: "Blue Top" })).toBeVisible();
  });
});
