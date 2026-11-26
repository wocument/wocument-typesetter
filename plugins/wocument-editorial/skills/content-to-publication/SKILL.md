---
name: content-to-publication
description: Use when raw content and pictures must be taken all the way to a finished Wocument publication by running the editorial skills in order, with the owner's approval at the gates.
---

# Content to publication (orchestrator)

> **Placeholder, built last.** It makes no editorial decisions of its own.

## Flow

1. `/content-analysis`
2. `/editorial-art-direction`, then **gate: the owner's approval**
3. `/image-art-direction` and `/publication-system` (independent)
4. `/component-builder` for each needed component
5. the `wocument` skill writes the `.woc`
6. `/publication-audit`, then **gate: the owner's review**

It re-runs only the steps whose inputs changed, found by the hashes in the artifacts' headers.
