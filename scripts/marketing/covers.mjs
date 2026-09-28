// Publishes the reworked-UI captures as case-study covers (1800 px wide).
import sharp from "sharp";

const SRC = new URL("./captures/", import.meta.url).pathname;
const OUT = new URL("../../public/project-media/", import.meta.url).pathname;
const covers = {
  "algo-v2": "algo-tutor",
  "splendor-v2": "splendor-board",
  "leetcode-v2": "leetcode-workspace",
  "cypress-v2": "cypress-home",
  "cliphop-v2": "cliphop-feed",
};
for (const [out, src] of Object.entries(covers)) {
  await sharp(`${SRC}${src}.webp`).resize({ width: 1800 }).webp({ quality: 84 }).toFile(`${OUT}${out}.webp`);
  const m = await sharp(`${OUT}${out}.webp`).metadata();
  console.log(out, m.width, m.height);
}
