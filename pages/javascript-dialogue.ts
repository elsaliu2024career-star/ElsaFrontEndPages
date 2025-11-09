import { Locator, Page } from "@playwright/test";
import { error } from "console";
import { parseArgs } from "util";


export class JavaDialogue{

    protected readonly page:Page;
    protected readonly textContent: Record<string,Locator>;
    protected readonly dialogueLocators: Record<string, Locator>;

    constructor(page:Page){
        this.page = page;
        this.textContent = {
            heading: page.locator('h3'),
            paragraph: page.locator('p:nth-child(2)'),
            result: page.locator('#result')
        };
        this.dialogueLocators = {
            alert: page.getByRole('button', { name: 'Click for JS Alert' }),
            confirm: page.getByRole('button', { name: 'Click for JS Confirm' }),
            prompt: page.getByRole('button', { name: 'Click for JS Prompt' })
        }
    }

    async navigateToJavaPage(url:string){
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    }

    async getTextContent(title:string):Promise<string>{
        if(!this.textContent[title]){throw new Error(`the title ${title} is not found from the page`);};
        return await this.textContent[title].textContent() ?? '';
    }

    async dialogueAction(option:string, input?:string){
        if(!this.dialogueLocators[option]){
            throw new Error(`there is no option ${option}`);
        };

        if(option === 'alert'){
            this.page.once('dialog',dialog=>{
                console.log(dialog.message());
                dialog.dismiss();
            });

            await this.dialogueLocators[option].click();
            
        }else if(option === 'confirm'){
                this.page.once('dialog',dialog=>{
                console.log(dialog.message());
                if (input != 'OK' && input != 'Cancel'){throw new Error('error input, the valid input are OK or Cancel')};
                if (input === 'OK'){dialog.accept();}else{dialog.dismiss();};
                
            });

            await this.dialogueLocators[option].click();
        }else if(option === 'prompt'){
                this.page.once('dialog',dialog=>{
                console.log(dialog.message());
                dialog.accept(input);                
            });

            await this.dialogueLocators[option].click();
        };
        
    }

}