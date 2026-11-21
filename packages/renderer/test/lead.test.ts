/** The lead picture (2026-11-21): the largest figure on the first screen loads first, never lazily. */
import { describe, expect, it } from "vitest";
import type { PositionedDocument } from "@wocument/layout";
import type { ResolvedDocument } from "@wocument/resolved-document";
import { leadPicture } from "../src/index.js";

const box = (y: number, width: number, height: number) => ({ x: 0, y, width, height });
const doc = (objects: { name: string; media: ReturnType<typeof box> | null }[]) =>
  ({ viewport: { width: 1280, height: 800 }, scenes: [{ objects }] }) as unknown as PositionedDocument;
const variant = (kinds: Record<string, string>) =>
  ({ objects: Object.fromEntries(Object.entries(kinds).map(([k, kind]) => [k, { kind }])) }) as unknown as ResolvedDocument["variants"][string];

describe("leadPicture", () => {
  it("is the figure with the most picture showing on the first screen", () => {
    const pd = doc([
      { name: "small", media: box(100, 200, 200) },
      { name: "big", media: box(400, 900, 1200) }, // only 400px of it shows, still the largest
      { name: "below", media: box(900, 1200, 800) },
    ]);
    expect(leadPicture(pd, variant({ small: "figure", big: "figure", below: "figure" }))).toBe("big");
  });

  it("is none when no figure shows on the first screen, and never a video or a text object", () => {
    expect(leadPicture(doc([{ name: "below", media: box(800, 600, 400) }]), variant({ below: "figure" }))).toBeNull();
    expect(leadPicture(doc([{ name: "v", media: box(0, 600, 400) }, { name: "q", media: null }]), variant({ v: "video", q: "pullquote" }))).toBeNull();
  });
});
