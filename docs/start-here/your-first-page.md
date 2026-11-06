# Your first page

In this lesson you'll write a short magazine feature, watch Wocument lay it out as you type, check it, and turn it into a page you can put on the web. It takes about fifteen minutes.

The feature is about the people who bake a city's bread overnight. You can type your own words instead; the steps are the same.

## What you need

- `woc` installed. If typing `woc` in a terminal doesn't print a usage message, follow [Install Wocument](install.md) first.
- One photograph, ideally landscape (wider than it is tall). Any JPEG or PNG from your phone or camera works.
- About fifteen minutes.

You don't need to know any code. Everything you type is shown in full.

## 1. Start the editor

Make a folder for the article, and open the editor on a new file:

```bash
mkdir night-bakers
cd night-bakers
woc dev night-bakers.woc
```

Your browser opens on the Wocument editor. The file didn't exist, so `woc` made it from a short template. You'll see the source on the left and the page on the right: a headline that says "Untitled" and a line that says "Start writing here."

Keep the terminal open. `woc dev` runs until you stop it with Ctrl-C.

## 2. Write the heading

Replace everything in the editor with this:

```woc
---
wocument: 1
title: The Night Bakers
lang: en-GB
---
\kicker{City · Work}
\headline{The Night Bakers}
\deck{While the city sleeps, a few dozen people make sure there is bread in the morning.}
\byline{By Sam Rivera}
```

The page on the right updates as you type. Press **Cmd-S** (Ctrl-S on Windows and Linux) to save the file.

Two kinds of thing are on this page.

The part between the two `---` lines is the **frontmatter**: facts about the article, never its design. `wocument: 1` says which version of the language the file is written in, and `title` is what appears in the browser tab and when someone shares the link. `lang: en-GB` tells Wocument, and your reader's browser, that the text is British English.

> **⚑ Flag:** Today every English page gets the same curly quotation marks and American English hyphenation, whatever `lang` says. This lesson assumes British settings follow `en-GB`.

The rest are **commands**. Each one is a backslash, a name, and the content in braces. `\kicker` is the small label above a headline, `\deck` is the sentence under it (some magazines call it the standfirst), and `\byline` names the writer.

## 3. Add the text

Below the byline, leave a blank line and add the opening paragraphs:

```woc
%% part of a document: add this after the byline
\dropcap[lines=3]
The first oven goes on at eleven. By midnight the street outside is quiet, and the only light on the block comes from the bakery's back door, propped open with a sack of flour to let the heat out.

Most of the work is waiting. Dough needs time, and nobody can hurry it. The bakers fill the hours with the jobs that don't need daylight: weighing salt for tomorrow, scraping the long wooden benches, folding the dough that went into the tubs at nine so that it rises evenly and keeps its strength.

There are four of them tonight. The youngest started in the spring and still writes everything down in a notebook that lives in her apron pocket. The oldest has worked nights for thirty years and says he no longer knows what afternoons are for.
```

Paragraphs are plain text, separated by a blank line. The line that starts with `%%` is a **comment**: a note to yourself that never appears on the page.

`\dropcap[lines=3]` sets the first letter of the next paragraph large, three lines deep. The part in square brackets is an **attribute**: a setting for that command, written as a name, an equals sign and a value.

Look at the page. On a laptop or a larger screen, the text sits in two or more columns under the heading, and the lines in neighbouring columns line up with each other. You didn't ask for columns. Wocument chose them, because a single line across the whole screen would be too long to read comfortably.

## 4. Add a picture

Copy your photograph into a folder called `pictures` inside `night-bakers`, and name it `back-door.jpg`. (If it's a PNG, keep the `.png` ending and change the line below to match.)

Then add this after the third paragraph:

```woc
%% part of a document: add this after "...what afternoons are for."
\figure[src=./pictures/back-door.jpg, alt="A bakery's back door at night, light spilling onto a wet street"]{
  \caption{The back door stays open all night. The ovens run hot enough to warm the street.}
}
```

`src` is where the picture is, relative to your `.woc` file. `alt` describes the picture for people who can't see it, such as readers using a screen reader. Describe what the photo actually shows.

The picture takes a place near its paragraph, as wide as a column or more, with its caption under it. You don't place it exactly. Wocument looks for a spot near the paragraph where the picture and the columns around it both look right, as a magazine designer would. [How pictures find their place](../understand/how-pictures-find-their-place.md) explains how it chooses, and [Add pictures](../build/add-pictures.md) shows how to steer it.

## 5. Add subheads and a pull quote

Paste in the rest of the article, after the picture:

```woc
%% part of a document: add this after the picture
\subhead{Shaping}

At two o'clock the room changes. The dough comes out of the tubs onto floured benches, and the bakers cut it into pieces by eye, checking each one on a scale they hardly need. Then comes the shaping: a fold, a turn, a tuck, until each loaf has a tight skin that will hold its shape in the oven.

It looks like one movement. It's actually dozens, and each baker does them slightly differently. You can tell who shaped a loaf, they say, by the way the seam sits underneath.

\pullquote{You can tell who shaped a loaf by the way the seam sits underneath.}

The shaped loaves rest in linen-lined baskets for another hour. Nobody talks much during this part. The radio is on low, the mixer is being washed, and someone is always sweeping flour from a corner it shouldn't have reached.

\subhead{Into the oven}

Baking starts at four. The oven is loaded with a long wooden peel, twenty loaves at a time, and steam is pumped in for the first few minutes so the crust stays soft long enough for the bread to rise. Then the steam is let out, the crust sets, and the colour comes.

By six the first van is loaded. The cafés on the high street get theirs first, then the school, then the two restaurants that open for breakfast. The last trays go into the shop window at half past six, still crackling as they cool.

The bakers leave as the morning shift arrives. They pass each other in the doorway with a few words about the oven, the weather, a delivery that was late. Then the night bakers go home to sleep, and the city wakes up to bread it never sees being made.

\bio{Sam Rivera writes about the people who keep cities running at night.}
```

Save, and scroll through the page. A few things happened that you didn't ask for:

- **The text is set one screen at a time.** On a wide screen, the columns fill the first screen, then carry on in a fresh set of columns on the next. A small arrow at the foot of a column shows where its text continues, and the dots at the right edge show which screen you're on.
- **The pull quote moved.** You wrote it after the paragraph it quotes, but it may appear on an earlier screen, next to the columns. Wocument keeps a pull quote within a screen of its passage, wherever it fits best. On a wide screen it can even land above your opening paragraph. [Add pictures](../build/add-pictures.md) shows how to keep an object closer to its passage.
- **Your quotation marks are curly**, and the pull quote has large opening and closing marks of its own. Write pull quotes without quotation marks; the design adds them.

## 6. Look at it on a phone

Make your browser window narrow, about the width of a phone. The page becomes one column that scrolls, with the same typography. Nothing floats on a phone: the picture and the pull quote sit where you wrote them, which is where a reader on a small screen expects them.

To see it on a real phone, stop `woc dev` with Ctrl-C and start it again with `--host`:

```bash
woc dev night-bakers.woc --host
```

The terminal prints a network address. Open it on a phone connected to the same Wi-Fi. You can only save from your computer.

## 7. Check the page

Open a second terminal in the `night-bakers` folder and run:

```bash
woc check night-bakers.woc
```

`woc check` reads the file the way the engine does and reports anything wrong. **Errors** stop a page from being built, and come with a line number and, usually, a suggestion. **Warnings** are things a careful editor would want to know about.

You'll probably see one warning, W064. It says that at some screen sizes the lines hold a few characters fewer than the 45 to 75 that read most comfortably. It points at line 1 because it's about the whole page, not one line you wrote, and the columns it talks about are the ones Vanilla chose for you. You can leave it.

The warning names screen sizes by their **breakpoints**: `phone` (up to 639 pixels wide), `tablet` (640 to 1023), `compact` (1024 to 1799, most laptops) and `wide` (1800 and up). Wocument designs each page separately for each of them.

> **⚑ Flag:** Today Vanilla's own columns, with no design added, get W064 at 1470px and 2560px (about 43 characters a line). This lesson assumes that's fixed in Vanilla or in the warning before the launch. Until then, you can leave this warning on a page that uses Vanilla's columns.

Try making a mistake to see what an error looks like. Change `\pullquote` to `\pullqoute`, save, and run `woc check` again. It tells you the line, and asks whether you meant `\pullquote`. The editor's **Problems** tab shows the same thing as you type. Put the spelling back before you go on.

## 8. Publish it

Stop `woc dev` and build the page:

```bash
woc build night-bakers.woc --out dist
```

`woc` writes a folder called `dist`:

```text
dist/index.html         the page
dist/woc.<code>.js      the script that lays out the page in the reader's browser
dist/assets/            your picture, converted to WebP, and the fonts
```

The `<code>` part of the name changes whenever the script changes, so readers never get a stale copy.

Upload the whole `dist` folder to any web host that serves plain files. There's no server to run and no database.

To look at the built page on your own computer, serve the folder rather than double-clicking `index.html`:

```bash
npx serve dist
```

`npx` runs a small program from npm without installing it for good; the first time, it asks to download `serve`. Then open the address it prints.

> **⚑ Flag:** Opening `index.html` straight from your disk doesn't work today. Browsers refuse to run the page's script from a file, and the page hides its reading version as soon as it starts loading, so you would probably see a blank page. This lesson assumes serving the folder is the recommended way to preview a build. `npx serve` is a separate tool, downloaded the first time you run it; any static file server works.

## What just happened

You wrote one plain text file. It holds your words, a picture, and a few commands that say what each part is: a headline, a deck, a subhead, a pull quote. You never said where anything goes.

Wocument did the rest with **Vanilla**, its built-in design. It chose a grid for each screen size, set the type on a shared [**baseline grid**](../reference/glossary.md) so lines in neighbouring columns line up, split the text into screen-tall pages on large screens, and found spots for the picture and the pull quote near their paragraphs. When someone opens your page, all of that happens again in their browser, for their screen.

Here's the whole file, as you have it now:

```woc
---
wocument: 1
title: The Night Bakers
lang: en-GB
---
\kicker{City · Work}
\headline{The Night Bakers}
\deck{While the city sleeps, a few dozen people make sure there is bread in the morning.}
\byline{By Sam Rivera}

\dropcap[lines=3]
The first oven goes on at eleven. By midnight the street outside is quiet, and the only light on the block comes from the bakery's back door, propped open with a sack of flour to let the heat out.

Most of the work is waiting. Dough needs time, and nobody can hurry it. The bakers fill the hours with the jobs that don't need daylight: weighing salt for tomorrow, scraping the long wooden benches, folding the dough that went into the tubs at nine so that it rises evenly and keeps its strength.

There are four of them tonight. The youngest started in the spring and still writes everything down in a notebook that lives in her apron pocket. The oldest has worked nights for thirty years and says he no longer knows what afternoons are for.

\figure[src=./pictures/back-door.jpg, alt="A bakery's back door at night, light spilling onto a wet street"]{
  \caption{The back door stays open all night. The ovens run hot enough to warm the street.}
}

\subhead{Shaping}

At two o'clock the room changes. The dough comes out of the tubs onto floured benches, and the bakers cut it into pieces by eye, checking each one on a scale they hardly need. Then comes the shaping: a fold, a turn, a tuck, until each loaf has a tight skin that will hold its shape in the oven.

It looks like one movement. It's actually dozens, and each baker does them slightly differently. You can tell who shaped a loaf, they say, by the way the seam sits underneath.

\pullquote{You can tell who shaped a loaf by the way the seam sits underneath.}

The shaped loaves rest in linen-lined baskets for another hour. Nobody talks much during this part. The radio is on low, the mixer is being washed, and someone is always sweeping flour from a corner it shouldn't have reached.

\subhead{Into the oven}

Baking starts at four. The oven is loaded with a long wooden peel, twenty loaves at a time, and steam is pumped in for the first few minutes so the crust stays soft long enough for the bread to rise. Then the steam is let out, the crust sets, and the colour comes.

By six the first van is loaded. The cafés on the high street get theirs first, then the school, then the two restaurants that open for breakfast. The last trays go into the shop window at half past six, still crackling as they cool.

The bakers leave as the morning shift arrives. They pass each other in the doorway with a few words about the oven, the weather, a delivery that was late. Then the night bakers go home to sleep, and the city wakes up to bread it never sees being made.

\bio{Sam Rivera writes about the people who keep cities running at night.}
```

## Next

- [Lay out a magazine feature](../learn/lay-out-a-feature.md) takes this page further: your own colours and type, a picture sized on purpose, and a fact box.
- [Scenes, stories and frames](../understand/scenes-stories-frames.md) explains the model underneath what you just did.
- [Commands and attributes](../reference/commands.md) lists everything you can write.
