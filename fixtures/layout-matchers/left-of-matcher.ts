import { expect as baseExpect } from "@playwright/test";
import type { Locator } from "@playwright/test";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  async toBeLeftOf(
    referenceLocator: Locator,
    comparandLocator: Locator,
    options?: { timeout?: number },
  ) {
    const assertionName = "toBeLeftOf";
    let pass: boolean;
    let matcherResult: any;
    let referenceLeftOffset: number;
    let locatorLeftOffset: number;
    try {
      referenceLeftOffset = (await referenceLocator.boundingBox(options))
        ?.x as number;
      locatorLeftOffset = (await comparandLocator.boundingBox(options))
        ?.x as number;
      baseExpect(referenceLeftOffset).toBeLessThan(locatorLeftOffset);
      pass = true;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Locator1: ${referenceLocator}\n` +
          `Locator2: ${comparandLocator}\n` +
          `Expected: ${this.isNot ? "not" : ""}${this.utils.printExpected(referenceLeftOffset)}\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(locatorLeftOffset)}`
            : "")
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Locator1: ${referenceLocator}\n` +
          `Locator2: ${comparandLocator}\n` +
          `Expected: locator1(${this.utils.printExpected(referenceLeftOffset)})` +
          (matcherResult
            ? ` to be left of locator2(${this.utils.printReceived(locatorLeftOffset)})`
            : "");

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual,
    };
  },
});
