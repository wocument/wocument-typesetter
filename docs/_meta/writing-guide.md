# How we write the Wocument docs

This is the house style for everything under `docs/`. Read it before you write or edit a page, whether you are a person or an agent.

## Who we write for

Two readers, in this order.

1. **Writers.** Journalists, editors, essayists and designers who want a long read to look like a magazine page on any screen. They can use a text editor and a terminal when the steps are spelled out, but they are not programmers. They want to make a page alone, and to understand what Wocument is and why it works the way it does.
2. **Developers.** People who will integrate the engine, contribute to it, or want the language in full. They want precise reference pages, the command-line tool, and how the engine works.

When a page serves both, write for the writer and give the developer a clearly marked section or a link.

## The four kinds of page

Every page is one of four kinds. Decide which before you write, and don't mix them.

| Section | Kind | The reader says | The page feels like |
| :---- | :---- | :---- | :---- |
| **Start here**, **Learn** | Tutorial | "Teach me." | A guided lesson with a finished thing at the end |
| **Build** | How-to guide | "Help me do this." | A short, direct path to one result |
| **Understand** | Explanation | "Help me see why." | A patient conversation that builds a mental model |
| **Reference** | Reference | "Tell me exactly." | A precise table you can scan |

A tutorial doesn't stop to list every option. A reference page doesn't tell a story. An explanation doesn't walk through steps. When a page starts drifting into another kind, link to that page instead.

## The voice

We sound like an experienced editor who also knows the engine inside out, sitting next to you.

- **Plain words.** "The engine sets your text in columns", not "the layout subsystem orchestrates multi-column composition".
- **You and we.** Address the reader as "you". Wocument's makers are "we".
- **Active voice.** Say who does what: "the engine moves the picture", not "the picture is moved".
- **Varied rhythm.** Mostly short sentences, with a longer one when an idea needs room.
- **Precise terms, explained once.** Use the real name (story, frame, scene, baseline grid), define it where it first appears on the page, and link to the glossary.
- **Warm, not cute.** A small observation about how the engine behaves is welcome. Forced jokes, emoji, and exclamation marks are not.
- **The why, not only the what.** One sentence of reason turns a rule into something the reader can remember.

### Words to avoid

- "Simply", "just", "easily", "obviously", "of course", "quickly", "trivially", "properly". They tell the reader how the task should feel, and make them feel slow when it doesn't.
- "Let's dive in", "In today's world", "powerful", "seamless", "robust", "innovative", "leverage", "utilize".
- Empty openings that repeat the heading.
- Bold for emphasis in running text. Bold is for terms being defined and for UI labels.

### Words we always use the same way

| Use | Not |
| :---- | :---- |
| Wocument (the product and the language) | WMX, WMXDSL, Wocument Lang (except when naming the open products together) |
| a `.woc` file, a document | a source, a WMX file |
| a `.woct` file, a theme | a stylesheet |
| `woc` (the command) | `wocument` (it works, but say `woc`) |
| the engine | the compiler, the renderer (unless you mean that one stage) |
| scene, story, frame, thread, object, spot | section, block, box (for these things) |
| command, attribute, value | tag, property, parameter (for these things) |
| page (what the reader sees) | site |
| Vanilla, the built-in design (a "theme" is a `.woct` file) | the default style, the default theme |
| the reading version (the page without JavaScript) | the plain version, the static version |

## How a page is built

- **One purpose per page**, stated in the first two sentences: what you'll make, do or understand.
- **Each page stands alone.** Someone may land on it from a search. Say what it's about, list what they need, and link back to anything they must have read.
- **Headings say something.** "Pictures wait for a good spot", not "Behaviour".
- **Examples are real.** A believable article (bakers, a coastline, a city at night), never `foo` and `bar`. Keep example text plainly fictional: no real people, quotes or figures.
- **Every example is complete and checked.** A `.woc` example that a reader might copy must pass `woc check` (see "Checking examples"). A fragment that can't run on its own says so in a comment: `%% part of a story`.
- **Show the result.** After an important step, say what the reader should see.
- **End with a next step.** One or two links, not a wall.

Templates for each kind of page are at the end of this guide. Remove sections that don't serve the page.

## Flags: what isn't settled yet

Some things the docs describe aren't true yet, or depend on a decision nobody has made. We don't hide them and we don't stop writing. We write the page **as if the open item were already solved**, and we put a flag next to it.

Every flag uses exactly this form, so `grep -rn "⚑ Flag" docs/` finds them all:

```markdown
> **⚑ Flag:** Wocument isn't on npm yet. This page assumes the first release is out. Until then, install from a clone of the repository (see [Install](../start-here/install.md#from-the-repository)).
```

Rules:

- One flag per open item, placed where the reader would trip over it.
- Say what is assumed, and what to do until it's true.
- Name a public typesetter issue when there is one ("typesetter issue 3"). Describe private planning items in words only: never link them.
- Add every flag to [`flags.md`](flags.md), so the maintainers can clear them in one pass.
- Flag ambiguity too: when the spec and the engine disagree, or when we chose between two readings, say which one the page follows.

## Technical accuracy

- **Explain what you find; never invent what you don't.** Every command, attribute, default, warning code and command-line option on a page must exist in the code today, or carry a flag.
- **Sources, in order of trust:** the code and its tests; the generated references (`skills/wocument/references/commands.md`, `capabilities.md`); the specification and the grammar; everything else.
- **Behaviour, not intention.** When the spec says one thing and the engine does another, document what the engine does and flag the gap.
- **Record evidence.** Add a line to [`evidence.md`](evidence.md) for each claim a reader would act on.

## Checking examples

Every `woc` fenced block that begins with frontmatter is a whole document, and must pass:

```
node docs/_meta/check-examples.mjs
```

The script extracts each one, runs `woc check` on it, and fails on any error. Warnings are allowed only when the page explains them.

## Review

A page is done after three separate reads, by three different people or agents:

1. **Fact check**: every technical claim against the code, every example through the engine.
2. **Edit**: flow, clarity, voice, headings, length. The editor never changes a command, value or claim without sending it back to the fact checker.
3. **First read**: someone who has never seen Wocument follows the page, and notes every place they hesitate.

## Templates

### Tutorial

```markdown
# <What you'll make>

<One or two sentences: what you'll have at the end, and roughly how long it takes.>

## What you need

## 1. <First step, as an action>
<Do this. Here's what you should see.>

## 2. ...

## What just happened
<The two or three ideas the reader just used, named and explained briefly, with links to Understand.>

## Next
```

### How-to guide

```markdown
# <Do the thing>

<What this gets you, in a sentence. Who it's for, if not obvious.>

## Before you start

## Steps

## Check the result

## If it doesn't look right
```

### Reference

```markdown
# <Name>

<One sentence: what this is.>

## <Tables: name, value, default, what it does>

## Examples

## Related
```

### Explanation

```markdown
# <The idea, as a plain statement>

<Why a reader should care.>

## The problem
## The idea
## How it works
## Why it works this way
## What it means for you
```
