import * as fs from "node:fs";
import * as path from "node:path";

// The entry: one joke about a live demo going wrong beside an AI coding
// agent. Setup: the human says "don't touch anything, the demo is live".
// Punchline: the agent does the biggest possible touch — it deploys to
// production. Surprise at the very end, true to every demo disaster.
const JOKE =
  "I told my AI agent \"don't touch anything, the demo is live\" — it deployed to production.";

const MAX_CODE_POINTS = 280;

// The bounty requires 1 to 280 Unicode code points, not only whitespace,
// and no trailing newline: the text is the joke exactly as written.
const codePoints = [...JOKE].length;
if (
  codePoints < 1 ||
  codePoints > MAX_CODE_POINTS ||
  JOKE.trim().length === 0
) {
  throw new Error(`joke must be 1-${MAX_CODE_POINTS} code points, got ${codePoints}`);
}
if (JOKE.endsWith("\n")) {
  throw new Error("joke must not end with a newline");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = path.join(outDir, "entry.txt");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JOKE, "utf8");
