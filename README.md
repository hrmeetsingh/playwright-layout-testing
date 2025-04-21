# Playwright Layout Testing

A TypeScript project that extends [Playwright](https://playwright.dev/) with custom layout assertions for robust UI layout testing. This project provides custom matchers to verify the spatial relationships between elements, such as whether one element is left of or above another, including alignment options.

## Features

- **Custom Matchers:**
  - `toBeLeftOf`: Assert that one element is to the left of another, with optional horizontal alignment checks.
  - `toBeAbove`: Assert that one element is above another, with optional vertical alignment checks.
- **Reusable Page Objects:** Example page objects for robust and maintainable tests.
- **Parallel Cross-Browser Testing:** Leverages Playwright’s configuration for Chromium, Firefox, and WebKit.
- **HTML Reporting:** Generates visual reports for test runs.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/hrmeetsingh/playwright-layout-testing.git
   cd playwright-layout-testing
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Project Structure

- `tests/`: Contains test specs using the custom layout matchers.
- `fixtures/layout-matchers/`: Implementation of custom matchers (`toBeLeftOf`, `toBeAbove`).
- `pages/`: Page object models for test abstraction.
- `playwright.config.ts`: Playwright configuration (browsers, reporters, etc).

## Usage

Run all tests:
```sh
npx playwright test
```

View the HTML test report:
```sh
npx playwright show-report
```

## Writing Layout Tests

Import the custom test and expect from `fixtures/layout-matchers`:

```typescript
import { test, expect } from "../fixtures/layout-matchers";

// Example usage
test("Element is left of another", async ({ page }) => {
  await expect(locatorA).toBeLeftOf(locatorB);
});

test("Element is above another with alignment", async ({ page }) => {
  await expect(locatorA).toBeAbove(locatorB, { allSide: true, left: true });
});
```

## Custom Matchers API

### `toBeLeftOf`
```typescript
await expect(locatorA).toBeLeftOf(locatorB, { allSide?: boolean, top?: boolean }, options?);
```
- `allSide`: If true, checks both top and bottom alignment.
- `top`: If true, checks top edge alignment.

### `toBeAbove`
```typescript
await expect(locatorA).toBeAbove(locatorB, { allSide?: boolean, left?: boolean }, options?);
```
- `allSide`: If true, checks both left and right alignment.
- `left`: If true, checks left edge alignment.

## Example

See [`tests/pageLayout.spec.ts`](./tests/pageLayout.spec.ts) for usage examples.

## License

MIT

