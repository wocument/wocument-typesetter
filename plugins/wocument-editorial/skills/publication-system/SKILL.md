---
name: publication-system
description: Use when a direction needs a reusable theme and template pack, or an existing publication (PDFs, screenshots, .woc/.woct files) must be codified into a Wocument publication system - grids, type roles, components, conventions and a theme catalogue entry.
---

# Publication system (modes: from-direction, from-reference)

> **Placeholder, in training.** Built during the review rounds; each round adds its lessons below and its rules to `editorial-foundations`.

## Card

| | |
|---|---|
| **Is** | The design system: rules the engine runs and people read. |
| **Is not** | Deciding tone or archetype, laying out articles, choosing pictures. from-reference describes and codifies only. |
| **Output** | `design/system/`: `theme.woct`, `grids.md`, `components.md`, `conventions.md`, the template pack (I8), and an entry in `themes/catalogue.md` (format: `editorial-foundations/references/theme-catalogue.md`). |

## Rules it applies

`editorial-foundations/references/rules/`: A, B, G, I (templates), J6 (type hierarchy), J7 (opener styles per template).

## Lessons from review rounds

**Round 1, style-issue study build (2026-11-26)**

- **The theme carries a fixed spread grid**: 12 columns from laptop width, 6 on tablets, 4 on phones, so halves, quarters and three quarters of a spread mean the same everywhere. A grid that adds modules as the screen widens cannot place "half a spread". (finding R1-T1)
- **Measure every voice.** A magazine often has two pull-quote voices (a serif display quote and a bold sans quote in a column); measure both. (R1-T2)
- **Display styles never hyphenate**, and the size of a stacked display headline is chosen so its longest word fits the narrowest frame. (R1-T3, J6)
- **Check each measured style against the page by eye.** A measure that puts a headline at nearly the size of its deck is wrong: the feature headline here was first measured at 17.4 pt (it had read the deck); the page shows about 50 pt.
- **Base styles take ink.** A base drop cap with no colour inherits the default theme's accent. Set `color=ink` on base styles, and keep an accent only on the variant whose pages use it. (R1-O8)
- **Variant styles belong to templates, not page groups.** Name them for the template (`headline-feature`, `headline-display`, `deck-display`) and use each only there. (J7)
- **Text sizes are fixed per breakpoint.** The engine's fitting never changes them, so the theme's body size must already read well at every breakpoint.
