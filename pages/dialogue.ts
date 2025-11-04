import { CommonActions } from "../utils/common-actions";
import { expect, Locator, Page } from "@playwright/test";

export class VerifyDialogue {
  protected readonly page: Page;
  protected readonly commonActions: CommonActions;
  protected readonly contextBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commonActions = new CommonActions(page);
    this.contextBox = page.locator('#hot-spot');
  }

  async verifyHeadingAndText(heading: string) {
    await this.commonActions.VerifyHeadingContent(heading);
    await expect(this.page.locator("#content")).toContainText(
      "Context menu items are custom additions that appear in the right-click menu."
    );
    await expect(this.page.locator("#content")).toContainText(
      "Right-click in the box below to see one called 'the-internet'. When you click it, it will trigger a JavaScript alert."
    );
  }

  async verifyDialogue(message: string){    
    this.page.once('dialog', dialog => {
    expect(dialog.message()).toContain(message);
    dialog.accept();
  });

    await this.page.locator('#hot-spot').click({
    button: 'right'
  });
  }

}
