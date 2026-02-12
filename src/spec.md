# Specification

## Summary
**Goal:** Rename the company across the site to “ALGLOE TECHNO SOLUTIONS” and make the header larger with the company name prominently visible on all screen sizes.

**Planned changes:**
- Replace all user-facing occurrences of “Legend Techno Solutions” with “ALGLOE TECHNO SOLUTIONS” across the marketing site UI and shared metadata (header/footer branding text, aria-label/alt text including logo lightbox, and `frontend/index.html` title/meta description where applicable).
- Increase the header’s overall size (container height and/or logo/text sizing) while keeping navigation responsive, unclipped on desktop, and the mobile menu usable without overlapping page content.
- Ensure “ALGLOE TECHNO SOLUTIONS” is always visible in the header branding area across breakpoints (including mobile), while preserving existing logo click/tap lightbox behavior.
- Update backend `defaultSiteContent()` defaults to use “ALGLOE TECHNO SOLUTIONS” wherever the old name appears, without migrating or altering already-stored site content.

**User-visible outcome:** The site consistently shows “ALGLOE TECHNO SOLUTIONS” (including page title/metadata), and the header is visibly larger with the company name clearly displayed next to/near the logo on both desktop and mobile.
