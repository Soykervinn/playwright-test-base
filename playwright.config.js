// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: './tests', // Buscará en todas las subcarpetas dentro de `tests`
  timeout: 30000, // 30 segundos de timeout por test
  retries: 2, // Reintenta fallos automáticamente
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    // 🔹 FRONTEND - Múltiples Web Apps
    {
      name: 'web-ui-1',
      testDir: './tests/Frontend/web-ui-1/tests',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        screenshot: 'on',
        video: 'on',
        trace: 'on',
      },
    },
    {
      name: 'web-ui-2',
      testDir: './tests/Frontend/web-ui-2/tests',
      use: {
        ...devices['Desktop Firefox'],
        headless: false,
        screenshot: 'on',
        video: 'on',
        trace: 'on',
      },
    },

    // 🔹 BACKEND - Múltiples APIs
    {
      name: 'backend-service-1',
      testDir: './tests/Backend/backend-service-1/tests'
      /*use: {
        baseURL: 'https://api1.example.com',
        extraHTTPHeaders: {
          'Authorization': 'Bearer token-api-1'
        }
      },*/
    },
    {
      name: 'backend-service-2',
      testDir: './tests/Backend/backend-service-2/tests'
       /* use: {
        baseURL: 'https://api2.example.com',
        extraHTTPHeaders: {
          'Authorization': 'Bearer token-api-2'
        }
        },*/
    },

    // 🔹 Navegadores independientes
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
     /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});