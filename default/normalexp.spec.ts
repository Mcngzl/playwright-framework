import { test, expect } from '@playwright/test';

test('should open Skyscanner homepage', async ({ page }) => {
  await page.goto('https://www.skyscanner.com/', {
    waitUntil: 'domcontentloaded',
  });

  await expect(page).toHaveURL(/skyscanner/i);
  await expect(page).toHaveTitle(/Skyscanner/i);
  await page.waitForTimeout(6000); // Optional: Wait for 2 seconds to visually confirm the page load
});