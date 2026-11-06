#!/usr/bin/env node
// Checks every whole-document example in docs/ with `woc check`.
//
// A fenced block counts when its info string is `woc` or `woct` and either it starts with
// frontmatter (`---`) or names a file: ```woc file=edition.woct. Blocks from one page are written
// to one folder, so a page can show a theme and a document that loads it. Missing pictures are
// warnings (W050), not failures. Run `npm run build` first.
//
//   node docs/_meta/check-examples.mjs           # every page
//   node docs/_meta/check-examples.mjs -v        # print each check's output too

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../..", import.meta.url));
const docs = join(root, "docs");
const cli = join(root, "packages/cli/dist/cli.js");
const verbose = process.argv.includes("-v");

const pages = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? pages(p) : p.endsWith(".md") ? [p] : [];
  });

const out = mkdtempSync(join(tmpdir(), "woc-docs-"));
let checked = 0;
let failed = 0;

for (const page of pages(docs)) {
  const text = readFileSync(page, "utf8");
  const blocks = [...text.matchAll(/^```(woct?)([^\n]*)\n([\s\S]*?)^```/gm)];
  const files = [];
  blocks.forEach(([, lang, info, body], i) => {
    const named = /file=(\S+)/.exec(info)?.[1];
    if (!named && !body.startsWith("---\n")) return;
    const name = named ?? `example-${i + 1}.${lang}`;
    const dir = join(out, relative(docs, page).replace(/[/.]/g, "_"));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, name), body);
    if (name.endsWith(".woc")) files.push(join(dir, name));
  });
  for (const file of files) {
    checked++;
    try {
      const log = execFileSync("node", [cli, "check", file, "--public", join(file, "..")], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
      if (verbose) console.log(`ok   ${relative(root, page)} (${file.split("/").pop()})\n${log}`);
    } catch (e) {
      failed++;
      console.log(`FAIL ${relative(root, page)} (${file.split("/").pop()})\n${e.stdout ?? ""}${e.stderr ?? ""}`);
    }
  }
}

console.log(`${checked} examples checked, ${failed} failed.`);
process.exit(failed ? 1 : 0);
