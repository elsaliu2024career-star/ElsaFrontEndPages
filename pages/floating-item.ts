import { Locator, Page, expect } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";

export class FloatingMenu{

    protected readonly page:Page;
    protected readonly commonActions: CommonActions;
    protected readonly floatingItems: Locator[];

    constructor(page:Page){
        this.page = page;
        this.commonActions= new CommonActions(page);
        this.floatingItems = ['Home','News','Contact','About'].map((title)=> page.getByRole('link', { name: title }));
    }

    async navigateToFloatingMenuPage(url:string){
        await this.commonActions.navigate(url);
    };

    async isFloatingMenuVisible(Pixel:number):Promise<Boolean>{
        let  isFloating = false;

        try{
        for(let i=0;i< this.floatingItems.length;i++){
            console.log('starts');
            await this.commonActions.scrollDown(200);
            // await this.page.waitForTimeout(_000);
            const initialPosition = await this.floatingItems[i].boundingBox();
            // console.log('starts2');
            await expect(this.floatingItems[i]).toBeVisible;
            debugger;
            await this.commonActions.scrollDown(Pixel);
            // console.log('starts3');
            const presentPosition = await this.floatingItems[i].boundingBox();
            console.log(`the initial pisition ${initialPosition!.y} and the present position ${presentPosition!.y}`);
            expect(Math.abs(presentPosition!.y-initialPosition!.y)).toBeLessThanOrEqual(2);            
        };
        isFloating = true;
    }catch{
        console.warn('one item is not floating');
        isFloating = false;
        }

        return isFloating;
    }
}