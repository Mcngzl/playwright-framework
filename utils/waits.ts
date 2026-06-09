import { Page, Locator, Response } from '@playwright/test';

/**
 * Advanced wait utilities for better test reliability
 */
export class WaitUtils {
  /**
   * Wait for element with timeout
   */
  static async waitForElement(
    page: Page,
    selector: string,
    timeout: number = 5000
  ): Promise<Locator> {
    const locator = page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Wait for navigation with timeout
   */
  static async waitForNavigation(
    page: Page,
    urlPattern: RegExp | string,
    timeout: number = 5000
  ): Promise<void> {
    await page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Wait for API response
   */
  static async waitForResponse(
    page: Page,
    urlPattern: RegExp | string,
    timeout: number = 5000
  ): Promise<Response | null> {
    try {
      const response = await page.waitForResponse(urlPattern, { timeout });
      return response;
    } catch {
      return null;
    }
  }

  /**
   * Retry action with exponential backoff
   */
  static async retry<T>(
    action: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await action();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, i)));
      }
    }
    throw new Error('Retry failed');
  }
}

/**
 * Page interaction helpers
 */
export class PageUtils {
  /**
   * Fill input with clear first
   */
  static async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.click();
    await locator.fill('');
    await locator.fill(value);
  }

  /**
   * Safe click with visibility check
   */
  static async safeClick(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Get text with default value
   */
  static async getText(locator: Locator, defaultValue: string = ''): Promise<string> {
    try {
      return await locator.textContent({ timeout: 2000 }).then(t => t || defaultValue);
    } catch {
      return defaultValue;
    }
  }
}
