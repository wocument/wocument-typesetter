# Check and polish a page

This guide takes a page that works and makes it ready to publish: no errors, every warning dealt with, screens that end where they should, and nothing a reader would trip over on a phone or a wide monitor.

## Before you start

- You have a `.woc` file that `woc dev` can show. If not, start with [your first page](../start-here/your-first-page.md).
- Pictures with paths that start with `/` (`/img/harbour.jpg`) live in a folder that you pass with `--public`. The default is `./public`. Relative paths (`./pictures/harbour.jpg`) are read from the document's folder.

## Steps

### 1. Run `woc check`

From the article's folder:

```bash
woc check tide-clock.woc
```

`woc check` reads the file the way the engine does and prints everything it finds. You can check several files at once (`woc check *.woc`), and a `.woct` theme on its own is checked for syntax.

It reports two kinds of problem:

- **Errors** stop the page from being built. A parse error has a code that starts with `L` or `P`, a line and column, and usually the fix: "Unknown command \pullqoute. Did you mean \pullquote?" A resolve error has no code and names what's wrong: an unknown style, grid, palette or story, a story with no frame, a theme file that isn't there. Fix errors first; the page can't be laid out until they're gone.
- **Warnings** are things a careful editor would want to know. The page still builds. Fix each one, or be sure you can say why you're leaving it.

When there are no errors, `woc check` exits with status 0, even if it printed warnings.

### 2. Deal with the warnings

These are the warnings you're most likely to see:

| Code | What it means | What to do |
| :---- | :---- | :---- |
| W031 | A scene, or an anchored object, falls back to one column at some screen size, because its `cols` don't fit that grid | Add `cols@tablet=` and `cols@phone=`, or `linearize@phone=true` if one column is what you want |
| W032 | `shape=alpha` on a picture with no transparency, so it's set as a rectangle | Use a PNG cut-out, or remove `shape=alpha` |
| W033 | A picture or video has no `alt`, or an embed or audio has no `title` | Describe what the picture shows; use `alt=""` only for decoration |
| W050 | A file is missing: a picture, video, font or caption track | Fix the path, or add the file (under `--public` for paths that start with `/`) |
| W062 | A text colour is too faint against its paper (under 4.5:1) | Darken or lighten that colour in the palette |
| W064 | Body lines hold fewer than about 45 or more than about 75 characters at some screen width (under 30 on a phone) | Change the frame's `cols`, `columns` or `measure`, or the text size, at the widths it names |

[Warnings and errors](../reference/diagnostics.md) lists every code.

> **⚑ Flag:** Today Vanilla's own implicit form gets W064 at 1470px and 2560px (about 43 characters a line). This page assumes that's fixed before the launch. Until then, you can leave this warning on a page that uses Vanilla's columns unchanged.

### 3. Act on the copyfitting report

After the warnings, `woc check` may print a **copyfitting report**. It looks at each screen of a page scene, at each test width, and tells you which screens end short of the bottom line and what would fill them:

```text
screen 2 at 1470px: 3 lines short of the bottom line.
  Add about 120 characters to "The entries are short…", or let figure-2 grow by 3 lines (size=wide).
screen 4 at 2560px: figure-5 is 2 screens from its paragraph; it had no room nearer.
  Make it size=column, or move \figure later in the story.
```

The engine never changes your words. It tells you which paragraph to lengthen and by roughly how much, the way a magazine editor cuts or adds copy to fit a page. You have three choices:

- **Edit the copy.** Add a sentence or two to the paragraph it names, or cut elsewhere.
- **Let a picture grow.** When a photograph is on that screen, the report suggests a larger `size=`.
- **Leave it.** The report is advice and never fails the check. An article's last screen may end short.

A picture that ended up two screens or more from its paragraph is in the report too. Make it smaller, or move it later in the story, so it lands nearer.

### 4. Look at it live

```bash
woc dev tide-clock.woc
```

The editor shows the source on the left and the page on the right.

- The **Problems** tab lists every error and warning with its line and column. Click one to jump to that line. It updates as you type.
- The **Width** menu shows the page at 390 (phone), 768 (tablet), 1280 and 1920 pixels. Look at all four.
- The **Page** link opens the page alone, for a second window or a phone (start `woc dev` with `--host` to open it on a phone).

The Problems tab shows parse errors and resolve warnings. W064 and the copyfitting report come only from `woc check`, so run it again before you finish.

### 5. Ask the visor why

Click the page and press **V**. The **visor** draws the engine's reasoning over the page: the grid, the bands of columns, and why each column ended and each picture went where it did. A side panel lists the decisions on the screen you're looking at; hover over a shape for the details. Press **V** again to hide it.

The visor has four layers you can switch on and off: **Text flow**, **Pictures**, **Grid and space**, and **Lines and words** (off at first). Use it when something surprises you: a column that ends early, a picture that moved away from its paragraph, a gap you didn't expect. [How pictures find their place](../understand/how-pictures-find-their-place.md) explains the decisions it shows.

### 6. Run the render check (optional)

The render check lays your page out in a real browser at a phone, a laptop and a desktop width, saves a screenshot of every screen, and lists what a reader would notice. It's the same check the [Wocument Skill](design-with-claude.md) runs.

It's a script in the typesetter repository, not part of the `woc` command. Run it from your clone of the repository:

```bash
cd wocument-typesetter
npx playwright install chromium
node skills/wocument/scripts/render-check.mjs ~/articles/tide-clock/tide-clock.woc --public ~/articles/tide-clock/public
```

The second line downloads the browser it uses, the first time only.

> **⚑ Flag:** The render check isn't part of the installed `woc` command. It runs only from a clone of the typesetter repository, after `npm install` and `npm run build`, because it loads the engine and Playwright from there. This page assumes that's how you run it until it ships with `woc`.

It writes a folder `.woc-check/<name>/` in the folder you ran it from: `report.md`, `report.json`, and screenshots named by width and screen (`w1280-s02.png`). `--widths 390,1280,1920` and `--screens 12` change what it covers, and `--out` changes where it writes.

It ends with status 1 when the page has **errors**: it didn't lay out, a file didn't load, a script failed, or the page scrolls sideways. Everything else is a **finding**, and advice:

| Finding | What a reader sees | What to try |
| :---- | :---- | :---- |
| Empty room inside a column | a hole, often above a picture | move the picture's anchor, change its `size=`, or edit the copy |
| Fallback: no spot | a picture that couldn't go near its paragraph | `size=column` or `small`, or anchor it a paragraph or two later |
| Photograph cropped or grown | a photograph resized to fill a page | check the crop; set `focus=`, or `fit=contain` if it must show whole |
| Screen ends short | a page ending above its foot | the copyfitting report says how much copy fills it |
| Loose line | justified lines with wide gaps | on a phone, a narrower measure or `align=left` for that style |

### 7. Go through the checklist

Open each screen at each width (in `woc dev`, or the render check's screenshots) and look for these:

- **One thing leads each screen.** The headline is the largest text, and nothing competes with it.
- **The opener reads.** The heading is legible over its picture, and the picture's subject isn't cropped away on a phone. Fix a bad crop with `focus=`, or give phones their own picture with `src@phone=`.
- **Columns end cleanly.** No hole in a column, no lonely line at the top or foot of a column, and no subhead stranded at the bottom.
- **Pictures do their job.** Each is the right size, its crop keeps the subject, its caption sits with it, and none is squeezed into a sliver.
- **Pull quotes and fact boxes sit near their passage**, and never alone on a page.
- **Space is even.** Margins and gaps are consistent, nothing touches an edge, and no screen is crammed. Any screen but the last that's less than about two-thirds full needs a larger picture, a picture anchored later, or a copy edit.
- **The phone version works on its own.** One readable column, nothing hidden that the story needs, pictures large enough to see.
- **Colour reads everywhere**, on every palette and over every background picture.
- **The words are finished.** No single word alone on a headline's or deck's last line, and no placeholder text left in.

Fix what you find, then check again. Two or three rounds is normal.

### 8. Tidy the source

```bash
woc format --write tide-clock.woc
```

`woc format` rewrites the file in the **canonical form**, the one standard way to write a Wocument file: attributes in a fixed order, two spaces of indentation, at most one blank line between blocks, each paragraph on one line. It never deletes an attribute you wrote, even one that equals its default. The editor's **Format** button does the same.

- Without `--write`, it prints the formatted file and leaves yours alone, so you can compare.
- `woc format --check tide-clock.woc` prints nothing for a tidy file and exits with status 1 for one that isn't, which suits a script.
- A file with errors isn't formatted: fix the errors first.

## Check the result

The page is ready when:

- `woc check` prints no errors, and every warning left is one you can explain;
- the copyfitting report has nothing you want to act on;
- you've looked at every screen at a phone, a laptop and a desktop width, and nothing on the checklist is left.

## If it doesn't look right

**The Problems tab is empty, but `woc check` shows a warning.** W064 and the copyfitting report come only from `woc check`.

**`woc check` says a file is missing, but it's there.** A path that starts with `/` is read from the `--public` folder, not the document's folder. Pass `--public`, or write the path relative to the document (`./pictures/harbour.jpg`).

**The render check fails with "Cannot find module".** Run it from your clone of the typesetter repository, after `npm install` and `npm run build`.

**The same column ends short at every width.** Widows and orphans (single lines left at a column's foot or top) are kept off the page by moving lines on, and paragraphs of three lines or fewer never split. Many short columns on one page usually mean awkward paragraph lengths; edit the copy.

**The visor shows nothing when you press V.** Click the page first, so the key goes to the page and not the source editor.

## Next

- [Publish a page](publish.md): build the folder you upload.
- [Warnings and errors](../reference/diagnostics.md): every code and what it means.
- [The woc command](../reference/cli.md): every option of `check`, `dev` and `format`.
