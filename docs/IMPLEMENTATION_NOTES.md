# Implementation Notes

## Critical content should not depend on the art magnifier script

Historical note: `assets/js/art-magnifier.js` previously did more than magnifier behavior. It injected the Selected Press / Archive and Recognition / Features markup and their styles into the About section at runtime.

That created a visibility and verification hazard. If the script was cached, blocked, failed before the DOM enhancement ran, or a browser served an older asset while `index.html` had already deployed, press and recognition content could appear missing or stale even though the repository update was correct.

### Rule for future edits

When adding or changing content that should reliably exist in the document:

- Prefer semantic markup in `index.html`.
- Prefer presentation rules in CSS assets.
- Keep `assets/js/art-magnifier.js` focused on magnifier behavior and nonessential progressive enhancement.
- If content is ever temporarily JS-injected again, verify the live site after deployment with cache behavior in mind before diagnosing the change as failed.
- Check both desktop and mobile stacking because the press/archive layout changes from two-column rows to a single-column presentation on narrow screens.

### Cleanup status

Resolved on 2026-09-06. Selected Press / Archive and Recognition / Features now live directly in `index.html`; their presentation lives in `assets/css/enhancements.css`; and `assets/js/art-magnifier.js` is behavior-only.

The design intent remains: artwork and practice are primary; press and recognition are quiet provenance, not a resume wall.
