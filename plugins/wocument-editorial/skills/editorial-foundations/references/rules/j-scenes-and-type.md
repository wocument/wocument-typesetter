# J. Whole scenes, sizes and type hierarchy

How a scene is sized against the screen, how a picture is sized from its purpose, and how type builds a clear hierarchy. These rules come from the owner's review of the first study build (2026-11-26), where a magazine's own pages were rebuilt in Wocument. They are written in our own words and name no publication.

Each rule reads: **the rule**, an **example**, **decide from the content**, **on each screen**, **in Wocument today**, and its **status**.

## J1. A scene is a whole number of screens, rounded up

*Decided by:* editorial-art-direction. *Done by:* a skill (the target), the engine (round up, being built). *Status:* Proposed (2026-11-26), updated in round 1b.

**The rule.**

A scene is 1, 2 or 3 screens tall, never 1.5. A page that is meant to be seen at once is one screen: an editor's letter, a contributors page, an opener, a short department page, a list spread. A longer piece takes two or three whole screens. The reader should never scroll through half a screen of one scene and half of the next.

A scene always rounds up to its nearest whole number of screens. The goal is never to use as few screens as possible. If the content is a little longer than a screen, the scene takes the next whole screen, and the space that is left over is placed by J8, not squeezed away. Content is never cut and never shrunk to save a screen. Lines of text are never spread apart to fill a page. **Text size and leading never change to make a fit.**

Articles of one section may form a run: give each scene in the run the same `run=<name>` attribute. The articles of a run follow on directly, one after the other, and only the end of the whole run rounds up to a whole screen. The editor's letter is not part of a run. It has its own screens.

Scenes may also share one screen in equal parts: two halves, three thirds or four quarters in a row make one screen together, and the space bar moves them as one.

**Example.** An editor's letter of about 4,300 characters with one large picture, a small portrait and a signature, at a laptop size. In four text columns the text alone nearly fills one screen, so the picture sits at the head of the first column and the portrait and signature at the head of the last column. If the letter still runs over, it takes a second whole screen, and J8 places the space that is left; the text size stays.

Another: two short department items, each half a screen, share one screen as a pair of `1/2` scenes.

**Decide from the content.** Count the characters and pictures against the screen at a laptop size (1440 × 900 px): about 4,500 to 6,000 characters of text fill one screen in four columns with no large picture. Choose the target per scene: one screen for anything the reader should take in at once; two or three for a long read. Two whole screens is allowed only when one would crush the content. Then the split falls where the content breaks (B6, E2), never halfway through a block.

**On each screen.**

- Laptops and wide screens (1024 px and up): The scene is exactly its number of screens.
- Tablets (640 to 1023 px): Same, when the scene is set in bands. A scene that scrolls as one column has no target.
- Phones (under 640 px): The scene scrolls as one column. There is no target, but no blank strips either.

**In Wocument today.** The last band of a page scene is cut to its text, so scenes end at fractions of a screen. Until the engine's round-up step is built (design note `docs/superpowers/specs/2026-11-26-whole-scenes-and-head-strip.md`), plan the screen count by hand and place the space with pictures and gaps (J8). Never a smaller text style or a tighter baseline for the text. The `run=` attribute is being built. Check the scene heights through `page.html?doc=<name>&inspect` (`window.__woc.pd.scenes[i].height` against the viewport height).

## J2. A scene break is a boundary, not a scene

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Proposed (2026-11-26).

**The rule.**

When a brief says "scene break", it means the boundary between two scenes, where the design changes. It is not a scene of its own. Never write a scene that holds only a rule, a gap or a single line.

**Example.** A brief lists "contributors, scene break, the Vanities pages". The contributors scene ends and the Vanities opener scene starts. There is nothing between them.

**Decide from the content.** A visible divider is a design choice for inside a scene (a rule under a heading), never a scene of its own.

**On each screen.** Same on every screen.

**In Wocument today.** Built: a scene change is the page turn.

## J3. Size a picture from its purpose, as a share of the page, then convert

*Decided by:* image-art-direction. *Done by:* a skill. *Status:* Proposed (2026-11-26).

**The rule.**

First decide what the picture is for: the subject of the page (it leads), a support for one passage, a decoration (a cut-out object, an illustration), or a record (a portrait in a list). Then decide its share of the page: the whole page, half, a quarter, a column.

A desktop screen holds a whole print spread, two pages. So a page fraction has to be converted to the spread before you place the picture:

| Share of a page | Share of a desktop screen (12 columns) |
| :-- | :-- |
| A whole page | half: 6 columns, full height |
| Half a page | a quarter: 6 columns, half height, or 3 columns, full height |
| A quarter of a page | an eighth: 3 columns, about half the height |
| One column of three | 2 columns |

**Example.** A one-page essay has a cut-out illustration at the top right that covers about a quarter of the page. On a desktop screen it is three columns (10 to 12) at the top right, about half the screen tall: an eighth of the screen, not eight columns.

**Decide from the content.** A decoration is never larger than the text needs it to be. Only the subject of the page may take half the screen or more. When you have only a page fraction (from a brief or a reference page), convert it with the table. Never place it as a fraction of the spread directly.

**On each screen.**

- Laptops and wide screens (1024 px and up): As in the table.
- Tablets (640 to 1023 px): The share of a 6-column page: a quarter of a page is 3 columns.
- Phones (under 640 px): A decoration becomes small (`size=small`) or is dropped (D6). A subject picture goes full width.

**In Wocument today.** Built: `cols=`, `size=`, `ratio=`. The conversion is the skill's job.

## J4. A picture stays inside its screen

*Decided by:* image-art-direction. *Done by:* a skill, the engine (not built yet). *Status:* Proposed (2026-11-26).

**The rule.**

A picture never runs from one screen into the next: the reader would see its top on one screen and its foot on the next. A picture meant to be bigger than a screen gets a scene of its own (`height=screen`) or becomes the scene's background.

**Example.** A tall photograph of a library hall next to three columns of text is cropped to the screen's height, not left to run into the second screen.

**Decide from the content.** If the picture's subject needs its full height (a standing figure, a tower), give it a screen of its own. Otherwise crop to `focus`.

**On each screen.**

- Laptops and wide screens (1024 px and up): Inside one screen.
- Tablets (640 to 1023 px): Inside one screen.
- Phones (under 640 px): The picture is full width and may be taller than the screen, since the page scrolls.

**In Wocument today.** A grid-placed picture can cross a band boundary. Until the engine keeps it inside, set `ratio=` and `fit=cover` so its height is less than a screen, and check it in the render check.

## J5. Chrome is not content

*Decided by:* editorial-art-direction. *Done by:* the theme, the engine (head strip not built yet). *Status:* Proposed (2026-11-26).

**The rule.**

Plain text is prose, with no command. Everything else that is text but not the article has its own component and its own place: the folio and the section label in the head strip, the byline, captions and credits with their pictures. None of them sits in the text columns or pushes the text down.

**Example.** On the second spread of a department, the section label "Vanities" sits in the head strip of every screen with the issue name. The text columns start at the top of the type area.

**Decide from the content.** The section label is the department or the story's kicker. The issue name is the publication's.

**On each screen.** Same on every screen. On phones, only the section label shows.

**In Wocument today.** One folio per scene: the section label comes from a parent's folio (`\parent` with its own `\folio`), which replaces the issue name. A second folio slot is in the design note. Never place the label as a frame inside the content to get both.

## J6. Type hierarchy: a few roles, with clear steps between them

*Decided by:* editorial-art-direction. *Done by:* the theme, a skill. *Status:* Proposed (2026-11-26).

**The rule.**

Each role on a page must be recognised before it is read: headline, deck (standfirst), body, subhead, caption and credit, label. The fewest roles that make the hierarchy clear, and clear steps between them. Size, weight, case and family each do part of the work, and size alone is never enough.

- **Steps.** Between the headline and the deck, a step of about 3 to 5 times in size. Between the deck and the body, 1.2 to 1.4 times. Labels and captions are 0.7 to 0.85 times the body, set apart by weight or case, not by size alone. Two roles about the same size need a different weight, case or family.
- **One family or two.** A display face for headlines (a high-contrast serif, or a condensed sans), a text face for body and decks. A third family only for a role that the first two cannot do, such as a sans for labels.
- **Decks are bold text type.** A deck in the body face, bold, about 1.2 times the body, reads as the bridge between headline and text. A deck in the headline face at a similar size runs into the headline.
- **Display type is set, not typed.** Headlines are not hyphenated and never break inside a word. Stacked headlines (one word or two a line) are tight: leading about 0.85 to 0.95. The size is chosen so the longest word fits the measure.
- **Headline and deck share an axis.** Both centred over the text, or both ranged left. A hairline rule under a centred headline sets the two apart.
- **Drop caps match the body's colour.** A drop cap is in the headline face, in ink. An accent colour is for openers only, and only when the theme's openers use one.
- **Body text.** 45 to 75 characters a line (30 or more on phones). Leading 1.4 to 1.65 times the size, more for wider lines. An indent or a space between paragraphs, never both.

**Example.** A feature opener: the headline in a high-contrast serif, about 5 times the body, centred, with a hairline rule under it. Under that, a deck in the body face, bold, about 1.2 times the body, centred. Then the text, with a three-line drop cap in the headline face, in ink. A display opener next to a big picture: the title in capitals of the lightest serif, stacked one word a line and tight, then a bold deck ranged left.

**Decide from the content.** The profile and dial (E1) set how far apart the steps are: a restrained profile uses the small end of each range, an expressive one the large end. The reference issue's measured styles win when they exist, but check each measurement against the page by eye before you trust it: a measure that puts a headline and its deck at nearly the same size is wrong.

**On each screen.**

- Laptops and wide screens (1024 px and up): The full steps.
- Tablets (640 to 1023 px): The same roles. Display sizes come down with `fluid()`.
- Phones (under 640 px): The headline steps down so its longest word fits the column. The deck and body keep their size.

**In Wocument today.** Built: styles per role with `extends`, `fluid()` sizes, `case`, `weight`, `hyphenate=false`, `\span[style=]` for two sizes in one line, `\rule` under a heading. The never-break-a-display-word rule is in the design note. Until it is built, size display type so the longest word fits the narrowest frame it is set in.

## J7. One template, one set of opener styles

*Decided by:* publication-system. *Done by:* the theme. *Status:* Proposed (2026-11-26).

**The rule.**

Opener styles belong to the template, not to a page group. A page group (the pages a measurement grouped together) can mix templates. Its measured variant style then fits one template and spoils the others. Name the opener styles after the template they serve (`headline-feature`, `headline-display`) and use each only in that template.

**Example.** A theme measured a red condensed-sans drop cap and headline on four opener pages. It then applied them to every opener, including a quiet excerpt whose own page uses a light serif and a black drop cap.

**Decide from the content.** Check each variant style against every page that uses it before you ship the theme.

**On each screen.** Same on every screen.

**In Wocument today.** Built: named styles and `extends`.

## J8. White space is placed, not filled

*Decided by:* editorial-art-direction and image-art-direction. *Done by:* a skill, the engine (round up and optical centre: being built). *Status:* Proposed (2026-11-26), to be confirmed in review round 1c.

**The rule.**

Because a scene rounds up (J1), most screens end with some empty space. Skilled art directors do not fill that space. They choose where it lands. Space that is trapped, an empty pocket in the middle of a layout with content on all sides, looks like a mistake. Space that is pushed to the outer edges, such as the margins, a band at the top or an open column beside the text, looks confident and planned. A good page has contrast: one dense cluster of content and one open zone, never equal padding everywhere.

How much to do depends on how much of the screen is open:

| Open area on a screen | What to do | Owner |
| :-- | :-- | :-- |
| Small, 10 to 20% | Leave it as the outer margin or a top sink. A hairline rule may help. | The engine (margin); the art-direction skill (rule) |
| Medium, 20 to 35% | Promote a nearby pull quote or picture to a wider span, or shift a text-only block off centre and drop its hangline 2 to 4 lines. | Art-direction skill; image-art-direction for pictures |
| Large, over 35%, an opener | A deep sink: text and pictures drop to a shared line 20 to 35% down, leaving an empty band at the top. | Art-direction skill |
| Large, over 35%, mid-article | Pull a picture into a breather screen. | Image-art-direction skill |
| Large, last screen of a scene or run | Promote an earlier picture or quote so the screen is 60 to 75% full, or add a closer (end mark, author note, credits, a closing quote with a cutoff rule). If more than 20% is still free, the engine sets the block in the optical centre: 40% of the free space above and 60% below, in whole baselines. | Art-direction skill; the engine (centre) |

The tools, in short:

- **Deep sink and hangline.** A shared line that text and pictures hang from, low on the screen. Good for openers and tall screens.
- **Hairline rules.** A vertical rule between columns ties them together on a wide screen and separates unequal zones. A full-width horizontal rule at the hangline claims the empty band above. A short cutoff rule seals a short column.
- **A monumental pull quote.** 2.5 to 4 times the body size, in an open column or across two, with 3 to 4 baseline lines of space around it.
- **Spend spare columns on pictures, never on wider text.** Keep body lines under about 70 characters. Bleed one outer edge of a picture against an open opposite margin. Pair one dominant picture with one small detail, not two of equal weight.
- **Asymmetric voids.** Move the reading block off centre. Do not centre a narrow block in a wide screen.
- **Typographic colour.** On large bright screens, a little more leading can lighten a text block. This is not used in Wocument: text size and leading never change to suit the space.

Never do these:

- Never trap space in the middle of a layout.
- Never stretch paragraph or line spacing to reach the bottom of a screen.
- Never widen a line of text past about 72 characters.
- Never add decoration only to fill space.
- Never spread equal padding everywhere.

**Example.** An opener scene is one screen and its content fills 55% of it, so 45% is open. The plan drops the headline, deck and first column to a hangline 30% down, sets one full-width hairline rule on that line, and lets the top band stay empty. The picture beside the text takes the spare columns instead of the text getting wider. The empty band sits at the top edge, so it reads as a choice.

Another: the last screen of a section run has one short column of text and 70% free space. The plan promotes a picture from the screen before it to fill about two thirds of the width, and ends the text with an end mark and a short author note.

**Decide from the content.** Measure how much of the final layout is open. Find where it would land if nobody chose. If it would land in the middle, move it to an edge or fill it with a promoted picture or quote. Pick the smallest tool in the table that moves the space to an edge.

**On each screen.**

- Laptops and wide screens (1024 px and up): The full ladder, including the deep sink, column rules and off-centre blocks.
- Tablets (640 to 1023 px): The same ladder with fewer columns. A deep sink and a pull quote across two columns still work.
- Phones (under 640 px): The scene scrolls as one column, so there is no open area to place. No blank strips; no sink.

**In Wocument today.** Built: `\rule` and column rules, `size=wide` and `size=hero`, `bleed`, `cols=`, and pull-quote styles. Being built: the engine's round-up and its optical centring of a short last screen. Not built: an attribute for the hangline or sink. Until it exists, make the sink with a frame's `top=` or an empty grid row. Everything else in the table is decided in the plan and set by hand.
