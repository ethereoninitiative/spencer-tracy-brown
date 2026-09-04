# Artwork Metadata Registry — Portfolio Canon R1

This registry is the truth-source for artwork metadata associated with the six images currently deployed in `assets/portfolio-canon-r1/`.

The public site currently uses descriptive portfolio labels and accessibility text, but does **not** claim verified artwork titles, dates, media, dimensions, exhibition history, ownership, or credits for these works. Those facts must be supplied or confirmed by Spencer Tracy Brown before they are published.

## Verification rule

Do not infer or invent missing metadata from filenames, appearance, memory, or prior portfolio copy. If a field is not verified, leave it `TBD`.

## Canon inventory

| Asset | Current public placement | Current public category / description | Title | Year | Media / materials | Dimensions | Exhibition / collection / credit notes | Verification status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `hero-hanging-assemblage.png` | Homepage hero | Selected sculpture / assemblage | TBD | TBD | TBD | TBD | TBD | Needs artist verification |
| `sculpture-organic-figure.png` | Selected Work I | Sculpture & Installation | TBD | TBD | TBD | TBD | TBD | Needs artist verification |
| `ceramics-lidded-vessel.png` | Selected Work II | Ceramics & Material Studies | TBD | TBD | TBD | TBD | TBD | Needs artist verification |
| `mixed-media-keys-between-figures.png` | Selected Work III | Drawing, Painting & Mixed Media | TBD | TBD | TBD | TBD | TBD | Needs artist verification |
| `sculpture-wooden-head.png` | Selected Work IV | Object & Creative Fabrication | TBD | TBD | TBD | TBD | TBD | Needs artist verification |
| `sculpture-raised-arms-figure.png` | About section | Selected figurative study | TBD | TBD | TBD | TBD | TBD | Needs artist verification |

## Existing descriptive text already deployed

These descriptions are present in `index.html` as accessibility or section text. They are descriptive identifiers, not formal artwork metadata.

- **Hero hanging assemblage:** hanging sculptural assemblage with a dark suspended form and cascading fiber-like material.
- **Organic figure:** organic figurative sculpture with textured earthy surfaces and an expressive twisting pose.
- **Lidded vessel:** handmade lidded ceramic vessel with mottled blue and warm orange glaze.
- **Keys between figures:** mixed-media figurative artwork with two faces confronting one another across a field of keys.
- **Wooden head:** carved wooden head sculpture with geometric planes and a painted eye element.
- **Raised-arms figure:** expressive glazed figurative sculpture with both arms raised.

## Publication gate

Artwork-specific metadata may be wired into `index.html` only after the relevant row has been verified. Partial verification is acceptable: verified facts can be published while unknown fields remain omitted.

When metadata is added to the public page, preserve the distinction between:

- formal title vs. descriptive working identifier,
- verified date vs. approximate recollection,
- exact material list vs. broad category,
- object dimensions vs. photographed image dimensions,
- exhibition history vs. general professional context.

## Next action

Populate the registry from artist-held records, labels, old portfolio files, photographs, exhibition documentation, or direct artist recollection. Then make a second commit in this branch wiring only verified fields into the relevant figures/cards in `index.html`.
