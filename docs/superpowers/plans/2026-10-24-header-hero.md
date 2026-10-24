# Header and full-width hero layout

Requested layout: a navbar that scrolls with the document, a full-width photo without a frame or rounded corners, and compact invitation details.

- [x] Replace the fixed navbar with a normal-flow header; remove scroll-based styles and body scroll locking.
- [x] Anchor the mobile dropdown to its header, support Escape, and adjust section scrolling for a non-sticky navbar.
- [x] Remove mobile photo margins, border, shadow, and rounded corners; keep script lettering inside the photo.
- [x] Group venue, date, RSVP and scroll cue underneath on mobile. Use photo/details columns on desktop to avoid excessively cropping the portrait.
- [x] Run targeted ESLint and production build; inspect diff whitespace.

No new dependencies or deployment. Visual behavior has not been verified in a browser.

Updated request: overlay the navbar on the photo using absolute positioning within the invitation, remove the cream bar, use the cream monogram and light mobile controls with a subtle gradient, and move Save lettering below the controls. The navbar still scrolls with the document.
