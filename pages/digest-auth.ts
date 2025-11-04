import { Page, expect } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";


export class VerifyDigestPage{

    protected readonly page: Page;
    protected readonly commonActions: CommonActions;

    constructor(page: Page){
        this.page = page;
        this.commonActions = new CommonActions(page);
    }

    async verifyHeadingAndText(heading:string, text: string){
        await this.commonActions.VerifyHeadingContent(heading);
        await expect(this.page.getByText(text)).toBeVisible;
    }
}