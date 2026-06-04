import { test as base, expect, type BrowserContext, type Page } from '@playwright/test';

type Fixtures = {
  authContext: BrowserContext;
  authPage: Page;
};

export const test = base.extend<Fixtures>({
  authContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/secure');
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    await use(context);
    await context.close();
  },

  authPage: async ({ authContext }, use) => {
    const page = await authContext.newPage();
    await use(page);
    await page.close();
  },
});

export { expect };