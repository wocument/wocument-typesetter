# Editorial mechanics

Rules that hold across publications of very different taste. Each one was seen in at least two
independent publications and approved by the owner. They are taste-neutral: a profile
(`profiles.md`) decides how each one looks.

Read a mechanic as: **the rule**, **use when**, **not when**, **in Wocument**. The owner skill is the
only skill that decides it; other skills may read it or flag a problem with it.

Codes are stable identifiers for the approval log; they carry no meaning.

## Owner: editorial-art-direction

### C1. Expressiveness is one dial
- **Rule:** every publication sits somewhere between two ends. Restrained: text first, small
  heads, few drop caps, rectangular wraps even around cut-outs, one consistent grid. Expressive:
  display faces, big loud pictures, cut-outs and grid breaks, bright colour. Choose the position
  from the reader and the subject, then stay there for the whole publication.
- **Use when:** choosing a profile. It is the first decision after the content brief.
- **Not when:** never skip it.
- **In Wocument:** every profile carries an `expressiveness` value; the direction states it.

### M2. Breaks go between units, never inside a long story
- **Rule:** interruptions (ads, house pages, short items) sit between stories. A long story runs
  unbroken. Short items carry the breaks.
- **Use when:** ordering an edition or a multi-article page.
- **Not when:** a single article.
- **In Wocument:** scene and `\article` order in the edition.

### M5. Front matter looks different from the main content
- **Rule:** the reader must see that the main content has not started yet: a different ground,
  template or density for preface and department pages.
- **Use when:** an edition has front-of-book or department pages.
- **Not when:** a single article.
- **In Wocument:** a separate scene palette (`\palette`, `bg`) or grid for those scenes.

### T1. In text-led stories, type carries the pacing
- **Rule:** with few pictures, rhythm comes from type events: pull quotes, large or block drop
  caps, run-in subheads, a change of size or measure. Plan them like pictures.
- **Use when:** long reads with few pictures.
- **Not when:** picture-led stories; the pictures pace them and extra type events add noise.
- **In Wocument:** `\pullquote`, `\dropcap[lines]`, `\subhead`, `\lede`, a wider `\frame` for an intro.

### T2. A package gets its own kit on the house grid
- **Rule:** a group of related stories may change label, ornament, display type and ground
  colour. The body grid and text styles stay the house ones.
- **Use when:** a themed section or special issue.
- **Not when:** one standalone story: a kit for one story is decoration.
- **In Wocument:** the package is an `\article` with its own theme; the document theme keeps the grid and body styles.

### T5. Abstract subjects get illustration; people and places get photographs
- **Rule:** when nothing real can be photographed (an idea, a risk, money, software), commission
  or choose illustration. When the subject is a person or a place, photograph it.
- **Use when:** choosing the picture type for a story.
- **Not when:** a real photograph is evidence the story needs.
- **In Wocument:** recorded in the direction; image-art-direction selects within it.

### T7 + C4. Break the grid once, by the rules
- **Rule:** one object may cross a column, picture or page edge to give a spread energy. It only
  reads as deliberate when:
  1. the text columns and at least one rectangular picture stay locked to the grid;
  2. there is one large cut-out and, at most, smaller ones beside it;
  3. captions stay on the grid and point to the object with an arrow or a number;
  4. the object either bleeds fully off the edge or sits well inside the margin, never just short of it.
- **Use when:** expressive profiles (C1), one spread at a time.
- **Not when:** restrained profiles; more than one break per spread.
- **In Wocument:** a cut-out `\figure[shape=alpha, wrap=contour]` with `offset-x`/`offset-y` or `bleed`; caption text carries the arrow or number.

### F1. Spread pacing alternates density
- **Rule:** in a picture-led story over several spreads, a text-heavy spread is followed by a
  picture-only reset. Never two text-heavy spreads in a row.
- **Use when:** picture-led features of 4 pages or more.
- **Not when:** text-led long reads (T1 paces those).
- **In Wocument:** scene order in the pacing map; a reset is a `height=screen` scene with one picture.

### F2. A full-bleed photo may carry one quote as its only text
- **Rule:** a strong line from the subject can sit alone on a full-bleed photograph, in the
  picture's quiet area. It may be split across the fold on wide screens.
- **Use when:** profiles with a quotable subject and a picture with empty space.
- **Not when:** the picture has no quiet area.
- **In Wocument:** a scene with a background `\figure` and a `\pullquote[layer=overlay]`.

### B1. Density is a setting
- **Rule:** each publication has a density (dense for expert readers, airy for skimming).
  Heavy copy is fitted without changing the grid: drop the paragraph space, wrap text around a
  contour, use fewer and wider columns.
- **Use when:** choosing a profile; fitting a page with more copy than planned.
- **Not when:** never change the grid to fit copy.
- **In Wocument:** `\style space-after`, `\frame columns`, `wrap=contour`.

## Owner: image-art-direction

### M3. One picture per page bleeds and leads
- **Rule:** on picture-led spreads with 2–4 pictures, one picture bleeds; the others keep the
  margins, so the bleeding one reads as the lead.
- **Use when:** picture-led spreads.
- **Not when:** a photo essay where every picture bleeds by design; text-led pages.
- **In Wocument:** one `\figure[bleed=…]` per scene.

### F3. Choose pictures with a quiet zone for the type
- **Rule:** when type sits on a picture, pick (or ask for) a picture with a low-contrast empty
  area where the title and credits go. Then the type needs no box, tint or shadow.
- **Use when:** openers and full-bleed spreads with type on the picture.
- **Not when:** busy pictures: put the type beside them.
- **In Wocument:** the image plan records the quiet zone; `focus` keeps it in frame at each breakpoint.

## Owner: publication-system

### M1. Templates for short pieces, designed openers for features
- **Rule:** short recurring pieces use fixed templates. Each feature gets its own opener, but all
  features share one body grid and body styles.
- **Use when:** any publication with recurring sections.
- **Not when:** a one-off piece: there is nothing to repeat.
- **In Wocument:** the language has no macros, so a template is a documented snippet plus named styles in the theme.

### M4. Captions and credits are a second voice
- **Rule:** captions, credits, bios and asides use a different typeface or colour from the body,
  so they never read as story text. On picture-led spreads they may be gathered in one narrow block
  keyed by position words; on phones they go back under each picture.
- **Use when:** always.
- **Not when:** —
- **In Wocument:** `\caption` and `\credit` styles with their own `family` or `color`. The gathered block is on the engine wish-list.

### T6. The author line closes the story
- **Rule:** a short bio or a tail byline (dash plus name) ends the story; short items sign off
  this way instead of a byline at the top. The bio may sit in the column alley instead (B2).
- **Use when:** bylined pieces.
- **Not when:** unsigned or collective pieces.
- **In Wocument:** `\bio` or `\byline` after the last paragraph, followed by `\endmark`.

### B2. The alley is a working space
- **Rule:** a wide channel between columns can hold the author bio, a short quote, a credit or
  just air. It is part of the grid, not left-over space.
- **Use when:** multi-column text pages on wide screens.
- **Not when:** phones: the content moves inline.
- **In Wocument:** a grid with an extra narrow column, a small `\frame` placed in it, hidden or moved at `@phone`.

### B4. One shape repeats in the small parts
- **Rule:** one geometric motif (circle, square, dot) repeats in the folio, bullets, byline marker
  and end mark. It makes a house style feel owned at almost no cost.
- **Use when:** any house style.
- **Not when:** the shape fights the subject.
- **In Wocument:** `\endmark[glyph]`, `\folio[style]`, and the same glyph in kicker and byline text.

### C2. Polished copyfitting
- **Rule:** for print-like long reads: justified text with hyphenation, first-line indents with no
  paragraph space, column feet ending on one baseline. On phones, ragged right.
- **Use when:** restrained and middle profiles, long reads.
- **Not when:** phone widths (justified narrow columns make rivers).
- **In Wocument:** `\style[align=justify, align@phone=left, hyphenate=true, indent=…, space-after=0]`; the engine balances column feet on a section's last page.

### C5. Category label as a solid slug
- **Rule:** a section label set reversed out of a solid colour block, before the headline.
- **Use when:** sectioned publications.
- **Not when:** a single article.
- **In Wocument:** text has no background colour; see the engine wish-list.

## Owner: component-builder

### T3. A series repeats one template and varies one property
- **Rule:** items of a series (interviews, rankings, profiles) share one layout; one property
  changes per item, usually colour, so items compare at a glance.
- **Use when:** lists, rankings, interviews in a run.
- **Not when:** items of very different weight.
- **In Wocument:** one snippet; the scene palette changes per item.

### T4. Data gets its own designed page
- **Rule:** several numbers get a page of their own: big numbers in mixed sizes, or a few simple
  charts, one short line under each, sources at the foot. A single comparison can be the headline
  itself (two bars of different length carrying the two figures).
- **Use when:** stories with several numbers.
- **Not when:** one number: use a statistic pull quote.
- **In Wocument:** charts are SVG in `\figure` with a full `alt`; big numbers are styles; never invent data.

### B5. Portrait grids
- **Rule:** many people: same-size portraits, same crop, on one pale ground, in an even grid.
  A few people: large portraits alternating sides with their text.
- **Use when:** lists of people, contributors.
- **Not when:** a single-person profile.
- **In Wocument:** `\group[layout=row]` of figures with one `ratio`; crops set in the image plan.

### B6 + C6. Formats for points and Q&A
- **Rule:** numbered points: a number and a bold run-in head per point. Q&A: the question is the
  second voice and the loudest element; the answer follows; the person's picture closes it.
- **Use when:** advice, lessons, interviews.
- **Not when:** narrative features.
- **In Wocument:** lists are not in the engine, so numbers are typed and run-in heads are `\span` styles.

### F4. Roundup items are islands
- **Rule:** each item in a product edit or directory gets the same small label, its bold name run
  into its text, and white space as the divider. Cut-outs carry numbers matching the text.
- **Use when:** product edits, beauty pages, buyer's guides, directories.
- **Not when:** narrative pages.
- **In Wocument:** a `\group` per item; numbers in the caption text.

### F5. Headlines in mixed sizes
- **Rule:** the key words of a headline or quote are set larger than the rest, so the line reads
  by emphasis. Each line may be sized to fill the measure.
- **Use when:** display heads in middle and expressive profiles.
- **Not when:** restrained profiles.
- **In Wocument:** `\span[style=…]` inside `\headline`; `\style[fit=width]` per line. Check the rendering.
