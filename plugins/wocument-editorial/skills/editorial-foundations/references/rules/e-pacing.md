# E. Pacing and direction

Decisions about a whole story or a whole edition rather than a single screen: how loud the design is, the order of stories, where the reader gets a break, and how text and pictures alternate. These are the most content-dependent rules of all.

Each rule reads: **the rule**, an **example**, **decide from the content** (what in the content brief changes it), **on each screen**, **in Wocument today**, and its **status** from the owner's review.

## E1. Expressiveness is one dial

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Approved.

**The rule.**

Every publication has a personality somewhere between two extremes. We call this one "dial" expressiveness.

At the **restrained** end: text comes first, headlines are small, there are few drop caps, pictures are rectangles, and one grid is used consistently everywhere. Think of a literary weekly.

At the **expressive** end: big display type, big loud pictures, cut-outs, objects breaking the grid, bright colour. Think of a fashion or celebrity glossy.

The art direction skill sets the dial first, based on who the readers are and what the subject is, and only then picks a profile (a specific publication style). Once set, the dial stays in the same position for the whole publication, so it feels like one voice.

**Example.** A report on climate policy for experts: restrained, near the low end. A young lifestyle magazine about relationships: expressive, near the high end. A business magazine with profiles: the middle.

**Decide from the content.** The content sets the dial. Read the brief's reader and subject first, then the tone scales: high energy and high visual pull move the dial toward expressive; high seriousness and high formality move it toward restrained. Then check how the text is written with `scripts/voice.mjs --compare`: a lot of "I" and "you", questions and contractions sit near the expressive profiles; long sentences, hard words and almost no "I" sit near the restrained ones. The voice measures are a check, not the decision: a writer's voice is one signal among subject, reader and tone.

**On each screen.**

- Laptops and wide screens (1024 px and up): As set by the dial.
- Tablets (640 to 1023 px): As set by the dial.
- Phones (under 640 px): Keeps its voice and colour, but drops most overlaps.

**In Wocument today.** This is a rule for the skill. Each profile in the foundations records its level on the dial.

## E2. Breaks go between stories, never inside one

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Approved.

**The rule.**

Things that interrupt reading (ads, house announcements, short news items) go between stories, never in the middle of one.

A long story runs without interruption from its opening to its last line. Short items are where the breaks happen.

**Example.** An issue's order is: long feature, then an ad, then two short items, then the next long feature. Not: half the long feature, an ad, then the second half.

**Decide from the content.** Applies only to editions and multi-article pages. The content decides what counts as a "long story": any piece the brief reads as one sitting.

**On each screen.**

- Laptops and wide screens (1024 px and up): Set by the order of the scenes.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Same.

**In Wocument today.** This is a rule for the skill. It decides the order of the scenes and articles in the edition.

## E3. Front matter looks different from the main story

*Decided by:* editorial-art-direction. *Done by:* a skill, the theme. *Status:* Approved.

**The rule.**

"Front matter" means the pages before the main stories start: the contents, the editor's letter, contributors, short department pages.

These pages should look different from the main stories, so the reader can see that the main content has not started yet. They can use a different background colour, a different template or a different density.

**Example.** The contents and the editor's letter sit on a soft pink background. The first feature starts on white, with a large opening photo. The change of colour tells the reader "now the main part begins".

**Decide from the content.** Applies only when an edition has pages before the main stories. How different they look comes from the dial: a restrained publication changes only the ground colour, an expressive one may change grid and type as well.

**On each screen.**

- Laptops and wide screens (1024 px and up): Their own palette and grid.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): The palette alone carries the difference.

**In Wocument today.** This is a rule for the skill. It can use a separate colour palette or a separate grid for those scenes.

## E4. In text-led stories, type sets the pace

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Approved.

**The rule.**

In a story with few or no pictures, something else has to give the reader's eye places to rest and points of interest. That job falls to the type itself. We call these "type events":

- a **drop cap**: a large first letter that marks the start;
- **subheads**: short headings that divide the story into parts;
- a **pull quote**: a striking sentence from the story, repeated in large type at a turning point;
- a **wider intro**: the first paragraph set larger or wider than the rest.

These are planned like pictures would be: placed on purpose where the story changes direction, not sprinkled at random to fill space.

**Example.** A 2,000-word essay with no photos: it starts with a 4-line red drop cap. After the second paragraph, where the argument turns, a pull quote in large italics spans both columns. Later a subhead, "Morning", marks a change of scene.

**Decide from the content.** Applies to text-led stories (brief visual pull 1 or 2). The number of type events comes from the structure: roughly one per turning point the brief lists, not one per screen. Pull quotes come only from the brief's quotable lines, word for word. Subheads come from real changes of scene or topic. Never invent a type event to fill space.

**On each screen.**

- Laptops and wide screens (1024 px and up): The pull quote spans 2 columns; the drop cap is 5 to 6 lines tall.
- Tablets (640 to 1023 px): The pull quote spans the full width of the text.
- Phones (under 640 px): The pull quote is full width; the drop cap is 3 lines tall at most.

**In Wocument today.** This is a rule for the skill. It uses the engine's pull quote (`\pullquote`), drop cap (`\dropcap`) and subhead (`\subhead`) commands.

## E5. A picture breather after two text screens

*Decided by:* editorial-art-direction. *Done by:* a skill, the engine (built). *Status:* Approved. The owner asked that the content decides how it applies (2026-11-24).

**The rule.**

In a story that relies on pictures, long runs of text get tiring. This rule says: after two screens (or spreads) full of text, give the reader a "breather": a screen with only a picture.

Each picture is attached to the paragraph it belongs to. It may move forward or back by up to one screen, so it lands where the breather is needed without drifting far from its context.

**Example.** A travel story: opening photo, two screens of text, a full-screen landscape, two more screens of text, a full-screen portrait, the end.

**Decide from the content.** Place a picture breather only when all three are true. **The picture exists**: count the pictures you actually have; never place a placeholder or a stock picture just to fill the slot. **It belongs here**: the picture shows something named or implied in the paragraphs around it (the brief lists these under "Pictures named or implied"). **The tone wants pauses**: restful, visual pieces (visual pull 3 or more) want breathers often; a quiet literary piece may run three or four screens of text. When no picture fits, use a type event (E4) or plain white space instead.

**On each screen.**

- Laptops and wide screens (1024 px and up): A picture scene between text scenes.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): A full-screen picture between runs of text.

**In Wocument today.** This is mostly a rule for the skill. The engine already lets "floating" pictures move by up to one screen to find a good place.

## E6. One quote on a full-bleed photo

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Approved.

**The rule.**

Sometimes a person in a story says something so strong that it deserves a whole screen. This rule lets that one sentence sit alone on a full-bleed photograph, placed in the picture's calm area (its quiet zone, see C2).

On wide screens the sentence may even be split in two: the first half in one corner and the second half in the opposite corner, so the eye travels across the picture.

On phones, the quote moves off the photo, above or below it. A long sentence over a small phone photo would cover the picture and be hard to read.

**Example.** A profile of an architect: a full-screen photo of her studio at dusk. Top left: "I wanted a room". Bottom right: "that keeps the morning." On a phone, the photo is shown clean and the whole sentence sits under it.

**Decide from the content.** Use this only when the brief lists a strong quotable line from the subject and there is a full-bleed photograph with a quiet zone for it. Middle and expressive profiles only.

**On each screen.**

- Laptops and wide screens (1024 px and up): The quote is split: first half top left, second half bottom right.
- Tablets (640 to 1023 px): The whole quote sits in the quiet area.
- Phones (under 640 px): The quote sits below the photo.

**In Wocument today.** This is a rule for the skill. It uses a scene with a background picture and a pull quote placed over it (`\pullquote[layer=overlay]`). Today, though, the engine keeps the quote over the picture on phones too.

## E7. A package gets its own kit on the house grid

*Decided by:* editorial-art-direction. *Done by:* a skill, the theme. *Status:* Approved. The owner asked that the content decides how it applies (2026-11-24).

**The rule.**

A "package" is a group of related stories, for example a themed section about water inside a design magazine. A package may get its own "kit": its own section label, ornaments, headline type and background colour, so it feels special.

But the basics stay the same as the rest of the publication: the grid and the body text styles. That way the package feels like a special part of the same publication, not like a different magazine stapled inside.

**Example.** A "Water" package uses a pill-shaped label, a pale lilac background and a heavy sans-serif headline. Its stories still use the house's body font, size and two-column grid.

**Decide from the content.** A package gets a kit only when the content really is a group of related stories with a theme of its own. The kit's flavour (label, colour, display type) comes from the package's subject and tone. How far it moves away from the house style comes from the dial: a restrained publication changes only the label and one colour; an expressive one may change display type and ground too. The body grid and text styles never change.

**On each screen.**

- Laptops and wide screens (1024 px and up): The kit, on the house grid.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Same.

**In Wocument today.** This is built. Each article can have its own theme (`\article` with a theme) on top of the document's theme, which keeps the grid and body styles.

## E8. Density is a setting

*Decided by:* publication-system. *Done by:* the theme, a skill. *Status:* Approved.

**The rule.**

"Density" is how much text and how little white space a publication uses. Every publication picks its density once: dense for expert readers who want a lot of information, airy for readers who skim.

When a story has more text than planned, it is made to fit without changing the grid. The allowed ways are: remove the space between paragraphs, let text wrap around the outline of pictures, or use fewer but wider columns. Never squeeze the columns or change the margins just for one story.

**Example.** A business weekly is dense: three tight columns, no paragraph gaps, small pictures. A lifestyle monthly is airy: one wide column, generous space between paragraphs, big margins.

**Decide from the content.** The reader sets the density. Readers who study (experts, professionals; brief density 4 or 5, reading "one sitting, study") get dense pages. Readers who skim (brief "scan") get airy pages. Choose it once per publication.

**On each screen.**

- Laptops and wide screens (1024 px and up): The profile's density.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): One column; space between paragraphs may come back.

**In Wocument today.** This is set by theme values: the space after paragraphs (`space-after`) and the number of columns. Fitting heavy copy uses wrap and columns, never a change of grid.

## E9. Article type sets the tempo

*Decided by:* editorial-art-direction. *Done by:* a skill, the theme. *Status:* Approved.

**The rule.**

The type of article decides its tempo (how fast or slow it feels to read), and the layout follows:

- **Intimate profiles** (one person's story): 2 wide columns. Wide lines read slowly and feel like a conversation.
- **Reporting and service pieces** (news, how-to, guides): 3 narrower columns. Shorter lines read faster and feel urgent and dense.
- **Visual pieces** ("visual wells"): pictures take 70 to 100% of the space; the little text there is goes in quiet zones of the pictures or in a side rail.

**Example.** A long interview with a chef: 2 wide columns. A guide to the ten best bakeries: 3 narrow columns. A photo story about a coastline: full-screen photos with a line or two of text each.

**Decide from the content.** This rule is decided by the genre in the brief. A profile or personal story: 2 wide columns, slow. Reporting, news and service: up to 4 narrower columns (see B3), fast. A visual piece: pictures take 70 to 100 per cent of the space.

**On each screen.**

- Laptops and wide screens (1024 px and up): As listed above.
- Tablets (640 to 1023 px): Profiles 1 to 2 columns, reporting 2 columns.
- Phones (under 640 px): 1 column for every type; a visual piece keeps its pictures first.

**In Wocument today.** This is a rule for the skill. The maximum number of columns is a theme value.

## E10. Short pieces use templates; features get their own opener

*Decided by:* publication-system. *Done by:* a skill, the theme. *Status:* Approved.

**The rule.**

Short pieces that come back in every issue (a news item, a product of the month, a short review) use fixed templates: the same layout every time, so readers recognise them and they are quick to produce.

Long features are different: each one gets an opening designed specially for it. But after the opening, every feature uses the same body grid and body text styles. That keeps the publication feeling like one publication, even when the openings are all different.

**Example.** "Object of the month" always has a square photo on the left and 120 words on the right. The cover story opens with a full-screen portrait and a huge title, while a travel feature opens with a map, but after their openings, both use the same 2-column body text.

**Decide from the content.** Applies to publications with recurring pieces. Each recurring piece gets a template; each feature gets its own opener, designed from that feature's own brief.

**On each screen.**

- Laptops and wide screens (1024 px and up): Same rule on wide screens.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Openings are redesigned for phones; templates keep their own phone values.

**In Wocument today.** The Wocument language has no "templates" or macros. So in practice a template is a documented snippet of Wocument code plus named styles in the theme, maintained by the publication-system skill.
