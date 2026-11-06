# Use your own fonts

This guide shows you how to set a page in a typeface of your choice: where to put the font files, how to register them, and how to check that the text still reads well. You don't need it to get good type. Vanilla, the built-in design, sets text in Newsreader and labels in Inter, two open fonts that ship with Wocument, so every page has them without any files from you.

## Before you start

- A page that passes `woc check`. If you haven't made one, start with [Your first page](../start-here/your-first-page.md).
- The font files, as **WOFF2**, the compact web font format. Most type foundries and font libraries offer it.
- **The right to serve them.** Publishing a page puts the font files on your web server, where any reader's browser downloads them. Check that the font's licence allows web use. Fonts under the SIL Open Font License, like many on Google Fonts, do. A font that came with your computer usually doesn't.

## 1. Put the files where `woc` can find them

Make a folder for the fonts inside your `public` folder, one folder per typeface:

```text
public/
  fonts/
    fraunces/
      fraunces-roman.woff2
      fraunces-italic.woff2
```

You refer to these files with paths that start with `/`, such as `/fonts/fraunces/fraunces-roman.woff2`. `woc` reads them from `./public`, or from the folder you give with `--public`. When you build the page, it copies them into the published folder.

A path that starts with `./` works too. It's read from the page's folder.

> **⚑ Flag:** The specification says a relative path is read from the file it's written in. Today `woc` reads a relative path in a theme from the page's folder, not the theme's. This page assumes the two agree. Until then, use `/` paths for fonts in a theme, or keep the theme in the same folder as its pages, where both readings find the same file.

## 2. Register each file with `\font`

Write one `\font` line for each file, after the frontmatter of the page or in your [theme](make-a-theme.md):

```woc
%% part of the design head, after the frontmatter, or in a theme
\font[family="Fraunces", src=/fonts/fraunces/fraunces-roman.woff2, weight=100-900]
\font[family="Fraunces", src=/fonts/fraunces/fraunces-italic.woff2, weight=100-900, italic]
```

- `family` is the name you'll use in your styles. Use the same name for every file of one typeface.
- `src` is the file.
- `weight` is the weight the file holds: `400` for a regular, `700` for a bold. A **variable font**, which holds a whole range of weights in one file, takes a range such as `100-900`. Leave it out for a regular weight.
- `italic` marks the italic file.

For a typeface with separate files for each weight, write one line for each: `weight=400` for the regular, `weight=700` for the bold, and so on.

## 3. Use the family in a style

Name the family in the styles that should use it. Always end the list with fonts the reader is likely to have, and a generic family such as `serif` or `sans-serif`. If a file fails to load, the browser moves along the list.

```woc
---
wocument: 1
title: The Net Makers
lang: en-GB
---
\font[family="Fraunces", src=/fonts/fraunces/fraunces-roman.woff2, weight=100-900]
\font[family="Fraunces", src=/fonts/fraunces/fraunces-italic.woff2, weight=100-900, italic]

\style[name=headline, family="Fraunces, Georgia, serif", weight=600]
\style[name=deck, family="Fraunces, Georgia, serif", italic]

\kicker{Harbour · Craft}
\headline{The Net Makers}
\deck{In a shed behind the fish market, three people mend every net in the harbour by hand.}
\byline{By Ana Moreno}

The shed has one long table and a stove that is never allowed to go out. Nets come in over the shoulders of the crews, wet and heavy and torn, and go back out a day or two later, dry and whole, folded so they can be paid out over a stern without a single knot catching.

Most of the work is reading the damage. A tear from a rock looks nothing like a tear from a seal, and each needs a different repair. The oldest of the three can tell from the shape of a hole which part of the bay a boat has been fishing.

The mending itself is quick, and almost silent: a needle loaded with twine, a wooden gauge to keep each mesh the same size, and a knot tied so fast that it is hard to see how it is made.
```

Here only the headline and the deck change. The body, captions and labels keep Vanilla's fonts.

A page downloads only the fonts its styles use. If your theme sets every style in your own typefaces, readers don't download Vanilla's fonts at all, and a font registered but never used costs nothing.

## Check the result

1. Open the page in `woc dev` and look at the text you restyled. If it still looks like Vanilla's type, or like Georgia, the browser couldn't load your file: see the table below.
2. Run `woc check`. A different typeface changes how much text fits on a line and how heavy it looks, so pay attention to the readability warnings for body text:
   - **W060**: body text is under 16 pixels.
   - **W061**: the line height is under 1.4 times the text size, which makes lines hard to follow.
   - **W063**: the body weight is under 350, too faint at reading sizes. Use 400 or 500.
   - **W064**: lines hold fewer than about 45 or more than about 75 characters at one of the test widths. A wider typeface sets fewer characters a line than Vanilla's.
3. Make the window narrow and check the phone version.

## If it doesn't look right

| What you see | What to do |
| :---- | :---- |
| `woc check` reports **W050**: a missing font file, text falls back to the next family | Check the path in `src`. A `/` path is read from `public` (or the folder you gave `--public`), a `./` path from the page's folder. |
| The font shows on your computer but not on another device | Your computer may have the typeface installed, which hides a missing file. Run `woc check` and fix any W050. Then check that the family name in the style matches the one in `\font`: capitals don't matter, but spelling and spaces do. |
| Bold or italic text looks smeared or slanted by the browser | That weight or style has no file. Register the bold or italic file with its own `\font` line. |
| **W060**, **W061** or **W063** | Change the body style's `size` or `weight`, or the grid's `baseline`, which sets the line height. [Make a theme](make-a-theme.md#4-define-grids-for-every-screen-size) shows how. |
| **W064** after changing the body font | Change the body `size`, or the frame's `columns` or `measure`. |

Every attribute of `\font` and `\style` is listed in [Commands and attributes](../reference/commands.md). Vanilla's styles, and which font each one uses, are in [Vanilla](../reference/vanilla.md).

## Next

- [Make a theme](make-a-theme.md): put your fonts and styles in one file for a whole edition.
- [Check and polish a page](check-and-polish.md)
