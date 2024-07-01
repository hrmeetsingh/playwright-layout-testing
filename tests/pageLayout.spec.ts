import { test, expect } from "../fixtures/layout-matchers";
import { PlaywrightDevPage } from "../pages/playwright-dev-page";

test("Page layout test - element left of other element", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();

  // nav link is horizontally left of the page header
  await expect(playwrightDev.writingTestsNavLink).toBeLeftOf(
    playwrightDev.installationPageHeader,
  );
});

test("Page layout test - element above other element", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();

  // nav links are vertically positioned
  await expect(playwrightDev.writingTestsNavLink).toBeAbove(
    playwrightDev.supportedLanguagesNavLink,
  );
});
