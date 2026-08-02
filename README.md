# Benjamin Zhuang — portfolio

Personal portfolio of Benjamin Zhuang, built as a typed Next.js 16 application
and deployed to GitHub Pages as a static export.

> **Provenance.** The visual shell and front-end implementation were recovered
> from the public deployment at [haoqi.design](https://haoqi.design/) by Haoqi
> Wen. Every visible biography, project card, project image, repository link,
> metric, and case-study write-up now represents Benjamin Zhuang's own work.
> The original portfolio archive under `src/` remains the local content source.

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
```

## Stack

- Next.js 16.2.12 App Router
- TypeScript 7.0.2
- React 19.2.8
- Three.js r184 with direct, typed render graphs
- GSAP with `useGSAP` and ScrollTrigger

## Portfolio content

- Ten local case-study routes sourced from Benjamin's original portfolio data and screenshots
- Structured project writing in `data/portfolio-projects.ts`
- Optimized project media in `public/project-media/`
- One clearly captioned GPT Image 2 editorial visual for each case study
