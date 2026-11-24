# Fact box

*Rule:* H5. Fact box: beside the story wide, between paragraphs on phones. *Built by:* component-builder. *Status:* Approved.

## What it is

A fact box is a small box beside a story that holds the few facts a reader might want to check quickly: dates, prices, sizes, names, addresses.

On wide screens it sits beside the text, level with the paragraph it belongs to. On phones there is no room beside the text, so it becomes a full-width box placed right after that paragraph. It must never become a narrow strip squeezed beside the text.

## Example

A story about a house renovation has a box titled "The numbers": Size 120 m² · Budget €180,000 · Time 14 months · Architect Studio Rua. On a laptop the box sits beside the paragraph about the budget; on an iPhone it comes right after that paragraph, full width.

## The parts and how they relate

- **The parts:** a title, 4 to 8 pairs of label and value (the label bold, in the second voice), and an optional small picture.
- **Limits:** no sentence longer than one line. Anything longer belongs in the story itself.
- **Background:** either a tint one step darker than the paper, or a thin line above and below. Never a heavy border and a tint together.
- **How it changes with the publication's style:** restrained publications use thin lines only. Expressive ones use a coloured background from the profile's accent colour.
- **On a phone:** full width, after the paragraph it belongs to.

## Decide from the content

Make a fact box only when the brief lists facts a reader may want to check or compare: figures, dates, names, prices, a short timeline. Every value comes from the text or from sources the author supplied; a fact box never adds new facts. If there are more than about 8 items, the material wants a data page (F2) instead.

## On each screen

- Laptops and wide screens (1024 px and up): Beside the text, one column wide.
- Tablets (640 to 1023 px): Beside the text or after it, full width.
- Phones (under 640 px): Full width, after its paragraph.

## In Wocument today

The engine has a sidebar command (`\sidebar`) that can hold a title, text and a picture, but no lists. On wide screens it floats beside the text; on phones it takes the full width.

## Reference examples (only on the owner's computer)

If `${CLAUDE_PLUGIN_ROOT}/sources/corpus-index.json` exists, look at 2 or 3 entries under `components` → `sidebars` whose `profile` matches the chosen profile (or `by_profile` → the profile → the same keys). Open the `marked` file to see the component in its spread. Use them to check proportion and hierarchy, then design in our own system. Never copy a layout, never quote their text, never ship the pictures. If the index does not exist, skip this step.
