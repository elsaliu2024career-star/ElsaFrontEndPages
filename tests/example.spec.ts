import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

/*
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Online Friends' }).click();
  await page.getByRole('button', { name: 'E Elsa Zhang Message' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByText('Show more ▼').click();
  await page.getByText('Show less ▲').click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  const page2 = await page2Promise;
  await page.getByRole('button', { name: 'Hide' }).click();
  await page.getByRole('button', { name: 'Online Friends' }).click();
  await page.getByRole('button', { name: 'E Elsa Zhang Message' }).click();
  await page.getByText('Message 1', { exact: true }).nth(1).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByRole('button', { name: 'M Maria Lopez Message' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  const page3Promise = page.waitForEvent('popup');
  await page.locator('span').filter({ hasText: 'Home' }).click();
  const page3 = await page3Promise;
  await page.getByText('JJohn DoeProduct Manager').click();
  await page.getByText('I love frontend and user').click();
  await page.locator('span').filter({ hasText: 'Messages' }).click();
  await page.locator('span').filter({ hasText: 'Friends' }).click();
  await page.getByRole('img', { name: 'Notifications' }).locator('path').click();
  await page.getByRole('button', { name: 'Hide' }).click();
});
*/
