import { Browser, Locator, Page, expect } from "@playwright/test";


export class verifyBasicAuth {
  protected readonly page: Page;

  protected readonly authPageHeading: Locator;

  protected readonly authPageText: Locator;

//  protected readonly commonActions: CommonActions;

  constructor(page: Page) {
    this.page = page;

    this.authPageHeading = page.getByRole("heading", { level: 3 });
    this.authPageText = page.getByRole("paragraph");

//    this.commonActions = new CommonActions(page);
  }

  async expectContentCorrect(heading: string | RegExp, text: string | RegExp) {
    await expect(this.authPageHeading).toContainText(heading);
    await expect(this.authPageText).toContainText(text);
  }

}
