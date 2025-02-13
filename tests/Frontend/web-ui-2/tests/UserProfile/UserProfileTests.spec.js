import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { SidebarPage } from "../../pages/SidebarPage/SidebarPage"
import { OrgProfilePage } from "../../pages/OrganizationSettings/OrgProfilePage";

test.describe("User Profile Tests", () => { 
  let sideBarPage;
  let loginPage;
  let userProfile;

  test.beforeEach(async ({ page }) => {
    sideBarPage = new SidebarPage(page);
    loginPage = new LoginPage(page);
    userProfile = new UserProfilePage(page);
  });

  test("Profile User name update", async ({ page }) => {
    await test.step("Log in with a valid user", async () => {
      await loginPage.navigateToHomePage();
    });

    await test.step("Navigate to Profile Settings:", async () => {
      await sideBarPage.bottomKebabMenuClick();
      await sideBarPage.profileBttnClick();
    });

    await test.step("Update First and Last Name field", async () => {
      await userProfile.writeFirstName();
      await userProfile.writeLirstName();
      await userProfile.updateClick();
      await userProfile.updateToastVisibility();
    });
  });

  test("Profile name and last name empty entry", async ({ page }) => {
    await test.step("Log in with a valid user", async () => {
      await loginPage.navigateToHomePage();
    });

    await test.step("Navigate to Profile Settings:", async () => {
      await sideBarPage.bottomKebabMenuClick();
      await sideBarPage.profileBttnClick();
    });

    await test.step("Update First and Last Name field leaving an empty entry", async () => {
      await userProfile.writeEmptyFirstLastName();
      await userProfile.updateClick();
      await userProfile.updateToastVisibility();
    });

    await test.step("check error messages", async () => {
      await userProfile.emptyName();
    });
  });

  test("Verify Updating the @Job Title in Profile Settings", async ({ page }) => {
    await test.step("Log in with a valid user", async () => {
      await loginPage.navigateToHomePage();
    });

    await test.step("Navigate to Profile Settings:", async () => {
      await sideBarPage.bottomKebabMenuClick();
      await sideBarPage.profileBttnClick();
    });

    await test.step("Update Job Title:", async () => {
      await userProfile.writeJobTitle();
      await userProfile.updateClick();
    });

    await test.step("Verify Success Message:", async () => {
      await userProfile.updateToastVisibility();
    });
  });
});