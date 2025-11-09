import { Locator, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";


export class Slider{

    protected readonly page:Page;
    protected readonly slider: Locator;
    protected readonly commonActions: CommonActions;
    protected readonly sliderPanel: Locator;

    constructor(page:Page){
        this.page = page;
        this.slider = page.getByRole('slider');
        this.commonActions = new CommonActions(page);
        this.sliderPanel = page.locator('#range');
    }

    async navigateToSliderPage(url:string){
        await this.commonActions.navigate(url);
    }

    async dragSlider(num:string):Promise<string>{
        let number = Number(num);
        let trimmedNumber = num;
        
        if(number>5){ trimmedNumber ='5'};
        if(number<0){ trimmedNumber = '0'};
        console.log(`the trimmed number is ${trimmedNumber}`);
        await this.commonActions.dragSliderToNumber(this.slider,trimmedNumber);   
        return trimmedNumber;     
    }

    async getSliderPanelText():Promise<string>{
        return await this.commonActions.getTextContent(this.sliderPanel);

    }
}