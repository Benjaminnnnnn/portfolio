# Local verification

Verified September 14, 2026. Relay is prepared locally but has not been committed or published. GitHub Actions has not run remotely.

## Portfolio

- `PORTFOLIO_BUILD_DIR=.next-verify npm run build`: passed production compilation, TypeScript checking, and static export.
- `npm run lint`: passed. This repository's lint command checks scripts; the production build checks application TypeScript.
- `npm run test:projects -- http://127.0.0.1:3109`: passed for 13 case studies and 52 visual panels at 320, 390, 768, 1440, and 2048px. Checked the image-led index, paired narrow galleries, compact headings, expandable notes, image loading, full-image dialogs, Escape dismissal, restored focus, horizontal overflow, keyboard-operated crash replay, dark mode, and reduced motion. No JavaScript errors recorded.
- `npm run test:smoke -- http://127.0.0.1:3109`: passed for 14 routes, desktop/mobile layouts, and existing interactions. No page errors recorded.
- `git diff --check`: passed.

The original user modification to `next-env.d.ts` was restored after building. The shared development server on port 3000 was left untouched. The verified static export remains available at `http://127.0.0.1:3109` while its local server is running.

Screenshots are generated under the ignored `artifacts/portfolio/` directory. Desktop galleries for all 13 projects were visually reviewed against the supplied references, along with mobile project and gallery examples. The suite captures each desktop cover/gallery, mobile details, the project index, dark mobile layout, and recorded crash replay. The final structured result is `artifacts/portfolio/visual-verification.json`. See [visual redesign](visual-redesign.md) for the current design scope.

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
