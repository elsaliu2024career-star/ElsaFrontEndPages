import { test, expect } from '../fixture/authFixture';
import { NavigationPanel } from '../pages/home-page';

/*
test('check user is logged in and homepage is visible', async ({ LoggedInPage }) => {
//  await LoggedInPage.goto('https://www.abc.net.au/');
  await expect(LoggedInPage.getByRole('button', { name: 'Elsa' })).toBeVisible();
  await LoggedInPage.getByRole('button', { name: 'Elsa' }).click();
  await expect(LoggedInPage.getByRole('link', { name: 'Manage ABC Account' })).toBeVisible();
}); */



test('navigation panel and main headings are visible', async ({ LoggedInPage }) => { 
  test.setTimeout(90_000);
  const nav = new NavigationPanel(LoggedInPage);
  await nav.profileVisible();
  await nav.expectElementsVisibleConnectable();
  await nav.expectHeadingsVisible();
  await nav.expectDateCorrect();
});
