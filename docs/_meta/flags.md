# Flags

Every place the docs assume an open item is solved. Find them in the pages with `grep -rn "⚑ Flag" docs/`. Clear a flag by fixing the item, then removing the flag from each page and the line here.

## Before the launch

| Open item | What the docs assume | True today | Pages |
| :---- | :---- | :---- | :---- |
| npm release | `npm install --global @wocument/cli` works; packages under `@wocument` | Packages are private; the release waits on the npm name. The manifests also don't list their `@wocument/*` dependencies, so a global install would break once published | start-here/install, build/embed-the-engine, understand/how-the-engine-works |
| `npx woc` in the repository | It runs | "Permission denied": the build leaves `dist/cli.js` without its executable bit | start-here/install |
| VS Code extension | Published as "Wocument" on the Marketplace and Open VSX | Not published | start-here/install |
| W064 on Vanilla | A page with no design passes | W064 at 1470px and 2560px (about 43 characters a line); also nonsense counts for very short documents | start-here/your-first-page, learn/lay-out-a-feature, learn/open-with-a-scene, build/check-and-polish, reference/diagnostics |
| Previewing a build | Serving `dist/` (`npx serve dist`) is the recommended way | Not tested. Opened from disk the page is probably blank: an inline script adds `woc-js`, which hides the reading version before the module loads | start-here/your-first-page, build/publish, reference/cli, reference/limits |
| Render check | Part of the tools a writer has | Runs only from a clone of the repository (Playwright, repo paths) | build/check-and-polish, build/design-with-claude |
| Skill quality | Not claimed | Not measured; recipes never reviewed as designs; tested only in Claude Code | build/design-with-claude |

## Engine and language gaps

| Open item | What the docs assume | True today | Pages |
| :---- | :---- | :---- | :---- |
| Languages | Quotes and hyphenation follow `lang` | English quotes and American English hyphenation for every page | start-here/your-first-page, reference/syntax |
| Responsive picture sets | Not assumed; advice given | One WebP per picture at its own size; use about 2,400px | build/add-pictures, build/publish |
| Picture penalty weights | Tuned | Hand-tuned on test articles (typesetter issue 2) | understand/how-pictures-find-their-place |
| `size=small` | Respects `place=`, no effect on phones | Ignores `place=` (typesetter issue 3) and applies on phones (issue 4) | understand/how-pictures-find-their-place |
| Browser support | Current Chrome, Edge, Safari, Firefox; Firefox may break a line or two differently | Open decision | understand/layout-on-the-readers-screen |
| Content in a theme's `\parent` | A parent in a theme can hold a picture or a rule | A `\rule` there is a resolve error ("no id for \rule"); a picture can take a page element's name. Element ids skip theme definitions, and theme and page node ids overlap | build/make-a-theme |
| Cut-out in columns | A `shape=alpha` picture stays beside its anchor | In a frame of several columns it can be set at the top of a later column (seen in the build/wrap-text-around-a-cut-out example at 1024px and up) | build/wrap-text-around-a-cut-out |
| Theme-relative paths | A relative path in a theme is read from the theme's folder (spec §06.2) | Read from the page's folder | build/use-your-own-fonts |
| W040 | Reported for a `\framebreak` with nowhere to go | Ignored silently | build/thread-a-story |
| `overset=clip` and `error` | Warn, and fail the build | Both hide the extra text silently | build/thread-a-story |
| `subhead-2` | `\subhead[level=2]` is set in `subhead-2` (spec §10.3) | Every subhead is set in `subhead`; `subhead-2` only with `style=` | reference/vanilla |
| Unknown breakpoint suffix | Reported | Accepted silently, never applied | reference/syntax |
| Overlapping breakpoints | A resolve error | Accepted | reference/syntax |
| Resolve errors | Have a code and a line | No code; Problems tab shows line 1 | reference/diagnostics |
| Spec warnings without a code | Reported (two headlines, video without poster, autoplay without muted, clipped overset) | Not reported | reference/diagnostics |
| Frontmatter checks | `wocument` must be `1`, `date` an ISO date | Any whole number, any text | reference/file |
| Link-preview tags | `social-image`, `author`, `date`, `section` reach the built page's tags | Only `<title>`, `description` and `lang` are written | reference/file |
