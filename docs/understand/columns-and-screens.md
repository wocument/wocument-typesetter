# Columns, screens and the baseline grid

On a large screen, a Wocument feature reads like a magazine: a screen of columns, then the next screen of columns, every line lined up with its neighbour. This page explains how the engine sets text that way, what it promises, and what it leaves to you. Knowing the rules helps you read a page that ends a line short, and decide whether to fix it.

It's about **page scenes** (`height=page`), the kind of scene that sets text as magazine pages. That includes every page written in the implicit form, with no `\scene` at all. If you haven't met scenes yet, read [Scenes, stories and frames](scenes-stories-frames.md) first.

## Every line sits on a grid

Look closely at a printed magazine. In two columns side by side, each line in the left column sits at exactly the height of the line next to it. Designers call the invisible lines they sit on the **baseline grid**.

Browsers don't do this. Each column of a web page sets its own lines, and a subhead or a picture in one column pushes everything below it out of step with the next.

Wocument sets every line of body text on a grid of its own. The grid's step is one line of body text: 33 pixels on a large screen in Vanilla, 28 on a laptop or a phone. Subheads, pictures and captions are sized and spaced in whole steps, so the text after them lands back on the grid. The result is columns whose lines match, all the way down.

You can use the step yourself. The unit `bl` means one baseline step, so `space-before=1bl` adds exactly one line of space, and `top=4bl` starts something four lines down. Lengths given in `bl` keep your page on the grid.

On a screen set as magazine pages, the grid is counted up from the bottom of each screen. So a full column's last line ends at exactly the same place on every screen, whatever the screen's height.

## Text is set one screen at a time

In a page scene, a frame with two or more columns isn't set as one long strip. It's set in **bands**: one screen of columns at a time.

1. The first band starts under whatever is above it, usually the heading, and runs to the bottom of that screen.
2. The text carries on in a new band on the next screen, starting at the top of the first column again.
3. That repeats until the story ends.

Each band is read the way you read a magazine page: down the first column, then down the next, then turn the page. On a large screen, the space bar and Page Down glide to the next screen, and the dots at the right edge show which one you're on.

A small arrow at the foot of a column shows that its text carries on.

## The last screen is balanced; the others are left as they are

On every screen but the last, the engine fills the columns to the bottom of the screen as the text comes. A **section** is the run of screens a frame's text fills before it ends. On a section's **last** screen there's usually not enough text to fill every column, so the engine **balances** them: it finds the smallest height at which the remaining text fits, so the columns end within a line or two of each other instead of one full column next to an empty one.

Balancing works by lines. A paragraph can start at the foot of one column and finish at the top of the next, as long as at least two lines stay on each side.

Full screens aren't evened out. When a column on a full screen ends a line or two early because of the rules below, it stays that way. We tried evening out every page, and it moved text around in ways that were harder to read than a slightly ragged foot. So since 29 October 2026, a ragged foot on a full page is accepted.

## The rules that keep a page tidy

The engine follows the rules an editorial designer would, so you don't have to check for them line by line.

- **No widows or orphans.** A paragraph never leaves a single line alone at the top or foot of a column; by default it keeps at least two together. That's the main reason a column ends a line short.
- **Subheads stay with their text.** A subhead is never the last thing in a column; it moves to the next column with the paragraph it introduces.
- **No stubs.** A picture as wide as its column never leaves one or two lone lines under it. And a section's last screen never holds three lines or fewer and nothing else: the screen before is set again to take them.
- **Objects never cut a column in half.** A picture that isn't floating waits for the top of the next column rather than interrupting one.
- **Pages end full.** When a screen with a photograph on it ends short, the photograph grows by up to six lines, or crops by up to three, so the columns reach the bottom. A screen without a photograph, and a section's last screen, can still end short.
- **No hyphen at a page turn.** The last line on a screen never ends in a hyphenated word; the whole word goes over.

## Editing to fit

When a screen still ends short, a magazine would fix it the old way: an editor adds or cuts a few words. Wocument supports that habit. `woc check` ends with a **copyfitting report**: for each screen that ends short, how many lines are missing, roughly how many characters would fill them, and which picture could grow instead.

```text
screen 2 at 1470px: 3 lines short of the bottom line.
  Add about 130 characters to "The shaped loaves rest…", or let figure-1 grow by 3 lines (size=wide).
```

Objects you don't name are numbered by kind, in the order you wrote them: `figure-1`, `figure-2`, `pullquote-1`. Give one a `name=` and the report uses that instead.

It's advice, not an error. A section's last screen is allowed to end short; it's the screens in the middle that read as holes.

## Phones scroll

On phones and tablets, a page scene's text is one column, and one column isn't set in bands. It scrolls, like a well-set article anywhere on the web. The baseline grid still applies, and nothing floats: pictures and quotes sit where you wrote them.

That's a deliberate difference. A screen of columns works when the screen is wide enough for columns. On a small screen, the familiar thing is a single column you scroll.

## For developers

The rules above are spec §09.4 (column balancing) and §09.7 (column bands), rules 1 to 15. Bands are built in `packages/layout/src/index.ts`; balancing is `balance()`, and the screen-by-screen composition of floating objects is in `packages/layout/src/compose.ts`. The copyfitting report is `copyfit()` in `packages/cli/src/measure.ts`. It lays the document out at the test widths with a fixed-width text engine, because Node has no fonts to measure with, so its character counts are estimates.

## Next

- [How pictures find their place](how-pictures-find-their-place.md): the other half of setting a page.
- [Check and polish a page](../build/check-and-polish.md): reading `woc check` and fixing what it finds.
