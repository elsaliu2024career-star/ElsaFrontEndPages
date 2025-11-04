import { test as base, Page } from "@playwright/test";
import { authPage } from "./baiscAuthLogin";
import { digestLogin } from "./digest-auth";

export const test = base
  .extend<{ authPage: Page }>({ ...authPage })
  .extend<{ digestLogin: Page }>({ ...digestLogin });

// export const test = base.extend<{
//   authPage: Page;
//   digestLogin: Page;
// }>({
//   ...authPage,
//   ...digestLogin,
// });import { test as base, Page } from "@playwright/test";

// type CustomFixtures = {
//   authPage: Page;
//   digestLogin: Page;
// };

// export const test = base.extend<CustomFixtures>({
//   authPage: async ({ page }, use) => {
//     await use(page);
//   },
//   digestLogin: async ({ page }, use) => {
//     await use(page);
//   }
// });
