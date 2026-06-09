import { test as base, expect, type BrowserContext, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { config } from '../config';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authContext: BrowserContext;
  authPage: Page;
};

export const test = base.extend<Fixtures>({
  // Basic page object fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  // Authenticated context and page (from auth-test.ts)
  authContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${config.baseURL}/login`);
    await page.getByLabel('Username').fill(config.username);
    await page.getByLabel('Password').fill(config.password);
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
