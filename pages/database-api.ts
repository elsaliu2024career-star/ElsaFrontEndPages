import { APIRequestContext, APIResponse } from "@playwright/test";
import { apiTools } from "../utils/api-tools";



export class ChatMessage {

    protected readonly request: APIRequestContext;
    protected readonly apiTools: apiTools;


    constructor(request: APIRequestContext) {
        this.request = request;
        this.apiTools = new apiTools(request);
    }

    async getChatMessages(apiUrl: string, headers: Record<string, string>, data?: any,params?:any, form?:any): Promise<APIResponse> {

        console.log('the apiURL is ', apiUrl);
        const response = await this.apiTools.sendAPIRequest(apiUrl, "GET", headers);
        return response;
    }


}