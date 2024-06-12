import * as core from "npm:@actions/core@1.10.1";
import { $ } from "npm:zx@8.1.2";
import { DefaultArtifactClient } from "npm:@actions/artifact@2.1.7";

export function getInputs() {
  return {
    timestamp: core.getInput("timestamp", { required: true }),
  };
}

export function setOutput(name: string, value: string) {
  core.setOutput(name, value);
}

export async function uploadArtifact(
  name: string,
  filesList: string[],
  retentionDays = 1,
) {
  const artifact = new DefaultArtifactClient();
  const { id, size } = await artifact.uploadArtifact(
    name,
    filesList,
    ".",
    {
      retentionDays,
    },
  );

  return { id, size };
}

export async function run() {
  const { timestamp } = _internals.getInputs();

  const outputText = `Timestamp is ${timestamp}`;

  core.info(`Setting up output to:\n${outputText}`);

  _internals.setOutput("text", outputText);

  //TODO This produces error: error: Uncaught (in promise) Error: Unable to access summary file: '/github/file_commands/step_summary_60570fc5-b29a-41cd-9f56-8536f025656a'. Check if the file has correct read/write permissions.
  //await core.summary.addRaw(`Action output text: \`${outputText}\``).write()
  //TODO prints one extra $ like Output text is: $Timestamp is 1717453929
  await $`echo Output text is: ${outputText} >> $GITHUB_STEP_SUMMARY`;

  //TODO Add creating output file that wil be later added to artefact
  await Deno.writeTextFile("./output.txt", outputText);

  const { id, size } = await _internals.uploadArtifact("action-output", [
    "./output.txt",
  ]);

  console.log(`Created artifact with id: ${id} (bytes: ${size}`);
}

/** Used for testing. Taken from official deno docs https://docs.deno.com/runtime/manual/basics/testing/mocking#spying */
export const _internals = { getInputs, setOutput, uploadArtifact };
