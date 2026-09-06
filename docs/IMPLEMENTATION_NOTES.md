# Implementation Notes

## Critical content should not depend on the art magnifier script

`assets/js/art-magnifier.js` currently does more than magnifier behavior: it injects the Selected Press / Archive and Recognition / Features markup and their styles into the About section at runtime.

This creates a visibility and verification hazard. If the script is cached, blocked, fails before the DOM enhancement runs, or a browser serves an older asset while `index.html` has already deployed, press and recognition content can appear missing or stale even though the repository update is correct.

### Rule for future edits

When adding or changing content that should reliably exist in the document:

- Prefer semantic markup in `index.html`.
- Prefer presentation rules in `assets/css/styles.css`.
- Keep `assets/js/art-magnifier.js` focused on magnifier behavior and nonessential progressive enhancement.
- If content must temporarily remain JS-injected, verify the live site after deployment with cache behavior in mind before diagnosing the change as failed.
- Check both desktop and mobile stacking because the press/archive layout changes from two-column rows to a single-column presentation on narrow screens.

### Current cleanup target

Migrate the Selected Press / Archive and Recognition / Features markup out of `art-magnifier.js` into `index.html`, migrate the related CSS into `assets/css/styles.css`, and then remove the corresponding DOM/style injection from the magnifier script without changing the visible hierarchy.

The design intent remains: artwork and practice are primary; press and recognition are quiet provenance, not a resume wall.
