# What Wocument is

Wocument lays out long reads the way a magazine does: text in columns that line up, pictures that the text flows around, a headline that owns the first screen. It does this on the web, for whatever screen your reader happens to have.

This page explains what that means, what you write, and what you get back. It takes about five minutes.

## The problem

Open a feature in a good print magazine. The text runs in two or three columns, and each line in one column sits at exactly the height of its neighbour. A photograph has been cut out from its background, and the text follows the shape of the subject's shoulders. A large first letter sinks three lines into the opening paragraph. Nothing dangles: no lonely word at the top of a column, no column that stops two lines early.

A designer made that page by hand, for one page size.

Now open a long article on most websites. One column down the middle, pictures stacked between paragraphs, nothing lining up with anything. It reads like a blog post, however good the writing is.

The web isn't worse at this because nobody cares. It's because nobody knows the page size in advance. Your reader might hold a phone 390 pixels wide, or sit at a 27-inch monitor. No designer can place lines by hand for every screen, so most sites settle for one plain column.

## The idea

You write one plain text file that holds your words, your pictures and your design. Wocument lays it out the way an editorial designer would, separately for each reader's screen, in the reader's own browser. When they turn their phone or resize the window, it lays the page out again.

The file looks like this:

```woc
---
wocument: 1
title: The Night Bakers
---
\kicker{City · Work}
\headline{The Night Bakers}
\deck{While the city sleeps, a few dozen people make sure there is bread in the morning.}

\dropcap[lines=3]
The first oven goes on at eleven. By midnight the street outside is quiet, and the only light on the block comes from the bakery's back door, propped open with a sack of flour to let the heat out.

Most of the work is waiting. Dough needs time, and nobody can hurry it.
```

That's a complete page. Paragraphs are plain text. Anything special, like a headline or a drop cap, is a **command**: a backslash, a name, and the content in braces. You didn't say anything about columns, fonts or spacing, so Wocument used **Vanilla**, its built-in design: a serif for reading, the headline over the first eight columns, and the text in as many columns as the screen can hold comfortably.

## What you get

- **On a laptop or desktop**, a magazine page: the heading block, then the text in two to four columns, set one screen at a time, with every line on a shared baseline.
- **On a phone or tablet**, one comfortable column that scrolls, with the same typography.
- **Without JavaScript**, a reading version: the whole text in one column.
- **A folder you can upload anywhere**: one HTML page, one script, the fonts, and your pictures, converted to a lighter format. No server, no database.

## What's in the box

| Part | What it does |
| :---- | :---- |
| **The language** | The `.woc` files you write, and `.woct` theme files that hold a design you want to reuse. |
| **The engine** | Reads your file, checks it, and sets the page in the reader's browser. Open source, under the Apache 2.0 licence. |
| **`woc`** | The command you run: `woc dev` opens an editor with a live page beside it, `woc check` reports problems, `woc build` makes the folder you publish. |
| **Vanilla** | The built-in design. Every page gets good typography before you change anything. |
| **The Skill** | Teaches an AI assistant such as Claude to write and design Wocument pages with you. |

## What Wocument isn't

- **Not a website builder.** It makes article pages. Navigation, home pages and comments belong to your site.
- **Not a word processor.** You write in a text editor, and the design lives in the same file as the words.
- **Not a print tool.** There's no PDF export and no fixed page size. The screen is the page.
- **Not a programming language.** There are no variables, conditions or loops. The file describes the page; the engine works out the geometry.

## Next

- [Install Wocument](install.md), then make [your first page](your-first-page.md). It takes about fifteen minutes.
- Curious about the thinking behind it? Read [New underneath, familiar on top](../understand/maya.md).
- A developer? [How the engine works](../understand/how-the-engine-works.md) is the short tour.
