import type { Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly productCards: Locator;
  readonly productNames: Locator;

  constructor(private readonly page: Page) {
    this.productCards = page.locator(".product-image-wrapper");
    this.productNames = page.locator(".productinfo p");
  }

  async open(): Promise<void> {
    await this.page.goto("/products");
    await this.dismissAdvertisementIfVisible();
  }

  async openProduct(productName: string): Promise<void> {
    await this.dismissAdvertisementIfVisible();
    await this.productDetailsLink(productName).click();
  }

  productDetailsLink(productName: string): Locator {
    return this.productCards
      .filter({ hasText: productName })
      .getByRole("link", { name: "View Product" });
  }

  private async dismissAdvertisementIfVisible(): Promise<void> {
    const closeButton = this.page.getByText("Close", { exact: true });

    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }
}
