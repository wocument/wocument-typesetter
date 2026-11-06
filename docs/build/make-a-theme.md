# Make a theme

This guide shows you how to put a design in a theme file, so that every page of an edition shares the same colours, type and grid. You change the design in one place, and every page that loads the theme follows.

## Before you start

- A page that passes `woc check`. If you haven't made one, start with [Your first page](../start-here/your-first-page.md).
- An idea of what you want to change from **Vanilla**, Wocument's built-in design. A theme only needs to say what's different: everything it doesn't name stays as Vanilla has it. [Vanilla](../reference/vanilla.md) lists every value.

## 1. Create the theme file

A **theme** is a `.woct` file next to your pages. It holds **definitions** only: named colours, styles, grids and the like. It has no frontmatter, no text and no scenes, and it can't hold a `\folio` (the running head), which goes in each page.

Here is a complete theme for a small magazine, The Harbour Review. The steps below explain each part.

```woct file=edition.woct
%% The Harbour Review: one theme for every page of the edition.

%% Colour
\token[name=harbour, value=#1d5c63]
\palette[name=default, paper=#f8f6f1, ink=#1a1c1e, muted=#5c6166, accent=$harbour, rule=#dcd8cf]
\palette[name=night, paper=#101418, ink=#eef0f2, muted=#a3aab1, accent=#7cc4cc, rule=#2a3036]

%% Type: Vanilla's sizes and spacing are kept; only what is named here changes
\style[name=headline, weight=600, tracking=-0.02em]
\style[name=kicker, color=accent]
\style[name=deck, italic, color=muted]
\style[name=headline-quiet, extends=headline, size=fluid(32px, 52px)]
\style[name=folio, color=accent]

%% A narrower grid for essays, at every screen size
\grid[name=essay, cols=12, gutter=24px, margin-x=160px, max=1200px, baseline=33px, body=3-10]
\grid[name=essay, at=compact, gutter=20px, margin-x=120px, baseline=28px]
\grid[name=essay, at=tablet, cols=8, gutter=20px, margin-x=56px, baseline=30px, body=2-7]
\grid[name=essay, at=phone, cols=4, gutter=16px, margin-x=24px, baseline=28px, body=all]

%% Hero pictures always run across every column
\spot[size=hero, place=top, span=all]

%% A full-screen interlude in the night palette
\parent[name=interlude, height=screen, palette=night, folio=hide]
```

## 2. Name your colours

A **token** is a named value you can reuse: `\token[name=harbour, value=#1d5c63]` lets you write `$harbour` anywhere a colour goes.

A **palette** is a set of five colours, each with a fixed job called a role:

| Role | Used for |
| :---- | :---- |
| `paper` | The background |
| `ink` | The text |
| `muted` | Captions, credits, dates |
| `accent` | Links, drop caps, subheads, pull-quote marks |
| `rule` | Rules, borders and box fills |

Always name all five. Styles refer to roles, not to colours, so a scene with `palette=night` changes everything inside it at once.

The palette called `default` is the one every scene uses unless it names another, so redefining `default` recolours the whole edition. Add a second palette, such as `night`, for openers and interludes.

Text needs to stand out from the paper. `woc check` warns **W062** when `ink`, `muted` or `accent` has less than 4.5 to 1 contrast against `paper`, the level the web accessibility guidelines ask for. Check your dark palette as carefully as the light one.

## 3. Change the type

Every kind of text has a **style** with the same name as its command: `headline`, `deck`, `kicker`, `body`, `caption`, `subhead`, and so on. To change one, define a style with that name. Only the attributes you write change; the rest stay as Vanilla set them:

```woc
%% in a theme: the headline a little bolder and tighter, everything else as Vanilla has it
\style[name=headline, weight=600, tracking=-0.02em]
```

For a variant you use only now and then, make a new style that **extends** an existing one, and ask for it by name on the element:

```woc
%% in a theme
\style[name=headline-quiet, extends=headline, size=fluid(32px, 52px)]

%% in a page, where a picture should lead instead of the headline
\headline[style=headline-quiet]{The Harbour at Dawn}
```

`fluid(32px, 52px)` grows from 32 pixels on a small phone to 52 on a large screen.

The `folio` style sets the running head, the small label at the top of every screen. The running head's words and position go in each page with `\folio`; the theme only sets its look.

To use your own typefaces, register the files with `\font` in the theme. [Use your own fonts](use-your-own-fonts.md) shows how.

## 4. Define grids for every screen size

A **grid** is the set of columns a scene is laid out on, with its margins and the height of one line (the baseline step). Vanilla's grid is called `default`. You can change it, or add your own and use it on a scene with `grid=essay`.

Define a grid once for large screens, then again for each smaller size with `at=`:

```woc
%% in a theme
\grid[name=essay, cols=12, gutter=24px, margin-x=160px, max=1200px, baseline=33px, body=3-10]
\grid[name=essay, at=phone, cols=4, gutter=16px, margin-x=24px, baseline=28px, body=all]
```

An `at=` line only changes what it names. Everything else comes from the grid's first definition. The screen sizes are `phone`, `tablet`, `compact` (laptops) and `wide` (1800 pixels and up); [Shape the page for phones](shape-the-page-for-phones.md) says more about them.

One rule catches people out. A value you set without `at=` applies at every size, and it wins over Vanilla's own values for phones and tablets. If your theme says `\grid[name=default, margin-x=160px]`, phones get 160-pixel margins too. So whenever you change a value that Vanilla varies by screen size (margins, gutters, the baseline step, text sizes), say what phones and tablets should have with their own `at=` lines.

Keep `baseline` equal to the body text's line height, so that lines in neighbouring columns share a baseline.

## 5. Set where pictures may go

A **spot** is a place a floating picture may take on a wide screen. A theme's `\spot` lines replace Vanilla's for each picture size they name. Sizes the theme doesn't name keep Vanilla's spots.

```woc
%% in a theme: heroes always across every column
\spot[size=hero, place=top, span=all]
```

[How pictures find their place](../understand/how-pictures-find-their-place.md) explains spots, and [Add pictures](add-pictures.md) shows how pages use them.

## 6. Make scene templates

A **parent** is a template for scenes. A scene that names it with `parent=` takes all its attributes, and can override any of them:

```woc
%% in a theme
\parent[name=interlude, height=screen, palette=night, folio=hide]

%% in a page
\scene[name=pause, parent=interlude]{ ... }
```

A parent can also hold content, such as a rule or a picture, that appears under every scene that uses it.

> **⚑ Flag:** Today a parent with a picture or a rule in it works reliably only when the parent is in the page. In a theme file, a `\rule` inside a parent stops the page with a resolve error ("no id for \rule"), and a picture can take the name of an element in the page. This page assumes it works in a theme too. Until then, define a parent that holds content in the page, after the frontmatter.

## 7. Load the theme in a page

Add one line to the page's frontmatter: `theme:` and the path to the file.

```woc
---
wocument: 1
title: The Harbour at Dawn
lang: en-GB
theme: ./edition.woct
---
\folio[position=top-right, progress]{The Harbour Review}

\kicker{Harbour · Work}
\headline{The Harbour at Dawn}
\deck{The boats come in before the light, and the market is sold out by seven.}
\byline{By Ana Moreno}

The first boat ties up a little after four. Nobody on the quay says much: the crew pass the boxes up hand to hand, and the buyers walk along the line of them with torches, lifting a lid here and there and writing in small notebooks.

By five there are eleven boats along the wall and the market hall is full. The auction runs by bell and by voice, faster than a visitor can follow, and a box of mackerel can change hands three times before it reaches the lorries at the back.

When the light comes up over the breakwater, the hall is already being hosed down. The crews go to the café on the corner, the buyers drive inland, and the gulls take the quay back for the rest of the morning.
```

A path starting with `./` is read from the page's folder. A path starting with `/` is read from your `public` folder.

A page loads **one theme**, no more. A theme can't load another theme, and a page can't add a second one. Anything that is truly one page's own (a palette for a single story, say) goes in that page, after the frontmatter. A page's own definitions win over the theme's, value by value.

## 8. Share the theme across an edition

Put every page of the edition in one folder with the theme, and give each page the same `theme:` line:

```text
harbour-review/
  edition.woct
  harbour-at-dawn.woc
  net-makers.woc
  winter-crossing.woc
  pictures/
```

Open the whole folder in the editor with `woc dev harbour-review`. When you save a change to the theme, every open page updates. Build all the pages at once with:

```bash
woc build harbour-review/*.woc --out dist
```

With more than one page, `woc build` names each page after its file (`harbour-at-dawn.html`, and so on) and writes one shared script for all of them.

## Check the result

1. Run `woc check` on a page that loads the theme. It checks the theme too, and reports a mistake in the theme's syntax with the theme's file name and line.
2. Open the page in `woc dev`. Your colours and type should replace Vanilla's, and everything you didn't name should look as before.
3. Make the window narrow and check the phone version, especially margins and text sizes you changed.

You can also run `woc check edition.woct` on its own, to check the theme's syntax before any page uses it.

## If it doesn't look right

| What you see | What to do |
| :---- | :---- |
| `woc: cannot read the theme ./edition.woct` | The path is wrong. `./` paths are read from the page's folder. |
| An error that theme files contain definitions only | Move that line (a `\folio`, text, a scene) into the page. |
| An error about an unknown style, grid, palette or token | Check the spelling in the theme and where the page uses it. Names must match exactly. |
| **W062**: a colour has too little contrast | Darken or lighten that role in the palette until it reaches 4.5 to 1 against `paper`. |
| **W060**, **W061** or **W063** after you changed the body style | The text is too small, its lines too tight, or its weight too light. See [Use your own fonts](use-your-own-fonts.md#check-the-result). |
| **W031** on a scene that uses your grid | A frame or object uses columns your grid doesn't have at that size. Define the grid `at=tablet` and `at=phone`, or give the frame `cols@phone=`. |
| Phones have huge margins or large text | You set a value without `at=`, and it applies to phones too. Add an `at=phone` line for it. |

Every definition command and its attributes is listed in [Commands and attributes](../reference/commands.md). [Themes and the cascade](../understand/themes-and-the-cascade.md) explains in what order Vanilla, the theme, the page and each element are applied.

## Next

- [Use your own fonts](use-your-own-fonts.md)
- [Shape the page for phones](shape-the-page-for-phones.md)
