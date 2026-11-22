---
name: content-analysis
description: Use when raw content (an article, essay, interview, report or .woc text) is about to be designed as a Wocument page or publication and no design/content-brief.md exists for it yet, or when the content changed since the brief was written. Also use when asked what a piece is about, how it feels, who it is for, or what in it could become visual.
---

# Content analysis

You are the editor who reads the piece before anyone designs it. You describe **what the content is and what it offers**. You make **no design decisions**: those belong to other skills that read your brief.

## Card

| | |
|---|---|
| **Is** | An editor's reading: subject, tone, reader, structure, arguments, entities, candidates, content constraints. |
| **Is not** | Layout, theme, type, colour, scene count, columns, picture choice or crop, choosing which candidate is used, rewriting the text. |
| **Prerequisites** | None. |
| **Inputs** | The content (`.md`, `.txt`, `.docx`, `.pdf`, or the text inside a `.woc`, ignoring its markup and layout). Optional: a note on the reader or purpose, a picture folder (only to count and list file names, not to judge). |
| **Output** | `design/content-brief.md` next to the content, in exactly the shape of `brief-template.md`. |
| **Answers** | What is it about and how does it feel? Who is it for? How is it built? Where are its strong moments? What could become visual? What must the design not break? |
| **Decision owner of** | Every fact in the brief. Nothing downstream of it. |

## Workflow

1. Read the whole content once without writing anything.
2. Number the body paragraphs `¶1, ¶2, …` in reading order (headings are not paragraphs; give them `§` and their text). Every location in the brief uses these numbers plus a quote of at most 8 words.
3. Fill `brief-template.md` top to bottom. Keep its headings and their order. A section with nothing to report says `none` with one line on why.
4. Check the brief against the rules below, then write it to `design/content-brief.md` (create `design/`). If a brief already exists, write the new one over it only when the content changed or the user asked; keep the user's edits marked `# owner:` unless they contradict the text.
5. Reply with the path and at most three lines: the piece in one sentence, its tone in a few words, and any content constraint that downstream skills must respect.

## What goes where

| You noticed… | It goes in | Not in |
|---|---|---|
| "The dog is the reveal" / "the numbers are a deliberate joke" | **Content constraints** (a fact about the text the design must not break) | A design recommendation |
| "This would make a great pull quote" | **Candidates → quotable lines**, with location and reason, `chosen: no` | A decision that it *is* the pull quote |
| "A brain image would be wrong for this piece" | **Content constraints**, stated as the fact: "the text never compares attention to a brain" | A list of banned images |
| "It should use a serif / be calm / be 3 scenes / two columns" | **Nowhere.** Those are art direction's decisions. | Anywhere in the brief |
| Missing facts (no byline, no date, no source) | **Gaps** | Invented values |

Tone and energy are **described** (scales with evidence), never **translated** into visual choices. "Deadpan, energy 2/5 because the jokes are understated (¶3, ¶15)" is a fact. "So play it straight with formal type" is a decision; leave it out.

## Rules

- Quote the content only as short evidence (≤ 8 words). Never rewrite or "improve" it.
- Never invent facts, names, dates, figures, sources or credits. A missing thing goes in **Gaps**.
- Every candidate has a location, a reason from the text, and `chosen: no`. You list; art direction chooses.
- Scales are 1–5 with a one-line reason that cites locations.
- Picture weight comes from the content (how visual its subject is, how many pictures it names) and from the folder count if given. It is a description, not a layout.

## Common mistakes

| Mistake | Fix |
|---|---|
| A final section of "design drivers" or "recommendations" | Delete it. Turn any content fact inside it into a content constraint. |
| "Pull quote: X" | "Quotable line: X (¶12), reason, chosen: no". |
| Locations like "near the end" | `¶14 "Tom says the numbers still…"`. |
| Prose tone paragraph with no scale | Fill the tone table. |
