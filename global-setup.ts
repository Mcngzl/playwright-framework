import { chromium, expect } from '@playwright/test';
import { config } from './config';

async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${config.baseURL}/login`);
  await page.getByLabel('Username').fill(config.username);
  await page.getByLabel('Password').fill(config.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/secure');
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

  await context.storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;