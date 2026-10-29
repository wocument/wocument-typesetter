import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { main } from "../src/cli.js";

describe("wocument format", () => {
  it("--check fails until --write makes the file canonical, and refuses a file with errors", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const dir = mkdtempSync(join(tmpdir(), "woc-"));
    const file = join(dir, "a.woc");
    writeFileSync(file, "---\ntitle: T\nwocument: 1\n---\n\\headline{Hi}\nOne\ntwo.\n");
    expect(main(["format", "--check", file])).toBe(1);
    expect(main(["format", "--write", file])).toBe(0);
    expect(readFileSync(file, "utf8")).toBe("---\nwocument: 1\ntitle: T\n---\n\n\\headline{Hi}\nOne two.\n");
    expect(main(["format", "--check", file])).toBe(0);

    writeFileSync(file, "---\nwocument: 1\ntitle: T\n---\n\\headlin{Hi}\n");
    expect(main(["format", "--write", file])).toBe(1);
    expect(readFileSync(file, "utf8")).toContain("\\headlin{Hi}");
  });
});

describe("line length (W064)", () => {
  it("counts characters in full body lines per test width, and flags lines outside 45 to 75", async () => {
    const { parse } = await import("@wocument/parser");
    const { resolve } = await import("@wocument/resolver");
    const { lineLengths, tooShortOrLong } = await import("../src/measure.js");
    const text = Array.from({ length: 40 }, () => "Stone endures where nearly everything else decays, and the keepers wrote it down.").join(" ");
    const { doc } = resolve(parse(`---\nwocument: 1\ntitle: T\n---\n${text}`).ast as import("@wocument/parser").Document);
    const ls = lineLengths(doc, [1470]);
    expect(ls).toHaveLength(1);
    expect(ls[0]!.chars).toBeGreaterThanOrEqual(45); // a laptop, 2026-10-11: 45, the base page at 85% zoom
    expect(ls[0]!.chars).toBeLessThan(75);
    expect(tooShortOrLong({ width: 768, variant: "tablet", chars: 32 })).toBe(true);
    expect(tooShortOrLong({ width: 360, variant: "phone", chars: 34 })).toBe(false);
  });
});

describe("copyfitting report", () => {
  const para = (n: number, tag: string): string => Array.from({ length: n }, (_, i) => `Stone ${tag}${i} endures where nearly everything else decays.`).join(" ");
  // A picture that waits sets the band short (§09.7 rule 3): its columns end short of the bottom line. The
  // columns are no longer levelled (rule 11 removed), so the length that shows it is found, not fixed.
  const rule3 = (n: number): string => `---\nwocument: 1\ntitle: T\n---\n\\story[name=s]{${para(n, "a")}\n\n\\figure[src=/a.jpg, alt="A picture", size=column, ratio=4:3]\n\n${para(4, "b")}}\n\\scene[height=page]{\\frame[story=s, cols=1-12, columns=3]}\n`;
  const SHORT_LINE = /^screen 1 at 1470px: \d+ lines? short of the bottom line\.$/;
  const doc = async (src: string) => {
    const { parse } = await import("@wocument/parser");
    const { resolve } = await import("@wocument/resolver");
    const assets = {
      image: (path: string) => ({ url: path, type: "image/jpeg", width: 800, height: 600, animated: false }),
      contour: () => null,
      file: (path: string) => ({ url: path, type: "video/mp4" }),
    };
    return resolve(parse(src).ast as import("@wocument/parser").Document, { assets }).doc;
  };

  const findShort = async (): Promise<string> => {
    const { copyfit } = await import("../src/measure.js");
    for (let n = 20; n <= 90; n++) if (copyfit(await doc(rule3(n)), [1470]).some((l) => SHORT_LINE.test(l))) return rule3(n);
    throw new Error("no length of text leaves screen 1 short");
  };

  it("copyfit names a short screen", async () => {
    const { copyfit } = await import("../src/measure.js");
    const out = copyfit(await doc(await findShort()), [1470]);
    const i = out.findIndex((l) => SHORT_LINE.test(l));
    expect(i).toBeGreaterThanOrEqual(0);
    expect(out[i + 1]).toMatch(/^ {2}Add about \d+0 characters/);
  });

  it("copyfit is silent on a page that fits", async () => {
    const { copyfit } = await import("../src/measure.js");
    const long = "Stone endures where nearly everything else decays. ".repeat(100).trim();
    expect(copyfit(await doc(`---\nwocument: 1\ntitle: T\n---\n\\story[name=s]{${long}}\n\\scene[height=page]{\\frame[story=s, columns=2]}\n`))).toEqual([]);
  });

  it("woc check prints the report", async () => {
    const SHORT = await findShort();
    const said: string[] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((s: string) => void said.push(s));
    const dir = mkdtempSync(join(tmpdir(), "woc-"));
    const file = join(dir, "a.woc");
    writeFileSync(file, SHORT);
    expect(main(["check", file])).toBe(0);
    spy.mockRestore();
    const at = said.findIndex((l) => SHORT_LINE.test(l));
    expect(at).toBeGreaterThanOrEqual(0);
    expect(said[at + 1]).toMatch(/^ {2}Add about/);
    // After the diagnostics: no diagnostic line follows the report.
    expect(said.slice(at).some((s) => s.startsWith("wocument:"))).toBe(false);
  });
});
