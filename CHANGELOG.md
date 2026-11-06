# Changelog

This changelog records portfolio changes that are externally visible, structurally meaningful, or important to repository continuity.

## 2026-11-06 — Luminous Threads framing and medium correction (PR forthcoming)

- Removed the fixed 4:5 crop from `Luminous Threads` in the About archive, so the original photograph renders at its natural proportions across desktop and mobile.
- Corrected the artwork description and image alternative text from a flat painting to a shallow mixed-media relief with applied string and textured medium.
- Left all other artwork frames, captions, and the overall site layout unchanged.

## 2026-11-06 — Stone Container artwork study (PR #36)

- Added the artist-confirmed *Stone Container: A White Surface Without Sunlight, Dark Blue, and a Little Yellowish Red* in the Ceramics & Material Studies area without replacing the commissioned vessel or teapot.
- Published five restrained documentary photograph edits through a manual, touch-friendly, keyboard-accessible gallery with a short expandable artist note and shareable artwork anchor.
- Preserved the existing aesthetic and slideshow implementations; the gallery uses isolated CSS/JS and does not auto-advance.
- Registered the artist-provided title, approximate date, surface description, image provenance, and unknown dimensions in artwork metadata.

## 2026-09-20 — Search indexing reconciliation

- Confirmed the production homepage and artist profile are explicitly indexable and self-canonical.
- Added a discoverable homepage-to-profile author link and aligned the homepage Person graph with the canonical profile page.
- Refreshed the homepage sitemap modification date.
- Expanded IndexNow notifications to the homepage, artist profile, public CV, and sitemap.
- Reconciled repository documentation with the site’s PUBLIC / DISCOVERABLE state.

## 2026-09-04 — Foundation before formal PR governance

These changes were made directly on `main` before the portfolio adopted the branch/PR operating protocol. They are preserved here so the early build remains legible rather than disappearing into undocumented history.

### Domain and deployment foundation

- Established the standalone repository `ethereoninitiative/spencer-tracy-brown`.
- Configured GitHub Pages for the production domain `spencertracybrown.com`.
- Added `CNAME`, `.nojekyll`, branded `404.html`, production metadata, and staging `noindex, nofollow` behavior.

### Initial portfolio structure

- Established the artist-first information architecture and visual system.
- Positioned Spencer Tracy Brown as Artist · Sculptor · Creative Fabricator · Educator.
- Added artist statement, about, practice/leadership, education, and contact sections.

### First visual canon deployment

- Added six polished portfolio assets under `assets/portfolio-canon-r1/`.
- Replaced placeholder artwork blocks with real portfolio imagery.
- Deployed the hanging assemblage as hero/social-preview artwork.
- Added sculpture, ceramics, mixed-media, object/fabrication, and figurative-study imagery.
- Preserved `noindex, nofollow` while the site remains in staging/application-ready development.
- `main` commit after first canon deployment: `2a42c1c5f3a3ade42793877115ef042360aec449`.

## Governance adoption

Beginning with the governance PR that introduces `docs/PORTFOLIO_PROTOCOL.md` and `.github/pull_request_template.md`, meaningful changes should flow through purpose-named branches and documented pull requests rather than direct commits to `main`.

Future entries should reference the merged PR number and summarize the externally visible or structurally meaningful consequence of the merge.
