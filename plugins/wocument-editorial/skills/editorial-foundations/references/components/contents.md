# Contents page

*Rule:* H1. Contents: number, title, line, credit. *Built by:* component-builder. *Status:* Approved.

## What it is

The contents page is a map of the issue. Readers scan it in one fixed order, so it is designed in that order: first the page number, then the title of the story, then one line saying what the story is about (the "deck"), and last, smallest, who wrote or photographed it (the "credit").

One picture usually sets the mood of the issue. How the page looks depends on the publication's style: a quiet, text-first publication drops the picture and uses a single list; a loud glossy makes the page numbers the biggest type on the page.

On a phone, the entries become a single list, one entry per row, with the page number on the left so the reader can scan down one edge.

## Example

"**48** The quiet house — An architect builds a home that keeps the morning light. *By Ana Ruiz, photographs by Lee Kim*". On a laptop, six such entries sit beside a large picture. On an iPhone they become a list under a smaller picture.

## The parts and how they relate

- **The parts, in order:** the section name, the issue's title, the entries, and an optional picture. Each entry has a page number, a title, a one-line description and a credit.
- **What is biggest:** the page number and the title carry the page. The description is one size smaller. The credit is the smallest, in the second voice (a different typeface or colour, see D1).
- **How it changes with the publication's style:** a restrained publication uses no picture, one column of text, and puts the author's name first (as a literary weekly does). An expressive one makes the page number the largest type on the page and uses one big picture.
- **Limits:** never more than one line of description per entry. Group entries by section, with a small label for each section.
- **On a phone:** one entry per row, with the page number to the left of the title, so the list can be scanned down one edge.

## Decide from the content

How many entries, and how they are grouped, comes from the edition itself: group by the sections the edition really has, and list every article in reading order. The picture, when there is one, is the edition's strongest picture, not a new one. The dial (E1) sets the loudness: a restrained edition uses no picture and puts the author first; an expressive one makes page numbers (or, on screens, the order numbers) the biggest type. On screens there are no page numbers: use the order number of each article, or nothing, and make the whole entry a link.

## On each screen

- Laptops and wide screens (1024 px and up): The picture beside a list of entries; page numbers large.
- Tablets (640 to 1023 px): The picture on top; entries in 2 columns.
- Phones (under 640 px): A small picture on top; one entry per row, number on the left.

## In Wocument today

This is for the component builder skill. The engine has no list command yet, so each entry is made of a subhead and a line of text.

## Reference examples (only on the owner's computer)

If `${CLAUDE_PLUGIN_ROOT}/sources/corpus-index.json` exists, look at 2 or 3 entries under `components` → `contents` whose `profile` matches the chosen profile (or `by_profile` → the profile → the same keys). Open the `marked` file to see the component in its spread. Use them to check proportion and hierarchy, then design in our own system. Never copy a layout, never quote their text, never ship the pictures. If the index does not exist, skip this step.
