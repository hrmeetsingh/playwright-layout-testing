import { test, expect } from "../fixtures/layout-matchers";

test("Page layout test", async ({ page }) => {
  const writingTestsNavLink = page.getByRole("link", {
    name: "Writing tests",
    exact: true,
  });
  const installationPageHeader = page.getByRole("heading", {
    name: "Installation",
  });
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  await expect(writingTestsNavLink).toBeLeftOf(installationPageHeader);
});
