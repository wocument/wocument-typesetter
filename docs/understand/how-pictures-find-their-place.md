# How pictures find their place

You write a picture next to the paragraph it belongs to. On a large screen, Wocument doesn't necessarily put it there. It tries the good positions near that paragraph and keeps the one where the picture and the columns around it look best together. This page explains how it decides, so you can predict it and steer it.

Everything here applies to **page scenes** (including any page written without a `\scene`) on screens wide enough for columns. On phones and tablets, nothing floats: each picture sits where you wrote it.

## Why not put the picture where I wrote it?

Because on a page set in columns, "here" is often a bad place. The paragraph might fall near the foot of a column, leaving room for a sliver of picture and two stranded lines under it. Or two pictures might land side by side on one screen while the next screen has none.

A magazine designer would move the picture a little: to the top of the column, to the next screen, across two columns. Wocument does the same, within limits that keep the picture near its text.

## The words you need

- **Anchor.** Where you wrote the picture in the story: between two paragraphs. The picture belongs to the text around it.
- **Floating.** A figure, video, gallery, pull quote or fact box written in a story floats by default (`place=float`). The engine chooses its position.
- **Spot.** A position a floating object may take on a screen, named by a size and a place. Vanilla's spots are a `hero` at the top across all columns (or all but one), a `wide` picture of two or three columns at the top or the bottom, a `column`-wide one at the top, the bottom or the anchor, and a `small` one beside the text at the anchor. A theme can change them.
- **Window.** The screens a floating object may land on: the screen its anchor is on, the one before, or the one after. Never two away, unless the screens in between are already full of earlier pictures.

## How the engine chooses, screen by screen

The engine works through the article one screen at a time. For each screen, it gathers the floating objects that want to be there, at most three of them, in story order. Then:

1. **It lists the candidates.** For each object, every spot its size allows, at every column position where it fits, plus one more option: wait for the next screen. A candidate taller than 85% of the screen is dropped.
2. **It tries the closest ones first.** Combinations are tried in order of how far they put each object from its anchor, nearest first.
3. **It lays each one out for real.** For a combination worth trying, the engine sets the screen with those boxes in place and looks at the result.
4. **It throws out anything that breaks a hard rule.** Then it scores the rest and keeps the one with the lowest score.

### The hard rules

A combination is thrown out if any of these happen:

- Some text didn't get set.
- Two boxes overlap, a box covers the outline of something the text wraps around, or a box runs past the bottom of the screen.
- There's more than one `hero` on the screen.
- A picture leaves one or two lone lines above or below it in a column.
- A pull quote or fact box ends up alone on a screen with no text.

### The score

Every surviving combination gets a score, and the lowest wins. The score adds up costs a designer would recognise:

- **Distance.** Every column away from the anchor costs a little; every screen away costs more.
- **Reading order.** If a later picture would be read before an earlier one (top before bottom, left before right), that costs a lot. Pictures should come in the order the story mentions them.
- **Empty room.** A column that ends short of the bottom of the screen, or a hole of empty lines inside a column, costs for every line.
- **Crowding.** Two boxes in the same column, or two of the same size side by side, cost something.
- **Balance.** Two or more boxes all bunched on one half of the screen cost a little.
- **Rhythm.** Repeating exactly the arrangement of the screen before costs a little, so a long feature doesn't fall into a pattern.

When two combinations tie, the one that follows story order wins.

### When nothing fits

The engine tries at most 40 layouts per screen, so a crowded stretch can't slow the page down. If no combination within those 40 keeps the rules, it lets the later pictures wait for the next screen and tries again with the earlier ones, then with fewer, until everything waits. If even that fails, a picture **falls back**: it's set at its anchor, or at the top of the next column, the way an object that doesn't float would be.

A fallback isn't an error, but it usually means a stretch of text has more pictures than it has room for.

## What you can steer

You don't place a floating picture, but you have three good levers.

- **Its size.** `size=hero`, `wide`, `column`, `small`, or `auto` (the default, which reads the picture's shape: a landscape picture leans wide, a portrait one leans column). A smaller size has more spots to choose from.
- **Its place.** `place=top` or `place=bottom` keeps it to that edge of the screen. `place=here` sets it at its anchor and stops it floating. `place=screen` gives it a screen of its own.
- **Its anchor.** Move the picture a paragraph or two later in the story, and its window moves with it. This is often the cleanest fix when a picture lands too early.

```woc
%% part of a story: a picture that should open the next screen, two columns wide
\figure[src=./pictures/ovens.jpg, alt="Two deck ovens with their doors open", size=wide, place=top]{
  \caption{The deck ovens hold twenty loaves each.}
}
```

## Seeing the decisions

In `woc dev`, open the page and press **V** for the **visor**. It draws the grid and the bands, and for each picture it tells you what happened and why: chosen, waited for the next screen, or fell back. The render check in the [Wocument Skill](../build/design-with-claude.md) reports the same findings, such as "Fallback: no spot"; [Check and polish a page](../build/check-and-polish.md) shows how to use them.

## For developers

The search is `choose()` in `packages/layout/src/compose.ts`, a pure function: no DOM, no clocks, no randomness. The caller in `packages/layout/src/index.ts` passes it a `tryLayout` callback that sets the screen with a combination's boxes and summarises the result.

- `candidates()` builds each object's options from the document's spots, clipped to the screen's columns, dropping any box over 85% of the band, plus a "wait" option while the object's anchor is on this screen or later.
- Combinations are walked best first by summed distance, over a sorted frontier. Since every penalty term is zero or more, the search stops when the next combination's distance alone exceeds the best cost found, and a trial is skipped when it can't win.
- `hardOk()` checks the hard rules; `penaltyParts()` returns each term, which the visor shows.
- The budget defaults to 40 trial layouts per screen (`composeBudget` in `layout()` options), shared by the search and its fallbacks.

The penalty weights (`PENALTY`), set by hand on 17 to 20 October 2026:

| Term | Weight |
| :---- | :---- |
| Column away from the anchor | 1 |
| Screen away from the anchor | 6 |
| Later object read before an earlier one | 20 |
| Line a column ends short of the foot (not on the last screen) | 2 |
| Line of empty room inside a column | 2 |
| Two boxes crowding | 4 |
| All boxes on one half | 2 |
| Same arrangement as the screen before | 1 |

> **⚑ Flag:** The weights have only been tuned on a few test articles. Tuning them on real articles is open (typesetter issue 2), so how a crowded page resolves may change.

> **⚑ Flag:** `size=small` ignores an explicit `place=` today (typesetter issue 3), and still makes a picture small on phones (typesetter issue 4). This page describes the intended behaviour: `place=` wins, and `size=` has no effect on a phone, where every picture sits where you wrote it.

The full rule set is spec §09.7, rule 15.

## Next

- [Add pictures](../build/add-pictures.md): sizes, crops and captions in practice.
- [Columns, screens and the baseline grid](columns-and-screens.md): the other rules a screen is set by.
