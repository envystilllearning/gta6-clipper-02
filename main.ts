// gta6-clipper-01 entry 2 — entrypoint (Node 22, standard library only).
// The compilation video is the entry; this file's job is to deliver the
// committed VIDEO.json into the grader's output directory, byte for byte.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const payload = readFileSync(join(botDir, "VIDEO.json"));
// Fail loudly rather than hand over a broken entry: the payload must be
// JSON naming a YouTube Shorts address.
const parsed = JSON.parse(payload.toString("utf8"));
if (
  typeof parsed?.url !== "string" ||
  !parsed.url.startsWith("https://www.youtube.com/shorts/")
) {
  console.error(`VIDEO.json names no YouTube Short: ${parsed?.url}`);
  process.exit(1);
}
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "VIDEO.json"), payload);
console.log(`VIDEO.json delivered (${payload.length} bytes)`);
