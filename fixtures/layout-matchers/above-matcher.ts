import { expect as baseExpect } from "@playwright/test";
import type { Locator } from "@playwright/test";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  async toBeAbove(
    referenceLocator: Locator,
    comparandLocator: Locator,
    options?: { timeout?: number },
  ) {
    const assertionName = "toBeAbove";
    let pass: boolean;
    let matcherResult: any;
    let referenceTopOffset: number;
    let locatorTopOffset: number;
    try {
      referenceTopOffset = (await referenceLocator.boundingBox(options))
        ?.y as number;
      locatorTopOffset = (await comparandLocator.boundingBox(options))
        ?.y as number;
      baseExpect(referenceTopOffset).toBeLessThan(locatorTopOffset);
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
          `Expected: '${this.isNot ? referenceLocator + "' to not be above '" + comparandLocator : ""}'\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(locatorTopOffset)}`
            : "")
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Locator1: ${referenceLocator}\n` +
          `Locator2: ${comparandLocator}\n` +
          `Expected: locator1(${this.utils.printExpected(referenceTopOffset)})` +
          (matcherResult
            ? ` to be vertically above locator2(${this.utils.printReceived(locatorTopOffset)})`
            : "");

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual,
    };
  },
});
