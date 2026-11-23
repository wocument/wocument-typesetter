# Reference magazines (local only)

Put magazine PDFs here, one folder per edition, 2–3 issues from different magazines each.
Everything in this folder except this file, `PROCESSING.md` and `.gitignore` is ignored by git:
the PDFs and snapshots never leave this computer.

| Folder | Edition |
|---|---|
| `architecture-interiors/` | Architecture & Interiors |
| `technology-innovation/` | Technology & Innovation |
| `culture-society/` | Culture & Society |
| `business-finance/` | Business & Finance |

Who does what:

1. **Snapshot agent** (follows `PROCESSING.md`): removes ads, cuts out components, marks where each sat. Observation only.
2. **Owner**: writes `notes.md` in each issue folder: specifics to look at, your take, and what not to learn from.
3. **Claude**: reads each issue, its snapshots and your notes, and writes the context (article type, position, what is used and what is absent) and the insight log for the edition. Your notes outrank Claude's reading, and each insight says whether it comes from them.
4. **Owner**: marks each insight keep, change or drop. Only kept principles, in our own words, go into `skills/editorial-foundations/`.
