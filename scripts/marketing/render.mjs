// Renders studio.html into public/project-media/marketing/<slug>.webp (2400×1500).
// Usage: node scripts/marketing/render.mjs [slug ...]
import fs from "node:fs/promises";
import sharp from "sharp";
import { chromium } from "playwright-core";

const studio = new URL("./studio.html", import.meta.url);
const OUT = new URL("../../public/project-media/marketing/", import.meta.url).pathname;
await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await page.goto(studio.href);
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : await page.evaluate(() => window.__slugs);
for (const slug of slugs) {
  await page.goto(`${studio.href}?slug=${slug}`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#stage img").evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
  const png = await page.locator("#stage").screenshot();
  await sharp(png).webp({ quality: 84 }).toFile(`${OUT}${slug}.webp`);
  console.log("rendered", slug);
}
await browser.close();
