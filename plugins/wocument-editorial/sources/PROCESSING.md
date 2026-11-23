# Processing brief for the snapshot agent

Your job is mechanical: remove ads, cut out components, and mark where each one sat.
Record only what you can see. Do not judge, explain or name principles.
Claude does the context and insight work later, from your output and the PDF.

## 1. Folders

One folder per magazine, then one per issue:

```
<edition>/<magazine>/<yyyy-mm>/
  original.pdf          the PDF as supplied, unchanged
  issue.pdf             the same issue with ad pages removed
  pages.csv             every original page: what happened to it
  snapshots.csv         one row per snapshot
  notes.md              the owner's review notes (you create it empty, see section 4)
  cover/  contents/  openers/  display-headings/  decks/  drop-caps/
  pull-quotes/  running-heads/  captions-credits/  picture-treatments/
  charts-diagrams/  sidebars/  spreads/
```

Use lower-case magazine names with hyphens (`inc`, `wallpaper`). For seasonal issues use the
first month of the season (`2026-03` for spring) and add the season to the title in `notes.md` (`inc 2026-03 (spring)`).

## 2. Ads

An ad page is a full page sold to an advertiser. Keep house pages (subscriptions, the
magazine's own events), section dividers and advertorials marked as such: label those `house`
or `advertorial`, not `ad`.

`pages.csv`, one row per original page, in order:

```
original_page,kept_page,kind
1,1,editorial
2,,ad
3,2,editorial
```

`kind` is `editorial`, `ad`, `house` or `advertorial`. `kept_page` is empty for removed pages.
Never renumber `original_page`.

## 3. Snapshots

For each component instance, save two PNG files in its component folder:

- `p<original_page>-<n>.png`: the component cropped tight, with a small margin.
- `p<original_page>-<n>-marked.png`: the whole page (or the spread, if the component crosses
  the fold) at about 1200 px wide, with a 4 px red box around the component.

How many:

- Cover, contents, openers, display headings, charts, sidebars: every instance.
- Drop caps, pull quotes, decks, running heads, captions, picture treatments: up to 5 per issue,
  choosing ones that look different from each other. Include plain ones, not only striking ones.
- Spreads: every opening spread of an article, plus 3 ordinary body spreads.

`snapshots.csv`, one row per snapshot:

```
file,component,original_page,spread,box
openers/p14-1.png,openers,14,14-15,"x=0.08 y=0.12 w=0.84 h=0.40"
```

- `spread`: the two facing page numbers, or one number for a single page.
- `box`: position on the page as fractions of page width and height.

That is all. No descriptions, ratings or notes on why it works.

## 4. Owner notes

Create `notes.md` in each issue folder with exactly this text, and do not fill it in.
The owner writes it after reviewing the issue.

```markdown
# <magazine> <yyyy-mm>: owner notes

## Specifics
<!-- One line each: page or snapshot file, then what to look at. Example:
p14 openers/p14-1.png: headline crosses the fold into the picture. -->

## My take
<!-- What works, what doesn't, and when you would or would not do it. -->

## Do not learn from
<!-- Pages or habits in this issue that should not become principles. -->
```
