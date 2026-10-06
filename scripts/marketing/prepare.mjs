// Crops and converts real interface captures into scripts/marketing/captures.
// Sources are local clones and capture runs under demonstrators/ (gitignored);
// see docs/marketing.md for how each capture was produced.
import fs from "node:fs/promises";
import sharp from "sharp";

const D = new URL("../../demonstrators/", import.meta.url).pathname;
const OUT = new URL("./captures/", import.meta.url).pathname;
await fs.mkdir(OUT, { recursive: true });

// name: [source, crop {left, top, width, height} in source pixels | null]
const jobs = {
  "algo-explore": ["captures/algo-rw-explore.png"],
  "algo-astar": ["captures/algo-rw-astar.png"],
  "algo-tutor": ["captures/algo-rw-tutor.png"],
  "splendor-home": ["captures/splendor-rw-home.png", { left: 0, top: 0, width: 2880, height: 1340 }],
  "splendor-board": ["captures/splendor-rw-board.png"],
  "splendor-lobby": ["captures/splendor-rw-lobby.png", { left: 560, top: 150, width: 1760, height: 1300 }],
  "leetcode-home": ["captures/leet-rw-home.png"],
  "leetcode-workspace": ["captures/leet-rw-workspace.png"],
  "cypress-home": ["captures/cypress-rw-home.png"],
  "cypress-device": ["captures/cypress-rw-device.png"],
  "cliphop-feed": ["captures/cliphop-rw-home.png"],
  "handpick-home": ["handpick-appstore/01-home.png", { left: 100, top: 760, width: 1120, height: 1920 }],
  "handpick-review": ["handpick-appstore/02-review.png", { left: 100, top: 760, width: 1120, height: 1920 }],
  "handpick-collection": ["handpick-appstore/03-collection.png", { left: 100, top: 760, width: 1120, height: 1920 }],
  // Browser chrome and bookmarks are cropped out of the PetClinic captures.
  "petclinic-grafana": ["spring-petclinic/screenshots/grafana.png", { left: 0, top: 150, width: 3022, height: 1652 }],
  "petclinic-sonar": ["spring-petclinic/screenshots/sonarqube.png", { left: 0, top: 248, width: 3024, height: 760 }],
  "petclinic-pipeline": ["spring-petclinic/screenshots/blue-ocean.png", { left: 0, top: 78, width: 1920, height: 380 }],
};

for (const [name, [src, crop]] of Object.entries(jobs)) {
  let img = sharp(D + src);
  if (crop) img = img.extract(crop);
  const meta = await img.clone().metadata();
  const w = crop ? crop.width : meta.width;
  await img.resize({ width: Math.min(w, 2000), withoutEnlargement: true }).webp({ quality: 84 }).toFile(`${OUT}${name}.webp`);
  const out = await sharp(`${OUT}${name}.webp`).metadata();
  console.log(name, out.width, out.height);
}
