# Hero Boundary Mark — R1

The homepage thesis, **“The boundary is never just a line.”**, is intentionally set across five lines:

- The
- boundary
- is never
- just a
- line.

The visual gesture joins the descender/stem area of the **j** in “just” to the **l** in “line,” turning the typographic boundary between two lines of text into a continuous line.

This treatment is implemented as live HTML rather than a raster/GIF asset so that:

- the heading remains readable by assistive technology through its `aria-label`,
- typography stays sharp at any display density,
- the connection can scale responsively with the heading,
- no decorative image download is required for the core thesis,
- the visual idea remains editable rather than being baked into pixels.

The generated transparent typographic study from the September 4, 2026 design session served as the visual reference for this implementation. The website version intentionally preserves the site's existing Libre Baskerville typography and restrained warm shadow rather than importing the study's stronger metallic/glow treatment wholesale.

## Review note

This is an aesthetic trial. Before merging, review the branch visually on desktop and mobile. The key success criterion is that the `j`→`l` continuation reads as deliberate typographic intent rather than accidental overlap.
