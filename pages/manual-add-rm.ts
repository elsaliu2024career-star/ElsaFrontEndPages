import { Locator, Page, expect } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";

export class addRemovePage {
  protected readonly page: Page;
  protected readonly commonActions: CommonActions;
  protected readonly heading: Locator;
  protected readonly addButton: Locator;
  protected readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commonActions = new CommonActions(page);
    this.heading = page.getByRole('heading', {level: 3});
    this.addButton = page.getByRole('button', { name: 'Add Element' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async navigateAndVerifyPageContent(url: string, heading: string) {
    await this.commonActions.navigate(url);
    await expect(this.heading).toContainText(heading);
    await expect(this.addButton).toBeVisible();
  }

  async verifyAddDeleteButton(time: number){
    let i;
    for(i=0;i<time;i++){
        await this.addButton.click();
        await expect(this.deleteButton).toHaveCount(i+1);
    };

    for(i=time;i>0;i--){
      await this.deleteButton.nth(i-1).click();
      await expect(this.deleteButton).toHaveCount(i-1);
    };

  }


}
