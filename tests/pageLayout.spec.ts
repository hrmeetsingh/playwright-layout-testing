import { test, expect } from "../fixtures/layout-matchers";

test("Page layout test - element left of other element", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Get started" }).click();
  const writingTestsNavLink = page.getByRole("link", {
    name: "Writing tests",
    exact: true,
  });
  const installationPageHeader = page.getByRole("heading", {
    name: "Installation",
  });

  // nav link is horizontally left of the page header
  await expect(writingTestsNavLink).toBeLeftOf(installationPageHeader);
});

test("Page layout test - element above other element", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Get started" }).click();
  const writingTestsNavLink = page.getByRole("link", {
    name: "Writing tests",
    exact: true,
  });
  const supportedLanguagesNavLink = page.getByRole("link", {
    name: "Supported languages",
  });

  // nav links are vertically positioned
  await expect(writingTestsNavLink).toBeAbove(supportedLanguagesNavLink);
});
