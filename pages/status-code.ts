import { Locator, Page } from "playwright";
import { Tools1 } from "../utils/tools-1";

export class statusCode{

    protected readonly page: Page;
    protected readonly tools: Tools1;
    protected readonly locatorMap: Record<string, Locator>;

    constructor(page: Page) {
      this.page = page;
      this.tools = new Tools1(page);
      this.locatorMap = {
        heading: page.locator('h3'),
        paragraph: page.locator('p:nth-child(2)'),
        200: page.getByRole('link', { name: '200' }),
        301: page.getByRole('listitem').filter({ hasText: '301' }),
        404: page.getByRole('listitem').filter({ hasText: '404' }),
        500: page.getByRole('link', { name: '500' })
      };
    }

    async navigate(url: string, time?: number) {
      await this.tools.navigate(url, time);
    }

    async getTextContent(titleName: string):Promise<string>{
        if (!this.locatorMap[titleName]) {
            throw new Error(`Locator for ${titleName} not found`);
        }
        return await this.tools.getTextContent(this.locatorMap[titleName]);
    }

    async getClickCode(linkName: string, path: string):Promise<number>{
        if (!this.locatorMap[linkName]) {
            throw new Error(`Locator for ${linkName} not found`);
        }
        const statusCode = (await  this.tools.getClickStatusCode(this.locatorMap[linkName],path)) ?? 0;
        console.log(`the status code is ${statusCode}`);
        return statusCode;
    }

}