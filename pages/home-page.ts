import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

// Function to get today's date in "Thursday 16 October 2025" format
export function getTodayFormatted(): string {
  const todayMelbourne = new Date().toLocaleDateString("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  console.log(todayMelbourne); // "Thursday 16 October 2025"

  return `${todayMelbourne}`;
}

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
    private readonly profileButton: Locator = page.locator(
      '[data-component="NavigationDropdownTrigger"] span[aria-hidden="true"]'
    ),

    private readonly expectNewsVisible: Locator = page
      .getByLabel("Primary site navigation")
      .getByRole("link", { name: "News" }),
    private readonly expectLocalVisible: Locator = page
      .getByLabel("Primary site navigation")
      .getByRole("link", { name: "Local" }),
    private readonly expectListenVisible: Locator = page
      .getByLabel("Primary site navigation")
      .getByRole("link", { name: "listen" }),
    private readonly expectIviewVisible: Locator = page
      .getByLabel("Primary site navigation")
      .getByRole("link", { name: "iview" }),
    private readonly expectTVGuideVisible: Locator = page
      .getByLabel("Primary site navigation")
      .getByRole("link", { name: "TV Guide" }),
    private readonly expectKidsVisible: Locator = page.getByRole("link", {
      name: "Kids",
      exact: true,
    }),
    private readonly expectLifestyleVisible: Locator = page
      .getByLabel("Primary site navigation")
      .getByRole("link", { name: "Lifestyle" }),
    private readonly expectEditorChoiceVisible: Locator = page.getByRole(
      "heading",
      { name: "Editor's Choice" }
    ),
    private readonly expectDailyDiscoveriesVisible: Locator = page.getByRole(
      "heading",
      { name: "Daily Discoveries" }
    ),
    private readonly expectDigitalDilemmaVisible: Locator = page.getByRole(
      "heading",
      { name: "The digital dilemma", exact: true }
    ),
    private readonly expectDateVisible: Locator = page.locator(
      '[data-component="MastheadDate"] time[data-component="Text"]'
    )
  ) {}

  async profileVisible() {
    await expect(this.profileButton).toContainText("Elsa");
    await this.profileButton.click();
    await expect(
      this.page.getByRole("link", { name: "Manage ABC Account" })
    ).toBeVisible();
  }

  async expectElementsVisibleConnectable() {
    await expect(this.navPanel).toBeVisible();

    await this.expectNewsVisible.click();
    await expect(this.page.locator('#content')).toContainText('Top Stories');
    await this.page.goBack();

    await this.expectLocalVisible.click();
    await expect(this.page.locator('#content')).toContainText('Find your local ABC');
    await this.page.goBack();

    await this.expectListenVisible.click();
    await expect(this.page.locator('#content')).toContainText('Live Radio: Now Streaming');
    await this.page.goBack();

    await this.expectIviewVisible.click();
    await expect(this.page.getByLabel('Primary site navigation').getByRole('list')).toContainText('TV Shows');
    await this.page.goBack();

    await this.expectTVGuideVisible.click();
    await expect(this.page.locator('#view')).toContainText('TV Guide');
    await this.page.goBack();

    await this.expectKidsVisible.click();
    await expect(this.page.getByRole('banner')).toContainText('Kids');
    await this.page.goBack();

    await this.expectLifestyleVisible.click();
    await expect(this.page.locator('h1')).toContainText('Lifestyle');
    await this.page.goBack();

  }

  async expectHeadingsVisible() {
    await expect(this.expectEditorChoiceVisible).toBeVisible();
    await expect(this.expectDailyDiscoveriesVisible).toBeVisible();
    await expect(this.expectDigitalDilemmaVisible).toBeVisible();
  }

  async expectDateCorrect() {
    const todayFormatted = getTodayFormatted();
    await expect(this.expectDateVisible).toHaveText(todayFormatted);
  }
}
