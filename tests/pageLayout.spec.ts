import { Page } from "@playwright/test";
import { test, expect } from "../fixtures/layout-matchers";
import { PlaywrightDevPage } from "../pages/playwright-dev-page";

let playwrightDev: PlaywrightDevPage;

test.beforeEach(async ({ page }) => {
  playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
});

test("Page layout test - element left of other element", async ({ page }) => {
  // nav link is horizontally left of the page header
  await expect(playwrightDev.writingTestsNavLink).toBeLeftOf(
    playwrightDev.installationPageHeader,
  );
});

test("Page layout test - element above other element", async ({ page }) => {
  // nav links are vertically positioned
  await expect(playwrightDev.writingTestsNavLink).toBeAbove(
    playwrightDev.supportedLanguagesNavLink,
  );
});

test("Page layout test - element above other element and left vertical aligned", async ({
  page,
}) => {
  // nav links are vertically positioned and left edges vertically aligned
  await expect(playwrightDev.installationNavSubLink).toBeAbove(
    playwrightDev.writingTestsNavLink,
    {
      allSide: true,
      left: true,
    },
  );
});

test("Page layout test - element left of other element and horizontally aligned", async ({
  page,
}) => {
  // nav links are horizontally positioned and top edges horizontally aligned
  await expect(playwrightDev.breadcrumbGettingStartedLink).toBeLeftOf(
    playwrightDev.breadcrumbInstallationLink,
    {
      allSide: true,
      top: true,
    },
  );
});
