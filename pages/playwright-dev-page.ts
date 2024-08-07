import { expect, type Locator, type Page } from "@playwright/test";

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly pomLink: Locator;
  readonly tocList: Locator;
  readonly writingTestsNavLink: Locator;
  readonly installationPageHeader: Locator;
  readonly supportedLanguagesNavLink: Locator;
  readonly gettingStartedNavLink: Locator;
  readonly installationNavSubLink: Locator;
  readonly breadcrumbGettingStartedLink: Locator;
  readonly breadcrumbInstallationLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator("a", { hasText: "Get started" });
    this.gettingStartedHeader = page.locator("h1", { hasText: "Installation" });
    this.writingTestsNavLink = page.getByRole("link", {
      name: "Writing tests",
      exact: true,
    });
    this.installationPageHeader = page.getByRole("heading", {
      name: "Installation",
    });
    this.supportedLanguagesNavLink = page.getByRole("link", {
      name: "Supported languages",
    });
    this.pomLink = page
      .locator("li", {
        hasText: "Guides",
      })
      .locator("a", {
        hasText: "Page Object Model",
      });
    this.tocList = page.locator("article div.markdown ul > li > a");
    this.gettingStartedNavLink = page.getByRole("button", {
      name: "Getting Started",
    });
    this.installationNavSubLink = page.getByRole("link", {
      name: "Installation",
    });
    this.breadcrumbGettingStartedLink = page
      .getByLabel("Breadcrumbs")
      .getByText("Getting Started");
    this.breadcrumbInstallationLink = page
      .getByLabel("Breadcrumbs")
      .getByText("Installation");
  }

  async goto() {
    await this.page.goto("https://playwright.dev");
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
}
