// Real assets used by the project specimens (components/specimens).
// Sources: Handpick's CC0 demo library, Splendor's card art, and crops of the
// existing 333gle capture. Clones live in demonstrators/ (gitignored).
import fs from "node:fs/promises";
import sharp from "sharp";

const D = new URL("../../demonstrators/", import.meta.url).pathname;
const M = new URL("../../public/project-media/", import.meta.url).pathname;
const OUT = `${M}specimens/`;
await fs.mkdir(OUT, { recursive: true });

const jobs = [
  // [out, src, crop, width]
  ["handpick-cinque-terre", `${D}handpick-appstore/library/cinque-terre.jpg`, null, 720],
  ["handpick-golden-puppy", `${D}handpick-appstore/library/golden-puppy.jpg`, null, 520],
  ["handpick-latte-art", `${D}handpick-appstore/library/latte-art.jpg`, null, 520],
  ["splendor-ruby", `${D}splendor/client/public/card-art/ruby-tier3.png`, null, 520],
  ["splendor-sapphire", `${D}splendor/client/public/card-art/sapphire-tier2.png`, null, 520],
  ["splendor-emerald", `${D}splendor/client/public/card-art/emerald-tier1.png`, null, 520],
  ["splendor-noble", `${D}splendor/client/public/noble-art/noble_3.png`, null, 520],
  ["333gle-logo", `${M}333gle.webp`, { left: 668, top: 0, width: 492, height: 190 }, 800],
];

for (const [name, src, crop, width] of jobs) {
  let img = sharp(src);
  if (crop) img = img.extract(crop);
  await img.resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${OUT}${name}.webp`);
  const m = await sharp(`${OUT}${name}.webp`).metadata();
  console.log(name, m.width, m.height);
}
