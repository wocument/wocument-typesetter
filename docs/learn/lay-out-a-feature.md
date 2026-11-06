# Lay out a magazine feature

In [Your first page](../start-here/your-first-page.md) you let Vanilla design everything. In this lesson you'll give the same article a look of its own: your colours, a headline with more weight, a running head, a fact box and an end mark. Then you'll move that look into a theme file, so the next article in the series gets it for free.

It takes about twenty minutes.

## What you need

- The `night-bakers` folder from [Your first page](../start-here/your-first-page.md), with `night-bakers.woc` and `pictures/back-door.jpg`. If you skipped that lesson, the finished file is at the end of it.
- `woc dev night-bakers.woc` running, so you can watch each change.

## 1. Give the page its own colours

Every Wocument page is coloured by a **palette** of five roles:

| Role | What it colours |
| :---- | :---- |
| `paper` | the background |
| `ink` | the text |
| `muted` | captions, credits, quieter labels |
| `accent` | subheads, drop caps, pull-quote marks, links |
| `rule` | lines, borders and the fill of fact boxes |

Styles refer to roles, not to colours. So when you change the palette, everything that uses a role changes with it.

Add these two lines straight after the frontmatter, before `\kicker`:

```woc
%% part of a document: add this after the frontmatter
\token[name=oven, value=#b4471f]
\palette[name=default, paper=#f8f4ec, ink=#1d1a16, muted=#6a6258, accent=$oven, rule=#e4dccd]
```

The page turns warm: a cream paper, near-black ink, and a burnt orange for the drop cap, the subheads and the pull-quote marks.

`\token` gives a value a name. Here `oven` is the orange, and `$oven` uses it. A token earns its keep once the same colour appears in several places: change the token, and every place follows.

`\palette[name=default, ...]` replaces Vanilla's default palette, the one every scene uses unless it asks for another. You don't have to replace all of Vanilla to change its colours.

Anything above the first line of content is the **design head**. It holds definitions only: palettes, styles, grids, fonts. Nothing in it appears on the page by itself.

> Wocument checks that `ink`, `muted` and `accent` are readable against `paper`. If one is too faint, `woc check` reports W062 and names the role.

## 2. Change the type

Add three styles to the design head, under the palette:

```woc
%% part of a document: add this to the design head
\style[name=headline, weight=500, tracking=-0.015em]
\style[name=kicker, color=accent]
\style[name=caption, italic=false]
```

Every kind of text has a style with the same name: the headline uses `headline`, captions use `caption`. Writing `\style[name=headline, ...]` doesn't start a new style from scratch. It changes only what you list and keeps everything else Vanilla's headline has: the font, the size, the balanced line breaks.

Now the headline is a little heavier and set a touch tighter, the kicker picks up the accent colour, and captions are upright rather than italic.

## 3. Add a running head and an end mark

Magazines print a small label at the top of every page: the publication, the section, the series. Wocument calls it a **folio**. Add it right after the design head, before `\kicker`:

```woc
%% part of a document: add this before \kicker
\folio[position=top-right, progress]{City at Night}
```

"City at Night" appears in the top right corner of every screen. `progress` adds a thin reading-progress line across the top of the window.

Then end the article the way magazines do, with a small square after the last word. Put `\endmark` at the end of the last paragraph, before the bio:

```woc
%% part of a document: the end of the last paragraph
... and the city wakes up to bread it never sees being made. \endmark
```

`\endmark` is one of the few commands that sits inside a line of text rather than on its own.

The order matters at the top of the file: frontmatter first, then the design head, then the folio, then the content. Your file should now begin like this:

```woc
---
wocument: 1
title: The Night Bakers
lang: en-GB
---
\token[name=oven, value=#b4471f]
\palette[name=default, paper=#f8f4ec, ink=#1d1a16, muted=#6a6258, accent=$oven, rule=#e4dccd]
\style[name=headline, weight=500, tracking=-0.015em]
\style[name=kicker, color=accent]
\style[name=caption, italic=false]

\folio[position=top-right, progress]{City at Night}

\kicker{City · Work}
\headline{The Night Bakers}
\deck{While the city sleeps, a few dozen people make sure there is bread in the morning.}
\byline{By Sam Rivera}
```

## 4. Add a fact box

A fact box sits beside the story with a few numbers or a short list. In Wocument it's a `\sidebar`. Add this before `\subhead{Into the oven}`:

```woc
%% part of a document: add this before \subhead{Into the oven}
\sidebar[bg=rule, inset=1bl]{
  \title{One night, in numbers}
  Four bakers, one oven, and about six hundred loaves.

  The first van leaves at six. The shop opens at seven.
}
```

`bg=rule` fills the box with the palette's `rule` colour, a pale sand here. `inset=1bl` pads it by one **baseline step**: the height of one line of body text, Wocument's vertical unit. Measuring in `bl` keeps the box's text on the same lines as the columns around it.

Like the picture and the pull quote, the fact box **floats**: on a wide screen it goes to a good spot within a screen of where you wrote it. On a phone it sits exactly where you wrote it.

## 5. Try a bigger picture, and read what happens

You can ask for a picture's size. Change the figure's first line to:

```woc
%% part of a document: the picture, asking to lead the screen
\figure[src=./pictures/back-door.jpg, size=hero, place=top, alt="A bakery's back door at night, light spilling onto a wet street"]{
```

`size=hero` asks for the screen's main picture, across all the columns. `place=top` asks for the top of a screen.

Look at the page. The picture doesn't become a hero: it still sits in a column. To find out why, press **V** on the page to open the **visor**, which marks the grid and explains each layout decision. Look at what it says about the picture. On a large monitor (or a laptop, with the browser window as wide as it goes), it says the picture found no spot near its paragraph and took a fallback.

Here's the reason. A landscape photo across every column of a wide screen is taller than the room left under the heading, and Wocument never lets a picture take more than 85% of a screen's height. On a short article like this one, no screen near the picture's paragraph has a hero-sized hole, so the engine falls back rather than break the page.

That's how pictures work in Wocument. You say what you'd like, and the engine looks for the best place it can find. When it can't find one, it tells you. Take `size=hero, place=top, ` back out. On a longer article, or with a picture you put earlier in the story, a hero has room.

[How pictures find their place](../understand/how-pictures-find-their-place.md) explains the search. [Add pictures](../build/add-pictures.md) lists every size and place.

## 6. Move the look into a theme

Your design head now holds a token, a palette and three styles. That's the look of the series, not of this one article. Move it into a **theme file**, so every article in the series shares it.

Make a new file next to `night-bakers.woc`, called `edition.woct`, and move the five definition lines into it:

```woct file=edition.woct
%% The look of every article in the City at Night series.
\token[name=oven, value=#b4471f]
\palette[name=default, paper=#f8f4ec, ink=#1d1a16, muted=#6a6258, accent=$oven, rule=#e4dccd]

\style[name=headline, weight=500, tracking=-0.015em]
\style[name=kicker, color=accent]
\style[name=caption, italic=false]
```

Delete those lines from `night-bakers.woc`, and add one line to its frontmatter:

```yaml
theme: ./edition.woct
```

The page looks exactly as it did. The `\folio` stays in the article: a theme holds definitions only, and the folio is part of the page.

A theme file is the only thing a `.woc` file can load, and each article loads at most one. That keeps every article readable on its own: open it, and you can see everything that shapes it, plus one named theme.

## 7. Check it

```bash
woc check night-bakers.woc
```

You should see no errors. If you still see W064 about line length, it's the same one you met in the first lesson.

> **⚑ Flag:** W064 on Vanilla's own columns is the same open item as in [Your first page](../start-here/your-first-page.md#7-check-the-page). This lesson assumes it's fixed.

## What just happened

You changed the look of a page without touching its words. The colours live in a palette of roles, the type in styles named after the things they style, and both in a theme the whole series shares. Wocument combines them in a fixed order, Vanilla first and your choices on top, one property at a time. [Themes and the cascade](../understand/themes-and-the-cascade.md) explains that order.

You also met the way Wocument handles pictures and boxes. You say what each one is and how big you'd like it, and the engine finds the place. When it can't, it tells you why.

Here's the finished article. It loads the `edition.woct` theme above:

```woc
---
wocument: 1
title: The Night Bakers
lang: en-GB
theme: ./edition.woct
---
\folio[position=top-right, progress]{City at Night}

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

\sidebar[bg=rule, inset=1bl]{
  \title{One night, in numbers}
  Four bakers, one oven, and about six hundred loaves.

  The first van leaves at six. The shop opens at seven.
}

\subhead{Into the oven}

Baking starts at four. The oven is loaded with a long wooden peel, twenty loaves at a time, and steam is pumped in for the first few minutes so the crust stays soft long enough for the bread to rise. Then the steam is let out, the crust sets, and the colour comes.

By six the first van is loaded. The cafés on the high street get theirs first, then the school, then the two restaurants that open for breakfast. The last trays go into the shop window at half past six, still crackling as they cool.

The bakers leave as the morning shift arrives. They pass each other in the doorway with a few words about the oven, the weather, a delivery that was late. Then the night bakers go home to sleep, and the city wakes up to bread it never sees being made. \endmark

\bio{Sam Rivera writes about the people who keep cities running at night.}
```

## Next

- [Open with a full-screen scene](open-with-a-scene.md): give the article an opening screen with the photograph behind the headline.
- [Make a theme](../build/make-a-theme.md) covers grids, fonts and scene templates.
