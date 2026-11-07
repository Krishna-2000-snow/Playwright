import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly nameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(private readonly page: Page) {
    const signupForm = page.locator("form").filter({ hasText: "Signup" });

    this.nameInput = page.getByPlaceholder("Name");
    this.signupEmailInput = signupForm.getByPlaceholder("Email Address");
    this.signupButton = page.getByRole("button", { name: "Signup" });
  }

  async open(): Promise<void> {
    await this.page.goto("/login");
  }

  async fillSignupDetails(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async signup(): Promise<void> {
    await this.signupButton.click();
  }
}
