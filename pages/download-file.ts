import { Locator, Page } from "@playwright/test";
import { CommonActions } from "../utils/common-actions";


export class DownloadFile{

    protected readonly page:Page;
    protected readonly commonActions: CommonActions;
    // protected readonly downloadlocator: Locator;
    // protected readonly downloadPath: string;

    constructor(page:Page){
        this.page=page;
        this.commonActions= new CommonActions(page);
        // // this.downloadlocator = page.getByRole('link', { name: 'test.json' });
        // this.downloadPath = 'storage';
    }

    async navigateToDownloadPage(url:string){
        await this.commonActions.navigate(url);
    }

    async downloadFileToPath(fileName: string, path: string):Promise<string>{
        const downloadLink = this.page.getByRole('link', { name: fileName });
        await this.commonActions.downloadFileFromLocatorAndSaveToPath(downloadLink,path);
        return await this.commonActions.downloadFileFromLocatorAndSaveToPath(downloadLink,path);
    }

    async isFileSavedInPath(path:string):Promise<Boolean>{
        return await this.commonActions.isFileInPath(path);
    }

    async cleanDownloadedFile(path:string){
        await this.commonActions.cleanFileFromPath(path);
    }
}