# C. Pictures

How pictures behave on screens: which picture leads, how cut-outs and text work together, how pictures are cropped for different screens, and where text can sit on a picture. Most picture rules depend on the pictures you actually have, so each one says what to check first.

Each rule reads: **the rule**, an **example**, **decide from the content** (what in the content brief changes it), **on each screen**, **in Wocument today**, and its **status** from the owner's review.

## C1. One picture bleeds and leads

*Decided by:* image-art-direction. *Done by:* a skill, the engine (built). *Status:* Approved. The owner asked that the content decides how it applies (2026-11-24).

**The rule.**

A picture "bleeds" when it runs right off the edge of the page or screen, with no white margin around it. A bleeding picture feels big and important, as if it continues beyond what you can see.

When a spread has 2 to 4 pictures, only one of them should bleed. The others stay inside the margins. That way the reader immediately sees which picture is the lead (the main one) and which ones support it.

If every picture bleeds, none of them stands out, and the page looks crowded and loud.

**Example.** A story about a house has three photos: the living room, a chair and the garden. The living room photo bleeds off the left edge of the screen. The chair and the garden sit inside the margins, smaller, next to the text. The reader understands at once that the living room is the main picture.

**Decide from the content.** Use this rule only when all three are true: the story is picture-led (brief visual pull 4 or 5); a scene holds 2 to 4 pictures; and one picture is clearly the lead (it shows the subject the text names, or the strongest moment in the structure). When the pictures are equals (a series, a sequence, a grid of products), no single one bleeds: use a sequence (C8) or a photo essay (H6). When the story is text-led, or the pictures are small or low resolution, nothing bleeds. The profile sets how bold the bleed is: an expressive profile may bleed on both sides, a restrained one bleeds on one edge.

**On each screen.**

- Laptops and wide screens (1024 px and up): The lead picture runs off the edge of the scene; the others keep the margins.
- Tablets (640 to 1023 px): Same as wide screens.
- Phones (under 640 px): The lead picture goes edge to edge; the others are the width of the text column.

**In Wocument today.** The engine already supports bleeding: a picture can be given `bleed=left`, `bleed=right` or `bleed=both`. Which picture should bleed is a decision for the image direction skill, not the engine.

## C2. Type on a picture sits in its quiet zone

*Decided by:* image-art-direction. *Done by:* a skill, the picture plan, the engine (not built yet, see the wish-list). *Status:* Approved.

**The rule.**

Sometimes the title is placed directly on a photograph. That only looks good when it sits on a calm, plain part of the picture (the sky, a wall, an empty floor). We call that part the "quiet zone".

When a picture is cropped differently for different screens, the quiet zone can be cut off, and the title ends up over a face or a busy pattern where it is hard to read. Designers then rescue it with a dark box or a shadow behind the text, which looks cheap.

This rule says: the image skill notes where each picture's quiet zone is, and every crop (phone, tablet, wide) keeps that zone in view. Then the title can sit there cleanly with no box, tint or shadow.

**Example.** A landscape photo has a calm sky across its top third. The image plan records "quiet zone: top third". On a phone, the picture is cropped to a tall shape, and the crop keeps the sky, so the title still sits on plain sky rather than on the trees.

**Decide from the content.** Whether type sits on a picture at all depends on the pictures you have. If a picture has a calm, empty area where the title can sit, use it. If no picture has one, set the type beside the picture instead. Never add a box, tint or shadow to rescue type on a busy picture.

**On each screen.**

- Laptops and wide screens (1024 px and up): The title sits in the picture's quiet zone.
- Tablets (640 to 1023 px): The crop keeps the quiet zone visible.
- Phones (under 640 px): The crop keeps the quiet zone, or the title moves below the picture.

**In Wocument today.** The engine already has `focus`: it keeps one chosen point of a picture in view at every width. But it has no idea of a quiet zone. Nothing stops a crop from putting the title on a busy area. A quiet-zone field for the engine to respect is an engine gap.

## C3. On a phone, the opener is a cover

*Decided by:* image-art-direction. *Done by:* a skill. *Status:* Approved.

**The rule.**

When a feature story starts on a phone, the first screen should feel like a small magazine cover: the opening picture fills most of the screen, and the title sits in the picture's quiet zone (see C2). The text of the story starts on the second screen, when the reader scrolls.

The common web habit is the opposite: a thin wide picture strip at the top (16:9) with the title and three lines of text squeezed under it. That throws away the story's best moment, its first impression.

**Example.** A story opens with a portrait of an architect. On an iPhone, the portrait fills the screen, with the title "The quiet house" set over the plain wall behind her. When you scroll, the first paragraph begins with a drop cap.

**Decide from the content.** The phone opener is a cover only when the lead picture is strong and has a quiet zone for the title. A text-led story (visual pull 1 or 2) opens on a phone with the headline and deck first, and a smaller picture after them.

**On each screen.**

- Laptops and wide screens (1024 px and up): The picture takes about 60% of the screen, beside the title.
- Tablets (640 to 1023 px): The picture is full width, with the title over it.
- Phones (under 640 px): The picture fills the first screen; the text starts on the second screen.

**In Wocument today.** This is a rule for the skill. The engine already has what it needs: a scene with `height=screen` fills the first screen on every device, including phones.

## C4. Cut-out wrap steps down as the column narrows

*Decided by:* image-art-direction. *Done by:* the engine (built), the engine (not built yet, see the wish-list), a skill. *Status:* Approved. The owner asked that the content decides how it applies (2026-11-24).

**The rule.**

A "cut-out" is a picture with its background removed: just the object or person, with no rectangle around it. Text can then flow along the object's outline (its "contour"), which looks elegant on a wide column.

But as the column gets narrower, the space beside the object gets too small for real lines of text. You end up with lines of just one or two words, which look broken. So the wrap has to change step by step as the column narrows:

1. On wide columns, text follows the outline.
2. When the space beside the object falls below about 22 to 26 characters, no text is placed there.
3. When most of the lines beside the object would fail, it is treated as a simple rectangle instead.
4. On a phone, the object becomes a centred picture between two paragraphs, or a small accent at the edge of the screen.

**Example.** A cut-out vase sits in a 60-character column. On a laptop, the lines curve around the vase. On a tablet, the space next to the vase's narrow neck is only 10 characters wide, so no text is set there and the lines just skip past the neck. On a phone, the vase sits in the middle of the screen between two paragraphs, at about 60% of the width.

**Decide from the content.** Use a cut-out with an outline wrap only when the object itself matters to the story: a product, a tool, a person whose shape is the subject. A clean cut-out file must exist; never trace a busy photo. Restrained profiles keep a rectangular wrap even around cut-outs. When the cut-out is used, the step-down follows the column width: outline wrap on wide columns, then a box wrap, then the object alone between paragraphs on phones.

**On each screen.**

- Laptops and wide screens (1024 px and up): Text follows the outline.
- Tablets (640 to 1023 px): Text wraps a plain rectangle around the object.
- Phones (under 640 px): The object sits in the centre between paragraphs, about 60% of the screen wide.

**In Wocument today.** The owner approved this rule and asked that the content decides when a cut-out is used (2026-11-24). The engine today:
- `wrap=contour` makes text follow the outline;
- `min-slot` leaves a space empty when it is narrower than 6 em (about 12 characters);
- `wrap=jump` on phones moves the text below the object.

What the engine cannot do yet is step one object down from outline to box to centred on its own (it is on the wish-list). Until then the skill writes the phone values by hand.

## C5. Break the grid once, with an anchor

*Decided by:* editorial-art-direction. *Done by:* a skill. *Status:* Approved.

**The rule.**

"Breaking the grid" means letting one object cross a line it would normally respect: a column edge, the edge of another picture, or the edge of the page. Done once, it gives a page energy and surprise. Done many times, the page looks messy.

It only looks deliberate when four conditions are met:

1. The text columns and at least one rectangular picture stay firmly on the grid, so there is something stable for the break to play against (the "anchor").
2. There is only one big cut-out; any others are smaller and sit beside it.
3. Captions stay on the grid and point to the object with an arrow or a number.
4. The object either runs fully off the edge or sits clearly inside the margin, never just a few pixels short of the edge, which looks like a mistake.

**Example.** A fashion page has a rectangular photo of a street, locked to the grid. A cut-out of a model in a red coat overlaps the top of that photo and runs off the top of the screen. The caption, "1. Coat by …", sits under the photo on the grid, with the number 1 next to the model.

**Decide from the content.** Only in middle to expressive profiles (E1), only one break per scene, and only when the content has a strong object or subject that can carry it. A grave subject (seriousness 5: illness, war, death) rarely suits a playful break; keep the grid there.

**On each screen.**

- Laptops and wide screens (1024 px and up): One cut-out crosses the anchor photo and runs off the top.
- Tablets (640 to 1023 px): A smaller overlap.
- Phones (under 640 px): The cut-out stays inside the column with no overlap, and the caption sits under it.

**In Wocument today.** This is a rule for the skill. All the tools it needs are already in the engine: moving an object off its grid position (`offset-x`, `offset-y`), bleed, and cut-out shapes.

## C6. Hang marks and initials into the margin

*Decided by:* publication-system (theme values). *Done by:* the engine (built), the engine (not built yet, see the wish-list). *Status:* Approved.

**The rule.**

Some characters look as if they are set slightly in from the edge, even when they are exactly aligned. An opening quote mark is the best example: because it is small and high, the line it starts on looks indented.

"Hanging" means pushing such marks a little out into the margin, so that the letters themselves line up and the edge of the text reads as perfectly straight to the eye. A large drop cap (the big first letter of a story) can also push a little into the margin for the same reason.

This only works on wide screens where there is a generous margin. On phones the margin is too small, so nothing hangs.

**Example.** A pull quote starts with “. Without hanging, the quote mark sits on the text edge and the first word looks indented. With hanging, the quote mark sits just outside the edge, and the first letter lines up with the lines below it.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): Quote marks hang outside the edge; a drop cap pushes about 15% of its width into the margin.
- Tablets (640 to 1023 px): Quote marks hang.
- Phones (under 640 px): Nothing hangs.

**In Wocument today.** Part of this is built: `hang=quotes` and `hang=punctuation` already hang quote marks and punctuation. Letting a drop cap or a cut-out push into the margin is not built yet; that is an engine gap.

## C7. Illustrate ideas; photograph people and places

*Decided by:* image-art-direction. *Done by:* a skill. *Status:* Approved.

**The rule.**

Some subjects cannot be photographed because they are not physical things: an idea, a risk, money, a piece of software, a feeling. For those, use an illustration (a drawing or graphic made for the story).

When the subject is a real person or a real place, photograph it. A photo is evidence: it shows that the person or place is real.

The bad middle ground is a generic stock photo, like hands on a keyboard for "cybersecurity". It says nothing and the reader learns to ignore it.

**Example.** A story about inflation uses a commissioned drawing of a shrinking shopping basket. A profile of a carpenter uses a photo of the carpenter in her workshop.

**Decide from the content.** This rule is decided by the content. When the subject is an idea, a risk, money, software or a feeling, illustrate it. When it is a person or a place, photograph it. When a real photograph is evidence that the story needs, use the photograph even for an abstract subject. Pictures the author supplies always come first.

**On each screen.**

- Laptops and wide screens (1024 px and up): Same on every screen.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Same.

**In Wocument today.** This is a rule for the skills. Art direction decides the type of picture (illustration or photo) for each story; image direction then chooses the actual pictures.

## C8. Sequences: contact sheet wide, one-up on phone

*Decided by:* image-art-direction. *Done by:* a skill, the engine (built). *Status:* Approved.

**The rule.**

A "sequence" is a run of related pictures that belong together, for example four frames showing a room at different times of day.

On a wide screen they can sit together as a small grid (a "contact sheet", 2 × 2) or as a pair, so the reader compares them at a glance.

On a phone, a 2 × 2 grid makes each picture tiny. So on a phone the sequence shows one picture at a time, full width, and the reader swipes to the next one.

**Example.** A story shows the same kitchen at 7 am, noon, 5 pm and 10 pm. On a laptop the four photos sit in a 2 × 2 grid beside the text. On an iPhone, the reader sees the 7 am photo full width and swipes for the next.

**Decide from the content.** Use this pattern only when the content has a real sequence: steps in order, a before and after, moments in time, or a set of objects meant to be compared.

**On each screen.**

- Laptops and wide screens (1024 px and up): A 2 × 2 grid beside the text.
- Tablets (640 to 1023 px): A 2 × 2 grid at full width.
- Phones (under 640 px): One picture at a time, swiped.

**In Wocument today.** The engine has a gallery command (`\gallery`). Its phone behaviour still needs to be checked against this rule.

## C9. Pictures keep their size against the text

*Decided by:* the engine. *Done by:* the engine (built). *Status:* Approved.

**The rule.**

How big should a picture be? This rule says: size it in relation to the body text, as print does, not as a percentage of the screen.

If a picture is "70% of the screen", it is fine on a laptop but becomes enormous on a 4K monitor, much bigger than anything around it. If it is sized against the text (for example "as wide as 26 lines of text are long"), it keeps the same relationship to the story on every screen. On a big screen the extra space goes to the margins (see B2).

**Example.** A picture is set to the width of the text column. On a 1280 px laptop it is about 600 px wide. On a 3840 px monitor it is still about 600 px wide, not 2700 px.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): The same size as in print, with a maximum.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): The width of the column.

**In Wocument today.** The engine already does this. Picture sizes such as `size=wide` and `size=column` are measured in "ems" of the body text (an em is the size of the body font), so they are tied to the text, not to the screen.
