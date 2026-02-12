# Specification

## Summary
**Goal:** Make the “Years Experience” and “Happy Clients” hero stats clickable to open a modal showing a scrollable list of numbers 1–1000, and remove the “24/7 Support Available” stat.

**Planned changes:**
- Update `frontend/src/components/sections/HeroSection.tsx` so the “Years Experience” and “Happy Clients” stat blocks are clickable/tappable and open a modal/dialog without leaving the page.
- Implement the modal content as a visible, scrollable list displaying numbers 1 through 1000 (inclusive), sized to avoid viewport overflow on mobile/desktop, with close controls (and Escape-to-close if supported by existing patterns).
- Remove the “24/7” / “Support Available” stat from the hero stats area and adjust the layout so it remains responsive and visually balanced with the remaining stats.

**User-visible outcome:** On the Home page, users can click “Years Experience” or “Happy Clients” to open a closable modal showing a scrollable list of numbers from 1 to 1000, and the “24/7 Support Available” stat is no longer shown.
