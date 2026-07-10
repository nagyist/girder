import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 4 : (isFinite(process.env.PLAYWRIGHT_RETRIES) && parseInt(process.env.PLAYWRIGHT_RETRIES) || 0),
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : (isFinite(process.env.PLAYWRIGHT_WORKERS) && parseInt(process.env.PLAYWRIGHT_WORKERS) || undefined),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', {
      open: 'never'
    }]
  ],
  reporterOpenTimeout: 0,

  globalSetup: "./tests/playwright-setup.ts",

  globalTeardown: "./tests/playwright-teardown.ts",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 30000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Only on CI systems run the tests headless */
    // headless: !!process.env.CI
    headless: true,

    screenshot: 'only-on-failure',
  },

  /* Configure projects for Firefox and Chrome only */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  webServer: {
    command: 'npx vite dev --port 5173',
    port: 5173,
    reuseExistingServer: false
  },
});
