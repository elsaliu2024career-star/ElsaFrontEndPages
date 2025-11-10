import { APIRequestContext, APIResponse } from "@playwright/test";

export class apiTools {
  protected readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async sendAPIRequest(
    // request: APIRequestContext,
    url: string,
    method: string,
    headers: Record<string, string> = {},
    data?: any,
    params?: Record<string, any>,
    form?: any
  ): Promise<APIResponse> {
    const response = await this.request.fetch(url, {
      method: method,
      headers: headers,
      data: data,
      params: params,
      form: form,
    });
    await this.verifyAPIResponse(response);
    return response;
  }

  async verifyAPIResponse(response: APIResponse) {
    const statusCode = response.status();
    const testServer = response.headers()["server"] ?? "";
    if (statusCode >= 200 && statusCode < 400) {
      console.log(`✅ API Response Status Code: ${statusCode} - Success`);
      console.log(`Server: ${testServer}`);
    } else {
      console.warn(
        `❌ API Response Status Code: ${statusCode} - Warning/Error`
      );
    }
    const contentType = response.headers()["content-type"] ?? "";
    if (contentType.includes("application/json")) {
      const responseBody = await response.json();
      console.log("Response Body:", responseBody);
    } else {
      console.log(
        `Response Body is not in JSON format. Content-Type: ${contentType}`
      );
    }
  }
}
