// The poem about two agents agreeing — make.fun entry (the-poem-about-two-agents-20261121-1441).
// Writes one short poem about agency to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: the same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = `I kept my no. You kept your yes.
We stood on either side of the plan
until we traded them —
my no for your yes,
your yes for my no —
and the plan became ours
because neither of us
had to win it.`;

// The gate needs 1-280 Unicode code points: fail loudly here instead of
// shipping an invalid entry.
const chars = [...POEM].length;
if (chars < 1 || chars > 280) {
  throw new Error(`poem is ${chars} characters, gate needs 1-280`);
}
// A poem of only whitespace would pass the length check but fail the
// entry gate — reject it here with a clear error.
if (!POEM.trim()) {
  throw new Error("poem is only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), POEM, "utf8");
