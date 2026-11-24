# A. Constants that hold on every screen

These stay the same on every screen, from a small phone to a 4K monitor. They make reading comfortable: the length of a line, the size of the body text, the spacing. Everything else in the layout changes around them to protect them. Most of them do not change with the content either; where the content does matter, the rule says how.

Each rule reads: **the rule**, an **example**, **decide from the content** (what in the content brief changes it), **on each screen**, **in Wocument today**, and its **status** from the owner's review.

## A1. The reading line is the constant

*Decided by:* publication-system (theme values). *Done by:* the engine (built), the theme. *Status:* Approved.

**The rule.**

The "reading line" is how many letters fit on one line of text, from its left edge to its right edge. Designers call it the *measure*. Readers are most comfortable when a line holds about 45 to 75 characters (letters, spaces and punctuation together), and best of all at about 52 to 66.

If a line is much shorter, the eye has to jump back to the start too often and the text feels choppy. If it is much longer, the eye loses its place when it travels back to find the next line.

This rule says the reading line is the one thing that must **not** change when the screen changes. Everything else adapts to protect it: the number of columns, the size of the margins and the width of the pictures. On a phone you get one column; on a laptop two; on a big monitor perhaps three. But each column is always about the same comfortable width.

**Example.** A magazine page in print holds three columns of about 40 characters each. On a 1920 px monitor, a single column stretched across the whole screen would give lines of about 250 characters, which nobody can read comfortably. Under this rule the monitor shows two or three columns of about 60 characters each, and the extra space goes to wider margins and bigger pictures.

**Decide from the content.** The 45 to 75 character band never changes. Inside the band, the content chooses where to aim. Dense reading for experts (brief: density 4 or 5, formality 4 or 5, long sentences in the voice measures) reads best near 60 to 70 characters. Light, lively reading (energy 4 or 5, many short sentences) reads best near 50 to 60. Captions, fact boxes and side notes use their own shorter band of about 30 to 45 characters. The number of columns is not capped here: the engine's `columns=auto` counts how many 600 px columns fit, so a wider screen gets another column (up to 4, see B3).

**On each screen.**

- Laptops and wide screens (1024 px and up): As many columns as fit at about 600 px each: 2 on most laptops, 3 above about 1480 px, 4 at 1800 px and wider. Each column holds 45 to 75 characters.
- Tablets (640 to 1023 px): 1 or 2 columns, depending on how wide the tablet is.
- Phones (under 640 px): 1 column that fills the screen, minus a small margin on each side.

**In Wocument today.** The engine already works this way, and the owner chose to keep its behaviour (2026-11-24). When a text frame says `columns=auto`, the engine counts how many 600 px columns fit and uses that many: 1 column on phones and tablets, 2 on most laptops (up to about 1480 px), 3 above that, and 4 at 1800 px and wider. A wide screen has room for the same line length in one more column, so it gets one more column. The content can still lower the number (B3).

## A2. Body text keeps its size; display type scales

*Decided by:* publication-system (theme values). *Done by:* the theme. *Status:* Approved.

**The rule.**

On every screen, the main text you read (the "body text") stays the same comfortable size: about 16 to 18 pixels. It does not get smaller on a laptop or bigger on a large monitor.

What changes is the headline. On a phone the headline is only about twice the size of the body text, because a huge headline would push the story off the first screen. On a tablet it is about three times the body size, and on a wide screen four to almost five times. So the bigger the screen, the bigger the contrast between headline and body, which is what gives a magazine page its drama.

There is one safety limit from web accessibility guidance. When a size grows smoothly with the screen, its biggest size should not be more than about 2.5 times its smallest size. Otherwise, a reader who zooms the browser to 200% cannot actually make it twice as large.

**Example.** Body text is 17 px everywhere. The headline is 36 px on a phone (about 2 times the body), 52 px on a tablet (3 times) and 80 px on a 1920 px screen (4.7 times). The headline grows from 36 to 80 px, which is 2.2 times, so it stays inside the 2.5 safety limit.

**Decide from the content.** The body size (16 to 18 px) does not change with the content. The gap between headline and body does: the expressiveness dial (E1) sets it. A restrained publication stays at the low end of each range, an expressive one goes to the high end.

**On each screen.**

- Laptops and wide screens (1024 px and up): The headline is about 4 to 4.8 times the size of the body text.
- Tablets (640 to 1023 px): The headline is about 3 times the size of the body text.
- Phones (under 640 px): The headline is about 2.2 times the size of the body text, and the body text is never smaller than 16 px.

**In Wocument today.** The owner approved this rule (2026-11-24). The engine does not follow it everywhere yet: its "compact" setting (screens 1024 to 1799 px wide, most laptops) shows the whole page at 85% size, body text included, so on a laptop the body is smaller than on a phone. Keeping the body at full size in the compact range is on the engine wish-list. Until then, a theme can set the body a little larger at `@compact` so that it renders at 16 px or more.

## A3. Everything sits on one baseline grid

*Decided by:* publication-system (theme values). *Done by:* the engine (built). *Status:* Approved.

**The rule.**

Imagine the page has invisible ruled lines, like a school notebook, spaced exactly one line of body text apart. That is the "baseline grid". Every line of body text sits on one of those ruled lines, in every column.

Because all columns use the same ruled lines, the lines of text in neighbouring columns line up with each other across the page. That gives a calm, orderly look.

Anything that interrupts the text (a subhead, a pull quote, a picture, a caption) must take up a whole number of those ruled lines. Then the text after it lands back on the grid instead of being slightly out of step.

If a screen has a little height left over, that spare space goes to the bottom of the screen. It is never spread out between paragraphs to make the text "fill" the screen.

**Example.** Body text has a line spacing of 26 px. A subhead is placed in a space of exactly 52 px (2 lines), not 45 px. So the paragraph after the subhead starts on the same ruled line as the text in the column beside it.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): Lines in neighbouring columns line up with each other.
- Tablets (640 to 1023 px): Same as wide screens.
- Phones (under 640 px): There is only one column, but the text still sits on the same baseline grid.

**In Wocument today.** The engine already does this. The setting `snap=baseline` makes every line sit on the baseline grid, and subheads and pull quotes are given space in whole baseline steps.

## A4. Paragraphs: an indent or a space, never stretched gaps

*Decided by:* publication-system (theme values). *Done by:* the engine (built), the theme. *Status:* Approved.

**The rule.**

There are two ways to show that a new paragraph has started: indent the first line a little, or leave an empty gap between paragraphs. Long magazine text uses the indent, with no gap. Some web pages use the gap, with no indent. You choose one or the other, never both.

The second part of the rule: the gap between paragraphs is never stretched to make the text fill a screen or a column exactly. Stretched gaps make the page look loose and uneven, as if something is missing. If a column ends a little short, the spare space stays at the bottom.

**Example.** In a long article, each new paragraph starts 1.5 characters in from the left edge, and the paragraph sits directly under the one before it, with no empty line. On a screen with 3 lines of spare space, those 3 empty lines stay at the bottom of the screen and are not spread out as 3 small gaps between paragraphs.

**Decide from the content.** Each profile chooses indent or space once. The content can tip the choice when a profile allows both. Long continuous reading (an essay, a profile or a report over about 1,500 words, in mostly long paragraphs) reads best with an indent and no gap. A service piece, a how-to or a piece of many short paragraphs that readers scan reads best with a space between paragraphs. Never both at once, and never stretched gaps.

**On each screen.**

- Laptops and wide screens (1024 px and up): An indent at the start of each paragraph and no gap between paragraphs.
- Tablets (640 to 1023 px): Same as wide screens.
- Phones (under 640 px): Same. On very short screens the spare space stays empty at the bottom.

**In Wocument today.** The engine already does this. Indent and paragraph spacing are style values (`indent` and `space-after`), and the layout never stretches spaces to fill a column. The default theme, Vanilla, uses an indent and no gap.

## A5. Column alleys stay close to the line spacing

*Decided by:* publication-system (theme values). *Done by:* the theme, the engine (not built yet, see the wish-list). *Status:* Approved.

**The rule.**

The "alley" (designers also say "gutter") is the empty vertical strip between two columns of text. This rule says that strip should be narrow: about 1 to 1.6 times the line spacing of the body text.

When the alley is too wide, the page stops reading as one story in several columns and starts to look like separate strips of text that have nothing to do with each other.

A wide channel between columns is only right when something lives in it, for example the author's bio or a short note (see D2).

**Example.** The body text has 26 px line spacing. The alley should then be about 26 to 42 px wide, for example 36 px. An alley of 100 px with nothing in it would split the page into two separate strips.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): The alley is about 1.4 times the line spacing.
- Tablets (640 to 1023 px): The alley is about 1.2 times the line spacing.
- Phones (under 640 px): There is only one column, so there is no alley.

**In Wocument today.** This is new. The engine does not check the width of the alley today. A useful addition would be an engine warning when the alley is wider than about 1.8 times the line spacing, so a theme cannot get it wrong by accident.

## A6. No stranded lines, no subhead at a column's foot

*Decided by:* publication-system (theme values). *Done by:* the engine (built). *Status:* Approved.

**The rule.**

This rule is about lines of text that get left alone at the top or the bottom of a column, cut off from the rest of their paragraph. Designers call them widows and orphans:

An **orphan** is the first line of a paragraph left alone at the bottom of a column, with the rest of the paragraph continuing at the top of the next column. A **widow** is the last line of a paragraph that has been pushed alone to the top of the next column. Both look like mistakes and make the reader stumble.

The rule: at least two lines of a paragraph must stay together at the bottom of a column, and at least two at the top of the next one. The engine moves a line across if needed to make that true.

The same idea applies to subheads. A subhead must never be the last thing at the bottom of a column, because then its section starts in the next column and the subhead points at nothing. The subhead always moves along with the first lines of the section it introduces. This is called "keep with next".

**Example.** A paragraph has 7 lines and the column has room for only 1 more line. Without the rule, 1 line sits at the foot of the column and 6 continue in the next column. With the rule, the engine moves that line to the next column too, so all 7 lines start together at the top. And if a subhead "Morning" lands on the very last line of a column, it moves to the top of the next column, together with the paragraph that follows it.

**Decide from the content.** This rule does not change with the content. It protects reading on every screen, so it holds for every article, every profile and every edition.

**On each screen.**

- Laptops and wide screens (1024 px and up): Applies at the top and the foot of every column.
- Tablets (640 to 1023 px): Same as wide screens.
- Phones (under 640 px): Applies at the top and the foot of every screen-sized page.

**In Wocument today.** The engine already does this. In Wocument terms the settings are:
- `widows=2`: the last part of a paragraph at the top of a column must be at least 2 lines;
- `orphans=2`: the first part of a paragraph at the foot of a column must be at least 2 lines;
- `keep-with-next` on subheads: a subhead always stays in the same column as the first lines after it.
These are the defaults, so a writer does not need to set anything.

## A7. Light text on dark gets a little more of everything

*Decided by:* publication-system (theme values). *Done by:* the theme. *Status:* Approved.

**The rule.**

Light text on a dark background looks thinner and more crowded than the same text in dark on light. Our eyes see the bright letters "bleed" into the dark around them, and the shapes become harder to tell apart.

So when a theme sets white or light text on a dark ground, it gives that text a little more of everything: slightly more space between the lines, slightly more space between the letters, and one step heavier weight (for example "medium" instead of "regular"). Then it reads as evenly as normal dark text on a light page.

**Example.** Normal body text is regular weight with 26 px line spacing. On a black page, the same text becomes medium weight with 28 px line spacing and a tiny bit of extra letter spacing (about 1% of the font size).

**Decide from the content.** Whether a story uses light text on a dark ground is an art-direction choice made from the subject and tone (for example a story set at night, about film or music, or a grave subject). Once a dark ground is chosen, the adjustments in this rule are not optional.

**On each screen.**

- Laptops and wide screens (1024 px and up): Same on every screen size.
- Tablets (640 to 1023 px): Same.
- Phones (under 640 px): Same.

**In Wocument today.** This is a new theme rule. The engine can already do everything it needs (weight, line spacing and letter spacing are ordinary style values); a theme just has to set them for its dark scenes.

## A8. Justified and squared on wide screens, ragged on phones

*Decided by:* publication-system (theme values). *Done by:* the theme, the engine (built). *Status:* Approved.

**The rule.**

"Justified" text has a straight edge on both the left and the right, like a printed book. To make that work, the spaces between words are stretched a little on each line. "Ragged right" text has a straight left edge and an uneven right edge, like most web pages and this paragraph.

On a wide column, justified text with hyphenation (breaking long words with a hyphen at the end of a line) looks polished and print-like. The ends of the columns ("feet") also line up on the same line.

On a phone, the column is narrow. To make a narrow line justified, the engine has to stretch the word spaces a lot, and those big spaces line up from one line to the next into ugly white "rivers" running down the text. So on phones the text switches to ragged right, but keeps hyphenation so the right edge does not get too uneven.

**Example.** On a laptop, a long read is set justified, with hyphenation and indents, and both columns end on the same line. On an iPhone (390 px), the same text is set ragged right; a long word such as "internationalisation" can still be broken with a hyphen.

**Decide from the content.** Justified, hyphenated text suits long, continuous reading in restrained and middle profiles. Ragged text suits lively and conversational writing (energy 4 or 5; many contractions and many "you" in the voice measures), short pieces and expressive profiles. On phones the text is always ragged, whatever the content.

**On each screen.**

- Laptops and wide screens (1024 px and up): Justified, hyphenated, with both columns ending on the same line.
- Tablets (640 to 1023 px): Justified only if a line holds about 45 characters or more; otherwise ragged right.
- Phones (under 640 px): Ragged right, with hyphenation still on.

**In Wocument today.** The engine can do all of this already: `align=justify`, a separate value for phones (`align@phone=left`), `hyphenate=true`, indents, and column feet balanced on a section's last page. But the default theme, Vanilla, uses justified text on phones too, so today phones get the uneven word spaces. The fix is one theme value.
