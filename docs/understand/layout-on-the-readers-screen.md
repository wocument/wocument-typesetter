# Why layout runs on the reader's screen

Most publishing tools lay out a page once, before anyone reads it. Wocument lays out your page in each reader's browser, when they open it, and again whenever their window changes. That choice explains a lot: why a page fits every screen, why you check it at several widths, and why publishing needs no server. This page explains why Wocument works this way, and what it means for you and your readers.

## You can't know the page size

A printed page has one size, so a designer can place every line once. A web page has as many sizes as there are screens: a phone 390 pixels wide, a tablet held either way, a laptop, a 27-inch monitor, a browser window someone has dragged to half the screen.

A layout made in advance would have to guess. Wocument doesn't guess. It waits until it knows the reader's screen, then sets the page for exactly that screen: the grid, the number of columns, the line breaks, where each picture goes. Turn a tablet from portrait to landscape and the page is set again for the new shape.

## Line breaks depend on real fonts

Where a line breaks depends on the exact width of every letter in the font the reader actually sees. Those widths make columns line up, keep a picture's caption the right number of lines, and decide whether a paragraph splits across two columns.

Measuring text accurately needs the browser and its fonts. So the engine measures in the reader's browser, after the page's fonts have loaded. It never lays out with a fallback font and then jumps when the real one arrives. Vanilla's fonts, Newsreader and Inter, ship with Wocument and load with your page, so every reader measures the same letters.

## What happens when a reader opens your page

1. The page arrives with a **reading version** inside it: your whole article as a clean, single column of text, with its pictures. It's plain HTML. When JavaScript is on, the page keeps it out of sight for the moment the layout takes, so the reader never sees the page jump from one to the other.
2. The page's script waits for the fonts.
3. The engine measures the text and lays out the page for this screen.
4. The laid-out page takes the reading version's place.
5. If the window is resized, the engine lays the page out again.

If the layout fails, the script shows the reading version instead, so the reader still gets the article.

The layout itself is fast arithmetic. The slow part is measuring, and that's done once per paragraph and kept, so a resize doesn't measure everything again.

## Readers without JavaScript still get the article

Some readers block scripts, some use tools that read the raw page, and search engines index it. All of them get the reading version from step 1: every word, in order, with headings and pictures. The magazine layout is a layer on top of an article that works on its own.

The same idea runs through the motion features. Elements that fade or rise into view are always laid out in their final place first, and readers who ask their device for reduced motion see no movement at all, unless the writer insists with `motion=always` (which `woc check` warns about, W034).

## The same file always gives the same page

Layout is **deterministic**: the same file, the same theme, pictures and fonts, the same screen size and the same browser engine always give exactly the same page. There's no randomness and nothing that depends on the time of day. That's what lets you check a page at a few widths and trust what you saw.

The one exception is the browser engine. Browsers measure and break text in slightly different ways. Chrome and Safari agree with each other line for line; Firefox can break some lines in a different place, so a column may end a line earlier or later.

> **⚑ Flag:** How much line-break difference between browsers is acceptable, and which browsers Wocument supports, are open decisions. This page assumes Chrome, Edge, Safari and Firefox in their current versions are supported, and that a line or two of difference in Firefox is accepted.

## What this means for you

- **Check at several widths.** Your page will be seen at many sizes. In `woc dev` you can resize the window and watch the page set itself again, and the render check in the [Wocument Skill](../build/design-with-claude.md) takes screenshots at a phone, a laptop and a desktop width.
- **Don't fight the engine for exact positions.** You say what each part is and roughly where it belongs; the engine places it for each screen. If you need a picture in a particular place, use the levers in [How pictures find their place](how-pictures-find-their-place.md).
- **A built page is plain files.** Since layout happens in the browser, a built page needs no server to run it: one HTML file, one script and your pictures.

## For developers

The engine's pipeline splits where the browser starts. Parsing and resolving run at build time, in Node, and produce the **Resolved Document**, a JSON value that holds every design value for every breakpoint and doesn't depend on the screen. Layout and rendering run in the browser, because the text engine measures through a canvas and can't run in plain Node.

Measurement happens only in the text engine's prepare step, which warms a cache for every piece of text it will be asked about. Layout calls prepare through a cache, once per paragraph and font; everything else is pure arithmetic over cached widths: it reads no DOM and measures nothing itself. The renderer's `mount()` waits for fonts, lays out (preparing as it goes) and renders, and lays out again on resize. Spec §15.1, §15.4 and §15.5 are the contract; [How the engine works](how-the-engine-works.md) walks through the code.

## Next

- [How the engine works](how-the-engine-works.md): the pipeline, stage by stage.
- [Publish a page](../build/publish.md): what `woc build` writes and where to put it.
