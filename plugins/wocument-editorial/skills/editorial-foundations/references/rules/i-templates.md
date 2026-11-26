# I. Templates and runs

How a publication repeats itself: the small set of layouts it uses again and again, how a story moves through them, and how much of it is given to pictures. These rules come from a grid study of ten issues of five magazines (a culture monthly, a fashion monthly, a women's lifestyle monthly, a men's monthly and an entertainment trade weekly), measured from the PDFs and written here in our own words. No layout is copied: the rules describe what the study found, and the skills design in our own system.

Each rule reads: **the rule**, an **example**, **decide from the content** (what in the content brief changes it), **on each screen**, **in Wocument today**, and its **status** from the owner's review.

## I1. A publication works from a small set of templates

*Decided by:* publication-system. *Done by:* a skill, the theme. *Status:* Proposed (2026-11-26), waiting for the owner's review.

**The rule.**

A magazine looks varied, but most of its pages come from a few layouts. In the study, each magazine had about five to nine page templates and two to five spread templates. Those covered between a third and two thirds of its editorial pages. The rest were openers designed for one story, and a few one-off pages.

So a publication system names its templates and keeps the list short. A new layout becomes a template only when it is used on at least three pages; until then it is a one-off.

**Example.** A monthly with seven page templates: a long-text page, a picture page with a line of text, a department page of short items, a contributors page, and three others. Its features open differently each time, but after the opener every page is one of the seven.

**Decide from the content.** A single article needs only the templates its pacing map uses. A publication with recurring pieces needs one template per recurring piece (E10). More templates than the content asks for make the publication feel less like one voice.

**On each screen.**

- Laptops and wide screens (1024 px and up): Each template keeps its arrangement.
- Tablets (640 to 1023 px): Each template has its own tablet arrangement, decided once, not per article.
- Phones (under 640 px): Each template stacks in reading order (B4), the same way every time.

**In Wocument today.** There is no template command. A template is a scene written once with placeholder content, kept in the publication's template pack (I8), plus the named styles in its theme.

## I2. Three templates nearly every magazine has

*Decided by:* publication-system. *Done by:* a skill, the theme. *Status:* Proposed (2026-11-26), waiting for the owner's review.

**The rule.**

Three layouts appeared in all five magazines of the study, whatever their subject:

1. **A picture-led page:** one picture takes most of the page, with a title or a line of text.
2. **A text page with one picture:** running text in columns, with a single picture set into it.
3. **A big picture facing text:** across a spread, one large picture on one side and the running text on the other.

So every publication system ships these three, styled in its own way, before it adds templates of its own.

**Example.** A sober policy journal and a fashion monthly both need a page where one photograph speaks with a caption, a page of reading text with a figure, and a spread that pairs a portrait with the interview beside it. They look nothing alike, but the structures are the same.

**Decide from the content.** The three are the default kit. A piece with no pictures at all uses only the text template with type for rhythm (E4).

**On each screen.**

- Laptops and wide screens (1024 px and up): The big picture facing text keeps its two halves side by side as zones of one scene (B1).
- Tablets (640 to 1023 px): The same, or the picture above the text when the text column gets too narrow.
- Phones (under 640 px): The picture comes first, then the text.

**In Wocument today.** All three can be built with frames, `\figure` and the grid. They are the first three entries of every template pack.

## I3. A template is chosen for its use, not its look

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Proposed (2026-11-26), waiting for the owner's review.

**The rule.**

Each template carries a short use record:

- the kind of content it serves (essay, profile, interview, gallery, department, opener, directory, ranking);
- the context it was found in;
- what it is for, in one sentence;
- what it needs from the content: how many pictures and of which size (hero, spot or cut-out), how much text, and which components.

Art direction picks templates by matching the content brief to these records. A template that looks right but needs a hero picture the gallery does not have is the wrong template.

**Example.** A profile with one strong portrait and 3,000 words: the opener is "a long profile with a short headline, a full standfirst and big portraits", then "continuous reading text with a picture now and then". A gallery of 12 equal product shots with a fact each: "a set of people or products with equal weight, each with a short labelled fact box".

**Decide from the content.** The brief's genre picks the kind; its candidates (pictures named in the text, data passages, quotable lines) decide whether a template's needs can be met.

**On each screen.**

- Laptops and wide screens (1024 px and up): As the template.
- Tablets (640 to 1023 px): As the template.
- Phones (under 640 px): As the template; the use record says which parts may drop on a phone (D6).

**In Wocument today.** This is a rule for the skill. The use record is a comment block at the top of each template's file in the pack (I8).

## I4. Stories move in runs

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Proposed (2026-11-26), waiting for the owner's review.

**The rule.**

A story is not a set of separate pages. It is a run: an opener, then one body template repeated, with a planned interruption now and then. The study found a few run shapes again and again:

- **The long read:** an opener, then text pages in the same template, with rhythm from a pull quote, a drop cap or a small box rather than from pictures.
- **The long read with one stop:** the same, with one big photograph placed once in the middle.
- **The chaptered feature:** each chapter starts with a big picture and a short label, followed by a few text pages.
- **The equal set:** a gallery, directory or ranking where every item gets the same space, page after page.

The pacing map is written as runs, not as single pages. A change of template inside a story is a decision with a reason; a change at random reads as a new story starting (E2).

**Example.** A 6,000-word reported feature: an opening spread with a dominant picture and the title, eight text spreads with a pull quote on every second one, one full-bleed photograph after the fourth, and a byline at the foot of the last column.

**Decide from the content.** The brief's structure decides the shape. Numbered sections or stages suggest a chaptered feature. A list of comparable items suggests an equal set (F1, F3). One continuous argument suggests a long read. How often to interrupt follows E5 and the dial (E1).

**On each screen.**

- Laptops and wide screens (1024 px and up): One template per scene, as mapped.
- Tablets (640 to 1023 px): The same run.
- Phones (under 640 px): The same run, but an equal set becomes one item per screen (C8).

**In Wocument today.** A run is a sequence of scenes. The grid's `cadence=` can record a repeating order of templates.

## I5. How much goes to pictures is a setting

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Proposed (2026-11-26), waiting for the owner's review.

**The rule.**

The share of pages given almost entirely to pictures differs hugely between publications, and stays steady inside one. In the study it ran from about one page in twenty in the trade weekly to more than half the pages in a fashion monthly. The three general monthlies sat between a third and just over two fifths.

So the direction states this share as a target, set together with the dial (E1), and the pacing map is checked against it.

**Example.** A trade publication about an industry: about 5% full-picture pages, the rest text, data and small portraits. A fashion story: half the pages are pictures alone.

**Decide from the content.** The brief's visual pull, and how many strong pictures the gallery actually has. A target that the pictures cannot fill is lowered rather than filled with weak pictures.

**On each screen.**

- Laptops and wide screens (1024 px and up): As targeted.
- Tablets (640 to 1023 px): As targeted.
- Phones (under 640 px): Full-picture scenes become full-screen scenes (G7); the share stays the same.

**In Wocument today.** This is a rule for the skill. The theme catalogue (`../theme-catalogue.md`) records each theme's measured share.

## I6. Openers and picture pages have their own type

*Decided by:* publication-system. *Done by:* the theme. *Status:* Proposed (2026-11-26), waiting for the owner's review.

**The rule.**

The pages that open a story and the pages that are almost all picture do not use the body styles unchanged. Their headlines are bigger, their decks longer, and their text often sits on the picture. So the theme keeps a set of opener styles and a set of picture-page styles, each based on the body style it changes.

Text on a dark picture or panel never gets a fixed white. It uses the theme's ink colour under the dark palette, so it stays readable when the reader switches themes.

**Example.** The body headline is 28pt; the opener headline is the same face at 72pt, and the caption on a full-bleed photograph uses the dark palette's ink.

**Decide from the content.** Fixed by the publication; the content chooses only when an opener or a picture page is used (I4).

**On each screen.**

- Laptops and wide screens (1024 px and up): As styled.
- Tablets (640 to 1023 px): As styled, scaled with the display type (A2).
- Phones (under 640 px): The opener becomes a cover (C3).

**In Wocument today.** Styles that extend the body styles (`\style[extends=…]`), and a `night` palette for dark grounds.

## I7. One main grid, made of modules that survive the screen

*Decided by:* publication-system. *Done by:* the theme. *Status:* Proposed (2026-11-26), waiting for the owner's review.

**The rule.**

Each magazine in the study had one main grid. The most common was six columns, and a twelve-column grid was two of those. Its templates are drawn in modules of that grid, not in points. A module is a group of columns wide enough to hold a readable column of text.

On a screen, the module count follows the width, and a wider screen never has fewer modules than a narrower one. Because the templates are drawn in modules, the same template works on every screen without a separate design for each width.

**Example.** A six-column page with a two-column module: three modules across. On a laptop the template keeps three modules; on a tablet two; on a phone one, stacked in reading order.

**Decide from the content.** Fixed by the publication. A piece may ask for fewer columns than the grid allows (B3), never more.

**On each screen.**

- Laptops and wide screens (1024 px and up): All modules; larger screens grow the margins (B2).
- Tablets (640 to 1023 px): Fewer modules, never fewer than on a phone.
- Phones (under 640 px): One module.

**In Wocument today.** The theme's `\grid` at each breakpoint, and frames placed with `cols=`.

## I8. The template pack

*Decided by:* publication-system. *Done by:* a skill. *Status:* Proposed (2026-11-26), waiting for the owner's review.

**The rule.**

Because Wocument has no template command, each publication keeps a template pack next to its theme. The pack is a folder with one file per template. Each file is one scene written with placeholder content, and begins with the template's use record (I3).

To use a template, a skill copies its scene into the document and replaces the placeholder content. It does not change the frames or the styles; a template that needs changing is changed in the pack, so every later use gets the change.

**Example.** `templates/long-read-body.woc` holds one scene of text columns with a pull quote slot, and starts with its use record: essay, "continuous reading text with a picture now and then", needs no picture or one spot picture.

**Decide from the content.** The pack holds the templates the publication needs (I1, I2); the content chooses among them (I3).

**On each screen.**

- Laptops and wide screens (1024 px and up): Each template file sets its own breakpoint values.
- Tablets (640 to 1023 px): The same.
- Phones (under 640 px): The same.

**In Wocument today.** Plain `.woc` files that pass `woc check` on their own with the theme. A template command in the language may replace the pack later; that is a change to the specification and needs the owner's approval.
