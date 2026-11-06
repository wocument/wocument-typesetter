# What isn't built yet

What you can't do with Wocument today, and what to do instead. Some of it is planned; some of it is left out on purpose.

## Not built

| What | What happens | Instead |
| :---- | :---- | :---- |
| `\lottie` (Lottie animation) | The command parses, but `woc check` stops with the resolve error "`\lottie` is not resolved yet". | Export the animation as a video and use `\video` with `play=visible`, `loop` and `muted`, or as an animated GIF in `\figure`. |

## Restrictions

| What | What happens | Instead |
| :---- | :---- | :---- |
| A `\group` inside a story | Error `P020`: groups can't be anchored in text. | Place the group directly in a `\scene`, or use separate anchored objects. |
| `span=all` partway through a page scene's columns | The block is set in its column, with warning `W035`. It crosses the columns only at a frame's start. | Start a frame with it, or put a `\framebreak` before it. |
| Responsive picture sets | Each picture is served once, as WebP at its own size, to every screen. | Give pictures at about 2400px on their long side, not larger. |
| Hyphenation and quotation marks in other languages | Only English is hyphenated (with American patterns, also for `en-GB`), and every language gets English curly quotes. | For another language, set `hyphenate=false` on `body` if breaks look wrong, and type the quotation marks you want. |
| `\breakpoint` ranges that overlap, and suffixes naming no breakpoint (`cols@desktop=`) | Accepted without a warning. An unknown suffix is never applied. | Keep ranges apart, and check every suffix against your breakpoints. |
| Frontmatter values | `wocument` accepts any whole number and `date` any text. `author`, `date`, `section` and `social-image` aren't written into the built page's tags. | Write `wocument: 1` and `YYYY-MM-DD`; add link-preview tags in your site's template. |
| Opening a build from your disk | Opening `dist/index.html` by double-clicking it probably shows a blank page: the page hides its reading version as soon as it loads, and browsers refuse to run its script from a file. | Serve the folder: `npx serve dist`, or any static server. |

> **⚑ Flag:** The page assumes a build opened from disk is blank, from reading the page's code; it hasn't been tested. Either way, preview a build through a static server.

## Planned for a later version

The specification lists these as planned but not in this version. Writing them today isn't possible: there's no command for them.

| Feature | Instead |
| :---- | :---- |
| Lists | Short paragraphs, or a `\sidebar` fact box with one paragraph per item. |
| Tables | A picture of the table in a `\figure`, with the data in its `alt`; or a fact box. |
| Footnotes | Put the note in the sentence, in brackets, or in a short paragraph at the end. |
| Cross-references | Write the reference in words: "see the second section". |
| Math | A picture of the formula, with the formula in words in `alt`. |
| A generic styled paragraph (`\p`) and `\question` | A text element with `style=`, such as `\subhead[style=question]{How did you start?}`, with the style defined in your theme. |
| Image zoom and lightbox | Make the picture large: `size=hero` or `size=wide`. |
| A scrim or tint over a picture | Pick a palette that reads on the picture, or a darker picture. |
| Pinned scenes, step triggers, scroll-scrubbed media, parallax | Scene `turn=`, and `enter=` reveals on scenes and objects. |
| Text on a path | A picture of the lettering. |
| Nested grids | A `\group`, or a second scene with its own `grid=`. |
| Vertical bleed | `bleed=` works left and right; for full height, a `layer=background` object in a screen scene. |
| Captions beside a picture, or placed freely over it | A caption goes below its picture, above it (`caption-side=above`) or over its foot (`caption-side=overlay`). |
| Padding per scene | A grid with a different `margin-y`, used by that scene. |
| `align` on frames | `align` on the styles inside the frame. |
| Borders on text boxes | A fact box's `bg=` colour. Pull-quote marks come from the style's `mark`. |
| Vertical writing and right-to-left layout controls | Not available. |

## Left out on purpose

Wocument describes a page; it doesn't compute one. So there are:

- No variables beyond `\token`, which holds a value and does no arithmetic.
- No conditions, loops, macros or user-defined commands.
- No includes of content, and one theme file per document, loaded with `theme:`.
- No raw HTML in a document.

Reuse comes from tokens, palettes, styles, grids, spots, parent scenes and the theme file.

## Fonts

- Every family a style names must be a font registered with `\font`, a font on the reader's system, or a generic family (`serif`, `sans-serif`, `monospace`). End every family list with a fallback: `family="Source Serif 4, Georgia, serif"`.
- Register only fonts you have the right to serve. WOFF2 files are recommended.
- A missing font file gives warning `W050`, and the text falls back to the style's next family.
- Vanilla's Newsreader and Inter cover Latin text only.

## Warnings the engine doesn't report yet

Layout warnings `W040`, `W041`, `W042` and `W043`, and the specification's uncoded warnings (more than one `\headline`, a video with no `poster`, autoplay without `muted`, text clipped by `overset=clip`), aren't reported yet. Their effects show on the page: check it at several widths in `woc dev`, and press V for the visor. Details are in [Warnings and errors](diagnostics.md#defined-but-not-reported-yet).

## Related

- [Commands and attributes](commands.md): everything that is built.
- [Warnings and errors](diagnostics.md): the errors and warnings these limits produce.
