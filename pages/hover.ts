import { Locator, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";

export class Hover {
  protected readonly page: Page;
  protected readonly commonActions: CommonActions;
  protected readonly heading: Locator;
  protected readonly paragraph: Locator;
  protected readonly hoverImage: Locator[];
  protected readonly hiddenText: Locator[];

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator("h3");
    this.paragraph = page.locator("p");
    this.commonActions = new CommonActions(page);
    this.hoverImage = [0, 1, 2].map((num) =>
      page.getByRole("img", { name: "User Avatar" }).nth(num)
    );
    this.hiddenText = [3, 4, 5].map((num) =>
      page.locator(`.figure:nth-child(${num}) h5`)
    );
  }

  async navigateHoverPage(url: string) {
    await this.commonActions.navigate(url);
  }

  async getHeadingInfomation(): Promise<string> {
    return await this.commonActions.getTextContent(this.heading);
  }

  async getParagraph(): Promise<string> {
    return await this.commonActions.getTextContent(this.paragraph);
  }

  async getHoverContent(): Promise<string[]> {
    const textString: string[] = [];
    let eachText = "";

    for (let i = 0; i < this.hoverImage.length; i++) {
      await this.hoverImage[i].hover();
      try {
        eachText = (await this.hiddenText[i].textContent()) ?? "";
      } catch {
        eachText = "";
        console.warn(`no text is got from ${this.hoverImage[i]}`);
      }
      textString.push(eachText);
    }

    return textString;
  }

  async verifyStringArray(
    getArray: string[],
    expectArray: string[]
  ): Promise<{ eachVerification: boolean[]; isPassed: boolean }> {
    let isPassed: boolean = false;
    let eachVerification: boolean[] = [];

    for (let i = 0; i < expectArray.length; i++) {
      console.log(
        `the getArray is ${getArray[i]}, and the expectArray is ${expectArray[i]} `
      );
      if (getArray[i] === expectArray[i]) {
        eachVerification.push(true);
      } else {
        eachVerification.push(false);
      }
    }

    if (eachVerification.includes(false)) {
      isPassed = false;
    } else {
      isPassed = true;
    }
    return { eachVerification, isPassed };
  }
}
