# Evidence ledger

One line per claim a reader would act on: what the docs say, where it comes from, and whether it was checked. "Ran" means the claim was tried against the engine built from `main` at `f0b659f` on 2026-11-06. "Assumed" claims carry a flag on the page.

## Start here and Learn

| Claim | Evidence | Status |
| :---- | :---- | :---- |
| The minimum file (frontmatter, headline, one paragraph) is a valid page | spec §18 "Minimum valid file"; `woc check` | Ran (gives W064 for a single short line) |
| `woc` subcommands: parse, resolve, format, check, build, dev; also installed as `wocument` | `packages/cli/src/cli.ts` USAGE; `packages/cli/package.json` bin | Verified |
| Node 20 or later | root `package.json` engines `>=20` | Verified |
| `npm install --global @wocument/cli` | none: packages are private | Assumed (flagged) |
| From the repository: clone, `npm install`, `npm run build`, run `packages/cli/dist/cli.js` | ran | Ran |
| `npx woc` fails with "Permission denied" after a build | ran: `dist/cli.js` mode 644 | Ran (flagged) |
| `woc dev file.woc` creates a missing file from a template ("Untitled", "Start writing here.") | `packages/cli/src/dev.ts` TEMPLATE | Verified |
| `woc dev`: source left, page right, Cmd/Ctrl-S saves, Problems tab, V for the visor, `--host` | `packages/cli/README.md` | Verified (read; not driven in a browser) |
| Vanilla ships Newsreader and Inter; only fonts the styles use are loaded | spec §16 Fonts; commit `f0b659f`; built `dist/assets` holds only the used faces | Ran |
| A Vanilla page with no design gets W064 at 1470px and 2560px (about 43 characters) | ran on the tutorial page | Ran (flagged) |
| A misspelt command gives P012 with "Did you mean \pullquote?" | ran | Ran |
| `woc build` writes `index.html`, `woc.<hash>.js`, `assets/` with WebP pictures and fonts | ran | Ran |
| The built page's script is a module; previewing needs a server | `<script type="module">` in the built `index.html` | Verified; opening from disk not tried (flagged) |
| Implicit form: heading frame on columns 1-8, text in as many columns as keep lines within 600px | spec §02.2; render at 1280 (2 columns) and 1920 (4 columns) | Ran |
| Nothing floats on phones; objects sit at their anchors | `skills/wocument/references/composition.md` "Floating"; render at 390 | Ran |
| A pull quote can move to an earlier screen than its paragraph | render at 1920: pull quote at the top of column 1 | Ran |
| Pull quotes get their marks from the style; write the words without quotes | composition.md "Text objects"; render | Ran |
| `\palette[name=default, ...]` replaces Vanilla's palette; a scene's `palette=` swaps all roles | spec §07.3; render of the lesson pages | Ran |
| `\style[name=headline, ...]` changes only the listed properties | spec §02.1; themes.md "The cascade"; render | Ran |
| `\folio[position=top-right, progress]` shows a running head and a progress line | spec §10.5; render | Ran |
| `\sidebar[bg=rule, inset=1bl]` fills with the rule colour and pads by one baseline step | commands.md; render | Ran |
| `size=hero, place=top` on the lesson's landscape picture falls back ("no spot") on a 1920px screen | render check at 1920 | Ran |
| No picture takes more than 85% of a screen's height | `packages/layout/src/compose.ts` `candidates()` (`0.85 * g.band`) | Verified |
| A `.woct` file holds definitions only; a document loads at most one, with `theme:` | spec §02.2, §07.8 | Verified |
| `height=screen` scene, `layer=background` figure with `fit=cover`, frame with `rows=4-6`, `valign=bottom` | commands.md; render at 390 and 1280 | Ran |
| A screen scene has six rows by default | spec §16 grid table `rows` 6 | Verified |
| A frame with `story=main` shows the story's text | spec §09.2; render | Ran |
| The implicit form's story frame is `cols=all, columns=auto, columns@wide=4, columns@tablet=1, measure=600px` | spec §02.2 | Verified, and rebuilt by hand in the opener lesson |

## Build

| Claim | Evidence | Status |
| :---- | :---- | :---- |
| `\figure` and `\gallery` attributes and defaults | `skills/wocument/references/commands.md`, `capabilities.md` | Verified |
| Sizes and places; a window of one screen either side; at most three floats and one hero a screen; nothing floats on phones and tablets | spec §07.7, §11.1, §11.3 | Verified |
| An anchored object with `side=` or `cols=` stays at its anchor; `side` without `width` is 50% | `packages/resolver/src/index.ts` 419-432 | Verified |
| Cut-out outlines are read from PNG only | `packages/assets/src/index.ts` `contour()` | Verified |
| JPEG, PNG and GIF become WebP; WebP, AVIF and SVG are served as they are | `packages/assets/src/index.ts` `CONVERTS` | Verified |
| Vanilla body `min-slot=9em` | `packages/resolver/src/default-theme.ts` | Verified |
| `\folio` in a `.woct` is refused (P045) | ran | Ran |
| Base values beat Vanilla's `at=` values | ran; spec §02.1 | Ran |
| A missing font gives W050; only used fonts load | `packages/resolver/src/index.ts` 850, 870-913 | Verified |
| W060, W061, W062, W063 thresholds | `packages/resolver/src/readability.ts` | Verified |
| Thread order, frame capacity, both kinds of `\framebreak` | spec §09.3; render check of the worked example | Ran |
| Other overset policies than `grow` do nothing | `packages/layout/src/index.ts` 910 | Verified (flagged) |
| W040, W042, W043 are not reported | `packages/layout/src/index.ts` 2512, 2602 | Verified (flagged) |
| The Problems tab shows parse and resolve problems, not W064 or copyfitting | `packages/cli/src/dev.ts` `compile()` | Verified |
| V toggles the visor; its layers | `packages/cli/client/view.ts` 41; `packages/visor/src/panel.ts` 12 | Verified |
| `format --check` exits 1 for a file not in canonical form | `packages/cli/src/cli.ts` `formatFile` | Verified |
| Several inputs build to `<name>.html` sharing one script and `assets/`; W050 doesn't fail a build; a parse error fails that page only | ran `woc build` | Ran |
| `parse`, `resolve`, `createAssetHost`, `mount`, `renderStatic` signatures | package sources | Verified by reading (snippets not run) |
| `mount` lays out for the window's width and takes over window scrolling | `packages/renderer/src/mount.ts`; `pages.ts` 74, 110 | Verified |
| Skill install by symlink to `~/.claude/skills/wocument` | `SKILL.md`; how Claude Code loads skills | Verified |

## Understand

| Claim | Evidence | Status |
| :---- | :---- | :---- |
| Scene heights `flow`, `screen`, `page` | spec §08.2 | Verified |
| Balancing by lines on the last band; full pages not levelled since 2026-10-29 | spec §09.4, §09.7 | Verified |
| Widows and orphans default to 2 | `packages/schema/src/commands/definitions.ts` 86-87 | Verified |
| No stubs, pages end full, objects never interrupt a column, continuation arrow | spec §09.7 | Verified |
| The picture search: candidates, hard rules, penalty, 40-trial budget, fallbacks | `packages/layout/src/compose.ts`; `packages/layout/src/index.ts` 1820-1950 | Verified |
| The seven-level cascade; `at=`; `extends` | spec §02.1, §07.6 | Verified |
| Built pages wait for fonts, lay out again on resize | `packages/renderer/src/mount.ts` | Verified |
| Parse phases A0, A, B, C | grammar §01, §02, §07 | Verified |
| Who calls each stage | `packages/cli/src/dev.ts` 67, `build.ts`, `client/view.ts` | Verified |
| MAYA ("most advanced, yet acceptable"), credited to Raymond Loewy | general knowledge | Assumed |

## Reference

| Claim | Evidence | Status |
| :---- | :---- | :---- |
| Frontmatter fields, P002 and P003 | `packages/schema/src/frontmatter.ts`; `packages/parser/src/prepare.ts` 150-207 | Verified |
| Implicit form frames and ids | `packages/resolver/src/index.ts` 107-135; `woc resolve` | Ran |
| Column counts 1 to 4 by width | `packages/layout/src/index.ts` `autoColumns` | Verified |
| Every L and P code exists | grep in parser and schema sources | Verified |
| W030-W035, W050, W060-W064 exist; W040, W042, W043 only in comments; W041 absent | grep | Verified |
| `fluid()` takes px or rem; rem is 16px; fluid starts at 360px | `packages/resolver/src/units.ts` | Verified |
| Vanilla values | `packages/resolver/src/default-theme.ts`; spec §16 agrees | Verified |
| CLI options, exit statuses, outputs | `packages/cli/src/cli.ts`, `build.ts`, `dev.ts` | Verified |
| WebP cache is `<cache>/wocument/webp` and honours `XDG_CACHE_HOME` | `packages/cli/src/dev.ts` 55 | Verified (the CLI README says `<cache>/wocument`) |
| W033 covers figure and video (`alt`), embed and audio (`title`), not background objects | `packages/resolver/src/index.ts` 372, 511, 527 | Verified |
| A group in a story gives P020; `\lottie` gives a resolve error | ran | Ran |
