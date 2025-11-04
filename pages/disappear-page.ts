import { expect, Locator, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";

export class VerifyDisappearPage {
  protected readonly page:Page;
  protected readonly commonActions: CommonActions;
  protected readonly links: Locator[];

  constructor(page:Page){
    this.page = page;
    this.commonActions = new CommonActions(page);
    this.links = ['Home','About','Contact Us','Portfolio'].map((path)=>(page.getByRole('link',{name:path})));
  };

  async navigateAndVerifyLoadingStatus(url:string){
    await this.commonActions.navigate(url);
  };

  async verifyHeadingAndContent(heading: string){
    await this.commonActions.VerifyHeadingContent(heading);
  }

  async verifyLinkClick(statusCode: number [], expecttedHeadding?: (string | RegExp)[]){

    await this.commonActions.verifyLinkResponse(this.links, statusCode, expecttedHeadding)
  };

}