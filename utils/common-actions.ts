import {
  APIRequestContext,
  APIResponse,
  Locator,
  Page,
  expect,
} from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export class CommonActions {
  protected readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading");
  }

  async resolve(locator: string | Locator) {
    return typeof locator === "string" ? this.page.locator(locator) : locator;
  }

  async navigate(url: string, time?: number) {
    const response = await this.page.goto(url, {
      waitUntil: "load",
      timeout: time,
    });
    expect(response?.status()).toBe(200);
  }

  async pageNavigate(url: string, time: number) {
    let responseList: number[] = [];

    const resonseHandler = (res: any) => {
      responseList.push(res);
    };

    this.page.on("response", resonseHandler);

    try {
      await this.page.goto(url, { waitUntil: "load", timeout: time });

      if (responseList.includes(404)) {
        throw new Error(`navigationt to the page ${url} encountered 404 error`);
      }
    } finally {
      this.page.off("response", resonseHandler);
    }

    expect(responseList).not.toContain(404);
  }


  async fillInput(locator: Locator, value: any) {
    await locator.waitFor({ state: "visible" });
    await locator.fill(value);
  }

  async getNetworkStatusOnNavigation(url: string): Promise<number> {
    const response = await this.page.goto(url, { waitUntil: "load" });
    return response?.status() ?? 0;
  }

  // async navigate(url: string) {
  //   const pageLoadState: number[] = [];
  //   const response = await this.page.goto(url, { waitUntil: "load" });
  //   expect(response?.status()).toBe(200);
  //   this.page.on("response", async (res) => {
  //     pageLoadState.push(res.status());
  //   });
  //   expect(pageLoadState).not.toContain(404);
  // }


  async safeClick(locator: Locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }


  async VerifyHeadingContent(content: string) {
    await expect(this.heading).toContainText(content);
  }

  async getTextContent(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? "";
  }

  async existenceofElement(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async verifyLinkResponse(
    links: Locator[],
    statusCode: number[],
    heading?: (string | RegExp)[]
  ) {
    for (let i = 0; i < links.length; i++) {
      const href = await links[i].getAttribute("href");
      console.log(`Verifying link href: ${href}`);
      if (!href) continue;

      const [response] = await Promise.all([
        this.page.waitForResponse((res) => res.status() === statusCode[i], {
          timeout: 5_000,
        }),
        links[i].click(),
      ]);

      await expect(response.status()).toBe(statusCode[i]);
      await expect(this.page.getByRole("heading", { level: 1 })).toContainText(
        heading ? heading[i] : ""
      );
      await this.page.goBack();
    }
  }

  async SingleLinkClickStatusCode(link: Locator): Promise<number> {
    const href = await link.getAttribute("href");
    if (!href) return 0;

    const [response] = await Promise.all([
      this.page.waitForResponse((res) => res.url().includes(href ?? ""), {
        timeout: 5_000,
      }),
      link.click(),
    ]);

    return response.status();
  }

  async downloadFileFromLocatorAndSaveToPath(
    locator: Locator,
    downloadDir?: string
  ): Promise<string> {
    if (!downloadDir) {
      console.warn("downloadDir does not exist");
      downloadDir = "storage";
    }

    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      locator.click(),
    ]);
    const fileName = download.suggestedFilename();
    const absolutePath = path.resolve(downloadDir);

    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath);
    }
    const localPath = path.join(absolutePath, fileName);
    await download.saveAs(localPath);
    return localPath;
  }

  async isFileInPath(path: string): Promise<Boolean> {
    return fs.existsSync(path);
  }

  async cleanFileFromPath(path: string) {
    fs.rmSync(path);
  }

  async uploadFile(
    chooseLocator: Locator,
    uploadLocator: Locator,
    fileName?: string
  ): Promise<number> {
    // await chooseLocator.click();
    if (!fileName) {
      throw new Error("❌ File path is required for uploadFileStrict()");
    }

    if (!fs.existsSync(fileName)) {
      throw new Error(`❌ File not found at: ${fileName}`);
    }
    await chooseLocator.setInputFiles(fileName);
    const [response] = await Promise.all([
      this.page.waitForResponse((res) => res.url().includes("/upload") && res.status() >= 200),
      uploadLocator.click(),
    ]);

    return response.status();
  }

  async dragUpload(
    dragZoneLocator: Locator,
    uploadLocator: Locator,
    fileName: string
  ): Promise<number> {
    await dragZoneLocator.setInputFiles(fileName);
    await dragZoneLocator.dispatchEvent("drop");
    const [response] = await Promise.all([
      this.page.waitForResponse((res) => res.status() >= 200),
      uploadLocator.click(),
    ]);
    return response.status();
  }

  async scrollDown(y: number) {
    await this.page.evaluate((yValue) => window.scrollBy(0, yValue), y);
    const scrollY = await this.page.evaluate(() => window.scrollY);
    console.log(`✅ Scrolled to Y: ${scrollY}`);
    await this.page.waitForTimeout(5_000);
  }

  async dragSliderToNumber(sliderLocator: Locator, num: string) {
    await sliderLocator.fill(num);
  }

  // async getRequest(
  //   request: APIRequestContext,
  //   url: string,
  //   headers: Record<string, string> = {}
  // ): Promise<APIResponse> {
  //   const response: APIResponse = await request.get(url, { headers: headers });
  //   await this.verifyAPIResponse(response);
  //   return response;
  // }

  // async postRequest(
  //   request: APIRequestContext,
  //   url: string,
  //   data?: any,
  //   headers: Record<string, string> = {}
  // ): Promise<APIResponse> {
  //   const response: APIResponse = await request.post(url, {
  //     data: data,
  //     headers: headers,
  //   });
  //   await this.verifyAPIResponse(response);
  //   return response;
  // }

  // async deleteRequest(
  //   request: APIRequestContext,
  //   url: string,
  //   headers: Record<string, string> = {}
  // ): Promise<APIResponse> {
  //   const response = await request.delete(url, { headers: headers });
  //   await this.verifyAPIResponse(response);
  //   return response;
  // }

  // async patchRequest(
  //   request: APIRequestContext,
  //   url: string,
  //   headers: Record<string, string> = {},
  //   data?: any
  // ): Promise<APIResponse> {
  //   const response: APIResponse = await request.patch(url, {
  //     headers: headers,
  //     data: data,
  //   });

  //   await this.verifyAPIResponse(response);
  //   return response;
  // }


}
