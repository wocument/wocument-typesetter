/**
 * The last screen of a page scene (2026-11-15).
 * - Rule 16: a picture sized from print (`size=<n>em`) keeps its size relative to the body text,
 *   scaled to the screen, and nothing resizes it to fill a screen.
 * - A page scene another scene follows ends where its content does: the next scene starts on the
 *   same screen, with no empty screen between them.
 * - Text that ends exactly at a screen's foot adds no empty screen after it.
 */
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { createAssetHost } from "@wocument/assets";
import { parse, type Document } from "@wocument/parser";
import { type AssetHost, resolve } from "@wocument/resolver";
import { PrepareCache, createFixedEngine } from "@wocument/text-engine";
import { layout } from "../src/index.js";
import { layoutInvariants } from "./invariants.js";

const FM = "---\nwocument: 1\ntitle: T\n---\n\\grid[name=default, cols=12, gutter=24px, margin-x=48px, margin-y=2bl, baseline=28px, body=1-12]\n";
const here = fileURLToPath(new URL(".", import.meta.url));
const SENTENCE = "Stone endures where nearly everything else decays, and the keepers wrote it down every night. ";
const story = (n: number) => Array.from({ length: Math.ceil(n / 6) }, (_, i) => SENTENCE.repeat(Math.min(6, n - 6 * i))).join("\n\n");

/** A heading block with a photograph over 9 of 12 columns, and a 4-column story under it. */
const article = (n: number, fit = "cover", after = "") => `${FM}\\story[name=s]{${story(n)}}
\\scene[height=page]{
  \\frame[cols=1-9, wrap=rect]{\\figure[src=/missing.jpg, alt="", place=here, fit=${fit}, ratio=2:1]\n\\headline{Heading}}
  \\frame[story=s, cols=1-12, top=0, columns=4]
}
${after}`;

function lay(src: string, viewport: { width: number; height: number }) {
  const { doc } = resolve(parse(src).ast as Document, { assets: createAssetHost({ publicDir: here, sourceDir: here }) });
  const pd = layout(doc, viewport, new PrepareCache(createFixedEngine()));
  layoutInvariants(doc, pd, { standoff: false });
  return pd;
}

/** Every picture is 800x600, and one named `tall` is 600x900. */
const fake: AssetHost = {
  image: (path) => ({ url: path, type: "image/jpeg", width: path.includes("tall") ? 600 : 800, height: path.includes("tall") ? 900 : 600, animated: false }),
  contour: (path) => (path.includes("cut") ? [[0, 0], [1, 0], [1, 1], [0, 1]] : null),
  file: (path) => ({ url: path, type: "video/mp4" }),
};
function layp(src: string, viewport: { width: number; height: number }) {
  const { doc } = resolve(parse(src).ast as Document, { assets: fake });
  const pd = layout(doc, viewport, new PrepareCache(createFixedEngine()));
  layoutInvariants(doc, pd, { standoff: false });
  return pd;
}
/** A 4-column story with one picture anchored in it, sized from print. */
const printed = (size: string, n = 60) => `${FM}\\story[name=s]{${story(n / 2)}

\\figure[src=/missing.jpg, alt="", size=${size}]

${story(n / 2)}}
\\scene[height=page]{\\frame[story=s, cols=1-12, columns=4, columns@phone=1]}
`;
const picture = (pd: ReturnType<typeof layp>) => pd.scenes[0]!.objects.find((o) => o.media)!;

describe("rule 16: a picture keeps its print size relative to the text", () => {
  it("is the print width in body ems, scaled by the screen's text area and rounded to grid columns", () => {
    // 1280x800: body 19px (built-in), text area 1184 x 744px = 62 x 39em, so s = min(62/130, 39/77) ~ 0.48.
    const pd = layp(printed("45em"), { width: 1280, height: 800 });
    const g = pd.scenes[0]!.grid;
    const p = picture(pd);
    const pitch = g.colWidth + g.gutter;
    // A whole number of grid columns.
    expect(((p.box.width + g.gutter) / pitch) % 1).toBeCloseTo(0, 6);
    expect(p.box.width).toBeLessThan(pd.viewport.width / 2);
  });

  it("is as wide as the text area allows, so the same where the grid stops growing, and smaller on a smaller screen", () => {
    const big = layp(printed("45em"), { width: 2560, height: 1440 });
    const mid = picture(layp(printed("45em"), { width: 1920, height: 1080 })).box.width;
    const small = picture(layp(printed("45em"), { width: 1280, height: 800 })).box.width;
    const g = big.scenes[0]!.grid;
    expect(Math.abs(picture(big).box.width - mid)).toBeLessThanOrEqual(g.colWidth + g.gutter + 1e-6);
    expect(mid).toBeGreaterThan(small);
  });

  it("keeps its own shape: no crop, and no growth to fill a screen", () => {
    for (const n of [40, 58, 88, 112]) {
      const scene = layp(printed("30em", n), { width: 1280, height: 800 }).scenes[0]!;
      const o = scene.objects.find((x) => x.media)!;
      // The file's ratio, rounded to whole baselines (rule 14) and no more.
      expect(Math.abs(o.media!.height - (o.media!.width * 3) / 4)).toBeLessThanOrEqual(scene.grid.baseline / 2 + 1e-6);
    }
  });

  it("takes the whole column on a phone", () => {
    const pd = layp(printed("20em"), { width: 375, height: 812 });
    const p = picture(pd);
    const line = pd.scenes[0]!.lines[0]!;
    expect(p.box.width).toBeCloseTo(line.width, 0);
  });

  it("has text beside it when it is narrower than a column", () => {
    const pd = layp(printed("18em"), { width: 2560, height: 1440 });
    const p = picture(pd);
    const beside = pd.scenes[0]!.lines.filter((l) => l.y >= p.box.y && l.y < p.box.y + p.box.height && l.x + l.width > p.box.x - 400 && l.x < p.box.x + p.box.width + 400);
    expect(beside.length).toBeGreaterThan(0);
  });
});

describe("rule 16: a lead picture", () => {
  it("opens its text on the scene's first screen, whatever the text's length", () => {
    for (const viewport of [{ width: 1920, height: 1080 }, { width: 1280, height: 800 }])
    for (let n = 10; n <= 80; n += 1) {
      const src = `${FM}\\story[name=s]{\\figure[src=/missing.jpg, alt="", size=62em, place=top]

${story(n)}}
\\scene[height=page]{\\frame[cols=all]{\\headline{Heading}}\\frame[story=s, cols=all, columns=4, columns@phone=1]}
`;
      const s = layp(src, viewport).scenes[0]!;
      const p = s.objects.find((o) => o.media)!;
      expect(p.box.y, `${n} sentences`).toBeLessThan(s.y + viewport.height);
    }
  });
});

describe("rule 16: the text beside a print-sized picture", () => {
  /** The gap between the picture and each line that shares its height, on the side the line is on. */
  const gaps = (pd: ReturnType<typeof layp>) => {
    const s = pd.scenes[0]!;
    const p = s.objects.find((o) => o.media)!;
    return s.lines
      .filter((l) => l.y < p.box.y + p.box.height && l.y + l.height > p.box.y)
      .map((l) => (l.x >= p.box.x + p.box.width ? l.x - (p.box.x + p.box.width) : l.x + l.width <= p.box.x ? p.box.x - (l.x + l.width) : -1));
  };

  it("starts at least a gutter away from it, in a column and at a column's top", () => {
    for (const place of ["", ", place=top"]) {
      const pd = layp(printed(`18em${place}`), { width: 2560, height: 1440 });
      const g = gaps(pd);
      expect(g.length, place).toBeGreaterThan(0);
      for (const d of g) expect(d, place).toBeGreaterThanOrEqual(pd.scenes[0]!.grid.gutter - 1e-6);
    }
  });
});

describe("a drop cap", () => {
  it("is never lost when its paragraph starts under a lead picture with too little room left", () => {
    for (const viewport of [{ width: 2560, height: 1440 }, { width: 1920, height: 1080 }, { width: 1280, height: 800 }])
    for (let n = 6; n <= 60; n += 3) {
      const src = `${FM}\\story[name=s]{\\figure[src=/missing.jpg, alt="", size=62em, place=top]

\\dropcap[lines=4]

${story(n)}}
\\scene[height=page]{\\frame[cols=all]{\\headline{Heading}}\\frame[story=s, cols=all, columns=4, columns@phone=1]}
`;
      const s = layp(src, viewport).scenes[0]!;
      expect(s.caps.length, `${viewport.width}: ${n} sentences`).toBe(1);
    }
  });
});

describe("a tall lead picture under a tall heading", () => {
  it("narrows to fit the first screen rather than wait for the next", () => {
    const src = `${FM}\\story[name=s]{\\figure[src=/tall.jpg, alt="", size=40em, place=top]

${story(18)}}
\\scene[height=page]{\\frame[cols=all]{\\headline{A heading long enough to take two or three lines across the whole width of the screen}}\\frame[story=s, cols=all, columns=3]}
`;
    const viewport = { width: 1280, height: 800 };
    const s = layp(src, viewport).scenes[0]!;
    const p = s.objects.find((o) => o.media)!;
    expect(p.box.y + p.box.height).toBeLessThanOrEqual(s.y + viewport.height);
  });
});

describe("rule 1: a picture above the first band", () => {
  /** A heading, a picture in its own frame `h` tall, and a 3-column story under it. */
  const opener = (h: string) => `${FM}\\story[name=s]{\\dropcap[lines=3]

${story(60)}}
\\scene[height=page]{
  \\frame[cols=all]{\\headline{Heading}}
  \\frame[cols=4-9]{\\figure[src=/missing.jpg, alt="", height=${h}, fit=contain, place=here]}
  \\frame[story=s, cols=all, columns=3]
}
`;

  it("gives way, so the text starts on the first screen rather than leave it short", () => {
    const viewport = { width: 1872, height: 941 };
    // A picture that leaves the text just under a quarter of the screen.
    let hit = false;
    for (let vh = 40; vh <= 60; vh += 1) {
      const pd = layp(opener(`${vh}vh`), viewport);
      const s = pd.scenes[0]!;
      const p = s.objects.find((o) => o.media)!;
      const lines = s.lines.filter((l) => l.y > p.box.y + p.box.height);
      const start = Math.min(...lines.map((l) => l.y));
      // Either the text starts on the first screen, or the picture is already at its smallest.
      if (start >= viewport.height) expect(p.box.height, `${vh}vh`).toBeLessThanOrEqual((viewport.height * vh) / 100 * 0.7 + 1);
      if (p.box.height < (viewport.height * vh) / 100 - 1 && start < viewport.height) hit = true;
    }
    expect(hit, "some height made the picture give way").toBe(true);
  });

  it("keeps its size when the text already starts under it", () => {
    const pd = layp(opener("20vh"), { width: 1872, height: 941 });
    const p = pd.scenes[0]!.objects.find((o) => o.media)!;
    expect(p.box.height).toBeCloseTo(941 * 0.2, 0);
  });
});

describe("§07.5 outdent and a cut-out", () => {
  it("moves the cut-out into the margin instead of drawing it larger", () => {
    const FMO = FM.replace("body=1-12]", "body=1-12, outdent=40px]");
    const src = (shape: string) => `${FMO}\\story[name=s]{\\figure[src=/${shape === "alpha" ? "cut" : "photo"}.jpg, alt="", side=left, width=50%, shape=${shape}, wrap=rect]

${story(20)}}
\\scene{\\frame[story=s, cols=1-6]}
`;
    const rect = layp(src("rect"), { width: 1280, height: 800 }).scenes[0]!.objects.find((o) => o.media)!;
    const cut = layp(src("alpha"), { width: 1280, height: 800 }).scenes[0]!.objects.find((o) => o.media)!;
    expect(rect.box.width - cut.box.width).toBeCloseTo(40, 0);
    expect(cut.box.x).toBeCloseTo(rect.box.x, 0);
  });
});

describe("a page scene another scene follows", () => {
  it("ends where its content does, and the next scene starts on the same screen", () => {
    const viewport = { width: 1280, height: 800 };
    const pd = lay(article(40, "contain", "\\scene{\\frame{\\headline{The next article}}}"), viewport);
    const [first, next] = pd.scenes;
    const end = Math.max(...first!.lines.map((l) => l.y + l.height));
    expect(next!.y).toBeCloseTo(end + first!.grid.marginY, 6);
    expect(first!.height % viewport.height).not.toBeCloseTo(0, 6);
  });

  it("keeps whole screens when it is the document's last scene", () => {
    const pd = lay(article(40, "contain"), { width: 1280, height: 800 });
    expect(pd.scenes[0]!.height % 800).toBe(0);
  });
});

describe("text that ends exactly at a screen's foot", () => {
  it("adds no empty screen after it, and no mark that the text continues", () => {
    const viewport = { width: 1280, height: 800 };
    // Without a picture to change, find a length that ends a screen exactly full.
    for (let n = 20; n <= 160; n++) {
      const src = `${FM}\\story[name=s]{${story(n)}}\n\\scene[height=page]{\\frame[story=s, cols=1-12, columns=3]}`;
      const s = lay(src, viewport).scenes[0]!;
      const pages = s.height / viewport.height;
      const lastTop = s.y + (pages - 1) * viewport.height;
      expect(s.lines.some((l) => l.y >= lastTop), `${n} sentences: a screen with no text`).toBe(true);
      const end = Math.max(...s.lines.map((l) => l.y + l.height));
      if (Math.abs(end - (s.y + s.height - s.grid.marginY)) < 1e-6) {
        expect(s.continues.filter((c) => c.y >= lastTop)).toEqual([]);
        return;
      }
    }
    throw new Error("no length ended a screen exactly");
  });
});
