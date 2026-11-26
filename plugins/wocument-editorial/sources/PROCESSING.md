# Processing brief for the snapshot agent

Your job is mechanical: prepare each issue for two-page viewing, cut out components, and mark
where each one sat. Record only what you can see. Do not judge, explain or name principles.
A separate editorial analyst does the context and insight work later, from your output and the PDF.

## 1. Folders

One folder per magazine, then one per issue:

```
<edition>/<magazine>/<yyyy-mm>/
  original.pdf          the PDF as supplied, unchanged
  issue.pdf             the same issue without the front cover, for two-page view
  pages.csv             every original page and what it is
  snapshots.csv         one row per snapshot
  notes.md              the owner's review notes (you create it empty, see section 4)
  cover/  contents/  openers/  display-headings/  decks/  drop-caps/
  pull-quotes/  running-heads/  captions-credits/  picture-treatments/
  illustrations/  author-portraits/  section-contrast/
  charts-diagrams/  sidebars/  spreads/
```

The supplied PDFs sit loose in the edition folder. Move each one to
`<magazine>/<issue>/original.pdf`. If two PDFs are the same file, keep one and report the other.

Use lower-case magazine names with hyphens (`inc`, `wired-uk`, `the-economist`). Name the issue folder:

- monthly or two-monthly: the first month, `2026-10` (October–November);
- weekly: the cover date, `2026-11-16`;
- seasonal: the first month of the season, `2026-03` for spring;
- special issue: the date plus a short name, `2026-11-world-ahead`.

Put the full issue name as printed in the title of `notes.md` (`inc 2026-03 (spring)`).

## 2. Pages

Magazines are designed as spreads, so the analyst reads every issue in two-page view.

- **Remove only the front cover** (original page 1) to make `issue.pdf`. The cover is a single
  page; without it, each left page sits next to its right page.
- **Keep every other page, ads included.** Ads hold their place in the spreads and the rhythm of the issue.
- Check: open `issue.pdf` in two-page view and find a picture or headline that crosses the fold.
  If its two halves sit on different spreads, stop and report it. Do not fix it.

`pages.csv`, one row per original page, in order:

```
original_page,issue_page,kind
1,,cover
2,1,editorial
3,2,ad
```

`kind` is `cover`, `editorial`, `ad`, `house` or `advertorial`. An ad is a page sold to an
advertiser. House pages (subscriptions, the magazine's own events) and section dividers are
`house`. Never renumber `original_page`.

## 3. Snapshots

Render pages from the PDF at 200 dpi or more and save PNG files, never JPEG and never screen
captures. Do not snapshot ads.

For each component instance, save two PNG files in its component folder:

- `p<original_page>-<n>.png`: the component cropped with a margin of about 5% on each side,
  so the text or space next to it shows.
- `p<original_page>-<n>-marked.png`: the whole spread, at least 2400 px wide, with a 6 px red
  box around the component. Use a single page only when the page has no facing page.

What each folder holds:

| Folder | Holds |
|---|---|
| `cover/` | the front cover, and the back cover if it is not an ad |
| `contents/` | contents pages |
| `openers/` | the first spread of each article, especially designed starts |
| `display-headings/` | headlines set as artwork or with unusual type |
| `decks/` | standfirsts and kickers |
| `drop-caps/` | drop caps and other large first letters |
| `pull-quotes/` | pull quotes |
| `running-heads/` | running heads, section labels and folios |
| `captions-credits/` | captions and picture credits |
| `picture-treatments/` | crops, full bleeds, cut-outs, collages, duotones |
| `illustrations/` | editorial illustrations: drawn, painted or collaged artwork that goes with an article |
| `author-portraits/` | illustrated author portraits, author avatars and byline photos |
| `section-contrast/` | the place where one section ends and the next begins (see below) |
| `charts-diagrams/` | charts, maps, diagrams and infographics |
| `sidebars/` | fact panels, boxes and lists set apart from the text |
| `spreads/` | whole spreads, for the grid |

**Section contrast.** Where one section or article type ends and another begins, and the change
shows (a different background or paper tone, colour, typeface, grid, or density), save the last
spread before the change and the first spread after it as `p<page>-<n>-before.png` and
`p<page>-<n>-after.png`. No crop and no red box are needed for these.

How many: **one snapshot per style.** If a style is already covered in this issue, do not
snapshot it again; record the other pages in `also_on` instead (see below). Example: when every
drop cap in an issue has the same style, save one drop cap and list the other pages.

- The house style counts as a style: keep one plain example of each component, not only striking ones.
- Spreads: the opening spread of each article whose opener is kept, plus 2 ordinary body spreads.
- Section contrast: one pair per kind of change.

`snapshots.csv`, one row per snapshot:

```
file,component,original_page,spread,box,also_on
drop-caps/p74-1.png,drop-caps,74,74-75,"x=0.04 y=0.30 w=0.12 h=0.20","82 88 101"
```

- `spread`: the two facing original page numbers, or one number for a single page.
- `box`: position on the marked spread image as fractions of its width and height. Empty for section contrast.
- `also_on`: the other original pages where the same style appears, separated by spaces. Empty if none.

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
