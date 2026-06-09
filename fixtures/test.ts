import { test as base, expect, type BrowserContext, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { RijkswaterstattPage } from '../pages/rijkswaterstaat-page';
import { RijkswaterstattLoginPage } from '../pages/rijkswaterstaat-login-page';
import { config } from '../config';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  rijkswaterstattPage: RijkswaterstattPage;
  rijkswaterstattLoginPage: RijkswaterstattLoginPage;
  rijksAuthPage: Page;
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

  rijkswaterstattPage: async ({ page }, use) => {
    await use(new RijkswaterstattPage(page));
  },

  rijkswaterstattLoginPage: async ({ page }, use) => {
    await use(new RijkswaterstattLoginPage(page));
  },

  // Rijkswaterstaat authenticated page
  rijksAuthPage: async ({ page }, use) => {
    const loginPage = new RijkswaterstattLoginPage(page);
    await loginPage.open();
    await loginPage.login(config.rijksUsername, config.rijksPassword);
    await use(page);
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
