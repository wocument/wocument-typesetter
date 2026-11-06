# Glossary

The terms you'll meet in the Wocument docs, in alphabetical order.

**Accent.** One of the five colour roles: the palette's one highlight colour, used for subheads, drop caps, links and pull-quote marks.

**Alpha channel.** The transparency in a picture file, such as a PNG cut-out. The engine traces it to find the outline that text wraps around.

**Anchor.** The place in a story where an object's command is written. An anchored object travels with the text there, and a floating one stays within a screen of it.

**Anchored object.** A picture, video, pull quote or other object written inside a story, between paragraphs, so it moves with the text across frames, scenes and screen sizes.

**Attribute.** A setting on a command, written `key=value` in square brackets: `[lines=3]`.

**Band.** One set of a frame's columns in a page scene, filled column by column and read on one screen. When the text goes on, a new band starts on the next screen.

**Baseline.** The line the letters of a line of text sit on.

**Baseline grid.** The even vertical rhythm every line of body text sits on, so lines in side-by-side columns line up. Its step is the grid's `baseline`.

**`bl`.** One baseline step, used as a unit: `2bl` is two lines of body text.

**Bleed.** An object extending through the margin to the screen's edge, with `bleed=left`, `right` or `both`.

**Breakpoint.** A named range of screen widths, such as `phone` or `wide`. Most attributes can take a different value at one: `columns@phone=1`.

**Canonical form.** The one standard way to write a file, which `woc format` produces: the same attribute order, spacing and indentation every time.

**Cascade.** The order in which definitions win: Vanilla, then the theme file, then the document, the scene's parent, the scene, the element, and a breakpoint value of any of them. Later wins, one attribute at a time.

**`col`.** One column of the scene's grid, used as a unit: `2col` is two columns and the gutter between them.

**Column.** One of a grid's vertical divisions, or one of a frame's internal columns of text (`columns=`).

**Command.** Everything that isn't plain text: a backslash, a name, attributes and a body, such as `\headline{The Night Bakers}`.

**Contour.** A non-rectangular outline that text wraps around: a circle, a polygon, or a cut-out's traced silhouette.

**Copyfitting.** Editing copy to fill the space it has. The copyfitting report from `woc check` says how many characters would fill each short screen.

**Cut-out.** A picture whose background has been removed (a PNG with transparency). With `shape=alpha`, text follows its silhouette.

**Deck.** The sentence or two under a headline that says what the article is about. Some magazines call it the standfirst.

**Design head.** The definitions at the top of a document, after the frontmatter: fonts, tokens, palettes, breakpoints, grids, styles, spots and parents.

**Drop cap.** A large first letter that sinks several lines into its paragraph, set with `\dropcap`.

**Exclusion.** The area an object takes away from the text around it.

**Explicit form.** A document with at least one `\scene`, where you lay out every scene and frame yourself.

**Fact box.** A box of related facts beside the story, written as `\sidebar`.

**Floating object.** An anchored object the engine may move on a wide page to the best spot within a screen of its anchor. On phones and tablets nothing floats.

**Fluid.** A size that grows with the screen's width between two values: `fluid(18px, 22px)`.

**Folio.** A small running label, such as the publication's name, shown in the margin of every screen.

**Frame.** A rectangle on a scene's grid that shows text: its own, or part of a story.

**Frontmatter.** The facts about an article between the two `---` lines at the top of a file: title, language, theme. Never design.

**Grid.** A named set of columns, gutters, margins and a baseline step that a scene's frames and objects are placed on.

**Grid-placed object.** An object written directly in a scene, with `cols=` (and `rows=` in a screen scene), that sits at that spot on the grid instead of travelling with the text.

**Gutter.** The space between two columns.

**Heading block.** The run of kicker, headline, deck, byline and meta at the start of a page, set in a frame of its own.

**Hero.** The largest picture size: across all, or all but one, of the columns at the top of a screen. One a screen.

**Implicit form.** A document with no `\scene`. The engine sets it as one magazine page, with a heading frame and a story frame in columns.

**Kicker.** The small label above a headline, naming the section or subject.

**Lede.** A larger opening paragraph that leads into the article.

**Linearize.** To stack a scene into one column, in source order, at a breakpoint where its placements don't fit the grid. The engine warns (`W031`) unless you asked for it.

**Measure.** The length of a line of text. A frame's `measure=` caps it; about 45 to 75 characters reads comfortably.

**Object.** A placed item that isn't running text: a figure, video, embed, audio, gallery, pull quote, fact box or group.

**Overset.** Text left over when a story's frames are full. A story's `overset=` says whether frames grow, the text is cut, or the check fails (only `grow` works today; see [Thread a story through scenes](../build/thread-a-story.md)).

**Page scene.** A scene with `height=page`: at least one screen tall, its columns set in bands one screen at a time on wide screens.

**Palette.** A named set of the five colour roles. Switching a scene's palette recolours everything in it.

**Parent.** A scene template, like a master page in print. A scene with `parent=` takes all its attributes and children.

**Positioned Document.** Every line and object box of a page, with exact coordinates, for one screen size. Layout makes it in the reader's browser from the Resolved Document. For developers.

**Pull quote.** A short line from the article, set large beside the text to catch the eye, written as `\pullquote`.

**Reading version.** Your whole article as plain HTML in one column, in story order, built into every page. Readers without JavaScript and search engines get it, and the page shows it if the layout fails.

**Resolved Document.** The engine's fully worked-out description of a page, with every value settled for every breakpoint. The reader's browser lays the page out from it.

**Reveal.** An enter or exit animation on a scene or object. Reveals never change the layout, and they turn off for readers who ask for reduced motion.

**Role.** One of the five colour names in a palette: `paper` (background), `ink` (text), `muted` (captions and small text), `accent` and `rule` (lines and borders). Styles name roles, not colours.

**Scene.** A full-width band of the article with its own grid, palette and height. Scenes stack top to bottom; a change of scene is the screen's page turn.

**Screen scene.** A scene with `height=screen`: exactly one screen tall, with frames and objects placed on rows as well as columns.

**Section.** In a page scene, the run of screens a frame's text fills before it ends. The columns on a section's last screen are balanced.

**Skill.** The Wocument Skill: instructions and reference material that teach Claude to write, design and check Wocument pages. See [Design with Claude](../build/design-with-claude.md).

**Slot.** A free stretch of a line beside the objects that cut into it, where text can be set.

**Spot.** A place a floating picture of one size may take on a wide page, such as a wide picture at the top of a screen across two or three columns. A theme lists them with `\spot`.

**Story.** A named run of text, with its subheads and anchored objects, that has no position of its own. Frames show it.

**Style.** A named set of type settings: family, size, leading, colour and more. Every text element uses the style with its own name.

**Subhead.** A short heading inside the article that breaks it into sections. Some magazines call it a crosshead.

**Test widths.** The screen widths `woc check` lays the page out at: 360, 768, 1280, 1470 and 2560px.

**Theme.** A `.woct` file of definitions that several documents share. A document loads one, with `theme:`.

**Thread.** The frames one story flows through, in order. When one frame is full, the text goes on in the next, even in a later scene.

**Token.** A named value, such as a colour or a length, defined with `\token` and used as `$name`.

**Vanilla.** The built-in theme every document starts from: its grid, palette, fonts, styles and spots.

**Visor.** An overlay in `woc dev` that shows the grid, the bands and the lines, and explains why each column ended and each picture went where it did. Press V on the page.

**Window.** The screens a floating object may land on: the one its anchor is on, the one before, or the one after.

**Wrap.** Text flowing around an object instead of under or over it. An object's `wrap=` says how.

## Related

- [Scenes, stories and frames](../understand/scenes-stories-frames.md): how the main terms fit together.
- [Commands and attributes](commands.md): the commands behind these terms.
