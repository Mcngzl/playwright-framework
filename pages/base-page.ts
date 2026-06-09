import { Page, Locator } from '@playwright/test';
import { WaitUtils, PageUtils } from '../utils/waits';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForElement(selector: string, timeout?: number): Promise<Locator> {
    return WaitUtils.waitForElement(this.page, selector, timeout);
  }

  async waitForNavigation(urlPattern: RegExp | string, timeout?: number) {
    return WaitUtils.waitForNavigation(this.page, urlPattern, timeout);
  }

  async fillInput(locator: Locator, value: string) {
    return PageUtils.fillInput(locator, value);
  }

  async safeClick(locator: Locator) {
    return PageUtils.safeClick(locator);
  }

  async getText(locator: Locator, defaultValue?: string): Promise<string> {
    return PageUtils.getText(locator, defaultValue);
  }

  async retry<T>(action: () => Promise<T>, maxRetries?: number) {
    return WaitUtils.retry(action, maxRetries);
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async close() {
    await this.page.close();
  }
}