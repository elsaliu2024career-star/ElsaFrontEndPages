import {test as base, expect as baseExpect, Browser, Page} from '@playwright/test';


export const test = base.extend<{authPage: Page;}>({
     authPage: async ({browser}:{browser:Browser}, use) => {

      const context = await browser.newContext({
        httpCredentials:{
            username: 'admin',
            password: 'admin'
        }
      });
      
      const page = await context.newPage();

      await page.goto('https://the-internet.herokuapp.com/basic_auth');

      await use(page);
    }
});

//export const expect = baseExpect;