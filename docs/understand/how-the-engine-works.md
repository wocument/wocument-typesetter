# How the engine works

This page is for developers: anyone who wants to put the engine in their own site, contribute to it, or understand a result well enough to report a bug. It follows a `.woc` file from source to laid-out page, says which package does each part, and names the contracts between them. It assumes you've read [Scenes, stories and frames](scenes-stories-frames.md) and [Why layout runs on the reader's screen](layout-on-the-readers-screen.md).

## The pipeline in one picture

```text
.woc file (+ one .woct theme)
  │
  │   BUILD TIME, in Node
  ├─ parse      →  AST                   @wocument/parser
  ├─ resolve    →  Resolved Document     @wocument/resolver
  │
  │   RUN TIME, in the reader's browser
  ├─ layout     →  Positioned Document   @wocument/layout (+ @wocument/text-engine)
  └─ render     →  DOM                   @wocument/renderer
```

The line between build time and run time is the one that matters. Everything above it knows nothing about the screen. Everything below it runs once per screen size, because it needs the reader's fonts and viewport.

## No stage calls the next

Each stage is a function you call with the output of the one before. None of them calls the next stage itself. The programs that use the engine, its **hosts**, call them in order:

| Host | Calls | Where |
| :---- | :---- | :---- |
| `woc dev` | `parse()` then `resolve()` on every edit; the browser page calls `mount()` | `packages/cli/src/dev.ts`, `packages/cli/client/view.ts` |
| `woc build` | `parse()`, `resolve()`, then writes the Resolved Document into the page with the reading version | `packages/cli/src/build.ts` |
| A built page | `mount()`, which lays out and renders | the script `woc build` bundles |
| `woc parse` / `woc resolve` / `woc check` | the first stages only, and print the result (`woc check` also runs layout in Node; see below) | `packages/cli/src/cli.ts` |

That makes each stage testable on its own, and means the build never needs a browser.

## Parse: text to AST

`parse()` in `@wocument/parser` turns source text into an **AST** (abstract syntax tree), a tree that mirrors the source exactly. It works in four phases, and only the third one knows any command names:

1. **Prepare (A0).** Decode the bytes, normalise line endings, split off the frontmatter and read it as YAML.
2. **Surface parse (A).** A small fixed grammar finds commands, attribute lists, bodies, text, blank lines and comments. It knows the shape `\name[...]{...}`, but not which names exist.
3. **Shape (B).** Each command is looked up in the **command schema** (`@wocument/schema`). Attribute values are typed (a length, a colour, a range), bodies are checked for the children they allow, and inline marks like `*italic*` are read.
4. **Document checks (C).** The rules about the whole file: definitions before content, implicit or explicit form, at most one folio.

The parser never fills in defaults or expands shorthand. Comments and blank lines are kept, so `woc format` can rewrite a file in canonical form without losing anything. Errors carry a code (`P012` for an unknown command), a position, and usually a suggestion.

### The schema is data

Every command and attribute is a row in `packages/schema/src`: its type, default, allowed children and whether it may vary by breakpoint. Only phase B reads it. **Adding a command is a schema row and a spec table row, never parser code.** If a new command seems to need parser code, the design is wrong. The same rows generate the [command reference](../reference/commands.md), so the docs can't drift from the language.

Phases A0 and A never change when commands are added, which is why a syntax highlighter can reuse them.

## Resolve: AST to Resolved Document

`resolve()` in `@wocument/resolver` turns the AST into the **Resolved Document**: a JSON value with nothing left to look up. It:

- expands the implicit form into one page scene with its heading and story frames;
- applies the cascade (Vanilla, the theme, the document, parents, scenes, elements) and expands tokens and `extends`;
- builds one complete set of values **per breakpoint**, so layout never has to work out a default;
- builds each story's thread;
- checks every placement against every breakpoint's grid, and linearizes what doesn't fit (W031);
- reads pictures through an **asset host**, for their size, and for a cut-out's outline.

The resolver is a pure function: no DOM, no clock, no network, no file system. Anything it needs from outside comes through the `AssetHost` interface (`image()`, `contour()` and `file()`), which `@wocument/assets` implements for Node. That host does three jobs: it reads each picture's dimensions; it traces a transparent PNG's outline, after applying the same crop the page will show; and, for a build, it names files by their content and converts JPEG, PNG and GIF to WebP.

A missing picture is a warning (W050), not a failure: the resolver uses a stand-in size and the page still builds.

The Resolved Document's TypeScript types are the source of truth, in `packages/resolved-document`; `npm run gen:resolved` generates its JSON Schema. It's the handshake between build time and run time.

## Layout: Resolved Document to Positioned Document

`layout(rd, viewport, cache)` in `@wocument/layout` produces the **Positioned Document**: every line and every object box, with exact coordinates, for one viewport.

1. Pick the breakpoint for the viewport's width.
2. For each scene, work out the grid's geometry, place frames and objects, and set every line through the threads, around any wrap exclusions.
3. In page scenes, set multi-column text in screen-tall bands, choose spots for floating objects screen by screen (`packages/layout/src/compose.ts`, explained in [How pictures find their place](how-pictures-find-their-place.md)), and balance the last band.

Layout never measures text itself. It asks the **text engine** (`@wocument/text-engine`) for the next line that fits a width, from a cursor. The engine's contract is four operations: prepare a paragraph, get the next line, keep a resumable cursor, and honour soft hyphens. A variable width per line gives contour wrap; a resumable cursor gives threading.

Measurement happens only in **prepare**, which uses the browser's canvas and warms the engine's cache for every piece of text it will later be asked about. Layout calls prepare through `PrepareCache`, once per paragraph and font, and keeps the result for the page's life. Everything else is arithmetic: layout reads no DOM and makes no measurements of its own, so it's deterministic for a given browser engine. The production engine wraps `@chenglou/pretext`; a fixed-width engine (`createFixedEngine`) stands in for tests in Node.

`layout()` can also return a decision log (`explain: true`), which the visor in `woc dev` shows.

## Render: Positioned Document to DOM

`render()` in `@wocument/renderer` draws one `<section>` per scene and one positioned element per line. It clips pictures to their shape and focuses them on their focal point, and sets up reveals, video playback, page turns, the folio and the page dots.

`mount(root)` is what a page actually calls. `show(rd)` waits for the document's fonts, creates the prepare cache for its language, lays out for the current viewport and renders. On resize, it lays out and renders again, once per animation frame.

`renderStatic(rd)` is the other output: the **reading version**, plain semantic HTML in story order, built from the Resolved Document alone with no layout. `woc build` puts it in the page, so readers without JavaScript, and search engines, get the whole article.

## Checking a page without a browser

`woc check` parses and resolves, then runs layout in Node with the fixed-width text engine at the test widths (360, 768, 1280, 1470 and 2560 pixels). That's how it can report line length (W064) and the copyfitting report without a browser (`packages/cli/src/measure.ts`). Its numbers are estimates, close to a browser's for Vanilla's fonts.

## The packages

| Package | What it holds |
| :---- | :---- |
| `@wocument/schema` | Every command and attribute, as data |
| `@wocument/parser` | Parse phases A0 to C, and the formatter |
| `@wocument/resolved-document` | The Resolved Document types, JSON Schema and invariants |
| `@wocument/resolver` | Resolve, including Vanilla (`src/default-theme.ts`) |
| `@wocument/text-engine` | The text engine contract, the Pretext adapter, the fixed-width engine |
| `@wocument/layout` | Layout, bands, balancing and picture composition |
| `@wocument/renderer` | `render()`, `mount()` and `renderStatic()` |
| `@wocument/visor` | The layout's reasons as readable findings, and the visor overlay |
| `@wocument/assets` | The Node asset host: picture sizes, outlines, WebP, Vanilla's fonts |
| `@wocument/cli` | The `woc` command, the dev server and its editor |

> **⚑ Flag:** The packages aren't published on npm yet, and their programming interfaces aren't declared stable. This page describes the code as it is on 6 November 2026.

## The three contracts

If you change the engine, three interfaces matter most, in this order:

1. **The Resolved Document** (spec §15.3), the build-time to run-time handshake. Viewport-independent, fully concrete, one complete value set per breakpoint.
2. **The AST** (grammar §08), which mirrors the source and doesn't desugar.
3. **The text engine** (spec §15.4): code against the interface, not against Pretext.

## Next

- [Put the engine in your own site](../build/embed-the-engine.md): use `mount()` and the Resolved Document in your own pages.
- The specification (`wocument-specification.md`) and grammar (`wocument-grammar.md`) in the repository are the full contracts.
