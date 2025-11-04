import { Locator, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";

export class DynamicPage {
  protected readonly page: Page;
  protected readonly commonActions: CommonActions;
  protected readonly heading: Locator;
  protected readonly instruction: Locator;
  protected readonly checkbox: Locator;
  protected readonly removeButton: Locator;
  protected readonly enableButton: Locator;
  // protected readonly enableMessage: Locator;
  protected readonly addButton: Locator;
  protected readonly disableButton: Locator;
  // protected readonly disableMessage: Locator;
  protected readonly messageInfo: Locator;
  protected readonly waitingIcon1: Locator;
  protected readonly waitingIcon2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commonActions = new CommonActions(page);
    this.heading = page.locator("h4:nth-child(1)");
    this.instruction = page.locator("p:nth-child(2)");
    this.checkbox = page.getByText("A checkbox").first();
    this.removeButton = page.getByRole("button", { name: "Remove" });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.enableButton = page.getByRole("button", { name: "Enable" });
    this.disableButton = page.getByRole("button", { name: "Disable" });
    this.messageInfo = page.locator("#message");
    this.waitingIcon1 = page.locator("#loading").nth(0);
    this.waitingIcon2 = page.locator("#loading").nth(1);
  }

  async navigateToDynamicPage(url: string) {
    await this.commonActions.navigate(url);
  }

  async getHeading(): Promise<string> {
    return await this.commonActions.getTextContent(this.heading);
  }

  async getInstruction(): Promise<string> {
    return await this.commonActions.getTextContent(this.instruction);
  }

  async existenceOfCheckbox(): Promise<boolean> {
    return await this.commonActions.existenceofElement(this.checkbox);
  }

  async existenceOfEnableButton(): Promise<boolean> {
    return await this.commonActions.existenceofElement(this.enableButton);
  }

  async clickRemoveBotton() {
    await this.commonActions.safeClick(this.removeButton);
    await this.waitingIcon1.waitFor({ state: "hidden" });
  }

  async clickAddButton() {
    await this.commonActions.safeClick(this.addButton);
    await this.waitingIcon1.waitFor({ state: "hidden" });
  }

  async clickEnableButton() {
    await this.commonActions.safeClick(this.enableButton);
    await this.waitingIcon2.waitFor({ state: "hidden" });
  }

  async getEnableMessage(): Promise<string> {
    return await this.commonActions.getTextContent(this.messageInfo);
  }

  async clickDisableButton() {
    await this.commonActions.safeClick(this.disableButton);
    await this.waitingIcon2.waitFor({ state: "hidden" });
  }

  async getDisableMessage(): Promise<string> {
    return await this.commonActions.getTextContent(this.messageInfo);
  }
}
