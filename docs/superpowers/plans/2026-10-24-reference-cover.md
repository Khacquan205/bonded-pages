# Reference-style wedding cover

Approved design: a nearly full-screen portrait with a small handwritten heading above, couple names and date over the lower photo, and navigation and invitation details following the cover.

- [x] Replace split Save/the date graphics with live text using the existing Alex Brush font.
- [x] Use a 92svh portrait cover, bottom shading, white couple names and date. Preserve the full portrait on wide screens with a softly blurred photo background.
- [x] Move the normal-flow navigation after the cover and use dark controls on cream.
- [x] Keep venue and RSVP below navigation. Make floating RSVP appear only after its original slot has scrolled out above the viewport.
- [x] Reduce music button to 40px and place it near the lower right; raise it when the floating RSVP is present.
- [x] Production build and targeted ESLint passed. Actual responsive appearance still needs browser review.

No dependencies added and no deployment performed.

Reverted at user request: restored the previous Save/the date photo layout, overlaid navbar, venue/date/RSVP below the photo, original sticky threshold, and original music button appearance. Spotify playback behavior is preserved.
