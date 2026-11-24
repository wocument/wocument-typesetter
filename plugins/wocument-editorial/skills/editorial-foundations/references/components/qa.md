# Q&A and numbered points

*Rule:* F4. Q&A and numbered points: several designs, one per series. *Built by:* component-builder. *Status:* Changed by the owner (2026-11-24).

## What it is

A Q&A is an interview printed as questions and answers. Readers use it in two ways: some read it from start to end, and many scan the questions first to find the parts they care about. So every design has two jobs. The questions must be easy to find quickly, and the reader must always know who is speaking.

There is no single correct design. A quiet architecture publication and a loud celebrity glossy should not print their interviews the same way, and one publication's design should not be copied into every edition Wocument makes. The design is chosen from the publication's profile and from the interview itself, and then kept for the whole series in that publication, so readers recognise it from one issue to the next.

Numbered points ("7 lessons from a year of building") are a close relative: each point starts with a number and a bold heading that runs straight into its text.

## The five patterns

**1. Question as a second voice.** The question is set in the second voice (a different typeface or colour, see D1) and is the loudest element on the page. A thin line leads the eye down to the answer, which is set in the normal body text. The person's portrait closes the exchange.
- Suits: middle profiles; interviews of medium length with one person.
- Example: the question in red sans-serif, "Why did you leave the city?", a thin line, the answer in the body serif, then a small portrait.

**2. Initials in the margin.** Each turn starts with the speaker's initials in bold, hanging in the margin (for example "MC" for the interviewer and "JR" for the guest). The questions are in bold or italic; the answers are plain text. Nothing else changes from normal body text.
- Suits: restrained and dense profiles (literary weekly, newspaper in a magazine, quiet luxury); long interviews that are read from start to end.
- Example: a 4,000-word interview with an architect runs in two columns; "MC" and "KS" hang in the left margin of each turn.

**3. Questions as headings.** Each question is set large, like a subhead, across the column or across the whole text area. The answer follows in body text. The questions become the structure of the page, so a reader can scan them like a contents list.
- Suits: expressive profiles (loud glossy, zine-glossy, men's magazine); celebrity and personality interviews with few, punchy questions.
- Example: "What scares you?" set at three times the body size, then a short answer.

**4. Conversation.** Each speaker's name is set in small capitals and runs straight into what they say, like a play script. No "Q" and "A".
- Suits: conversations between two or more people, roundtables and panels, where nobody is only the interviewer.
- Example: "MAYA CHEN Let's start with the kitchen. TOM REYES It started as a garage."

**5. Quick-fire.** Short questions and one-line answers, each pair set as a small island (see F5) in a grid. Often with a small portrait at the top.
- Suits: "60 seconds with", questionnaires and recurring short interviews.
- Example: nine islands in a 3 by 3 grid: "First job? Dishwasher." "Last book? A cookbook."

## Decide from the content

1. **How many people speak?** Two or more who are all guests: pattern 4 (conversation). One guest and an interviewer: go on.
2. **How long is it, and how is it read?** Under about 300 words in many short exchanges: pattern 5 (quick-fire). Over about 2,000 words that readers will read from start to end (brief: reading "one sitting"): pattern 2 (initials) or 1 (second voice).
3. **What is the tone?** High energy and a personality-led subject (brief energy 4 or 5, many questions and "you" in the voice measures): pattern 3 (questions as headings). Calm and serious (seriousness or formality 4 or 5): pattern 2.
4. **What is the profile?** The profile's level on the expressiveness dial (E1) breaks any tie: restrained profiles lean to pattern 2, middle ones to pattern 1, expressive ones to pattern 3.
5. **Is there a series already?** If the publication has already printed an interview in a pattern, use the same pattern for every interview in the series. Change it only when the interview's form forces it (a roundtable inside a series of one-to-one interviews).

Record the chosen pattern and the reason in the direction, so the next interview in the series uses the same one.

## On each screen

- Laptops and wide screens (1024 px and up): as the chosen pattern; questions may sit beside the answers in pattern 1, and quick-fire islands sit 3 to 4 per row.
- Tablets (640 to 1023 px): the same, with quick-fire islands 2 per row.
- Phones (under 640 px): one column: question, answer, then the portrait. Initials and names keep the second voice; hanging initials move inline at the start of the turn; quick-fire islands sit one per row.

## In Wocument today

The engine has no list command yet (lists are postponed, spec §01.3), so questions, answers and numbered points are typed as text. Speaker names, initials and run-in headings are styled spans (`\span[style=…]`); questions as headings use `\subhead` with a named style; a quick-fire grid is a `\group` of small items; the portrait is a `\figure`. Hanging initials into the margin need the margin to be part of the grid (see D2).

## Reference examples (only on the owner's computer)

The study has no separate folder for Q&A. If `${CLAUDE_PLUGIN_ROOT}/sources/corpus-index.json` exists, interviews can be found among `components` → `spreads` and `pull-quotes` for the chosen profile. Never copy a layout, never quote their text, never ship the pictures.
