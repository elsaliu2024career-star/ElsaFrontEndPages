import { Locator, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";
import { TIMEOUT } from "dns";

export class ElementRender{
    protected readonly page: Page;
    protected readonly commonActions: CommonActions
    protected readonly example1: Locator;
    protected readonly example2: Locator;
    protected readonly heading: Locator;
    protected readonly paragraphContent1: Locator;
    protected readonly paragraphContent2: Locator;
    protected readonly loadingIcon: Locator;
    protected readonly exampleStartButton: Locator;
    protected readonly exmaple1SuccessMessage: Locator;

    constructor(page:Page){
        this.page=page;
        this.commonActions= new CommonActions(page);
        this.example1 = page.getByRole('link', { name: 'Example 1: Element on page that is hidden' });
        this.example2 = page.getByRole('link', { name: 'Example 2: Element rendered after the fact' });
        this.heading = page.getByRole('heading', {level: 3});
        this.paragraphContent1 = page.locator('p:nth-child(2)');
        this.paragraphContent2 = page.locator('p:nth-child(3)');
        this.loadingIcon = page.locator('#loading');
        this.exampleStartButton = page.getByRole('button', { name: 'Start' });
        this.exmaple1SuccessMessage = page.locator('div#finish h4:nth-child(1)');

    };

    async navigateToElementRenderPage(url:string){
        await this.commonActions.navigate(url);
    };

    async getHeading():Promise<string>{
       return await this.commonActions.getTextContent(this.heading);
    }

    async getParagraphContent1():Promise<string>{
        return await this.commonActions.getTextContent(this.paragraphContent1);
    }

    async getParagraphContent2():Promise<string>{
        return await this.commonActions.getTextContent(this.paragraphContent2);
    }

    async clickExample1(){
        await this.commonActions.safeClick(this.example1);
    }

    async clickExample2(){
        await this.commonActions.safeClick(this.example2);
    }

    async getClickExample1StartButtonText():Promise<string>{
        await this.commonActions.safeClick(this.exampleStartButton);
        await this.loadingIcon.waitFor({state: 'hidden', timeout: 10_000});
        return await this.commonActions.getTextContent(this.exmaple1SuccessMessage);
    }

    async getClickExample2StartButtonText():Promise<string>{
        await this.commonActions.safeClick(this.exampleStartButton);
        await this.loadingIcon.waitFor({state: 'hidden', timeout: 10_000});
        return await this.commonActions.getTextContent(this.exmaple1SuccessMessage);
    }

}