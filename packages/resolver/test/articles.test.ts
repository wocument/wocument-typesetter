/**
 * Articles (spec §07.8, 2026-11-15): one document holds several articles, each set in its own theme.
 * An `\article` marker starts one; its stories and scenes take their styles, grids, palettes and
 * tokens from its theme, and the scroll does not break.
 */

import { describe, expect, it } from "vitest";
import { format, parse, type Document, type Theme } from "@wocument/parser";
import { articleThemes, resolve } from "../src/index.js";

const theme = (src: string): Theme => {
  const t = parse(src, { kind: "theme", file: "t.woct" });
  expect(t.diagnostics).toEqual([]);
  return t.ast as Theme;
};
const A = theme(`\\token[name=ink2, value=#112233]
\\palette[name=default, paper=#f3dfd6, ink=#231f20, muted=#5f5f5f, accent=#1d6b2a, rule=#888888]
\\grid[name=default, cols=12, baseline=30px]
\\style[name=body, size=20px, leading=1bl, color=$ink2]
\\style[name=headline, size=50px, weight=700]`);
const B = theme(`\\token[name=ink2, value=#445566]
\\palette[name=default, paper=#ffffff, ink=#000000, muted=#555555, accent=#001722, rule=#cccccc]
\\grid[name=default, cols=10, baseline=26px]
\\style[name=body, size=17px, leading=1bl, color=$ink2, family="Inter, sans-serif"]
\\font[family="Inter", src=/inter.woff2]`);

const SRC = `---
wocument: 1
title: Two articles
theme: ./a.woct
---

\\folio{Section A}

\\story[name=one]{
\\headline{First}

Text of the first article.
}

\\scene{\\frame[story=one]}

\\article[theme=./b.woct]

\\folio{Section B}

\\story[name=two]{
\\headline{Second}

Text of the *second* article.
}

\\scene{\\frame[story=two]}
`;

const parsed = () => {
  const p = parse(SRC, { file: "t.woc" });
  expect(p.diagnostics).toEqual([]);
  return p.ast as Document;
};

describe("articles", () => {
  it("split the document at each marker, folio included", () => {
    const doc = parsed();
    expect(doc.articles.map((a) => [a.marker?.name ?? null, a.stories, a.scenes, a.folio !== null])).toEqual([
      [null, 1, 1, true],
      ["article", 1, 1, true],
    ]);
    expect(articleThemes(doc)).toEqual(["./b.woct"]);
  });

  it("keep their markers when formatted", () => {
    const again = parse(format(parsed()), { file: "t.woc" });
    expect((again.ast as Document).articles).toHaveLength(2);
  });

  it("set each article's stories and scenes in its own theme", () => {
    const v = resolve(parsed(), { theme: A, themes: { "./b.woct": B } }).doc.variants.base;
    const [s1, s2] = v.scenes;
    expect([s1!.grid.cols, s1!.grid.baseline, s1!.palette.paper]).toEqual([12, 30, "#f3dfd6ff"]);
    expect([s2!.grid.cols, s2!.grid.baseline, s2!.palette.paper]).toEqual([10, 26, "#ffffffff"]);
    expect(s1!.body).toBeUndefined();
    expect(s2!.body).toBe("t1/body");
    const one = v.stories["one"]!.blocks.filter((b) => b.kind === "paragraph").map((b) => b.style);
    const two = v.stories["two"]!.blocks.filter((b) => b.kind === "paragraph").map((b) => b.style);
    expect(one).toEqual(["headline", "body"]);
    expect(two).toEqual(["t1/headline", "t1/body"]);
    // Tokens resolve in the article's theme; a style the theme does not set is the built-in one.
    expect(v.styles["body"]!.color).toEqual({ hex: "#112233ff" });
    expect(v.styles["t1/body"]!.color).toEqual({ hex: "#445566ff" });
    expect(v.styles["t1/body"]!.family[0]).toBe("Inter");
    expect(v.styles["t1/headline"]!.weight).toBe(resolve(parsed(), { theme: null, themes: { "./b.woct": B } }).doc.variants.base.styles["headline"]!.weight);
    expect(Object.keys(v.styles)).toContain("t1/body+em");
  });

  it("show each article's own folio", () => {
    const v = resolve(parsed(), { theme: A, themes: { "./b.woct": B } }).doc.variants.base;
    expect(v.scenes.map((s) => s.folio?.story)).toEqual(["folio#text", "folio-2#text"]);
  });

  it("load the fonts of every article's theme", () => {
    const doc = resolve(parsed(), { theme: A, themes: { "./b.woct": B } }).doc;
    expect(doc.fonts.map((f) => f.family)).toContain("Inter");
  });

  it("need their theme file to be given", () => {
    expect(() => resolve(parsed(), { theme: A })).toThrow(/b\.woct/);
  });

  it("are a parse error in a document with no scenes", () => {
    const p = parse("---\nwocument: 1\ntitle: T\n---\n\\article[theme=./b.woct]\n\nText.\n", { file: "t.woc" });
    expect(p.diagnostics.map((d) => d.code)).toContain("P020");
  });

  it("allow one folio each, not two", () => {
    const p = parse(SRC.replace("\\folio{Section B}", "\\folio{Section B}\n\\folio{Again}"), { file: "t.woc" });
    expect(p.diagnostics.map((d) => d.code)).toEqual(["P043"]);
  });
});
