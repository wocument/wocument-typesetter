# editorial-foundations

Shared knowledge for the editorial skills. Not a command: it makes no decisions and writes no
output. Every editorial skill reads it through `${CLAUDE_PLUGIN_ROOT}/skills/editorial-foundations/`.

**Start with `references/reading-the-content.md`.** The rules are not the same for every article:
each skill works out the tone, the theme and the voice of the piece and decides from that.

| File | Holds |
|---|---|
| `references/reading-the-content.md` | How a skill turns the content brief into decisions: what to read, the order of decisions, what wins when signals disagree, how to record each decision |
| `references/rules/a-constants.md` to `g-web-hygiene.md` | 53 approved rules in seven groups (A constants, B geometry, C pictures, D second voices, E pacing, F components, G web hygiene). Each has the rule, an example, **decide from the content**, its behaviour on each screen size, what Wocument does today, and its approval status |
| `references/components/` | One guide per recurring component (contents, contributors, editor's letter, feature opener, fact box, photo essay, closing page, Q&A): the parts, how they relate, how to decide from the content, and each screen size |
| `references/profiles.md` | 18 aesthetic profiles, ordered by expressiveness, each with its measured writing voice |
| `references/voice-fingerprints.json` | How each profile writes, as numbers, for `scripts/voice.mjs --compare` |
| `references/engine-wishlist.md` | What the rules ask for that the engine cannot do yet, with workarounds |
| `scripts/voice.mjs` | Measures how a text is written (sentence length, person, questions, quotes, numbers, spelling…) and ranks the closest profiles. Node, no dependencies |

Rule codes (A1 to H7) are stable identifiers for the approval log; they carry no meaning. The
rules come from the owner's review of the foundations playbook on 2026-11-24.

## Reference examples (only on the owner's computer)

`${CLAUDE_PLUGIN_ROOT}/sources/` holds the private study material and never leaves the owner's
computer. When `sources/corpus-index.json` exists, a skill may look up 2 or 3 example spreads for a
component and profile (`components` → component → entries with that `profile`, or `by_profile`).
It looks, then designs in our own system: it never copies a layout, quotes the text or ships the
pictures. When the index does not exist (on any other computer), the skill skips this step.
`sources/_tools/build_index.mjs` rebuilds the index and the voice fingerprints.

Everything in this folder is written in our own words. The study material and its evidence stay
outside the repository.
