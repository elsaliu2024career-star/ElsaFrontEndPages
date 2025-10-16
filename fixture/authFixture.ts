import {
  test as base,
  expect as baseExpect,
  Page,
  Browser,
  TestInfo,
} from "@playwright/test";
import fs from "fs/promises";
import dotenv from 'dotenv';
dotenv.config();



async function performLogin(page: Page) {
  await page.goto(process.env.ABC_BASE_URL!);
  await baseExpect(page.getByRole("button", { name: "Log In" })).toBeVisible({
    timeout: 10_000,
  });
  await page.getByRole("button", { name: "Log In" }).click();

  await baseExpect(
    page.getByRole("link", { name: "Log in with password" })
  ).toBeVisible;
  await page.getByRole("link", { name: "Log in with password" }).click();

  const emailField = page.getByTestId("email-field");
  const passwordField = page.getByTestId("password-field");
  const loginBtn = page.getByTestId("login-with-email-btn");

  await baseExpect(emailField).toBeVisible;
  await emailField.fill(process.env.ABC_USERNAME!);

  await baseExpect(passwordField).toBeVisible;
  await passwordField.fill(process.env.ABC_PASSWORD!);

  await baseExpect(loginBtn).toBeEnabled;
  await loginBtn.click();

  // Wait for navigation or a user-specific element
  await page.waitForLoadState("networkidle");
  // Optionally, assert login success (e.g., user avatar or dashboard)
  // await expect(page.getByTestId('user-avatar')).toBeVisible({ timeout: 10000 });
}

export const test = base.extend<{
  LoggedInPage: Page;
}>({
  LoggedInPage: [
    async ({ browser }: { browser: Browser }, use, testInfo: TestInfo) => {
      let storageExists = false;
      const STORAGE_STATE = `storage/state-${testInfo.project.name}.json`;
      try {
        await fs.access(STORAGE_STATE);
        storageExists = true;
      } catch {
        storageExists = false;
      }

      const context = storageExists
        ? await browser.newContext({ storageState: STORAGE_STATE })
        : await browser.newContext();

      const page = await context.newPage();

      if (storageExists) {
        // quick check if user is logged in
        console.log("✅Use the cached logged state");
        await page.goto(process.env.ABC_BASE_URL!);


        // Wait up to 27 seconds for the 'Elsa' button to appear
        const elsaButton = page.getByRole("button", { name: "Elsa" });
        await elsaButton.waitFor({ timeout: 17*1000 }).catch(() => {
          console.log("the 'Elsa' does not appear till time out");
        });

        const loggedIn = await elsaButton.count();
        console.log("Number of Elsa buttons:", loggedIn);

        if (!loggedIn) {
          console.log("⚠️ Session expired, logging in again...");
          await performLogin(page);
          await context.storageState({ path: STORAGE_STATE });
          console.log("✅ Session expired, saved to", STORAGE_STATE);
        }
      } else {
        console.log("✅ first Login, saved to", STORAGE_STATE);
        await performLogin(page);
        await fs.mkdir("storage", { recursive: true });
        await context.storageState({ path: STORAGE_STATE });
        console.log("✅ First login session saved to", STORAGE_STATE);
      }

      await use(page);
      await context.close();
    },
    { scope: "test" },
  ],
});

export const expect = baseExpect;

// Example usage:
// test('my test', async ({ LoggedInPage }) => {
//     await LoggedInPage.goto('https://www.abc.net.au/');
//     // Your test code here
// }); 

