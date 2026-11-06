# Open with a full-screen scene

Many magazine features open on a spread: one big photograph, the headline set over it, and the story starting on the next page. In this lesson you'll give the Night Bakers article that kind of opening, a dark first screen with the photograph behind the headline, and then the columns.

On the way you'll meet the three ideas behind every Wocument layout that goes beyond one page: **scenes**, **stories** and **frames**. It takes about twenty minutes.

## What you need

- The finished files from [Lay out a magazine feature](lay-out-a-feature.md): `night-bakers.woc`, `edition.woct` and `pictures/back-door.jpg`.
- `woc dev night-bakers.woc` running.

## The idea in one minute

So far your article has been a single **scene**: one full-width band of the page, with its own grid, colours and height. Wocument made it for you, because the file had no scenes of its own. That's the **implicit form**, and for a feature it's a strong default.

To open with a full-screen picture, you need two scenes stacked one above the other: an opening screen, then the page with the columns. Changing scene is the screen's version of turning a page.

When a page has more than one scene, the text needs a home that isn't tied to one of them. That home is a **story**: the article's running text, with no position of its own. A **frame** is a rectangle in a scene that shows a story's text. You'll write the story once, and point a frame at it.

## 1. Add a dark palette to the theme

The opener needs light text on a dark picture. Add a second palette to `edition.woct`, after the first one:

```woc
%% part of edition.woct: add this after the default palette
\palette[name=night, paper=#14110e, ink=#f3ede3, muted=#b3a99b, accent=#e98a5c, rule=#3a332b]
```

A scene that uses `palette=night` swaps all five roles at once. Every style in it, from the kicker to the byline, picks up the night colours without a single change of its own.

## 2. Put the text in a story

In `night-bakers.woc`, make three changes:

1. **Delete the picture** in the middle of the article: the `\figure` line, its `\caption` and its closing `}`. The same photograph is about to fill the opening screen, and one appearance is enough.
2. **Leave the heading lines** (`\kicker` to `\byline`) where they are for now. They move to the opener in step 3.
3. **Wrap the rest** of the article, everything from `\dropcap` down to `\bio`, in `\story[name=main]{` and a closing `}`.

```woc
%% part of a document: the running text, now a story
\story[name=main]{
  \dropcap[lines=3]
  The first oven goes on at eleven. By midnight the street outside is quiet, ...

  %% ...every paragraph, subhead, pull quote and the fact box, as before...

  \bio{Sam Rivera writes about the people who keep cities running at night.}
}
```

Indent the inside if you like. Wocument ignores indentation, but it makes the file easier for you to read.

The page in the editor stops changing (it keeps showing the last version that worked), and the **Problems** tab reports an error. That's expected: a story by itself is never shown. It needs a frame in a scene.

## 3. Build the opening screen

Add the first scene after the story, and move the heading lines (`\kicker` to `\byline`) from the top of the file into its frame:

```woc
%% part of a document: the opening scene, after the story
\scene[name=opener, height=screen, palette=night]{
  \figure[src=./pictures/back-door.jpg, alt="", layer=background, fit=cover]
  \frame[cols=1-7, rows=4-6, cols@tablet=all, cols@phone=all, valign=bottom]{
    \kicker{City · Work}
    \headline{The Night Bakers}
    \deck{While the city sleeps, a few dozen people make sure there is bread in the morning.}
    \byline{By Sam Rivera}
  }
}
```

Piece by piece:

- `height=screen` makes the scene exactly one screen tall, whatever the screen.
- `palette=night` uses the dark palette from step 1.
- The figure has `layer=background`, so it fills the whole scene behind everything else, and `fit=cover`, so it fills it edge to edge and crops what doesn't fit. Its `alt` is empty on purpose: here the photograph sets a mood, and the headline over it already says what the page is about. A screen reader skips a picture with `alt=""`.
- The frame holds its own text: the heading lines you moved here. `cols=1-7` puts it on the first seven of the grid's twelve columns. `rows=4-6` puts it in the lower half: a screen scene is divided into six rows. `valign=bottom` sits the text at the bottom of that space.
- `cols@tablet=all` and `cols@phone=all` give tablets and phones the full width. Their grids have only eight and four columns, so "seven of twelve" doesn't mean the same thing there. An attribute with `@` and a screen size applies at that size only.

## 4. Pour the story into the page

Add the second scene, after the opener:

```woc
%% part of a document: the page scene, after the opener
\scene[name=story, height=page]{
  \frame[story=main, cols=all, columns=auto, columns@wide=4, columns@tablet=1, columns@phone=1, measure=600px]
}
```

This frame has no text of its own. `story=main` tells it to show the story you wrote in step 2. Everything else rebuilds what the implicit form gave you for free:

- `height=page` makes a magazine page: the text is set in columns one screen at a time, and pictures and boxes float to good spots.
- `cols=all` uses the full width of the grid.
- `columns=auto` and `measure=600px` take as many columns as keep each line under 600 pixels wide, about 60 characters.
- `columns@wide=4` gives large monitors four columns, and `columns@tablet=1` and `columns@phone=1` keep tablets and phones in one scrolling column.

Save. The article now opens on a dark screen with the photograph behind the headline. Scroll, and the page turns to the cream columns you had before.

## 5. Check it

```bash
woc check night-bakers.woc
```

No errors. If you see W064, it's the line-length warning from the earlier lessons.

> **⚑ Flag:** W064 on Vanilla's own columns is the same open item as in [Your first page](../start-here/your-first-page.md#7-check-the-page). This lesson assumes it's fixed.

If you see W031, a frame's columns don't fit a smaller screen's grid, and Wocument has stacked that scene into one column there. Check that you kept `cols@tablet=all, cols@phone=all` on the opener's frame.

Then look at the page on a phone-width window. The opener is still one screen tall, the headline sits at its foot, and the story follows in one column.

## What just happened

You split one article into two **scenes**, stacked one above the other: a `screen` scene for the opening and a `page` scene for the text. Each scene can have its own palette, its own grid and its own height.

You moved the running text into a **story**, which has no place on the page by itself, and showed it through a **frame** in the page scene. That separation is what makes bigger layouts possible. A story can run through several frames, across several scenes, and pick up where it left off each time, as text does from page to page in a magazine. [Thread a story through scenes](../build/thread-a-story.md) shows how.

Here are both files, finished.

The theme, with the new palette:

```woct file=edition.woct
%% The look of every article in the City at Night series.
\token[name=oven, value=#b4471f]
\palette[name=default, paper=#f8f4ec, ink=#1d1a16, muted=#6a6258, accent=$oven, rule=#e4dccd]
\palette[name=night, paper=#14110e, ink=#f3ede3, muted=#b3a99b, accent=#e98a5c, rule=#3a332b]

\style[name=headline, weight=500, tracking=-0.015em]
\style[name=kicker, color=accent]
\style[name=caption, italic=false]
```

The article:

```woc
---
wocument: 1
title: The Night Bakers
lang: en-GB
theme: ./edition.woct
---
\folio[position=top-right, progress]{City at Night}

\story[name=main]{
  \dropcap[lines=3]
  The first oven goes on at eleven. By midnight the street outside is quiet, and the only light on the block comes from the bakery's back door, propped open with a sack of flour to let the heat out.

  Most of the work is waiting. Dough needs time, and nobody can hurry it. The bakers fill the hours with the jobs that don't need daylight: weighing salt for tomorrow, scraping the long wooden benches, folding the dough that went into the tubs at nine so that it rises evenly and keeps its strength.

  There are four of them tonight. The youngest started in the spring and still writes everything down in a notebook that lives in her apron pocket. The oldest has worked nights for thirty years and says he no longer knows what afternoons are for.

  \subhead{Shaping}

  At two o'clock the room changes. The dough comes out of the tubs onto floured benches, and the bakers cut it into pieces by eye, checking each one on a scale they hardly need. Then comes the shaping: a fold, a turn, a tuck, until each loaf has a tight skin that will hold its shape in the oven.

  It looks like one movement. It's actually dozens, and each baker does them slightly differently. You can tell who shaped a loaf, they say, by the way the seam sits underneath.

  \pullquote{You can tell who shaped a loaf by the way the seam sits underneath.}

  The shaped loaves rest in linen-lined baskets for another hour. Nobody talks much during this part. The radio is on low, the mixer is being washed, and someone is always sweeping flour from a corner it shouldn't have reached.

  \sidebar[bg=rule, inset=1bl]{
    \title{One night, in numbers}
    Four bakers, one oven, and about six hundred loaves.

    The first van leaves at six. The shop opens at seven.
  }

  \subhead{Into the oven}

  Baking starts at four. The oven is loaded with a long wooden peel, twenty loaves at a time, and steam is pumped in for the first few minutes so the crust stays soft long enough for the bread to rise. Then the steam is let out, the crust sets, and the colour comes.

  By six the first van is loaded. The cafés on the high street get theirs first, then the school, then the two restaurants that open for breakfast. The last trays go into the shop window at half past six, still crackling as they cool.

  The bakers leave as the morning shift arrives. They pass each other in the doorway with a few words about the oven, the weather, a delivery that was late. Then the night bakers go home to sleep, and the city wakes up to bread it never sees being made. \endmark

  \bio{Sam Rivera writes about the people who keep cities running at night.}
}

\scene[name=opener, height=screen, palette=night]{
  \figure[src=./pictures/back-door.jpg, alt="", layer=background, fit=cover]
  \frame[cols=1-7, rows=4-6, cols@tablet=all, cols@phone=all, valign=bottom]{
    \kicker{City · Work}
    \headline{The Night Bakers}
    \deck{While the city sleeps, a few dozen people make sure there is bread in the morning.}
    \byline{By Sam Rivera}
  }
}

\scene[name=story, height=page]{
  \frame[story=main, cols=all, columns=auto, columns@wide=4, columns@tablet=1, columns@phone=1, measure=600px]
}
```

## Next

- [Scenes, stories and frames](../understand/scenes-stories-frames.md) explains the model you just used.
- [Thread a story through scenes](../build/thread-a-story.md) runs one story through several frames, with an interlude between them.
- [Shape the page for phones](../build/shape-the-page-for-phones.md) covers every way to adjust a page for small screens.
