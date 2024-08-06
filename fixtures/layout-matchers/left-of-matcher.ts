import { expect as baseExpect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { BoundingBox } from "./types";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  async toBeLeftOf(
    referenceLocator: Locator,
    comparandLocator: Locator,
    horizontalAlignment?: {
      allSide: Boolean;
      top: Boolean;
    },
    options?: {
      timeout?: number;
    },
  ) {
    const assertionName = "toBeLeftOf";
    let pass: boolean;
    let matcherResult: any;
    let referenceBoundingBox: BoundingBox | null;
    let locatorBoundingBox: BoundingBox | null;
    try {
      referenceBoundingBox = await referenceLocator.boundingBox(options);
      locatorBoundingBox = await comparandLocator.boundingBox(options);

      baseExpect(referenceBoundingBox?.x).toBeLessThanOrEqual(
        locatorBoundingBox?.x as number,
      );
      if (horizontalAlignment?.allSide) {
        baseExpect(referenceBoundingBox?.x).toBeLessThanOrEqual(
          locatorBoundingBox?.x as number,
        );
        baseExpect(
          (referenceBoundingBox?.x as number) +
            (referenceBoundingBox?.height as number),
        ).toBeLessThanOrEqual(
          (locatorBoundingBox?.x as number) +
            (locatorBoundingBox?.height as number),
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
          `Expected: '${this.isNot ? referenceLocator + "' to not be left of '" + comparandLocator : ""}'\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(locatorBoundingBox?.x)}`
            : "")
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Locator1: ${referenceLocator}\n` +
          `Locator2: ${comparandLocator}\n` +
          `Expected: locator1(${this.utils.printExpected(referenceBoundingBox?.x)})` +
          (matcherResult
            ? ` to be left of locator2(${this.utils.printReceived(locatorBoundingBox?.x)})`
            : "");

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual,
    };
  },
});
