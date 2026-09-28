# Work specimens

The Work index and case-study heroes use **specimens**, not posters: one flat
colour field per project holding a single object made from that project's own
material (`components/specimens/Specimen.tsx`, `app/specimens.css`). Each has
one hover gesture — the job log flips like a departures board, the photo is
swiped away with a DELETE stamp, the card hand fans, the A* path draws itself,
a buffer page gets evicted, pipeline stages pop, the Two Sum cases pass.

Sources are listed in `data/project-meta.ts` and shown under each case-study
hero. Real imagery comes from Handpick's CC0 demo library, Splendor's card art,
and crops of existing captures; `scripts/specimens/assets.mjs` rebuilds them
into `public/project-media/specimens/`.

The earlier marketing-poster, WebGL-shader and tilt/glow treatment was removed
because it read as generic.

## Case-study screenshots

Interface captures inside case studies come from local runs of the project
repositories:

```bash
# Clone repositories into demonstrators/ (gitignored) and capture, then:
node scripts/marketing/prepare.mjs   # crop + convert into scripts/marketing/captures/
node scripts/marketing/covers.mjs    # publish the reworked-UI covers
```

## Capture sources per project

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
