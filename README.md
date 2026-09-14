# Benjamin Zhuang — portfolio

Personal portfolio of Benjamin Zhuang, built as a typed Next.js 16 application
and deployed to GitHub Pages as a static export.

> **Provenance.** The visual shell and front-end implementation were recovered
> from the public deployment at [haoqi.design](https://haoqi.design/) by Haoqi
> Wen. Every visible biography, project card, project image, repository link,
> project description now refers to Benjamin's projects. Course frameworks,
> team scope, and AI assistance are identified in the relevant case studies.
> The project gallery, cover drawings, explanatory diagrams, and Relay experiment
> replay were added for this redesign. The original archive remains under `src/`.

## Run locally

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run build
python3 -m http.server 3000 --directory out
npm run test:smoke -- http://127.0.0.1:3000
npm run test:projects -- http://127.0.0.1:3000
```

To verify alongside an existing development server:

```bash
PORTFOLIO_BUILD_DIR=.next-verify npm run build
python3 -m http.server 3109 --bind 127.0.0.1 --directory .next-verify
npm run test:projects -- http://127.0.0.1:3109
```

With static export, this custom build directory contains the exported site.
The normal build still writes to `out/`. Browser checks require Google Chrome;
set `CHROME_PATH` if it is installed somewhere other than the default macOS path.

## Stack

- Next.js 16.2.12 App Router
- TypeScript 7.0.2
- React 19.2.8
- Three.js r184 with direct, typed render graphs
- GSAP with `useGSAP` and ScrollTrigger

## Portfolio content

- Thirteen image-led project cards in a staggered gallery
- Narrow detail pages with a short introduction, four visual panels, and expandable implementation notes
- Project writing in `data/portfolio-projects.ts` and `data/systems-projects.ts`
- Gallery captions, screenshot crops, and scope notes in `data/project-visuals.ts`
- Existing interface captures in `public/project-media/`; new covers and explanatory diagrams drawn in `ProjectArtwork` and `ProjectDiagram`
- Full-image dialogs with keyboard dismissal and restored focus
- An interactive replay of a recorded Relay worker-crash experiment
- Source-backed role/repository assessment in `docs/google-project-audit.md`

Relay's standalone repository is prepared locally at `demonstrators/relay/` and
ignored by the portfolio repository. Public publication is awaiting approval;
its source links remain disabled until the repository exists. See
`docs/goal-progress.md` for the remaining publication step and verification record.

The current visual redesign follows the four supplied layout references: small
project labels, graphic covers, a centered reading column, and paired visual
panels. It does not reuse the reference site's project artwork. Details and
verification are recorded in `docs/visual-redesign.md`.
