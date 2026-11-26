# D. Second voices and page furniture

Everything on the page that is not the story itself: captions, credits, notes, section labels, author lines, end marks. Several of these are options rather than defaults: the content and the profile decide whether to use them.

Each rule reads: **the rule**, an **example**, **decide from the content** (what in the content brief changes it), **on each screen**, **in Wocument today**, and its **status** from the owner's review.

## D1. Captions are a second voice; where they sit is chosen per piece

*Decided by:* publication-system. *Done by:* the theme, the engine (not built yet, see the wish-list). *Status:* Kept as an option, not a default. The owner left it open and said the content and the design decide (2026-11-24).

**The rule.**

Captions (the short text describing a picture) and credits (who took the photo) must never be confused with the story. So they get their own "second voice": a different typeface, size or colour from the body text.

On wide, picture-led spreads, the captions for all the pictures can be gathered into one small block, with position words to say which caption belongs to which picture ("Above: …", "Right: …"). That keeps the pictures clean.

On a phone, the pictures are stacked one under the other, so "above" and "right" no longer mean anything. There, every caption goes back under its own picture, and the position words are dropped.

**Example.** On a laptop, a block in the corner reads: "Left: the kitchen in the morning. Right: the garden in May." On an iPhone, "The kitchen in the morning." sits directly under the kitchen photo, and "The garden in May." under the garden photo.

**Decide from the content.** Captions and credits are always a second voice (a different face, size or colour): that part is fixed. Where they sit is chosen per piece. By default each caption sits under its own picture, which is what the engine does well today. A gathered block with position words ("Left: …") is an option only for a picture-led spread with 3 or more pictures, where single captions would clutter the pictures. On phones, captions always sit under their pictures.

**On each screen.**

- Laptops and wide screens (1024 px and up): One gathered block of captions.
- Tablets (640 to 1023 px): Gathered, or under each picture.
- Phones (under 640 px): Under each picture, without position words.

**In Wocument today.** The caption styles are already built, so captions can have their own font and colour. What the engine cannot do yet is move a caption between a gathered block (on wide screens) and its own picture (on phones) without writing it twice. That is an engine gap.

## D2. The alley and the margin rail are working space

*Decided by:* publication-system. *Done by:* the theme, the engine (not built yet, see the wish-list). *Status:* Approved.

**The rule.**

On a wide screen there is often room beside the text. This rule turns that room into a "rail": a narrow column (about 15 to 20% of the width) on the outer side of the text. The rail holds short extra material: credits, author notes, short quotes, definitions.

Each note sits level with the paragraph it belongs to, so the reader sees it right when it is relevant. The same idea works for a wide alley between two columns (see A5).

On narrower screens there is no room for the rail. It closes, and each note moves into the text, right after the paragraph it belongs to.

**Example.** A paragraph mentions a 1967 exhibition. In the rail beside it, a short note says "The exhibition ran for six weeks in Basel." On a phone, that note appears as a small box right after that paragraph.

**Decide from the content.** Use the alley or the margin rail only when the content has small things that belong beside the text: an author bio, a short note, a definition, a credit, a short quote. If there is nothing like that, the alley is simply air. Never invent content to fill it.

**On each screen.**

- Laptops and wide screens (1024 px and up): The rail is open, with each note beside its paragraph.
- Tablets (640 to 1023 px): The rail is closed; notes go into the text.
- Phones (under 640 px): Notes go into the text.

**In Wocument today.** This is new. A rail column is a choice a theme can make with its grid. Moving a note from the rail into the text on phones is an engine gap.

## D3. The author line: where it goes depends on the piece

*Decided by:* publication-system. *Done by:* the theme. *Status:* Kept as an option, not a default. The owner left it open and said the content and the design decide (2026-11-24).

**The rule.**

A short story ends with its author: first a small end mark (a symbol that says "the story is over"), then a dash and the author's name, or a one-line bio ("Ana Ruiz writes about design from Lisbon.").

This keeps the top of the page for what matters there: the headline and the first line of the story.

**Example.** The last paragraph ends with ■. Under it: "— Ana Ruiz" or "Ana Ruiz is a writer based in Lisbon. Her book on kitchens comes out in May."

**Decide from the content.** Where the author line goes depends on the piece. **At the top**: news, reporting and expert pieces, where who wrote it helps the reader trust it. **A tail byline (dash and name) at the end**: short items, columns and light pieces. **A bio at the end**: features by an outside writer, where the reader wants to know who they are after reading. **No author line**: unsigned or collective pieces. A publication keeps one choice per article type, so readers learn where to look.

**On each screen.**

- Laptops and wide screens (1024 px and up): After the last paragraph.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Same.

**In Wocument today.** This is built. The engine has a bio command (`\bio`), a byline command (`\byline`) and an end mark (`\endmark`).

## D4. A section label, styled by the profile

*Decided by:* publication-system. *Done by:* the theme, the engine (not built yet, see the wish-list). *Status:* Kept as an option, not a default. The owner left it open and said the content and the design decide (2026-11-24).

**The rule.**

A "slug" is a short label that tells you which section of the publication you are in: "Design", "Travel", "Interview". This rule sets it as white (or light) letters on a solid coloured block, placed just before the headline.

A solid slug is easy to spot at a glance and helps the reader find their way through a sectioned publication.

**Example.** Above the headline "The quiet house", a small red block contains the word DESIGN in white capital letters.

**Decide from the content.** A section label is useful only when the publication has sections the reader moves between. Its style comes from the profile: a solid colour slug suits graphic and expressive profiles; restrained profiles use small capitals in the accent colour. A single article needs no section label.

**On each screen.**

- Laptops and wide screens (1024 px and up): A slug.
- Tablets (640 to 1023 px): A slug.
- Phones (under 640 px): A slug.

**In Wocument today.** This is an engine gap: text in Wocument cannot have a background colour yet. The workaround today is a small filled sidebar that holds the label.

## D5. A repeated shape in the small parts, when the house style has one

*Decided by:* publication-system. *Done by:* the theme. *Status:* Kept as an option, not a default. The owner left it open and said the content and the design decide (2026-11-24).

**The rule.**

Pick one simple shape (a circle, a square or a dot) and repeat it in all the small parts of the page: around the page number, as the bullet in lists, as a marker before the author's name, and as the end mark.

Repeating one shape makes a house style feel owned and consistent, and it costs almost nothing.

**Example.** The page number sits in a small circle, the byline starts with "● Ana Ruiz", and each story ends with ●.

**Decide from the content.** Choose a repeated shape only when the house style or the subject offers one naturally (a circle for a publication about time, a square for one about building). Choose it once for the whole publication. Single articles do without, and a shape that fights the subject is left out.

**On each screen.**

- Laptops and wide screens (1024 px and up): Same on every screen.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Same.

**In Wocument today.** This is built: the end mark can use any glyph (`\endmark`), and the page number has its own style (`\folio`).

## D6. On a phone, drop decoration, never content

*Decided by:* publication-system. *Done by:* a skill. *Status:* Approved.

**The rule.**

On a phone there is less room, so some things may have to go. This rule says what may go and what may not.

Decoration may go: ornaments, doodles, repeated motifs, decorative rules. Content may never go: captions, credits, notes and any text the reader needs. Hiding a caption on a phone means the phone reader gets less information than the desktop reader, which is never acceptable.

**Example.** A wide layout has a row of decorative stars over the caption. On the phone the stars disappear, but the caption "Photograph by Lee Kim" stays.

**Decide from the content.** The rule does not change. What counts as content and what counts as decoration comes from the brief: anything named in the text, listed under "Entities" or "Content constraints", or listed as a chosen candidate is content and must survive on phones.

**On each screen.**

- Laptops and wide screens (1024 px and up): Every part is shown.
- Tablets (640 to 1023 px): Every part is shown.
- Phones (under 640 px): Ornaments may go; all text stays.

**In Wocument today.** This is a rule for the skill, which decides what to hide on phones.
