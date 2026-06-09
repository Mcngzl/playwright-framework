import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { UserFactory, TestUser } from '../utils/test-data';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.error');
  }

  async open() {
    await this.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string) {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.safeClick(this.loginButton);
  }

  async loginWithValidUser() {
    const user = UserFactory.validUser();
    await this.login(user.username, user.password);
  }

  async loginWithInvalidUser() {
    const user = UserFactory.invalidUser();
    await this.login(user.username, user.password);
  }

  async loginWithCustomUser(testUser: TestUser) {
    await this.login(testUser.username, testUser.password);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}