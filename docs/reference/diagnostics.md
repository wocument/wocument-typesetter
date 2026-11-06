# Warnings and errors

Every problem `woc check` can report, what it means and the usual fix, followed by the copyfitting report. The same problems, except W064 and the copyfitting report, appear in the **Problems** tab of `woc dev`.

## How to read a report

```text
woc: parse error [P012] at night-bakers.woc:31:1
  Unknown command \pullqoute. Did you mean \pullquote?
```

The first line gives the stage, the kind and the code, then the file, line and column. The second says what's wrong and, usually, what to do.

| Kind | Stops the build | Code starts with |
| :---- | :---- | :---- |
| Lex error | Yes | `L` |
| Parse error | Yes | `P` |
| Resolve error | Yes | no code |
| Resolve warning | No | `W` |
| Asset warning (a missing file) | No | `W050` |
| Layout warning | No | `W064` |

Codes never change; the wording may. The engine reports every error of one stage before it stops, so fix them from the top and check again: one mistake, such as a missing `}`, can cause the ones after it.

## Lex errors

Problems with the characters of the file itself: its encoding, quoted values, attribute lists, escapes and frontmatter.

| Code | Means | Usual fix |
| :---- | :---- | :---- |
| `L001` | The file isn't valid UTF-8. | Save it as UTF-8 in your editor. |
| `L002` | A quoted value never closes. | Add the closing `"`. |
| `L003` | An attribute list is malformed: an unquoted value with a character such as `?`, `&` or `=`, a `%%` comment, or a `{`, `}` or `\` inside `[...]`. | Quote the value: `url="https://example.com/v?id=4"`. Move comments out of `[...]`. |
| `L004` | A backslash before a character that's neither a command name nor escapable, such as `\$`. | Write `\\` for a backslash, or remove it. See [Escapes](syntax.md#escapes). |
| `L005` | The frontmatter never closes. | Add the second `---` line. |
| `L006` | A quoted value runs onto the next line. | Keep the value on one line. |

## Parse errors

### Frontmatter

| Code | Means | Usual fix |
| :---- | :---- | :---- |
| `P001` | No frontmatter at the top of a document, or it isn't valid YAML. | Start the file with `---`. Quote values that contain `: `. |
| `P002` | An unknown frontmatter field. | Check the spelling against [the field list](file.md#frontmatter), or remove it. |
| `P003` | `wocument` or `title` is missing, or a field has the wrong type. | Add the field, with a value of the type listed. |

### Commands and attributes

| Code | Means | Usual fix |
| :---- | :---- | :---- |
| `P010` | A `{` that doesn't open a body (often a space before it), or a body that never closes. | Remove the space before `{`, or add the missing `}`. |
| `P011` | A `}` that closes nothing. | Remove it, or write `\}`. |
| `P012` | An unknown command. | Use the suggestion, or look the name up in [Commands and attributes](commands.md). |
| `P013` | An unknown attribute, or a breakpoint suffix on one that can't vary. | Use the suggestion; drop the `@` suffix. |
| `P014` | The same attribute twice, at the same breakpoint. | Keep one. |
| `P015` | A value of the wrong type. | Use one of the types the message names. |
| `P016` | A required attribute is missing, such as `src` on `\figure` or `style` on `\span`. | Add it. |
| `P017` | A body on a command that takes none. | Remove the `{...}`. |
| `P018` | No body on a command that needs one. | Add `{...}` right after the name or the `]`. |
| `P019` | An empty body where text is expected: `\headline{}`. | Write the text, or remove the command. |
| `P020` | A command where it isn't allowed: a child its parent doesn't accept, a second `\cite` or `\title`, `\story`, `\frame` or `\group` in a file with no scenes. | Move it; the message lists what is allowed. |
| `P021` | Text in a body that holds only commands, such as a figure's. | Put the words in `\caption{...}`. |
| `P022` | A blank line inside a one-paragraph body such as a headline. | Remove the blank line. |
| `P023` | A block command inside a line of text. | Move it out of the text. |

### Text

| Code | Means | Usual fix |
| :---- | :---- | :---- |
| `P030` | Emphasis that isn't closed in its paragraph. | Add the closing `*` or `**`, or escape a literal one: `\*`. |
| `P031` | Emphasis closed in the wrong order: `**bold *italic** text*`. | Close the inner one first. |
| `P032` | A code span that isn't closed. | Add the closing backtick, or write `` \` ``. |
| `P033` | A command inside a code span. | Write `\\` for a literal backslash in code. |
| `P034` | Four or more asterisks in a row. | Escape some: `\*`. |
| `P035` | A link inside a link. | Remove the inner link. |
| `P036` | An empty code span: two backticks together. | Remove them, or escape them. |

### Document shape

| Code | Means | Usual fix |
| :---- | :---- | :---- |
| `P040` | A definition after the first story, scene or content. | Move it up into the design head. |
| `P041` | Text or an element at the top level of a file that has scenes. | Put it in a `\story` or a `\scene`. |
| `P042` | Text in a scene that also has frames or groups. | Put the text in a `\frame`. |
| `P043` | More than one `\folio` at document level. | Keep one. |
| `P044` | A `\frame` with both `story=` and a body. | Choose one: show the story, or hold its own text. |
| `P045` | A theme file with frontmatter, text or a non-definition command. | Keep only definitions in a `.woct` file. |

## Resolve errors

These have no code and no position yet; only some messages name their line, as `(line 12)`. The message names the problem:

| Message | Usual fix |
| :---- | :---- |
| `unknown style …`, `unknown grid …`, `unknown palette …`, `unknown parent …` | Define it, or fix the name. |
| `unknown token $…`, `token cycle: …` | Define the token; break the loop of tokens that refer to each other. |
| `style extends cycle: …` | Stop two styles extending each other. |
| `frame "…" shows unknown story "…"` | Fix the story's name in `story=`. |
| `story "…" has no visible frame on …` | Give the story a frame that isn't hidden at that breakpoint. |
| `duplicate … name "…"` | Give each scene, frame, story or object its own name. |
| `a drop cap needs text to start its paragraph` | Put a paragraph straight after `\dropcap`. |
| `fluid() bounds must be absolute` | Use `px` or `rem` inside `fluid()`. |
| `\spot[…]: span cannot run to end` | Give a number or a range such as `2-3`. |
| `\lottie is not resolved yet` | `\lottie` isn't built: use `\video` (see [What isn't built yet](limits.md)). |
| `cannot read the theme …` | Fix the `theme:` path (see [Paths](cli.md#paths)). |

> **⚑ Flag:** The page assumes resolve errors will carry a line number and a code, like the other diagnostics. Today they have no code, only some messages give a line, and the Problems tab in `woc dev` shows them all at line 1. Search the source for the name the message gives.

## Warnings

Warnings never stop a build. Fix each one, or know why you're leaving it. A resolve warning is reported once, naming the breakpoints or scenes it shows at.

| Code | Means | Usual fix |
| :---- | :---- | :---- |
| `W030` | `snap=hard` on a flow scene has been softened to `soft`, so it can't trap the reader. | Use `snap=soft`, or make the scene `height=screen` or `page`. |
| `W031` | A scene, or an anchored object, linearizes at a breakpoint: its `cols` don't fit that grid, so it's stacked into one column. | Add `cols@tablet=` or `cols@phone=`, or `linearize@phone=true` if stacking is what you want. |
| `W032` | `shape=alpha` on a picture with no transparency; it's set as a rectangle. | Use a PNG cut-out, or drop `shape=alpha`. |
| `W033` | A missing `alt` on a `\figure` or `\video`, or a missing `title` on an `\embed` or `\audio`. | Describe it. Use `alt=""` only for decoration. Background pictures don't need one. |
| `W034` | `motion=always` keeps an element's motion for readers who asked for reduced motion. | Remove it unless the motion carries meaning. |
| `W035` | A value has no effect where it's written: a subhead level other than 1 or 2, or `span=all` in the middle of a page scene's columns. | Change the value; start a frame with the spanning block, or put a `\framebreak` before it. |
| `W050` | A file is missing: a picture, video, font, caption track, music or `social-image`. A missing font falls back to the style's next family. | Fix the path, or add the file (see [Paths](cli.md#paths)). |
| `W060` | Body text under 16px. | Raise the body size. |
| `W061` | Body leading under 1.4 times the size. | A larger baseline step, or a smaller size. |
| `W062` | Ink, muted or accent has less than 4.5:1 contrast against paper (WCAG 2.2 AA). | Darken or lighten that role in the palette. |
| `W063` | Body weight under 350. | Use 400 or 500. |
| `W064` | Body lines hold fewer than about 45 or more than about 75 characters at a test width (fewer than 30 on a phone). | Change `measure=`, `columns=`, the frame's `cols`, or the text size, at those breakpoints. |

`woc check` estimates W064 without a browser. It lays the page out at 360, 768, 1280, 1470 and 2560px, counting a character as 0.44 of the text size (Newsreader's average), so the count is close for Vanilla's fonts and a few characters off for others. A very short document can give odd counts, because only a few lines are full.

> **⚑ Flag:** The page assumes Vanilla's own columns read comfortably at every width. Today a page in Vanilla's implicit form gets W064 at 1470px and 2560px, at about 43 characters a line. You can leave this warning on a page that uses Vanilla's columns.

### Defined but not reported yet

The specification defines these layout warnings, but the engine doesn't report them yet. Their effects still show on the page and in the visor.

| Code | Would mean | What to do now |
| :---- | :---- | :---- |
| `W040` | A `\framebreak` with nowhere to go: no next frame in the thread. | Check the end of each story in `woc dev`. |
| `W041` | A frame of body text wider than about 90 characters, with no `measure`. | Watch for W064, which `woc check` does report. |
| `W042` | No space in a band wide enough for a line, so a line is set in a narrow column anyway. | Press V in `woc dev` and look for slivers of text beside pictures. |
| `W043` | An anchored object taller than a band, which overflows it. | Make the object smaller, or check the screen in `woc dev`. |

> **⚑ Flag:** The specification also lists warnings the engine doesn't report and gives no code: more than one `\headline`, a missing `poster` on a video, autoplay without `muted`, and text clipped by `overset=clip`. This page assumes they will be added. Until then, check those by eye.

## The copyfitting report

After the warnings, `woc check` prints the copy changes that would fill each screen of a page scene at the test widths. The engine never changes your words; it tells you which to change, and by how much.

```text
screen 2 at 1470px: 3 lines short of the bottom line.
  Add about 130 characters to "The entries are short…", or let figure-2 grow by 3 lines (size=wide).
screen 4 at 2560px: figure-5 is 2 screens from its paragraph; it had no room nearer.
  Make it size=column, or move \figure later in the story.
```

| Line | Means |
| :---- | :---- |
| `screen N at Wpx: K lines short of the bottom line.` | That screen's columns end K lines above its foot. Only screens that aren't their frame's last are reported: the last screen of a story may end short. |
| `Add about C characters to "…"` | C is K lines times the characters in a full body line at that width, to the nearest ten. The quoted words start the last paragraph on that screen. |
| `or let figure-N grow by K lines (size=wide)` | Shown when a photograph that crops (`fit=cover`) is on that screen. A larger picture fills the gap instead. |
| `figure-N is S screens from its paragraph; it had no room nearer.` | A floating object landed two screens or more from where it's written, because the pictures before it filled the screens in between. |
| `Make it size=column, or move \figure later in the story.` | A smaller object fits nearer; moving its command later moves its anchor. |

The report is advice: it never fails the check, and a page can ship with it. Object names such as `figure-2` are the engine's own (the second figure); give an object `name=` to see your name instead.

## Related

- [The woc command](cli.md): running `woc check` and `woc dev`.
- [Check and polish a page](../build/check-and-polish.md): what to look for beyond the warnings.
- [What isn't built yet](limits.md): limits that show up as errors or warnings.
