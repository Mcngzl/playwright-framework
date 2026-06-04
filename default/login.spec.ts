import { test, expect } from '../fixtures/auth-test';

test('authenticated user can access secure page', async ({ authPage }) => {
  await authPage.goto('https://the-internet.herokuapp.com/secure');
  await authPage.waitForTimeout(1000); // Optional: Wait for 2 seconds to visually confirm the page load
  await expect(authPage).toHaveURL(/\/secure/);
  await expect(authPage.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
});

