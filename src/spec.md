# Specification

## Summary
**Goal:** Enhance the marketing site with a hero video background, dark theme by default, a cookie consent banner, and a public customer ratings feature (including admin review).

**Planned changes:**
- Add a looping, muted, autoplay hero background video behind existing Hero content with an overlay for readability and a graceful fallback to the current hero background image if the video fails to load.
- Switch the app to dark theme by default across Home/marketing sections and the Admin page, ensuring readable contrast for text, borders, cards, tables, inputs, and CTAs.
- Add an English cookie consent/notice banner with at least an “Accept” action (optionally “Decline”), persist the user’s choice locally, and keep it accessible.
- Implement a public ratings feature: backend methods to create and list 1–5 star ratings (optional comment, timestamp, most-recent-first), and a new “Ratings” section after Contact to submit and view recent ratings (updates without full reload).
- Extend the Admin dashboard to display submitted ratings in a simple most-recent-first table/list with an English empty state when none exist.

**User-visible outcome:** Visitors see a video hero background, the site loads in dark mode by default, a cookie notice appears until dismissed, and users can submit/view ratings on the Home page; admins can review ratings in the Admin dashboard.
