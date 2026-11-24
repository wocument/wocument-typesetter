# G. Web hygiene

Things print never had to worry about but screens do: readers enlarging the text, touch screens with no mouse, phone notches, browser toolbars, picture file sizes. These do not change with the content: they are what makes a page work on the web at all.

Each rule reads: **the rule**, an **example**, **decide from the content** (what in the content brief changes it), **on each screen**, **in Wocument today**, and its **status** from the owner's review.

## G1. Readers can enlarge text and nothing breaks

*Decided by:* every skill checks it; the engine does most of it. *Done by:* the engine (built). *Status:* Approved.

**The rule.**

Many readers enlarge text, either by zooming the browser or by setting a larger text size on their phone. This must always work.

When text gets bigger, columns must reflow (fewer words per line, more lines) and boxes must grow taller. Text must never be cut off because a box has a fixed height.

This is also a legal accessibility requirement in many places (the web accessibility guidelines, WCAG, ask that text can be enlarged to 200% and that pages work at 320 px wide).

**Example.** A reader with poor eyesight sets text to 200%. The fact box beside the story grows taller to hold its bigger text; nothing inside it disappears behind its bottom edge.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): Text reflows.
- Tablets (640 to 1023 px): Text reflows.
- Phones (under 640 px): Text reflows.

**In Wocument today.** This is for the engine and the renderer: no fixed heights on anything that holds text. It needs a check at 200% text size and at 320 px width.

## G2. Nothing depends on hover; touch targets are big enough

*Decided by:* every skill checks it; the engine does most of it. *Done by:* the engine (built). *Status:* Approved.

**The rule.**

Phones and tablets have no mouse, so there is no "hover" (pointing at something without clicking). Anything that only appears on hover is invisible to touch users.

So: everything interactive (gallery arrows, play buttons for audio or video, links) must work by tapping, and must be at least 44 × 44 px so a finger can hit it. Information shown on hover, like a caption appearing over a photo, must also be available without hover.

**Example.** A gallery shows its arrows only when you hover over it. On a phone, nobody can find them. Under this rule, the arrows are always visible and large enough to tap.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): Hover may add something, but never hide anything.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Tap only.

**In Wocument today.** This is a rule for the renderer, for embeds, galleries and other controls.

## G3. Pictures may run under the notch; text never does

*Decided by:* every skill checks it; the engine does most of it. *Done by:* the engine (built). *Status:* Approved.

**The rule.**

Many phones have a notch (a cut-out for the camera) and rounded corners. The part of the screen that is always fully visible is called the "safe area".

Pictures that run edge to edge may go under the notch and corners; losing a sliver of a photo does no harm. But text, captions and buttons must stay inside the safe area, or parts of them are hidden.

**Example.** A full-screen opening photo fills the whole phone, notch included. The title over it starts below the notch, not behind it.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): No change.
- Tablets (640 to 1023 px): No change.
- Phones (under 640 px): Text is moved in by the size of the safe area.

**In Wocument today.** This is a rule for the renderer (it uses the browser's "safe-area insets").

## G4. Test the edges: 320 px, 4K, long words

*Decided by:* every skill checks it; the engine does most of it. *Done by:* a skill, the engine (built). *Status:* Approved.

**The rule.**

Every page must be tested at the extremes, not just on a typical laptop: the narrowest phone (320 px), the widest screen (3840 px), very long words and very long headlines.

On a narrow screen a long word like "internationalisation" may not fit on one line. It must be hyphenated properly or wrapped, never overflow the screen or break without a hyphen. Headlines should also be "balanced", so their lines are of similar length instead of one long line and one lonely word.

**Example.** The headline "The internationalisation of small Portuguese furniture workshops" on a 320 px phone: with balancing and hyphenation it becomes four even lines, and the long word is broken as "internationali-sation".

**Decide from the content.** The edges do not change, but test them with this content: its longest word, its longest headline and its widest table or picture, not with sample text.

**On each screen.**

- Laptops and wide screens (1024 px and up): A balanced headline.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Long words hyphenated or wrapped; nothing overflows.

**In Wocument today.** The publication audit skill will check this. The engine hyphenates and balances body text. Web guidance offers a "balance" setting for headlines and a "pretty" setting for body text. Today, at 320 to 390 px, the engine breaks the long headline word in the middle without a hyphen ("internationalis" / "ation").

## G5. Each screen gets a picture file its size

*Decided by:* every skill checks it; the engine does most of it. *Done by:* the engine (not built yet, see the wish-list). *Status:* Approved.

**The rule.**

A picture file made for a big monitor is large (for example 2400 px wide and several megabytes). A phone does not need that much detail, and downloading it wastes the reader's data and makes the page slow.

So the engine should prepare each picture in a few sizes (small, medium, large) and let the browser pick the right one for the screen.

**Example.** The opening photo exists in 800, 1400 and 2400 px wide versions. A phone downloads the 800 px file (about 30 KB in this demo); a laptop the 1400 px file; a big monitor the 2400 px file (about 250 KB).

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): The large file.
- Tablets (640 to 1023 px): The medium file.
- Phones (under 640 px): The small file.

**In Wocument today.** This is an engine gap. Today the engine serves each picture in one size only.

## G6. Layouts respond to text size, not only to pixels

*Decided by:* every skill checks it; the engine does most of it. *Done by:* the engine (not built yet, see the wish-list), the engine (built). *Status:* Approved.

**The rule.**

This builds on G1. When a reader makes the text bigger, the layout should react exactly as if the screen had become narrower: fewer, wider columns, so each line still holds a comfortable number of characters (see A1).

For that to work, breakpoints and column widths should be measured in "ems" (multiples of the body text size) rather than fixed pixels. Then, when the text gets bigger, the columns automatically get wider and fewer.

**Example.** On a laptop with normal text, the story has 3 columns. A reader sets text to 150%. With this rule the story switches to 2 columns, and each line still holds about 60 characters. Without it, the story stays in 3 columns, and each line now holds only about 35 characters of big text.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): 3 columns at normal text size, fewer at large text size.
- Tablets (640 to 1023 px): 2 columns, then 1.
- Phones (under 640 px): 1 column; larger text still reflows and is never cut off.

**In Wocument today.** This is an engine gap. The engine's breakpoints and column widths are in pixels today. Following the reader's text size needs breakpoints and widths in ems.

## G7. Full-screen scenes use the visible screen height

*Decided by:* every skill checks it; the engine does most of it. *Done by:* the engine (built). *Status:* Approved.

**The rule.**

On phones, the browser's address bar and toolbar slide in and out as you scroll, so the visible height of the screen keeps changing.

A full-screen scene must be sized to the height that is actually visible, not the biggest possible height. Otherwise its bottom part (a caption, the last line of a page) is hidden under the browser's toolbar.

**Example.** An opening scene has its photo credit at the bottom. Sized to the full height, the credit sits behind Safari's toolbar. Sized to the visible height, the credit is always visible.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): No change.
- Tablets (640 to 1023 px): No change.
- Phones (under 640 px): The scene is the visible height; its bottom is always visible.

**In Wocument today.** This needs an engine and renderer check: `height=screen` and page scenes should use the browser's "dynamic viewport height" (dvh), not the largest possible height.
