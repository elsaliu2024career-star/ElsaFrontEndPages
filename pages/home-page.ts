import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class NavigationPanel {
  constructor(
    private readonly page: Page,
    private readonly navPanel: Locator = page
      .locator("div")
      .filter({
        hasText:
          /^NewsLocallisteniviewTV GuideKidsLifestyleEntertainmentSportEmergencyMore$/,
      })
      .nth(1),
    private readonly profileButton: Locator = page.getByRole("button", {
      name: "Elsa",
    }),

    private readonly expectNewsVisible: Locator = page.getByLabel('Primary site navigation').getByRole('link', { name: 'News' }),
    private readonly expectLocalVisible: Locator = page.getByLabel('Primary site navigation').getByRole('link', { name: 'Local' }),
    private readonly expectListenVisible: Locator = page.getByLabel('Primary site navigation').getByRole('link', { name: 'listen' }),
    private readonly expectIviewVisible: Locator = page.getByLabel('Primary site navigation').getByRole('link', { name: 'iview' }),
    private readonly expectTVGuideVisible: Locator = page.getByLabel('Primary site navigation').getByRole('link', { name: 'TV Guide' }),
    private readonly expectKidsVisible: Locator = page.getByRole('link', { name: 'Kids', exact: true }),
    private readonly expectLifestyleVisible: Locator = page.getByLabel('Primary site navigation').getByRole('link', { name: 'Lifestyle' }),
    private readonly expectDateVisible: Locator = page.getByText('Thursday 16 October'),
    private readonly expectEditorChoiceVisible: Locator = page.getByRole('heading', { name: "Editor's Choice" }),
    private readonly expectDailyDiscoveriesVisible: Locator = page.getByRole('heading', { name: 'Daily Discoveries' }),
    private readonly expectDigitalDilemmaVisible: Locator = page.getByRole('heading', { name: 'The digital dilemma', exact: true }),
  ) {}


  async profileVisible() {
    await expect(this.profileButton).toBeVisible();
  }

  async expectElementsVisible() {
    await expect(this.navPanel).toBeVisible();
    await expect(this.expectNewsVisible).toBeVisible();
    await expect(this.expectLocalVisible).toBeVisible();
    await expect(this.expectListenVisible).toBeVisible();
    await expect(this.expectIviewVisible).toBeVisible();
    await expect(this.expectTVGuideVisible).toBeVisible();
    await expect(this.expectKidsVisible).toBeVisible();
    await expect(this.expectLifestyleVisible).toBeVisible();
    await expect(this.expectDateVisible).toBeVisible();
  }

  async expectHeadingsVisible() {
    await expect(this.expectEditorChoiceVisible).toBeVisible();
    await expect(this.expectDailyDiscoveriesVisible).toBeVisible();
    await expect(this.expectDigitalDilemmaVisible).toBeVisible();
  }
}
