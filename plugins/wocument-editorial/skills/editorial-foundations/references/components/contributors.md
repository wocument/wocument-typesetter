# Contributors

*Rule:* H2. Contributors: same portrait, same order, short bios. *Built by:* component-builder. *Status:* Approved.

## What it is

The contributors page introduces the people who made the issue: writers, photographers, illustrators.

Everyone gets a portrait of the same size, cropped the same way. Under each portrait: the person's name, what they did in this issue and on which page, and a short bio of two or three sentences.

On a phone, a small portrait sits to the left of each bio, so the list stays compact instead of becoming a long run of big photos.

## Example

"**Lee Kim** · Photographs, The quiet house, p. 48. Lee is a photographer based in Seoul who works mostly with natural light. This is her first story for us."

## The parts and how they relate

- **The parts, for each person:** a portrait (the same shape and crop for everyone), the name, their role and page in this issue, and a bio of 2 to 3 sentences, written in their voice or about their work in this issue.
- **Order:** the order of the issue (by page number), not by seniority or fame.
- **How it changes with the publication's style:** restrained publications use small portraits or none. Expressive ones use larger portraits and may arrange them in a stepped, uneven grid, but the portraits stay the same size.
- **On a phone:** one person per row, with the portrait 72 to 96 px wide to the left of the text.
- **Never:** mix photo portraits and drawn portraits in one list.

## Decide from the content

Use this page only when the edition has several named contributors and portraits for them (or a clear plan for drawn portraits). If some people have no portrait, use none for anyone rather than mixing. Bios come from what the contributors supplied; never invent a credential. The number of people decides the grid (F3): many people get an even grid, a few get larger portraits.

## On each screen

- Laptops and wide screens (1024 px and up): 3 people per row.
- Tablets (640 to 1023 px): 2 people per row.
- Phones (under 640 px): 1 person per row, with the portrait to the left of the text.

## In Wocument today

This is for the component builder skill. The portraits go through the image plan with one crop rule for all of them.

## Reference examples (only on the owner's computer)

If `${CLAUDE_PLUGIN_ROOT}/sources/corpus-index.json` exists, look at 2 or 3 entries under `components` → `author-portraits` whose `profile` matches the chosen profile (or `by_profile` → the profile → the same keys). Open the `marked` file to see the component in its spread. Use them to check proportion and hierarchy, then design in our own system. Never copy a layout, never quote their text, never ship the pictures. If the index does not exist, skip this step.
