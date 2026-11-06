# The file

What a `.woc` document and a `.woct` theme hold, in what order, and what the engine does with a file that has no scenes.

## A document's parts, in order

A `.woc` file has up to four parts. They must come in this order.

| Part | Holds | Required |
| :---- | :---- | :---- |
| **Frontmatter** | Facts about the article between two `---` lines: its title, language, theme. Never design. | Yes |
| **Design head** | Definitions: `\font`, `\token`, `\palette`, `\breakpoint`, `\grid`, `\style`, `\spot`, `\parent`. They draw nothing on their own. | No |
| **Stories** | `\story` blocks: named runs of text that frames show. | No |
| **Scenes** | `\scene` blocks: the bands of the page, top to bottom. | No (see [the implicit form](#a-file-with-no-scenes)) |

A document may also hold one `\folio` (a running label) among its stories and scenes.

Rules:

- Every definition comes before the first story, scene or piece of content. A definition after it is error `P040`.
- A file with at least one `\scene` is in the **explicit form**: everything outside the design head must be a `\story`, a `\scene` or the `\folio`. A paragraph or a text element at the top level is error `P041`.
- A file with no `\scene` is in the **implicit form**: everything after the design head is the article.

```woc
---
wocument: 1
title: The Harbour at Dawn
lang: en-GB
---
%% Design head: definitions only.
\style[name=body, size=20px]

%% Stories.
\story[name=main]{
The boats come in before the gulls are up. By six the quay is stacked with crates, and the auction bell has rung twice. The buyers stand in a loose ring around the first pallet, hands in their pockets, saying nothing at all.

Nobody shouts. The prices go up on a whiteboard, and the buyers nod or don't. A nod is a bid; a second nod, from the same man, is a mistake he will hear about for the rest of the week.

By eight it is over. The crates go into vans, the vans go inland, and the quay is hosed down until it shines. The gulls arrive for what is left, which is never very much.
}

%% Scenes.
\scene[height=page]{
  \frame[cols=1-8, cols@tablet=all, cols@phone=all]{
    \headline{The Harbour at Dawn}
  }
  \frame[story=main, cols@tablet=all, measure=600px]
}
```

## Frontmatter

YAML between two `---` lines at the very top of the file. The first line of a document must be `---` (error `P001` otherwise), and the frontmatter must close with a second `---` (error `L005`).

| Field | Type | Required | Default | Notes |
| :---- | :---- | :---- | :---- | :---- |
| `wocument` | integer | Yes | | The language version. Always `1` today. |
| `title` | string | Yes | | The browser tab, and the page's `<title>`. Independent of `\headline`. |
| `lang` | language tag (BCP 47), such as `en-GB` | No | `en` | Sets hyphenation, how straight quotes are curled, and the page's `lang`. |
| `theme` | path | No | none | One `.woct` theme file. See [Theme files](#theme-files). |
| `description` | string | No | none | The page's meta description, for search results and link previews. |
| `author` | string, or a list of strings | No | none | Metadata only. The visible byline is `\byline`. |
| `date` | date, such as `2026-11-01` | No | none | Metadata only. |
| `section` | string | No | none | Metadata only. |
| `social-image` | path | No | none | A picture for link previews. Checked for existence (`W050`). |

- **Unknown fields are an error** (`P002`), so a typo such as `titel:` never passes silently.
- A missing `wocument` or `title`, or a field of the wrong type, is error `P003`.
- Quote a value that contains `: ` or starts with a quotation mark: `title: "Night: a story"`.
- An author list is written in YAML's own way: `author: [Sam Rivera, Ana Ruiz]`.

> **⚑ Flag:** The page assumes `wocument` accepts only `1` and `date` only an ISO date. Today the engine accepts any whole number for `wocument` and any text for `date`, without a warning. Write `wocument: 1` and dates as `YYYY-MM-DD`.

> **⚑ Flag:** The page assumes `social-image` (and `author`, `date`, `section`) reach the built page's link-preview tags. Today `woc build` writes only `<title>`, the `description` meta tag and `lang`; the other fields are kept in the page's data but not written as tags. Add preview tags in your own site's template until then.

## The design head

Definitions only, all before the first story, scene or content. A definition that reuses a name from Vanilla or from the theme changes only the attributes it sets: `\style[name=body, size=20px]` keeps everything else about Vanilla's body. [Themes and the cascade](../understand/themes-and-the-cascade.md) explains the order in which definitions win.

| Command | Defines |
| :---- | :---- |
| `\font` | A font file and the family name it provides |
| `\token` | A named value, used as `$name` |
| `\palette` | A named set of the five colour roles |
| `\breakpoint` | A named range of screen widths |
| `\grid` | A named grid: columns, gutter, margins, baseline |
| `\style` | A named paragraph or character style |
| `\spot` | A place a floating picture of one size may take |
| `\parent` | A scene template |

## A file with no scenes

A document with no `\scene` is in the **implicit form**: the engine sets it as one magazine page. This is what you get when you write only text and commands under the frontmatter, as in [Your first page](../start-here/your-first-page.md).

Exactly what it produces:

| Part | What the engine makes |
| :---- | :---- |
| Scene | One scene, `scene-1`, with `height=page` on the `default` grid and palette. |
| Heading frame | The run of `\kicker`, `\headline`, `\deck`, `\byline` and `\meta` the file starts with, in `frame-1`: `cols=1-8, cols@tablet=all, cols@phone=all`. |
| Story frame | Everything else, in `frame-2`: `cols=all, columns=auto, columns@wide=4, columns@tablet=1, measure=600px`. `columns=auto` takes as few columns as keep each line within 600px. |

- A file that doesn't start with a heading element gets the story frame alone, as `frame-1`.
- `\lede` opens the story, not the heading frame.
- The heading run ends at the first element that isn't one of the five. A `\kicker` written after the first paragraph stays in the story.
- `\story`, `\frame` and `\group` at the top level of an implicit-form file are error `P020`: add a `\scene`.
- Mixing top-level content with a `\scene` is error `P041`.

With Vanilla's grid that means one column on phones and tablets, two from 1024px to about 1440px wide, three from there to 1799px, and four at 1800px and wider.

## The smallest valid file

```woc
---
wocument: 1
title: Notes from the Ferry
---
```

It passes `woc check` with no errors and no warnings, and builds an empty page titled "Notes from the Ferry". Everything the page would need, Vanilla supplies.

## Theme files

A `.woct` file holds a design that several documents share.

- **Definitions only**: no frontmatter, no paragraphs, no stories, no scenes. Anything else is error `P045`.
- **One per document**, loaded with `theme:` in the frontmatter. It's the language's only way to include another file.
- A relative path (`./edition.woct`) is read from the document's folder. A site-absolute path (`/themes/edition.woct`) is read from the `--public` folder (see [The woc command](cli.md#paths)).
- A missing theme file stops the check and the build, with "cannot read the theme".
- The document's own definitions override the theme's, name by name and attribute by attribute.
- `woc check edition.woct` checks a theme on its own: it parses it and reports any error.

```woct file=edition.woct
%% edition.woct: the harbour edition's shared design.
\token[name=tide, value=#1d5c63]
\palette[name=default, paper=#f6f4ef, ink=#1b1a17, muted=#5e5a52, accent=$tide, rule=#ddd6c8]
\style[name=kicker, color=accent]
\style[name=headline, size=fluid(40px, 80px), tracking=-0.02em]
```

```woc
---
wocument: 1
title: The Harbour at Dawn
theme: ./edition.woct
---
\kicker{Coast · Work}
\headline{The Harbour at Dawn}

The boats come in before the gulls are up. By six the quay is stacked with crates, and the auction bell has rung twice. The buyers stand in a loose ring around the first pallet, hands in their pockets, saying nothing at all.

Nobody shouts. The prices go up on a whiteboard, and the buyers nod or don't. A nod is a bid; a second nod, from the same man, is a mistake he will hear about for the rest of the week.
```

## Encoding and lines

| Rule | Detail |
| :---- | :---- |
| Encoding | UTF-8. Invalid UTF-8 is error `L001`. A byte order mark at the start is removed. |
| Line endings | `\r\n` and `\r` become `\n` before anything else, so files from any system read the same. |
| Positions | Line and column numbers in errors count from 1, on the normalised text. Columns count characters, not bytes. |
| Extensions | `.woc` for documents, `.woct` for themes. `woc` reads any file ending in `.woct` as a theme. |
| Canonical form | `woc format` writes UTF-8 with `\n` line endings, no byte order mark and one newline at the end. |

## Related

- [Syntax and values](syntax.md): how commands, attributes and text are written.
- [Commands and attributes](commands.md): every command and its attributes.
- [Vanilla](vanilla.md): what you get before you define anything.
- [Scenes, stories and frames](../understand/scenes-stories-frames.md): why a document is built this way.
