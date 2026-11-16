/**
 * A smaller line on the grid (2026-11-15): a subhead set smaller than the body, one grid step tall,
 * is followed by the next body line one step down, not two. Its line box can end a fraction of a
 * pixel past a grid line, which once pushed the paragraph after it a whole line down.
 */
import { describe, expect, it } from "vitest";
import { parse, type Document } from "@wocument/parser";
import { resolve } from "@wocument/resolver";
import { PrepareCache, createFixedEngine } from "@wocument/text-engine";
import { layout } from "../src/index.js";
import { layoutInvariants } from "./invariants.js";

const FM = "---\nwocument: 1\ntitle: T\n---\n";
const TEXT = "Stone endures where nearly everything else decays, and the keepers wrote it down every night.";

describe("a smaller subhead on the grid", () => {
  it.each([[13], [14], [15], [17], [19]])("at %ipx is followed by body text one grid step down", (size) => {
    const src = `${FM}\\grid[name=default, baseline=31px]
\\style[name=body, size=21px, leading=1bl, space-after=0]
\\style[name=subhead, size=${size}px, leading=1bl, space-before=1bl, space-after=0]
\\story[name=s]{${TEXT}\n\n\\subhead{Get real with customers}\n\n${TEXT}}
\\scene{\\frame[story=s, cols=1-6]}`;
    const { doc } = resolve(parse(src).ast as Document);
    const pd = layout(doc, { width: 1280, height: 800 }, new PrepareCache(createFixedEngine()));
    layoutInvariants(doc, pd);
    const lines = pd.scenes[0]!.lines;
    const head = lines.findIndex((l) => l.style === "subhead");
    const step = pd.scenes[0]!.grid.baseline;
    expect(lines[head + 1]!.baseline - lines[head]!.baseline).toBeCloseTo(step, 6);
  });
});
