# Wrap text around a cut-out

This guide shows you how to make text follow the outline of a picture, the way a magazine wraps a column around a figure cut out from its background. It also shows the simpler shapes, such as a circle, that work with any picture.

## Before you start

- A page that passes `woc check`. If you haven't made one, start with [Your first page](../start-here/your-first-page.md).
- A **cut-out**: a PNG file whose background is transparent, so that only the subject is left. Most photo editors can remove a background and export a PNG with transparency. Wocument reads the outline from PNG files only.
- Enough text around the place where the picture goes. A cut-out needs several lines beside it to show its shape.

## 1. Add the cut-out beside the text

Write a `\figure` between two paragraphs, as for any picture, and add three attributes:

```woc
%% part of a story: between two paragraphs
\figure[src=./pictures/cutout-tower.png, alt="The lighthouse tower, cut out against the page", shape=alpha, wrap=contour, side=right, width=40%]
```

- `shape=alpha` tells the engine to trace the picture's outline from its transparent pixels. It does this once, when it reads your file, so the reader's browser has nothing extra to do.
- `wrap=contour` makes the text follow that outline instead of the picture's rectangular box.
- `side=right, width=40%` sets the picture at the right of its column, 40% of the column wide, with the text on its left. Use `side=left` for the other side. Without a `width`, the picture takes half the column.

A cut-out stays at its **anchor**, the place where you wrote it in the story. Unlike other pictures, it doesn't float to another spot on the screen.

> **⚑ Flag:** Today, in text set in several columns, the engine can set a cut-out at the top of a later column instead of beside its anchor: in the example below, from 1024 pixels up, the tower sits at the top of the second column. This page assumes it stays at its anchor. Until that's fixed, check where it lands in `woc dev`, and move the `\figure` in the story if it ends up beside the wrong text.

Here's a whole page with a cut-out, ready to check:

```woc
---
wocument: 1
title: The Keeper's Tower
lang: en-GB
---
\kicker{Coast · Places}
\headline{The Keeper's Tower}
\deck{A white tower on a headland, and the hundred and twelve steps to the lamp.}

The tower stands on the last rise of the headland, where the grass gives out and the rock begins. From the village it looks small and very white, like a candle someone has left on a table. Close to, it is wider than a house, and the wind that comes round it is strong enough to lean on.

\figure[src=./pictures/cutout-tower.png, alt="The lighthouse tower, cut out against the page", shape=alpha, wrap=contour, side=right, width=40%, side@phone=full]

The door faces inland, away from the weather. Inside, a stone stair winds up the wall in a tight spiral, and the only light comes from narrow windows set at every turn. The keepers counted the steps so often that they could say, in the dark, exactly how far they had still to climb.

At the top is the lamp room, all glass, with a gallery outside it where the keepers stood to clean the panes. On a clear day they could see three other towers along the coast, and on a clear night, three other lights, each with its own pattern of flashes so that ships could tell them apart.

The last keeper left the tower forty years ago. The lamp is electric now, and it is checked once a month by a technician who drives out from the town, climbs the hundred and twelve steps, and drives back before dark.
```

`side@phone=full` gives phones a different setting: there the picture takes the whole column, and the text runs above and below it. A phone's column is too narrow to set readable lines beside a picture.

## 2. Adjust the wrap

Three attributes fine-tune how the text meets the outline.

**`wrap-side`** chooses which side the text may use:

- `largest` (the default): the wider side at each line.
- `left` or `right`: only that side.
- `both`: both sides at once, for a cut-out in the middle of a wide column.

**`wrap-offset`** is the gap between the outline and the text. It's one baseline step by default, `1bl`. A smaller gap, such as `wrap-offset=0.5bl`, hugs the outline more closely.

**`alpha-threshold`** decides how transparent a pixel must be to count as background. It's `50%` by default. If a soft edge, such as hair or smoke, pushes the text too far away, raise it (`alpha-threshold=70%`). If the text cuts into a faint part of the subject, lower it.

```woc
%% part of a story
\figure[src=./pictures/cutout-tower.png, alt="The lighthouse tower", shape=alpha, wrap=contour, side=left, width=35%, wrap-side=right, wrap-offset=0.5bl, alpha-threshold=60%]
```

## 3. Or pin it to grid columns

Instead of `side`, you can pin a cut-out to columns of the page's **grid**, the set of columns every screen size is laid out on. With `cols=`, the picture can reach across the gap between two columns of text, and the text in each column wraps its outline:

```woc
%% part of a story: pinned to columns 6 to 8 of the 12-column grid
\figure[src=./pictures/cutout-tower.png, alt="The lighthouse tower", shape=alpha, wrap=contour, cols=6-8, cols@tablet=4-6, cols@phone=all]
```

Grids have fewer columns on smaller screens: Vanilla, the built-in design, uses 12 on laptops and larger, 8 on tablets and 4 on phones. Give a `cols@tablet=` and a `cols@phone=` value so the picture fits each grid. Without them, `woc check` warns W031, and on those screens the picture falls back to taking the column's full width, with the text above and below it.

## 4. Use a simple shape instead

You don't need a transparent picture for every wrap. Three other shapes work with any picture:

- `shape=circle` and `shape=ellipse` wrap the text around a circle or an ellipse fitted inside the picture's box.
- `shape=poly(...)` wraps it around a polygon you describe, with corners given from `0 0` (the box's top left) to `1 1` (its bottom right). `poly(0 0, 1 0, 0.5 1)` is a triangle pointing down.

Add `clip` to cut the picture itself to the shape too. Without it, the picture stays rectangular and only the text follows the shape.

```woc
%% part of a story: a round portrait
\figure[src=./pictures/keeper.jpg, alt="The last keeper, photographed in 1984", ratio=1:1, shape=circle, clip, wrap=contour, side=left, width=35%]
```

## Check the result

1. Open the page in `woc dev`. Beside the picture, each line should end at a steady distance from the outline, line by line, rather than at a straight edge.
2. Look for empty space beside the narrow parts of the outline. That's deliberate: see below.
3. Make the window narrow and check the phone version.
4. Run `woc check`. With the picture in place, there should be no W032 or W050 warning.

### Why some gaps stay empty

Where the outline leaves only a thin strip of the column free, the engine leaves the strip empty rather than squeeze two or three words into it. Vanilla sets no text in a gap narrower than 9 times the text size (`9em`). You can change that limit with the style's `min-slot` attribute:

```woc
%% part of the design head, after the frontmatter: allow narrower strips of body text
\style[name=body, min-slot=7em]
```

A smaller value fills more of the space beside a cut-out, with shorter lines. A larger one keeps the text in wider, calmer blocks.

## If it doesn't look right

| What you see | What to do |
| :---- | :---- |
| `woc check` reports **W032**: the image has no transparency, so it's set as a rectangle | The picture has no transparent pixels, or it isn't a PNG. Export it again as a PNG with a transparent background. A JPEG can't hold transparency. |
| `woc check` reports **W050**, a missing file | Check the path. `woc` reports W032 for a missing cut-out too, because it can't read an outline from a file it can't find. Fix the path first. |
| `woc check` reports **W031** for the picture | Its `cols` don't fit a smaller grid. Add `cols@tablet=` and `cols@phone=`. |
| The text keeps far away from the subject | Lower `wrap-offset`, or raise `alpha-threshold` if the subject has soft edges. |
| Words are squeezed into thin strips, or strips stay empty | Change `min-slot` on the body style. The render check reports a **Strip too narrow** where a blank strip runs beside a picture: try a different `width`, or `side=full`. |
| Lines beside the picture are very short on a phone | Add `side@phone=full`, so the text runs above and below the picture there. |

Every attribute used here is listed in [Commands and attributes](../reference/commands.md). The render check is described in [Check and polish a page](check-and-polish.md).

## Next

- [Add pictures](add-pictures.md): sizes, crops and where pictures go.
- [How pictures find their place](../understand/how-pictures-find-their-place.md): why a cut-out stays at its anchor, and other pictures move.
