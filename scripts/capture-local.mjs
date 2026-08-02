import { chromium } from "playwright-core";
import fs from "node:fs/promises";

const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const viewportWidth = Number(process.argv[6] ?? 1440);
const viewportHeight = Number(process.argv[7] ?? 900);
const page = await browser.newPage({ viewport: { width: viewportWidth, height: viewportHeight }, deviceScaleFactor: 1 });
const errors = [];
const consoleMessages = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (["warning", "error"].includes(message.type())) {
    consoleMessages.push({ type: message.type(), text: message.text() });
  }
});
await page.goto(process.argv[2] ?? "http://127.0.0.1:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(3_000);
const progress = Number(process.argv[3] ?? 0);
const settleMs = Number(process.argv[4] ?? 1_500);
const captureName = process.argv[5] ?? "local-quick";
if (progress > 0) {
  await page.evaluate((value) => {
    const scroller = document.querySelector("#home-scroll, .article-scroll");
    if (scroller) {
      scroller.style.scrollBehavior = "auto";
      scroller.scrollTop = (scroller.scrollHeight - scroller.clientHeight) * value;
    }
  }, progress);
  await page.waitForTimeout(settleMs);
}
await fs.mkdir(".web-shader-extractor/local-evidence/screenshots", { recursive: true });
await page.screenshot({ path: `.web-shader-extractor/local-evidence/screenshots/${captureName}.png` });
const canvases = page.locator("canvas");
if (await canvases.count()) {
  await canvases.first().screenshot({ path: ".web-shader-extractor/local-evidence/screenshots/local-canvas.png" });
}
const samples = await page.evaluate(() => Array.from(document.querySelectorAll("canvas")).map((canvas) => {
  const gl = canvas.getContext("webgl2");
  if (!gl) return null;
  const pixel = new Uint8Array(4);
  gl.readPixels(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
  return { size: [canvas.width, canvas.height], center: Array.from(pixel) };
}));
console.log(JSON.stringify({ title: await page.title(), canvases: await canvases.count(), samples, errors, consoleMessages }, null, 2));
await browser.close();
