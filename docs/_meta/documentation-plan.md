# Documentation plan

What the Wocument docs cover, for whom, and in what order. The writing rules are in [`writing-guide.md`](writing-guide.md).

## Scope

The open products a writer needs to make and publish a page: the Wocument language (`.woc` and `.woct` files), the `woc` command (`check`, `dev`, `build`, `format`), Vanilla, and a short page on the open Skill. Wocument Designer and Wocument Touch are out of scope.

## Readers and their journeys

**A writer**, first visit: *What is this?* → *Install it* → *Make my first page* → *Make a real feature* → looks up commands as needed → reads *why* when something surprises them.

**A developer**, first visit: *What is this?* → *How does the engine work?* → reference for the language and `woc` → *Put the engine in my own site*.

## Pages

| Section | Page | Kind | Reader |
| :---- | :---- | :---- | :---- |
| | [`README.md`](../README.md) | Index | Both |
| Start here | [What Wocument is](../start-here/what-is-wocument.md) | Explanation | Both |
| | [Install Wocument](../start-here/install.md) | How-to | Both |
| | [Your first page](../start-here/your-first-page.md) | Tutorial | Writer |
| Learn | [Lay out a magazine feature](../learn/lay-out-a-feature.md) | Tutorial | Writer |
| | [Open with a full-screen scene](../learn/open-with-a-scene.md) | Tutorial | Writer |
| Build | [Add pictures](../build/add-pictures.md) | How-to | Writer |
| | [Wrap text around a cut-out](../build/wrap-text-around-a-cut-out.md) | How-to | Writer |
| | [Make a theme](../build/make-a-theme.md) | How-to | Writer |
| | [Use your own fonts](../build/use-your-own-fonts.md) | How-to | Writer |
| | [Shape the page for phones](../build/shape-the-page-for-phones.md) | How-to | Writer |
| | [Thread a story through scenes](../build/thread-a-story.md) | How-to | Writer |
| | [Check and polish a page](../build/check-and-polish.md) | How-to | Writer |
| | [Publish a page](../build/publish.md) | How-to | Writer |
| | [Design pages with Claude](../build/design-with-claude.md) | How-to | Writer |
| | [Put the engine in your own site](../build/embed-the-engine.md) | How-to | Developer |
| Understand | [New underneath, familiar on top](../understand/maya.md) | Explanation | Both |
| | [Scenes, stories and frames](../understand/scenes-stories-frames.md) | Explanation | Both |
| | [Columns, screens and the baseline grid](../understand/columns-and-screens.md) | Explanation | Both |
| | [How pictures find their place](../understand/how-pictures-find-their-place.md) | Explanation | Both |
| | [Themes and the cascade](../understand/themes-and-the-cascade.md) | Explanation | Both |
| | [Why layout runs on the reader's screen](../understand/layout-on-the-readers-screen.md) | Explanation | Both |
| | [How the engine works](../understand/how-the-engine-works.md) | Explanation | Developer |
| Reference | [The file](../reference/file.md) | Reference | Both |
| | [Syntax and values](../reference/syntax.md) | Reference | Both |
| | [Commands and attributes](../reference/commands.md) | Reference (generated) | Both |
| | [Vanilla](../reference/vanilla.md) | Reference | Both |
| | [The woc command](../reference/cli.md) | Reference | Both |
| | [Warnings and errors](../reference/diagnostics.md) | Reference | Both |
| | [What isn't built yet](../reference/limits.md) | Reference | Both |
| | [Glossary](../reference/glossary.md) | Reference | Both |

## Decisions taken for this first version

- The docs live as Markdown in `docs/` in the typesetter repository, next to the code they describe, so examples can be checked against the engine. The website shows them later.
- Voice: warm and conversational (Google developer style), not ASD-STE100.
- Open items are written as solved, with a flag (see the writing guide).
- `reference/commands.md` is generated from the schema: `npm run docs:refs`.
- Automated prose linting (Vale, markdownlint, link checks) comes later. Only the example check exists now.
