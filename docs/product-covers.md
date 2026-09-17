# Product-first covers

The product covers replace the abstract generated artwork in the index, detail
heroes and next-project links. The existing detail layouts, palettes, diagrams,
screenshots, notes and replay remain unchanged.

These covers are composed in HTML/CSS from actual screenshot pixels, recorded
events and source text. No image model redraws an interface or invents features.

## Sources

- Nine covers use the existing application/terminal captures in `public/project-media/`: Splendor, AlgoExplorer, 333gle, xv6, RSS Aggregator, Coding Practice, ClipHop, Propertize and Mems.
- PetClinic adds two existing repository screenshots, preserved as WebP copies in `public/project-media/product-source/`. [Jenkins history](https://github.com/Benjaminnnnnn/spring-petclinic/blob/main/screenshots/blue-ocean.png) and [VM application](https://github.com/Benjaminnnnnn/spring-petclinic/blob/main/screenshots/deployed-app-on-vm-and-accessed-from-host.png.png) are historical captures, not a claim of a current passing deployment. Browser chrome is excluded with CSS crops.
- Relay shows the five recorded events from `demonstrators/relay/experiments/2026-09-13-local.json`. Times are relative to enqueue and rounded. The styled log is labeled recorded, not a shipping admin dashboard or live service.
- SimpleDB shows an excerpt of [BufferPool.java](https://github.com/Benjaminnnnnn/simple-db/blob/main/src/java/simpledb/BufferPool.java), inspected during this revision. Code statements are unchanged; comments are shortened. This is a source-code presentation, not a fabricated query console or passing-test claim.
- Cypress shows a labeled reconstruction of [the implemented workspace setup form](https://github.com/Benjaminnnnnn/cypress/blob/main/src/components/dashboard-setup/dashboard-setup.tsx), inspected during this revision. It contains the workspace name, emoji, logo upload and create action. The earlier marketing illustration was inspected but not used as evidence of a complete editor. Controls on the cover are non-interactive presentation elements.

All source captures remain intact. Percentage crops preserve the original pixel
aspect ratio. The superseded generated WebP assets and prompt manifest remain on
disk for recovery but are no longer rendered on covers.

Implementation: `components/ProjectArtwork.tsx`, `data/product-covers.ts`,
`app/product-covers.css`. Captions distinguish captures, reconstruction, source
code and recorded events.

Cover headings contain only the project name: subtitles, corner badges and the
PetClinic overlay annotation have been removed. Next-project thumbnails also hide
headings and presentation notes. Footer typography is scoped to the link label so
it cannot enlarge text inside the thumbnail's miniature interface.

The project verifier checks all 13 cover types, absence of abstract cover images,
title overflow, image decoding, responsive layout and the existing detail-page
interactions. Visual snapshots include each individual product cover.
