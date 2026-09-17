# Project art direction

> Superseded cover direction: the user approved the detail pages but requested
> recognizable product-demo covers. [Product covers](product-covers.md) describes
> the current implementation. The palettes and detail layouts below remain;
> the generated images are preserved on disk but no longer displayed as covers.

September 14, 2026.

## Direction

The latest request replaces the similar-looking SVG/CSS covers with more varied
generated artwork. All six new layout references were inspected. Their useful
principles are a quiet reading column, bold visual subjects, complementary
backgrounds, generous interface views, and paired details. Reference artwork was
not copied.

The earlier visual-first pass removed the repeated overview, oversized metrics
and core-loop sections. Those changes remain. This pass replaces its cover
drawings and screenshot-window covers.

## Delivered

All 13 projects now have their own generated editorial cover, palette and material:

| Project | Art direction |
| --- | --- |
| Relay | Brushed metal, orange job tokens, cool charcoal |
| Splendor | Jewel photography, plum velvet, brass and ivory |
| AlgoExplorer | Cobalt folded-paper maze and orange thread |
| SimpleDB | Green archival drawer, ivory records, coral card |
| PetClinic | Blue and terracotta clinic linocut |
| 333gle | Orange lens, abstract newspaper collage, cobalt mark |
| xv6 | Black CRT glass and phosphor-green cells |
| RSS Aggregator | Coral and teal screenprinted streams |
| Cypress | Plum and chartreuse document sculpture |
| Leetcode Clone | Mustard and graphite woodblock puzzle |
| ClipHop | Hot-pink and mint skateboard motion collage |
| Propertize | Terracotta architectural model and blue shadows |
| Mems | Peach paper, sea glass, imagined travel photographs |

The artwork appears in the index, detail-page hero and next-project thumbnail.
Detail pages lead with a full-width 16:9 cover, then a compact two-column intro
that stacks on mobile. Nine UI projects also have a large original screenshot,
followed by crops and explanations. Backend pages keep their factual diagrams
and the Relay replay. The total is 61 panels across 13 pages.

The supporting galleries use equal, 7:5, or 8:4 paired panels and wide closing
panels. Diagram text remains selectable. The background, ink and contrasting
accent colors come from each project's artwork rather than one shared beige
diagram style. The site navigation and existing animation behavior are unchanged.

## Sources and generation

Used the built-in image_gen tool through the imagegen skill, one separate prompt
per project. The tool does not expose a model selector: the requested
“GPT-image 2.5” version cannot be confirmed. No Higgsfield connection was available.
No alternate CLI model was silently selected.

All 13 originals were inspected before integration. Optimized WebP copies are in
`public/project-media/art-direction/*-v1.webp` (about 3 MiB total). Original PNGs
remain in the tool's generated-images directory. Exact prompts, original paths
and workspace output paths are preserved in `docs/project-art-prompts.json`.

Every hero is labeled “AI-generated concept artwork,” with descriptive alt text.
These images are artistic metaphors, not interface captures, real products,
runtime evidence or personal travel photographs. Actual screenshots still use
the original `project.cover` sources. Their full-image dialogs preserve keyboard
dismissal and focus restoration. Technical caveats and team/course attribution
remain visible; no new results or capabilities are claimed.

The imagegen skill guided separate briefs, output inspection, non-destructive
asset storage, and the distinction between artwork and factual evidence.

## Verification

- Production static build and TypeScript: passed, all 16 generated pages.
- Project verifier: passed, 13 distinct covers/palettes, nine full captures, 61 panels.
- Responsive checks: passed at 320, 390, 768, 1440 and 2048px.
- Image decode, dialogs, Escape and focus restoration: passed.
- Dark mode, reduced motion and keyboard Relay replay: passed.
- Existing 14-route interaction smoke suite: passed.
- Script lint and whitespace checks: passed.

The generated images, desktop galleries and mobile examples were visually
reviewed. Browser evidence lives in the ignored `artifacts/portfolio/` directory.
The user's `next-env.d.ts` development import was restored after the build.

Preview: http://127.0.0.1:3109/#work

This is a local portfolio change. Nothing was committed, deployed or published
to an external repository as part of this task.
