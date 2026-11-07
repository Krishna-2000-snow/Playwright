import type { Locator, Page } from "@playwright/test";

export type AccountDetails = {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class RegistrationPage {
  readonly accountInformationHeading: Locator;
  readonly mrRadio: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly newsletterCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedMessage: Locator;

  constructor(page: Page) {
    this.accountInformationHeading = page.getByText(
      "Enter Account Information",
      { exact: true },
    );
    this.mrRadio = page.getByRole("radio", { name: "Mr." });
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daySelect = page.locator("#days");
    this.monthSelect = page.locator("#months");
    this.yearSelect = page.locator("#years");
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.addressInput = page.getByRole("textbox", {
      name: "Address * (Street address, P.O. Box, Company name, etc.)",
    });
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.newsletterCheckbox = page.getByLabel(
      "Sign up for our newsletter!",
    );
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
    this.accountCreatedMessage = page.getByText("Account Created!");
  }

  async selectMrTitle(): Promise<void> {
    await this.mrRadio.check();
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async selectDateOfBirth(
    day: string,
    month: string,
    year: string,
  ): Promise<void> {
    await this.daySelect.selectOption(day);
    await this.monthSelect.selectOption({ label: month });
    await this.yearSelect.selectOption(year);
  }

  async fillAccountDetails(details: AccountDetails): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
  }

  async subscribeToNewsletter(): Promise<void> {
    await this.newsletterCheckbox.check();
  }

  async createAccount(): Promise<void> {
    await this.createAccountButton.click();
  }
}