# Visual-first project redesign

September 14, 2026.

## Direction

The user supplied four screenshots after the first local design pass. They show
image-led project cards with small labels, a narrow article column, paired visual
panels, and compact technical writing. The final direction replaces the earlier
alternating image-and-text rows with that gallery structure.

The reference artwork is not copied into the portfolio. Project covers use
original CSS drawings or existing project interface captures. The old generated
`*-system.webp` images are not rendered.

## What changed

- All 13 projects have visual cards in the index. Smaller projects no longer sit in a text-only archive.
- Cards use small project names and category labels. Long summaries and stack lists are on the detail pages instead.
- Each detail page has a centered 860px reading column, a short introduction, and four visual panels.
- Galleries pair panels on desktop and stack them on mobile. Screenshot details open the original full image.
- The repeated overview, oversized metric tiles, alternating chapter layout, and “core loop” section are removed.
- Longer implementation notes remain available in a native expandable section.
- Scope notes remain visible, including team attribution, AI assistance, unfinished features, course frameworks, and measurement limits.
- The article scroll area stays between the fixed navigation and status controls, so those controls do not cover the gallery or captions.

The `no-ai-slop` skill guided copy edits. The changes cut repetition and generic
introductions, keep the technical facts, and use plain English. Full copy is in
`data/portfolio-projects.ts`, `data/systems-projects.ts`, and `data/project-visuals.ts`.

## Visual sources

`ProjectArtwork.tsx` draws the Relay, Splendor, SimpleDB, PetClinic, and xv6 covers
with CSS. Other covers frame existing interface captures. `StudyImage.tsx` crops
those captures in the browser, preserving their aspect ratios and access to the
full image. Crops are labeled as details of an existing screenshot, not extra
screens from the application.

`ProjectDiagram.tsx` draws project-specific explanations with selectable HTML
text. Diagrams are labeled as conceptual views rather than runtime output. The
Relay chart uses the recorded local experiment values; its replay uses recorded
job events. No new production measurements are claimed.

## Verification

The browser verifier checks all 13 pages for four visual panels, paired desktop
layout, compact headings, expandable notes, image loading, full-image dialogs,
Escape dismissal, restored focus, keyboard-operated Relay replay, and dark mode.
It checks horizontal overflow at 320, 390, 768, 1440, and 2048px.

Final result: passed for all 13 pages and 52 panels, with no browser errors.
Desktop galleries for every project and mobile examples were visually reviewed.
The production build, lint, existing 14-route smoke suite, and `git diff --check`
also passed. The user's original `next-env.d.ts` change was restored after building.

The production build checks application TypeScript. The lint command checks
scripts. The existing smoke suite checks all 14 routes and the site's navigation,
theme, sound, and scroll shortcuts.

Local screenshots and the final browser result are under the ignored
`artifacts/portfolio/` directory. The preview runs on `http://127.0.0.1:3109`.

This task changes the local portfolio. It does not publish Relay to GitHub or
deploy the portfolio. The earlier repository publication request remains a
separate approval item.
