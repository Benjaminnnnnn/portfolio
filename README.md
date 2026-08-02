# Benjamin Zhuang — portfolio

Personal portfolio of Benjamin Zhuang, built as a typed Next.js 16 application
and deployed to GitHub Pages as a static export.

> **Provenance.** The visual design and front-end implementation were recovered
> from the public deployment at [haoqi.design](https://haoqi.design/) by Haoqi
> Wen. Site identity (title, brand mark, bio, contact details) has been replaced,
> but the case-study routes and `data/recovered-articles.ts` are still Haoqi
> Wen's original written work and project write-ups — including the
> `@wenhaoqi/wasm_design_utils` package. They are **not** mine and must be
> replaced with my own projects before this site is published.

## Run locally

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run build
npm run start
npm run test:smoke
```

## Stack

- Next.js 16.2.12 App Router
- TypeScript 7.0.2
- React 19.2.8
- Three.js r184 with direct, typed render graphs
- GSAP with `useGSAP` and ScrollTrigger

## Recovered content

- The public home page, project grid, contact section, fonts, music, stickers, and GLTF/GLB models
- WebGL hero/contact models and a shader-driven hyperspace sequence
- Local case-study routes for Reunimos, Inspire Mono, Wasm Design Utils, aDrive, Shore Icon, and Teambition
- All publicly served media used by those pages

## Homepage code map

The homepage is composed in `components/home/HomeExperience.tsx`. Each visible section owns its markup and animation lifecycle under `components/home/sections/`:

- `HeroSection/` — introductory copy
- `AboutSection/` — biography and floating sticker
- `WorkSection/` — project data, cards, and reveal animation
- `PurposeSection/` — cursor morph, hyperspace shaders, rings, and the labelled scroll timeline
- `ContactSection/` — closing copy, links, stickers, and scramble reveal

Shared header/status UI lives in `components/site/`. Reusable GSAP setup and scramble utilities live in `components/animation/`. The page-wide Three.js composition is `components/home/visuals/HomeVisualCanvas.tsx`.

The forensic capture, source evidence, replay manifest, known gaps, and QA report are retained under `.web-shader-extractor/`. The recovery ports the source multi-IOR refraction, flare, hyperspace, loader, entrance, and scroll-rail behavior; see `.web-shader-extractor/known-gaps.md` for the remaining single-canvas scheduling boundary.
