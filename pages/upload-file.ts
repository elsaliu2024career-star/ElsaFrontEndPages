import { Locator, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";
import { error } from "node:console";

export class uploadFile {
  protected readonly page: Page;
  protected readonly commonActions: CommonActions;
  protected readonly heading: Locator;
  protected readonly paragraph: Locator;
  protected readonly chooseLocator: Locator;
  protected readonly uploadLocator: Locator;
  protected readonly fileName: string;
  protected readonly dragZone: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commonActions = new CommonActions(page);
    this.heading = page.getByRole('heading');
    this.paragraph = page.locator("p");
    this.chooseLocator = page.locator("#file-upload");
    this.uploadLocator = page.getByRole("button", { name: "Upload" });
    this.fileName = "test.json";
    this.dragZone = page.locator('#drag-drop-upload');
  }

  async navigateUploadPage(url: string) {
    await this.commonActions.navigate(url);
  }

  async getHeading(): Promise<string> {
    return await this.commonActions.getTextContent(this.heading);
  }

  async getParagraph(): Promise<string> {
    return await this.commonActions.getTextContent(this.paragraph);
  }

  async uploadFile(fileName: string): Promise<number> {
    return await this.commonActions.uploadFile(
      this.chooseLocator,
      this.uploadLocator,
      fileName
    );
  }

  async uploadBlankFile(): Promise<number> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes("/upload") && res.status() >= 400
      ),
      this.uploadLocator.click(),
    ]);
    return response.status();
  }

  async dragUpload(fileName:string):Promise<number>{
    return await this.commonActions.dragUpload(this.dragZone,this.uploadLocator, fileName);
  }
}
