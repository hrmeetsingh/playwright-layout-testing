import { expect as baseExpect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { BoundingBox } from "./types";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  async toBeAbove(
    referenceLocator: Locator,
    comparandLocator: Locator,
    verticalAlignment?: {
      allSide: Boolean;
      left: Boolean;
    },
    options?: {
      timeout?: number;
    },
  ) {
    const assertionName = "toBeAbove";
    let pass: boolean;
    let matcherResult: any;
    let referenceBoundingBox: BoundingBox | null;
    let locatorBoundingBox: BoundingBox | null;
    try {
      referenceBoundingBox = await referenceLocator.boundingBox(options);
      locatorBoundingBox = await comparandLocator.boundingBox(options);

      baseExpect(referenceBoundingBox?.y).toBeLessThan(
        locatorBoundingBox?.y as number,
      );
      if (verticalAlignment?.allSide) {
        baseExpect(referenceBoundingBox?.y).toBeLessThanOrEqual(
          locatorBoundingBox?.y as number,
        );
        baseExpect(
          (referenceBoundingBox?.y as number) +
            (referenceBoundingBox?.width as number),
        ).toBeLessThanOrEqual(
          (locatorBoundingBox?.y as number) +
            (locatorBoundingBox?.width as number),
        );
      }

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
            ? `Received: ${this.utils.printReceived(locatorBoundingBox?.y)}`
            : "")
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Locator1: ${referenceLocator}\n` +
          `Locator2: ${comparandLocator}\n` +
          `Expected: locator1(${this.utils.printExpected(referenceBoundingBox?.y)})` +
          (matcherResult
            ? ` to be vertically above locator2(${this.utils.printReceived(locatorBoundingBox?.y)})`
            : "");

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual,
    };
  },
});
