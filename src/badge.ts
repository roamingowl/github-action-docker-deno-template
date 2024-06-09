import { generateBadge } from "npm:lcov-badge2";

const badge = await generateBadge("coverage.lcov", "coverage");
const encoder = new TextEncoder();
const data = encoder.encode(badge);
Deno.writeFileSync("coverage.svg", data);
