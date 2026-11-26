/**
 * The last screen of a page scene (2026-11-15).
 * - Rule 16: a picture sized from print (`size=<n>em`) keeps its size relative to the body text,
 *   scaled to the screen, and nothing resizes it to fill a screen.
 * - Whole screens and runs (design 2026-11-26): a run of page scenes is a whole number of screens; the
 *   next scene of a run starts on the same screen, and a short last screen holds its block in the
 *   optical centre.
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

describe("whole screens (design 2026-11-26)", () => {
  it("a page scene another scene follows is still whole screens; the next scene starts on a screen's top", () => {
    const viewport = { width: 1280, height: 800 };
    const pd = lay(article(40, "contain", "\\scene{\\frame{\\headline{The next article}}}"), viewport);
    const [first, next] = pd.scenes;
    expect(first!.height % viewport.height).toBeCloseTo(0, 6);
    expect(next!.y % viewport.height).toBeCloseTo(0, 6);
  });

  it("keeps whole screens when it is the document's last scene", () => {
    const pd = lay(article(40, "contain"), { width: 1280, height: 800 });
    expect(pd.scenes[0]!.height % 800).toBe(0);
  });

  it("scenes that share one screen take an equal share each", () => {
    const viewport = { width: 1280, height: 800 };
    const half = `\\scene[height=page, screens=half]{\\frame{\\headline{A}}}\n`;
    const pd = lay(`${FM}${half}${half}\\scene[height=page]{\\frame{\\headline{C}}}`, viewport);
    expect(pd.scenes.map((x) => x.height)).toEqual([400, 400, 800]);
    expect(pd.scenes[0]!.share).toBe(2);
    expect(pd.scenes[2]!.y).toBe(800);
  });

  it("an unfinished group loses its shares (W065)", () => {
    const { doc } = resolve(parse(`${FM}\\scene[height=page, screens=half]{\\frame{\\headline{A}}}`).ast as Document, { assets: fake });
    expect(doc.diagnostics.some((d) => d.code === "W065")).toBe(true);
    expect(doc.variants[Object.keys(doc.variants)[0]!]!.scenes[0]!.screens).toBeUndefined();
  });

});

describe("runs (design 2026-11-26)", () => {
  const viewport = { width: 1280, height: 800 };
  const page = (run: string, n: number, name: string) => `\\story[name=${name}]{${story(n)}}
\\scene[height=page${run}]{\\frame[cols=all]{\\headline{${name}}}\\frame[story=${name}, cols=all, columns=4]}
`;

  it("the next scene of a run starts on the last screen of the one before; only the run is whole screens", () => {
    let mid = 0;
    for (let n = 8; n <= 40; n += 4) {
      const pd = lay(`${FM}${page(", run=a", n, "one")}${page(", run=a", 50, "two")}${page("", 6, "three")}`, viewport);
      const [one, two, three] = pd.scenes;
      expect(two!.y).toBeCloseTo(one!.y + one!.height, 6);
      expect((one!.height + two!.height) % viewport.height).toBeCloseTo(0, 6);
      // A scene without a run starts on a screen's top.
      expect(three!.y % viewport.height).toBeCloseTo(0, 6);
      if (two!.y % viewport.height > 1) {
        mid++;
        expect(two!.follows).toBe(true);
        // Its bands are counted from the true screens: no line of its columns runs over a screen's foot
        // or into its head. (Its heading frame is not set in bands, so it may still cross a foot.)
        const g = two!.grid;
        for (const l of two!.lines.filter((x) => x.story === "two")) {
          const top = Math.floor(l.y / viewport.height) * viewport.height;
          expect(l.y, l.text).toBeGreaterThanOrEqual(top + g.marginY - 1e-6);
          expect(l.y + l.height, l.text).toBeLessThanOrEqual(top + viewport.height - g.marginY + 1e-6);
        }
      }
    }
    expect(mid).toBeGreaterThan(0);
  });

  it("a scene with a run name of its own is a run of its own", () => {
    const pd = lay(`${FM}${page(", run=a", 12, "one")}${page(", run=b", 12, "two")}`, viewport);
    expect(pd.scenes[0]!.height % viewport.height).toBeCloseTo(0, 6);
    expect(pd.scenes[1]!.y % viewport.height).toBeCloseTo(0, 6);
  });
});

describe("the optical centre of a short last screen (design 2026-11-26)", () => {
  const viewport = { width: 1280, height: 800 };
  const src = (n: number) => `${FM}\\story[name=s]{${story(n)}}
\\scene[height=page]{\\frame[cols=all]{\\headline{Heading}}\\frame[story=s, cols=all, columns=3]}
`;
  const raw = (n: number) => {
    const { doc } = resolve(parse(src(n)).ast as Document, { assets: fake });
    return layout(doc, viewport, new PrepareCache(createFixedEngine()), { fit: false }).scenes[0]!;
  };

  it("moves the block down by 40% of the free space, in whole baselines, and never changes the text", () => {
    let moved = 0;
    let kept = 0;
    for (let n = 2; n <= 60; n += 2) {
      const a = layp(src(n), viewport).scenes[0]!;
      const b = raw(n);
      expect(a.height).toBe(b.height);
      expect(a.lines.map((l) => [l.text, l.height, l.x])).toEqual(b.lines.map((l) => [l.text, l.height, l.x]));
      const top = b.y + b.height - viewport.height;
      const last = b.lines.filter((l) => l.y >= top);
      const free = top + viewport.height - b.grid.marginY - Math.max(...last.map((l) => l.y + l.height));
      const d = a.lines.at(-1)!.y - b.lines.at(-1)!.y;
      // Lines are never spread: every line on the last screen moves by the same offset.
      a.lines.forEach((l, i) => expect(l.y - b.lines[i]!.y).toBeCloseTo(b.lines[i]!.y >= top ? d : 0, 6));
      if (free > 0.2 * viewport.height && !b.lines.some((l) => l.y < top)) {
        expect(d).toBeCloseTo(Math.floor((0.4 * free) / b.grid.baseline) * b.grid.baseline, 6);
        if (d > 0) moved++;
      } else if (free <= 0.2 * viewport.height) {
        expect(d).toBe(0);
        kept++;
      }
    }
    expect(moved).toBeGreaterThan(0);
    expect(kept).toBeGreaterThan(0);
  });
});

describe("a drop cap under a grid-placed picture (2026-11-26)", () => {
  it("is never lost when the picture leaves its column fewer lines than the cap", () => {
    let tried = 0;
    for (const viewport of [{ width: 2560, height: 1440 }, { width: 1280, height: 800 }])
    for (let h = 40; h <= 90; h += 5)
    for (let n = 6; n <= 30; n += 6) {
      const src = `${FM}\\story[name=s]{\\dropcap[lines=5]

${story(n)}}
\\scene[height=page]{
  \\figure[src=/missing.jpg, alt="", cols=1-3, top=0, height=${h}vh, wrap=rect]
  \\frame[story=s, cols=all, top=0, columns=4]
}
`;
      const s = layp(src, viewport).scenes[0]!;
      expect(s.caps.length, `${viewport.width}: ${h}vh, ${n} sentences`).toBe(1);
      tried++;
    }
    expect(tried).toBeGreaterThan(0);
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
