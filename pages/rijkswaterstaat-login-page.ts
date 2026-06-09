import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class RijkswaterstattLoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    // Flexible selectors for common login patterns
    this.usernameInput = page.locator('input[name*="user" i], input[type="email"], input[placeholder*="username" i]').first();
    this.passwordInput = page.locator('input[name*="pass" i], input[type="password"]').first();
    this.loginButton = page.locator('button:has-text("Login"), button:has-text("Sign in"), button:has-text("Inloggen")');
  }

  async open() {
    await this.goto('https://localhost:8070/');
  }

  async login(username: string, password: string) {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.safeClick(this.loginButton);
    
    // Wait for navigation after login
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      // Check if login button is gone (indication of being logged in)
      const isLoginButtonVisible = await this.loginButton.isVisible({ timeout: 2000 }).catch(() => false);
      return !isLoginButtonVisible;
    } catch {
      return false;
    }
  }
}


