# Syntax and values

How to write commands, attributes, values and text in a `.woc` or `.woct` file. For what each command does, see [Commands and attributes](commands.md).

## Commands

Every construct has one shape:

```text
\name[key=value, key@breakpoint=value]{body}
```

| Part | Rule |
| :---- | :---- |
| `\name` | A backslash and lowercase letters. The set of names is closed: an unknown name is error `P012`, with a suggestion such as "Did you mean `\pullquote`?" |
| `[...]` | Optional attribute list. It must follow the name directly: `\figure [src=a.jpg]` is a command with no attributes, followed by the text ` [src=a.jpg]`. |
| `{...}` | The body. It must follow the name or the `]` directly. Whether a command takes one, needs one or refuses one is listed per command in [Commands and attributes](commands.md). |

- A command with no body ends at the first character that isn't a lowercase letter or `[`: `Stone \br and strategy`.
- A block command ends the paragraph before it, with or without a blank line. Only `\br`, `\span` and `\endmark` sit inside a line of text.
- A body accepts only the child commands its command lists. Anything else is error `P020`, which names what is allowed.
- A `{` that doesn't open a body is error `P010`; a `}` that closes nothing is error `P011`. Braces are never plain text: write `\{` and `\}`.

```woc
%% part of a story: a bodiless marker, then a command with attributes and a body
\dropcap[lines=3]
The first ferry leaves at ten past six.

\figure[src=./pictures/quay.jpg, alt="The ferry quay before sunrise", size=wide]{
  \caption{The quay at half past five.}
}
```

## Attribute lists

| Rule | Example |
| :---- | :---- |
| Pairs are separated by commas. A trailing comma is fine. | `[cols=1-8, columns=2,]` |
| Spaces and line breaks inside `[...]` are fine, so a long list can span lines. | see below |
| Keys are lowercase letters and hyphens. | `wrap-offset`, `space-after` |
| A key written alone means `true`. | `[loop]` is `[loop=true]` |
| A value with spaces, commas or any character outside letters, digits and `_ . / : # $ % + ~ -` must be in double quotes. That includes web addresses with `?`, `&` or `=`. | `alt="A boat, moored"`, `url="https://example.com/v?id=4"` |
| The same key twice (at the same breakpoint) is an error. | `P014` |
| An unknown key is an error, with a suggestion. | `P013` |
| A value of the wrong type is an error, naming the types it expects. | `P015` |
| A required attribute that's missing is an error. | `P016` |
| No comments inside `[...]`. A `%%` there is error `L003`. | |

Inside a quoted value only two escapes work: `\"` for a quotation mark and `\\` for a backslash. A quoted value can't span lines (`L006`).

```woc
%% part of a scene: a long attribute list over several lines
\frame[
  story=main,
  cols=1-12, cols@tablet=all, cols@phone=all,
  columns=3, columns@phone=1,
]
```

## Values for one screen size

Add `@` and a breakpoint's name to a key to give it a different value at that breakpoint:

```woc
%% part of a scene: three columns, one on phones, hidden on tablets
\frame[story=main, columns=3, columns@phone=1, hide@tablet]
```

- The value without a suffix is the **base** value. It applies at every breakpoint that has no override.
- At most one breakpoint is active at any width, so overrides never stack.
- Some attributes can't vary: `name`, `at`, `extends`, `story`, `parent`, `provider`, and every attribute of `\font`, `\token`, `\breakpoint`, `\spot` and `\music`. A suffix on one of them is error `P013`. [Commands and attributes](commands.md) marks them "not responsive".
- To redefine a whole grid, style or parent for one breakpoint, use `at=` on the definition instead: `\style[name=body, at=phone, size=17px]`.

Vanilla's breakpoints (a theme or document can redefine them with `\breakpoint`):

| Name | Widths |
| :---- | :---- |
| `phone` | up to 639px |
| `tablet` | 640px to 1023px |
| `compact` | 1024px to 1799px (laptops) |
| `wide` | 1800px and up |

Vanilla covers every width, so no width falls in the base range. Base values still matter: every breakpoint inherits them unless it overrides them.

> **⚑ Flag:** The page assumes a suffix naming a breakpoint that doesn't exist (`cols@desktop=`) is reported. Today the engine accepts it silently and never applies it. Check the spelling of every suffix against the table above.

> **⚑ Flag:** The page assumes overlapping `\breakpoint` ranges are a resolve error, as the specification says. Today the engine accepts them. Keep your breakpoints from overlapping.

## Value types

| Type | Examples | Notes |
| :---- | :---- | :---- |
| integer | `3`, `12`, `-1` | |
| number | `1.5`, `-0.02` | |
| length | `24px` `1.5rem` `0.02em` `50%` `40vw` `100vh` `2col` `3bl` `0` | A bare `0` needs no unit. Units below. |
| percentage | `15%`, `50%` | Where a type says percentage, only `%` is accepted. |
| fluid length | `fluid(18px, 22px)`, `fluid(18px, 22px, 400px, 1200px)` | Grows with the screen's width. See [Fluid sizes](#fluid-sizes). |
| range | `1-4`, `5-end`, `3`, `all` | Grid columns or rows, counted from 1, both ends included. |
| ratio | `3:2`, `16:9`, `auto` | |
| time | `600ms`, `0.4s` | |
| colour | `#1a1a1a`, `#fff`, `#00000080` | Hex only: 3, 4, 6 or 8 digits. |
| role | `paper` `ink` `muted` `accent` `rule` | A colour from the scene's palette. |
| token | `$tide` | Replaced by the token's value, then checked against the attribute's type. |
| enum | `cover`, `screen`, `left` | One of the words the attribute lists. |
| boolean | `true`, `false`, or the key alone | |
| identifier | `main`, `night`, `headline-quiet` | Names of grids, styles, palettes, stories, parents. Lowercase letters, digits and hyphens, starting with a letter. |
| string | `"A boat, moored"` | Quote it when it holds spaces or commas. |
| path | `./pictures/quay.jpg`, `/img/quay.jpg`, `"https://..."` | See [Paths](cli.md#paths). |
| pair | `"50% 30%"` | Two values separated by a space, always quoted. `focus` is the only attribute that takes one. |
| polygon | `poly(0 0, 1 0, 0.5 1)` | At least three points, each `x y` from `0` to `1` across the box. Only on `shape`. |

A token can stand in for an integer, number, length, percentage, time, colour, ratio or string. It can't stand in for a name, an enum word, a boolean, a range, a path or a role.

## Units

| Unit | Means |
| :---- | :---- |
| `px` | A CSS pixel. |
| `rem` | The root font size, 16px. |
| `em` | The current text size: in a style, that style's size. |
| `%` | A percentage of a reference box the attribute names: the column for `width`, the picture for `focus`, the side margin for `outdent`. |
| `vw`, `vh` | A hundredth of the screen's width or height. `vh` is the smallest height the browser shows, so its toolbars never cover a full-screen scene. |
| `col` | One column of the scene's grid at the current breakpoint. `2col` includes the gutter between the two columns. |
| `bl` | One baseline step of the current grid: `3bl` with a 28px baseline is 84px. |

## Fluid sizes

`fluid(min, max)` grows in a straight line with the screen's width: `min` at 360px wide, `max` at the `max` width of the `default` grid at the current breakpoint, and it holds steady outside that range. With Vanilla that's 1440px, 1224px on laptops and 1760px at 1800px and wider. The four-argument form, `fluid(min, max, from, to)`, sets the range of widths yourself.

- It uses the `default` grid on purpose, so a paragraph keeps one size when its story moves into a scene with another grid.
- Use `px` or `rem` inside `fluid()`. `%`, `col`, `bl`, `vw` and `vh` there are an error.

```woc
%% part of the design head
\style[name=headline, size=fluid(40px, 88px)]
\style[name=pullquote, size=fluid(22px, 30px, 600px, 1600px)]
```

## Text

| Write | You get |
| :---- | :---- |
| A blank line | A new paragraph |
| A single line break | A space |
| Indentation | Nothing: it's never significant |
| `**words**` | Bold (weight 700; 900 inside a style that's already bold) |
| `*words*` | Italic. Inside an italic style, it sets the words upright. |
| `***words***` | Bold italic |
| `` `words` `` | Code, in the `code` style |
| `[words](https://example.com)` | A link, in the `link` style |
| `\span[style=name]{words}` | Words in a character style. `style` is required. |
| `\br` | A forced line break, for display text such as headlines and pull quotes |
| `\endmark` | The end-of-article sign, after the last word of the last paragraph |

- Square brackets are plain text unless they make a complete link, so `[sic]` needs no escape.
- An asterisk with a space on both sides is plain text: `2 * 3`.
- Emphasis must close in the same paragraph (`P030`), in order (`P031`). A run of four or more asterisks is `P034`.
- A code span must close (`P032`) and can't be empty (`P036`). Escapes and comments still work inside it, so write `\\` for a backslash.
- A link can't hold another link (`P035`).
- No raw HTML, no underscores for emphasis, no strikethrough, no lists, no tables, no footnotes. Lists, tables and footnotes are planned (see [What isn't built yet](limits.md)).

### Typographic substitutions

| Write | You get | Notes |
| :---- | :---- | :---- |
| `--` | – (en dash) | Exactly two hyphens |
| `---` | — (em dash) | Exactly three |
| `...` | … (ellipsis) | Exactly three dots |
| `"words"`, `'words'`, `it's` | “words”, ‘words’, it’s | Curled for the frontmatter's `lang` |

Runs of any other length stay as they are. Substitutions don't happen inside code spans or web addresses.

> **⚑ Flag:** The page assumes quotes are curled and words hyphenated for each document's `lang`. Today the engine knows only English: every language gets English curly quotes, and only English is hyphenated (with American patterns, also for `en-GB`). Other languages get no hyphenation. For another language, set `hyphenate=false` on body text if the result looks wrong, and type the quotation marks you want directly.

## Escapes

A backslash followed by one of these characters gives that character literally.

| Escape | Gives | Needed when |
| :---- | :---- | :---- |
| `\\` | `\` | Always |
| `\{` `\}` | `{` `}` | Always |
| `\[` | `[` | Right after a command name, or to stop a link from forming |
| `\]` `\(` `\)` | `]` `(` `)` | Inside a link's text or address |
| `\%` | `%` | Only to write `%%` literally: `\%%` |
| `\*` | `*` | Where an asterisk would start or end emphasis |
| `` \` `` | `` ` `` | Where a backtick would start a code span |
| `\-` | `-` | To stop a dash: `\-\-` is two hyphens |
| `\.` | `.` | To stop an ellipsis |
| `\"` `\'` | `"` `'` | A straight quote that must stay straight: feet, inches |

A backslash before any other character that isn't a command name is error `L004`. Escaping a character that didn't need it is fine; `woc format` removes the extra backslash.

## Comments

`%%` starts a comment that runs to the end of the line. A single `%` is plain text, so "40% of readers" and `width=50%` need nothing special.

- A comment on a line of its own disappears with its line, so it never splits or joins paragraphs.
- A comment after text is removed with the spaces before it.
- Comments can't go inside `[...]` or inside a quoted value.
- `woc format` keeps your comments where you put them.

```woc
---
wocument: 1
title: The Ferry at Ten Past Six
---
%% A note to yourself: this never appears on the page.
\headline{The Ferry at Ten Past Six}

About 40% of the passengers make the trip every day. %% check this figure
The rest are visitors -- most of them "just looking", as the captain puts it... They stand at the rail for the whole crossing, photographing the same lighthouse from the same angle, and leave the café to the regulars.

The regulars have their own seats. Nobody has ever said so, and nobody has ever needed to: a newcomer who sits by the window on the left gets a look, then a cough, and by the second week has moved to the right.
```

`woc check` gives this example one warning, W064, at 1470px and 2560px. That's Vanilla's own columns running a few characters short of 45 a line, not the comments (see [W064](diagnostics.md#warnings)).

## Related

- [The file](file.md): the parts of a file and their order.
- [Commands and attributes](commands.md): every command, attribute and default.
- [Warnings and errors](diagnostics.md): every code on this page, explained.
