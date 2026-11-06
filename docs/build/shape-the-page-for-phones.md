# Shape the page for phones

This guide shows you how to change what a page does on phones and tablets: a different size, place or picture for one screen size, things hidden on small screens, and grids and styles of their own. Most pages need very little of this, because Vanilla already gives phones a page of their own.

## Before you start

- A page that passes `woc check`. If you haven't made one, start with [Your first page](../start-here/your-first-page.md).
- `woc dev` running on it, so you can watch the page change as you narrow the window.

## What Vanilla already does on a phone

Vanilla, the built-in design, sets every page for four ranges of screen width, called **breakpoints**:

| Breakpoint | Screen width | Typically |
| :---- | :---- | :---- |
| `phone` | up to 639 pixels | phones |
| `tablet` | 640 to 1023 pixels | tablets, small windows |
| `compact` | 1024 to 1799 pixels | laptops |
| `wide` | 1800 pixels and up | large monitors |

On phones and tablets, Vanilla:

- sets the text in **one column that scrolls**, instead of columns set one screen at a time;
- lets **nothing float**: every picture, pull quote and fact box stands where you wrote it in the story, a column wide;
- uses a smaller grid (4 columns on a phone, 8 on a tablet), narrower margins, and slightly smaller text;
- runs the heading across the full width.

So a page in the **implicit form** (one with no scenes of its own) already reads well on a phone in Vanilla. The rest of this guide is for when you want something different.

## 1. Change one value for one breakpoint

Any attribute can take a different value at a breakpoint. Write the attribute again with `@` and the breakpoint's name:

```woc
%% part of a story
\figure[src=./pictures/nets.jpg, alt="Nets drying on the harbour wall", size=wide, size@wide=hero]
```

The picture is `wide` everywhere, and a `hero` on screens 1800 pixels and wider. Some useful ones:

- `cols@phone=all`: a frame or picture across the whole phone grid.
- `columns@phone=1`: one column of text on phones.
- `side@phone=full`: a picture that sits beside the text on wide screens takes the whole column on a phone.
- `src@phone=`: a different picture file, cropped for a tall screen (see [Add pictures](add-pictures.md#give-phones-their-own-crop)).
- `palette@phone=`: different colours for a scene on phones.

An `@` value wins over every other way of setting that attribute, for that breakpoint only. A few attributes, such as a command's `name`, can't change by breakpoint; [Commands and attributes](../reference/commands.md) marks them "not responsive".

## 2. Hide decoration on small screens

`hide@phone` leaves an element out on phones:

```woc
%% part of a story
\figure[src=./pictures/rope-detail.jpg, alt="A coil of rope on the quay", size=small, hide@phone]
```

Use it for decoration only: a second picture of the same thing, an ornament, a rule. Readers on phones are often the majority. Anything the story needs must reach them too.

## 3. Redefine a grid or a style for a breakpoint

To change a whole style or grid at one breakpoint, define it again with `at=`:

```woc
%% part of the design head, after the frontmatter, or in a theme
\style[name=headline, at=phone, size=34px]
\grid[name=default, at=phone, margin-x=20px]
```

An `at=` definition changes only what it names, at that breakpoint. Everything else comes from the base definition.

Watch for the opposite case too. A value you set without `at=` applies at every breakpoint, and it wins over Vanilla's own phone values. `\style[name=body, size=20px]` gives phones 20-pixel text as well. If you want phones to keep a smaller size, say so with `\style[name=body, at=phone, size=18px]`.

## 4. Make scenes fit the smaller grids

When you place frames and pictures on grid columns yourself, in a **scene** (a full-width band with its own grid), check that every `cols=` range exists on each breakpoint's grid. `cols=9-12` makes sense on 12 columns, but a tablet has 8 and a phone 4.

When a range doesn't fit, the engine **linearizes** the scene at that breakpoint: it stacks every frame and picture in the order you wrote them, across the full width, in one column. That's often what a phone needs, but it's a fallback, so `woc check` warns **W031**. You have two ways to answer it:

- **Give the smaller breakpoints their own columns** with `cols@tablet=` and `cols@phone=`.
- **Ask for the stacking** with `linearize@phone=true` on the scene. The page is the same, and the warning goes away, because now you asked for it.

Here's a page with both. The opener gives its heading frame columns for each breakpoint. On a tablet, the second scene puts the picture and the text in the same columns, so the text goes under the picture. On phones it asks for stacking. `measure=600px` keeps the text's lines from growing too long on very wide screens:

```woc
---
wocument: 1
title: The Net Makers
lang: en-GB
---
\scene[name=opener, height=screen]{
  \figure[src=./pictures/net-shed.jpg, alt="", layer=background, focus="40% 60%", loading=eager]
  \frame[cols=1-7, rows=4-6, cols@tablet=1-6, cols@phone=all, valign=bottom]{
    \kicker{Harbour · Craft}
    \headline{The Net Makers}
    \deck{In a shed behind the fish market, three people mend every net in the harbour by hand.}
  }
}

\scene[name=shed, linearize@phone=true]{
  \figure[src=./pictures/needle.jpg, alt="A wooden netting needle loaded with green twine", cols=1-5, cols@tablet=2-7, ratio=4:5]
  \frame[cols=7-12, cols@tablet=2-7, measure=600px]{
    The shed has one long table and a stove that is never allowed to go out. Nets come in over the shoulders of the crews, wet and heavy and torn, and go back out a day or two later, dry and whole.

    Most of the work is reading the damage. A tear from a rock looks nothing like a tear from a seal, and each needs a different repair. The oldest of the three can tell from the shape of a hole which part of the bay a boat has been fishing.
  }
}
```

On a phone, the `shed` scene shows the picture, then the text under it, in the order they're written. Put things in the order a phone reader should meet them.

A picture written inside the text that doesn't fit a grid linearizes on its own: it takes the column's full width, with the text above and below it, and `woc check` names that picture in its W031.

## Let a row of pictures rewrap

A **row group** sets pictures (or frames) side by side and wraps them onto new rows when the screen gets narrower, so you don't need any `@` values:

```woc
%% part of a scene: three pictures side by side, one under another on a phone
\group[layout=row, cols=all]{
  \figure[src=./pictures/needle.jpg, alt="A netting needle", min-width=4col, ratio=4:5]
  \figure[src=./pictures/gauge.jpg, alt="A wooden mesh gauge", min-width=4col, ratio=4:5]
  \figure[src=./pictures/knot.jpg, alt="A finished knot in green twine", min-width=4col, ratio=4:5]
}
```

`min-width=4col` keeps each picture at least four columns wide. On the 12-column grid three fit in a row. On a tablet's 8 columns two fit, and on a phone's 4, one: each picture gets a row of its own.

## Check the result

Look at the page at three widths at least: a phone, a laptop and a large screen.

1. **In the editor.** In `woc dev`, make the browser window narrow, to about the width of a phone, then wide again. The page lays itself out again as you resize.
2. **On a real phone.** Start the editor with `--host`:

   ```bash
   woc dev net-makers.woc --host
   ```

   The terminal prints a network address. Open it on a phone on the same Wi-Fi. You can only save from your computer.
3. **With `woc check`.** It lays the page out at five test widths, 360, 768, 1280, 1470 and 2560 pixels, and warns **W064** where body lines are too short or too long at any of them. On a phone, 30 characters a line or more is fine.
4. **With the render check.** It takes screenshots of every screen at 390, 1280 and 1920 pixels, so you can look at all three side by side. [Check and polish a page](check-and-polish.md) shows how to run it.

## If it doesn't look right

| What you see | What to do |
| :---- | :---- |
| **W031**: a scene will linearize at a breakpoint | Add `cols@tablet=` or `cols@phone=` to the frame or object it names, or `linearize@phone=true` to the scene if stacking is what you want. |
| **W031** naming one picture or pull quote | Add `cols@phone=` (and `cols@tablet=`) to that object. |
| **W064** at 360px | Phone lines are too short. Check for a picture beside the text (`side@phone=full`), or a smaller text size. |
| An error that a story has no visible frame at a breakpoint | You hid every frame that shows that story with `hide@`. Leave at least one visible at each breakpoint. |
| The page scrolls sideways on a phone | Something is wider than the screen: often a fixed `width` or `max-width` in pixels. The render check reports this as an error. |
| A phone screen is very tall and nearly empty | A `height=screen` scene holds too little, or too much, for a phone. Shorten the text in it, or give that scene's frames other columns at `phone`. |
| On a phone, things appear in the wrong order | A linearized scene stacks things in the order you wrote them. Reorder them in the source. |

The breakpoints, and how to define your own, are in [Commands and attributes](../reference/commands.md) under `\breakpoint`. [Columns, screens and the baseline grid](../understand/columns-and-screens.md) explains why a phone gets one scrolling column.

## Next

- [Add pictures](add-pictures.md)
- [Check and polish a page](check-and-polish.md)
