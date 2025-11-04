import { expect, Locator, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";

export class VerifyCheckBox{
    protected readonly page : Page;
    protected readonly commonActions: CommonActions;
//    protected readonly checkBoxList: Locator[];
//    protected readonly checkBoxNumber: number;

    constructor(page:Page){
        this.page = page;
        this.commonActions = new CommonActions(page);
 //       this.checkBoxNumber = checkBoxNumber;
 //       this.checkBoxList = Array.from({length: checkBoxNumber},(_, i)=> page.getByRole('checkbox').nth(checkBoxNumber))
    };

    async verifyHeading(heading: string){
        this.commonActions.VerifyHeadingContent(heading);
    };

    async verifyClickCheckbox(checkBoxNumber:number){
        let checkBoxList = Array.from({length: checkBoxNumber},(_, i)=> this.page.getByRole('checkbox').nth(i));
        for(let i =0; i< checkBoxNumber; i++){
            await checkBoxList[i].click();
            await expect(checkBoxList[i]).toBeChecked();
        };
    };

    
}