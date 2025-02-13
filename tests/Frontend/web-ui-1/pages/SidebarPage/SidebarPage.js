import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class SidebarPage {
  constructor(page) {
    this.page = page;

    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.updateBttn = page.getByRole("button", { name: "Update Profile" });
    this.updateToast = page.locator("#flash-messages div").nth(1);
    this.errorEmptyFirstName = page.locator('xpath=(//p[normalize-space()="First name can\'t be blank"])[1]');
    this.errorEemptyLastName = page.locator('xpath=(//p[normalize-space()="Last name can\'t be blank"])[1]');
    this.jobTitle = page.getByPlaceholder("Job Title");
  }

  async writeFirstName() {
    await this.firstName.fill("");
    await this.firstName.fill(faker.person.firstName());
  }

  async writeLastName() {
    await this.lastName.fill("");
    await this.lastName.fill(faker.person.lastName());
  }

  async updateClick() {
    await this.updateBttn.click();
  }

  async updateToastVisibility() {
    await expect(this.updateToast).toBeVisible();
  }

  async emptyName() {
    await expect(this.errorEmptyFirstName).toHaveText("First name can't be blank");
    await expect(this.errorEemptyLastName).toHaveText("Last name can't be blank");
  }

  async writeEmptyFirstLastName() {
    await this.lastName.fill("");
    await this.firstName.fill("");
  }

  async writeJobTitle() {
    await this.jobTitle.fill("");
    await this.jobTitle.fill(faker.word.words());
  }
}
