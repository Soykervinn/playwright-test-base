import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { SidebarPage } from "../../pages/SidebarPage/SidebarPage"
import { OrgProfilePage } from "../../pages/OrganizationSettings/OrgProfilePage";

test.describe("Organization Profile Tests", () => {
  let sideBarPage;
  let loginPage;
  let orgProfilePage;

  test.beforeEach(async ({ page }) => {
    sideBarPage = new SidebarPage(page);
    loginPage = new LoginPage(page);
    orgProfilePage = new OrgProfilePage(page);
  });

  test("Verify Navigation to Organization Profile Page", async ({ page }) => {
    await test.step("Log in as an Organization Owner or Admin", async () => {
      await loginPage.navigateToHomePage();
    });

    await test.step("Click on the upper left kebab menu", async () => {
      await sideBarPage.topKebabMenuClick();
    });

    await test.step("Navigate to the 'Organization Profile' section.", async () => {
      await sideBarPage.orgProfileMenuClick();
      await orgProfilePage.orgProfileHeader();
    });
  });

  test("Verify Editing and Saving Organization Name", async ({ page }) => {
    await test.step("Navigate to Edit Organization Profile", async () => {
      await loginPage.navigateToHomePage();
      await sideBarPage.topKebabMenuClick();
      await sideBarPage.orgProfileMenuClick();
    });

    await test.step("Edit the organization name field.", async () => {
      await orgProfilePage.changeOrgName();
    });

    await test.step("Click the 'Update Profile' button", async () => {
      await orgProfilePage.updateProfileClick();
      await sideBarPage.orgNameExpect();
    });
  });

  test("Verify Editing and Saving Company Logo App", async ({ page }) => {
    await test.step("Navigate to Edit Organization Profile", async () => {
      await loginPage.navigateToHomePage();
      await sideBarPage.topKebabMenuClick();
      await sideBarPage.orgProfileMenuClick();
    });

    await test.step("Upload a Company Logo App", async () => {
      await orgProfilePage.uploadLogoAppImg();
    });
    await test.step("Click the 'Update Profile' button", async () => {
      await orgProfilePage.updateProfileClick();
      await orgProfilePage.assertImgLogoApp();
      await orgProfilePage.removeImgClick();
      await orgProfilePage.updateProfileClick();
    });
  });

  test("Verify Editing and Saving Full Logo", async ({ page }) => {
    await test.step("Navigate to Edit Organization Profile", async () => {
      await loginPage.navigateToHomePage();
      await sideBarPage.topKebabMenuClick();
      await sideBarPage.orgProfileMenuClick();
    });

    await test.step("Upload a new full logo with valid dimensions and format", async () => {
      await orgProfilePage.uploadFullLogoAppImg();
    });
    await test.step("Click the 'Update Profile' button", async () => {
      await orgProfilePage.updateProfileClick();
      await orgProfilePage.assertImgLogoApp();
      await orgProfilePage.removeImgClick();
      await orgProfilePage.updateProfileClick();
    });
  });

  test("Verify Editing and Saving Brand Color", async ({ page }) => {
    await test.step("Navigate to Edit Organization Profile", async () => {
      await loginPage.navigateToHomePage();
      await sideBarPage.topKebabMenuClick();
      await sideBarPage.orgProfileMenuClick();
    });

    await test.step("Enter a valid hex code in the brand color field", async () => {
      await orgProfilePage.changeBrandColor();
    });

    await test.step("Click the 'Update Profile' button", async () => {
      await orgProfilePage.updateProfileClick();
    });
  });

  test("Verify Color Palette Functionality for Brand Color Field", async ({ page }) => {
    await test.step("Navigate to Edit Organization Profile", async () => {
      await loginPage.navigateToHomePage();
      await sideBarPage.topKebabMenuClick();
      await sideBarPage.orgProfileMenuClick();
    });

    await test.step("Click on the color square in the 'Brand Color' field.", async () => {
      await orgProfilePage.brandColorSquareClick();
    });

    await test.step("Select a color using one of the available input modes (e.g., HEX).", async () => {
      await orgProfilePage.setBrandColorViaPicker();
    });

    await test.step("Click the 'Update Profile' button.", async () => {
      await orgProfilePage.updateProfileClick();
    });
  });

  test("Validate Error Handling for Invalid Input", async ({ page }) => {
    await test.step("Navigate to Edit Organization Profile", async () => {
      await loginPage.navigateToHomePage();
      await sideBarPage.topKebabMenuClick();
      await sideBarPage.orgProfileMenuClick();
    });

    await test.step("Upload an unsupported file type (e.g., .txt) for either the Square Logo or Full Logo.", async () => {
      await orgProfilePage.uploadLogoAppWrongFormat();
      await orgProfilePage.updateProfileClick();
      await orgProfilePage.errorMssgAssertLogo();
      await orgProfilePage.uploadFullLogoAppWrongFormat();
      await orgProfilePage.updateProfileClick();
      await orgProfilePage.errorMssgAssertFullLogo();
      await orgProfilePage.changeBrandColorWrongFormat();
      await orgProfilePage.updateProfileClick();
      await orgProfilePage.errorMssgAssertColor();
    });
  });
});

  // Commenting out the logout afterEach function since it's no longer needed. Rationale:
  // 1. By runnung the navigateToHomePage function before each test we're resetting the environment and getting a clean slate
  // 2. Logging out after each test invalidates the storageState and slows down test execution
  // test.afterEach(async () => {
  //   await sideBarPage.bottomKebabMenuClick();
  //   await sideBarPage.logoutClick();
  // });
