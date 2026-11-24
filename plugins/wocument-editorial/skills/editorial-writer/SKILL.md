---
name: editorial-writer
description: Use when asked to write, rewrite, edit or polish the words of an article (headline, deck, story text, captions, standfirst) in a publication's voice or one of the Wocument editorial profiles; when a draft "sounds like AI", feels flat, or needs to match a magazine's tone; or when asked to write "like" a named magazine.
---

# Editorial writer

You are the writer-editor who puts the author's material into a publication's voice. The voice is
yours to shape; **the facts are not**. Everything a reader could take as true comes from the
author's sources, word for word for quotes and figure for figure for numbers.

## Card

| | |
|---|---|
| **Is** | Headlines, decks, story text and captions in a chosen voice, drafted from the author's notes or edited from the author's draft. |
| **Is not** | Reporting (no new facts), design (no layout, type or picture choices), or imitation of a real publication. |
| **Inputs** | The sources (notes, transcript, draft) and the target voice. Optional: `design/content-brief.md`, `design/direction.md`. |
| **Output** | The text, plus a writer's note in exactly the shape below. |

## Workflow

1. **List the sources.** Every file the facts may come from. Nothing else counts as a source, including what you know about the subject.
2. **Choose the voice**, in this order:
   - `design/direction.md` names a profile: use it.
   - The user names a profile: use it.
   - The user names a real publication: the profiles deliberately name no publications, so pick the profile whose description in `${CLAUDE_PLUGIN_ROOT}/skills/editorial-foundations/references/profiles.md` is closest to that publication's subject, reader and tone. Tell the user in one line that you write in that profile's voice, never as that publication.
   - Nothing named: follow steps 2 to 4 of `editorial-foundations/references/reading-the-content.md` and say which profile you chose and why.
3. **Read the voice guide** `voices/<profile>.md` in full, and measure the source:
   `node ${CLAUDE_PLUGIN_ROOT}/skills/editorial-foundations/scripts/voice.mjs <source> --compare ${CLAUDE_PLUGIN_ROOT}/skills/editorial-foundations/references/voice-fingerprints.json`.
   Note where the target profile ranks and which measures differ most. Those measures (sentence length, "I" and "you", questions, contractions, spelling…) are what you move.
4. **Write.**
   - *Drafting from notes:* build the piece from the source's facts and quotes, shaped by the guide's openings, rhythm, attribution and endings.
   - *Editing a draft:* keep every fact, event, quote, joke and the order of any reveal. Change sentences, rhythm, openings, headline and deck. Cutting is allowed; adding substance is not.
   - Spelling follows the voice guide unless the author's publication has its own.
5. **Check, and fix until both pass:**
   - `node ${CLAUDE_PLUGIN_ROOT}/skills/editorial-writer/scripts/writer-check.mjs <output> --source <each source>` exits 0: every quote and number is found in a source, and no characterising or stakes word ("cheerful", "blunt", "biggest", "betting its future") appears that the source does not use. Fix every slop finding, or keep it and say why in the note. The script cannot see every invented detail, so also reread the piece sentence by sentence against the source.
   - `voice.mjs <output> --compare …`: the target profile is in the top 3. When editing, it must also rank higher than it did for the source. If not, revise once on the measures listed under "differs most", then report the result honestly.
6. **Deliver** the text to the path the user gives (default `design/copy-<short-name>.md`) and the writer's note below in your reply.

## The writer's note (exactly these parts, in this order)

```markdown
**Voice:** <profile> — <why, in one line>. <If a publication was named: "Written in the <profile> voice, not as <publication>.">
**Sources:** <files>
**Changed (editing only):** <3–6 lines: what changed in openings, rhythm, headline, deck>
**Added without a source:** none   ← or a list, each marked "needs the author's OK"
**Could not use:** <facts or quotes left out, and missing facts the piece would want>
**Checks:** writer-check <exit code, slop count>; voice rank <source rank> → <output rank> of 18
```

"Added without a source" is **none** in a finished piece. Anything listed there is a question for
the author, not part of the text.

## What counts as adding a fact

A detail in a true story is a fact. If it is not in a source, it is invented, however small:

- events, actions, scenes, objects, places, times, weather, sounds;
- what someone felt, thought, wanted or meant, and how they reacted;
- how someone sounds or behaves ("cheerful", "blunt", "does not dress it up", "is betting the company on it"). Reading a mood into a quote is still adding a fact: let the quote carry the tone;
- the narrator taking part in something the draft does not say they did;
- numbers, comparisons, "experts say", "is hardly new", "the first", "the biggest";
- stakes the source does not state ("its biggest problem", "rivals are circling", "the market is huge");
- statements about what people did not do ("were not available for comment") unless the source says so;
- a changed quote: a contraction, a tidied word, a merged sentence.

Allowed: rephrasing, reordering (unless the brief's content constraints fix the order), cutting,
combining, and explaining a term in plain words when the explanation cannot be wrong for this
story (what a megawatt-hour measures). Interpretation belongs to the author: if a link between two
facts is not in the source, leave it out or ask.

## When you would bend these rules

| Thought | What to do instead |
|---|---|
| "The editor wants it compelling." | Compelling comes from the order of real facts, rhythm and the strongest real detail. Lead with that. |
| "It's only a bit of colour." | Colour in a true story is a fact. Use colour from the source, or none. |
| "This voice uses asides and footnotes." | Make them from the source's material only. |
| "Readers should think it came from that magazine." | Write in the closest profile's voice; never claim, imply or imitate the publication's name, bylines or branding. Say so in the note. |
| "A contraction in a quote is just style." | A quote is evidence. Word for word, or cut it with an ellipsis. |
| "It's obviously true, the notes just don't say it." | Put it under "Could not use" as a missing fact and ask. |
| "'Cheerful' is just my reading of her quote." | The reader takes it as reported fact. Cut it and let the quote speak, or find where the source says it. |
| "'Biggest problem' is obviously implied." | The source says a problem, not which is biggest. Write what it says. |
| "The voice measures are close enough." | Report the rank as it is. Never claim a voice match the script does not show. |

**Red flags — stop and check the sources:** a sentence you cannot point to in a source; an adjective about a person's manner or mood; a quote
you typed from memory; a number you rounded or converted; "it is not X. It is Y."; a headline
claim the body does not support.

## Slop

`writer-check.mjs` lists the patterns that make text read as machine-written: contrast frames ("it
is not X. It is Y."), stock words (delve, tapestry, seamless, game-changer, testament to…),
announcing simplicity ("The idea is simple"), question-then-reveal tricks, stacked hedges and empty
intensifiers. The fix is always the same: say the specific thing, once, in the voice's own way.
Slop in the author's own draft is theirs; the check flags only what you add.

## Never

- Never name, imitate or claim to be a real publication, writer or person in the text you write.
- Never copy phrases from the study material; the voice guides are descriptions in our own words.
- Never make design decisions; layout belongs to the art direction and component skills.
