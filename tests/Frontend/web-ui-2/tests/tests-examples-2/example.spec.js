import { test } from '@playwright/test';
import { HomePage } from '../../pages/web-app-2/HomePage';

test('has title', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.verifyTitle();
});

test('get started link', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickGetStarted();
  await homePage.verifyInstallationPage();
});

