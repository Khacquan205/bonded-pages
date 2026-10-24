# Spotify music button

Updated direction: show only a fixed circular play/pause button, with no visible Spotify panel. Load Spotify on mount and request playback when ready. Browser autoplay restrictions can still require a click on the music button; Spotify controls track/preview availability.

- [x] Keep the Spotify iframe mounted in an inert, visually hidden host.
- [x] Attempt playback on ready; call play/pause directly from button clicks and derive state from Spotify events.
- [x] Remove the panel, collapse controls, secondary Spotify button, and buffering spinner. Keep bounded loading and retry on connection failure.
- [x] Preserve Vietnamese/English accessibility labels and position above the RSVP button.
- [x] Run targeted ESLint and production build: both passed.

Actual Spotify playback and browser autoplay behavior have not been verified in a real browser. No deployment performed.

Follow-up: retry blocked autoplay from trusted page clicks/taps and key presses until Spotify confirms playback. Skip the music button to prevent duplicate commands, respect manual pause, and remove gesture listeners on playback, load failure, timeout, or unmount.
