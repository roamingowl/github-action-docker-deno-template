//TODO see https://github.com/denoland/dnt
// ex. scripts/build_npm.ts
import { build, emptyDir } from "jsr:@deno/dnt";

await emptyDir("./dist");

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./dist",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  scriptModule: false,
  declaration: false,
  package: {
    // package.json properties
    name: "your-package",
    version: Deno.args[0],
    description: "Your package.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/username/repo.git",
    },
    bugs: {
      url: "https://github.com/username/repo/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    // Deno.copyFileSync("README.md", "dist/README.md");
  },
});
