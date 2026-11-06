# Add pictures

This guide shows you how to put photographs on a page, crop them, steer where they land on wide screens, and keep them light enough to load fast. It assumes you've made [your first page](../start-here/your-first-page.md).

## Before you start

- A page that passes `woc check`.
- Your pictures as JPEG, PNG or GIF files. Give the largest version you have, up to about 2400 pixels on its long side (see [Picture files](#picture-files) below).
- A place to keep them. Two choices work:
  - **Next to your `.woc` file**, in a folder such as `pictures/`. Write the path with `./` in front: `src=./pictures/pruning.jpg`. It's read from the folder your `.woc` file is in.
  - **In a `public` folder** shared by several pages. Write the path with `/` in front: `src=/img/pruning.jpg`. `woc` looks for it in `./public` unless you give another folder with `--public`.

## Add a picture with a caption

Write a `\figure` between two paragraphs, where the picture belongs in the story:

```woc
%% part of a story: between two paragraphs
\figure[src=./pictures/pruning.jpg, alt="A woman on a ladder cutting a branch from a bare apple tree"]{
  \caption{Pruning starts in December, once the leaves are down.}
  \credit{Photograph: Lena Park}
}
```

- `src` is the picture file.
- `alt` describes what the picture shows, for readers who can't see it. Write `alt=""` only for a picture that is pure decoration.
- `\caption` says what the reader can't see for themselves: who, where, when. `\credit` names the photographer. Both are optional, and both travel with the picture wherever it goes.

The place where you write the figure is its **anchor**. On a phone the picture stands exactly there. On a wide screen it may move a little, as the next sections explain.

## Crop it

A picture keeps its own shape unless you give it another one. Three attributes control the crop:

```woc
%% part of a story
\figure[src=./pictures/ladder.jpg, alt="A ladder against a tree, a basket of cut branches below", ratio=4:5, focus="50% 30%"]
```

- `ratio=4:5` gives the picture a box four units wide and five tall. Any `width:height` works: `3:2`, `16:9`, `1:1`.
- `fit=cover` (the default) fills the box and crops what doesn't fit. `fit=contain` shows the whole picture inside the box instead.
- `focus="50% 30%"` is the point that stays in view when the picture is cropped: 50% across, 30% down. Use it to keep a face or a horizon in the frame.

Avoid `fit=fill`. It stretches the picture to the box, and people look wrong stretched.

## Steer where it goes

On a laptop or a larger screen, Wocument sets a story in columns, one screen at a time. A picture there **floats**: the engine looks for the best **spot** for it on its anchor's screen, the screen before, or the screen after, never further away.

Spots are the places a theme allows: across the top of the screen, at the foot of a few columns, at the top of one column, or beside the text at the anchor. [How pictures find their place](../understand/how-pictures-find-their-place.md) explains how the engine chooses.

On phones and tablets nothing floats. The page is one column, and every picture stands at its anchor, a column wide.

You steer a floating picture in three ways.

**Say how big it should be** with `size`:

| `size=` | On a wide screen |
| :---- | :---- |
| `hero` | The picture the screen is about, across all the columns or all but one, at the top. One per screen. |
| `wide` | Two or three columns, at the top or the foot of the screen. |
| `column` | One column, at the top or the foot of the screen, or at the anchor. |
| `small` | Half a column, at the anchor, with text beside it. |
| `auto` | The default. The engine chooses from the picture's shape: a landscape picture leans to `wide`, a portrait to `column`. |

**Say where it should go** with `place`:

| `place=` | The picture goes |
| :---- | :---- |
| `float` | The default: the best spot near its anchor. |
| `here` | Exactly at its anchor. |
| `top`, `bottom` | At the top or the foot of a screen near its anchor. |
| `screen` | On a screen of its own. |

**Move the anchor.** Writing the figure a paragraph or two later moves the window of screens it can land on.

```woc
%% part of a story
\figure[src=./pictures/orchard-rows.jpg, alt="Rows of bare apple trees in frost", size=hero, place=top]{
  \caption{The orchard in January: forty rows, eleven hundred trees.}
}
```

Both attributes can change by screen size: `size=wide, size@wide=hero` makes a picture a hero only on screens 1800 pixels and wider. [Shape the page for phones](shape-the-page-for-phones.md) explains these `@` values.

A screen holds at most three floating objects and one hero, and no picture is taller than 85% of the screen inside its margins. When a picture doesn't fit those rules near its anchor, it waits for the next screen. Asking for a smaller `size` usually helps.

## Put the caption beside or over the picture

`caption-side` moves the caption and credit:

- `below` (the default) or `above` the picture.
- `overlay`, laid over the picture itself. An overlaid caption takes no room of its own, so check that it stays readable over the picture.

## Load the first picture straight away

Pictures load as the reader scrolls towards them, which keeps the first screen fast. A picture that is on the first screen should load at once instead. Give it `loading=eager`:

```woc
%% part of a story: the first picture on the page
\figure[src=./pictures/orchard-rows.jpg, alt="Rows of bare apple trees in frost", size=hero, loading=eager]
```

Use it for that one picture only. Every eager picture competes with the first screen.

## Give phones their own crop

A wide landscape picture comes out small on a phone, and its subject can get lost. `src@phone=` gives phones a different file, cut for a tall screen:

```woc
%% part of a story
\figure[src=./pictures/orchard-rows.jpg, src@phone=./pictures/orchard-rows-tall.jpg, alt="Rows of bare apple trees in frost"]
```

Crop the phone version yourself, so that the subject is where you want it.

## Put a picture behind a whole scene

An opening picture with the headline over it is a **scene** of its own: a full-width band of the page with its own grid and colours. Write the picture with `layer=background`, and it fills the whole scene behind everything else:

```woc
---
wocument: 1
title: The Winter Orchard
lang: en-GB
---
\palette[name=frost, paper=#14181c, ink=#f1f3f4, muted=#a9b1b8, accent=#e3b26b, rule=#2c3238]

\scene[name=opener, height=screen, palette=frost]{
  \figure[src=./pictures/orchard-dawn.jpg, alt="", layer=background, focus="50% 70%", loading=eager]
  \frame[cols=1-7, rows=4-6, cols@tablet=1-6, cols@phone=all, valign=bottom]{
    \kicker{Country · Work}
    \headline{The Winter Orchard}
    \deck{When the trees are bare, the year's real work begins.}
  }
}

\scene[name=story, height=page]{
  \frame[cols=all, columns=auto, columns@tablet=1, columns@phone=1]{
    The pruning crew arrives in the dark and starts on the oldest trees first. Each one gets a few minutes of looking before anyone cuts, because a branch taken off in winter decides where the fruit will hang for the next ten years.

    By mid-morning the rows are full of ladders and the sound of saws. The cut branches go into baskets at the foot of each tree, and a tractor collects them at noon for the chipper at the end of the lane.
  }
}
```

- `height=screen` makes the opener exactly one screen tall, divided into six rows. The headline frame takes the lower three, `rows=4-6`.
- The background picture's `alt` is empty, because it sets a mood rather than showing something the reader needs.
- The opener uses a dark palette, `frost`, so the light text stays readable over the photograph. Choose a picture with a calm, dark area where the headline goes.

[Open with a full-screen scene](../learn/open-with-a-scene.md) builds an opener like this step by step.

## Show a set of pictures together

A `\gallery` groups pictures into one object, with one caption for the set:

```woc
%% part of a story
\gallery[per-row=3, ratio=4:5]{
  \figure[src=./pictures/saw.jpg, alt="A pruning saw hanging from a branch"]
  \figure[src=./pictures/cut.jpg, alt="A fresh cut sealed with wax"]
  \figure[src=./pictures/basket.jpg, alt="A basket full of cut branches"]
  \caption{The tools of the job: a saw, wax for the cuts, and baskets for what comes off.}
}
```

- `per-row` sets how many pictures stand in a row (3 by default).
- `ratio` crops every picture in the set to the same shape.
- `layout=strip` makes a row the reader swipes sideways instead.

For pictures side by side in a scene, which rearrange themselves on a phone, use a row group. [Shape the page for phones](shape-the-page-for-phones.md#let-a-row-of-pictures-rewrap) shows one.

## Picture files

- **Formats.** Use JPEG for photographs, PNG for pictures with transparent parts, GIF for short animations. When you build the page, `woc` converts all three to WebP, which is usually much smaller. An animated GIF stays animated, and readers who turn motion off in their system settings see its first frame. To keep the original files, build with `woc build --no-webp`. WebP, AVIF and SVG files are served as they are.
- **Size.** Give pictures about 2400 pixels on their long side. Smaller pictures look soft on large, sharp screens; larger ones only make the page slower.

> **⚑ Flag:** Wocument doesn't yet make smaller copies of each picture for small screens (responsive picture sets). Today every picture is served once, as WebP, at the size you gave it, so a phone downloads the same file as a desktop. Until that's built, keep pictures at about 2400 pixels on the long side, not larger.

## Check the result

1. Run `woc dev` on your file and look at the page at full width. Each picture should sit near the paragraph you wrote it beside, at the size you asked for.
2. Press **V** on the page to open the visor. It shows the grid and the column bands, and tells you why each picture went where it did.
3. Make the window narrow. Every picture should now stand at its anchor, a column wide.
4. Run `woc check`. Once every file is in place and every picture has its `alt`, it reports no W050 or W033 warnings. If you see W064 at 1470px, that's the line-length warning on Vanilla's own columns described in [Your first page](../start-here/your-first-page.md#7-check-the-page), not something your pictures caused.

## If it doesn't look right

| What you see | What to do |
| :---- | :---- |
| `woc check` reports **W050**, a missing file | Check the path. A path starting with `./` is read from your `.woc` file's folder; one starting with `/` from `public` (or the folder you gave `--public`). |
| `woc check` reports **W033**, no `alt` | Describe the picture in `alt`. Use `alt=""` only for decoration. |
| A picture landed a screen away from its paragraph | That's allowed: a floating picture may go to the screen before or after its anchor. Use `place=here` to keep it at the anchor. |
| The render check says **Fallback: no spot**, or a picture ended up far from its text | No spot near the anchor could hold it. Try a smaller `size` (`column` or `small`), or anchor it a paragraph or two later. |
| The render check says **Photograph cropped** or **Photograph grown** | The engine trimmed or extended a photograph by a few lines so the columns reach the foot of the screen. Check the crop, and set `focus=` so the subject stays in view, or `fit=contain` if the picture must show whole. |
| The render check says **Empty room inside a column** | A picture left a hole in a column. Move its anchor, or change its `size`. |
| The subject is cut off on a phone | Set `focus=`, or give phones their own file with `src@phone=`. |

The render check is described in [Check and polish a page](check-and-polish.md). Every attribute of `\figure` and `\gallery` is listed in [Commands and attributes](../reference/commands.md).

## Next

- [Wrap text around a cut-out](wrap-text-around-a-cut-out.md): text that follows the outline of a picture.
- [How pictures find their place](../understand/how-pictures-find-their-place.md): why the engine puts pictures where it does.
