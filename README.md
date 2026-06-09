# 🎭 Playwright Framework

A modern, enterprise-grade end-to-end testing framework built with **Playwright** and **TypeScript**.

## ✨ Features

- ✅ **Page Object Model (POM)** - Reusable, maintainable page objects
- ✅ **Multi-browser Testing** - Chromium, Firefox, Webkit
- ✅ **Enhanced Error Handling** - Screenshots, videos, traces on failure
- ✅ **Unified Fixtures** - Consolidated, extensible test fixtures
- ✅ **Test Data Factory** - UserFactory for flexible test data
- ✅ **Utilities Library** - Wait helpers, page utils, retry logic
- ✅ **Environment Configuration** - .env support for credentials
- ✅ **Global Setup** - Pre-authentication for secure tests
- ✅ **Multiple Reporters** - HTML, JSON, JUnit reports

## 🚀 Quick Start

### Installation
```bash
npm install
cp .env.example .env
```

### Configure Environment
Edit `.env` with your credentials:
```env
TEST_USERNAME=tomsmith
TEST_PASSWORD=SuperSecretPassword!
BASE_URL=https://the-internet.herokuapp.com
```

### Run Tests
```bash
# All tests (all browsers)
npm test

# Specific browser
npx playwright test --project=chromium

# Watch mode
npx playwright test --watch

# With UI
npx playwright test --ui
```

## 📂 Project Structure

```
playwright-framework/
├── config.ts              # Configuration with env validation
├── global-setup.ts        # Pre-test authentication
├── playwright.config.ts   # Playwright configuration
├── .env.example           # Environment template
├── .env                   # Local environment (git-ignored)
│
├── default/              # Test specs
│   ├── login.spec.ts
│   └── normalexp.spec.ts
│
├── pages/               # Page Object Models
│   ├── base-page.ts
│   ├── login-page.ts
│   └── dashboard-page.ts
│
├── fixtures/            # Test fixtures
│   ├── test.ts          # Unified fixtures (all-in-one)
│   ├── base-test.ts     # ⚠️ Deprecated (use test.ts)
│   └── auth-test.ts     # ⚠️ Deprecated (use test.ts)
│
└── utils/              # Utilities library
    ├── test-data.ts    # UserFactory
    └── waits.ts        # Wait & page helpers
```

## 🔧 Usage Examples

### Using Test Fixtures
```typescript
import { test, expect } from '../fixtures/test';

// Use page objects
test('login test', async ({ loginPage, dashboardPage }) => {
  await loginPage.open();
  await loginPage.loginWithValidUser();
  await dashboardPage.open();
});

// Use authenticated page
test('secure area', async ({ authPage }) => {
  await authPage.goto('https://the-internet.herokuapp.com/secure');
});
```

### Using UserFactory
```typescript
import { UserFactory } from '../utils/test-data';

test('valid login', async ({ loginPage }) => {
  const user = UserFactory.validUser();
  await loginPage.login(user.username, user.password);
});

test('invalid login', async ({ loginPage }) => {
  const user = UserFactory.invalidUser();
  await loginPage.login(user.username, user.password);
});
```

### Using Wait Utilities
```typescript
import { WaitUtils } from '../utils/waits';

test('wait for element', async ({ page }) => {
  const element = await WaitUtils.waitForElement(page, '[data-test="id"]', 5000);
  
  // Or with retry
  const result = await WaitUtils.retry(
    () => page.locator('button').click(),
    3,  // max retries
    1000 // delay ms
  );
});
```

## 📊 Test Reports

After running tests:
- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/junit.xml`

## 🐛 Debugging

### View Video on Failure
```bash
npx playwright show-trace test-results/trace.zip
```

### Debug Mode
```bash
npx playwright test --debug
```

### UI Mode
```bash
npx playwright test --ui
```

## 🔐 Security

- ✅ Credentials stored in `.env` (git-ignored)
- ✅ Environment validation at startup
- ✅ No hardcoded secrets in code
- ✅ Config validation ensures required vars exist

## 📝 Best Practices

1. **Use UserFactory** for test data instead of hardcoding
2. **Use Page Objects** for UI interactions
3. **Use WaitUtils** for reliable waits instead of hardcoded sleeps
4. **Use fixtures** for common setup/teardown
5. **Use retry logic** for flaky interactions

## 🤝 Contributing

When adding new tests:
1. Create page objects in `/pages`
2. Add test data to `UserFactory`
3. Use unified fixtures from `fixtures/test.ts`
4. Add utilities to `utils/` if reusable
5. Run `npm test` to validate

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)

---

**Made with 🎭 Playwright & ❤️**
