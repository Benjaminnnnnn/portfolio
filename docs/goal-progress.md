# Earlier repository work

Updated September 14, 2026. This file records the earlier Google-role and repository work. Public Relay publication still needs approval. The current visual-only redesign is tracked separately in [visual-redesign.md](visual-redesign.md); publication is not part of that task.

## Requested outcome

Evaluate current Google roles and Benjamin's public GitHub, build substantial demonstrative repositories for missing evidence, and reorganize the portfolio projects with strong visuals and plain student-level writing.

## Completed locally

- Read three relevant Google Careers descriptions and assessed the public repository inventory. `google-project-audit.md` includes direct sources, eligibility distinctions, implementation findings, and portfolio gaps.
- Inspected Poreia's actual provider and Spotlight's tree. Recommended evaluating the existing AI project rather than creating an overlapping AI application. Relay addresses a distinct systems gap.
- Built the standalone Relay repository at `demonstrators/relay/`: 26 prepared files, Go API, PostgreSQL queue, independent workers, leases/heartbeats/fencing, idempotency, backpressure, retries/dead letters/replay, events/metrics, tests, a process experiment runner, Docker Compose, CI, architecture/failure/operations documentation, MIT license, and a study guide.
- Race-enabled PostgreSQL tests passed locally and against containerized PostgreSQL. `go vet ./...` passed. The HTTP and queue packages recorded 80.4% and 78.7% statement coverage; worker unit coverage was 24.3%. Separate process experiments exercise worker startup, execution, heartbeat, and crash recovery but are not included in those unit coverage numbers.
- A recorded 9,000-job experiment tested 1, 4, and 12 execution slots across up to three independent processes. Raw measurements are in `demonstrators/relay/experiments/2026-09-13-local.json`. A real SIGKILL recovery test succeeded on attempt two and rejected the old worker token.
- Built and started a non-root containerized API, PostgreSQL, and three workers. A submitted job failed once and succeeded on a second worker; the persisted event history confirmed the retry.
- The first portfolio pass organized 13 case studies into three featured projects, four systems/coursework studies, and six archive entries. The later reference-led redesign replaces that layout with a visual gallery. SimpleDB, PetClinic attribution, and Relay's recorded replay remain.
- Rewrote project copy using no-ai-slop. Removed unsupported million-file claims, Cypress AI/version-history claims, and unverified kernel ownership claims. Replaced the inherited Taiwan clock with Pittsburgh time.
- Production builds and lint passed. Browser checks passed for all 13 project pages at 390, 768, and 1440px, with keyboard replay, dark mode, reduced motion, and zero JavaScript errors. Final post-edit smoke verification is recorded in `verification.md`.

## Publication approval required

Automatic approval review rejected the command that would commit and publicly publish `Benjaminnnnnn/relay`. Its stated reason was that the exact payload and public destination were not explicitly authorized by trusted user content. The command did not execute; there is no commit or remote in the prepared standalone repository.

The proposed public payload is exactly the 26 staged files in `demonstrators/relay/`, including source, tests, documentation, local demo credentials, raw local benchmark results, deployment recipes, CI, and license. Real credentials and environment files are not included. Publication would expose these files publicly at `https://github.com/Benjaminnnnnn/relay`.

After explicit approval:

1. Recheck the prepared diff and repository destination. Commit the standalone repository and create/push the public GitHub repository.
2. Verify the remote commit and monitor its GitHub Actions workflow. Fix any actual failures.
3. Remove `sourceStatus: "pending"` from Relay in `data/systems-projects.ts`; verify every enabled source/evidence link.
4. Update publication status in the portfolio README and verification notes, rebuild, and rerun the relevant browser checks.
5. Audit the full objective before marking the goal complete. No portfolio deployment or update to the user's existing public repositories has been performed.

## Workspace notes

- The original modification to `next-env.d.ts` imports `.next/dev/types/routes.d.ts`. It was restored after builds; preserve it.
- The shared development preview on port 3000 predated this task's verification. Do not stop it.
- `PORTFOLIO_BUILD_DIR=.next-verify npm run build` writes the static export to `.next-verify/`, not `out/`. The normal build still uses `out/`.
- Browser previews are in ignored `artifacts/portfolio/`. `npm run test:projects -- URL` produces them.
- `demonstrators/` is ignored by the portfolio because Relay is a standalone nested Git repository, not a portfolio dependency.
- GitHub, Docker, and browser access work with sandbox escalation. No permission rejection should be bypassed.
