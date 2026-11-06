# Scenes, stories and frames

Every Wocument page is built from a handful of ideas: scenes, the grid, stories, frames, threads and objects. Once you have them in your head, every command in the language has a place to go, and a page that surprises you starts to make sense. This page builds that picture, starting from the simplest page and adding one idea at a time. If you meet a term you don't know, the [glossary](../reference/glossary.md) has it.

## The simplest page has all of them

Here's a complete document:

```woc
---
wocument: 1
title: A Brief Note
---
\headline{A Brief Note}

This is the entire article.
```

(`woc check` passes it with one warning, W064: with a single short line to count, its line-length estimate means nothing. See [Warnings and errors](../reference/diagnostics.md#warnings).)

There's no scene, no frame and no story in it, so Wocument fills them in for you. We call this the **implicit form**: a file with no `\scene` becomes one magazine page. The heading goes in a frame across the first eight columns of the grid, and everything else goes in a second frame across the whole width, set in as many columns as the screen can hold comfortably.

So even this page is a scene, two frames and a grid. You write them yourself only when you want something the implicit form doesn't give you. Most features never need to.

## Scenes: bands that stack

An article is a series of **scenes**, stacked from top to bottom in the order you write them. A scene is a full-width band. Each one can have its own grid, its own colours (its **palette**) and its own height. Changing scene is the screen's version of turning a page: a new layout, often a new mood.

A scene's `height` decides what kind of band it is:

| `height=` | The scene is | Good for |
| :---- | :---- | :---- |
| `flow` (the default) | As tall as its content | An essay read as one column, closing notes |
| `screen` | Exactly one screen tall | An opener, an interlude, one picture with a line of text |
| `page` | At least one screen tall, set as magazine pages | Columns of text with floating pictures: the feature itself |

A common article is three scenes: a `screen` opener with a photograph behind the headline, a `page` scene for the text, and a `screen` interlude halfway through.

```woc
%% the shape of an article with an opener (frames left out)
\scene[name=opener, height=screen, palette=night]{ ... }
\scene[name=feature, height=page]{ ... }
```

## The grid: what everything is placed on

Each scene uses a **grid**: a number of columns with gutters between them, margins at the sides, a maximum width, and a **baseline step**, the height of one line of body text. Vanilla's grid, called `default`, has 12 columns on large screens, 8 on tablets and 4 on phones.

You place things on the grid by column numbers: `cols=1-8` means from column 1 to column 8, `cols=all` means every column. The grid also has a `body` range, the columns that body text uses when you don't say.

Grids change from one screen size to another, so a placement like `cols=9-12` can't fit a phone's four columns. When that happens, Wocument **linearizes** the scene on that screen: it stacks everything in one column, in the order you wrote it, and `woc check` warns you (W031). To avoid it, give the phone a value of its own: `cols@phone=all`. The `@phone` part is a **breakpoint** suffix; [Themes and the cascade](themes-and-the-cascade.md#different-screens-different-values) explains it.

## Stories and frames: text and where it shows

This is the idea that makes Wocument different from a web page, and it comes from print.

A **story** is a run of text with no position of its own: paragraphs, subheads, and the pictures and quotes that belong among them. It's the article's words, in order.

A **frame** is a rectangle on a scene's grid that shows text. A frame either holds its own text, written inside it, or shows a slice of a named story.

```woc
%% a frame with its own text
\frame[cols=1-8]{
  \kicker{City · Work}
  \headline{The Night Bakers}
}

%% a frame that shows the story called "main", in two columns
\frame[story=main, cols=all, columns=2]
```

Why keep them apart? Because a story can run through more than one frame.

## Threads: one story, many frames

Every frame that shows the same story is part of that story's **thread**. Text fills the first frame, then carries on in the second at the exact word where the first stopped, and so on, in the order the frames appear: scene by scene, then in the order you wrote them inside each scene.

That lets an article start in two columns under the opener, pause for a full-screen photograph, and pick up again in the next scene without you cutting the text into pieces. You write the story once, in one place, and the frames decide where it shows.

Two things decide how much text a frame takes:

- A frame with a **definite height**, including any frame in a `screen` scene, takes as many lines as fit.
- A frame with **automatic height** takes everything up to the story's end, or up to a `\framebreak` you put in the story to send the rest on to the next frame.

Story text is never dropped. If a phone hides one of a story's frames, the text goes through the frames that remain.

## Objects: everything that isn't text

Pictures, video, audio, embeds, galleries, pull quotes, fact boxes (`\sidebar`) and groups are **objects**. An object can be placed in one of two ways, and the difference matters:

- **Grid-placed.** Written directly in a scene, with `cols=` and, in a screen scene, `rows=`. It sits at that spot on the grid. A photograph filling the background of an opener is grid-placed.
- **Anchored.** Written inside a story, between two paragraphs. It travels with the text: if the text moves to the next screen, the object moves with it. A picture beside the paragraph it illustrates is anchored.

Anchored objects can push text aside: the text **wraps** around the object's rectangle or, for a cut-out picture, around its outline. In a page scene on a large screen, anchored pictures and quotes also **float**: the engine picks the best spot near their paragraph. [How pictures find their place](how-pictures-find-their-place.md) explains how it chooses.

## How it fits together

| Idea | What it is | You write it as |
| :---- | :---- | :---- |
| Document | One article, one file, one web page | The `.woc` file |
| Scene | A full-width band with its own grid, palette and height | `\scene[...]{...}` |
| Grid | Columns, gutters, margins and the baseline step | `\grid[...]`, chosen with `grid=` |
| Story | The article's text, with no position | `\story[name=main]{...}` |
| Frame | A rectangle on the grid that shows text | `\frame[...]` |
| Thread | All the frames that show one story, in order | Frames with the same `story=` |
| Object | A picture, quote, box or other non-text item | `\figure`, `\pullquote`, `\sidebar`, ... |
| Style | A named set of type settings | `\style[...]`, used with `style=` |

The implicit form uses all of these without you writing any of them. When you outgrow it, you add a `\scene`, and from then on you place frames and objects yourself.

## Next

- [Thread a story through scenes](../build/thread-a-story.md) shows threading step by step.
- [Columns, screens and the baseline grid](columns-and-screens.md) explains how a page scene sets its columns.
- [Open with a full-screen scene](../learn/open-with-a-scene.md) builds an article with explicit scenes.
