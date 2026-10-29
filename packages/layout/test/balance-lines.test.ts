/**
 * Balancing by lines (§09.4): on a frame's last page the columns are filled as on any page, and the
 * smallest height that holds all the text wins. A paragraph may split across columns, but never
 * leaves fewer lines than its widows and orphans at either side; pictures and boxes stay whole.
 * Paragraphs here are the same text, so all of them are the same height.
 */
import { describe, expect, it } from "vitest";
import { parse, type Document } from "@wocument/parser";
import { resolve } from "@wocument/resolver";
import { PrepareCache, createFixedEngine } from "@wocument/text-engine";
import { layout } from "../src/index.js";
import { layoutInvariants } from "./invariants.js";

const FM = "---\nwocument: 1\ntitle: T\n---\n";
const PARA = "Stone endures where nearly everything else decays, and the keepers wrote it down every night.";
const WORDS = PARA.split(" ");

/** A paragraph of `n` words, so paragraphs of every length can be set. */
const para = (n: number, seed: number): string => Array.from({ length: n }, (_, i) => WORDS[(i + seed) % WORDS.length]).join(" ") + ".";

function lay(story: string, columns: number, width = 1440, balance = true) {
  const { doc } = resolve(parse(`${FM}\\story[name=s]{${story}}\n\\scene{\\frame[story=s, cols=1-12, columns=${columns}, balance=${balance}]}`).ast as Document);
  const pd = layout(doc, { width, height: 900 }, new PrepareCache(createFixedEngine()));
  layoutInvariants(doc, pd);
  return pd.scenes[0]!.lines.filter((l) => l.story === "s");
}

/** Lines in each column, and for every paragraph the lines it holds in each column it touches. */
function shape(lines: ReturnType<typeof lay>, columns: number) {
  const per = Array.from({ length: columns }, (_, c) => lines.filter((l) => l.column === c).length);
  const parts = [...new Set(lines.map((l) => l.block))].map((b) => [...new Set(lines.filter((l) => l.block === b).map((l) => l.column))].sort().map((c) => lines.filter((l) => l.block === b && l.column === c).length));
  return { per, parts };
}

describe("balancing by lines", () => {
  it.each([
    [1, 1],
    [2, 2],
    [3, 2],
    [3, 3],
    [4, 3],
    [8, 3],
  ])("%i paragraphs in %i columns end within two lines of each other and lose no line", (paragraphs, columns) => {
    const text = Array.from({ length: paragraphs }, (_, i) => para(40 + 11 * i, i)).join("\n\n");
    const { per } = shape(lay(text, columns), columns);
    const plain = shape(lay(text, columns, 1440, false), columns);
    expect(per.reduce((a, b) => a + b, 0)).toBe(plain.per.reduce((a, b) => a + b, 0));
    const used = per.filter((n) => n > 0);
    expect(Math.max(...used) - Math.min(...used)).toBeLessThanOrEqual(2);
    expect(per.slice(0, used.length).every((n) => n > 0)).toBe(true); // from column 1, none skipped
  });

  it("never leaves a single line of a split paragraph at the foot of a column or the top of the next", () => {
    for (const width of [1440, 1100, 900]) {
      for (let n = 20; n <= 90; n += 7) {
        const text = [para(n, 0), para(n + 13, 3), para(n * 2, 5), para(n - 9, 1)].join("\n\n");
        const { parts } = shape(lay(text, 3, width), 3);
        for (const p of parts) if (p.length > 1) for (const k of p) expect(k, `width ${width}, ${n} words`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("does not split a paragraph of three lines or fewer (a line alone would break widows and orphans)", () => {
    let short = 0;
    for (let n = 2; n <= 40; n += 2) {
      const text = para(n, 0);
      if (shape(lay(text, 3, 1440, false), 3).per.reduce((a, b) => a + b, 0) > 3) continue;
      short++;
      expect(shape(lay(text, 3), 3).parts.every((p) => p.length === 1), `${n} words`).toBe(true);
    }
    expect(short).toBeGreaterThan(0);
  });

  it("keeps a subhead with the paragraph after it", () => {
    const story = [PARA, PARA, "\\subhead{The keepers}", PARA].join("\n\n");
    const lines = lay(story, 2);
    const colOf = (style: string) => lines.find((l) => l.style === style)!.column;
    expect(colOf("subhead")).toBe(lines.at(-1)!.column);
  });
});

describe("a page scene's last page", () => {
  it("fills earlier pages to the foot and balances the last page by lines", () => {
    const LONG = Array.from({ length: 30 }, () => PARA.repeat(2)).join("\n\n");
    const GRID = "\\grid[name=page, cols=12, gutter=24px, margin-x=48px, margin-y=2bl, baseline=28px, body=1-12]\n";
    const { doc } = resolve(parse(`${FM}${GRID}\\story[name=s]{${LONG}}\n\\scene[height=page, grid=page]{\\frame[story=s, cols=1-12, columns=3]}`).ast as Document);
    const pd = layout(doc, { width: 1280, height: 800 }, new PrepareCache(createFixedEngine()));
    layoutInvariants(doc, pd);
    const s = pd.scenes[0]!;
    const pages = s.height / 800;
    expect(pages).toBeGreaterThan(1);
    const last = s.lines.filter((l) => Math.floor(l.y / 800) === pages - 1);
    const cols = [...new Set(last.map((l) => l.column))].sort();
    const feet = cols.map((c) => Math.max(...last.filter((l) => l.column === c).map((l) => l.y + l.height)));
    expect(Math.max(...feet) - Math.min(...feet)).toBeLessThanOrEqual(2 * 28 + 1e-6);
    expect(s.continues).toHaveLength(pages - 1);
  });
});
