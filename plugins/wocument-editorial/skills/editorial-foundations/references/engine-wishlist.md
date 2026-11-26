# Engine wish-list from the editorial rules

What the approved rules and profiles ask for that the engine cannot do yet. The editorial skills
design around these and say so; they never fake them. Each row names the rule that asks for it,
what the engine does today, and what a skill does until it is built.

The engine computes geometry and never calls a model. Every item here is a layout or rendering
capability; none asks the engine to make an editorial judgement.

## Asked for by approved rules

| Need | Rule | Today | Until it is built |
|---|---|---|---|
| Keep the body text at full size in the compact range (1024 to 1799 px) | A2 | The compact breakpoint shows the whole page at 85%, body included, so laptop body text is smaller than phone body text | The theme sets the body a little larger at `@compact`, so it renders at 16 px or more |
| A warning when a column alley is wider than about 1.8 times the line spacing | A5 | No check | The theme keeps alleys at about 1 to 1.6 line spacings; the audit checks it |
| Choose the layout from the screen's height as well as its width (at least about 12 lines per column in a paged scene) | B5 | Width only | The skill avoids paged scenes for short, wide screens and checks them in the render check |
| A quiet zone recorded on a picture, which crops and type placement respect | C2, H4 | `focus` keeps one point of a picture in view; nothing marks the calm area | The image plan records the quiet zone; the skill sets `focus` and places type by hand at each breakpoint |
| One object steps down from outline wrap to box wrap to a centred picture as its column narrows | C4 | `wrap=contour`, `min-slot` (6 em) and `wrap=jump` exist, but each is set by hand | The skill writes separate values per breakpoint |
| A drop cap or cut-out that pushes into the margin | C6 | `hang=quotes` and `hang=punctuation` are built; hanging initials and objects are not | Keep initials and objects inside the column |
| A note in the margin rail that moves into the text on phones | D2 | A rail is a grid choice; the note cannot move between places without being written twice | Place the note after its paragraph on every screen, or hide the rail copy at `@phone` and repeat it inline |
| Mixed type sizes in one headline that stay correct on narrow screens | F6 | Styled spans and `fit=width` work, but on narrow screens the large words overlap the line above and break inside a word | Check every line in the render check; reduce the size ratio on phones rather than break words |
| Picture files in several sizes, so each screen downloads one its size | G5 | One size per picture | Export pictures at a sensible single size; note the cost on phones |
| Breakpoints and column widths in ems, so layouts follow the reader's text size | G6 | Pixels | Test with enlarged text (G1) and fix what breaks |
| A scene fitted to a whole number of screens (pictures, space, margins, then text size) | J1 | The last band of a page scene is cut to its text | Fit by hand: picture size, a tighter baseline grid for the scene, a story style one step smaller (design note 2026-11-26) |
| A head strip with two labels (issue name and section) that content never enters | J5 | One folio per scene | Section label from a parent's folio; never a frame in the content |
| A picture kept inside one screen of a page scene | J4 | A grid-placed picture can cross into the next band | `ratio=` and `fit=cover` so it is shorter than a screen |
| Display type that shrinks to fit its longest word instead of breaking it | J6 | A long word breaks inside the word | Size display type for the narrowest frame it is set in |

## Asked for by profiles and options

| Need | Asked by | Today | Until it is built |
|---|---|---|---|
| Rotated (vertical) text | Several profiles (credits, running heads, section titles) | Not supported | Set it horizontally |
| Background colour behind a run of text (a label slug, highlighted words) | D4 (an option), graphic and engineered profiles | No text background | A small filled `\sidebar[bg=accent]` holding the label, or colour the text instead of the ground |
| Stacked display title with small frames placed in its gaps | Neo-pastel community profile | No per-line placement | A title set as SVG artwork with full `alt`, or a simpler stack |
| Lists (numbered points, Q&A) | F4 | Deferred (spec §01.3) | Numbers typed in the text, run-in heads as `\span` styles |

## Parked

| Need | Why it is parked |
|---|---|
| A gathered caption block that turns into one caption per picture on phones (D1) | The owner judged the engine's per-picture captions good enough (2026-11-24). The gathered block is now an option, not a default, so it is not needed. |
