# Reading the content before deciding

The rules in `rules/` and the guides in `components/` are not the same for every article. The
owner's ruling (2026-11-24): the skills must work out the tone, the theme and the voice of each
piece and decide from that. A rule's default is a starting point; the content decides how the rule
applies, and sometimes whether it applies at all.

Two groups are the exception. **A (constants)** and **G (web hygiene)** protect reading on every
screen, so they hold for every piece. Their "Decide from the content" line says so, or names the
one value the content may move inside the rule (for example, where to aim inside the 45 to 75
character band).

Every other rule has a **Decide from the content** paragraph. It names what to look at in the
content and what each finding changes. This file explains where those findings come from, the
order in which to decide, and how to record the decisions.

## What to read, and what it changes

All of these come from the content brief (`design/content-brief.md`, written by the
content-analysis skill) or from the pictures the author supplied. Section numbers are the brief's.

| Signal | Where it comes from | What it tells you | Rules it moves |
|---|---|---|---|
| Genre | Brief §2 | Profile, essay, report, interview, news, review, how-to… | E9 tempo, B3 columns, D3 author line, F4 Q&A pattern |
| Length and how it is read | Brief §2 and §4 (one sitting, scan, study) | Long continuous reading or quick scanning | A4 indent or space, A8 justified or ragged, E4, E5, E8 |
| Energy (calm to lively) | Brief §3 | How loud and fast the design may be | E1 dial, A8, F4, F6 |
| Seriousness (playful to grave) | Brief §3 | How much play the design can take | E1, C5 grid break, H4 opener |
| Formality and warmth | Brief §3 | Distant and official, or close and personal | B3 (intimate stories: 2 columns at most), H3, F4 |
| Density | Brief §3 | How much the reader wants per screen | E8 density, A1 where to aim in the band |
| Visual pull | Brief §3 | Whether words or pictures carry the piece | B1, C1, C3, E4, E5, H6 |
| Subject and entities | Brief §1 and §7 | What the piece is about: people, places, objects, ideas | C7 illustration or photograph, profile choice |
| Structure and turning points | Brief §5 | Where the piece changes direction | E4 type events, E5 breathers, B7 what survives on phones |
| Candidates | Brief §8 | Quotable lines, numbers, pictures named in the text | E4 and E6 (quotes), F2 and H5 (data), E5 (pictures) |
| Pictures supplied | The author's picture folder and the image plan | How many, how strong, which have a quiet zone, which are cut-outs | C1, C2, C3, C4, E5, H4, H6 |
| How the text is written | `scripts/voice.mjs` (brief §3, voice measures) | Sentence length, "I" and "you", questions, contractions, numbers | E1 dial, profile choice, A8, B3 |
| Content constraints | Brief §9 | Reveals, fixed order, exact words, sensitive subjects | B4 and B7 (order must survive), D6 (what is content) |

## The order of decisions

1. **The brief exists.** If `design/content-brief.md` is missing or older than the content, run the
   content-analysis skill first. No design decision is made without it.
2. **Set the dial (E1)** from the reader and the subject, then the tone scales: high energy and high
   visual pull move it toward expressive; high seriousness and formality move it toward restrained.
3. **Check the voice.** Run `node ${CLAUDE_PLUGIN_ROOT}/skills/editorial-foundations/scripts/voice.mjs <content> --compare ${CLAUDE_PLUGIN_ROOT}/skills/editorial-foundations/references/voice-fingerprints.json`.
   The ranking says which profiles write most like this piece. Use it to confirm or question the
   dial, never to override the subject and the reader.
4. **Choose the profile** (`profiles.md`): its level matches the dial, its **Fits** matches the
   subject and genre, its **Avoid** does not, and its voice is near the top of the ranking. When
   two profiles fit, prefer the one whose voice is closer.
5. **Apply A and G as they are.**
6. **For every other rule the page touches, read its "Decide from the content" paragraph** and
   choose. Several rules end with "use this only when…": when the condition is not met, the rule
   does not apply and nothing replaces it by force.
7. **Record each decision** in the direction, in a table: the rule, what you chose, and the
   evidence (a brief location such as `¶14`, a tone score, a voice measure, or a picture file).

```markdown
| Rule | Choice | Evidence |
|---|---|---|
| E1 dial | middle | reader: home cooks, energy 3, seriousness 2 (brief §3) |
| B3 columns | 2 at most | genre: profile; warmth 5 (brief §3); "I" 24 per 1,000 words |
| C1 lead bleed | yes, kitchen.jpg | visual pull 4; kitchen named in ¶2; 3 pictures in scene 2 |
| E5 breathers | one, after ¶9 | garden.jpg shows the garden named in ¶9; no picture fits after ¶15 |
```

### When signals disagree

Decide in this order, and say in the evidence column which signal won:

1. **Content constraints** (brief §9): a reveal, a fixed order or exact words always win.
2. **What the author supplied**: the pictures, quotes and data that actually exist. A rule that
   needs a picture, a quote or a number you do not have does not apply.
3. **Genre and reader.**
4. **Tone scales.**
5. **Voice measures.**
6. **The profile's defaults**, used only when nothing above decides. Say so when you fall back to
   them.

## How to use the voice measures

`scripts/voice.mjs` measures how a text is written: average sentence length, the share of long and
short sentences, word length and difficulty, how often the writer says "I", "we" and "you", how
often they ask questions or quote people, how many numbers they use, contractions, dashes,
semicolons, vocabulary range and spelling (British or American). It measures prose only: headings,
captions and Wocument commands are removed first.

`references/voice-fingerprints.json` holds the same measures for each profile, taken from the body
text of the study material. With `--compare`, the script ranks the profiles by how close their
writing is to the piece, and names the measures that differ most.

What the ranking is good for, and its limits:

- **It is a real signal.** In a check on 25 issues, each measured against fingerprints built
  without it, the issue's own profile came first 16 times and in the top three 19 times (by chance
  it would be about 1 in 17).
- **It is not enough alone.** Writing varies between articles of one publication, and a profile is
  more than its writing. Use it as a check on the dial and the profile, never as the decision.
- **The order matters more than the numbers.** A single short piece is far from every profile;
  look at which profiles come first and which measures make the difference.
- **The engineered-magazine profile has no measures** (its study issues were scanned with no text
  layer). Judge it from subject, reader and tone only.

## Never

- **Never decide from the subject's category alone.** A technology subject does not choose the
  engineered or research-journal profile by itself; a warm personal story about an engineer may
  suit a profile from any category. The study's category folders are filing, not rules.
- **Never invent material to satisfy a rule.** No placeholder pictures for a breather, no invented
  pull quotes, numbers, bios or signatures. When the material is missing, the rule does not apply.
- **Never decide silently.** Every decision that depends on the content is recorded with its
  evidence, so the owner can see why the page looks the way it does and change one decision
  without redoing the rest.
