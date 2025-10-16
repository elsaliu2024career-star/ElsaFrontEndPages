import { test, expect } from '@playwright/test';

test('verify code hero page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByText('People you may know from')).toBeVisible();
  await expect(page.getByText('Elsa Zhang')).toBeVisible();
  await expect(page.getByText('John Doe')).toBeVisible();
  await expect(page.locator('#root')).toContainText('Software Engineer');
  await expect(page.getByText('Product Manager')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Online Friends' })).toBeVisible();

});

test('verify code hero online friends drawer', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Online Friends' }).click();
  await expect(page.getByRole('button', { name: 'E Elsa Zhang Message' })).toBeVisible();
  await expect(page.locator('#root')).toContainText('Message 1');
  await page.getByRole('button', { name: 'M Maria Lopez Message' }).click();
  await expect(page.getByText('Maria Lopez').nth(2)).toBeVisible();
  await expect(page.getByText('Message 3').nth(1)).toBeVisible();
});

