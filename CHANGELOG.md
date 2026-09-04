# Changelog

This changelog records portfolio changes that are externally visible, structurally meaningful, or important to repository continuity.

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
