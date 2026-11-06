# Wocument documentation

Wocument lays out long reads like magazine pages, on whatever screen your reader has. You write one plain text file with your words, your pictures and your design. Wocument sets it in columns, flows the text around pictures, and does it all again for every screen size, in the reader's browser.

These docs cover the Wocument language, the `woc` command, and Vanilla, the built-in design.

## Start here

New to Wocument? Read these three in order. Together they take about twenty-five minutes.

1. [What Wocument is](start-here/what-is-wocument.md): the problem it solves and what you get.
2. [Install Wocument](start-here/install.md): get the `woc` command.
3. [Your first page](start-here/your-first-page.md): write a short feature, watch it lay itself out, and publish it.

## Learn

Longer lessons that build one article, step by step.

- [Lay out a magazine feature](learn/lay-out-a-feature.md): your own colours and type, a fact box, a running head, and a theme for the series.
- [Open with a full-screen scene](learn/open-with-a-scene.md): a photograph behind the headline, then the columns.

## Build

Short guides for one job each.

- [Add pictures](build/add-pictures.md)
- [Wrap text around a cut-out](build/wrap-text-around-a-cut-out.md)
- [Make a theme](build/make-a-theme.md)
- [Use your own fonts](build/use-your-own-fonts.md)
- [Shape the page for phones](build/shape-the-page-for-phones.md)
- [Thread a story through scenes](build/thread-a-story.md)
- [Check and polish a page](build/check-and-polish.md)
- [Publish a page](build/publish.md)
- [Design pages with Claude](build/design-with-claude.md)
- [Put the engine in your own site](build/embed-the-engine.md) (for developers)

## Understand

How Wocument thinks, and why it works the way it does.

- [New underneath, familiar on top](understand/maya.md): the idea behind Wocument.
- [Scenes, stories and frames](understand/scenes-stories-frames.md): the page model.
- [Columns, screens and the baseline grid](understand/columns-and-screens.md)
- [How pictures find their place](understand/how-pictures-find-their-place.md)
- [Themes and the cascade](understand/themes-and-the-cascade.md)
- [Why layout runs on the reader's screen](understand/layout-on-the-readers-screen.md)
- [How the engine works](understand/how-the-engine-works.md) (for developers)

## Reference

Everything, exactly.

- [The file](reference/file.md): frontmatter, the parts of a file, the implicit form.
- [Syntax and values](reference/syntax.md): commands, attributes, units, text marks.
- [Commands and attributes](reference/commands.md): every command, generated from the engine.
- [Vanilla](reference/vanilla.md): the built-in design, value by value.
- [The woc command](reference/cli.md)
- [Warnings and errors](reference/diagnostics.md)
- [What isn't built yet](reference/limits.md)
- [Glossary](reference/glossary.md)

## About these docs

The house style and the plan are in [`_meta/`](_meta/). Every whole-document example is checked against the engine with `node docs/_meta/check-examples.mjs`. Some pages describe things that aren't finished yet; each one carries a **⚑ Flag** that says what's assumed, and [`_meta/flags.md`](_meta/flags.md) lists them all.
