import { expect, Locator, LocatorScreenshotOptions, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";


export  class VerifyDropdown{
    protected readonly page;
    protected readonly commonActions: CommonActions;
    protected readonly dropdownLocator: Locator;
    protected readonly headingLocator: Locator;
    // protected readonly expectedOptions: {option: string, expecteddString: string}[];

    constructor(page: Page){
        this.page = page;
        this.commonActions = new CommonActions(page);
        this.headingLocator = page.getByRole('heading', { name: 'Dropdown List' }); 
        this.dropdownLocator = page.locator('#dropdown');
        // this.expectedOptions = [
        //     {option: '1', expecteddString: 'Option 1'},
        //     {option: '2', expecteddString: 'Option 2'}
        // ];
    }

    async navigateToDropdownPage(url:string){
        await this.commonActions.navigate(url);
    }

    async getHeadingContent(): Promise<string>{
        return await this.headingLocator.textContent() ?? '';
    }

    async selectOption(option: string) {
        await this.dropdownLocator.selectOption(option);
    }

    async getSelectedOptionText(): Promise<string> {
        return await this.dropdownLocator.textContent() ?? '';
    };

    // async verifyDropdownContent(heading: string){
    //     await expect(this.page.getByRole('heading', {level: 3})).toContainText(heading);
    //     await this.dropdownLocator.click();
    //     await expect(this.dropdownLocator).toContainText('Please select an option');

    //     for(let i=0; i< this.expectedOptions.length; i++){
    //         await this.dropdownLocator.selectOption(this.expectedOptions[i].option);
    //         await expect(this.dropdownLocator).toContainText(this.expectedOptions[i].expecteddString);
    //     };
    // }

}