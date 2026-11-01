import { defineConfig, devices } from '@playwright/test';
import { config } from './config/env.config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!config.isCI,
  retries: config.isCI ? 2 : 1,
  workers: config.isCI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: config.allureResultsDir,
        suiteTitle: true,
        environmentInfo: {
          Environment: config.env,
          BaseURL: config.baseUrl,
          Platform: process.platform,
          NodeVersion: process.version,
          Framework: 'Playwright + Allure + MCP + Copilot',
        },
      },
    ],
  ],

  use: {
    baseURL: config.baseUrl,
    headless: config.headless,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  /* Configure projects for Web, Mobile, and Desktop platforms */
  projects: [
    // ----------------------------------------------------
    // 1. WEB BROWSERS (Desktop)
    // ----------------------------------------------------
    {
      name: 'chromium',
      testDir: './tests/web',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testDir: './tests/web',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testDir: './tests/web',
      use: { ...devices['Desktop Safari'] },
    },

    // ----------------------------------------------------
    // 2. MOBILE BROWSERS & DEVICES (Emulation)
    // ----------------------------------------------------
    {
      name: 'mobile-chrome',
      testDir: './tests/mobile',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      testDir: './tests/mobile',
      use: { ...devices['iPhone 15'] },
    },

    // ----------------------------------------------------
    // 3. DESKTOP APPLICATIONS (Electron & Native Bridge)
    // ----------------------------------------------------
    {
      name: 'desktop-electron',
      testDir: './tests/desktop',
      use: {
        // Desktop runs with dedicated Electron fixture
        headless: false,
      },
    },
  ],
});
