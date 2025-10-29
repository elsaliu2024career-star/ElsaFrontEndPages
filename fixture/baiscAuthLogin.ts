import { test as base, Page} from "@playwright/test";
import fs from "fs/promises";
//import { console } from "inspector";
import dotenv from "dotenv";
dotenv.config(); //import environment variables from .env file

export const test = base.extend<{ authPage: Page }>({
  authPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      httpCredentials:{
        username:'admin',
        password:'admin',
      }
    });

    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');

    await use(page);
    await context.close();
  }

});
