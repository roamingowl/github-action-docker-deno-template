import { describe, it } from "jsr:@std/testing/bdd";
import {
  assertSpyCall,
  assertSpyCalls,
  returnsNext,
  spy,
  stub,
} from "jsr:@std/testing@0.225.0/mock";
import { _internals, run } from "../action.ts";

describe("action", () => {
  it("should set output", async () => {
    const outputSpy = spy(_internals, "setOutput");
    stub(_internals, "getInputs", returnsNext([{ timestamp: "1239" }]));
    // stub(
    //   _internals,
    //   "uploadArtifact",
    //   returnsNext([Promise.resolve({ id: 1, size: 2 })]),
    // );

    await run();
    assertSpyCall(outputSpy, 0, { args: ["text", "Timestamp is 1239"] });
    assertSpyCalls(outputSpy, 1);
  });
});
