import * as core from "npm:@actions/core@1.10.1";

export function getInputs() {
  return {
    timestamp: core.getInput("timestamp", { required: true }),
  };
}

export function setOutput(name: string, value: string) {
  core.setOutput(name, value);
}

// deno-lint-ignore require-await
export async function run() {
  const { timestamp } = _internals.getInputs();

  const outputText = `Timestamp is ${timestamp}`;

  core.info(`Setting up output to:\n${outputText}`);

  _internals.setOutput("text", outputText);
}

/** Used for testing. Taken from official deno docs https://docs.deno.com/runtime/manual/basics/testing/mocking#spying */
export const _internals = { getInputs, setOutput };
