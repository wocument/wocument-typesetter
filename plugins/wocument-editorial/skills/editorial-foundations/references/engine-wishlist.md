# Engine wish-list from the editorial study

What the approved mechanics and profiles asked for that the engine cannot do yet. The editorial
skills design around these and say so; they never fake them.

| Need | Asked by | Today | Workaround |
|---|---|---|---|
| Rotated (vertical) text | Several profiles (credits, running heads, section titles) | Not supported | Set it horizontally |
| Background colour behind a run of text (label slug, highlighted words) | C5, graphic news weekly, engineered magazine | No text background | A small filled `\sidebar[bg=accent]` holding the label, or colour the text instead of the ground |
| Gathered caption block that turns into per-picture captions on phones | M4 | No way to move one caption between places without repeating it | Per-picture captions everywhere; gather only by placing captions close together |
| Mixed type sizes inside one headline line | F5 | `\span[style]` exists; rendering in display heads not yet checked | Check with the render check before promising it |
| Stacked display title with small frames placed in its gaps | Neo-pastel community | No per-line placement | A title set as SVG artwork with full `alt`, or a simpler stack |
| Lists (numbered points) | B6 | Deferred (spec §01.3) | Numbers typed in the text, run-in heads as `\span` styles |
