import { Locator, Page, expect } from "@playwright/test";

export class CommonActions {
  protected readonly page: Page;
  protected readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { level: 3 });
  }

  async resolve(locator: string | Locator) {
    return typeof locator === "string" ? this.page.locator(locator) : locator;
  }

  async navigate(url: string) {
    const pageLoadState: number[] = [];
    const response = await this.page.goto(url, { waitUntil: "load" });
    expect(response?.status()).toBe(200);
    this.page.on("response", async (res) => {
      pageLoadState.push(res.status());
    });
    expect(pageLoadState).not.toContain(404);
  }

  async clickLink(locator: string | Locator) {
    (await this.resolve(locator)).click;
  }

  async safeClick(locator:  Locator) {
    await locator.waitFor({ state: "visible"});
    await locator.click();
  }

  async fillInput(locator: string | Locator, value: any) {
    (await this.resolve(locator)).fill(value);
  }

  async VerifyHeadingContent(content: string) {
    await expect(this.heading).toContainText(content);
  }

  async getTextContent(locator: Locator):Promise<string>{
      return (await locator.textContent()) ?? '';
  }

  async existenceofElement(locator: Locator):Promise<boolean>{
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

  async SingleLinkClickStatusCode(link: Locator): Promise <number> {
    const href = await  link.getAttribute("href");
    if (!href) return Promise.resolve(0);

    const [response] = await Promise.all([
      this.page.waitForResponse((res) => res.url().includes(href ?? "") , {
        timeout: 5_000,
      }),
      link.click(),
    ]);

    return response.status();
  }

  async downloadFileFromLocator(locator:Locator, path:string):Promise<string>{
    const [download] = await Promise.all([this.page.waitForEvent('download'),locator.click()]);
    const fileName = download.suggestedFilename();
    await download.saveAs(`${path}/${fileName}`);
    return await fileName;
  }

}
