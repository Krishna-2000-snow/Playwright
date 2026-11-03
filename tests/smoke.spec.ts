// Run this spec with: npx playwright test tests/smoke.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Testing UI ", () => {
 test.beforeEach("Launch the application",async ({ page }) => {
    await page.goto("/login", { waitUntil: "domcontentloaded" });
  });
  
test("Testing the Automation Pratice Application", async ({ page }, testInfo) => {
	const signupEmail = `mohan.${testInfo.project.name}.${Date.now()}@example.com`;

	
	await test.step("Enter userName and Password & Click Login", async () => {
		await page.getByPlaceholder("Name").fill("Mohan");
		await page
			.locator("form")
			.filter({ hasText: "Signup" })
			.getByPlaceholder("Email Address")
			.fill(signupEmail);
		await page.getByRole("button", { name: "Signup" }).click();
	});
	await test.step("Verify the successful signup", async () => {
		await expect(
			page.getByText("Enter Account Information", { exact: true }),
		).toBeVisible();
	});
await test.step("Verify the Radio Button and Enter Password", async () => {
    await page.getByRole('radio', { name: 'Mr.' }).check();
await expect(page.getByRole('radio', { name: 'Mr.' })).toBeChecked();
		await page.locator('[data-qa="password"]').fill("Mohan@10");
})
await test.step("Validate the Select By using DOB field", async () => {
		await page.locator('#days').selectOption('15');
await page.locator('#months').selectOption({ label: 'March' });
await page.locator('#years').selectOption('1995');
	});
await test.step("Enter the address field and Click Create Account", async () => {
	await page.locator('[data-qa="first_name"]').fill("Mohan");
	await page.locator('[data-qa="last_name"]').fill("Warrior");
	await page
		.getByRole("textbox", {
			name: "Address * (Street address, P.O. Box, Company name, etc.)",
		})
		.fill("123 Test Street");
	await page.locator('[data-qa="state"]').fill("Tamil Nadu");
	await page.locator('[data-qa="city"]').fill("Chennai");
	await page.locator('[data-qa="zipcode"]').fill("600001");
  await page.locator('[data-qa="mobile_number"]').fill("9876543210");
  });
  await test.step("Capture the filled form", async () => {
  await testInfo.attach("form-filled", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  
})
await test.step("Tick newsletter and create the account", async () => {
  await page.getByLabel("Sign up for our newsletter!").check();
  await page.getByRole("button", { name: "Create Account" }).click();
});

await test.step("Verify the account was created", async () => {
  await expect(page.getByText("Account Created!")).toBeVisible();
});
});
});