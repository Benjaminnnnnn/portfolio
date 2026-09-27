# Marketing images and UI reworks

Every project card and case-study hero uses a marketing composition from
`public/project-media/marketing/<slug>.webp` (2400×1500). Backgrounds, window
frames, headlines and chips are composed in `scripts/marketing/studio.html`.
The screens inside the frames are real: interface captures, source excerpts,
recorded runs, or API schema text. Each image carries a small provenance line
in its bottom-right corner, and the same text appears under the case-study
hero (`data/project-marketing.ts`).

## Rebuilding

```bash
# 1. Clone the project repositories into demonstrators/ (gitignored) and run
#    the captures described below.
# 2. Crop and convert captures into scripts/marketing/captures/
node scripts/marketing/prepare.mjs
# 3. Render all compositions (or pass slugs)
node scripts/marketing/render.mjs [slug ...]
```

`prepare.mjs` reads from `demonstrators/`, so it only runs on a machine with
the clones and capture PNGs. The committed WebP files are the output.

## Sources per project

| Project | Inside the frame | How it was captured |
| --- | --- | --- |
| Relay | Recorded job events and the local throughput runs | Text from the recorded experiment already on the case study |
| Handpick | App Store screenshots | `Marketing/AppStore/final/01–03` in the handpick repo, phone crops |
| Splendor | Reworked home page; real four-player game | Local build of the repo; four browser sessions joined one lobby, board state set through the repo's test-state endpoint |
| AlgoExplorer | Reworked explore page; A* run with the tutor panel | Local build, A* played to completion |
| SimpleDB | `BufferPool.getPage` | Source excerpt from the repository, lines 75–91 |
| PetClinic / DevOps | Grafana, SonarQube | Screenshots committed in the repo's `screenshots/`, bookmarks bar cropped out |
| 333gle | Search results; `HttpServer.cc` accept loop | Existing capture; source excerpt from the repository |
| xv6 | Shell session | Existing capture (not a new test run) |
| RSS Aggregator | Swagger UI; feed request example | Existing capture; example values from `docs/swagger.json` |
| Cypress | Reworked landing page | Local build with placeholder Supabase settings |
| Coding Practice | Reworked problem list; Two Sum workspace | Local build, bundled problem data |
| ClipHop | Reworked feed | Local build reading the project's public Sanity dataset |
| Propertize | Dashboard, property detail | Screenshots committed in the repo's `demo_imgs/` (demo figures) |
| Mems | Saved places | Existing capture with demo posts |

## UI reworks

Five project UIs were restyled with patterns adapted from
[Aceternity UI](https://ui.aceternity.com/) (Spotlight, Background Beams,
Lamp, Hero Highlight, Card Spotlight, Moving Border, 3D Card). The changes were
made in local clones and captured from running builds. They are not pushed to
the project repositories; each is saved as a patch against that repository's
default branch:

| Repository | Patch | What changed |
| --- | --- | --- |
| algo-explorer | `docs/reworks/algo-explorer.patch` | Aurora dark theme, spotlight + meteor hero, glowing category cards, luminous pathfinding grid |
| splendor | `docs/reworks/splendor.patch` | Gold lamp hero with floating gem tokens, 3D hand of real card art, moving-border CTA |
| leetcode-clone | `docs/reworks/leetcode-clone.patch` | Background-beams hero, difficulty bento, topic marquee, pill difficulty rows, offline problem fallback |
| cypress | `docs/reworks/cypress.patch` | Hero highlight with cursor-lit dot grid, honest feature list, scroll-flattening 3D product frame |
| cliphop | `docs/reworks/cliphop.patch` | Night theme with aurora backdrop and rotating neon ring around videos |

Apply one with `git apply docs/reworks/<repo>.patch` inside that repository.
