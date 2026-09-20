# Spencer Tracy Brown — Portfolio

Standalone portfolio and professional website for Arizona artist, sculptor, creative fabricator, and educator Spencer Tracy Brown.

## Production domain

`https://spencertracybrown.com/`

GitHub Pages serves the site from the `main` branch at the repository root. The root `CNAME` file is intentionally set to `spencertracybrown.com`.

## Current state

The site is **PUBLIC / DISCOVERABLE**. Search indexing was intentionally enabled on September 4, 2026. The homepage, canonical artist profile, public CV, robots.txt, sitemap.xml, structured data, and search-discovery notifications are deployed; ongoing portfolio refinement can continue without reverting the public indexing state.

## Operating model

This repository uses an evidence-anchored branch-and-pull-request workflow modeled on the broader Ethereon build discipline.

- `main` is canonical and deployable.
- Meaningful changes begin from an observed `main` HEAD SHA.
- Work proceeds in one coherent increment per purpose-named branch.
- Pull requests must document intent, base evidence, concrete changes, portfolio impact, provenance, verification, limitations, deployment consequence, and the next breadcrumb.
- Direct-to-`main` changes are reserved for emergency production restoration and require a reconciliation PR afterward.

See [`docs/PORTFOLIO_PROTOCOL.md`](docs/PORTFOLIO_PROTOCOL.md) for the full operating protocol and [`CHANGELOG.md`](CHANGELOG.md) for meaningful merged history.

## Structure

- `index.html` — portfolio homepage
- `404.html` — branded not-found page
- `assets/css/styles.css` — standalone visual system
- `assets/portfolio-canon-r1/` — first deployed polished artwork canon
- `assets/images/` — reserved image/documentation area and image-handling notes
- `.github/pull_request_template.md` — required PR documentation scaffold
- `docs/PORTFOLIO_PROTOCOL.md` — repository operating protocol
- `CHANGELOG.md` — externally visible / structurally meaningful history
- `CNAME` — GitHub Pages custom domain
- `.nojekyll` — prevents Jekyll processing

## Current launch checklist

1. Add verified title, year, media/materials, dimensions, and credits for selected works.
2. Add a strong artist/studio portrait or intentional working image.
3. Add genuinely representative scenic / creative fabrication / shop documentation.
4. Add final CV/resume link or downloadable document.
5. Verify desktop and mobile presentation against the live GitHub Pages deployment.
6. Verify keyboard navigation, focus states, alt text, spelling, contact links, and permissions/credits.
7. Confirm HTTPS and custom-domain behavior remain healthy.
8. Keep canonical URLs, structured data, sitemap entries, and internal links aligned as the site evolves.
9. Treat any future return to `noindex` as an explicit site-state change through a documented PR.
