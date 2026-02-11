# Specification

## Summary
**Goal:** Make the marketing site and Admin view stable end-to-end, ensure builds/deploys succeed, and correct the backend’s default site content to Legend Techno Solutions-specific copy.

**Planned changes:**
- Smoke-test the Home view and Admin view in production-like conditions and fix any runtime errors, broken navigation, or broken section scrolling.
- Verify header navigation scrolls to the correct Home sections (Hero/Services/About/Contact) and fix any mismatches.
- Verify the /#/admin route renders without errors and supports returning back to Home; fix any routing/navigation issues.
- Update Motoko backend `defaultSiteContent()` values so a fresh deploy/empty state uses Legend Techno Solutions-appropriate hero/services/about/contact copy and business hours (computer/laptop repair, CCTV installation, networking).
- Fix any project configuration/build issues so frontend + backend build and deploy complete successfully, and validate core flows on the deployed site (Home renders, Contact form interactive when actor is ready, Admin route loads).

**User-visible outcome:** The deployed site loads reliably without console errors, navigation/scrolling works across Home sections, the Admin view route works and can return to Home, and fresh deployments show Legend Techno Solutions-specific default content instead of generic placeholders.
