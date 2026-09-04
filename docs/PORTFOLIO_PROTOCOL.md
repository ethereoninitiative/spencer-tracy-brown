# Spencer Tracy Brown Portfolio — Operating Protocol

This repository is a professional portfolio and public-facing identity artifact. It is managed with the same truth-first, evidence-anchored, incremental discipline used for larger Ethereon build work.

## Core rule

`main` is canonical and deployable. Meaningful changes do not go directly to `main`.

Before beginning work, record the observed `main` HEAD SHA and anchor the increment to that exact repository state. Repository evidence outranks memory, assumptions, aesthetic preference, or prior chat context.

## Change model

1. Observe current `main` HEAD.
2. Define one coherent increment.
3. Create a purpose-named branch from the observed HEAD.
4. Make the smallest complete set of changes that accomplishes the increment.
5. Inspect the diff and verify the rendered/site-facing consequences.
6. Open a pull request with a complete description.
7. Merge only after the PR truthfully explains what changed, what was verified, and what remains unresolved.
8. Record the resulting merge in `CHANGELOG.md` when the change is externally visible or structurally meaningful.
9. Leave a clear breadcrumb for the next increment.

Emergency direct-to-`main` changes are reserved for restoring a broken production site. Any such change must be followed by a reconciliation PR that documents what happened and returns the repository to normal governance.

## Branch naming

Prefer concise names that describe the increment, for example:

- `portfolio-content-r2`
- `portfolio-artwork-metadata-r1`
- `portfolio-fabrication-section-r1`
- `portfolio-cv-r1`
- `portfolio-mobile-polish-r1`
- `portfolio-launch-r1`
- `fix-broken-image-path`

## Pull request standard

Every PR should answer:

- **Intent** — what problem or opportunity this increment addresses.
- **Base evidence** — the `main` SHA the work started from.
- **Changes** — concrete files/content/behavior changed.
- **Portfolio impact** — what a visitor, applicant reviewer, curator, or collaborator will experience differently.
- **Truth / provenance** — what claims, artwork metadata, image treatments, credits, or source materials support the change.
- **Verification** — what was actually checked.
- **Known limitations** — missing metadata, incomplete sections, deferred work, or unresolved risks.
- **Deployment consequence** — whether merge changes the live GitHub Pages site, indexing, domain behavior, or share previews.
- **Next breadcrumb** — the most useful next increment.

A PR description is part of the artifact history, not administrative filler.

## Truth and provenance rules

### Artwork metadata

Do not invent titles, dates, media, dimensions, exhibition history, ownership, or credits. If metadata is unknown, mark it as unknown/TBD internally or omit it publicly until verified.

### Image treatment

Portfolio image refinement may improve documentation but must not silently redesign the artwork. Acceptable presentation work includes crop, perspective correction, exposure/white-balance adjustment, distraction removal, and restrained background cleanup. If an edit materially changes the apparent artwork, scale, installation, or physical structure, it must not be presented as documentary photography without explicit disclosure.

Original source images should remain preserved outside the deployment directory. Web-ready derivatives are deployment assets.

### People and permissions

Do not publish student-identifying imagery, private information, or third-party copyrighted material without permission or a clear lawful basis. Prefer artwork-only, process-only, or non-identifying documentation when permission is uncertain.

## Site states

### STAGING

- Direct URL may be used for review/application purposes.
- `noindex, nofollow` remains active.
- Incomplete metadata or sections may remain if they do not misrepresent the work.

### APPLICATION READY

- Primary visual canon is deployed.
- Critical links, responsive layout, accessibility basics, and contact information are verified.
- The site may still remain `noindex` if broad public discovery is not yet desired.

### PUBLIC / DISCOVERABLE

- Search indexing is intentionally enabled.
- Artwork metadata and credits have received a truth/provenance pass.
- Social preview imagery, CV/resume, mobile layout, keyboard navigation, and public permissions have been verified.

Moving between states is itself a deliberate PR.

## Merge discipline

Prefer one coherent increment per PR. A PR should be understandable months later without reconstructing the conversation that produced it.

When a PR is merged, preserve:

- the intent,
- the evidence base,
- the verification performed,
- the limitations,
- and the next breadcrumb.

The goal is not bureaucracy. The goal is continuity: the website should remain understandable, reversible, and extensible even after long gaps between work sessions.
