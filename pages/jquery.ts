import { Locator, Page, expect } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";
import { errorMonitor } from "events";

export class JQueryPage {
  protected readonly page: Page;
  protected readonly commonActions: CommonActions;
  protected readonly heading: Locator;

  //   protected readonly menu1: Record<string, string[]>;
  //   protected readonly menuItems: Record<string, Locator>;
  protected readonly menuMap: Record<
    string,
    { locator: Locator; subMenu?: string[] }
  >;

  constructor(page: Page) {
    this.page = page;
    this.commonActions = new CommonActions(page);
    this.heading = page.locator("h3");
    // this.menu1 = {
    //   enableLocator: ["downloadLocator", "backLocator"],
    //   downloadLocator: ["pdfLocator", "csvLocator", "excelLocator"],
    // };
    // this.menuItems = {
    //   enableLocator: page.locator("#ui-id-3 > a"),
    //   downloadLocator: page.locator("#ui-id-4 > a"),
    //   backLocator: page.locator("#ui-id-8 > a"),
    //   pdfLocator: page.locator("#ui-id-5"),
    //   csvLocator: page.locator("#ui-id-6"),
    //   excelLocator: page.locator("#ui-id-7"),
    // };
    this.menuMap = {
      enableLocator: {
        locator: page.locator("#ui-id-3 > a"),
        subMenu: ["downloadLocator", "backLocator"],
      },
      downloadLocator: {
        locator: page.locator("#ui-id-4 > a"),
        subMenu: ["pdfLocator", "csvLocator", "excelLocator"],
      },
      backLocator: { locator: page.locator("#ui-id-8 > a") },
      pdfLocator: { locator: page.locator("#ui-id-5") },
      csvLocator: { locator: page.locator("#ui-id-6") },
      excelLocator: { locator: page.locator("#ui-id-7") },
    };
  }

  async navigateJqueryPage(url: string) {
    await this.commonActions.navigate(url);
  }

  async getHeading(): Promise<string> {
    return await this.commonActions.getTextContent(this.heading);
  }

  async getAllParentMenus(itemName: string): Promise<string[]> {
    if (!this.menuMap[itemName]) return [];

    for (const [locatorName, detailList] of Object.entries(this.menuMap)) {
      if (detailList.subMenu?.includes(itemName)) {
        const parentPath = await this.getAllParentMenus(locatorName);
        if (parentPath) {
          return [...parentPath, itemName];
        }
      }
    }

    return [itemName];
  }

  async getHoverContentFromNextLevel(
    itemName: string
  ): Promise<string[] | null> {
    let list: string[] = [];
    // if (!this.menuItems[itemName]) {
    if (!this.menuMap[itemName].locator) {
      throw new Error(`Cannot find menu locator for ${itemName}`);
    }
    // await this.menuItems[itemName].hover();// must hover with planned behavior to get the submenu
    // await this.menuMap[itemName].locator.hover();

    const parentList = (await this.getAllParentMenus(itemName));
    const routerLocator = (await this.getAllParentMenus(itemName)).map((str) => this.menuMap[str].locator);
    console.log(`the parent Path is ${parentList}`);
    for (let i = 0; i < parentList.length; i++) {
      await routerLocator[i].hover();
      await this.page.waitForTimeout(500);
    }

    // const subMenu: string[] = this.menu1[itemName];
    const subMenu: string[] = this.menuMap[itemName].subMenu ?? [];
    console.warn(`The submenu is ${subMenu}, the type is ${typeof(subMenu)}`);
    if (!subMenu || subMenu.length === 0) {
      //   throw new Error(`No submenu found for item: ${itemName}`);
      console.warn(`The menu ${itemName} has no submenu`);
      return null;
    }
    const subMenuLocators: Locator[] = subMenu.map(
      //   (str) => this.menuItems[str]
      (str) => this.menuMap[str].locator
    );

    for (const locator of subMenuLocators) {
      await expect(locator).toBeVisible(); // ✅ must call the function
      const listValue = await this.commonActions.getTextContent(locator);
      list.push(listValue);
      console.log(`the list content is ${listValue}`);
    }
    
    if(!list){return null};
    return list;
  }

  async isListContentExpected(
    getList: string[] | null,
    expectedList: string[] | null
  ): Promise<{ eachResult: boolean[] | null; overallResult: boolean }> {
    let eachResult: boolean[] = [];
    let overallResult: boolean = false;

    if (!getList && !expectedList) {
      console.warn(
        "⚠️ Both getList or expectedList are null. Skipping comparison."
      );
      return { eachResult: null, overallResult: true };
    }

    if (!getList || !expectedList) {
      console.warn(
        "⚠️ One of the getList or expectedList is null. Skipping comparison."
      );
      return { eachResult: null, overallResult: false };
    }

    if (getList.length != expectedList.length) {
      console.warn(
        "⚠️ The shown list length is different from the expected one."
      );
      return { eachResult: null, overallResult: false };
    }

    for (let i = 0; i < getList.length; i++) {
      if (getList[i] === expectedList[i]) {
        eachResult[i] = true;
      } else {
        eachResult[i] = false;
      }
    }

    if (eachResult.includes(false)) {
      overallResult = false;
    } else {
      overallResult = true;
    }

    return { eachResult, overallResult };
  }
}
