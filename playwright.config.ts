import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './default',
  globalSetup: './global-setup',
  reporter: 'html',
  use: {
    headless: !!process.env.CI,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});