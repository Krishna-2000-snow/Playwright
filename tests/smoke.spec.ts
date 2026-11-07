// Run this spec with: npx playwright test tests/smoke.spec.ts
import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { RegistrationPage } from "../pages/RegistrationPage";

test.describe("Testing UI", () => {
  test("signs up for the Automation Exercise application", async (
    { page },
    testInfo,
  ) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);
    const signupEmail = `mohan.${testInfo.project.name}.${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;

    await test.step("Open the signup page", async () => {
      await loginPage.open();
      await expect(loginPage.nameInput).toBeVisible();
    });

    await test.step("Enter signup details", async () => {
      await expect(loginPage.nameInput).toBeVisible();
      await expect(loginPage.signupEmailInput).toBeVisible();
      await loginPage.fillSignupDetails("Mohan", signupEmail);
      await expect(loginPage.signupButton).toBeVisible();
      await loginPage.signup();
    });

    await test.step("Verify account information is requested", async () => {
      await expect(
        registrationPage.accountInformationHeading,
      ).toBeVisible();
    });

    await test.step("Select title and enter password", async () => {
      await expect(registrationPage.mrRadio).toBeVisible();
      await registrationPage.selectMrTitle();
      await expect(registrationPage.mrRadio).toBeChecked();
      await expect(registrationPage.passwordInput).toBeVisible();
      await registrationPage.fillPassword("Mohan@10");
    });

    await test.step("Select date of birth", async () => {
      await expect(registrationPage.daySelect).toBeVisible();
      await expect(registrationPage.monthSelect).toBeVisible();
      await expect(registrationPage.yearSelect).toBeVisible();
      await registrationPage.selectDateOfBirth("15", "March", "1995");
    });

    await test.step("Enter account details", async () => {
      await expect(registrationPage.firstNameInput).toBeVisible();
      await expect(registrationPage.lastNameInput).toBeVisible();
      await expect(registrationPage.addressInput).toBeVisible();
      await expect(registrationPage.stateInput).toBeVisible();
      await expect(registrationPage.cityInput).toBeVisible();
      await expect(registrationPage.zipcodeInput).toBeVisible();
      await expect(registrationPage.mobileNumberInput).toBeVisible();
      await registrationPage.fillAccountDetails({
        firstName: "Mohan",
        lastName: "Warrior",
        address: "123 Test Street",
        state: "Tamil Nadu",
        city: "Chennai",
        zipcode: "600001",
        mobileNumber: "9876543210",
      });
    });

    await test.step("Capture the completed form", async () => {
      await testInfo.attach("form-filled", {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    });

    await test.step("Subscribe and create the account", async () => {
      await expect(registrationPage.newsletterCheckbox).toBeVisible();
      await registrationPage.subscribeToNewsletter();
      await expect(registrationPage.createAccountButton).toBeVisible();
      await registrationPage.createAccount();
    });

    await test.step("Verify account creation", async () => {
      await expect(registrationPage.accountCreatedMessage).toBeVisible();
    });
  });
});
