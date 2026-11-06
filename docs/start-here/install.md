# Install Wocument

This page gets the `woc` command onto your computer, so you can write, preview and publish pages. It takes a few minutes.

## What you need

- **A Mac, Linux or Windows computer** with a terminal. On a Mac that's the Terminal app; on Windows, PowerShell.
- **Node.js 20 or later.** Node runs the `woc` command. Check whether you have it:

  ```bash
  node --version
  ```

  If the answer is `v20` or higher, you're set. If the command isn't found, or the number is lower, install the current version from [nodejs.org](https://nodejs.org).
- **A text editor** you like. Any editor works. For colours and snippets in `.woc` files, see "Editor support" below.
- **A recent browser** to see your pages: Chrome, Edge, Safari or Firefox.

## Install `woc`

```bash
npm install --global @wocument/cli
```

> **⚑ Flag:** Wocument isn't published on npm yet. This page assumes the first release is out, under the `@wocument` name. Until then, use [From the repository](#from-the-repository) below.

Check that it worked:

```bash
woc
```

You should see a short usage message that starts with `usage: woc <command>` and lists `parse`, `resolve`, `format`, `check`, `build` and `dev`. That's everything `woc` can do; the [command reference](../reference/cli.md) explains each one.

The command is also installed as `wocument`, if `woc` clashes with something else on your machine.

## From the repository

If you want the newest engine, or you'd like to work on it, run `woc` from a copy of the source.

```bash
git clone https://github.com/wocument/wocument-typesetter.git
cd wocument-typesetter
npm install
npm run build
```

Then point `woc` at the built command. In the same terminal, from the repository's folder:

```bash
alias woc="node $PWD/packages/cli/dist/cli.js"
```

The alias lasts until you close the terminal. To keep it, add the same line, with the full path written out, to your shell's startup file (`~/.zshrc` on a Mac).

> **⚑ Flag:** After `npm run build`, `npx woc` inside the repository fails with "Permission denied", because the build rewrites the command file without its executable bit. The alias above avoids that. A fix belongs in the build.

## Editor support

> **⚑ Flag:** The VS Code extension (colours and snippets for `.woc` and `.woct` files) isn't published yet. This section assumes it is on the VS Code Marketplace and Open VSX as "Wocument". Until then, any editor works: set it to treat `.woc` files as plain text.

In VS Code, open the Extensions view, search for **Wocument**, and install it. Your `.woc` and `.woct` files get colours for commands, attributes and comments.

## Fonts

You don't need to install any fonts. Vanilla, the built-in design, uses Newsreader for reading and Inter for labels, and both ship with Wocument. They're loaded with your page, so every reader sees the same line breaks.

## Next

[Your first page](your-first-page.md): write a short feature, watch it lay itself out, and publish it.
