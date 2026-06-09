import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class RijkswaterstattPage extends BasePage {
  readonly homeButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.homeButton = page.locator('a:has-text("Home"), button:has-text("Home"), [aria-label*="Home" i]');
    this.pageTitle = page.locator('h1, title');
  }

  async open() {
    await this.goto('https://localhost:8070/');
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async clickHomeButton() {
    await this.safeClick(this.homeButton);
  }

  async verifyURL(expectedURL: string): Promise<boolean> {
    const currentURL = this.page.url();
    return currentURL.includes(expectedURL);
  }
}
