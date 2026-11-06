# Commands and attributes

Every command in the Wocument language, with every attribute it takes, its type and its default. This page is generated from the engine's command schema by `npm run docs:refs`, so it always matches the engine: don't edit it by hand.

Each command starts with a short block:

- **class**: a block command ends the paragraph before it; an inline command sits inside a line of text.
- **body**: whether the command takes content in braces, and what kind: `inline` text, `block` content such as paragraphs, or `struct`, which holds only other commands.
- **children**: the commands its body accepts. `#paragraph` means plain paragraphs.
- **at most once**: the children it takes only one of.
- **rule**: a check the engine makes, with its error code.

In each table, **Type** lists the values an attribute accepts (see [Syntax and values](syntax.md)), **Default** is what you get when you leave it out, and "not responsive" means the attribute can't take a breakpoint suffix such as `@phone`. For what the engine doesn't build yet, and what to do instead, see [What isn't built yet](limits.md).
