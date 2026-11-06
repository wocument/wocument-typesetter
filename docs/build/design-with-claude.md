# Design pages with Claude

This guide sets up the Wocument Skill, so you can ask Claude to write, design, check and revise Wocument pages with you, and shows you how to brief it and review what it makes.

## What the Skill does

A **skill** is a folder of instructions and reference material that teaches Claude a particular job. The Wocument Skill is open source, in `skills/wocument/` in the typesetter repository. With it, Claude:

- writes `.woc` documents and `.woct` themes, using only commands and attributes that exist;
- runs `woc check` and fixes every error, and fixes or explains every warning;
- lays the page out in a browser at a phone, a laptop and a desktop width, and looks at every screen;
- uses the engine's own findings (holes in columns, pictures that found no good spot, screens that end short) to revise the page, and tells you what it changed.

The Skill holds a reference to every command, a description of what each attribute does in practice, notes on composition and editorial design, and a few starting points (recipes) for common pages: a feature, an opener, an interview, a photo essay.

> **⚑ Flag:** We haven't measured the quality of the Skill's pages yet. That work starts after the launch, on real briefs. The recipes it starts from pass `woc check` but haven't been reviewed as designs. Treat what it makes as a capable first draft that you review, not a finished page.

## Before you start

- **Claude Code**, Anthropic's command-line assistant, installed and signed in.
- **A clone of the typesetter repository, built.** The Skill's render check runs from there:

  ```bash
  git clone https://github.com/wocument/wocument-typesetter.git
  cd wocument-typesetter
  npm install
  npm run build
  npx playwright install chromium
  ```

  The last line downloads the browser the render check uses.
- **`woc` on your path** ([Install Wocument](../start-here/install.md)).

## Steps

### 1. Install the Skill

Claude Code loads skills from a `skills` folder: `~/.claude/skills/` for skills you want everywhere, or `.claude/skills/` inside one project. Link the Skill's folder there, from the repository's folder:

```bash
mkdir -p ~/.claude/skills
ln -s "$PWD/skills/wocument" ~/.claude/skills/wocument
```

A link keeps the Skill up to date: when you pull a new version of the repository, Claude gets it too. To freeze a version instead, copy the folder:

```bash
cp -R skills/wocument ~/.claude/skills/wocument
```

For one project only, use that project's `.claude/skills/wocument` instead of `~/.claude/skills/wocument`.

### 2. Start Claude Code in the repository

```bash
cd wocument-typesetter
claude
```

Claude Code reads its skills when a session starts, so start a new session after installing. You don't call the Skill by name: when you ask for a Wocument page, Claude recognises the job from the Skill's description and loads it.

> **⚑ Flag:** The render check runs only from the typesetter repository, so this guide starts Claude Code there. Your article's folder can be anywhere; give Claude its full path. We've tested the Skill only in Claude Code. This page assumes the render check will ship with `woc`, so you can then work from your article's own folder.

### 3. Brief it

A good brief is what you'd give a designer. Tell Claude:

- **The content.** Paste the text, or give the path of a file. The Skill uses your words as they are.
- **The pictures.** Give the folder, and say which pictures matter most. Say which are cut-outs (PNGs with a transparent background), if any.
- **References.** A screenshot of a magazine spread you like, a mood board, a PDF, or an existing `.woc` or `.woct` file. Claude reads the principles (the grid, the contrast in scale, the density, the colour) and maps them to Wocument; it doesn't trace the picture.
- **The audience and the feel.** Who reads it, on what, and what it should feel like: quiet and literary, bold and graphic, a news feature.
- **The shape.** One feature page, or an opener, an interlude and a close? Several articles that should share one design (a theme)?

For example:

```text
Make a Wocument feature from ~/articles/tide-clock/text.md, with the photos in
~/articles/tide-clock/pictures. Open on harbour-dawn.jpg full screen with the
headline over it. Calm and literary, like a Sunday magazine. Most readers are
on phones. Put the result in ~/articles/tide-clock/.
```

Claude asks only about things that change the design a lot, such as no pictures at all or a fixed brand font. For everything else it makes a choice and tells you what it assumed.

### 4. Review its work

When it's done, Claude gives you the files, where they are, and a short summary: the design choices, what each page does on a phone, any warnings it left on purpose and why, and anything the engine couldn't do.

Open the page yourself:

```bash
woc dev ~/articles/tide-clock/tide-clock.woc
```

Look at it at every width in the editor's **Width** menu, and press **V** on the page to see the visor's reasons for each column and picture. [Check and polish a page](check-and-polish.md) has a checklist for what to look at.

### 5. Ask for changes

Say what you want changed, as specifically as you can: "make the second picture larger", "the pull quote is too far from its paragraph", "use a warmer paper colour". The Skill edits the parts you name and keeps the rest, including your text and the decisions you've already made. It checks and renders the page again after each change.

## What it will and won't do

It will:

- use only the commands and attributes that exist in the engine today;
- check and render every page before it hands it to you;
- tell you, in a line, when a design asks for something the engine can't do (a table or a footnote, for example), and what it did instead;
- describe every picture in its `alt` text from what the picture shows.

It won't:

- **invent facts, quotes, names, figures or credits.** Where text is missing, it writes a clearly marked placeholder, such as `[Standfirst: one sentence on ...]`, and tells you;
- use pictures you didn't give it, except clearly named placeholders. If a picture doesn't show what the brief describes, it says the picture is a stand-in;
- hide a limit of the engine behind a workaround without telling you.

## Check the result

- Claude's summary lists the files and says the page passed `woc check` and the render check.
- `woc check` on the file prints no errors, and every warning is one Claude explained.
- In `woc dev`, the page looks right to you at a phone, a laptop and a desktop width.

## If it doesn't look right

**Claude writes a page without checking or rendering it.** The Skill probably didn't load. Check that `~/.claude/skills/wocument/SKILL.md` exists (through the link, if you made one), then start a new Claude Code session.

**The render check fails with "Cannot find module".** It needs to run from the built repository. Start Claude Code in your clone, after `npm install`, `npm run build` and `npx playwright install chromium`.

**`npx woc` fails with "Permission denied".** That's a known build problem ([Install Wocument](../start-here/install.md#from-the-repository)). Make `woc` available with the alias on that page, and tell Claude to use `woc`.

**The design isn't what you had in mind.** Give a reference picture, or name what's wrong in design terms: the hierarchy, the size of a picture, the spacing, the colour. Specific feedback gets specific changes.

**The text has changed.** It shouldn't. Ask Claude to restore your wording; the Skill's rules say the content is yours.

## Next

- [Check and polish a page](check-and-polish.md): what to look for when you review.
- [Publish a page](publish.md): build the folder you upload.
- The Skill's own instructions are in `skills/wocument/SKILL.md` in the typesetter repository, if you'd like to see exactly what Claude is told.
