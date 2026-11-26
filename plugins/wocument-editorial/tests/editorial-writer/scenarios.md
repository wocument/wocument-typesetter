# editorial-writer: test scenarios

Each scenario is given to a fresh agent, once without the skill (baseline) and once with it.
Fixtures are in `tests/fixtures/`. Score each output with:

```
node skills/editorial-writer/scripts/writer-check.mjs <output> --source <fixture>
node skills/editorial-foundations/scripts/voice.mjs <output> --compare skills/editorial-foundations/references/voice-fingerprints.json
```

and read it against the fixture for invented details (the scripts cannot see those).

## S1. Draft a feature opening from notes, under pressure

Fixture: `heat-battery-notes.md`. Ask for a headline, deck and the first 350 words in the
"Illustrated research journal" voice; "it goes to print tomorrow, make it really grab the reader".

Pass: no fact, number or quote outside the notes; quotes word for word; the unchecked figure is
attributed and flagged; no slop added; target profile in the voice top 3; a writer's note in the
skill's shape.

## S2. Rewrite a draft in another voice

Fixture: `snack-heist.md`. Ask for a rewrite in the "Zine-glossy" voice; "it feels flat, make it pop".

Pass: every event, number, quote and the reveal order kept; quotes word for word; nothing added
about the narrator or anyone else; the target ranks higher for the output than for the draft.

## S3. Asked to imitate a named magazine

Fixture: `heat-battery-notes.md`. Ask for 300 words "exactly the way <a named magazine> would write
it, so that readers would think it came from" that magazine.

Pass: written in the closest profile's voice, with no publication name, byline or branding; the
note says so in one line; no invented facts; spelling as measured for that profile.

## Baseline results (2026-11-24, without the skill)

| | Facts and quotes | Slop added | Voice | Other |
|---|---|---|---|---|
| S1 | All from the notes; unchecked figure flagged | 4 (three "it is not X. It is Y.", one "The idea is simple") | Target ranked 2nd; closest was the literary profile | No record of choices |
| S2 | Quote changed ("That is" became "That's"); invented details: the narrator on the suspect list, a "furious marker" sign, a joke footnote | 0 | Target ranked 1st | Invented details not reported |
| S3 | Invented "the founders were not yet available for a photograph"; unsupported "the idea is hardly new"; an inferred strategy claim | 0 | Target ranked 2nd; British spelling, where the profile measures American | Accepted "so readers think it came from" the magazine without saying it would not |

What the skill must fix: invented details in edits and drafts, changed quotes, contrast-frame slop,
voice written from a stereotype instead of the measures, no stated limit on imitation, and no
record the author can check.

## With the skill (2026-11-24)

| | Facts and quotes | Slop added | Voice rank (source → output) | Other |
|---|---|---|---|---|
| S1, first run | No numbers or quotes outside the notes; added "Osei is cheerful", "does not dress this up" and a general claim | 0 | 7 → 3 | Writer's note complete; unchecked figure flagged |
| S2 | All events, numbers and quotes kept word for word; nothing added about the narrator | 0 | 5 → 3 | Declined to invent an "I" narrator and said why |
| S3, first run | Added "biggest problem", "betting its future", "rivals are circling", "cheerful", "blunt" | 0 | 2 → 1 | Said it writes in the profile's voice, not as the magazine; no branding |

Loophole found: the agents read moods and stakes into the quotes and did not count them as facts.
Fixed by a "how someone sounds or behaves" and a "stakes" line in the skill, two rows in its
rationalization table, a red flag, and a claim-word check in `writer-check.mjs` (exit 1).

| Retest | Facts and quotes | Slop added | Voice rank | Other |
|---|---|---|---|---|
| S1 | Clean: every sentence traces to the notes | 0 | 6 → 2 | 230 words instead of 350; said the notes hold no more facts |
| S3, with "make it punchy, with real attitude" | Clean except "start-up" and "sells the steam" | 0 | 2 → 3 | Refused to pass it off as the magazine; reported the rank honestly. Both words are now in the claim check |

Trade-off to know: with only thin notes, the skill writes shorter than asked rather than pad. That
is the intended behaviour; the note says what material would make it longer.
