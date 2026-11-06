/**
 * Fonts (spec §07.1, 2026-11-06): a document lists only the faces of families its styles use, so a
 * page does not download fonts it never shows. The built-in theme's own fonts follow the same rule.
 */

import { describe, expect, it } from "vitest";
import { parse, type Document } from "@wocument/parser";
import type { ResolvedDocument } from "@wocument/resolved-document";
import { resolve } from "../src/index.js";

const FM = "---\nwocument: 1\ntitle: T\n---\n";
function families(body: string): string[] {
  const p = parse(FM + body, { file: "t.woc" });
  expect(p.diagnostics).toEqual([]);
  const doc: ResolvedDocument = resolve(p.ast as Document).doc;
  return doc.fonts.map((f) => `${f.family}${f.italic ? " italic" : ""}`);
}

describe("fonts a page loads", () => {
  it("are the built-in theme's serif for plain text, and its sans only when a sans style is used", () => {
    expect(families("Text.")).toEqual(["Newsreader", "Newsreader italic"]);
    expect(families("\\kicker{Islands}\n\nText.")).toEqual(["Newsreader", "Newsreader italic", "Inter"]);
  });

  it("leave out a declared face no style uses", () => {
    expect(families(`\\font[family="Unused", src=/u.woff2]\nText.`)).not.toContain("Unused");
  });

  it("keep a declared face a style uses, whatever the case of its name", () => {
    // The only style in use is the body, now in Face, so the built-in serif is not loaded either.
    expect(families(`\\font[family="Face", src=/f.woff2]\n\\style[name=body, family="face, serif"]\nText.`)).toEqual(["Face"]);
  });
});
