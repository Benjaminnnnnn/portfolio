# Local verification

Verified September 14, 2026. Relay is prepared locally but has not been committed or published. GitHub Actions has not run remotely.

## Portfolio

Cover cleanup reverified September 15, 2026: subtitles and corner badges are
removed from all 13 covers. Next-project thumbnails hide presentation notes, and
their typography is isolated from footer labels. Responsive checks cover these
regressions; individual cover and thumbnail screenshots were inspected.

- `PORTFOLIO_BUILD_DIR=.next-verify npm run build`: passed production compilation, TypeScript checking, and static export.
- `npm run lint`: passed. This repository's lint command checks scripts; the production build checks application TypeScript.
- `npm run test:projects -- http://127.0.0.1:3109`: passed for 13 case studies and 61 visual panels at 320, 390, 768, 1440, and 2048px. Covers now include ten screenshot compositions, one recorded job-history demo, one source-code view, and one labeled UI reconstruction. Checks retain the nine large original interface captures, compact headings, expandable notes, image loading, full-image dialogs, Escape dismissal, restored focus, horizontal overflow, keyboard-operated crash replay, dark mode, and reduced motion. No JavaScript errors recorded.
- `npm run test:smoke -- http://127.0.0.1:3109`: passed for 14 routes, desktop/mobile layouts, and existing interactions. No page errors recorded.
- `git diff --check`: passed.

The original user modification to `next-env.d.ts` was restored after building. The shared development server on port 3000 was left untouched. The verified static export remains available at `http://127.0.0.1:3109` while its local server is running.

Screenshots are generated under the ignored `artifacts/portfolio/` directory. Desktop galleries for all 13 projects were visually reviewed against the supplied references, along with mobile project and gallery examples. The suite captures each desktop cover/gallery, mobile details, the project index, dark mobile layout, and recorded crash replay. The final structured result is `artifacts/portfolio/visual-verification.json`. See [visual redesign](visual-redesign.md) for the current design scope.

## Contact composition

Verified September 15, 2026 against the supplied current/expected screenshots.
The closing headline now reads “Let's create something extraordinary” in three
aligned rows. The contact glass model uses its upright authored orientation,
without the opening scene's scroll rotation; its tint direction is corrected
separately so the opening scene is unchanged. Seven existing textured die-cut
sticker assets replace all ten skill labels. The stickers are contained within
the contact section and retain the scoped GSAP reveal and reduced-motion behavior.

- `node scripts/verify-contact.mjs http://127.0.0.1:3109`: passed at 320, 390, 768, 1440, and 2048px. Checks cover three headline rows without clipping, seven loaded stickers, removal of the skill cards, reduced-motion sticker stability, no sticker leakage into the opening section, and no browser or shader console errors.
- Visually inspected the final desktop/mobile light and dark screenshots, plus the pointer-offset desktop view, for upright glass lettering, readable headline alignment, and sticker composition.
- Production build, TypeScript, script lint, and `git diff --check` passed. The 14-route smoke suite also passed during this revision.

Screenshots and structured results are in the ignored `artifacts/contact/` directory.

## Hero water shimmer

Verified September 15, 2026. Hovering over the glass “hello” now produces a
localized pool of animated, warm caustic highlights with gentle normal and
refraction ripples. The effect follows the pointer smoothly and fades on pointer
leave or window blur. Only hello materials enable it; reduced motion and touch
input disable it. No extra textures or rendering passes were added.

- `node scripts/verify-hero-water.mjs http://127.0.0.1:3109`: passed. Observes actual WebGL uniform uploads for hover strength, animation time, fade-out, reduced motion, hero-only activation, and touch suppression. No browser or shader console errors.
- Visually reviewed idle, two timed hover frames, a second hovered letter, and dark mode. Screenshots and results are under ignored `artifacts/hero-water/`.
- Production build/TypeScript, script lint, `git diff --check`, and the 14-route browser smoke suite passed after the shader change.

## Relay

- `go vet ./...`: passed.
- `go test -race -count=1 ./...`: passed against isolated PostgreSQL 17.10.
- `go test -race -count=1 -coverprofile=coverage.out ./...`: passed against Docker Compose PostgreSQL. Package statement coverage was 80.4% for HTTP API, 78.7% for the queue, and 24.3% for worker unit tests. Separate process experiments are not counted in these coverage figures.
- Tests exercise concurrent idempotent submission, distinct claims across workers, lease expiry and stale-token rejection, retry/dead-letter/replay behavior, tenant isolation, request limits, metrics, cancellation, and handler bounds.
- The experiment runner completed 3,000 jobs per configuration with 1, 4, and 12 execution slots: approximately 62, 255, and 862 jobs/second. These are single-host, single-trial measurements with a 10ms sleep and 1,000 hash iterations per job; they are not production capacity estimates.
- A real worker SIGKILL test recovered the job on attempt two in about 2.99 seconds after the kill. The expired worker's acknowledgment was rejected.
- Built `relay-verification:local` and verified non-root execution. Started PostgreSQL, the API, and three independent worker containers. Job `7060e77c5f8fcd8ba425f75bd7cd1325` intentionally failed once and succeeded on another worker; its stored events confirmed both attempts.

Raw experiment results: [`2026-09-13-local.json`](../demonstrators/relay/experiments/2026-09-13-local.json). Reproduction instructions and limitations are in the [Relay README](../demonstrators/relay/README.md) and its experiment documentation.

## Cleanup and remaining work

Stopped the isolated PostgreSQL test instance and removed the temporary `relay-verification` containers and network. Database files and the Compose volume were retained; containers can be recreated with Compose. Stopped the obsolete port-3108 preview. The current port-3109 preview remains running.

Automatic approval review rejected public publication because the exact repository contents and destination require explicit authorization. No publication command executed. Relay's portfolio source links remain disabled with a pending status. After approval, publish the prepared 26 files to public `Benjaminnnnnn/relay`, verify the remote workflow, enable the source links, and rerun the relevant portfolio checks. See [goal progress](goal-progress.md).
