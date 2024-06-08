# GitHub docker container deno action

![Action coverage](coverage.svg)

This is a template for
[docker container](https://docs.github.com/en/actions/creating-actions/about-custom-actions)
deno action.

## Run as JS action

```bash
deno run -A src/to-node.ts
cd dist
npx esbuild src/index.ts --bundle --platform=node --target=node20 --outfile=index.js
```

and change action.yaml to use `runs: node dist/index.js` instead of `runs: deno dist/index.ts`:
```yaml
---
name: GitHub docker container deno action template
description: A template for containerized GitHub Actions with Deno
inputs:
  timestamp:
    description: Current timestamp
    required: true

runs: 
  using: node20
  main: 'dist/index.js'  

```