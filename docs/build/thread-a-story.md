# Thread a story through scenes

This guide shows you how to write an article's text once and have it run through several scenes: an opener, a page of columns, a full-screen pause, and more columns after it. You'll end with a complete file you can adapt.

## When you need this

A file with no `\scene` in it uses the **implicit form**: Wocument puts your heading in one frame and the rest of the text in columns below it, all in one page scene. That's the right choice for most features.

Move beyond it when the design needs more than one **scene**: a full-width band of the page with its own grid, colours and height. The usual reasons:

- an opener that fills the first screen on its own, in a different colour;
- a pause in the middle of the article, such as a full-screen quote or picture, after which the text carries on;
- a change of layout part-way through, such as two columns, then a single wide column.

Each of those needs the text to stop in one scene and pick up again in another. That's what a threaded story does.

## Before you start

- You have `woc` installed ([Install Wocument](../start-here/install.md)) and you've made [your first page](../start-here/your-first-page.md).
- Optional, but it helps: [Scenes, stories and frames](../understand/scenes-stories-frames.md), which explains the model this guide uses.

## Steps

### 1. Put the text in a story

A **story** is a named run of text. Write it once, outside any scene, with `\story` and a `name`:

```woc
%% part of a document: after the frontmatter and any design definitions
\story[name=main]{
  \dropcap[lines=3]
  The harbour master's office keeps two clocks. One tells the time like any other.

  \subhead{Reading the water}

  The clock gives the shape of the day, not the detail.
}
```

Inside a story you write exactly what you'd write in the implicit form: paragraphs, subheads, a drop cap, pull quotes and pictures. A story doesn't appear anywhere by itself. It needs frames.

### 2. Show it in frames

A **frame** is a rectangle on a scene's grid that holds text. A frame with `story=` shows a slice of that story instead of its own text, so it takes no braces:

```woc
%% part of a document: one page scene showing the story in two columns
\scene[name=morning, height=page]{
  \frame[story=main, cols=2-11, columns=2, cols@tablet=all, columns@tablet=1, cols@phone=all, columns@phone=1]
}
```

- `cols=2-11` places the frame on columns 2 to 11 of the scene's 12-column grid.
- `columns=2` sets the text inside the frame in two columns.
- The `@tablet` and `@phone` values give smaller screens the whole width and one column, which is what Vanilla's implicit form does too.

Every frame with `story=main` belongs to the story's **thread**. The text fills the first frame, then carries on in the next at the exact word where the first one stopped, and so on, across scenes.

### 3. Tell the first frame where to stop

A frame in a page scene grows to hold its text. Left alone, the first frame takes the whole story, and later frames stay empty.

To send the rest of the story on, put `\framebreak` in the story where the first frame should end:

```woc
%% part of a story
When the water is high enough, the first boat goes, then the rest.

\framebreak

The afternoon belongs to the harbour itself.
```

Everything before `\framebreak` stays in the current frame. Everything after it goes to the next frame in the thread.

There are two kinds of break:

| You write | It ends | Use it for |
| :---- | :---- | :---- |
| `\framebreak` | the whole frame, all its remaining columns | moving the rest of the story to the next scene |
| `\framebreak[column]` | only the current column; the text goes on in the frame's next column | starting a new section at the top of a column |

A plain `\framebreak` in the first of two columns leaves the second column empty. That's deliberate: if you want the text to go on in the next column, use `\framebreak[column]`.

### 4. Know how much text a frame takes

Frames take text in one of two ways:

| Frame | Takes |
| :---- | :---- |
| **Automatic height** (the default in flow and page scenes) | everything up to the next `\framebreak`, or to the end of the story |
| **Definite height**: `height=` with a length, or any frame in a `screen` scene | only as many lines as fit; the rest goes to the next frame |

So in page scenes you decide where the text breaks with `\framebreak`. In a screen scene the frame's size decides: a frame on rows 5 and 6 of the opener takes the first few lines, and the story carries on in the next frame.

### 5. Put the frames in order

The thread runs in **scene order, then source order**: every frame in the first scene, top to bottom as you wrote them, then every frame in the second scene, and so on. A scene with no frame for the story, such as an interlude, is skipped, and the text resumes in the next scene that has one.

Where the `\story` sits in the file doesn't matter. Most writers put it before the scenes, so the words come first and the layout after.

## A worked example

Here's a whole article. It opens with a dark heading that fills the first screen, sets the first half of the story in two columns, pauses on a full-screen quote, then continues the story in two more columns.

```woc
---
wocument: 1
title: The Tide Clock
lang: en-GB
---
\palette[name=night, paper=#121315, ink=#eeeae2, muted=#a39e94, accent=#e2a564, rule=#2c2d31]

\story[name=main]{
  \dropcap[lines=3]
  The harbour master's office keeps two clocks. One tells the time like any other. The second has a single hand and no numbers, only the words high and low painted on opposite sides of the dial, and it is the one everybody in the room looks at first.

  The tide clock was fitted in the year the new quay opened. Before that, the times of the tides were chalked on a board by the door each morning, copied from a printed table that the harbour master collected from the post office every January. The board is still there, under a coat of green paint.

  A tide runs slightly late each day, by a little under an hour, so the hand never points at the same word at the same hour twice in a row. Fishermen learn the rhythm without thinking about it. Visitors ask why the clock is wrong.

  \subhead{Reading the water}

  The clock gives the shape of the day, not the detail. Wind from the south-west can hold the water in the harbour for an hour longer than the table says, and a spell of high pressure can keep it out. The people who work here read the water first and the clock second.

  On the busiest mornings the boats queue at the harbour mouth, engines idling, waiting for enough depth over the bar. Nobody tries to cross early. The bar has taken two boats in living memory, and everyone on the quay can name the crews.

  When the water is high enough, the first boat goes, then the rest in an order that nobody wrote down and everybody knows. By the time the clock's hand has moved a finger's width, the harbour is empty.

  \framebreak

  The afternoon belongs to the harbour itself. With the boats out, the quay is swept, the ice plant is serviced, and the harbour master walks the length of the wall checking the ladders and the rings.

  The boats come back on the evening tide. The order they return in is different from the order they left in, and it says more about the day than any logbook. A boat back early has had a good catch, or a bad engine.

  \subhead{After dark}

  At night the office is locked, but the tide clock can be seen through the window, lit by the lamp over the door. People walking home stop to look at it. Some of them have never been on a boat, and still they check where the hand is, as if it were the weather.

  The clock has been repaired twice and repainted four times. Each time, the harbour master has been asked whether it is still needed, now that the tide times arrive on every phone. Each time the answer has been the same: the phone tells you the time of the tide, the clock tells you where you are in it. \endmark
}

\scene[name=opener, height=screen, palette=night]{
  \frame[cols=1-8, rows=4-6, cols@tablet=all, cols@phone=all, valign=bottom]{
    \kicker{Coast · Work}
    \headline{The Tide Clock}
    \deck{In one small harbour, the day is set by the water, not the hour.}
    \byline{By Morgan Hale}
  }
}

\scene[name=morning, height=page]{
  \frame[story=main, cols=2-11, columns=2, cols@tablet=all, columns@tablet=1, cols@phone=all, columns@phone=1]
}

\scene[name=interlude, height=screen, palette=night]{
  \frame[cols=3-10, rows=3-4, cols@tablet=all, cols@phone=all, valign=center]{
    \pullquote{The phone tells you the time of the tide. The clock tells you where you are in it.}
  }
}

\scene[name=evening, height=page]{
  \frame[story=main, cols=2-11, columns=2, cols@tablet=all, columns@tablet=1, cols@phone=all, columns@phone=1]
}
```

What each part does:

- **The design head.** `\palette[name=night, ...]` defines a dark set of colours. Vanilla has only a light palette, so the file adds its own. [Make a theme](make-a-theme.md) shows how to keep definitions like this in a separate file.
- **`opener`** is a `screen` scene: exactly one screen tall, divided into six rows. Its frame owns its own text (an **inline frame**, with braces) and sits on the lower rows. It isn't part of the thread.
- **`morning`** is a `page` scene: at least one screen tall, and taller when its text needs it. Its frame has automatic height, so it takes the story up to `\framebreak`.
- **`interlude`** pauses on a quote in the dark palette. It has no frame for `main`, so the thread skips it.
- **`evening`** has the next frame in the thread, so the story resumes there with "The afternoon belongs to the harbour itself."

### Start the story on the opener (optional)

To begin the text on the first screen, under the heading, give the opener a threaded frame too. Because it's in a screen scene, it takes only the lines that fit on its rows, and the story goes on in `morning`:

```woc
%% part of the opener scene: move the heading up to rows 3-4 and add this frame after it
\frame[story=main, cols=2-7, rows=5-6, measure=640px, cols@tablet=all, cols@phone=all]
```

The thread is now opener, morning, evening. `measure=640px` caps the line length, so lines stay comfortable on wide screens.

## Check the result

Run `woc check` on the file:

```bash
woc check tide-clock.woc
```

It should print nothing: no errors and no warnings. Then open it with `woc dev tide-clock.woc` and scroll through:

- On a laptop, the first screen is dark, with the heading low on the screen.
- The next screen sets the opening in two columns. The second column ends with "the harbour is empty", and a small arrow at its foot shows that the story continues.
- A dark screen holds the quote.
- The two columns after it start with "The afternoon belongs to the harbour itself" and end with the end mark.
- On a phone-width window, every scene is one column, in the same order.

## If it doesn't look right

**The second frame is empty, and the first one holds everything.** The first frame has automatic height, so it took the whole story. Add `\framebreak` where it should stop.

**A column is empty after a `\framebreak`.** A plain `\framebreak` ends all the frame's remaining columns. Use `\framebreak[column]` to move to the next column instead.

**Text you expected later appears too early, or in the wrong scene.** Check the order of your frames. The thread follows scene order, then source order inside each scene, wherever the `\story` is written.

**`woc check` says a frame "shows unknown story".** The `story=` value doesn't match any `\story[name=...]`. Check the spelling: names are exact.

**`woc check` says a story "has no visible frame".** Every story needs at least one frame, at every screen size. If you hide a frame on phones (`hide@phone`), another frame for the same story must stay visible there.

**Error P044, "\frame has both `story=` and a body".** A threaded frame shows its story's text, so it can't have its own. Remove the braces, or remove `story=`.

**Error P041, "Top-level content in a document that has scenes".** Once a file has a `\scene`, every paragraph must be inside a story or a frame. Move stray text into the `\story`.

**Warning W031: a scene "will linearize".** A frame's `cols` don't fit the smaller grid on a tablet (8 columns) or a phone (4). Add `cols@tablet=` and `cols@phone=` values, as in the example.

**Warning W064: lines too short or too long.** Change the frame's `cols`, its `columns`, or add `measure=`. In the example, `cols=1-8` with two columns gave lines of about 37 characters on a laptop; `cols=2-11` brings them back into the comfortable range.

**A `\framebreak` seems to do nothing.** When there's no next frame in the thread, the engine ignores the break and the text carries on where it is.

> **⚑ Flag:** The specification gives a layout warning, W040, for a `\framebreak` with nowhere to go. The engine doesn't report it yet: today the break is ignored silently. Until it does, check that every `\framebreak` has a frame after it in the thread.

### Text left over at the end

**Overset** is text left over after the last frame in the thread is full. A story's `overset` attribute decides what happens:

| `overset=` | What happens |
| :---- | :---- |
| `grow` (default) | The last frame grows to fit the rest of the text, and a screen scene grows taller than the screen. No text is ever lost. |
| `clip` | The leftover text isn't shown. |
| `error` | The build should fail. |

Overset only arises when the last frame has a definite height, such as a frame in a screen scene. Frames with automatic height grow anyway.

> **⚑ Flag:** This page describes `clip` and `error` as the specification does (§09.5). Today the engine treats both the same way: leftover text is hidden, with no warning, and `error` doesn't fail `woc check` or `woc build`. Until that's built, keep the default, `grow`, unless losing the text is what you want.

## Next

- [Scenes, stories and frames](../understand/scenes-stories-frames.md) explains why Wocument separates the text from the frames that show it.
- [Columns, screens and the baseline grid](../understand/columns-and-screens.md) explains how a page scene sets columns one screen at a time.
- [Commands and attributes](../reference/commands.md) lists every attribute of `\story`, `\frame` and `\framebreak`.
