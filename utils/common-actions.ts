import {Locator, Page } from '@playwright/test'

export class CommonActions {
    
    protected readonly page: Page;

    constructor (page:Page){
        this.page = page;
    };

    async resolve(locator : string | Locator){
        return typeof locator === 'string'? this.page.locator(locator) : locator;
    };

    async navigate(url:string){
        await this.page.goto(url);
    };

    async clickLink(locator:  string | Locator){
        (await this.resolve(locator)).click;
        
    }

    async fillInput(locator: string | Locator,value: any){
        (await this.resolve(locator)).fill(value);
    };

}