# New underneath, familiar on top

Wocument is built on one idea: use what the modern web can do to give readers something they already know and trust, the editorial page of a magazine. Most of the choices you'll meet in these docs, from scenes to the way pictures move, follow from it. This page explains the idea, where it comes from, and the choices it led to.

## The idea has a name

The industrial designer Raymond Loewy called it **MAYA**: *most advanced, yet acceptable*. People are drawn to the new, but they're wary of anything too unfamiliar. A design that lands well sits in between: as new as it can be while still feeling like something people know.

Wocument tries to sit in that place.

- **Underneath, it's new.** The page is laid out on each reader's own screen, at the moment they open it. Text flows from column to column and around the shapes of pictures. Scenes turn as the reader scrolls.
- **On top, it's familiar.** What the reader sees is a magazine page: a headline that owns the first screen, text in columns that line up, a picture with a caption, a quotation pulled out large.

A reader shouldn't have to learn anything to read a Wocument page. They should only notice that it reads well.

## What stays familiar on purpose

These are things readers and writers already understand. Wocument keeps them, by name and by behaviour.

- **Columns** of text, with lines that sit at the same height side by side.
- **The parts of an article**: kicker, headline, deck, byline, drop cap, subhead, pull quote, caption, credit, fact box, end mark. Each one is a command with the name an editor would use.
- **The page turn.** A magazine page ends and the next begins. On a large screen, Wocument sets long text one screen at a time, and the space bar moves to the next screen the way turning a page would.
- **Editing copy to fit.** Magazine editors trim or add a line so a page ends cleanly. `woc check` tells you how many characters would fill a short screen, so you can do the same.
- **A plain text file.** The thing you write is text, not a database or a design app's file. You can open it in any editor, keep it in version control, and read it in ten years.

## What's new underneath

These are the parts that the web makes possible and print never could.

- **A layout for every screen.** A print page has one size. A Wocument page is laid out again for each reader's screen: four columns on a wide monitor, two on a laptop, one on a phone. The same file serves all of them.
- **Threading on the web.** In desktop publishing, a story can run from one text box into another. Wocument does the same on a web page: a story can start in two columns under the opener and carry on, at the exact word where it stopped, in a frame several scenes later.
- **A baseline grid across columns.** Every line of body text sits on a shared grid of horizontal lines, the **baseline grid**, so neighbouring columns line up. Browsers don't do this on their own; the engine does it.
- **Pictures that choose their spot.** You write a picture next to the paragraph it belongs to. On a large screen, the engine tries the positions near that paragraph and picks the one where the picture and the columns around it look best. On a phone, it sits where you wrote it. [How pictures find their place](how-pictures-find-their-place.md) explains how.
- **Text that follows a shape.** A cut-out photograph, one with a transparent background, can have the text flow around its outline rather than its rectangle.

## The choices that follow

Holding "new underneath, familiar on top" as a rule led to several decisions you'll meet across these docs.

**Scenes, not pages.** Wocument never asks how big the page is. It asks what the reader's screen is, and lays out for that. With no fixed page size, an article is a series of **scenes** instead: full-width bands, each with its own grid and colours, stacked from top to bottom. Moving from one scene to the next is the screen's version of turning a page. A scene can be exactly one screen tall, as tall as its content, or set as magazine pages one screen at a time. [Scenes, stories and frames](scenes-stories-frames.md) explains all three.

**Motion never moves the layout.** Elements can fade or rise into view as the reader scrolls, but the text is always laid out in its final position first, and motion (a fade, a slide, a zoom, a wipe) is drawn on top of it. Readers who ask their device for reduced motion get none, unless a writer overrides that with `motion=always`. A page should never jump while someone is reading it.

**Defaults for everything.** A file with no design in it still makes a good page, because **Vanilla**, the built-in design, sets every value. You design by changing what your publication needs and leaving the rest. That's how a newcomer gets a magazine page from a headline and some paragraphs.

**The file describes; it doesn't compute.** There are no variables, conditions or loops in the language. You say what each part is, and the engine works out the geometry. That keeps files readable by writers, and lets the engine guarantee things, like every line sitting on the grid, that a hand-written layout couldn't.

## What Wocument doesn't claim

Being honest about the limits is part of earning trust.

- It doesn't replace a designer's judgement. Vanilla is a strong default, and the engine follows rules a designer would recognise, but a publication with a point of view still needs someone to set its type, colours and picture rhythm.
- It isn't print. There's no PDF and no fixed page. If you need a page to look identical everywhere, that's a different tool.
- Some magazine conventions aren't built yet: lists, tables, footnotes, picture zoom, and a few others. [What isn't built yet](../reference/limits.md) has the full list.

## Next

- [Scenes, stories and frames](scenes-stories-frames.md): the model behind every page.
- [Why layout runs on the reader's screen](layout-on-the-readers-screen.md): the "new underneath" part, in more depth.
