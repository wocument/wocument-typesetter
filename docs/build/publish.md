# Publish a page

This guide turns your `.woc` file into a folder of plain files that any web host can serve: no server code, no database.

## Before you start

- `woc check` reports no errors for your page. Warnings don't stop a build, but deal with them first ([Check and polish a page](check-and-polish.md)).
- Pictures with paths that start with `/` live in the folder you pass with `--public` (`./public` by default). Relative paths are read from the document's folder.

## Steps

### 1. Build the page

From the article's folder:

```bash
woc build tide-clock.woc --out dist
```

`--out` names the folder to write. Without it, `woc` writes to `./dist`. The terminal prints `woc: built dist/index.html` when it's done.

### 2. Look at what's in the folder

```text
dist/index.html          the page
dist/woc.<code>.js       the script that lays out the page in the reader's browser
dist/assets/             your pictures, videos and fonts
```

- **`index.html`** holds two things: a plain **reading version** of the whole article, and your document's design, ready for the script.
- **`woc.<code>.js`** is the engine. It waits for the fonts, lays the page out for the reader's screen, and does it again when the window changes size. That's why layout happens in the reader's browser and not at build time: nobody knows the screen size in advance ([Why layout runs on the reader's screen](../understand/layout-on-the-readers-screen.md)).
- **`assets/`** holds every file the page uses. JPEG, PNG and GIF pictures are converted to WebP, which is usually much smaller; an animated GIF stays animated. SVG, WebP and AVIF pictures, videos and other files are copied as they are. Vanilla's fonts (Newsreader and Inter) are copied too, but only the ones your page's styles use.

Every file except the HTML page is named after its contents: the `<code>` part changes whenever the file changes. A reader's browser can keep these files for a long time and still never show a stale copy.

To keep your pictures in their original format, add `--no-webp`:

```bash
woc build tide-clock.woc --out dist --no-webp
```

> **⚑ Flag:** Each picture is published once, as WebP at its own size; Wocument doesn't make smaller copies for small screens yet. Until it does, give it pictures about 2,400 pixels on their long side, not larger.

### 3. Build several pages at once (optional)

Give `woc build` several files, and each becomes its own page, named after its file:

```bash
woc build tide-clock.woc night-bakers.woc --out dist
```

```text
dist/tide-clock.html
dist/night-bakers.html
dist/woc.<code>.js       shared by both pages
dist/assets/             shared too: a file both pages use is stored once
```

With one input the page is always `index.html`. With several, two files with the same name (from different folders) would overwrite each other, so `woc` refuses and asks you to rename one or build them into different folders.

### 4. Preview the build

Serve the folder with a static file server, then open the address it prints:

```bash
npx serve dist
```

`npx serve` is a separate tool, downloaded the first time you run it. Any static file server works.

> **⚑ Flag:** Previewing with `npx serve` isn't tested yet; this page assumes it's the recommended way. Don't double-click `index.html` instead. Opened from your disk (a `file://` address), the page is probably blank, not the reading version: a small script in the page hides the reading version straight away, and the browser then refuses to run the engine's script from a file, so nothing replaces it.

Check the page at a phone, a laptop and a desktop width, as you did in `woc dev`. The built page should look the same.

### 5. Upload the folder

Upload everything inside `dist`, keeping the folder structure, to any host that serves plain files. That might be your web host's file manager, an SFTP upload, or a static hosting service that publishes a folder.

All the paths inside the folder are relative, so it works at the top of a site (`example.com/`) or in a subfolder (`example.com/features/tide-clock/`).

Two settings are worth knowing about, if your host lets you change them:

- **Caching.** The script and everything in `assets/` can be cached for a long time, because their names change when their contents do. Cache the `.html` pages briefly, so readers get your corrections.
- **Video.** Browsers seek through video with range requests, and Safari won't play video without them. Most static hosts support them; check that your videos play on an iPhone.

### 6. Rebuild cleanly

`woc build` adds to the folder; it never deletes. Pictures you removed from the article, and scripts from earlier builds, stay in `dist`. They do no harm, but for a clean folder, delete it before you build:

```bash
rm -rf dist
woc build tide-clock.woc --out dist
```

## Check the result

- The terminal printed `woc: built ...` for every page, and the command ended without an error.
- In the browser, the page looks the way it did in `woc dev`, at every width.
- With JavaScript turned off, the page shows the reading version (see below).

### The reading version

Every built page carries the whole article as plain HTML: the scenes in order, each story once, in one readable column, in your colours and type styles (your font files load only with the script, so it uses each style's fallback fonts). Readers whose browser doesn't run the script see it, and so do tools that read the page's HTML. When the script runs, it replaces the reading version with the laid-out page. If the layout fails before it draws anything, the script shows the reading version again, so the reader still gets the text.

The reading version uses your base design. Values for particular screen sizes, such as `hide@phone`, apply only to the laid-out page.

## If it doesn't look right

**The build stopped with an error.** A parse error or a resolve error (an unknown style, a missing theme file, a story with no frame) fails the build for that page, and `woc build` ends with status 1. With several files, the others are still built. Run `woc check` on the file that failed and fix what it reports.

**The build printed W050, "Missing file".** A missing picture, video or font is a warning, not an error, so the page is built without it. Fix the path, or put the file under `--public`, and build again before you upload.

**The page is blank, or shows only the reading version.** Check that you uploaded `woc.<code>.js` along with the `.html` file, and that you're opening the page through a web address, not from your disk. The browser's console names any file that didn't load.

**Pictures are missing on the host, but fine locally.** Upload the whole `assets/` folder, and keep it next to the page.

**An old picture still shows after a rebuild.** Upload the new `.html` page as well as the new assets: the page names the new files. If your host caches pages, clear its cache.

## Next

- [Check and polish a page](check-and-polish.md), before every publish.
- [The woc command](../reference/cli.md): every option of `woc build`.
- A developer? [Put the engine in your own site](embed-the-engine.md) shows how to do what `woc build` does inside your own build.
