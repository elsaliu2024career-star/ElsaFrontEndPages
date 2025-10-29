import { expect, Locator, Page } from "@playwright/test";

export class VerifyBrokenPage {
  protected readonly page: Page;
  protected readonly heading: Locator;
  // protected readonly picture1: Locator;
  // protected readonly picture2: Locator;
  // protected readonly picture3: Locator;
  protected readonly picture: Locator[];

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { level: 3 });

    // this.picture1 = page.locator("[src='asdf\.jpg']");
    // this.picture2 = page.locator("[src='hjkl\.jpg']");
    // this.picture3 = page.locator("[src='img\/avatar-blank\.jpg']");
    // this.picture = ["'asdf.jpg'", "'hjkl.jpg'", "'img/avatar-blank.jpg'"].map((src) =>
    //   page.locator(`[src=${src}]`)
    // );

    this.picture = [1,2,3].map((i:number)=>(page.getByRole('img').nth(i)));
  }

  async NavigateAndVerifyHeading(url: string, heading: string) {
    await this.page.goto(url);
    await expect(this.heading).toContainText(heading);
  }

  async VerifyImage() {
    for (let i = 0; i < 3; i++) {
      await expect(this.picture[i]).toBeVisible;
      const isLoaded = await this.picture[i].evaluate(
        (el: HTMLImageElement) => el.complete && el.naturalWidth > 0
      );
      expect(isLoaded).toBeFalsy;
    }
  }
}
