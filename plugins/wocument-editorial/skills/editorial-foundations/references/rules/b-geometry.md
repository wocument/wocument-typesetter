# B. Geometry that transforms

A printed spread has a fixed size; screens come in every size. These rules say how the layout changes from one screen size to another: what gets wider, what moves and what stacks.

Each rule reads: **the rule**, an **example**, **decide from the content** (what in the content brief changes it), **on each screen**, **in Wocument today**, and its **status** from the owner's review.

## B1. No spine: a spread becomes one scene with zones

*Decided by:* editorial-art-direction. *Done by:* a skill, the theme. *Status:* Approved.

**The rule.**

A printed magazine "spread" is two facing pages, with a fold (the "spine") down the middle. Print designers work around that fold: they avoid putting faces or text across it.

A screen has no fold. So a spread becomes one single scene (one screen-wide band of the page). The centre of the screen is no longer a dead zone to avoid; it can be a strong line where the picture side meets the text side.

When one half of the scene is a picture and the other half is text, the space between them is a "zone margin": about 2.5 to 3 times the width of the alley between text columns. That is wide enough to say "these are two zones" without pretending there is still a fold.

**Example.** In print, a house photo fills the left page and the story runs in two columns on the right page. On a 1920 px screen, the photo takes about 45% of the width on the left, then a 90 px space, then the text in two columns. On a tablet the photo goes on top and the text below. On a phone it is photo, then text, stacked.

**Decide from the content.** The rule itself does not change. The content decides which zone leads the scene. When the brief's visual pull is 4 or 5 (the pictures carry the story), the picture zone leads and the text zone supports it. When it is 1 or 2, the text zone leads and pictures sit beside it.

**On each screen.**

- Laptops and wide screens (1024 px and up): Picture about 45% of the width, then a zone margin, then the text in 2 columns.
- Tablets (640 to 1023 px): Picture on top, text in 1 or 2 columns below it.
- Phones (under 640 px): Picture, then text, one after the other.

**In Wocument today.** Scenes already replace pages in Wocument, so a spread naturally becomes one scene. One idea from the article is not possible yet: keeping the picture half fixed in place while the text half scrolls through several screens. That needs "pinned" scenes, which the specification has postponed.

## B2. Big screens grow the margins, not the text

*Decided by:* editorial-art-direction. *Done by:* the engine (built). *Status:* Approved.

**The rule.**

On very large screens, the text and pictures should not keep spreading out to fill the whole width. Past a certain width, the area that holds the content stops growing. All the extra width goes to the margins on the left and right.

Think of a framed print with a wide card border (a "mat" or "passe-partout") around it: the picture stays the size it should be, and the frame gets bigger.

**Example.** The content area grows up to 1440 px wide. On a 1920 px monitor, the content is 1440 px and each side margin is 240 px. On a 3840 px (4K) monitor, the content is still 1440 px and each side margin is 1200 px.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): The content area stops growing at its maximum width, and the margins take the rest.
- Tablets (640 to 1023 px): Margins of about 32 to 48 px on each side.
- Phones (under 640 px): Margins of about 16 to 20 px on each side.

**In Wocument today.** The engine already does this. Each grid has a maximum width (1440 px by default), and beyond it the margins grow instead of the columns.

## B3. Columns follow the line, up to 4, and the content can ask for fewer

*Decided by:* editorial-art-direction. *Done by:* the engine (built), the theme. *Status:* Changed by the owner (2026-11-24).

**The rule.**

How many columns of text should a screen have? Let the reading line decide (see A1): use as many columns as keep each one at 45 to 75 characters, but never more than 4. On a very wide screen, the extra width beyond 4 columns goes to bigger margins and bigger pictures, not to a fifth column.

The number of columns is not the same for every article. It depends on what the article is. An intimate story, such as a personal profile, never gets more than 2 columns: wide lines read slowly and feel like a conversation. Reporting, news and service pieces may use up to 4 narrower columns: shorter lines read faster and feel brisk. A visual piece puts its little text in one column. So the rule gives the maximum, and the content decides how close to the maximum to go.

**Example.** On a 2560 px monitor there is room for 5 columns of 60 characters. A news report uses 4 columns, and the extra width goes to the margins. A profile of a chef uses 2 wide columns, and the rest of the width goes to a large portrait beside the text.

**Decide from the content.** Start from the reading line: as many columns as keep each one at 45 to 75 characters, never more than 4 (the engine's `columns=auto` gives this). Then the content lowers the cap. **Intimate stories** (a personal profile, a personal essay, a letter; brief warmth 4 or 5, a lot of "I" in the voice measures): never more than 2 columns, because wide lines read slowly and feel like a conversation. **Reporting, news, service pieces and roundups** (genre news, report, explainer; density 4 or 5): up to 4 columns. **Visual pieces** (visual pull 5): the little text there is sits in one column, in a quiet zone or a side rail (see E9).

**On each screen.**

- Laptops and wide screens (1024 px and up): Up to 4 columns, fewer when the content asks for it (2 at most for intimate stories); extra width goes to pictures and margins.
- Tablets (640 to 1023 px): 1 or 2 columns.
- Phones (under 640 px): 1 column.

**In Wocument today.** The engine's default (`columns=auto`, a 600 px measure) gives up to 4 columns from 1800 px, which the owner kept (2026-11-24). The lower caps for intimate stories and visual pieces are written by the skill as a `columns` value on the text frame.

## B4. Below the grid, the scene stacks in reading order

*Decided by:* editorial-art-direction. *Done by:* the engine (built). *Status:* Approved.

**The rule.**

On a wide screen, a scene can put things side by side: a picture in the left half, text in the right half, a caption in a corner. A phone is too narrow for that. So on a phone, the scene's parts are placed one under the other instead.

The order they are stacked in is the order they are written in the Wocument file (the "source order"). That means the writer, or the skill, must write the parts in the order a phone reader should meet them: usually the picture first, then the title, then the text, then the caption.

**Example.** A scene has a title at the top right, a picture on the left and a caption at the bottom right. If the file lists them as "caption, picture, title", a phone reader would see the caption first, which makes no sense. Written as "title, picture, caption", the phone shows them in a natural order.

**Decide from the content.** The rule does not change. The order comes from the story itself, and any reading order that the brief lists under "Content constraints" (a reveal, a sequence of steps, a joke that must come last) must survive the stacking.

**On each screen.**

- Laptops and wide screens (1024 px and up): Parts are placed side by side on the grid.
- Tablets (640 to 1023 px): Placed on the grid, or stacked if they do not fit.
- Phones (under 640 px): Stacked one under the other, in the order they are written in the file.

**In Wocument today.** The engine already does this, with what it calls the linearize rule. When the parts of a scene do not fit the phone's grid, it stacks them in source order and shows warning W031 to say it has done so.

## B5. Paged scenes need enough height

*Decided by:* editorial-art-direction. *Done by:* the engine (not built yet, see the wish-list). *Status:* Approved.

**The rule.**

Some Wocument scenes are "paged": instead of one long column that you scroll, the text is cut into screen-sized pages with several columns side by side, like a magazine.

That only works when each screen is tall enough. If a column holds only a few lines before it has to jump to the next column, the reader is constantly jumping up and down after every few lines.

So this rule says a paged scene needs about 12 lines per column on one screen. If the window is shorter than that (for example a laptop with a large toolbar, or a phone turned sideways), the scene gives up on paging and becomes one normal scrolling column.

**Example.** A laptop window is 1440 px wide but only 500 px tall because of a docked panel. A screen page would have columns of only 8 lines, so the reader would jump to the next column after every 8 lines. Under this rule the scene becomes a single scrolling column instead.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): Screen pages, as long as each column holds about 12 lines or more.
- Tablets (640 to 1023 px): Same as wide screens.
- Phones (under 640 px): One column, which phones already use.

**In Wocument today.** The owner approved this rule (2026-11-24). It is not built yet: the engine decides how to lay out pages from the screen's width only, not its height. A check for "at least about 12 lines per column" is on the engine wish-list.

## B6. Break where the content breaks, not at device sizes

*Decided by:* editorial-art-direction. *Done by:* the theme. *Status:* Approved.

**The rule.**

A "breakpoint" is a screen width at which the layout changes, for example from 2 columns to 1. A common habit is to put breakpoints at the widths of popular devices (an iPhone, an iPad).

This rule says: change the layout when the content stops working, not when a particular device appears. For example, switch from 2 columns to 1 at the width where a column would fall below 45 characters, whatever device that happens to be.

Wocument has named breakpoints (phone, tablet, compact, wide). These are good defaults, but a theme may move them if its content needs it.

**Example.** A theme uses a large body size, so its two columns drop below 45 characters at 760 px, not at 640 px. That theme moves its tablet breakpoint to 760 px so the columns never get too narrow.

**Decide from the content.** This rule is about the content by definition: break the layout where this content breaks, not at standard device sizes. Test with the real material (the longest headline, the widest table, the biggest picture) and put a breakpoint where it stops working.

**On each screen.**

- Laptops and wide screens (1024 px and up): No change.
- Tablets (640 to 1023 px): The number of columns changes when a line would drop below about 45 characters.
- Phones (under 640 px): No change.

**In Wocument today.** The engine already allows this: the named breakpoints can be redefined in a theme.

## B7. Adapting is recomposing, not shrinking

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Approved.

**The rule.**

Making the phone version of a page means redesigning it for the phone, not taking the wide page and shrinking it.

A shrunk page has tiny text, tiny pictures and lots of wasted space. A recomposed page puts the picture first and large, uses one column and keeps the text at a readable size.

**Example.** In print, a spread has a large photo, a small photo, a quarter-page photo and two columns of text. The phone version is: the large photo full width, then the title, then the text, then the two smaller photos as full-width pictures between paragraphs. It is not the whole spread scaled down to 390 px wide.

**Decide from the content.** What to keep when recomposing comes from the brief: the beats marked heavy, the turning points and the lead picture stay; decoration goes first (see D6). Nothing listed under "Content constraints" may be dropped.

**On each screen.**

- Laptops and wide screens (1024 px and up): The full spread composition.
- Tablets (640 to 1023 px): Recomposed for two columns.
- Phones (under 640 px): Recomposed: picture, then title, then text.

**In Wocument today.** This is a rule for the skill, which writes the phone order and phone values. The engine provides the tools (per-breakpoint values and stacking).
