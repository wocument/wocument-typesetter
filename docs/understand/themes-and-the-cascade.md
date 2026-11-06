# Themes and the cascade

Every value on a Wocument page, from the size of a caption to the colour of a rule, comes from somewhere. This page explains where: Vanilla, theme files, your own definitions, and the order in which they're applied. Once you know the order, you can change exactly what you mean to and nothing else.

## Nothing is ever undefined

Wocument has a built-in design called **Vanilla**. It sets every value the engine needs: the grid at each screen size, a palette of five colours, and a style for every kind of text, from the headline to the credit line. Its type is Newsreader for reading and display, and Inter for small labels. Both fonts ship with Wocument, so your page needs no font files of its own.

That's why a file with no design in it still makes a good page. It's also why you never start from a blank slate. You design by changing what your publication needs, and Vanilla keeps the rest.

## Three places design can live

- **Vanilla**, built in, always there.
- **A theme file**, ending in `.woct`. It holds design only: fonts, colours, grids, styles, spots and scene templates. A whole edition of a magazine can share one theme, so every article looks like it belongs.
- **The design head** of a document: the definitions at the top of a `.woc` file, after the frontmatter and before any text. Use it for what belongs to that one article alone.

A document loads at most one theme, named in its frontmatter:

```yaml
---
wocument: 1
title: The Night Bakers
theme: ./edition.woct
---
```

## The cascade: later wins

Every value is worked out through the same chain, the **cascade**. Each level can change what the one before it set, and the later level wins.

1. **Vanilla**, the built-in theme.
2. **The theme file**, if the document names one.
3. **The document's design head.**
4. **The scene's parent**, if the scene is built from a `\parent` template.
5. **The scene.**
6. **The element**: attributes written on a headline, a figure or a frame, including `style=`.
7. **A breakpoint value** of any of the above, such as `columns@phone=1`.

Here's how that plays out. Vanilla sets a palette called `default`. Your theme defines `default` again with warmer paper. A scene in one article says `palette=night` for a dark interlude. Inside that scene, everything uses the night colours; outside it, your theme's warm paper; and in another publication with no theme, Vanilla's.

## A new definition changes only what it says

When you define something that already exists, you change only the attributes you write. Everything else keeps its earlier value.

```woc
%% a design head: make body text a little larger, keep everything else
\style[name=body, size=22px]
```

This body style is still Newsreader, still justified, still on the baseline grid, still hyphenated. Only the size changed. You don't have to copy Vanilla's whole definition to adjust one thing, and when Vanilla improves, your page picks up the improvements you didn't override.

Each kind of text uses the style with its own name: `\headline` uses `headline`, a caption uses `caption`, plain paragraphs use `body`. So redefining `headline` restyles every headline. To set one headline apart, make a new style that **extends** an existing one and point to it:

```woc
%% a design head and a heading: one headline set larger than the rest
\style[name=headline-large, extends=headline, size=fluid(44px, 96px)]

\headline[style=headline-large]{The Night Bakers}
```

## Different screens, different values

Wocument names screen sizes by their **breakpoints**, ranges of screen widths such as `phone` and `wide`. There are two ways to change a value for one of them.

**On an element**, add `@` and the breakpoint's name to an attribute: `cols@phone=all`, `columns@tablet=1`, `hide@phone`. This is level 7 of the cascade, so it wins over everything.

**On a definition**, write it again with `at=`. Grids, styles and parents can be redefined for one breakpoint:

```woc
%% a design head: a grid with its own phone version
\grid[name=essay, cols=12, gutter=24px, margin-x=128px, baseline=33px, body=3-10]
\grid[name=essay, at=phone, cols=4, gutter=16px, margin-x=24px, baseline=28px, body=all]
```

An `at=` redefinition takes everything it doesn't set from the same name's base definition at the same level, and applies right after that base definition. One result surprises people: a document that sets `body` to 22 pixels beats a theme's phone size for `body` too. A document that wants its own phone size says so with its own `at=phone`.

Vanilla's breakpoints are `phone` (up to 639 pixels wide), `tablet` (640 to 1023), `compact` (laptops, 1024 to 1799, the whole page at 85%) and `wide` (1800 and up).

## Why it works this way

**Design lives in the language, not the frontmatter.** The frontmatter holds facts about the article: title, author, date, language. Every design value is a command, so it can use the cascade, vary by breakpoint and be checked by `woc check`, which a loose setting in the frontmatter couldn't.

**One theme per document, and no includes.** A document can load one theme, and a theme can't load another. That's deliberate. With one theme, you can always answer "where does this value come from?" by reading two files and the list above. Chains of imports make that question hard, and the cascade stops being predictable.

**No logic.** There are no variables beyond **tokens** (named values such as `$ember` for a colour), no conditions and no macros. A theme describes; it doesn't compute. That keeps themes readable by the people who design publications, and lets the engine guarantee things about every page.

## Next

- [Make a theme](../build/make-a-theme.md): write a `.woct` for an edition, step by step.
- [Vanilla](../reference/vanilla.md): every value the built-in theme sets.
