// Renders the original sticker set (stickers.html) to transparent PNGs in public/sticker_img/.
import fs from "node:fs/promises";
import sharp from "sharp";
import { chromium } from "playwright-core";

const html = new URL("./stickers.html", import.meta.url);
const OUT = new URL("../../public/sticker_img/", import.meta.url).pathname;
await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 2200, height: 2000 }, deviceScaleFactor: 1 });
await page.goto(html.href);
await page.waitForFunction(() => window.__ready);
await page.evaluate(() => document.fonts.ready);
const ids = await page.locator(".s").evaluateAll((nodes) => nodes.map((n) => n.id));
for (const id of ids) {
  const png = await page.locator(`#${id}`).screenshot({ omitBackground: true });
  // Trim to the die-cut edge with a little padding so atlas packing stays tight.
  await sharp(png).trim({ threshold: 0 }).extend({ top: 12, bottom: 12, left: 12, right: 12, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${OUT}${id}.png`);
  const m = await sharp(`${OUT}${id}.png`).metadata();
  console.log(id, m.width, m.height);
}
await browser.close();
