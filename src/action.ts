import * as core from "npm:@actions/core";

function getInputs() {
  return {
    timestamp: core.getInput("timestamp", { required: true }),
  };
}

// deno-lint-ignore require-await
async function run() {
  const { timestamp } = getInputs();

  const outputText = `Timestamp is ${timestamp}`;

  core.info(`Setting up output to:\n${outputText}`);

  core.setOutput("text", outputText);
}

try {
  await run();
} catch (error) {
  core.debug(error.stack);
  core.setFailed(error.message);
  Deno.exit(1);
}
