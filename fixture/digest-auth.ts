import { expect, Page, Browser } from "@playwright/test";

// export const test = base,extend<{ FixtureName: Page}>({
//     FixtureName: async()=>{}
// });

export const digestLogin = {
  digestLogin: async ({ browser }:{ browser: Browser }, use: (page: Page) => Promise<void>) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: "admin",
        password: "admin",
      },
    });

    const page = await context.newPage();
    // use the credentials to loggin;
    await page.goto("https://the-internet.herokuapp.com/digest_auth");
    // await expect(page.getByRole("heading", { level: 3 }))
    //   .toContainText("Digest Auth");

    await use(page);

    await context.close();
  },
};

// export const digestLoggin = base.extend<{ DigestLoggin: Page }>({
//   DigestLoggin: async ({ browser }, use) => {
//     const context = await browser.newContext({
//       httpCredentials: {
//         username: "admin",
//         password: "admin",
//       },
//     });

//     const page = await context.newPage();
//     // use the credentials to loggin;
//     await page.goto("https://the-internet.herokuapp.com/digest_auth");
//     await expect(page.getByRole("heading", { level: 3 }))
//       .toContainText("Digest Auth")
//       .catch(() => {
//         console.log("web page loggin issue");
//       });

//     await use(page);

//     await context.close();
//   },
// });

