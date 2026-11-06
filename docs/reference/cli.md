# The woc command

Every subcommand and option of `woc`, the command that checks, formats, previews and builds Wocument files, with what each prints and its exit status. To install it, see [Install Wocument](../start-here/install.md).

```text
woc <command> [options] <file...>
```

`wocument` is the same command under a longer name.

## Subcommands

| Command | Takes | Does |
| :---- | :---- | :---- |
| `woc check <file...>` | One or more `.woc` or `.woct` files | Reads each file as the engine does and reports every error and warning, then the copyfitting report. |
| `woc dev [file\|folder]` | One `.woc` file or one folder; default: the current folder | Opens the editor in your browser, with a live page beside the source. |
| `woc build <file...>` | One or more `.woc` files | Writes a folder you can upload: the page, its script and its files. |
| `woc format <file...>` | One or more `.woc` or `.woct` files | Prints each file in canonical form. |
| `woc parse <file>` | One file | Prints the parsed file (the AST) as JSON. For developers. |
| `woc resolve <file>` | One `.woc` file | Prints the Resolved Document as JSON: every value worked out, per breakpoint. For developers. |

A file ending in `.woct` is read as a theme everywhere.

## Options

| Option | With | Default | Does |
| :---- | :---- | :---- | :---- |
| `--public <dir>` | every command | `./public` | The folder that site-absolute paths such as `/img/quay.jpg` are read from. See [Paths](#paths). |
| `--out <dir>` | `build` | `./dist` | Where the built page goes. |
| `--no-webp` | `build` | off | Keep JPEG, PNG and GIF pictures as they are, instead of converting them to WebP. |
| `--write` | `format` | off | Rewrite the files in place instead of printing them. |
| `--check` | `format` | off | Print nothing; exit with status 1 if any file isn't in canonical form. |
| `--port <n>` | `dev` | `5190` | The first port to try. If it's taken, the next free one is used. |
| `--host` | `dev` | off | Also listen on your network, so a phone on the same Wi-Fi can open the page. |
| `--no-open` | `dev` | off | Don't open the browser. |
| `--help`, `-h` | | | Print the usage message. |

## Exit status

| Status | Means |
| :---- | :---- |
| `0` | Everything worked. Warnings don't change the status. |
| `1` | Something reported an error: a parse or resolve error, a missing input file, a missing theme, or (with `format --check`) a file that isn't canonical. |
| `2` | A usage error: no command, no file, an unknown command, more than one file to `parse`, `resolve` or `dev`, or a `--port` that isn't a number. |

With several files, `check`, `format` and `build` go through all of them before they stop, so one run reports everything.

## Paths

Every path in a document, such as `src=` on a picture, `src=` on a `\font`, `theme:` or `social-image:`, is read one of two ways.

| Path | Read from | Example |
| :---- | :---- | :---- |
| Relative | The document's own folder | `./pictures/quay.jpg` |
| Site-absolute (starts with `/`) | The `--public` folder | `/img/quay.jpg` is `public/img/quay.jpg` |

`--public` itself is relative to the folder you run `woc` in. Vanilla's own fonts, under `/fonts/vanilla/`, come with the typesetter and need no `--public` folder.

## woc check

```bash
woc check night-bakers.woc
```

Prints nothing when there is nothing to report. Otherwise it prints each problem as two lines on the terminal's error output: where it is, then what's wrong and, usually, how to fix it.

```text
woc: parse error [P012] at night-bakers.woc:31:1
  Unknown command \pullqoute. Did you mean \pullquote?
woc: resolve warning [W033] at night-bakers.woc:18:1
  \figure "figure-1" has no alt. Add alt="..." (alt="" if decorative).
```

- A parse error stops the check of that file before it's resolved, so fix parse errors first and check again.
- A resolve error has no code and no position: `woc: resolve error at night-bakers.woc`, then the problem, such as `unknown style headline-xl`. Some messages end with the line, such as `(line 12)`.
- After the warnings comes the **copyfitting report** for page scenes. See [Warnings and errors](diagnostics.md#the-copyfitting-report).
- For a `.woct` file, `woc check` only parses it.

Every code is listed in [Warnings and errors](diagnostics.md).

## woc dev

```bash
woc dev night-bakers.woc
```

Starts a server on your computer, prints `woc dev: the editor is at` and its address, and opens it in your browser. It runs until you stop it with Ctrl-C.

- **What it shows.** Every `.woc` file in the folder, in a **Document** menu. `woc dev` on a file opens that file; on a folder, or alone, the first file in alphabetical order.
- **A new file** that doesn't exist yet is made from a short template: an "Untitled" headline and "Start writing here."
- **The editor.** The source on the left; on the right the tabs **Preview** (the page, laid out as you type), **Problems** (every error and warning, at its line; select one to go there) and **Resolved** (the Resolved Document). On a narrow window the source becomes a tab of its own.
- **Saving.** **Save**, or Cmd-S (Ctrl-S on Windows and Linux), writes the file. Edits you haven't saved are kept in this browser until you save or press **Revert**. **Format** rewrites the source in canonical form.
- **Width** sets the preview to a phone (390px), a tablet (768px), 1280px or 1920px, or fits it to the pane. **Motion** turns reveals on in the preview.
- **Page** opens the page alone, for another window or a phone.
- **Your own editor.** Save the file in any editor and the open pages show the new version. Saving a `.woct` theme in the folder updates every open page.
- **The visor.** Press **V** on the page to show the grid, the bands and the lines, and to see why each column ended and each picture went where it did. Press V again to hide it.
- **On a phone.** `woc dev --host` also listens on your network and prints the network address. Open it on a phone on the same Wi-Fi. Saving works from your computer only.
- **Pictures** show as WebP, as `woc build` ships them. The first time, a picture shows as it is for a moment while its WebP is made. Converted pictures are kept in your system's cache folder, under `wocument/webp` (`~/Library/Caches/wocument/webp` on macOS, `~/.cache/wocument/webp` on Linux, or under `$XDG_CACHE_HOME` when it's set), so each picture converts once.

The Problems tab lists parse and resolve errors and warnings. It doesn't show W064 or the copyfitting report: run `woc check` for those.

For developers: `page.html?doc=<name>&inspect` lays the page out with the layout engine's reasons and puts `window.__woc` (`rd`, `pd`, `report`) on the page.

## woc build

```bash
woc build night-bakers.woc --out dist
```

Writes:

```text
dist/index.html        the page: the reading version and the document's data
dist/woc.<hash>.js     the script that lays the page out in the reader's browser
dist/assets/           every file the page uses, named by its content
```

and prints `woc: built dist/index.html` for each page.

- **One input** gives `index.html`. **Several** give `<name>.html` each, sharing one script and one `assets/` folder. Two inputs with the same name are an error.
- **Pictures**: JPEG, PNG and GIF become WebP (an animated GIF stays animated), unless you pass `--no-webp`. Fonts, videos and other files are copied as they are. Only files the page uses are copied, including Vanilla's fonts when its styles are used.
- **Names by content**: the `<hash>` and the asset names change whenever the file changes, so readers never get a stale copy.
- **Warnings don't stop a build.** A missing picture or font is a warning and the page is still built. A parse or resolve error fails that file (exit status 1) and writes no page for it.
- **Old files stay.** Files from earlier builds stay in the folder. Delete it for a clean build.
- **The page** has a `<title>`, a `description` meta tag when the frontmatter has one, and `lang`. Without JavaScript it shows the reading version: the whole text in one column.

Upload the whole folder to any host that serves plain files. To look at a build on your own computer, serve the folder:

```bash
npx serve dist
```

> **⚑ Flag:** This page assumes a static server is the way to preview a build. Opening `index.html` straight from your disk is untested and probably shows a blank page: the page hides its reading version as soon as it loads, and browsers usually refuse to run its script from a file, so nothing replaces it. Serve the folder (`npx serve` downloads a separate tool the first time; any static server works).

## woc format

```bash
woc format --write night-bakers.woc
```

Rewrites the file in canonical form: attributes in the schema's order, `, ` between them, one blank line between blocks wherever you left one or more, two spaces of indentation per level, each paragraph on one line, minimal escapes. Your comments stay where they are, and attributes equal to their default are kept. Formatting twice changes nothing.

- Without `--write`, the result goes to standard output and the file is untouched.
- `--check` prints `<file>: not formatted` for each file that would change, and exits with status 1.
- A file with a parse error isn't formatted, so nothing is lost.

## woc parse and woc resolve

`woc parse` prints the syntax tree (AST) exactly as the source says it, before any defaults. `woc resolve` prints the Resolved Document, the fully worked-out page the browser lays out. Both print JSON to standard output and diagnostics to the error output. They're for developers and tools; [How the engine works](../understand/how-the-engine-works.md) explains the stages.

## Related

- [Warnings and errors](diagnostics.md): every code `woc check` reports.
- [Check and polish a page](../build/check-and-polish.md): a working routine around `woc check` and `woc dev`.
- [Publish a page](../build/publish.md): from `woc build` to the web.
