# Match native invitation to original PDF

Source: C:/Users/Dell/Downloads/THIỆP TIỆC CƯỚI (1).pdf, back design on page 1. Parsed and rendered locally with PyMuPDF; the printed body uses DFVN TAN MON CHERI and the couple names are outlines.

- [x] Use the back design's 369:511 aspect ratio and proportional block positions.
- [x] Size all typography relative to card width through CSS container units. Keep both script names on one line, accounting for the existing calligraphy font's extended glyph widths.
- [x] Match the family alignment, invitation rule, venue/address line breaks, printed time wording, combined weekday/lunar date, and two-line closing.
- [x] Preserve native selectable text and Vietnamese/English content; only the decorative paper texture is an image.
- [x] Inspect actual Chromium screenshots and DOM measurements at 320, 390 and 768px. Both names fit without wrapping or horizontal overflow.
- [x] Run targeted ESLint, diff whitespace check and production build.

Browser screenshots saved in the system temporary directory as wedding-html-320.png, wedding-html-390.png and wedding-html-768.png. No deployment performed.

Latest direction supersedes the print layout: remove the aspect ratio and absolute positioning, use natural document flow and 14–18px body type, a 24–30px venue and 30–36px date. Keep script names fitted to container width. Browser screenshots and measurements at 320, 390 and 768px confirm single-line names without overflow; body text wraps naturally. Targeted ESLint and production build passed.

