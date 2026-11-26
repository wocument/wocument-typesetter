# F. Components

Patterns that repeat across a publication, such as a series of interviews, a data page or a grid of portraits. The component builder designs each one once per publication; the next publication may design it differently. Recurring magazine parts (contents, editor's letter and so on) have their own guides in `../components/`.

Each rule reads: **the rule**, an **example**, **decide from the content** (what in the content brief changes it), **on each screen**, **in Wocument today**, and its **status** from the owner's review.

## F1. A series repeats one template and varies one thing

*Decided by:* component-builder. *Done by:* a skill. *Status:* Approved.

**The rule.**

A "series" is a set of items of the same kind: ten interviews, a ranking of the 50 best restaurants, profiles of five designers.

All items in a series use the same layout. Only one thing changes from item to item, usually the colour. Because everything else stays the same, the reader can compare the items at a glance and instantly sees where one ends and the next begins.

**Example.** Five designer profiles: each has the same big number, the same portrait position and the same text layout. Profile 1 is blue, profile 2 is orange, profile 3 is green.

**Decide from the content.** Use this only when the content is a series of comparable items (several interviews, a ranking, a set of profiles). The property that changes per item (usually colour) is chosen from the profile's palette.

**On each screen.**

- Laptops and wide screens (1024 px and up): 3 items side by side.
- Tablets (640 to 1023 px): 2 side by side.
- Phones (under 640 px): One under the other.

**In Wocument today.** This is for the component builder skill: one snippet of Wocument code, with a different colour palette for each item's scene.

## F2. Numbers get their own page; a headline can be the chart

*Decided by:* component-builder. *Done by:* a skill. *Status:* Approved. The owner asked that the content decides how it applies (2026-11-24).

**The rule.**

When a story has several important numbers, they get a page of their own instead of being buried in sentences. That page shows the numbers big (in mixed sizes, the most important biggest), with one short line under each saying what it means, and the sources at the bottom.

When the whole story is one comparison (for example "women earn 82 cents for every dollar men earn"), the headline itself can be the chart: two bars of different length carrying the two numbers.

Numbers must always be real and sourced. The skill never invents data.

**Example.** A story about cycling in a city: "412 km of bike lanes", "38% of trips by bike", "9 minutes average trip", each in large type with one line underneath, and "Source: City transport report 2025" at the foot.

**Decide from the content.** Make a data page only when the brief lists several numbers that compare with each other. The kind of data chooses the design: a few headline figures become big numbers; a change over time becomes a line chart; parts of a whole become bars. The profile sets the style: restrained profiles use small charts in one colour; expressive ones use big numbers. A single comparison can be the headline itself. Never invent, round away or decorate data.

**On each screen.**

- Laptops and wide screens (1024 px and up): 3 numbers per row.
- Tablets (640 to 1023 px): 2 per row.
- Phones (under 640 px): 1 per row; each must be readable at 390 px.

**In Wocument today.** This is for the component builder skill. Charts are SVG pictures with a full text description (`alt`) for screen readers. Data is never made up.

## F3. Portrait grids: many even, few alternating

*Decided by:* component-builder. *Done by:* a skill. *Status:* Approved.

**The rule.**

When a page shows many people (for example 12 contributors or a team), all portraits are the same size, cropped the same way (for example head and shoulders), on the same pale background, in an even grid. Then no one looks more important than anyone else, and the page looks calm.

When there are only a few people (two or three), each gets a large portrait, and the portraits alternate sides: the first on the left with text on the right, the next on the right with text on the left.

**Example.** A business magazine shows its 30 under 30: 30 headshots, all square, all cropped at the shoulders, all on light grey, 6 per row. A story about three founders: three large portraits, alternating left, right, left.

**Decide from the content.** The number of people decides: many people (about 6 or more) get an even grid of same-size portraits; a few people get large portraits alternating sides with their text.

**On each screen.**

- Laptops and wide screens (1024 px and up): Many people: 6 per row. Few people: alternating sides.
- Tablets (640 to 1023 px): Many people: 3 per row.
- Phones (under 640 px): Many people: 2 per row. Few people: one under the other.

**In Wocument today.** This is for the component builder skill. Every portrait uses one shape (ratio) and one crop rule, set in the image plan.

## F4. Q&A and numbered points: several designs, one per series

*Decided by:* component-builder. *Done by:* a skill. *Status:* Changed by the owner (2026-11-24).

**The rule.**

A question-and-answer interview (Q&A) must let the reader scan the questions quickly and always know who is speaking. There are several good ways to do this, and using the same design in every publication and every edition is not right. The design is chosen from the publication's profile and from the interview itself, then kept for the whole series so readers recognise it.

The patterns are: **question as a second voice** (the question in a different face or colour, a thin line down to the answer, the person's picture closing it); **initials in the margin** (the speakers' initials in bold, hanging in the margin, for dense and restrained publications); **questions as headings** (each question set large across the column, for expressive glossies); **conversation** (each speaker's name in small capitals running into what they say, for two or more people); and **quick-fire** (short questions and one-line answers as a grid of small islands). Each is described in `references/components/qa.md`.

Numbered points ("7 lessons from …") start each point with a number and a bold heading that runs straight into the text.

**Example.** A long interview with an architect in a quiet luxury magazine uses initials in the margin. A celebrity interview in a loud glossy sets each question as a large heading. A "60 seconds with" page uses quick-fire islands. Each publication keeps its choice for all its interviews.

**Decide from the content.** Q&A and numbered points have several designs, and no single one is right for every publication. Choose the design from the profile and the interview itself: how long it is, how many people speak, and its tone (energy, warmth). Keep the chosen design for the whole series in that publication, so readers recognise it; another publication or another edition may choose a different one. The patterns are described in `references/components/qa.md`.

**On each screen.**

- Laptops and wide screens (1024 px and up): As the chosen pattern: question beside or above the answer, the portrait close by.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): One under the other: question, answer, then the portrait. Initials and names stay in the second voice.

**In Wocument today.** This is for the component builder skill. The engine has no list command yet (lists are postponed), so numbered points and Q&A are typed as text, with the bold run-in headings made with styled spans.

## F5. Roundup items are islands with numbered keys

*Decided by:* component-builder. *Done by:* a skill. *Status:* Approved.

**The rule.**

A "roundup" is a page of products or places (the best chairs, ten shops to visit). Each item is treated as an "island": the same small label, the item's name in bold running straight into its description, and white space around it instead of lines or boxes.

When cut-out photos of the products are placed around the page, each carries a small number that matches the number in its text, so the reader can find which photo goes with which description.

**Example.** Ten chairs: each photo has a number (1 to 10). The text reads "**1 Oak stool.** Hand-turned in Portugal, €240." with white space before item 2.

**Decide from the content.** Use this only for product edits, beauty pages, buyer's guides and directories: content made of separate items with names.

**On each screen.**

- Laptops and wide screens (1024 px and up): Islands placed on the grid.
- Tablets (640 to 1023 px): Fewer items per row.
- Phones (under 640 px): One item per row: picture then text; the numbers stay.

**In Wocument today.** This is for the component builder skill: one group (`\group`) per item, with the numbers written in the caption text.

## F6. Headlines in mixed sizes, checked on phones

*Decided by:* component-builder. *Done by:* a skill, the engine (not built yet, see the wish-list). *Status:* Approved.

**The rule.**

In a "mixed-size" headline, the most important words are set much bigger than the rest, so the headline reads by emphasis. For example, in "The year we **stopped** flying", "stopped" might be three times bigger.

Big size differences look striking on wide screens but cause trouble on phones: the big word may not fit on the line, break in the middle, or overlap the line above. So on phones the difference in size is reduced, enough that no word breaks or overflows.

**Example.** On a laptop, the key word is 3 times the size of the other words. On a tablet, 2.4 times. On a phone, 1.8 times, so "stopped" still fits on one line.

**Decide from the content.** Use mixed sizes only when the headline has clear key words that deserve emphasis, and only in middle and expressive profiles. Restrained profiles set headlines in one size.

**On each screen.**

- Laptops and wide screens (1024 px and up): Key words about 3 times the size of the rest.
- Tablets (640 to 1023 px): About 2.4 times.
- Phones (under 640 px): About 1.8 times; no word breaks.

**In Wocument today.** The engine can already set words in a headline at different sizes (styled spans) and fit a line to the width (`fit=width`). But on narrow screens the bigger words overlap the line above and break in the middle of a word. That is an engine gap. Web guidance: browsers now offer a way to fit each line to its width, with a maximum scale as a safety limit.
