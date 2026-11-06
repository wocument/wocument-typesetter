# Vanilla

Vanilla is the built-in theme: the breakpoints, grid, palette, fonts, styles and spots every document starts from. A theme file or the design head changes any of them by name; everything you don't change stays as listed here.

The values come from the engine's source, `packages/resolver/src/default-theme.ts`. Where a style leaves an attribute unset, it takes the language default listed in [Commands and attributes](commands.md).

## Breakpoints

| Name | Widths | For |
| :---- | :---- | :---- |
| `phone` | up to 639px | Phones |
| `tablet` | 640px to 1023px | Tablets, small windows |
| `compact` | 1024px to 1799px | Laptops. The base page at 85% of its sizes, as if zoomed out. |
| `wide` | 1800px and up | Large monitors. Inherits the base values. |

The four cover every width, so no width falls in the base range. The base values apply through `wide`, and every other breakpoint inherits whatever it doesn't override.

## The `default` grid

A baseline grid of one body line, so lines in side-by-side columns share their baselines.

| | base | `wide` | `compact` | `tablet` | `phone` |
| :---- | :---- | :---- | :---- | :---- | :---- |
| `cols` | 12 | 12 | 12 | 8 | 4 |
| `gutter` | 24px | 24px | 20px | 20px | 16px |
| `margin-x` | 128px | 128px | 108px | 72px | 28px |
| `margin-y` | 2bl | 2bl | 2bl | 2bl | 1.5bl |
| `baseline` | 33px | 33px | 28px | 30px | 28px |
| `max` | 1440px | 1760px | 1224px | 1440px | 1440px |
| `body` | 4-9 | 4-9 | 4-9 | 2-7 | all |
| `outdent` | 0 | 25% | 0 | 0 | 0 |
| `rows` | 6 | 6 | 6 | 6 | 6 |

`row-gap` isn't set, so it equals the gutter. `outdent=25%` at `wide` lets pictures, pull quotes, fact boxes and the heading on the grid's outer columns reach a quarter of the way into the side margin. Text never does.

The `default` grid's `max` is also where two-argument `fluid()` sizes stop growing (see [Fluid sizes](syntax.md#fluid-sizes)).

## The `default` palette

| Role | Colour | Used for |
| :---- | :---- | :---- |
| `paper` | `#f6f7f8` | The background |
| `ink` | `#16181d` | Text |
| `muted` | `#5f6570` | Captions, meta, credits, bio |
| `accent` | `#1f5fbf` | Subheads, drop caps, links, pull-quote marks, end mark |
| `rule` | `#dde1e6` | Rules and borders |

Vanilla defines no other palette.

## Fonts

| Family | Files | Used by |
| :---- | :---- | :---- |
| Newsreader | Upright and italic, weights 200 to 800 | Text and display: body, lede, headline, deck, pull quote, block quote, caption, bio, drop cap |
| Inter | Upright, weights 100 to 900 | Labels: kicker, byline, meta, subheads, credit, sidebar, folio |

Both ship with the typesetter under the SIL Open Font License, in Latin, about 167 KB together, so a page needs no font files of its own and every reader's lines break the same way. Vanilla registers them at `/fonts/vanilla/newsreader-latin-wght-normal.woff2`, `/fonts/vanilla/newsreader-latin-wght-italic.woff2` and `/fonts/vanilla/inter-latin-wght-normal.woff2`.

The families, as styles name them:

- **serif**: `Newsreader, Georgia, serif`
- **sans**: `Inter, Helvetica Neue, Helvetica, Arial, sans-serif`

A page loads only the fonts its styles use. A theme that sets every style in other families downloads neither Newsreader nor Inter.

## Styles

Sizes read base / `compact` / `tablet` / `phone`; a single value is the same at every breakpoint, and `wide` always takes the base value. A fluid size is shown base / `compact`.

### Text

| Style | Family | Size | Leading | Other values |
| :---- | :---- | :---- | :---- | :---- |
| `body` | serif | 21px / 18px / 19px / 18px | 1bl | `align=justify`, `composer=paragraph`, `indent=2em`, `space-after=0`, `justify-min=12em`, `min-slot=9em`, `hyphenate-min=6`, `hyphenate-caps=false`, `hang=punctuation` |
| `lede` | serif | 22px / 19px / 22px / 20px | 1bl | `snap=baseline`, `space-after=1bl`, `composer=paragraph`, `hyphenate=false`, `balance=false`, `bind-short=false` |
| `blockquote` | serif, italic | 20px / 17px / 20px / 20px | 1bl | `hang=punctuation`; set in from both sides of the column |
| `subhead` | sans, 600 | 18px / 15px / 18px / 18px | 1bl | `case=upper`, `tracking=0.08em`, `color=accent`, `space-before=1bl`, `space-after=0`, `keep-with-next`, `balance`, `bind-short` |
| `subhead-2` | sans, 700 | 20px / 17px / 20px / 20px | 1bl | `space-before=1bl`, `space-after=0`, `keep-with-next` |
| `dropcap` | serif, 700 | three lines deep (`\dropcap`'s `lines`) | | Extends `headline`; `color=accent` |

Body text is justified, hyphenated (words of six letters or more, never a capitalised word), and indented 2em, except the first paragraph of a story and the first after a subhead, a picture set where it's written, or another block. A subhead takes exactly two lines of its column: a line of space, then itself.

> **⚑ Flag:** The specification sets `\subhead[level=2]` in `subhead-2`. Today the engine sets every subhead in `subhead`, whatever its level, so `subhead-2` applies only where you name it: `\subhead[level=2, style=subhead-2]{...}`.

### The heading block

| Style | Family | Size | Leading | Other values |
| :---- | :---- | :---- | :---- | :---- |
| `kicker` | sans, 500 | 12px / 10px / 12px / 12px | 0.5bl | `case=upper`, `tracking=0.14em`, `color=ink`, `space-after=1bl`, `snap=none` |
| `headline` | serif, 400 | `fluid(40px, 72px)` / `fluid(34px, 61px)` | 1.06em | `tracking=-0.015em`, `space-after=0.75bl`, `snap=none`, `balance`, `bind-short`, `hyphenate=false` |
| `deck` | serif, upright | `fluid(21px, 25px)` / `fluid(18px, 21px)` | 1.4em | `color=ink`, `space-after=1.5bl`, `snap=none`, `balance`, `bind-short`, `hyphenate=false` |
| `byline` | sans, 500 | 14px / 12px / 14px / 14px | 0.75bl | `space-after=0`, `snap=none` |
| `meta` | sans | 13px / 11px / 13px / 13px | 0.75bl | `color=muted`, `space-after=0`, `snap=none` |

### Boxes, captions and small text

| Style | Family | Size | Leading | Other values |
| :---- | :---- | :---- | :---- | :---- |
| `pullquote` | serif, italic | `fluid(22px, 28px)` / `fluid(19px, 24px)` | 1.25em | `color=ink`, `space-after=0`, `snap=none`, `balance`, `bind-short`, `mark="“”"` |
| `cite` | the quote's style, upright | 17px / 14px / 17px / 17px | 1.2em | `color=muted` |
| `sidebar` | sans | 16px / 14px / 16px / 16px | 1.5em | `snap=none` |
| `title` | as `sidebar`, 700 | as `sidebar` | as `sidebar` | Extends `sidebar`; `hyphenate=false`. Fact-box titles. |
| `caption` | serif, italic | 15px / 13px / 15px / 15px | 1.4em | `color=muted`, `snap=none` |
| `credit` | sans | 13px / 11px / 13px / 13px | 1.4em | `case=upper`, `tracking=0.06em`, `color=muted`, `snap=none` |
| `bio` | serif, italic | 16px / 14px / 16px / 16px | 0.75bl | `color=muted`, `snap=none` |
| `folio` | sans, 600 | 12px / 10px / 12px / 12px | | `case=upper`, `tracking=0.08em`, `color=muted` |

### Character styles

| Style | Values |
| :---- | :---- |
| `link` | `color=accent`, underlined |
| `code` | `family="monospace"`, `size=0.9em` |
| `endmark` | The enclosing paragraph's style, in the accent colour |

A pull quote's marks are set at three times its size, bold, in the accent colour. Write the quote without quotation marks; the style adds them.

## Spots

Where a floating picture, pull quote or fact box may go on a wide page, by size. Vanilla uses the same rows at every breakpoint; on phones and tablets nothing floats. Rows are tried in this order.

| `size` | `place` | `span` | `side` |
| :---- | :---- | :---- | :---- |
| `hero` | `top` | `all` | |
| `hero` | `top` | `all-but-one` | |
| `wide` | `top` | `2-3` | |
| `wide` | `bottom` | `2-3` | |
| `column` | `top` | `1` | |
| `column` | `bottom` | `1` | |
| `column` | `anchor` | `1` | |
| `small` | `anchor` | `1` | `left` |
| `small` | `anchor` | `1` | `right` |

A theme's `\spot` rows replace Vanilla's for each size the theme names. A size the theme doesn't name keeps these rows.

## Examples

Change one attribute and keep the rest. This keeps Vanilla's body in every respect but its size and its phone size:

```woc
%% part of the design head, or of a theme file
\style[name=body, size=20px]
\style[name=body, at=phone, size=17px]
```

Your document's `\style[name=body, size=20px]` beats Vanilla's breakpoint sizes too, so without the second line a phone would also get 20px. [Themes and the cascade](../understand/themes-and-the-cascade.md) explains why.

## Related

- [Make a theme](../build/make-a-theme.md): change Vanilla for a whole edition.
- [Use your own fonts](../build/use-your-own-fonts.md): replace Newsreader and Inter.
- [Commands and attributes](commands.md): every style attribute and its language default.
