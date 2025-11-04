import { Locator, Page, expect } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";

export class VerifyDrag {
  protected readonly page: Page;

  protected readonly source: Locator;

  protected readonly target: Locator;

  protected readonly commonActions: CommonActions;

  constructor(page: Page) {
    this.page = page;
    this.source = page.locator("#column-a");
    this.target = page.locator("#column-b");

    this.commonActions = new CommonActions(page);
  }

  async navigateToDragPage(url: string) {
    await this.commonActions.navigate(url);
  }

  async dragAndDrop(stringA: string, stringB: string) {
    // Below code is noe compatible with webkit
    // await this.source.dragTo(this.target);
    // await expect(this.source).toContainText(stringB);
    // await expect(this.target).toContainText(stringA);

    // const sourceBox = await this.source.boundingBox();
    const sourceBox = await this.source.boundingBox();
    const targetBox = await this.target.boundingBox();

    if (sourceBox && targetBox) {
      await this.page.mouse.move(
        sourceBox.x + sourceBox.width / 2,
        sourceBox.y + sourceBox.height / 2
      );
      await this.page.mouse.down();
      await this.page.mouse.move(
        targetBox.x + targetBox.width / 2,
        targetBox.y + targetBox.height / 2
      );
      await this.page.mouse.up();
    }

    await expect(this.target).toContainText(stringA);
    await expect(this.source).toContainText(stringB);
  }
}
