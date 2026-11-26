---
name: publication-audit
description: Use when Wocument pages are about to ship or be reviewed and must be checked against their publication system and the editorial foundations at every viewport, reporting each inconsistency with a fix and the skill that owns it.
---

# Publication audit

> **Placeholder, in training.** Built during the review rounds; each round adds the checks it taught below.

## Card

| | |
|---|---|
| **Is** | QA against the system, at every viewport. |
| **Is not** | Redesigning; applying fixes unless asked; judging taste beyond what the system and foundations state. |
| **Output** | `design/audit.md`: severity, viewport, location, the rule broken, a proposed fix, the owner skill; screenshots. |

## Checks learned from review rounds

**Round 1, style-issue study build (2026-11-26)**

Measure through `page.html?doc=<name>&inspect` (`window.__woc.pd.scenes`), at several laptop and desktop sizes, not one.

| Check | How | Owner |
|---|---|---|
| Every page scene is a whole number of screens (or an equal share in a complete group) | `scene.height / innerHeight` is a whole number, within 1 px | art direction (target), engine (fit) |
| No scene holds only a rule or a gap | scenes with no text and no picture | art direction |
| No picture crosses a screen boundary | object box against `y + k × innerHeight` | image-art-direction |
| Chrome stays out of the text | section labels written as frames in the content; folio over content | art direction, publication-system |
| Display words not broken | headline lines that end inside a word | publication-system |
| Hierarchy steps | headline ÷ deck about 3 to 5, deck ÷ body 1.2 to 1.4 | publication-system |
| Drop caps in ink unless the template's openers use an accent | computed colour | publication-system |
| Pictures sized from their purpose | a decoration larger than a quarter of the screen | image-art-direction |
| No text-size change used to fit | story or scene styles smaller than the theme's body | art direction |
