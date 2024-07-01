import { test, mergeExpects } from "@playwright/test";
import { expect as leftOfExpect } from "./left-of-matcher";
import { expect as aboveExpect } from "./above-matcher";

const expect = mergeExpects(leftOfExpect, aboveExpect);

export { test, expect };
