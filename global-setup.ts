import { chromium, expect } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/secure');
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

  //console.log(await context.cookies());

  await context.storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;