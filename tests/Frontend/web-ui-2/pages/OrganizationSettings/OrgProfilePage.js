import { expect } from '@playwright/test';

export class OrgProfilePage {
  constructor(page) {
    this.page = page;

    this.orgSettingsHeader = page.getByRole('heading', { name: 'Organization Settings' });
    this.orgNameChange = page.locator("//input[@id='organization_name']");
    this.updateProfileBttn = page.getByRole('button', { name: 'Update Profile' });
    this.clickToUploadLogoApp = page.getByText('Click to upload').first();
    this.clicktoUploadFullLogoApp = page.getByText('Click to upload').nth(1);
    this.logoAppImg = page.locator(".avatar.avatar-image.avatar-3xl");
    this.removeImg = page.getByRole('button', { name: 'Remove' });
    this.brandColorTxt = page.getByLabel('Choose Brand Color').nth(1);
    this.brandColorSquare = page.locator('input[type="color"]');
    this.errorMssgFormatLogo = page.getByText('Avatar has an invalid content');
    this.errorMssgFormatFullLogo = page.getByText('Logo full has an invalid');
    this.errorMssgFormatColor = page.getByText('Brand color must be a valid');
  }

  async orgProfileHeader() {
    await expect(this.orgSettingsHeader).toHaveText("Organization Settings");
  }

  async changeOrgName() {
    await this.orgNameChange.clear();
    await this.orgNameChange.type("change Org");
  }

  async updateProfileClick() {
    await this.updateProfileBttn.click();
  }

  async uploadLogoAppImg() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clickToUploadLogoApp.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('data/images/Authorium.jpeg');
  }

  async assertImgLogoApp(){
    await expect(this.logoAppImg).toHaveAttribute('src', /Authorium\.jpeg$/);
  }

  async uploadFullLogoAppImg() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clicktoUploadFullLogoApp.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('data/images/Authorium.jpeg');
  }

  async removeImgClick(){
    await this.removeImg.click();
  }

  async changeBrandColor() {
    await this.brandColorTxt.clear();
    await this.brandColorTxt.fill("#79dcdc");
  }

  async brandColorSquareClick() {
    await this.brandColorSquare.click();
  }

  async setBrandColorViaPicker() {
    await this.page.evaluate(() => {
      const colorInput = document.querySelector('input[type="color"]');
      if (colorInput) {
          colorInput.value = '#8de3c8';
          colorInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  async uploadFullLogoAppWrongFormat() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clicktoUploadFullLogoApp.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('data/images/WrongFormat.json');
  }

  async uploadLogoAppWrongFormat() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clickToUploadLogoApp.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('data/images/WrongFormat.json');
  }

  async changeBrandColorWrongFormat() {
    await this.brandColorTxt.clear();
    await this.brandColorTxt.fill("#1234567890");
  }

  async errorMssgAssertLogo() {
    await expect(this.errorMssgFormatLogo).toBeVisible();
  }

  async errorMssgAssertFullLogo() {
    await expect(this.errorMssgFormatFullLogo).toBeVisible();
  }

  async errorMssgAssertColor() {
    await expect(this.errorMssgFormatColor).toBeVisible();
  }
}