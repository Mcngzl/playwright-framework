import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardPage extends BasePage {
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.flashMessage = page.locator('#flash');
  }

  async open() {
    await this.goto('https://the-internet.herokuapp.com/secure');
  }
}