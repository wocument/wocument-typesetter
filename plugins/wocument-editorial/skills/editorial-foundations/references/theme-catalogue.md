# The theme catalogue: entry format

`/editorial-art-direction` chooses a theme from the catalogue; it never invents one. `/publication-system` writes the entries, one per theme, in `themes/catalogue.md`. This file defines the entry. It is a first version (step 2 of the skill plan) and may grow when publication-system is built.

## One entry

```markdown
## <theme name>

- **Files:** <path to the .woct>, <path to the template pack folder>
- **Status:** shipping | study (study themes use study fonts and never ship)
- **Fits:** <content kinds and subjects, in one line>
- **Avoid for:** <content it fights, in one line>
- **Dial:** <1 restrained … 5 expressive> (E1)
- **Mood:** <type voice, colour mood, picture treatment, in a few words>
- **Picture share:** <share of full-picture pages, measured or intended> (I5)
- **Grid:** <columns, module, gutter; screen modules per breakpoint> (I7)
- **Templates:**

  | Template | Kind | Use | Needs |
  | :-- | :-- | :-- | :-- |
  | <file name> | <essay, profile, gallery…> | <one sentence> | <pictures, text length, components> |

- **Runs it supports:** <long read, long read with one stop, chaptered feature, equal set…> (I4)
- **Components:** <the catalogue entries this theme styles>
- **Known gaps:** <what the engine cannot do yet for this theme, with its fallback>
```

## Rules for entries

- The template table lists every file in the pack, and nothing that is not in it.
- "Fits" and "Avoid for" are written from the use records, not from the look of the theme.
- A study theme (built from a reference publication) names no publication. It is described by what it does.
