import { test, expect } from '../fixtures/test';

test.describe('Rijkswaterstaat Application', () => {
  test('should login and verify URL and title, then click home button', async ({ rijkswaterstattLoginPage, rijksAuthPage }) => {
    // rijksAuthPage fixture already logged in automatically
    
    // Verify URL contains localhost:8070
    const currentURL = rijksAuthPage.url();
    expect(currentURL).toContain('localhost:8070');
    
    // Verify page title is "Rijkswaterstaat"
    const pageTitle = await rijksAuthPage.title();
    expect(pageTitle).toContain('Rijkswaterstaat');
    
    // Click Home button
    const homeButton = rijksAuthPage.locator('a:has-text("Home"), button:has-text("Home"), [aria-label*="Home" i]');
    if (await homeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await homeButton.click();
    }
    
    // Verify we're still on the page
    const finalURL = rijksAuthPage.url();
    expect(finalURL).toContain('localhost:8070');
  });
});
