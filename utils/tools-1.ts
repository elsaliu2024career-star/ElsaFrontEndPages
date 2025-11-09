import { expect, Locator, test } from "@playwright/test";
import { time } from "console";
import path from "path/win32";
import { Page } from "playwright";

export class Tools1 {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string, time?: number) {
    const response = await this.page.goto(url, {
      waitUntil: "load",
      timeout: time,
    });
    expect(response?.status()).toBe(200);
  }

  async getTextContent(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? "";
  }

  async safeClick(locator: Locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async getClickStatusCode(locator: Locator, path: string):Promise<number>{
    const [response] = await Promise.all([
      this.page.waitForResponse((res) => res.url().includes(path),{timeout: 10_000}),
      locator.click(),
    ]);
    console.log(`the status code is ${response.status()}`);
    await this.page.goBack();
    return response.status();

  }



}
