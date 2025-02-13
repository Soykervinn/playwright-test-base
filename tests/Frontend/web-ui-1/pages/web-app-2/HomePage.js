import { expect } from '@playwright/test';

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.heading = page.getByRole('heading', { name: 'Installation' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Playwright/);
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  async verifyInstallationPage() {
    await expect(this.heading).toBeVisible();
  }
}